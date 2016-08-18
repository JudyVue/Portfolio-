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
  $newProject.find('time').text(' about ' + parseInt((new Date() - new Date(this.dateCreated))/60/60/24/1000) + ' days ago');

//remove the class ClassName
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
});

//attaches to section in DOM
projectsArray.forEach(function(section) {
  $('body').append(section.toHtml());
});


//adding data attributes to my home and about sections
$('section').eq(1).attr('data','about_section');
$('section:gt(1)').attr('data', 'portfolio_links');


//click function to show about section on about
clickAbout = function(){
  $('table td:nth-child(2)').on('click', function(){
    $('h2').text('About Me');
    $('section').removeClass('aboutmesection');
    $('section[data="about_section"]').show();
    $('section[data="portfolio_links"]').hide();

    console.log('about me section shown');
  });
};

//click function to go home when clicking home
clickHome = function(){
  $('table td:nth-child(1)').on('click', function(){
    $('section[data="portfolio_links"]').show();
    $('section[data="about_section"]').hide();
    $('h2').text('Code 201 Projects');
    console.log('home was clicked');
  });
};

//click function for hamburger at <400px to display the menu when clicked on
clickHamburger = function(){
  $('.hamburger').on('click', function(){
    ('table').show();
  });
};

clickAbout();
clickHome();
clickHamburger();
