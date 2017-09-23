<?php
/**
 * Elzero
 * Created by PhpStorm.
 * User: moataz
 * Date: 9/16/17
 * Time: 2:34 PM
 */
//How to Remove the WordPress Admin Toolbar From Your Site - WPMU DEV
// show_admin_bar( false ); //add_filter( 'show_admin_bar', '__return_false' );
define( 'PHANTOMJS', '/usr/local/bin/phantomjs' );


/* ##################################################### Helpers (start)*/
function get_folder_from_template_directory( $folderName ) {
	$folderNamePath = get_template_directory_uri() . "/" . $folderName . "/";

	return $folderNamePath;
}

/* ##################################################### Helpers (END)*/

/**
 * Enqueue scripts and styles.
 */
function enqueue_elzero_styles_and_scripts() {

	// Enqueue .css files
	$css_files = [
		'bootstrap.min', //file name in css folder
		'bootstrap-theme.min',
		'font-awesome.min',
		'styles', // Elzero styles
	];

	// if admin_bar_showing load admin_bar_showing.css file

	if (    is_admin_bar_showing()) {
		array_push($css_files, "admin_bar_showing");

	}
	for ( $css_file = 0; $css_file <= count( $css_files ); $css_file ++ ) {
		wp_enqueue_style( $css_files[ $css_file ], get_folder_from_template_directory( 'css' ) . $css_files[ $css_file ] . '.css', array(), null, 'screen' );
	}


	//	Remove a registered script. (jquery)
	wp_deregister_script( 'jquery' );


	// Enqueue .js files
	$js_files = [
		[ file_name => 'jquery.min', inFooter => true ],
		[ file_name => 'bootstrap.min', inFooter => true ],
		[ file_name => 'main', inFooter => true ],
		[ file_name => 'html5shiv.min', inFooter => false, conditional => 'if lt IE 9' ], //if IE less than v9
		[ file_name => 'respond.min', inFooter => false, conditional => 'if lt IE 9' ],  //if IE less than v9
	];



	wp_style_add_data( 'iepolyfill', 'conditional', 'if lt IE 9' );

	for ( $js_file = 0; $js_file <= count( $js_files ); $js_file ++ ) {
		wp_enqueue_script( $js_files[ $js_file ][ file_name ], get_folder_from_template_directory( 'js' ) . $js_files[ $js_file ][ file_name ] . '.js', array(), null, $js_files[ $js_file ][ inFooter ] );

		// Add metadata to a script. if conditional
		if ( $js_files[ $js_file ][ conditional ] ) {
			wp_script_add_data( $js_files[ $js_file ][ file_name ], 'conditional', $js_files[ $js_file ][ conditional ] );
		}


	}


}


//Execute functions hooked on a specific action hook.
//wp_enqueue_scripts => proper hook to use when enqueuing items that are meant to appear on the front end. Despite the name, it is used for enqueuing both scripts and styles.
add_action( 'wp_enqueue_scripts', 'enqueue_elzero_styles_and_scripts' );


// Register Custom Navigation Walker
require_once get_template_directory() . '/wp-bootstrap-navwalker.php';


//Navigation Menus | Theme Developer Handbook | WordPress Developer Resources
function register_elzero_menus() {
	register_nav_menus( [
		'main-menu'   => 'Main Menu',
		'footer-menu' => 'Footer Menu',
	] );
}

add_action( 'init', 'register_elzero_menus' );


// list of features to add
$features_lit = [
	[feature_name => 'post-formats', arr => ['aside', 'gallery'] ],
	[feature_name => 'post-thumbnails' ],
	[feature_name => 'html5' ],
	[feature_name => 'custom-logo' ],
	[feature_name => 'custom-header-uploads' ],
	[feature_name => 'custom-header' ],
	[feature_name => 'custom-background' ],
	[feature_name => 'title-tag' ],
	[feature_name => 'starter-content' ],

];

for ( $feature = 0; $feature <= count( $features_lit ); $feature ++ ) {
	//Registers theme support for a given featur
	add_theme_support( $features_lit[ $feature ][feature_name] );
}








/*excerpt_more*/
function wpdocs_excerpt_more(  ) {
	return '<a href="'.get_the_permalink().'" class="btn btn-blog pull-right marginBottom10 read-more-link"> Read More...</a>';
}
add_filter( 'excerpt_more', 'wpdocs_excerpt_more' );


/*excerpt_length*/

function wpdocs_excerpt_length(  ) {
	return 4;
}
//add_filter( 'excerpt_length', 'wpdocs_excerpt_length');
