<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 0.1.0
 * @package GCV
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 0.1.0
 */
function gutenberg_content_visibility_editor_assets() {

	// Scripts.
	wp_enqueue_script(
		'gutenberg-content-visibility-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' )
	);

	// Styles.
	wp_enqueue_style(
		'gutenberg-content-visibility-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
	);
}//end gutenberg_content_visibility_editor_assets()

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'gutenberg_content_visibility_editor_assets' );
