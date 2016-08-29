(function(module) {
  var homeController = {};

  honeController.reveal = function() {
    $('#projectlist').show();
    $('section').not('#projectlist').hide();
  };

  module.homeController = homeController;
})(window);
