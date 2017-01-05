<?php
$file ="parse_specials.csv";

$csv = file_get_contents($file);
$array = array_map("str_getcsv", explode("\n", $csv));

$fields = array();
$array_values = array();
$json_values = "";
foreach($array as $key => $val) 
{
    if ($key === 0) {
            $fields = explode( "|", $val[0] );
    }else{
            $array_row = explode("|",  $val[0]);
            $parsed_row = array();
            foreach($array_row as $key => $val){
                    $parsed_row[$fields[$key]] = $val;
            }
            array_push($array_values, $parsed_row);	
    }
}

$json_values = json_encode($array_values);



$source_encoding = mb_detect_encoding($json_values);
$data = mb_convert_encoding($json_values, 'UTF-8', $source_encoding);
file_put_contents("parsed_file.json", $data);

?>