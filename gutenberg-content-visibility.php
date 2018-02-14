<?php
/**
 * Plugin Name: Gutenberg Content Visibility
 * Plugin URI: #
 * Description: Adjust the visibility of the content on a block-by-block basis
 * Version: 0.1.0
 * Author: Richard Tape
 *
 * @package gutenberg-content-visibility
 */

namespace RichardTape;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


add_action( 'plugins_loaded', function() {

	/**
	 * Load the main init file which sets up the JavaScript and CSS.
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

	/**
	 * Sets up the the_contet filter rules for when to show/hide content.
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/class-gutenbergcontentvisibility.php';

	$gcv = new \RichardTape\GutenbergContentVisibility();
	$gcv->init();

} );
