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
        console.log(data);
        reposObject.allRepos = data;
        callback();
      }
    });
  };
  reposObject.requestRepos();

})(window);
