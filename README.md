geopage
=======

Геолокатор для страниц
В текущий момент используется только апи карт Google. Однако существует возможность подключения собственного апи.

При использовании в следующие шаблоны необходимо добавить:

page.add.tpl
============

	<tr>
		<td colspan="2">
			{PHP.L.geo_country}: {PAGEADD_FORM_GEO_COUNTRY} {PHP.L.geo_region}: {PAGEADD_FORM_GEO_REGION}<br/> 
			{PHP.L.geo_locality}: {PAGEADD_FORM_GEO_LOCALITY}
			{PHP.L.geo_street}: {PAGEADD_FORM_GEO_STREET}
			<br />
			<button name="geolocate" type="button" id="geolocate" style="display:none;">{PHP.L.getgeolocate}</button>	
			<button id="showonmap" name="showonmap" type="button" style="display:none;">{PHP.L.showonmap}</button>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			{PHP.L.geo_longitude}: {PAGEADD_FORM_GEO_LONGITUDE} {PHP.L.geo_latitude}: {PAGEADD_FORM_GEO_LATITUDE}
		</td>
	</tr>
	<tr>
		<td colspan="2">
			{GEOMAP}
		</td>
	</tr>

page.edit.tpl
=============

	<tr>
		<td colspan="2">
			{PHP.L.geo_country}: {PAGEEDIT_FORM_GEO_COUNTRY} {PHP.L.geo_region}: {PAGEEDIT_FORM_GEO_REGION}<br/>
			{PHP.L.geo_locality}: {PAGEEDIT_FORM_GEO_LOCALITY}
			<!--{PHP.L.rayon}: {PAGEEDIT_FORM_GEO_RAYON}-->
			{PHP.L.geo_street}: {PAGEEDIT_FORM_GEO_STREET}
			<br />
			<button name="geolocate" type="button" id="geolocate" style="display:none;">{PHP.L.getgeolocate}</button>	
			<button id="showonmap" name="showonmap" type="button" style="display:none;">{PHP.L.showonmap}</button>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			{PHP.L.geo_longitude}: {PAGEEDIT_FORM_GEO_LONGITUDE} {PHP.L.geo_latitude}: {PAGEEDIT_FORM_GEO_LATITUDE}
		</td>
	</tr>
	<tr>
		<td colspan="2">
			{GEOMAP}
		</td>
	</tr>


page.list.tpl
=============

	<div id="togglemap">
		{GEOMAP}
	</div>

page.tpl
===========

	<div class="content clearfix" id="overview_map_view_module">
		{GEOMAP}
	</div>  