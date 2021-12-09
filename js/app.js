(function () {
  'use strict';

  const zoomlv_default = 6.5; //Default zoomlevel
  const center_default = [-85.7, 37.7] //Default Coordinate

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

  
  const slider_year=document.getElementById('slider-year-bar');
  const slider_month=document.getElementById('slider-month-bar');
  const left_var_list=document.getElementById('left-var-selection');
  const right_var_list=document.getElementById('right-var-selection');

  var user_select=[left_var_list.value, right_var_list.value, slider_year.value, slider_month.value];
  
  if (slider_month.value<10) {
    var left_user_selection=user_select[0]+user_select[2]+0+user_select[3];
    var right_user_selection=user_select[1]+user_select[2]+0+user_select[3];
  } else {
    var left_user_selection=user_select[0]+user_select[2]+user_select[3];
    var right_user_selection=user_select[1]+user_select[2]+user_select[3];
  };

  console.log(left_user_selection);
  console.log(right_user_selection);


  // Temperature Color
  // [-20, '#fee5d9'],
  // [-10, '#fcae91'],
  // [0, '#fb6a4a'],
  // [10, '#de2d26'],
  // [20, '#a50f15']

  // Rainfall Color
  // [10, '#eff3ff'],
  // [20, '#bdd7e7'],
  // [30, '#6baed6'],
  // [40, '#3182bd'],
  // [50, '#08519c']

  //Left Map base
  beforeMap.on('load', () => {
    // let filterYear = ['==', ['number', ['get', 'year']], 2017];
    // let filterMonth = ['==', ['number', ['get', 'year']], 1];
    beforeMap.addSource('weather', {
      type: 'geojson',
      data: 'csv/QGIStool/shp/weather_wide.geojson'
    });

    // const labels = {
		// 	"tmin": "Min Temperature",
		// 	"tmax": "Max Temperature",
		// 	"tavg": "Average Temperature",
    //   "prec": "Precipitation"
		// }
   
  //   document.getElementById('slider-year').addEventListener('input', event => {
  //     var period_year=(event.target.value);
  //   });
  //   document.getElementById('slider-month').addEventListener('input', event => {
  //     var period_month=(event.target.value);     
  //   });
    beforeMap.addLayer({
      'id': 'weather_layer_fill_bm',
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': {
          'property': `${left_user_selection}`,
          'stops': [
            [-20, '#fee5d9'],
            [-10, '#fcae91'],
            [0, '#fb6a4a'],
            [10, '#de2d26'],
            [20, '#a50f15']
          ]
        }, // green color fill
        'fill-opacity': 0.9
      }
    });
    beforeMap.addLayer({
      'id': 'weather_layer_outline',
      'type': 'line',
      'source': 'weather',
      'paint': {
        'line-color': '#000',
        'line-width': 0.1
      }
    });
    // //Filter for slider: update year filter when the slider is dragged
    // document.getElementById('slider-year').addEventListener('input', (event) => {
    //   const timeYear = parseInt(event.target.value);
    //   filterYear = ['==', ['number', ['get', 'year']], timeYear]
    //   // document.getElementById('active-year').innerText=timeYear;
    //   document.getElementById('slider-month').addEventListener('input', (event) => {
    //     const timeMonth = parseInt(event.target.value);
    //     filterMonth = ['==', ['number', ['get', 'month']], timeMonth]
    //   })
    // })
  });

  afterMap.on('load', () => {
    let filterYear = ['==', ['number', ['get', 'year']], 2017];
    let filterMonth = ['==', ['number', ['get', 'year']], 1];
    afterMap.addSource('weather', {
      type: 'geojson',
      data: 'csv/QGIStool/shp/weather_wide.geojson'
    });
    afterMap.addLayer({
      'id': 'weather_layer_fill_am',
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': {
          'property': `${right_user_selection}`,
          'stops': [
            [-20, '#fee5d9'],
            [-10, '#fcae91'],
            [0, '#fb6a4a'],
            [10, '#de2d26'],
            [20, '#a50f15']
          ]
        },
        'fill-opacity': 0.9
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
    // //Filter for slider: update year filter when the slider is dragged
    // document.getElementById('slider-year').addEventListener('input', (event) => {
    //   const timeYear = parseInt(event.target.value);
    //   filterYear = ['==', ['number', ['get', 'year']], timeYear]
    //   // document.getElementById('active-year').innerText=timeYear;
    //   document.getElementById('slider-month').addEventListener('input', (event) => {
    //     const timeMonth = parseInt(event.target.value);
    //     filterMonth = ['==', ['number', ['get', 'month']], timeMonth]
    //   })
    // })
  });



})();