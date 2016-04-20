<?php
/**
 * Plugin Name: Language Button
 * Plugin URI: https://github.com/subhransusekhar/language-button
 * Description: A plugin for adding language attribute to any section of a content
 * Version: 1.1
 * Author: Subhransu Sekhar
 * Author URI: http://subhransusekhar.com
 */
/**
 * enqueue scripts and styles
 */

function languagebutton_shortcode($attr, $content) {
  $values = shortcode_atts(array(
		'type' => 'en',
    'dom'  => 'span'
	),$attr);
	$output = "<" . $values['dom'] . " lang=" . $values['type'] . ">";
  $output .= $content;
  $output .= "</" . $values['dom'] . ">";
	return $output;
}
add_shortcode('language', 'languagebutton_shortcode');
add_filter('widget_text', 'do_shortcode');

function register_button( $buttons ) {
  array_push( $buttons, "|", "languagebutton" );
  return $buttons;
}
function add_plugin( $plugin_array ) {
  $plugin_array['languagebutton'] = plugins_url('language-button/admin/shortcode/shortcode.js');
  return $plugin_array;
}

function languagebutton_button() {

  if ( ! current_user_can('edit_posts') && ! current_user_can('edit_pages') ) {
    return;
  }

  if ( get_user_option('rich_editing') == 'true' ) {
    add_filter( 'mce_external_plugins', 'add_plugin' );
    add_filter( 'mce_buttons', 'register_button' );
  }
}
add_action('init', 'languagebutton_button');
