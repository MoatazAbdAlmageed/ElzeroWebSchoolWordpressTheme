<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * e.g., it puts together the home page when no home.php file exists.
 *
 * Learn more: {@link https://codex.wordpress.org/Template_Hierarchy}
 *
 * @package WordPress
 * @subpackage Elzero
 * @since Elzero 1.0
 */


?>

<?php get_header(); ?>

    <nav class="navbar navbar-inverse navbar-fixed-top">
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

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
        <h1><?php echo bloginfo( 'name' ); ?> <i class="fa fa-pencil" aria-hidden="true"></i></h1>
        <p><?php echo bloginfo( 'description' ); ?></p>
    </div>


    <div class="row" id="main-wrapper">
        <div class="col-sm-12 ">

    </div>


<?php get_footer(); ?>