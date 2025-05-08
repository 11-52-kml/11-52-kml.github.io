# Uputstvo za kreiranje koordinata za performans

Ovaj alat je napravljen da Vam pomogne da isplanirate vizuelni performans tako što ćete na mapi Vašeg grada postaviti željeni oblik (u ovom slučaju brojeve **„11:52“**) i zatim generisati tačne pozicije (koordinate) za svakog učesnika.  
Te pozicije kasnije možete lako uvesti u **Google My Maps** kako bi svako znao gde treba da stane.

---

## Pristup alatu

Alatu pristupate putem [ovog linka](https://11-52-kml.github.io/) .  

Osim tekstualnog uputstva u nastavku, postoji i sledeće video uputstvo koje možete pratiti:

<video controls src="https://github.com/user-attachments/assets/d8a593cb-e0ec-428f-be7a-5fe7706a0909"></video>


---

## KORAK 1: Priprema mape i postavljanje oblika **„11:52“**

Kada otvorite alat, videćete interaktivnu mapu sveta.

### 1. Pronađite željenu lokaciju

* **Pomeranje mape:** kliknite i držite levi taster miša, pa pomerajte.  
* **Zumiranje:** koristite točkić miša ili dugmiće **“+”** i **“–”** na mapi da se približite ili udaljite.
* * **Korišćenje lupe za pretragu:** Možete koristiti i lupu u gornjem desnom uglu da biste brže našli grad ili mesto u kome se nalazi željena lokacija, a zatim ručno prevucite na tačnu lokaciju.
* Podesite prikaz tako da jasno vidite celu površinu predviđenu za performans.

### 2. Postavite oblik **„11:52“** na mapu

1. Kliknite na dugme **`Place SVG Here`**.  
2. Oblik **„11:52“** će se pojaviti na centru trenutnog prikaza mape.  

## KORAK 2: Podešavanje oblika na mapi

Kada je oblik postavljen, verovatno će biti potrebno da ga preciznije namestite:

### 1. Pomeranje oblika

Kliknite direktno na oblik **„11:52“**, držite levi taster miša i prevucite ga na tačnu poziciju.

### 2. Rotiranje oblika

* **`Rotate Left (-10°)`** – svaki klik rotira za **10° ulevo** (suprotno smeru kazaljke).  
* **`Rotate Right (+10°)`** – svaki klik rotira za **10° udesno** (u smeru kazaljke).

Ponovite dok oblik ne bude orijentisan kako želite.

### 3. Menjanje veličine oblika

* **`Scale Up (x1.1)`** – uvećava oblik za **10 %**.  
* **`Scale Down (x0.9)`** – smanjuje oblik za **10 %**.

## KORAK 3: Definisanje razmaka između učesnika

1. U polje **`Distance (m):`** unesite željeni razmak između dve osobe (u metrima).  
   * *Primer:* ako unesete **1**, svaka osoba će biti udaljena **1 m** od sledeće duž linije oblika.  
   * Preporučeni razmak je **0.8 m – 2 m**.

## KORAK 4: Generisanje tačaka (pozicija za učesnike)

1. Kliknite na dugme **`Generate Points on SVG`**.  
2. Alat će nacrtati male *crvene tačke* duž kontura oblika **„11:52“** – svaka tačka je mesto za jednog učesnika.  
3. Pojaviće se obaveštenje o ukupnom broju generisanih tačaka.  
   * Prelaskom miša preko tačke videćete njen redni broj (*npr.* “Point 1”, “Point 2”…).

> **Savet:** Ako niste zadovoljni brojem tačaka ili rasporedom, promenite vrednost **`Distance (m)`** ili skalirajte SVG, pa ponovo kliknite **`Generate Points on SVG`**.

---

## KORAK 5: Preuzimanje KML fajla sa koordinatama

1. Kliknite **`Export KML`**.  
2. Pregledač će preuzeti fajl **`11-52.kml`** – sačuvajte ga na lako dostupno mesto (Desktop, Downloads…).

> **Šta je KML fajl?**  
> KML je format koji **Google Earth** i **Google My Maps** koriste za prikazivanje geografskih podataka (tačke, linije, oblici).  
> Fajl sadrži sve generisane pozicije učesnika.

---

## KORAK 6: Uvoz koordinata u Google My Maps

1. Otvorite **[Google My Maps](https://www.google.com/mymaps)** i prijavite se svojim Google nalogom.  
2. Kliknite **`+ CREATE A NEW MAP`**.  

3. Imenujte mapu: kliknite na **“Untitled map”** u gornjem levom uglu i unesite, *npr.* **“Performans 11:52 – Lokacija X”**.

4. **Uvoz KML fajla**

   * U levom panelu, ispod naziva sloja (*“Untitled layer”*), kliknite **`Import`**.  

   * U prozoru **“Choose a file to import”**:
     * Prevucite **`11-52.kml`** u prozor **ili**
     * Kliknite **“Select a file from your device”**, pronađite fajl i odaberite **`Open`**.

5. **Proverite uvezene tačke**

   * Nakon obrade, My Maps će prikazati markere koji formiraju oblik **„11:52“**.  
   * Svaki marker nosi broj koji odgovara rednom broju iz alata.

6. **Deljenje mape sa učesnicima**

   * Kliknite **`Share`** u levom panelu.  
   * Uključite opciju **“Anyone with the link can view”**, kopirajte link i podelite ga.  
   * Učesnici mogu otvoriti mapu na telefonu, pronaći svoj broj i videti tačnu lokaciju gde treba da stanu.
