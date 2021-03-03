# Add async defer (or any other attribute) to scripts

    function add_async_defer_to_scripts($handles = []) {
        add_filter('script_loader_tag', function ($tag, $handle, $src) use ($handles) {

            if (in_array($handle, $handles)) {
                if (false === stripos($tag, 'async')) {
                    $tag = str_replace(' src', ' async="async" src', $tag);
                }

                if (false === stripos($tag, 'defer')) {
                    $tag = str_replace('<script ', '<script defer ', $tag);
                }
            }

            return $tag;
        }, 10, 3);
    }

    // Usage
    add_async_defer_to_scripts(['script-handle-1', 'script-handle-2', '...']);