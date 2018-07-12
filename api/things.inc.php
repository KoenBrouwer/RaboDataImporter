<?php
function debug($x){
	echo "<pre>";
	print_r($x);
	echo "</pre>";
}

function stripQuotes($string){
	return preg_replace("/^(\")(.*)(\")$/", "$2", $string);
}

define("DatabaseFile", "database.json");