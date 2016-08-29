(function(module) {
  var aboutController = {};

  aboutController.reveal = function() {
    $('.aboutmesection').show();
    $('section').not('.aboutmesection').hide();
  };

  module.aboutController = aboutController;
})(window);s
