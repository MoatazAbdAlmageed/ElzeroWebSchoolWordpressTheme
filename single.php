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


	<div class="row">
        <div class="col-md-9">

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <div class="title-holder">	<h1 class="title"><?php the_title(); ?></h1>
            <span><?php edit_post_link('<i class="fa fa-pencil-square-o" aria-hidden="true"></i>') ?></span>
            </div>

				<div class="post">


					<?php if ( has_post_thumbnail() ) : ?>
						<?php the_post_thumbnail('medium_large'); ?>
					<?php endif; ?>


                    <p>
                        <i class="fa fa-list" aria-hidden="true"></i>
						<?php the_category(', '); ?>
                        | <i class="icon-user"></i> <i class="fa fa-user" aria-hidden="true"></i> <?php the_author_posts_link() ?>
                        | <i class="icon-calendar"></i> <i class="fa fa-calendar" aria-hidden="true"></i>

						<?php the_date('F j, Y'); ?> at <i class="fa fa-clock-o" aria-hidden="true"></i> <?php the_time('g:i a'); ?>

                        | <i class="icon-comment"></i> <i class="fa fa-comment" aria-hidden="true"></i>
                        <!--						<a href="--><?php //comment_link() ?><!--">  --><?php //comments_number() ?><!--</a>-->
						<?php
						//Load Different CSS classes according to Comment-condition

						$css_class = 'zero-comments';
						$number    = (int) get_comments_number( get_the_ID() );

						if ( 1 === $number )
							$css_class = 'one-comment';
                        elseif ( 1 < $number )
							$css_class = 'multiple-comments';

						comments_popup_link('No comments yet.','One Comment','% Comments',$css_class,'Comments are off for this post' )
						?>

                        
                    </p>


					<article><p>
							<?php the_content() ?>
						</p>

						<?php the_tags( 'Tagged with: ', ' • ', '<br />' ); ?>


                    </article>
                    <hr>
                    <div class="commentlist">
						<?php
                        if (have_comments())
                            ?>
                            <h1>Comments</h1>
	                    <?php
						//Gather comments for a specific page/post
						$comments = get_comments(array(
							'post_id' => XXX,
							'status' => 'approve' //Change this to the type of comments to be displayed
						));

						//Display the list of comments
						wp_list_comments(array(
							'per_page' => 10, //Allow comment pagination
							'reverse_top_level' => false //Show the oldest comments at the top of the list
						), $comments);


						?>
                    </div>



			</div>
		<?php endwhile; ?>



<div class="clearfix"></div>
			<div class="navigation ">
				<?php if (strlen(get_next_post()->post_title) > 0) { ?>
				<div class="next-post"><?php next_post_link('%link','<span><i class="fa fa-chevron-right" aria-hidden="true"></i> Next</span>'); ?></div>
				<?php } ?>


				<?php if (strlen(get_previous_post()->post_title) > 0) { ?>
                <div class="prev-post"><?php previous_post_link('%link','<span><i class="fa fa-chevron-left" aria-hidden="true"></i> Prev</span>'); ?></div>
				<?php } ?>
			</div>

		<?php endif; ?>
        </div>


       <div class="col-md-3 ">

	       <?php get_sidebar() ?>
       </div>
	</div>



<?php get_footer(); ?>
