// попытка сделать проверки
if (typeof zoom === 'undefined')
	var zoom = 10;
if (typeof lat === 'undefined')
	var lat = 53.902;
if (typeof lng === 'undefined')
	var lng = 27.557;
if (typeof mapid === 'undefined')
	var mapid = 'mapid';
if (typeof places === 'undefined')
	var places = [];


var map, markers = [], smarker;

function setMarkers(map, locations, autocenter) {
	autocenter = autocenter || true;
	//Определяем область показа маркеров
	if (locations.length)
	{
		var markerCollection = new ymaps.GeoObjectCollection();
		for (var i = 0; i < places.length; i++) {

			var marker = new ymaps.GeoObject({
				geometry: {
					type: "Point",
					coordinates: [locations[i][1], locations[i][2]]
				},
				properties: {
					hintContent: locations[i][0]
				}
			});
			marker.events.add('click', function(e) {
				document.location.replace("locations[i][4]");
			});

			markerCollection.add(marker);

		}
		map.geoObjects.add(markerCollection);
		if (autocenter)
		{
			map.setBounds(markerCollection.getBounds());
		}
	}
}
;

function setMarker(map, lat, lng, text, autocenter) {
	autocenter = autocenter || true;

	if (smarker) {
		map.geoObjects.remove(smarker);
	}
	smarker = new ymaps.GeoObject({
		geometry: {
			type: "Point",
			coordinates: [lat, lng]
		},
		properties: {
			hintContent: text
		}
	}, {
		draggable: true
	});

	smarker.events.add('dragend', function(e) {
		// Получение ссылки на объект, который был передвинут.
		var thisPlacemark = e.get('target');
		// Определение координат метки
		var coords = thisPlacemark.geometry.getCoordinates();
		$('[name=rpagegeo_latitude]').val(coords[0]);
		$('[name=rpagegeo_longitude]').val(coords[1]);

	});
	map.geoObjects.add(smarker);

	if (autocenter)
	{
		map.setCenter([lat, lng]);
	}
}
;

function clearOverlays() {
	map.geoObjects.removeAll();
}

$(window).load(function() {
	$("#geolocate").show();
	$("#showonmap").show();
	$("#" + mapid).show();


	map = new ymaps.Map(mapid, {
		center: [lat, lng], // Москва
		zoom: zoom,
		controls: ['zoomControl', 'typeSelector', 'fullscreenControl']
	});
	setMarkers(map, places);

	var var_lat = $('[name=rpagegeo_latitude]');
	var var_lon = $('[name=rpagegeo_longitude]');
	var geocou = $('[name=rpagegeo_country]');
	var georeg = $('[name=rpagegeo_region]');
	var geoloc = $('[name=rpagegeo_locality]');
	var geostr = $('[name=rpagegeo_street]');
	var geotitle = $('[name=rpagetitle]');

	if ($('#geolocate').length)
	{
		$('#geolocate').click(function() {
			var address = geocou.val() + ', ' + georeg.val() + ', ' + geoloc.val() + ', ' + geostr.val();
			var myGeocoder = ymaps.geocode(address);
			myGeocoder.then(function(res) {
					var coords = res.geoObjects.get(0).geometry.getCoordinates();
					var_lat.val(coords[0]);
					var_lon.val(coords[1]);
					setMarker(map, coords[0], coords[1], geotitle.val());
				});
		});

		$('#showonmap').click(function() {
			setMarker(map, var_lat.val(), var_lon.val(), geotitle.val());
		});
	}
});
// смотреть хинт метки
// http://api.yandex.ru/maps/jsbox/2.1/placemark_hint_layout