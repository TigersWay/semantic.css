(function($) {

  //  All Alternate stylesheets Selector
  var $links = $('link[rel*=alternate][title]');

  $('body').prepend('<div id="styleswitcher"><label>Theme:&nbsp;<select></select></label></div>');

  var options = '<option value="">Default</option>';
  $links.each(function(index, value) {
    options += '<option value="' + $(this).attr('href') + '">' + $(this).attr('title') + '</option>';
  });
  $links.remove();

//  $('#css-selector')
  $('#styleswitcher>label>select')
    .append(options)
    .bind('change', function() {
      $('link[rel*=jquery]').remove();
      $('head').append('<link rel="stylesheet jquery" href="' + $(this).val() + '" type="text/css" />');
    });

})(jQuery);
