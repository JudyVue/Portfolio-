(function(module){

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

  Project.fetchAll = function() {
    if (localStorage.objects) {
      Project.loadAll(JSON.parse(localStorage.objects));
      projectView.render();
    } else {
      $.getJSON ('js/objects.json', function (data) {
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

//class 07 work

//object constructor
  function FunFacts (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
  }

  //empty array attached to FunFacts object
  FunFacts.allFunFacts = [];
  FunFacts.countries = [];

  FunFacts.getFunFacts = function() {
    $.getJSON ('data/funFacts.json', function (data) {
      FunFacts.loadFunFacts(data);
      // FunFacts.getCountries();
      aboutMeView.render();
    });
  };

  //sort array according to date
  FunFacts.loadFunFacts = function(inputData) {
    FunFacts.allFunFacts = inputData.sort(function(a,b) {
      return parseInt(a.year) - parseInt(b.year);
    });
  };

  FunFacts.getCountries = function () {
    // FunFacts.getFunFacts();
    FunFacts.allFunFacts.map(function(currentObject) {
      return currentObject.country;
    }).reduce(function(array, country) {
      if (array.indexOf(country) === -1) {
        array.push(country);
        console.log(array);
      }
      FunFacts.countries = array;
      console.log(FunFacts.countries);
      return array;
    }, []);
  };


  var aboutMeView = {};

  FunFacts.getFunFacts();

  // using handlebars to render countries to about page
  aboutMeView.render = function() {
    var countriesRender = Handlebars.compile($('#aboutme_template').html());
    FunFacts.allFunFacts.forEach(function(country) {
      $('.aboutmesection').append(countriesRender(country));

    });
  };



  // FunFacts.prototype.funFactstoHtml = function(){
  //   var source = $('#aboutme_template').html();
  //   var templateRender = Handlebars.compile(source);
  //   return templateRender(this);
  // };
  //
  // aboutMeView.render = function(){
  //   FunFacts.allFunFacts.forEach(function(a) {
  //     console.log('whats going on?');
  //     $('.aboutmesection').append(a.funFactstoHtml());
  //   });
  // };



  //adding data attributes to my home and about sections
  $('.aboutmesection').attr('data','about_section');
  $('section:not(.aboutmesection)').attr('data', 'portfolio_links');
  //MEGAN: Might as well do this in the HTML

  //click function to show about section on about
  clickAbout = function(){
    $('#about_td').on('click', function(){//MEGAN: I think you should use id's here. You want a unique selector that will always stay with this menu item even if you change the order of your navs
      $('h2').text('About Me');
      $('section[data="about_section"]').show();
      $('section:not(.aboutmesection)').hide();

    });
  };

  //click function to go home when clicking home
  clickHome = function(){
    $('#home_td').on('click', function(){ //MEGAN: I think you should use id's here. You want a unique selector that will always stay with this menu item even if you change the order of your navs
      $('h2').text('Code 201 Projects');
      $('section[data="portfolio_links"]').show();
      $('section[data="about_section"]').hide();
    });
  };

  //click function for hamburger at <400px to display the menu when clicked on
  $('.hamburger').click(function(){
    $('table').toggle('fast');
  });



  clickAbout();
  clickHome();

}) (window);
