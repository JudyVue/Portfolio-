var projectsArray = [];

function Project (options) {
  this.title = options.title;
  this.siteUrl = options.siteUrl;
  this.repoUrl = options.repoUrl;
  this.dateCreated = options.dateCreated;
}

Project.prototype.toHtml = function(){
  var $newProject = $('section.projectlist').clone();

  //find my elements for jquery objects
  $newProject.find('.livesite').attr('href', this.siteUrl);
  $newProject.find('.repo').attr('href', this.repoUrl);
  $newProject.find('.aboutme').text(this.title);

//display the #days the project was created
  $newProject.find('time[pubdate]').attr('title', this.dateCreated);
  $newProject.find('time').text('about ' + parseInt((new Date() - new Date(this.dateCreated))/60/60/24/1000) + ' days ago');

//remove the class
  $newProject.removeClass('projectlist');
  return $newProject;
};

//sorts most recent project to top
myProjects.sort(function(firstElement, secondElement) {
  return (new Date(secondElement.dateCreated)) - (new Date(firstElement.dateCreated));
});

//pushing the results of instantiation sorts to new array
myProjects.forEach(function(currentProject) {
  projectsArray.push(new Project(currentProject));
  console.log(projectsArray);
});

//attaches to section in DOM
projectsArray.forEach(function(section) {
  $('section').append(section.toHtml());
});
