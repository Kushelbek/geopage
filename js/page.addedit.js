$(document).ready(function(){
	var mapstraction;
	var geocoder;
	var address;
	
	var var_lat = $("[name=rpagegeo_latitude]");
	var var_lon = $("[name=rpagegeo_longitude]");
	
	var geocou = $("[name=rpagegeo_country]");
	var georeg = $("[name=rpagegeo_region]");
	var geoloc = $("[name=rpagegeo_locality]");
	var geostr = $("[name=rpagegeo_street]");
	
	var geotitle = $("[name=rpagetext]"); 
	$("#geolocate").show();
	$("#showonmap").show();
	$("#map_canvas").show();
	
	mapstraction = new mxn.Mapstraction("map_canvas", map_engine);
	if (parseFloat(var_lat.val()) > 0 && parseFloat(var_lon.val()) > 0)
	{
		mapstraction.setCenterAndZoom(new mxn.LatLonPoint(var_lat.val(), var_lon.val()), map_pointzoom);
		// маркер
		var myPoint = new mxn.LatLonPoint(var_lat.val(), var_lon.val());		
		my_marker = new mxn.Marker(myPoint);
		my_marker.setInfoBubble(geotitle.val());
		mapstraction.addMarker(my_marker);	
	}
	else
	{
		mapstraction.setCenterAndZoom(new mxn.LatLonPoint(map_deflat, map_deflon), map_defzoom);
	}
	
	geocoder = new mxn.Geocoder(map_engine, geocode_return, function(){});
	
	mapstraction.addControls({
		pan: true, 
		zoom: "large",
		map_type: true 
	});
	//

	$("#showonmap").click(function(){
		// ставим точку
		mapstraction.setCenterAndZoom(new mxn.LatLonPoint(var_lat.val(), var_lon.val()), map_pointzoom);
		// маркер
		var myPoint = new mxn.LatLonPoint(var_lat.val(), var_lon.val());		
		my_marker = new mxn.Marker(myPoint);
		my_marker.setInfoBubble(geotitle.val());
		mapstraction.addMarker(my_marker);
	// эддоны
		
	});

	$("#geolocate").click(function(){
		address = new Object();
		address.street = geostr.val();
		address.locality = geoloc.val();
		address.region = georeg.val();
		address.country = geocou.val();

		geocoder.geocode(address);    

	});
	
	$("[name=pageform]").submit(function(){
		if(var_lon.val() != '' && var_lon.val() != '')
		{
			address = new Object();
			address.street = geostr.val();
			address.locality = geoloc.val();
			address.region = georeg.val();
			address.country = geocou.val();

			geocoder.geocode(address);    
		}
		return(true);
	});	
	
	function geocode_return(location) {
		mapstraction.setCenterAndZoom(location.point, map_pointzoom);
		geocode_marker = new mxn.Marker(location.point);
		
		var_lon.val(location.point.lon);
		var_lat.val(location.point.lat);
		
		geocode_marker.setInfoBubble(geotitle.val());
		// display marker 
		mapstraction.addMarker(geocode_marker);
	}

	

});