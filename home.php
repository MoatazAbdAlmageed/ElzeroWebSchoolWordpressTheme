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



    <div class="row" id="main-wrapper">
        <div class="col-sm-12 ">

			<?php if ( have_posts() ) :
			while ( have_posts() ) : the_post(); ?>

                <div class="post">
                    <h1 class="title"><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h1>

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
							<?php the_post_thumbnail( 'medium', [
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









	            <?php

	            if ( get_next_posts_link() ) {
	                ?>
                    <div class="next-posts">
		            <?php
		            next_posts_link( '<i class="fa fa-chevron-left" aria-hidden="true"></i> Older' );

	            } else {
//		            echo '<span><i class="fa fa-chevron-right" aria-hidden="true"></i> Next</span>';
	            }
                ?>
                    </div>
	                    <?php if ( get_previous_posts_link() ) {?>
                        <div class="prev-posts">
		                    <?php
		                    previous_posts_link( '<i class="fa fa-chevron-right" aria-hidden="true"></i> Newer' );

		                    } else {
//				echo '<span><i class="fa fa-chevron-left" aria-hidden="true"></i> Prev</span>';
		                    }
		                    ?>



            </div>

        </div>

		<?php endif; ?>
    </div>


<?php get_footer(); ?>