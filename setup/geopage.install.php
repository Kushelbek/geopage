<?php

/**
 * plugin GeoPage for Cotonti Siena
 * 
 * @package geopage
 * @version 1.0.0
 * @author esclkm
 * @copyright (c) esclkm 2008-2011
 * @license BSD
 *  */
// Generated by Cotonti developer tool (littledev.ru)
defined('COT_CODE') or die('Wrong URL.');

require_once cot_incfile('page', 'module');
global $R, $db_pages;
$cache && $cache->db->remove('cot_extrafields', 'system');
cot_extrafield_add($db_pages, 'geo_latitude', 'double', $R['input_text'], '', '', 0, 'HTML', 'Latitude');
cot_extrafield_add($db_pages, 'geo_longitude', 'double', $R['input_text'], '', '', 0, 'HTML', 'Longitude');

cot_extrafield_add($db_pages, 'geo_country', 'input', $R['input_text'], '', '', 0, 'HTML', 'Сountry');
cot_extrafield_add($db_pages, 'geo_region', 'input', $R['input_text'], '', '', 0, 'HTML', 'Region');
cot_extrafield_add($db_pages, 'geo_locality', 'input', $R['input_text'], '', '', 0, 'HTML', 'Locality');
cot_extrafield_add($db_pages, 'geo_street', 'input', $R['input_text'], '', '', 0, 'HTML', 'Street');

 
