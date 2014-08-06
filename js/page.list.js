var mapstraction;
var myPoint;
$(document).ready(function(){
	mapstraction = new mxn.Mapstraction("map_canvas", map_engine);
	$("#map_canvas").show();
	mapstraction.setCenterAndZoom(new mxn.LatLonPoint(map_deflat, map_deflon), map_defzoom);
		
	mapstraction.addControls({
		pan: true, 
		zoom: "large",
		map_type: true 
	});

});