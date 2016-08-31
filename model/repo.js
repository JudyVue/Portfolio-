(function(module){
  var reposObject = {};


  reposObject.allRepos = [];

 //AJAX call to Github API
  reposObject.requestRepos = function(callback) {
    $.when(
      $.get('/github/users/JudyVue')
      .done(function(data){
        reposObject.allRepos = data;
      })
    ).done(callback);
  };



  module.reposObject = reposObject;
})(window);
