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

  // var left_user_var_list="tmin";
  // var right_user_var_list="tmin";

  // document.addEventListener('change', (event) => {

  // const slider_year=document.getElementById('slider-year-bar');
  // const slider_month=document.getElementById('slider-month-bar');
  // const left_var_list_tmin=document.getElementById('left-var-selection-tmin');
  // const left_var_list_tmax=document.getElementById('left-var-selection-tmax');
  // const left_var_list_tavg=document.getElementById('left-var-selection-tavg');
  // const left_var_list_prec=document.getElementById('left-var-selection-prec');
  // const right_var_list_tmin=document.getElementById('right-var-selection-tmin');
  // const right_var_list_tmax=document.getElementById('right-var-selection-tmax');
  // const right_var_list_tavg=document.getElementById('right-var-selection-tavg');
  // const right_var_list_prec=document.getElementById('right-var-selection-prec');
 
  // if (left_var_list_tmin.selected==true) {
  //   left_user_var_list="tmin";
  // } else if (left_var_list_tmax.selected==true) {
  //   left_user_var_list="tmax";
  // } else if (left_var_list_tavg.selected==true) {
  //   left_user_var_list="tavg";
  // } else {
  //   left_user_var_list="prec";
  // };
  
  // if (right_var_list_tmin.selected==true) {
  //   right_user_var_list="tmin";
  // } else if (right_var_list_tmax.selected==true) {
  //   right_user_var_list="tmax";
  // } else if (right_var_list_tavg.selected==true) {
  //   right_user_var_list="tavg";
  // } else {
  //   right_user_var_list="prec";
  // };
  // });

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
  beforeMap.addLayer({
    'id': 'default',
    'type': 'fill',
    'source': 'weather',
    'paint': {
      'fill-color': {
        'property': 'tmin201701',
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
  ["change", "input"].forEach(function (event) {
    document.addEventListener(event, function() {
    var left_user_var_list="tmin";
    var right_user_var_list="tmin";
    
    const left_var_list_tmin=document.getElementById('left-var-selection-tmin');
    const left_var_list_tmax=document.getElementById('left-var-selection-tmax');
    const left_var_list_tavg=document.getElementById('left-var-selection-tavg');
    const left_var_list_prec=document.getElementById('left-var-selection-prec');
    const right_var_list_tmin=document.getElementById('right-var-selection-tmin');
    const right_var_list_tmax=document.getElementById('right-var-selection-tmax');
    const right_var_list_tavg=document.getElementById('right-var-selection-tavg');
    const right_var_list_prec=document.getElementById('right-var-selection-prec');

    const slider_year=document.getElementById('slider-year-bar');
    const slider_month=document.getElementById('slider-month-bar');


    if (left_var_list_tmin.selected==true) {
      left_user_var_list="tmin";
    } else if (left_var_list_tmax.selected==true) {
      left_user_var_list="tmax";
    } else if (left_var_list_tavg.selected==true) {
      left_user_var_list="tavg";
    } else {
      left_user_var_list="prec";
    };
    
    if (right_var_list_tmin.selected==true) {
      right_user_var_list="tmin";
    } else if (right_var_list_tmax.selected==true) {
      right_user_var_list="tmax";
    } else if (right_var_list_tavg.selected==true) {
      right_user_var_list="tavg";
    } else {
      right_user_var_list="prec";
    };

    if (slider_month.value<10) {
    var user_selection=left_user_var_list+slider_year.value+0+slider_month.value;
    } else {
      var user_selection=left_user_var_list+slider_year.value+slider_month.value;
    };
    var id_refresher='before'+Math.random();
    console.log(user_selection);
    console.log(id_refresher);

    beforeMap.addLayer({
      'id': id_refresher,
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': {
          'property': user_selection,
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
          'property': 'tmax201701',
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