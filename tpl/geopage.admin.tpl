<!-- BEGIN: MAIN -->
{FILE "{PHP.cfg.themes_dir}/{PHP.cfg.defaulttheme}/warnings.tpl"}


<h2>Geopage</h2>
<div class="block">
	<form action="{PAGE_URL}" method="post">
		<table class="cells">
			<tr>
				<td class="coltop width20">{PHP.L.page_title}</td>
				<td class="coltop width20">{PHP.L.page_map_lat}</td>
				<td class="coltop width20">{PHP.L.page_map_lon}</td>
				<td class="coltop width10">{PHP.L.page_map_country}</td>
				<td class="coltop width10">{PHP.L.page_map_region}</td>
				<td class="coltop width10">{PHP.L.page_map_locality}</td>
				<td class="coltop width10">{PHP.L.page_map_street}</td>
			</tr>
<!-- BEGIN: PAGE_ROW -->
			<tr id="{PAGE_ROW_IDCLASS}" class="geopageline">
				<td>{PAGE_ROW_SHORTTITLE}</td>
				<td>{PAGE_ROW_GEO_LATITUDE}</td>
				<td>{PAGE_ROW_GEO_LONGITUDE}</td>
				<td>{PAGE_ROW_GEO_COUNTRY}</td>
				<td>{PAGE_ROW_GEO_REGION}</td>
				<td>{PAGE_ROW_GEO_LOCALITY}</td>
				<td>{PAGE_ROW_GEO_STREET}</td>
			</tr>
<!-- END: PAGE_ROW -->
<!-- BEGIN: PAGE_NOROW -->
			<tr>
				<td colspan="7">{PHP.L.None}</td>
			</tr>
<!-- END: PAGE_NOROW -->
		</table>
		<div class="action_bar valid">
			<input type="submit" class="submit" value="{PHP.L.Update}" />
		</div>
	</form>
</div>
<!-- END: MAIN -->