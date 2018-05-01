/* jshint esversion: 6, browser: true, devel: true, indent: 2, curly: true, eqeqeq: true, futurehostile: true, latedef: true, undef: true, unused: true */
/* global $, document */

// Import dependencies
import lazySizes from 'lazysizes';
import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import slick from 'slick-carousel';

// Import style
import '../styl/site.styl';

class Site {
  constructor() {
    this.mobileThreshold = 601;

    $(window).resize(this.onResize.bind(this));

    $(document).ready(this.onReady.bind(this));

  }

  onResize() {
    this.windowHeight = $(window).height();
    this.windowWidth = $(window).width();

    this.dotSize();
    this.positionPostit();
    this.sizeLogoHolder();
    this.layoutMasonry();
  }

  onReady() {
    lazySizes.init();

    this.windowHeight = $(window).height();
    this.windowWidth = $(window).width();
    this.dotDiameter = 15;
    this.masonryImagesLoaded = false;

    this.$window = $(window);
    this.$body = $('body');
    this.$mainContainer = $('#main-container');
    this.$postit = $('#postit');
    this.$masonryHolder = $('.masonry-holder');
    this.$slickCarousel = $('.slick-carousel');

    this.$hoverDotItem = $('.hover-dot');
    this.$hoverDot = $('.hover-dot .dot');
    this.$logoDot = $('svg#logo path.logo-dot');
    this.$postitDot = $('#postit-dot');
    this.$logoHolder = $('#logo-holder');
    this.$logo = $('#logo-holder .logo');

    this.dotSize();
    this.positionPostit();
    this.bindHoverDots();
    this.sizeLogoHolder();
    this.initMasonry();
    this.initCarousel();
  }

  fixWidows() {
    // utility class mainly for use on headines to avoid widows [single words on a new line]
    $('.js-fix-widows').each(function(){
      var string = $(this).html();
      string = string.replace(/ ([^ ]*)$/,'&nbsp;$1');
      $(this).html(string);
    });
  }

  dotSize() {
    var _this = this;

    if (_this.$logoDot.length) {
      // get dot diameter of first dot in logo svg
      _this.dotDiameter = _this.$logoDot.first().width();
    }

    // resize all dots to match dots in logo svg
    $('.dot').css({
      'height': _this.dotDiameter,
      'width': _this.dotDiameter,
      'border-radius': _this.dotDiameter,
    });
  }

  positionPostit() {
    var _this = this;

    if (_this.$postit.length) {
      var imageHeight = _this.$postit.outerHeight() * 1.2; // 1.2 to account for rotation
      var imageWidth = _this.$postit.outerWidth() * 1.2;

      var maxTop = 100 - ((imageHeight / _this.windowHeight) * 100); // image size percentage of window
      var maxLeft = 100 - ((imageWidth / _this.windowWidth) * 100);

      var randomTop = _this.randomInt(maxTop - 5, 5); // min 5% from any edge
      var randomLeft = _this.randomInt(maxLeft - 5, 5);

      var randomRotate = _this.randomInt(10, -10); // random rotation -10 to 10deg

      // random position & rotation of post-it
      _this.$postit.css({
        'top': randomTop + 'vh',
        'left': randomLeft + 'vw',
        'transform': 'rotate(' + randomRotate + 'deg)',
      });

      this.positionPostitDot();
    }
  }

  positionPostitDot() {
    var _this = this;

    if (_this.$postit.length) {
      // position post-it dot halfway off the top of post-it image
      _this.$postitDot.css({
        'top': '-' + (_this.dotDiameter / 2) + 'px',
      });
    }
  }

  bindHoverDots() {
    var _this = this;

    if (_this.$hoverDotItem.length) {

      _this.positionHoverDots();

      _this.$hoverDotItem.on({
        mouseenter: function(){
          $(this).addClass('show-dot');
        },
        mouseleave: function(){
          $(this).removeClass('show-dot');
        },
      });
    }
  }

  positionHoverDots() {
    var _this = this;

    var offset = _this.dotDiameter + 10;

    _this.$hoverDot.each(function() {
      var randomTop = _this.randomInt(100 - offset, offset); // min offset% from any edge
      var randomLeft = _this.randomInt(100 - offset, offset);

      $(this).css({
        'top': randomTop + '%',
        'left': randomLeft + '%',
      });
    });
  }

  initMasonry() {
    var _this = this;

    if (_this.$masonryHolder.length) {
      imagesLoaded( '.masonry-holder', function() {
        _this.masonryImagesLoaded = true;

        _this.masonryInstance = new Masonry( '.masonry-holder', {
          itemSelector: '.masonry-item',
          transitionDuration: 0,
          initLayout: false,
          percentPosition: true
        });

        _this.masonryInstance.on('layoutComplete', function() {
          // show masonry container after layout
          _this.$masonryHolder.removeClass('hidden');
        });

        _this.layoutMasonry();
      });
    }
  }

  layoutMasonry() {
    var _this = this;

    if (_this.masonryImagesLoaded) {
      // hide masonry container during layout
      _this.$masonryHolder.addClass('hidden');

      // layout masonry items
      _this.masonryInstance.layout();
    }
  }

  sizeLogoHolder() {
    var _this = this;

    if (_this.$logoHolder.length) {
      var offset = _this.$logoHolder.offset().top;
      var logoHeight = _this.$logo.height();
      var padding = _this.windowHeight - offset - logoHeight;

      _this.$logoHolder.css('padding-top', padding + 'px');
    }
  }

  randomInt(max, min = 0) {
    // return random interger between min & max

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  bindCarouselToggles() {
    var _this = this;

    // active state to prevent duplicate clicks
    var carouselActive = false;

    if ($('.carousel-trigger').length) {
      $('.carousel-trigger').on('click', function(e) {
        if (!carouselActive) {
          carouselActive = true;

          var index = $(e.target).attr('data-index');

          // #main-container is set absolute and positioned
          // to prevent overflow scrolling while overlay
          // is open
          _this.scrollOffset = _this.$window.scrollTop();
          _this.$mainContainer.css('top', '-' + _this.scrollOffset + 'px');

          // go to slide of image clicked on
          _this.$slickCarousel.slick('slickGoTo', index, true);

          _this.$body.addClass('carousel-active');
        }
      });

      $('#carousel-overlay').on('click', function(e) {
        if (!$(e.target).hasClass('slick-arrow')) {
          _this.$body.removeClass('carousel-active');

          // reset scroll position
          _this.$window.scrollTop(_this.scrollOffset);

          carouselActive = false;
        }
      });
    }
  }

  initCarousel() {
    var _this = this;

    if (_this.$slickCarousel.length) {
      _this.$slickCarousel.slick({
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        dots: false,
        arrows: true,
        focusOnSelect: false,
        rows: 0
      });

      this.bindCarouselToggles();
    }
  }
}

new Site();
