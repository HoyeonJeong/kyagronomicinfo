# Kentucky Agronomic Factors (Temperature and Precipitation)
Map Page: https://hoyeonjeong.github.io/kyagronomicinfo/

## 0. Intention to develop the map
- The yield and productivity of the agricultural product including field crops such as corn, soybean, and wheat are sensitive to the environmental conditions. Agronomic factors and climate variables positively or negatively influence the field crops.
- Agricultural and environmental information is related to the production sector of agricultural part. Although farmers can naively forecast the expected amount of field crops from the weather information, they can produce more meaningful forecast through the dynamic value with a meaningful map.

## 1. Swipe Mapbox Choropleth Map with JS
- The map displays the temperature and precipitation using swipe mapbox tool (Mapbox gl js).

## 2. User Interaction
- The dropdown menu forces to change the variable and displays the different colors across Kentucky. We can set the two different variables for the left and right maps separately.
- Year and Month sliders can change colors on the map. The left and right maps are changed simultaneously.
- The choropleth layer is updated by the user interaction, changing content menus and sliding year & month.

## 3. Problem (Current)
- Although the wide format data set is more efficient than the long format one, it still have a heavy loading problem. Thus, dynamic change in my map is limited.
- Popup does not work properly. I am looking for a remedy to fix it but it is difficult to find the good solution for now.
- Additional sliders to control the time dimension for left and right map separatly are needed. Sometime, people want to compare the same variable with each other by different time dimensions.
- The webpage is not user friendly. For instance, if people use the mobile phone to see the page, the legend area hides the map. Therefore, a button to hide or show the legend is necessary for the web page to be user-freindly.

## 4. Data Source
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