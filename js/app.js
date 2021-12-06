(function () {
  'use strict';

  const zoomlv_default=6.5;
  const center_default=[-85.7, 37.7]

  mapboxgl.accessToken = 'pk.eyJ1IjoiaGplMjM4IiwiYSI6ImNrcHI2c3N1djBmbGMydm1sa2N1eG5reGIifQ.bYFgbcy0nCVpRxCijxdjqw';

  const beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/hje238/ckvk2sit8119114qgc0lm8ht2',
    center: [center_default[0], center_default[1]],
    zoom: zoomlv_default,
  });

  const afterMap = new mapboxgl.Map({
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
    beforeMap.addSource('weather', {
      type: 'geojson',
      data: 'csv/QGIStool/shp/weather_long.geojson'
    });
    beforeMap.addLayer({
      'id': 'weather_layer_fill_bm',
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': {
          'property': 'tmin',
          'stops':[
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
  });

  afterMap.on('load', () => {
    afterMap.addSource('weather', {
      type: 'geojson',
      data: 'csv/QGIStool/shp/weather_long.geojson'
    });
    afterMap.addLayer({
      'id': 'weather_layer_fill_am',
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': {
          'property': 'prec',
          'stops':[
            [5, '#eff3ff'],
            [10, '#bdd7e7'],
            [15, '#6baed6'],
            [20, '#3182bd'],
            [25, '#08519c']
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
  });
  
 
})();