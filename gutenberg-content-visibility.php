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

/**
 * Set up for GCV.
 */
class GutenBergContentVisibility {

	/**
	 * The error log file
	 *
	 * @var string
	 */

	public $log_file = false;

	/**
	 * The error data to add to the $log_file
	 *
	 * @var array
	 */

	public $error_data = array();

	/**
	 * Runs our actions and filters.
	 *
	 * @since 0.1.0
	 *
	 * @return void
	 */
	public function init() {

		// Gutenberg parses content at priority 9, so need to do it before then so we still have the comments.
		add_filter( 'the_content', array( $this, 'the_content__only_show_appropriate_blocks' ), $this->get_the_content_filter_priority() );

	}//end init()

	/**
	 * Allow folks to alter the priority at which this is run. Default: 7
	 *
	 * @return int The priority used in the_content filter callback
	 */
	public function get_the_content_filter_priority() {

		/**
		 * The the_content filter priority.
		 *
		 * Gutenberg parses content on priority 9 for the_content. We need to do
		 * it before then so we're able to detect our custom properties. This filter
		 * allows folks to alter this from our default value of 7.
		 *
		 * @since 0.1.0
		 *
		 * @param array  $priority The the_content priority.
		 */

		return apply_filters( 'gutenberg_content_visibility_the_content_filter_priority', 7 );

	}//end get_the_content_filter_priority()


	/**
	 * Filter the_content in order to remove or replace any Gutenberg blocks
	 * that have the Content Visibility attribute set.
	 *
	 * @since 0.1.0
	 *
	 * @param  string $content Post content.
	 * @return string          Updated post content.
	 */
	public function the_content__only_show_appropriate_blocks( $content ) {

		// This is the method used in Gutenberg to parse what's in the database.
		$parsed = gutenberg_parse_blocks( $content );

		// Nothing parsed? It's not Gutenberg.
		if ( empty( $parsed ) || ! is_array( $parsed ) ) {
			return $content;
		}

		// Loop over parsed blocks and look for gcv-visibility attribute.
		foreach ( $parsed as $key => $block ) {

			// If we don't have any attributes, bail.
			if ( ! isset( $block['attrs'] ) || empty( $block['attrs'] ) ) {
				continue;
			}

			// This is our custom visibility attribute. If it doesn't exist, bail.
			if ( ! isset( $block['attrs']['gcv-visibility'] ) ) {
				continue;
			}

			// We have visibility rules, so remove or replace the content.
			$content = $this->remove_or_replace( $content, $block, $key );

		}

		return $content;

	}//end the_content__only_show_appropriate_blocks()

	/**
	 * Determines the visibility of the block based on the gcv-visibility attribute
	 * and then removes the block from the content if necessary.
	 *
	 * @since 0.1.0
	 *
	 * @param  string $content Post content.
	 * @param  array  $block The gutenblock.
	 * @param  int    $key The block key in the originally parsed content.
	 * @return string          Updated post content.
	 */
	public function remove_or_replace( $content = '', $block = array(), $key = null ) {

		$visibility = $block['attrs']['gcv-visibility'];

		// Empty visibility? Leave untouched.
		if ( empty( $visibility ) ) {
			return $content;
		}

		// Each visibility from the dropdown has its own callback.
		$callbacks = $this->get_callbacks();

		if ( empty( $callbacks ) || ! isset( $callbacks[ $visibility ] ) ) {
			$this->log( array( __LINE__, 'callback list is empty', $callbacks, $callbacks[ $visibility ] ) );
			return $content;
		}

		// Now we call the callback for this block's visibility setting.
		$callback = $callbacks[ $visibility ];

		if ( ! function_exists( $callback[0] ) ) {
			$this->log( array( __LINE__, 'callback function does not exist', $callback[0] ) );
			return $content;
		}

		// Check the callback is callabale.
		if ( ! is_callable( $callback[0] ) ) {
			$this->log( array( __LINE__, 'callback not callable', $callback[0] ) );
			return $content;
		}

		$show = (bool) call_user_func( $callback[0], $callback[1] );

		// If the callback returns true, then we should show the content.
		if ( true === $show ) {
			return $content;
		}

		// The callback returned false, so we should hide the content.
		if ( false === $show ) {
			$content = $this->remove_block_from_content( $block['innerHTML'], $content, $block );
		}

		return $content;

	}//end remove_or_replace()

