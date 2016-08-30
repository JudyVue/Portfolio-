(function(module){

  //TODO: Find out from Rick/TA's what this empty object does exactly, because I'm actually not sure. I just adapted my code to one of his article examples, and it's still unclear to me what the purpose of this empty object is.
  var projectView = {};

  function Project (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
  }


  Project.projectsArray = [];


//refactored on 8/18/16 utilizing Handlebars
  Project.prototype.toHtml = function(){
  //calculates the #days the project was created
    this.daysAgo = parseInt((new Date() - new Date(this.dateCreated))/ 60 / 60/ 24/ 1000);

    //creates a new var that goes in place of the 'created by' line in the section {{publishStatus}}
    this.publishStatus = this.dateCreated ? 'Created about ' + this.daysAgo + ' days ago' : '(draft)';
    var source = $('#projectlist-template').html();
    var templateRender = Handlebars.compile(source);
    return templateRender(this);
  };

  Project.loadAll = function(inputData) {
    inputData.sort(function(a,b){
      return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
    }).forEach(function(ele){
      Project.projectsArray.push(new Project(ele));
    });
  };

  //TODO: I could probably get rid of this whole local storage nonsense for the sake of my portfolio's simplicity. Maybe?....
  Project.fetchAll = function() {
    if (localStorage.objects) {
      Project.loadAll(JSON.parse(localStorage.objects));
      projectView.render();
    } else {
      $.getJSON ('data/objects.json', function (data) {
        Project.loadAll(data);
        localStorage.objects = JSON.stringify(data);
        projectView.render();
      });
    }
  };

  //attaches to section in DOM
  projectView.render = function(){
    Project.projectsArray.forEach(function(a) {
      $('#projectlist').append(a.toHtml());
    });
  };

  Project.fetchAll();

  requestRepos = function() {
    $.ajax({
      url: 'https://api.github.com/users/JudyVue',
      type: 'GET',
      headers: {'Authorization': 'token ' + githubToken },
      success: function(data){
        console.log(data);
        reposObject.allRepos = data;
      }
    });
  };


}) (window);
