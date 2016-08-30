(function(module) {
  var homeController = {};

  homeController.reveal = function() {
    $('#projectlist').show();
    $('section').not('#projectlist').hide();
  };

  module.homeController = homeController;

})(window);
