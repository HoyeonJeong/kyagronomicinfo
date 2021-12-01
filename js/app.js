(function () {

  'use strict';

  // Set heights for page sections
  // adjustHeight();

  // // Utility functions
  // window.addEventListener('resize', adjustHeight)

  // function adjustHeight() {
  //   const mapSize = document.querySelector("#map"),
  //     contentSize = document.querySelector("#content"),
  //     removeFooter = document.querySelector('#footer').offsetHeight,
  //     removeHeader = document.querySelector('#header').offsetHeight
  //   const resize = window.innerHeight - removeFooter - removeHeader;
  //   if (window.innerWidth >= 768) {
  //     contentSize.style.height = `${resize}px`
  //     mapSize.style.height = `${resize}px`
  //   } else {
  //     contentSize.style.height = `${resize * 0.25}px`
  //     mapSize.style.height = `${resize * 0.75}px`
  //   }
  // }

  mapboxgl.accessToken = 'pk.eyJ1IjoiaGplMjM4IiwiYSI6ImNrcHI2c3N1djBmbGMydm1sa2N1eG5reGIifQ.bYFgbcy0nCVpRxCijxdjqw';
  const beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/hje238/ckvk2sit8119114qgc0lm8ht2',
    center: [-85.9, 37.7],
    zoom: 7
  });

  const afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/hje238/ckvk2sit8119114qgc0lm8ht2',
    center: [-85.9, 37.7],
    zoom: 7
  });

  // A selector or reference to HTML element
  const container = '#comparison-container';

  const map = new mapboxgl.Compare(beforeMap, afterMap, container, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true
  });

})();