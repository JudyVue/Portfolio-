(function(module) {
  var repoView = {};

  var repoCompiler = Handlebars.compile($('#repo-template').text());

  repoView.renderRepos = function() {
    $('#aboutmesection').append(repoCompiler(reposObject.allRepos)); // reposObject.allRepos is already an object, so just need to run Handlebars compile method on the object
    $('#aboutmesection').append(reposObject.followers.map(repoCompiler));
  };

  reposObject.requestRepos(repoView.renderRepos);

  module.repoView = repoView;
})(window);
