/**
 * @file
 * A JavaScript file for the theme.
 */

(function ($) {

  'use strict';

  // Add a js class to the html-tag when JavsScript is active.
  $('html').removeClass('nojs').addClass('js');

  // Activate the mobil menu for small screens.
  if (window.matchMedia && $('.mobile-nav').length) {
    var mq = window.matchMedia('(max-width: 999px)');
    if (mq.matches) {
      // Toggle the mobile nav sheet.
      $('.mobile-nav__cover, .mobile-nav__toggle').handle('click', function () {
        $('body').scroll().toggleClass('js-nav-open');
      });

      // Close the nav sheet after click (needed for anchor links).
      $('.mobile-nav__sheet').find('a').on('click', function () {
        $('body').removeClass('js-nav-open');
      });
    }
  }

  // Add button to pre > code to copy the code to the clipboard.
  if (window.matchMedia && document.queryCommandSupported && document.queryCommandSupported('copy')) {
    var mq2 = window.matchMedia('(min-device-width: 1111px)');
    if (mq2.matches) {
      $('.content').find('pre').each(function (e, i) {
        var codeitem = 'js-code-item-' + i;
        var button = $('<button data-codeitem="' + codeitem + '"/>').text('Copy code').addClass('js-clipboard-button');
        $(e).addClass(codeitem).after(button);
      });

      $('.js-clipboard-button').handle('click', function () {
        var codeitem = '.' + $(this).data('codeitem');
        var codesnippet = $(codeitem).find('code').html();
        var textarea = $('<textarea id="codesnippet">').html(codesnippet).addClass('visually-hidden');
        $('body').append(textarea);
        document.getElementById('codesnippet').focus();
        document.getElementById('codesnippet').select();
        document.execCommand('copy');
        textarea.remove();
      });
    }
  }

  // Register the PWA ServiceWorker.
  if (('serviceWorker' in navigator) && !navigator.serviceWorker.controller) {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: './'
    });
  }

})(u);
