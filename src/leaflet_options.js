'use strict';

var L = require('leaflet');

var standard = L.tileLayer('//tile.osm.ch/switzerland/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors under <a ref="http://www.openstreetmap.org/copyright">ODbL</a>'
  }),
  swiss_style = L.tileLayer('http://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors under <a ref="http://www.openstreetmap.org/copyright">ODbL</a>'
  }),
 osm_de = L.tileLayer('//{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    attribution: 'Map data © OpenStreetMap contributors under <a ref="http://www.openstreetmap.org/copyright">ODbL</a>'
  }),
  hiking = L.tileLayer('//tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {}),
  bike = L.tileLayer('//tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {})

module.exports = {
  defaultState: {
    center: L.latLng(47, 8),
    zoom: 10,
    waypoints: [],
    language: 'en',
    alternative: 0,
    layer: standard
  },
  services: [{
    label: 'Car (fastest)',
    path: '/routed-car/route/v1'
  },
  {
    label: 'Bike (city)',
    path: '/routed-bike/route/v1'
  },
  {
    label: 'Bike (touring)',
    path: '/routed-bike-touring/route/v1'
  },
  {
    label: 'Foot',
    path: '/routed-foot/route/v1'
  },
  {
    label: 'Hiking',
    path: '/routed-hiking/route/v1'
  }],
  layer: [{
    'standard': standard,
    'swiss style': swiss_style,
    'osm.de': osm_de
  }],
  overlay: {
    'hiking': hiking,
    'bike': bike,
  },
  baselayer: {
    one: standard,
    two: swiss_style,
    three: osm_de
  }
};
