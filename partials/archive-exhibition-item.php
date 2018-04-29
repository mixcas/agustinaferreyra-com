<?php
$artists = wp_get_post_terms($post->ID, 'artist');
$title = get_post_meta($post->ID, '_igv_exhibition_title', true);
$start = get_post_meta($post->ID, '_igv_exhibition_start', true);
$end = get_post_meta($post->ID, '_igv_exhibition_end', true);
$location = wp_get_post_terms($post->ID, 'location');
?>
<article <?php post_class('grid-item item-s-12 grid-row no-gutter hover-dot'); ?> id="post-<?php the_ID(); ?>">
  <a href="<?php the_permalink() ?>" class="grid-item item-s-12 grid-row no-gutter">
    <div class="grid-item item-s-6 font-uppercase">
      <?php
      if (!empty($artists)) {
        foreach ($artists as $artist) {
          echo '<div class="font-bold">' . $artist->name . '</div>';
        }
      }

      echo !empty($title) ? '<h2>' . $title . '</h2>' : '';
      ?>
    </div>
    <div class="grid-item item-s-6">
      <?php
        echo !empty($start) ? '<div class="font-bold font-uppercase">' . igv_format_exhibition_dates($start, $end) . '</div>' : '';

        echo !empty($location) ? '<div>' . $location[0]->name . '</div>' : '';
      ?>
    </div>
  </a>
  <div class="dot"></div>
</article>
