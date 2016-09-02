(function(module){

  var projectView = {};

  function Project (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
  }


  Project.projectsArray = [];

  Project.prototype.toHtml = function(){
    this.daysAgo = parseInt((new Date() - new Date(this.dateCreated))/ 60 / 60/ 24/ 1000);

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

  projectView.render = function(){
    Project.projectsArray.forEach(function(a) {
      $('#projectlist').append(a.toHtml());
    });
  };

  Project.fetchAll();




}) (window);
