# Kentucky Agronomic Factors (Temperature and Precipitation)
## 0. Intention to develop the map
- The yield and productivity of the agricultural product including field crops such as corn, soybean, and wheat are sensitive to the environmental conditions. Agronomic factors and climate variables positively or negatively influence the field crops.
- Agricultural and environmental information is related to the production sector of agricultural part. Although farmers can naively forecast the expected amount of field crops from the weather information, they can produce more meaningful forecast through the dynamic value with a meaningful map.

## 1. Swipe Mapbox Choropleth Map with JS
- Mapbox GL JS is the main base javascript library in the project.
- The map displays the temperature and precipitation using swipe mapbox tool (Mapbox gl js).
    - Swipe Map provides two maps side by side to compare them with each other.
    - Below code is the javascript to bring Mapbox GL JS to your web page.
```js
<script src='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css' rel='stylesheet'/>
```

## 2. User Interaction
- This map provide the user interaction reflecting the real user experience after one interaction with the user interface - Dropdown Menus (Left & Right - Cross Section) and Sliders (Year & Month - Time Dimension).
    - The dropdown menu forces to change the variable and displays the different colors across Kentucky. We can set the two different variables for the left and right maps separately.
    - Year and Month sliders can change colors on the map. The left and right maps are changed simultaneously.
    - The choropleth layer is updated by the user interaction, changing content menus and sliding year & month.

## 3. Data Source
1. PRISM Climate Group Data
- The PRISM Climate Group gathers climate observations from a wide range of monitoring networks, applies sophisticated quality control measures, and develops spatial climate datasets to reveal short- and long-term climate patterns. 
- The resulting datasets incorporate a variety of modeling techniques and are available at multiple spatial/temporal resolutions, covering the period from 1895 to the present. Whenever possible, we offer these datasets to the public, either free of charge or for a fee (depending on dataset size/complexity and funding available for the activity).
- See more details: [PRISM](https://prism.oregonstate.edu/)

2. Data Description
- Raw data are processed using the statistic program, R. 
- Temperatures (Min, Max, Mean) and Precipitations are averaged with 60 points by each county in Kentucky.
- The data set include the FIPS number, which is matched with the Kentucky Shape File.
- Two CSVs in csv folder are the main source for the data.
- Using "Join Attribute" between Kentucky Geojson and csv files, data sets are integrated.

## 4. Problem (Current)
- Although the wide format data set is more efficient than the long format one, it still have a heavy loading problem. Thus, dynamic change in this map is limited. Sometimes, left and right maps do not change by dropdown menus and sliders due to the heavy load.
- Popup does not work properly. I am looking for a remedy to fix it but it is difficult to find the good solution for now. A main problem is that popups for all variables on a county at a specific time dimension are overlapped with each other.
- Additional sliders to control the time dimension for left and right map separatly are needed. Sometime, people want to compare the same variable with each other by different time dimensions.
- The webpage is not mobile user friendly. For instance, if people use the mobile phone to see the page, the legend area hides the map. Therefore, a button to hide or show the legend is necessary for the web page to be user-freindly.

## 5. Web Page
- Map Page: https://hoyeonjeong.github.io/kyagronomicinfo/
- My Portfolio: https://hoyeonjeong.github.io/aginformation/