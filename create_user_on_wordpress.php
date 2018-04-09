<?php
require_once "wp-load.php";
$user_info = array(
	"user_pass"     => "password",
	"user_login"    => "john",
	"user_nicename" => "John Doe",
	"user_email"    => "johndoe@email.xxx",
	"display_name"  => "John Doe",
	"first_name"    => "John",
	"last_name"     => "Doe",
);
$insert_user_result = wp_insert_user( $user_info );
if ( is_wp_error($return) ) {
   die($insert_user_result->get_error_message());
} else {
	echo "Successfully created user with id: {$insert_user_result}";
}