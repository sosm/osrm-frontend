'use strict';

var L = require('leaflet');
var qs = require('qs');
var jsonp = require('jsonp');

function _formatCoord(latLng) {
  var precision = 6;
  if (!latLng) {
    return;
  }
  return latLng.lat.toFixed(precision) + "," + latLng.lng.toFixed(precision);
}

function _parseCoord(coordStr) {
  var latLng = coordStr.split(','),
    lat = parseFloat(latLng[0]),
    lon = parseFloat(latLng[1]);
  if (isNaN(lat) || isNaN(lon)) {
    throw {
      name: 'InvalidCoords',
      message: "\"" + coordStr + "\" is not a valid coordinate."
    };
  }
  return L.latLng(lat, lon);
}

function _parseInteger(intStr) {
  var integer = parseInt(intStr, 10);
  if (isNaN(integer)) {
    throw {
      name: 'InvalidInt',
      message: "\"" + intStr + "\" is not a valid integer."
    };
  }
  return integer;
}

function formatLink(options) {
    // Output all waypoints as loc parameters, using empty string for missing
    var locs = undefined;
    if (options.waypoints) {
        locs = options.waypoints.map(function(wp) {
            return wp && wp.latLng ? _formatCoord(wp.latLng) : '';
        });
    }
    return qs.stringify({
        z: options.zoom,
        center: options.center ? _formatCoord(options.center) : undefined,
        loc: locs,
        hl: options.language,
        alt: options.alternative,
        df: options.units,
        srv: options.service
    }, {indices: false});
}

function parseLink(link) {
  if (!link) return {};
  var q = qs.parse(link),
    parsedValues = {},
    options = {},
    k;
  try {
    if (q.z !== undefined && q.z !== null) parsedValues.zoom = _parseInteger(q.z);
    parsedValues.center = q.center && _parseCoord(q.center);
    if (q.loc) {
      if (q.loc.constructor === Array) {
        // any number of locs: start, via, end, etc.
        parsedValues.waypoints = q.loc.map(function(loc) {
          return loc && loc !== '' ? L.Routing.waypoint(_parseCoord(loc)) : L.Routing.waypoint(null);
        });
      } else if (q.loc.constructor === String) {
        // exactly one loc is given (backward compatibility)
        parsedValues.waypoints = [L.Routing.waypoint(_parseCoord(q.loc))];
      }
    }
    parsedValues.language = q.hl;
    parsedValues.alternative = q.alt;
    parsedValues.units = q.df;
    parsedValues.layer = q.ly;
    parsedValues.service = q.srv;
  } catch (e) {
    console.log("Exception " + e.name + ": " + e.message);
  }
  for (k in parsedValues) {
    if (parsedValues[k] !== undefined && parsedValues[k] !== "") {
      options[k] = parsedValues[k];
    }
  }
  return options;
}


module.exports = {
  'parse': parseLink,
  'format': formatLink
};

