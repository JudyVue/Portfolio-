(function(module){
  var reposObject = {};


  reposObject.allRepos = [];


  reposObject.requestRepos = function(callback) {
    console.log('hello');
    $.ajax({
      url: 'https://api.github.com/users/JudyVue',
      type: 'GET',
      headers: {'Authorization': 'token ' + githubToken },
      success: function(data) {
        reposObject.allRepos = data;
        console.log(reposObject.allRepos);
        callback();
      }
    });
  };



  module.reposObject = reposObject;
})(window);
