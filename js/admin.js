$(document).ready(function(){
	var geocoder;
	var address;
	var lacations;
	
	geocoder = new mxn.Geocoder(map_engine, geocode_return, function(){});
	function geocode_return(location) {
		lacations = location.point;
	}

	$(".geopageline").each(function (i) {
		address = new Object();
		address.street = $(this).find(".geo_street").val();
		address.locality = $(this).find(".geo_locality").val();
		address.region = $(this).find(".geo_region").val();
		address.country = $(this).find(".geo_country").val();

		geocoder.geocode(address);   
		
		$(this).find(".geo_latitude").val(lacations.lon);
		$(this).find(".geo_longitude").val(lacations.lat);		
	});
	

});