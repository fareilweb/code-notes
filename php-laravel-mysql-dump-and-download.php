<?php


Route::get('dbdump', function(Request $request) {
    if ($request->has('temp_pass') === false || $request->get('temp_pass') !== 'secretpass') {
        return die('Auth failed');
    }

    $DB_HOST = env('DB_HOST');
    $DB_USERNAME = env('DB_USERNAME');
    $DB_PASSWORD = env('DB_PASSWORD');
    $DB_DATABASE = env('DB_DATABASE');

    $dumpFileName = date('YmdHis') . '.sql';
    $dumpFilePath = realpath(app_path('../../dbdumps')) . "/{$dumpFileName}";

    // Make the dump
    $dumpCommand = "mysqldump --no-tablespaces --single-transaction --user={$DB_USERNAME} --password={$DB_PASSWORD} --host={$DB_HOST} {$DB_DATABASE} --result-file={$dumpFilePath} 2>&1";
    set_time_limit(0);
    exec($dumpCommand, $out);

    // Compress the dump into a zip archive
    $zip = new ZipArchive();
    $zip->open("{$dumpFilePath}.zip", ZipArchive::CREATE);
    $zip->addFile($dumpFilePath, $dumpFileName);
    $zip->close();

    // Delete the dump
    unlink($dumpFilePath);

    if (file_exists("{$dumpFilePath}.zip")) {
        return response()->download("{$dumpFilePath}.zip", "{$dumpFileName}.zip");
    } else {
        return 'Error: <br>' . array_reduce($out, function($carry, $item) {
            if (empty($carry)) { $carry =  ''; }
            return $carry .= $item . '<br>';
        });
    }
});
