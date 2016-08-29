(function(module) {
  var funnyController = {};

  funnyController.reveal = function() {
    $('.comedysection').show();
    $('section').not('.comedysection').hide();
  };

  module.funnyController = funnyController;
})(window);
