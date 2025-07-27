'use strict';

var L = require('leaflet');

var osmAttribution = '© <a href="https://www.openstreetmap.org/copyright/en">OpenStreetMap</a> contributors',
    waymarkedtrailsAttribution = '© <a href="http://waymarkedtrails.org">Sarah Hoffmann</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)';

var osm = L.tileLayer('//tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: osmAttribution,
  }),
  standard = L.tileLayer('//tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors under <a ref="http://www.openstreetmap.org/copyright">ODbL</a> | <a href="https://osm.ch/nutze-osm.html">About</a>'
  }),
  swiss_style = L.tileLayer('http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors under <a ref="http://www.openstreetmap.org/copyright">ODbL</a> | <a href="https://osm.ch/nutze-osm.html">About</a>'
  }),
  osm_de = L.tileLayer('//tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    attribution: '<a target="_blank" href="http://www.openstreetmap.org/">Karte hergestellt aus OpenStreetMap-Daten</a> | Lizenz: <a rel="license" target="_blank" href="http://opendatacommons.org/licenses/odbl/">Open Database License (ODbL)</a>'
  }),
  
  hiking = L.tileLayer('//tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
    attribution: waymarkedtrailsAttribution,
  }),
  bike = L.tileLayer('//tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
    attribution: waymarkedtrailsAttribution,
  }),
  small_components = L.tileLayer('https://tools.geofabrik.de/osmi/tiles/routing/{z}/{x}/{y}.png', {});

module.exports = {
  defaultState: {
    center: L.latLng(47, 8),
    zoom: 10,
    waypoints: [],
    language: 'en',
    alternative: 0,
    layer: standard,
    service: 1
  },
  services: [{
    label: 'Car (fastest)',
    path: '/routed-car/route/v1',
    debug: 'car',
    fixspeed: 0
  },
  {
    label: 'Bike (city)',
    path: '/routed-bike/route/v1',
    debug: 'bike',
    fixspeed: 18
  },
  {
    label: 'Bike (touring)',
    path: '/routed-bike-touring/route/v1',
    debug: 'bike-touring',
    fixspeed: 18
  },
  {
    label: 'Foot (city)',
    path: '/routed-foot/route/v1',
    debug: 'foot',
    fixspeed: 4.5
  },
  {
    label: 'Foot (hiking)',
    path: '/routed-hiking/route/v1',
    debug: 'hiking',
    fixspeed: 4.5
  },
  {
    label: 'Foot (vampire)',
    path: '/routed-vampire/route/v1',
    debug: 'vampire',
    fixspeed: 4.0
  },
  {
    label: 'Wheelchair',
    path: '/routed-wheelchair/route/v1',
    debug: 'wheelchair',
    fixspeed: 0
  }],
  layer: [{
    'standard': standard,
    'swiss style': swiss_style,
    'osm.de': osm_de
  }],
  overlay: {
    'Hiking': hiking,
    'Bike': bike,
    'Small Components': small_components
  },
  baselayer: {
    one: standard,
    four: osm,
    two: swiss_style,
    three: osm_de
  }
};
