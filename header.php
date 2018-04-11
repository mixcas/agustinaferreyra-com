<!DOCTYPE html>
<html lang="en" prefix="og: http://ogp.me/ns#">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <title><?php wp_title('|',true,'right'); bloginfo('name'); ?></title>
  <meta name="viewport" content="width=device-width, initial-scale=1">

<?php
get_template_part('partials/globie');
get_template_part('partials/seo');
?>

  <link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
  <link rel="icon" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.png">
  <link rel="shortcut" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.ico">
  <link rel="apple-touch-icon" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon-touch.png">
  <link rel="apple-touch-icon" sizes="114x114" href="<?php bloginfo('stylesheet_directory'); ?>/dist/img/favicon.png">

<?php if (is_singular() && pings_open(get_queried_object())) { ?>
  <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">
<?php } ?>

  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<!--[if lt IE 9]><p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p><![endif]-->

<section id="main-container">

  <header id="header">
    <h1 class="u-visuallyhidden"><?php bloginfo('name'); ?></h1>

    <div class="container">
      <div class="grid-row">
        <div class="grid-item item-s-10 item-m-5">
          <div id="logo-holder">
            <?php get_template_part('partials/logo'); ?>
          </div>
        </div>
      </div>

      <nav id="main-nav">
        <ul class="grid-row justify-end font-uppercase">
          <li class="grid-item">
            <a href="<?php echo home_url('exhibitions'); ?>">Exhibitions</a>
          </li>
          <li class="grid-item">
            <a href="<?php echo home_url('artists'); ?>">Artists</a>
          </li>
          <li class="grid-item">
            <a href="<?php echo home_url('everything-else'); ?>">Everything else</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
