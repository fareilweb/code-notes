<?php

$rootDirs = [
    __DIR__ . '/public'
];

$files = [];

$chunkSize = 100;

foreach($rootDirs as $dir) {
    // Construct the iterator
    $iterator = new RecursiveDirectoryIterator($dir);

    /** @var SplFileInfo $file */
    foreach(new RecursiveIteratorIterator($iterator) as $file) {
        if ($file->isFile()) {
            $file = $file->getRealPath();
            array_push($files, $file);
        }
    }
}

$filesChunks = array_chunk($files, $chunkSize);
foreach($filesChunks as $chunk) {
    foreach($chunk as $file) {
        exec("git add {$file}", $out1);
    }
    exec("git commit -m 'chunked commit' && git push", $out2);
    print_r([
        'out1' => $out1,
        'out2' => $out2
    ]);
}
