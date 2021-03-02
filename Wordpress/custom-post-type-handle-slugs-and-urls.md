# Remove post_type from url for custom post type

## 1. Set rewrite mode when register_taxonomy as follow:
    'rewrite' => ['slug' => $slug, 'with_front' => false],
## Example:
    register_taxonomy (
        'custom_taxonomy_name',
        'custom_post_type_name',
        array(
            'label' => __('My custom categories', 'mytextdomain'),
            'rewrite' => ['slug' => 'custom-category', 'with_front' => false],
            'hierarchical' => true,
            'show_in_rest' => true
        )
    );



## 2. Set rewrite mode when register_post_type as follow:
    'rewrite' => ['slug' => 'custom-post-type-slug']
## Example
    $args = [
        ...,
        'rewrite' => ['slug' => 'custom-post-type-slug']
        ...,
    ];
    register_post_type('custom_post_type_name', $args );



## 3. Remove the slug from published post permalinks.
    add_filter('post_type_link', function ($post_link, $post, $leavename) {
        $post_type_name = 'custom_post_type_name';

        if ($post->post_type !== $post_type_name || $post->post_status !== 'publish') {
            return $post_link;
        }

        $post_link = str_replace("/{$post_type_name}/", '/', $post_link);
        return $post_link;
    }, 10, 3);



## 4. TODO - remove from taxonomy/categpory (archive)


## Redirect 301 of old urls to fixed urls (if needed)
    add_action('template_redirect', function () {
        $slug = 'custom-post-type-slug';
        // Ignore other post types, categories, txonomies, attachments urls
        if (strpos($_SERVER['REQUEST_URI'], $slug)===false || is_category() || is_tax() || is_attachment()) {
            return;
        }
        wp_redirect(site_url(str_replace($slug, '', $_SERVER['REQUEST_URI'])), 301);
    });

