import fs from 'node:fs/promises';
import { parse as parseCsv } from 'csv-parse/sync';
import { DOMParser } from '@xmldom/xmldom';
import { kml as kmlToGeoJSON } from '@tmcw/togeojson';

const INPUT_CSV = 'export.csv';
const OUT_JSON  = 'data/centers.json';

// 1) Load CSV as objects (headers -> keys)
const csvText = await fs.readFile(INPUT_CSV, 'utf8');
const rows = parseCsv(csvText, { columns: true, skip_empty_lines: true });

// 2) Extract MIDs from Link_11_52 and de-duplicate
const entries = [];
for (const row of rows) {
  const link = (row.Link_11_52 || '').trim();
  if (!link) continue;
  let mid = null;
  try {
    const u = new URL(link);
    mid = u.searchParams.get('mid');
  } catch (_) {}
  if (!mid) continue;
  entries.push({
    name: row.Naziv_lokacije || row.Naziv || '',
    city: row.Grad || row['Grad (za dijasporu, navesti i državu)'] || '',
    mid,
    link
  });
}
const uniqueByMid = Array.from(new Map(entries.map(e => [e.mid, e])).values());

async function fetchCenterForMid(mid) {
  const url = `https://www.google.com/maps/d/kml?mid=${encodeURIComponent(mid)}&forcekml=1`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`KML fetch failed ${res.status} for mid=${mid}`);
  }
  const kmlText = await res.text();

  // A) Try saved view in KML: LookAt (preferred) or Camera
  const mLookAt = kmlText.match(
    /<LookAt>[\s\S]*?<longitude>([-\d.]+)<\/longitude>[\s\S]*?<latitude>([-\d.]+)<\/latitude>[\s\S]*?<\/LookAt>/i
  );
  if (mLookAt) {
    return { lat: +mLookAt[2], lon: +mLookAt[1], source: 'LookAt', kml: url };
  }
  const mCamera = kmlText.match(
    /<Camera>[\s\S]*?<longitude>([-\d.]+)<\/longitude>[\s\S]*?<latitude>([-\d.]+)<\/latitude>[\s\S]*?<\/Camera>/i
  );
  if (mCamera) {
    return { lat: +mCamera[2], lon: +mCamera[1], source: 'Camera', kml: url };
  }

  // B) Otherwise, compute bbox center of all geometries
  const dom = new DOMParser().parseFromString(kmlText, 'text/xml');
  const gj = kmlToGeoJSON(dom); // FeatureCollection

  let minLat =  90, maxLat = -90, minLon =  180, maxLon = -180;
  const push = (lon, lat) => {
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
      minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat);
      minLon = Math.min(minLon, lon); maxLon = Math.max(maxLon, lon);
    }
  };
  const walk = (coords) => {
    if (typeof coords?.[0] === 'number') push(coords[0], coords[1]);
    else coords?.forEach?.(walk);
  };

  for (const f of gj.features || []) {
    if (f.geometry) walk(f.geometry.coordinates);
  }
  if (minLat <= maxLat && minLon <= maxLon) {
    return { lat: (minLat + maxLat) / 2, lon: (minLon + maxLon) / 2, source: 'bbox', kml: url };
  }
  throw new Error('No geometry found in KML');
}

// 3) Fetch all centers (with basic throttling)
const out = [];
for (const e of uniqueByMid) {
  try {
    const center = await fetchCenterForMid(e.mid);
    out.push({ ...e, center });
    await new Promise(r => setTimeout(r, 200)); // polite pause
  } catch (err) {
    out.push({ ...e, error: String(err) });
  }
}

// 4) Write results
await fs.mkdir('data', { recursive: true });
await fs.writeFile(OUT_JSON, JSON.stringify(out, null, 2));
console.log(`Wrote ${out.length} centers to ${OUT_JSON}`);
