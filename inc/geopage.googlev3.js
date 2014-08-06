// попытка сделать проверки
if (typeof zoom === 'undefined') var zoom = 10;
if (typeof lat === 'undefined') var lat = 53.902;
if (typeof lng === 'undefined') var lng = 27.557;
if (typeof mapid === 'undefined') var mapid = 'mapid';
if (typeof places === 'undefined') var places = [];


var map, markers = [], smarker;

function setMarkers(map, locations, autocenter) {
	autocenter = autocenter|| true;
	//Определяем область показа маркеров
	if(locations.length)
	{
		var latlngbounds = new google.maps.LatLngBounds();	
		for (var i = 0; i < places.length; i++) {
			var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
			//Добавляем координаты маркера в область
			latlngbounds.extend(myLatLng);
			var marker = new google.maps.Marker({
				position: myLatLng,
				map: map,   
				content: locations[i][3],
				link: locations[i][4],
				title: locations[i][0]
			}); 
			var infowindow = new google.maps.InfoWindow({
				content: locations[i][3]
			});
			markers.push(marker);
			if ( locations[i][3] != "")
			{
				google.maps.event.addListener(marker, "click", function() {
					infowindow.setContent(this.content);
					infowindow.open(map,this);
					});
			}

		}
		if(autocenter)
		{
			zoom = (markers.length > 1) ? map.fitBounds(latlngbounds) : zoom;
			map.setCenter( latlngbounds.getCenter(), zoom);
		}
	}
};

function setMarker(map, lat, lng, text, autocenter) {
	autocenter = autocenter|| true;
	//Определяем область показа маркеров
	var latlngbounds = new google.maps.LatLngBounds();	
	var myLatLng = new google.maps.LatLng(lat, lng);
	//Добавляем координаты маркера в область
	if(smarker){smarker.setMap(null);}
	latlngbounds.extend(myLatLng);
	smarker = new google.maps.Marker({
		position: myLatLng,
		map: map,   
		title: text,
		draggable: true
	}); 
	if(autocenter)
	{
		zoom = (markers.length > 1) ? map.fitBounds(latlngbounds) : zoom;
		map.setCenter( latlngbounds.getCenter(), zoom);
	}
};

function clearOverlays() {
	if (markers) {
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
	}
}

$(window).load(function() { 
	$("#geolocate").show();
	$("#showonmap").show();
	$("#" + mapid).show();
	
	var infowindow = new google.maps.InfoWindow({
		content: ""
	});
	var latlng = new google.maps.LatLng(lat, lng);
	var myOptions = {
		zoom: zoom,
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById(mapid), myOptions);

	setMarkers(map, places);
	
	var var_lat = $('[name=rpagegeo_latitude]');
	var var_lon = $('[name=rpagegeo_longitude]');
	var geocou = $('[name=rpagegeo_country]');
	var georeg = $('[name=rpagegeo_region]');
	var geoloc = $('[name=rpagegeo_locality]');
	var geostr = $('[name=rpagegeo_street]');
	var geotitle = $('[name=rpagetitle]'); 

	if($('#geolocate').length) 
	{
		
		var geocoder = new google.maps.Geocoder();
		
		smarker = new google.maps.Marker({position: latlng,	map: map,  title: '',	draggable: true	});
		 
		$('#geolocate').click(function(){
			var address = geocou.val() + ', '+georeg.val() + ', ' + geoloc.val() + ', ' + geostr.val();
						
			geocoder.geocode({'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK)
				{
					var_lat.val(results[0].geometry.location.lat());
					var_lon.val(results[0].geometry.location.lng());
					setMarker(map, var_lat.val(), var_lon.val(), geotitle.val());
				}
			}); 
		});
			
		$('#showonmap').click(function(){
			setMarker(map, var_lat.val(), var_lon.val(), geotitle.val());
		});		
		//Добавляем слушателя события обратного геокодирования для маркера при его перемещении 
		google.maps.event.addListener(smarker, 'dragend', function() {
			var position = this.getPosition();
			geocoder.geocode({'latLng': position}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var maptext = results[0].formatted_address;
						var maparr = maptext.split(/[,]/);
						geocou.val(maparr[2]);
						geoloc.val(maparr[1]);
						geostr.val(maparr[0]);
						var_lat.val(position.lat());
						var_lon.val(position.lng());
					}
				}
			});
		});
	}
});
