(function () {
  'use strict';

  const zoomlv_default=6.5;
  const center_default=[-84.3, 37.7]

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

  beforeMap.on('load', () => {
    beforeMap.addSource('weather', {
      type: 'geojson',
      data: 'csv/QGIStool/shp/weather_wide.geojson'
    });
    beforeMap.addLayer({
      'id': 'weather_layer_fill_bm',
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': '#00ff00', // green color fill
        'fill-opacity': 0.5
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
      data: 'csv/QGIStool/shp/weather_wide.geojson'
    });
    afterMap.addLayer({
      'id': 'weather_layer_fill_am',
      'type': 'fill',
      'source': 'weather',
      'paint': {
        'fill-color': '#0000ff', // blue color fill
        'fill-opacity': 0.5
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