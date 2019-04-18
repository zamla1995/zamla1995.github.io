//карта
var map = L.map('map').setView([55.326944, 55.0075], 5);

//слой osm
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

//геопоиск
new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.OpenStreetMap()
        }).addTo(map);

//появление по клику
function view(n) {
					style = document.getElementById(n).style;
					style.display = (style.display == 'block') ? 'none' : 'block';
				}

function hide(n) {
					style = document.getElementById(n).style;
					style.display = 'none';
				}

// размещение слоя geojson
function onEachFeature(feature, layer) {
		var popupContent = "<p>Тут слой " +
		feature.geometry.type + " пожаров </p>";
 
			if (feature.properties && feature.properties.popupContent) {
				popupContent += feature.properties.popupContent;
			}
 
			layer.bindPopup(popupContent);
		}

var testLayer = L.geoJson(test, {
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {icon: baseballIcon});
	},
 
	onEachFeature: onEachFeature
}).addTo(map);
 
L.control.scale().addTo(map);

var popup = L.popup();

// прочее
function div(val, by){
	return (val - val % by) / by;
}

function two(val){
	value = (String(parseInt(val)).length<2)? "0" + String(val) : val;
	return value
}
	
function onMapMove1(e) {
    var coord = e.latlng
	
	var longitude = coord.lng
	var long_deg = div(longitude, 1)
	long_deg = two(long_deg)
	var long_min = div((60 * (longitude%1)), 1)
	long_min = two(long_min)
	var n = (3600 * (longitude%1))%60
	var long_sec = Math.round(n * 100) / 100
	long_sec = two(long_sec)
	var lon_str = long_deg + "° " + long_min + "' " + long_sec +'" в.д.'
	
	var latitude = coord.lat
	var lat_deg = div(latitude, 1)
	lat_deg = two(lat_deg)
	var lat_min = div((60 * (latitude%1)), 1)
	lat_min = two(lat_min)
	var m = (3600 * (latitude%1))%60
	var lat_sec = Math.round(m * 100) / 100
	lat_sec = two(lat_sec)
	var lat_str = lat_deg + "° " + lat_min + "' " + lat_sec +'" с.ш. '
	
	var coordinates = lat_str + lon_str
	
	document.getElementById("coordinates1").innerHTML = coordinates
}

map.on('mousemove', onMapMove1);

function onMapMove2(e) {
    var coord = e.latlng
	
	var longitude = (coord.lng).toFixed(6)
	var latitude = (coord.lat).toFixed(6)
	
	var coordinates = latitude + "N " + longitude + "E"
		
	document.getElementById("coordinates2").innerHTML = coordinates
}

map.on('mousemove', onMapMove2);


//добавление слоя геотифф
var layer = L.leafletGeotiff(url = "images/AMSR.tif").addTo(map);
