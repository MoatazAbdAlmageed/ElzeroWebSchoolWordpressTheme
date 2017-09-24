<?php
/**
 * The template for displaying the header
 *
 * Displays all of the head element and everything up until the "site-content" div.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <!--[if lt IE 9]>
    <script src="<?php echo esc_url( get_template_directory_uri() ); ?>/js/html5.js"></script>
    <![endif]-->
    <?php wp_head(); ?>

    <title>   <?php bloginfo('name');  ?> |  <?php bloginfo('description');  ?> </title>
</head>

<body <?php body_class(); ?>  >
<div class="container">

    <nav class="navbar  navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="<?php echo bloginfo( 'url' ); ?>"><?php echo bloginfo( 'name' ); ?></a>
            </div>


            <div id="navbar" class="navbar-collapse collapse">
				<?php wp_nav_menu(
					[
						'theme_location' => 'main-menu',
//						'depth' => 1,
						'container'      => 'false',
						'menu_class'     => 'nav navbar-nav navbar-right',
						'walker'         => new WP_Bootstrap_Navwalker()

					]
				); ?>
            </div><!--/.nav-collapse -->
        </div>
    </nav>


