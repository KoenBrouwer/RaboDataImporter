<?php
include_once("./things.inc.php");

/* Allow access from all origins */
header("Access-Control-Allow-Origin: *");

function isPost(){
	/* Get the body of the request */
	$originalData = $data = file_get_contents("php://input");
	
	/* Start processing the data */
	
	/* First, split the data by line breaks, so that every line is a new item in the array */
	$data = explode("\r\n", $data);
	
	/* Next, create a placeholder for the formatted data */
	$formattedData = [];
	
	/* Loop through the data */
	foreach($data as $i => $entries){
		/* Split every line by a comma */
		$entries = explode(",", $entries);
		
		/* If it's the first row, consider that the field names */
		if($i === 0){
			/* Loop through all entries and save them as fieldNames */
			foreach($entries as $j => $entry){
				/* Strip out the quotes before and after the fieldname */
				$formattedData["fieldNames"][$j] = stripQuotes($entry);
			}
		}
		/* If we're not at the first row, consider this row data */
		else{
			/* Prepare a placeholder array */
			$item = [];
			
			/* Loop through all entries and remember their indexes to find the corresponding fieldName */
			foreach($entries as $j => $entry){
				/* And put them in the item */
				$item[$formattedData["fieldNames"][$j]] = stripQuotes($entry);
			}
			
			/* Cast the item to an object and add it to the formattedData array */
			$formattedData["data"][] = (object) $item;
		}
	}
	
	/* Now, the formatted data is a level deeper, so put that to the front and present that back. */
	$formattedData = $formattedData["data"];
	
	/* Save the imported data as a JSON file, for later use */
	file_put_contents(DatabaseFile, json_encode($formattedData, JSON_PRETTY_PRINT));
	
	return json_encode([
						 "success" => true,
						 "formattedData" => $formattedData,
						 "originalData" => $originalData,
					 ]);
}

function isGet(){
	$data = file_get_contents(DatabaseFile);
	return json_encode([
		"success" => true,
		"data" => json_decode($data),
	]);
}

if($_SERVER["REQUEST_METHOD"] === "GET"){
	echo isGet();
}
elseif($_SERVER["REQUEST_METHOD"] === "POST"){
	echo isPost();
}
else{
	http_response_code(405);
	echo json_encode([
						 "success" => false,
						 "message" => "Please GET or POST some data to this URL."
					 ]);
	die;
}
