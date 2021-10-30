<?php

function getWordsOfPascalOrCamelCaseCase(string $inputString) {
    // $pattern = '/[A-Z][a-z]+/';
    $pattern = '!([A-Z][A-Z0-9]*(?=$|[A-Z][a-z0-9])|[A-Za-z][a-z0-9]+)!';
    preg_match_all($pattern, $inputString, $nameParts);
    return $nameParts[0];
}