	/**
	 * Determines the visibility of the block based on the gcv-visibility attribute
	 * and then removes the block from the content if necessary.
	 *
	 * @since 0.1.0
	 *
	 * @return array An array of visibility levels as the keys and the associated callback as the value.
	 */
	public function get_callbacks() {

		// visibility-level => boolean-returning callback.
		$callbacks = array(
			'all-logged-in'   => array( '\is_user_logged_in', '' ),
			'admin-only'      => array( '\current_user_can', 'manage_options' ),
			'editor-or-above' => array( '\current_user_can', 'delete_others_pages' ),
		);

		/**
		 * GCV Callbacks.
		 *
		 * An array of GCV visibility rules and the associated boolean function callback.
		 * Each key - the GCV rule - must be an available option in the Gutenberg block settings tab.
		 * Each value - the callback - must return a boolean.
		 *
		 * @since 0.1.0
		 *
		 * @param array  $callbacks The GCV Callbacks.
		 */
		return apply_filters( 'gutenberg_content_visibility_callbacks', $callbacks );

	}//end get_callbacks()

	/**
	 * Replace content with other content in the content. Content.
	 *
	 * @param  string $search  What to replace.
	 * @param  string $replace What to replace WITH.
	 * @param  string $content The haystack, which is the_content.
	 * @return string          The modified content.
	 */
	public function replace_block_with_content( $search, $replace, $content ) {

		/**
		 * What to replace the gutenberg block with if the content visibility
		 * callback says it should be removed.
		 *
		 * @since 0.1.0
		 *
		 * @param string  $replace What to replace it with.
		 * @param string  $search What we are searching for. The original gutenberg content.
		 */
		$replace = apply_filters( 'gutenberg_content_visibility_block_replace', $replace, $search );

		$replace = wp_kses_post( $replace );

		$content = str_replace( $search, $replace, $content );

		return $content;

	}//end replace_block_with_content()


	/**
	 * Remove this block's HTML from the content.
	 *
	 * @param  string $inner_html The HTML of this block to remove.
	 * @param  string $content    The current post's content.
	 * @param  array  $block      The gutenblock.
	 * @return string             The content with this block removed.
	 */
	public function remove_block_from_content( $inner_html = '', $content = '', $block = array() ) {

		/**
		 * Run before removing a block from the content.
		 *
		 * An action that is run before running str_replace() to remove the block
		 * from the post content.
		 *
		 * @since 0.1.0
		 *
		 * @param string  $inner_html The inner_html attribute of the block.
		 * @param string  $content    The content of the post to this point.
		 * @param array   $block      The full block array.
		 */
		do_action( 'gutenberg_content_visibility_before_remove_block_from_content', $inner_html, $content, $block );

		// Strip the html for this block from the content.
		$content = $this->replace_block_with_content( $inner_html, '', $content );

		return $content;

	}//end remove_block_from_content()

	/**
	 * Some simple error logging, if WP_DEBUG is enabled.
	 *
	 * @param  array $data What to log.
	 * @return void
	 */
	public function log( $data = array() ) {

		if ( ! defined( 'WP_DEBUG' ) || ! WP_DEBUG ) {
			return;
		}

		if ( ! defined( 'GCV_LOG_FILE' ) ) {
			define( 'GCV_LOG_FILE', WP_CONTENT_DIR . '/debug.log' );
		}

		$log_file = constant( 'GCV_LOG_FILE' );

		$this->log_file   = $log_file;
		$this->error_data = $data;

		add_action( 'wp_footer', array( $this, 'shutdown_log_error' ) );

	}//end log()

	/**
	 * Simple error logging.
	 *
	 * @return void
	 */
	public function shutdown_log_error() {
		file_put_contents( $this->log_file, print_r( array( $this->error_data ), true ), FILE_APPEND );
	}//end shutdown_log_error()

}//end class

add_action( 'plugins_loaded', function() {

	$gcv = new \RichardTape\GutenBergContentVisibility();
	$gcv->init();

} );
