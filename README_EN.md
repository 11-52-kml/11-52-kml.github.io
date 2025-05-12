# Instructions for Creating Performance Coordinates

This tool is designed to help you plan a visual performance by placing a desired shape (in this case, the numbers **"11.52"**) on a map of your city and then generating the exact positions (coordinates) for each participant.
You can later easily import these positions into **Google My Maps** so everyone knows where they need to stand.

---

## Accessing the Tool

You can access the tool via [this link](https://11-52-kml.github.io/).

In addition to the text instructions below, there is also the following video tutorial you can follow:

<video controls src="https://github.com/user-attachments/assets/d8a593cb-e0ec-428f-be7a-5fe7706a0909"></video>

---

## STEP 1: Preparing the Map and Placing the "11:52" Shape

When you open the tool, you will see an interactive world map.

### 1. Find the Desired Location

* **Panning the map:** Click and hold the left mouse button, then move.
* **Zooming:** Use the mouse wheel or the **“+”** and **“–”** buttons on the map to zoom in or out.
* **Using the search icon:** You can also use the magnifying glass in the upper right corner to quickly find the city or place where the desired location is, and then manually drag the map to the exact spot.
* Adjust the view so you can clearly see the entire area planned for the performance.

### 2. Place the "11:52" Shape on the Map

1.  Click the **`Place SVG Here`** button.
2.  The **"11:52"** shape will appear in the center of the current map view.

## STEP 2: Adjusting the Shape on the Map

Once the shape is placed, you will likely need to adjust it more precisely:

### 1. Moving the Shape

Click directly on the **"11:52"** shape, hold the left mouse button, and drag it to the exact position.

### 2. Rotating the Shape

* **`Rotate Left (-10°)`** – each click rotates by **10° to the left** (counter-clockwise).
* **`Rotate Right (+10°)`** – each click rotates by **10° to the right** (clockwise).

Repeat until the shape is oriented as desired.

### 3. Resizing the Shape

* **`Scale Up (x1.1)`** – increases the shape size by **10 %**.
* **`Scale Down (x0.9)`** – decreases the shape size by **10 %**.

## STEP 3: Defining the Distance Between Participants

1.  In the **`Distance (m):`** field, enter the desired distance between two people (in meters).
    * *Example:* if you enter **1**, each person will be **1 m** away from the next along the shape's line.
    * Recommended distance is **0.8 m – 2 m**.

## STEP 4: Generating Points (Positions for Participants)

1.  Click the **`Generate Points on SVG`** button.
2.  The tool will draw small *red dots* along the contours of the **"11:52"** shape – each dot represents a spot for one participant.
3.  A notification will appear showing the total number of generated points.
    * Hovering the mouse over a point will show its sequential number (*e.g.*, “Point 1”, “Point 2”…).

> **Tip:** If you are not satisfied with the number of points or their layout, change the **`Distance (m)`** value or resize the shape, then click **`Generate Points on SVG`** again.

---

## STEP 5: Downloading the KML File with Coordinates

1.  Click **`Export KML`**.
2.  Your browser will download the file **`11-52.kml`** – save it to an easily accessible location (Desktop, Downloads…).

> **What is a KML file?**
> KML is a format used by **Google Earth** and **Google My Maps** to display geographic data (points, lines, shapes).
> The file contains all the generated positions for the participants.

---

## STEP 6: Importing Coordinates into Google My Maps

1.  Open **[Google My Maps](https://www.google.com/mymaps)** and sign in with your Google account.
2.  Click **`+ CREATE A NEW MAP`**.

3.  Name the map: click on **“Untitled map”** in the upper left corner and enter, *e.g.*, **“Performance 11:52 – Location X”**.

4.  **Import the KML file**

    * In the left panel, under the layer name (*“Untitled layer”*), click **`Import`**.

    * In the **“Choose a file to import”** window:
        * Drag **`11-52.kml`** into the window **or**
        * Click **“Select a file from your device”**, find the file, and choose **`Open`**.

5.  **Check the Imported Points**

    * After processing, My Maps will display markers forming the **"11:52"** shape.
    * Each marker carries a number corresponding to its sequential number from the tool.

6.  **Sharing the Map with Participants**

    * Click **`Share`** in the left panel.
    * Enable the option **“Anyone with the link can view”**, copy the link, and share it.
    * Participants can open the map on their phones, find their number, and see the exact location where they need to stand.
    * You can also use the map to first mark the shape physically with marking/warning tape (putting some weights on the corners) for easier and more precise positioning of participants. 
