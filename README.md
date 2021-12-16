# Kentucky Agronomic Factors (Temperature and Precipitation)
Map Page: https://hoyeonjeong.github.io/kyagronomicinfo/

## 1. Swipe Mapbox Choropleth Map with JS
- The map displays the temperature and precipitation using swipe maps.
- The data to draw map is converted into geojson file using QGIS and SQL.

## 2. User Interaction (Working on Progress)
- The dropdown menu forces to change the variable in the data, and displays the different colors across Kentucky. Two dropdown menus specify the property of each map.
- Year and Month sliders can change the variable, too.
- Thus, the choropleth layer is updated by the user interaction changing content menus and sliding year & month.

## 3. Problem (Current)
- Although the wide format data set is more efficient than the long format one, it still have a heavy loading problem. Thus, dynamic change in my map is limited.
- Popup does not work properly. I am looking for a remedy to fix it but it is difficult to find the good solution for now.
- Additional sliders to control the time dimension for left and right map separatly are needed. Sometime, people want to compare the same variable with each other by different time dimensions.
- The webpage is not user friendly. For instance, if people use the mobile phone to see the page, the legend area hides the map. Therefore, a button to hide or show the legend is necessary for the web page to be user-freindly.
