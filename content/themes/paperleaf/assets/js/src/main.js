/**
 * Main JS file for Paperleaf behaviours
 */

/* globals jQuery, document */
(function ($, undefined) {
  "use strict";

  var $document = $(document);

  $document.ready(function () {

    /**
     * FitVids.js for responsive videos
     */
    var $postContent = $(".post-content");
    $postContent.fitVids();

    /**
     * Masonry grid
     */
    var $grid = $('.js-grid').imagesLoaded( function() {
      $grid.masonry({
        itemSelector       : '.post',
        percentPosition    : true,
        transitionDuration : '0.25s'
      });
      $.force_appear();
    });

    /**
     * Add class to elements that appear in viewport
     */
    $('.post--grid').appear();
    $('.post--grid').on('appear', function(event, $all_appeared_elements) {
      $(this).addClass('animate');
    });

    /**
     * Preloader
     */
    $('body').imagesLoaded( function() {
      $('.js-loader').fadeOut(250);
    });

    /**
     * GhostHunter search
     */
    var searchField = $('.search-field').ghostHunter({
      results: '.content-area',
      info_template: '<h1 class="page-title mt0">Number of posts found: {{amount}}</h1>',
      result_template: '<article id="gh-{{ref}}" class="animate border-box post--grid gh-search-item"><div class="p3 bg-white box-shadow"><header class="post-header"><h2 class="post-title mt0 mb0 break-word"><a class="black" href="{{link}}">{{title}}</a></h2></header></div></article>',
      before: function() {
        $('.pagination, .content').remove();
      }
    });

    /**
     * Handle sidebar height for phones and tablets
     */
    $(window).on('resize', function(event) {
      sidebarHeight();
    });
    sidebarHeight();

    $('.js-toggle-nav').on('click', function(event) {
      event.preventDefault();
      $(this).toggleClass('open');
      $('.js-nav').toggleClass('is-visible');
    });

    // Give the parameter a variable name
    var action = getParameterByName('action');
    var stripe = getParameterByName('stripe');
    if (action == 'subscribe') {
      $('body').addClass('subscribe-success');
    }
    if (action == 'signup') {
      window.location = '/signup/?action=checkout';
    }
    if (action == 'checkout') {
      $('body').addClass("signup-success");
    }
    if (action == 'signin') {
      $('body').addClass("signin-success");
    }
    if (stripe == 'success') {
      $('body').addClass("checkout-success");
    }
    if (stripe == 'cancel') {
      $('body').addClass("checkout-cancel");
    }
    if (stripe == 'billing-update-success') {
      $('body').addClass("billing-success");
    }
    if (stripe == 'billing-update-cancel') {
      $('body').addClass("billing-cancel");
    }
    $('.notification-close').click(function () {
      $(this).parent().addClass('close');
      var uri = window.location.toString();
      if (uri.indexOf("?") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, clean_uri);
      }
    });

  });

})(jQuery);

window.addEventListener('load', function () {
  Lightense('.kg-gallery-image img', {
    padding: 56,
    offset: 20,
    background: 'rgba(255, 255, 255, .85)',
  });
}, false);

function sidebarHeight() {
  var innerHeight = jQuery('.js-sidebar-inner').height();
  var footerHeight = jQuery('.js-sidebar-footer').height();
  var windowHeight = jQuery(window).height();
  var switchClass = ( innerHeight + footerHeight + 192 ) > windowHeight ? true : false;
  if ( switchClass ) {
    jQuery('.js-sidebar-footer').addClass('sidebar-footer-static');
  } else {
    jQuery('.js-sidebar-footer').removeClass('sidebar-footer-static');
  }
}

var gallery_images = document.querySelectorAll('.kg-gallery-image img');
gallery_images.forEach(function (image) {
  var container = image.closest('.kg-gallery-image');
  var width = image.attributes.width.value;
  var height = image.attributes.height.value;
  var ratio = width / height;
  container.style.flex = ratio + ' 1 0%';
});

// Parse the URL parameter
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
