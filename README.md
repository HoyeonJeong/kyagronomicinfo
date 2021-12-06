# Kentucky Agronomic Factors (Temperature and Precipitation)
Map Page: https://hoyeonjeong.github.io/kyagronomicinfo/

## 1. Swipe Mapbox Choropleth Map with JS
- The map displays the temperature and precipitation using swipe maps.
- The data to draw map is converted into geojson file using QGIS and SQL.

## 2. User Interaction (Working on Progress)
- Left and Right maps might be toggled with the dropdown menu (working on progress).
- Year and Month sliders change colors on left and right maps.
- For clear to color the map, I will use the absolute interval for temperatures and precipitations.
- For instance, bright red color is displayed when the temperature is below -20 degree Celsius and dark red colors is shown when the it is over 30 degree Celsius with 5 or 6 intervals.
- For rain (precipitation), I will apply the same logic, too.

## 3. Problem (Current)
- Since I am using Mapbox GL JS with many tools, the time to load data is too long so that the reponse to change is too slow.
- Because Mapbox GL is different than materials that I learned in the class, I face some difficulties on drawing the map.