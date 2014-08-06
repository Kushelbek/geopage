var geocoder = new google.maps.Geocoder();

$(function() {

	$('#address').autocomplete({
		//Определяем значение для адреса при геокодировании
		source: function(request, response) {
			geocoder.geocode( {
				'address': request.term
			}, function(results, status) {
				response($.map(results, function(item) {
					return {
						label:  item.formatted_address,
						value: item.formatted_address,
						latitude: item.geometry.location.lat(),
						longitude: item.geometry.location.lng()
					}
				}));
			})
		},
		//Выполняется при выборе конкретного адреса
		select: function(event, ui) {
			$('#latitude').val(ui.item.latitude);
			$('#longitude').val(ui.item.longitude);
			var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
			marker.setPosition(location);
			map.setCenter(location);
		}
	});
});

function calculateLatLng(address)
{
	var lat='';
	var lng='';
	geocoder.geocode( {
		'address': address
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK)
		{
			window.document.getElementById('lat').value = results[0].geometry.location.lat();
			window.document.getElementById('lng').value = results[0].geometry.location.lng();
			alert('lat: '+results[0].geometry.location.lat()+'\nlng: '+results[0].geometry.location.lng()+'\ninputLat: '+window.document.getElementById('lat').value+'\ninputLng: '+window.document.getElementById('lng').value);
		}
	});
}

//Добавляем слушателя события обратного геокодирования для маркера при его перемещении  
google.maps.event.addListener(marker, 'drag', function() {
	geocoder.geocode({
		'latLng': marker.getPosition()
	}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				$('#address').val(results[0].formatted_address);
				$('#latitude').val(marker.getPosition().lat());
				$('#longitude').val(marker.getPosition().lng());
			}
		}
	});
});