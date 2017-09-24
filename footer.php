<footer id="colophon" class="site-footer" role="contentinfo">


    <div id="navbar" class="navbar-collapse collapse">
		<?php wp_nav_menu(
			[
				'container'      => 'false',
				'depth' => 1,
				'theme_location' => 'footer-menu',
				'menu_class'     => 'nav navbar-nav',
			]
		); ?>
    </div><!--/.nav-collapse -->


    <div class="site-info">
        <a href="<?php echo esc_url( __( 'https://wordpress.org/', 'twentyfifteen' ) ); ?>"><?php printf( __( 'Proudly powered by %s', 'twentyfifteen' ), 'WordPress' ); ?></a>
    </div><!-- .site-info -->


    <a href="#top" id="smoothup" title="Back to top"><i class="fa fa-arrow-up" aria-hidden="true"></i>
    </a>


</footer><!-- .site-footer -->
<?php wp_footer(); ?>
</div> <!-- /container -->


</body>
</html>