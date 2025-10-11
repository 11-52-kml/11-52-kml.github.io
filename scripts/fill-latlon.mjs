import fs from "node:fs/promises";
import { parse as parseCsv } from "csv-parse/sync";
import { stringify as csvStringify } from "csv-stringify/sync";
import { DOMParser } from "@xmldom/xmldom";
import { kml as kmlToGeoJSON } from "@tmcw/togeojson";

const INPUT = "export.csv";
const OVERWRITE_EXISTING = false; // set true if you want to overwrite non-empty lat/lon

// Recognize your link column even if you change header text later:
const LINK_CANDIDATES = [
  "Link_11_52",
  'Link ka generisanoj mapi sa oblikom',
  'Link ka mapi sa oblikom "11-52"',
  "Link", "Mapa", "URL"
];

const text = await fs.readFile(INPUT, "utf8");
const rows = parseCsv(text, { columns: true, skip_empty_lines: true }); // object mode
const headers = Object.keys(rows[0] || {});
const linkKey = headers.find(h => LINK_CANDIDATES.includes(h)) || headers.find(h => /link/i.test(h));
if (!linkKey) throw new Error("No link column found in export.csv");

function isEmpty(v) { return v === undefined || v === null || String(v).trim() === ""; }
function needsFill(row) {
  if (OVERWRITE_EXISTING) return true;
  return isEmpty(row.lat) || isEmpty(row.lon);
}

function parseLatLonFromGoogleUrl(urlStr) {
  try {
    const u = new URL(urlStr);
    // @lat,lon,zoom
    const at = u.pathname.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*),/);
    if (at) return { lat: +at[1], lon: +at[2], source: "@center" };
    // !3dLAT!4dLON (order: lat then lon)
    const b = u.href.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
    if (b) return { lat: +b[1], lon: +b[2], source: "!3d!4d" };
    // q=lat,lon
    const q = u.searchParams.get("q");
    if (q) {
      const m = q.match(/(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)/);
      if (m) return { lat: +m[1], lon: +m[2], source: "q" };
    }
  } catch {}
  return null;
}

async function centerFromMyMaps(mid) {
  const url = `https://www.google.com/maps/d/kml?mid=${encodeURIComponent(mid)}&forcekml=1`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`KML fetch failed ${res.status}`);
  const kmlText = await res.text();

  // Prefer saved view
  const mLookAt = kmlText.match(
    /<LookAt>[\s\S]*?<longitude>([-\d.]+)<\/longitude>[\s\S]*?<latitude>([-\d.]+)<\/latitude>[\s\S]*?<\/LookAt>/i
  );
  if (mLookAt) return { lat: +mLookAt[2], lon: +mLookAt[1], source: "LookAt" };

  const mCamera = kmlText.match(
    /<Camera>[\s\S]*?<longitude>([-\d.]+)<\/longitude>[\s\S]*?<latitude>([-\d.]+)<\/latitude>[\s\S]*?<\/Camera>/i
  );
  if (mCamera) return { lat: +mCamera[2], lon: +mCamera[1], source: "Camera" };

  // Else bbox of all geometries
  const dom = new DOMParser().parseFromString(kmlText, "text/xml");
  const gj = kmlToGeoJSON(dom);
  let minLat = 90, maxLat = -90, minLon = 180, maxLon = -180;

  const push = (lon, lat) => {
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
      minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon);
    }
  };
  const walk = coords => (typeof coords?.[0] === "number" ? push(coords[0], coords[1]) : coords?.forEach?.(walk));
  for (const f of gj.features || []) if (f.geometry) walk(f.geometry.coordinates);

  if (minLat <= maxLat && minLon <= maxLon) {
    return { lat: (minLat + maxLat) / 2, lon: (minLon + maxLon) / 2, source: "bbox" };
  }
  throw new Error("No geometry found");
}

function extractMid(urlStr) {
  try {
    const u = new URL(urlStr);
    return u.searchParams.get("mid");
  } catch { return null; }
}

let changed = false;
for (const row of rows) {
  if (!needsFill(row)) continue;

  const link = (row[linkKey] || "").trim();
  if (!link) continue;

  let latlon = parseLatLonFromGoogleUrl(link);

  // If not a plain Maps link, try My Maps KML via mid
  if (!latlon) {
    const mid = extractMid(link);
    if (mid) {
      try {
        latlon = await centerFromMyMaps(mid);
        await new Promise(r => setTimeout(r, 200)); // be polite
      } catch (e) {
        // leave as-is if map is private or fetch fails
        console.warn(`mid=${mid}: ${e.message}`);
      }
    }
  }

  if (latlon) {
    const oldLat = row.lat, oldLon = row.lon;
    row.lat = String(latlon.lat);
    row.lon = String(latlon.lon);
    if (row.lat !== oldLat || row.lon !== oldLon) changed = true;
  }
}

// Re-write CSV preserving column order; ensure header row
const csvOut = csvStringify(rows, { header: true, columns: headers });
if (changed) {
  await fs.writeFile(INPUT, csvOut, "utf8");
  console.log("export.csv updated.");
} else {
  console.log("No changes.");
}
