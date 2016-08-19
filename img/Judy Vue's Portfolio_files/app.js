var projectsArray = [];

function Project (options) {
  this.title = options.title;
  this.siteUrl = options.siteUrl;
  this.repoUrl = options.repoUrl;
  this.dateCreated = options.dateCreated;
}

Project.prototype.toHtml = function(){
  //calculates the #days the project was created
  this.daysAgo = parseInt((new Date() - new Date(this.dateCreated))/ 60 / 60/ 24/ 1000);

  //creates a new var that goes in place of the 'created by' line in the section {{publishStatus}}
  this.publishStatus = this.dateCreated ? 'Created about ' + this.daysAgo + ' days ago' : '(draft)';

  var source = $('#projectlist-template').html();
  var templateRender = Handlebars.compile(source);
  return templateRender(this);

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
projectsArray.forEach(function(a) {
  $('#projectlist').append(a.toHtml());
});


//adding data attributes to my home and about sections
$('.aboutmesection').attr('data','about_section');
$('section:not(.aboutmesection)').attr('data', 'portfolio_links');


//click function to show about section on about
clickAbout = function(){
  $('table td:nth-child(2)').on('click', function(){
    $('h2').text('About Me');
    $('section').removeClass('aboutmesection');
    $('section[data="about_section"]').show();
    $('section:not(.aboutmesection)').hide();

    console.log($('section[data="portfolio_links"]'));
  });
};

//click function to go home when clicking home
clickHome = function(){
  $('table td:nth-child(1)').on('click', function(){
    $('h2').text('Code 201 Projects');
    $('section[data="portfolio_links"]').show();
    $('section[data="about_section"]').hide();

    console.log('home was clicked');
  });
};

//click function for hamburger at <400px to display the menu when clicked on
$('.hamburger').click(function(){
  $('table').toggle('fast');
});



clickAbout();
clickHome();
