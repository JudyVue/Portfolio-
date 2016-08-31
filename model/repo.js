(function(module){
  var reposObject = {};


  reposObject.allRepos = [];
  reposObject.followers = [];

 //AJAX call to Github API
  reposObject.requestRepos = function(callback) {
    $.when(
      $.get('/github/users/JudyVue')
      .done(function(data){
        reposObject.allRepos = data;
        console.log(reposObject.allRepos);
      }),
      $.get('/github/users/JudyVue/followers')
      .done(function(data){
        reposObject.followers = data;
        console.log(reposObject.followers);
      })
    ).done(callback);
  };

// https://api.github.com/users/JudyVue/followers


  module.reposObject = reposObject;
})(window);
