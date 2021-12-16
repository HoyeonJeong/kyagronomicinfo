(function () {
  'use strict';

  const zoomlv_default = 6.5; //Default zoomlevel
  const center_default = [-86.9, 37.7] //Default Coordinate

  mapboxgl.accessToken = 'pk.eyJ1IjoiaGplMjM4IiwiYSI6ImNrcHI2c3N1djBmbGMydm1sa2N1eG5reGIifQ.bYFgbcy0nCVpRxCijxdjqw'; //Access Token

  const beforeMap = new mapboxgl.Map({ //Before Map specification ==> Left Map
    container: 'before',
    style: 'mapbox://styles/hje238/ckvk2sit8119114qgc0lm8ht2',
    center: [center_default[0], center_default[1]],
    zoom: zoomlv_default,
  });

  const afterMap = new mapboxgl.Map({ //After Map specification ==> Right Map
    container: 'after',
    style: 'mapbox://styles/hje238/ckwpar0e41vie14p699l676ds',
    center: [center_default[0], center_default[1]],
    zoom: zoomlv_default,
  });

  // A selector or reference to HTML element
  const container = '#comparison-container';

  const map = new mapboxgl.Compare(beforeMap, afterMap, container, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
  });

  // Swiper position change by windows size
  const mapSize = document.querySelector(".map");
  map.setSlider(mapSize.offsetWidth * 0.6);

  window.addEventListener("resize", adjustSwipe);

  function adjustSwipe() {
    map.setSlider(mapSize.offsetWidth * 0.6);
  }
  
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
  });

  //Left Map base (Beforemap)
  beforeMap.on('load', () => {

    beforeMap.addSource('weather', {
      type: 'geojson',
      data: 'csv/QGIStool/shp/weather_wide.geojson'
    });

    beforeMap.addLayer({ //Left Map default
      'id': 'default',
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': {
          'property': 'tavg201701',
          'stops': [
            [-5, '#2171b5'],
            [0, '#4292c6'],
            [5, '#feb24c'],
            [10, '#fd8d3c'],
            [15, '#fc4e2a'],
            [20, '#e31a1c'],
            [25, '#bd0026'],
            [30, '#800026']
          ]
        }, // green color fill
        'fill-opacity': 1.0
      }
    });
    beforeMap.addLayer({
      'id': 'weather_layer_outline_bm',
      'type': 'line',
      'source': 'weather',
      'paint': {
        'line-color': '#fff',
        'line-width': 0.1
      }
    });
    beforeMap.on('click', 'default', (e) => {
      beforeMap.getCanvas().style.cursor = 'pointer';
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<b>${e.features[0].properties.name}</b>: ${(e.features[0].properties.tavg201701).toLocaleString()}&#x2103`)
        .addTo(beforeMap);
    });
    beforeMap.on('mouseleave', 'default', () => {
      beforeMap.getCanvas().style.cursor = '';
      popup.remove();
    });
    ["change", "input"].forEach(function (event) { //User Interaction: dropdown and slider input
      document.addEventListener(event, function () {
        var left_user_var_list = "tavg"; //Declare the default dropdown
        // var right_user_var_list="tmin";

        const left_var_list_tmin = document.getElementById('left-var-selection-tmin'); //Extract the dropdown value
        const left_var_list_tmax = document.getElementById('left-var-selection-tmax');
        const left_var_list_tavg = document.getElementById('left-var-selection-tavg');
        const left_var_list_prec = document.getElementById('right-var-selection-prec');

        // const right_var_list_tmin=document.getElementById('right-var-selection-tmin');
        // const right_var_list_tmax=document.getElementById('right-var-selection-tmax');
        // const right_var_list_tavg=document.getElementById('right-var-selection-tavg');
        // const right_var_list_prec=document.getElementById('right-var-selection-prec');

        const slider_year = document.getElementById('slider-year-bar'); //Extract the year slider input
        const slider_month = document.getElementById('slider-month-bar'); //Extract the month slider input


        if (left_var_list_tmin.selected == true) { //If statement: selected variable
          left_user_var_list = "tmin";
        } else if (left_var_list_tmax.selected == true) {
          left_user_var_list = "tmax";
        } else if (left_var_list_tavg.selected == true) {
          left_user_var_list = "tavg";
        } else {
          left_user_var_list = "prec";
        };

        // if (right_var_list_tmin.selected==true) {
        //   right_user_var_list="tmin";
        // } else if (right_var_list_tmax.selected==true) {
        //   right_user_var_list="tmax";
        // } else if (right_var_list_tavg.selected==true) {
        //   right_user_var_list="tavg";
        // } else {
        //   right_user_var_list="prec";
        // };

        if (left_user_var_list == "tmin" || left_user_var_list == "tmax" || left_user_var_list == "tavg") { //With selected variable --> make a property for Mapbox gl js
          if (slider_month.value < 10) { //E.g., January 1 --> 01, Octomer 10 --> 10
            var user_selection_temp = left_user_var_list + slider_year.value + 0 + slider_month.value;
          } else {
            var user_selection_temp = left_user_var_list + slider_year.value + slider_month.value;

          };
        } else {
          if (slider_month.value < 10) {
            var user_selection_prec = left_user_var_list + slider_year.value + 0 + slider_month.value;
          } else if (slider_month.value > 9) {
            var user_selection_prec = left_user_var_list + slider_year.value + slider_month.value;
          }
        };

        //ID generator using random numbers
        var id_refresher_temp = 'temp before' + Math.random();
        var id_refresher_temp_line = 'temp before line' + Math.random();
        var id_refresher_prec = 'prec before' + Math.random();
        var id_refresher_prec_line = 'prec before line' + Math.random();

        if (left_user_var_list == "tmin" || left_user_var_list == "tmax" || left_user_var_list == "tavg") { //dropdown value==Temperature
          beforeMap.addLayer({
            'id': id_refresher_temp,
            'type': 'fill',
            'source': 'weather',
            'paint': {
              'fill-color': {
                'property': user_selection_temp,
                'stops': [
                  [-5, '#2171b5'],
                  [0, '#4292c6'],
                  [5, '#feb24c'],
                  [10, '#fd8d3c'],
                  [15, '#fc4e2a'],
                  [20, '#e31a1c'],
                  [25, '#bd0026'],
                  [30, '#800026']
                ]
              }, // green color fill
              'fill-opacity': 0.9
            }
          });
          beforeMap.addLayer({
            'id': id_refresher_temp_line,
            'type': 'line',
            'source': 'weather',
            'paint': {
              'line-color': '#fff',
              'line-width': 0.1
            }
          });
          beforeMap.on('click', id_refresher_temp, (e) => {
            beforeMap.getCanvas().style.cursor = 'pointer';
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`<b>${e.features[0].properties.name}</b>: ${(e.features[0].properties[user_selection_temp]).toLocaleString()}&#x2103`)
              .addTo(beforeMap);
          });
          beforeMap.on('mouseleave', id_refresher_temp, () => {
            beforeMap.getCanvas().style.cursor = '';
            popup.remove();
          });
        } else { //dropdown value==precepitation
          beforeMap.addLayer({
            'id': id_refresher_prec,
            'type': 'fill',
            'source': 'weather',
            'paint': {
              'fill-color': {
                'property': user_selection_prec,
                'stops': [
                  [1, '#e5f5e0'],
                  [5, '#c7e9c0'],
                  [10, '#a1d99b'],
                  [50, '#74c476'],
                  [100, '#41ab5d'],
                  [150, '#238b45'],
                  [200, '#005a32'],
                  [250, '#00441b']
                ]
              }, // green color fill
              'fill-opacity': 0.9
            }
          });
          beforeMap.addLayer({
            'id': id_refresher_prec_line,
            'type': 'line',
            'source': 'weather',
            'paint': {
              'line-color': '#fff',
              'line-width': 0.1
            }
          });
          beforeMap.on('click', id_refresher_prec, (e) => {
            beforeMap.getCanvas().style.cursor = 'pointer';
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`<b>${e.features[0].properties.name}</b>: ${(e.features[0].properties[user_selection_prec]).toLocaleString()}mm`)
              .addTo(beforeMap);
          });
          beforeMap.on('mouseleave', id_refresher_prec, () => {
            beforeMap.getCanvas().style.cursor = '';
            popup.remove();
          });
          console.log(popup)
        };
      });
    });
  });

  //Right Map base: The same structure of Left Map
  afterMap.on('load', () => {
    afterMap.addSource('weather', {
      type: 'geojson',
      data: 'csv/QGIStool/shp/weather_wide.geojson'
    });
    afterMap.addLayer({
      'id': 'default',
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': {
          'property': 'tavg201701',
          'stops': [
            [-5, '#2171b5'],
            [0, '#4292c6'],
            [5, '#feb24c'],
            [10, '#fd8d3c'],
            [15, '#fc4e2a'],
            [20, '#e31a1c'],
            [25, '#bd0026'],
            [30, '#800026']
          ]
        }, // green color fill
        'fill-opacity': 1.0
      }
    });
    afterMap.addLayer({
      'id': 'weather_layer_outline_am',
      'type': 'line',
      'source': 'weather',
      'paint': {
        'line-color': '#fff',
        'line-width': 0.1
      }
    });
    afterMap.on('click', 'default', (e) => {
      afterMap.getCanvas().style.cursor = 'pointer';
      new mapboxgl.Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<b>${e.features[0].properties.name}</b>: ${(e.features[0].properties.tavg201701).toLocaleString()}&#x2103`)
        .addTo(afterMap);
    });
    afterMap.on('mouseleave', 'default', () => {
      afterMap.getCanvas().style.cursor = '';
      popup.remove();
    });
    ["change", "input"].forEach(function (event) {
      document.addEventListener(event, function () {
        // var left_user_var_list="tmin";
        var right_user_var_list = "tavg";

        // const left_var_list_tmin=document.getElementById('left-var-selection-tmin');
        // const left_var_list_tmax=document.getElementById('left-var-selection-tmax');
        // const left_var_list_tavg=document.getElementById('left-var-selection-tavg');
        // const left_var_list_prec=document.getElementById('right-var-selection-prec');

        const right_var_list_tmin = document.getElementById('right-var-selection-tmin');
        const right_var_list_tmax = document.getElementById('right-var-selection-tmax');
        const right_var_list_tavg = document.getElementById('right-var-selection-tavg');
        const right_var_list_prec = document.getElementById('right-var-selection-prec');

        const slider_year = document.getElementById('slider-year-bar');
        const slider_month = document.getElementById('slider-month-bar');


        // if (left_var_list_tmin.selected==true) {
        //   left_user_var_list="tmin";
        // } else if (left_var_list_tmax.selected==true) {
        //   left_user_var_list="tmax";
        // } else if (left_var_list_tavg.selected==true) {
        //   left_user_var_list="tavg";
        // } else {
        //   left_user_var_list="prec";
        // };

        if (right_var_list_tmin.selected == true) {
          right_user_var_list = "tmin";
        } else if (right_var_list_tmax.selected == true) {
          right_user_var_list = "tmax";
        } else if (right_var_list_tavg.selected == true) {
          right_user_var_list = "tavg";
        } else {
          right_user_var_list = "prec";
        };

        if (right_user_var_list == "tmin" || right_user_var_list == "tmax" || right_user_var_list == "tavg") {
          if (slider_month.value < 10) {
            var user_selection_temp = right_user_var_list + slider_year.value + 0 + slider_month.value;
          } else {
            var user_selection_temp = right_user_var_list + slider_year.value + slider_month.value;

          };
        } else {
          if (slider_month.value < 10) {
            var user_selection_prec = right_user_var_list + slider_year.value + 0 + slider_month.value;
          } else if (slider_month.value > 9) {
            var user_selection_prec = right_user_var_list + slider_year.value + slider_month.value;
          }
        };

        var id_refresher_temp = 'temp before' + Math.random();
        var id_refresher_temp_line = 'temp before line' + Math.random();
        var id_refresher_prec = 'prec before' + Math.random();
        var id_refresher_prec_line = 'prec before line' + Math.random();

        if (right_user_var_list == "tmin" || right_user_var_list == "tmax" || right_user_var_list == "tavg") {
          afterMap.addLayer({
            'id': id_refresher_temp,
            'type': 'fill',
            'source': 'weather',
            'paint': {
              'fill-color': {
                'property': user_selection_temp,
                'stops': [
                  [-5, '#2171b5'],
                  [0, '#4292c6'],
                  [5, '#feb24c'],
                  [10, '#fd8d3c'],
                  [15, '#fc4e2a'],
                  [20, '#e31a1c'],
                  [25, '#bd0026'],
                  [30, '#800026']
                ]
              }, // green color fill
              'fill-opacity': 0.9
            }
          });
          afterMap.addLayer({
            'id': id_refresher_temp_line,
            'type': 'line',
            'source': 'weather',
            'paint': {
              'line-color': '#fff',
              'line-width': 0.1
            }
          });
          afterMap.on('click', id_refresher_temp, (e) => {
            afterMap.getCanvas().style.cursor = 'pointer';
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`<b>${e.features[0].properties.name}</b>: ${(e.features[0].properties[user_selection_temp]).toLocaleString()}&#x2103`)
              .addTo(afterMap);
          });
          afterMap.on('mouseleave', id_refresher_temp, () => {
            afterMap.getCanvas().style.cursor = '';
            popup.remove();
          });
        } else {
          afterMap.addLayer({
            'id': id_refresher_prec,
            'type': 'fill',
            'source': 'weather',
            'paint': {
              'fill-color': {
                'property': user_selection_prec,
                'stops': [
                  [1, '#e5f5e0'],
                  [5, '#c7e9c0'],
                  [10, '#a1d99b'],
                  [50, '#74c476'],
                  [100, '#41ab5d'],
                  [150, '#238b45'],
                  [200, '#005a32'],
                  [250, '#00441b']
                ]
              }, // green color fill
              'fill-opacity': 0.9
            }
          });
          afterMap.addLayer({
            'id': id_refresher_prec_line,
            'type': 'line',
            'source': 'weather',
            'paint': {
              'line-color': '#fff',
              'line-width': 0.1
            }
          });
          afterMap.on('click', id_refresher_prec, (e) => {
            afterMap.getCanvas().style.cursor = 'pointer';
            new mapboxgl.Popup()
              .setLngLat(e.lngLat)
              .setHTML(`<b>${e.features[0].properties.name}</b>: ${(e.features[0].properties[user_selection_prec]).toLocaleString()}mm`)
              .addTo(afterMap);
          });
          afterMap.on('mouseleave', id_refresher_prec, () => {
            afterMap.getCanvas().style.cursor = '';
            popup.remove();
          });
        };
      });
    });
  });
})();