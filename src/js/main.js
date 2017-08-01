//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var $ = require("jquery");

var data = require("./new.geo.json");

var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

var onEachFeature = function(feature, layer) {
  layer.bindPopup(ich.popup(feature.properties))
};

 map.scrollWheelZoom.disable();


 function geojsonMarkerOptions(feature) {

  return {
    radius: 7,
    fillColor: "#356d24",
    color: "#ffffff",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  }
};

 var geojson = L.geoJson(data, {
    pointToLayer: function (features, latlng) {
      var marker = L.circleMarker(latlng);
      return marker;
    },
    style: geojsonMarkerOptions,
    onEachFeature: onEachFeature
}).addTo(map);

