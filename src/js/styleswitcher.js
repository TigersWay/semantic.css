(function($) {

  $('body').prepend('<div id="styleswitcher"><label>Theme:&nbsp;<select></select></label></div>');

  //  All Alternate stylesheets Selector
  var links = $('link[rel*=alternate][title]');
  var options = '<option value="">Default</option>';
  links.each(function(index, value) {
    options += '<option value="' + $(this).attr('href') + '">' + $(this).attr('title') + '</option>';
  });
  links.remove();

  $('#styleswitcher>label>select')
    .append(options)
    .bind('change', function() {
      $('link[rel*=switcher]').remove();
      docCookies.removeItem('styleswitcher', '/');
      if ($(this).val()) {
        $('head').append('<link rel="stylesheet switcher" href="' + $(this).val() + '">');
        docCookies.setItem('styleswitcher', $(this).val(), null, '/');
      }
    });

    var style = docCookies.getItem('styleswitcher');
    if (style) {
      $('head').append('<link rel="stylesheet switcher" href="' + style + '">');
      $('#styleswitcher>label>select').val(style).prop('selected', true);
    }

})(jQuery);
