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
        <div class="col-lg-12 col-md-6">

			<?php if ( have_posts() ) :
			while ( have_posts() ) : the_post(); ?>

                <div class="post">
                    <h1><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h1>

                    <p>
                        <i class="fa fa-list" aria-hidden="true"></i>
						<?php the_category( ', ' ); ?>
                        | <i class="icon-user"></i> <i class="fa fa-user"
                                                       aria-hidden="true"></i> <?php the_author_posts_link() ?>
                        | <i class="icon-calendar"></i> <i class="fa fa-calendar" aria-hidden="true"></i>

						<?php the_date( 'F j, Y' ); ?> at <i class="fa fa-clock-o"
                                                             aria-hidden="true"></i> <?php the_time( 'g:i a' ); ?>

                        | <i class="icon-comment"></i> <i class="fa fa-comment" aria-hidden="true"></i>
                        <!--                        <a href="--><?php //comment_link() ?><!--">  -->
						<?php //comments_number() ?><!--</a>-->
						<?php
						//Load Different CSS classes according to Comment-condition

						$css_class = 'zero-comments';
						$number    = (int) get_comments_number( get_the_ID() );

						if ( 1 === $number ) {
							$css_class = 'one-comment';
							$title     = 'Comment';
						} elseif ( 1 < $number ) {
							$css_class = 'multiple-comments';
						}
						$title = "Comments";

						comments_popup_link( 'No comments yet.', 'One Comment', '% Comments', $css_class, 'Comments are off for this post' )
						?>

                    </p>
					<?php if ( has_post_thumbnail() ) : ?>
                        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
							<?php the_post_thumbnail( null, [
								'class' => 'img-responsive img-thumbnail',
								'alt'   => get_the_title()
							] ); ?>
                        </a>
					<?php endif; ?>
                    <article><p>
							<?php the_excerpt() ?>
                        </p>

                    </article>


                </div>

			<?php endwhile; ?>
        </div>

        <div class="posts-navigation">


            <div class="prev-posts"><?php
				if ( get_previous_posts_link() ) {
					previous_posts_link( '<i class="fa fa-chevron-left" aria-hidden="true"></i> Prev' );

				} else {
					echo '<span><i class="fa fa-chevron-left" aria-hidden="true"></i> Prev</span>';
				}
				?></div>

            <div class="next-posts">


	            <?php

	            if ( get_next_posts_link() ) {
		            next_posts_link( '<i class="fa fa-chevron-right" aria-hidden="true"></i> Next' );

	            } else {
		            echo '<span><i class="fa fa-chevron-right" aria-hidden="true"></i> Next</span>';
	            }
                ?>



            </div>

        </div>

		<?php endif; ?>
    </div>


<?php get_footer(); ?>