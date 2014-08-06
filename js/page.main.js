$(document).ready(function(){
	var mapstraction;

	if (parseFloat(map_lat) > 0 && parseFloat(map_lon) > 0)
	{
		mapstraction = new mxn.Mapstraction("map_canvas", map_engine);
		$("#map_canvas").show();
		mapstraction.setCenterAndZoom(new mxn.LatLonPoint(map_lat, map_lon), map_pointzoom);
		// маркер
		var myPoint = new mxn.LatLonPoint(map_lat, map_lon);		
		my_marker = new mxn.Marker(myPoint);
		my_marker.setInfoBubble(map_title);
		mapstraction.addMarker(my_marker);	
		
		mapstraction.addControls({
			pan: true, 
			zoom: "large",
			map_type: true 
		});
	}
});