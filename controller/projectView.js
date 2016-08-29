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

//class 07 work

//object constructor
  function FunFacts (opts) {
    for (keys in opts) {
      this[keys] = opts[keys];
    }
  }



  //TODO: DONE So much to do here. I'm trying to reduce my funFacts data array so that only countries are pulled and the dups are taken out. I'm trying to get that into another object so that I can pull the 'country' property with Handlebars. I am temporarily defeated at the moment. I believe the FunFacts.getFunFacts function should be wrapped around EVERYTHING here. Will modify eventually.
  FunFacts.getFunFacts = function() {
    var countriesRender = Handlebars.compile($('#aboutme_template').html());

    //TODO: Decide if I really need this AJAX/live-server data nonsense as it seems to be causing me more unwarranted headaches.
    $.getJSON ('data/funFacts.json', function (data) {
      FunFacts.allFunFacts = [];
      FunFacts.loadFunFacts(data);
      FunFacts.getCountiesWithNoDups();
      FunFacts.countryNames = FunFacts.countries.map(function(country) {
        console.log(country);
        return {
          countryName: country
        };
      });
      FunFacts.countryNames.forEach(function(country){
        $('.countries').append(countriesRender(country));
      });
    });
  };


  FunFacts.getCountiesWithNoDups = function() {
    FunFacts.countries = [];
    FunFacts.allFunFacts.map(function(currentObject) {
      return currentObject.country;
    }).reduce(function(array, cur) {
      if (array.indexOf(cur) === -1) {
        array.push(cur);
      }
      FunFacts.countries = array;
      return array;
    }, []);
  };

  //sort array according to date
  FunFacts.loadFunFacts = function(inputData) {
    FunFacts.allFunFacts = inputData.sort(function(a,b) {
      return parseInt(a.year) - parseInt(b.year);
    });
  };


  //TODO: Put this in a separate JS file for easier handling and referencing. All this was done around Day 2 or so when we were learning jQuery. Also, follow Megan's advice from Day 5 peer review.

  //adding data attributes to my home and about sections
  //TODO: Do I really need this? I only did this for the sake of completing a portfolio assigment on Day 2 that said to add data attributes. I may take it out for easier handling when I refactor my nav bar navigation click functions.
  addDataAttributes = function() {
    $('.aboutmesection').attr('data','about_section');
    $('section:not(.aboutmesection)').attr('data', 'portfolio_links');
  //MEGAN: Might as well do this in the HTML
  };

  //TODO: Use 'this' and dynamically apply ID's so I can get rid of this need to add a click function for every damn thing
  //click function to show about section on about
  clickAbout = function(){
    $('#about_td').on('click', function(){//MEGAN: I think you should use id's here. You want a unique selector that will always stay with this menu item even if you change the order of your navs
      $('h2').text('About Me');
      $('section[data="about_section"]').show();
      $('section:not(.aboutmesection)').hide();

    });
  };

  //TODO: Use 'this' keyword
  //click function to go home when clicking home
  clickHome = function(){
    $('#home_td').on('click', function(){ //MEGAN: I think you should use id's here. You want a unique selector that will always stay with this menu item even if you change the order of your navs
      $('h2').text('Code 201 Projects');
      $('section[data="portfolio_links"]').show();
      $('section[data="about_section"]').hide();
      $('.comedysection').hide();
    });
  };

  clickFunny = function(){
    $('#comedy').on('click', function(){
      $('h2').text('Please Laugh at My Comdedy, not My Code');
      $('.comedysection').show();
      $('section').not('.comedysection').hide();
    });
  };

  //click function for hamburger at <400px to display the menu when clicked on
  //TODO: My hamburger menu still doesn't work. A user can toggle at <400px, but if they don't re-toggle menu back when they expand, they lose, the rest of the menu. Figure out how to fix it. Also, do some fancy CSS stuff to truly make the site a mobile-friendly site first and foremost
  $('.hamburger').click(function(){
    $('table').toggle('fast');
  });


  FunFacts.getFunFacts();
  addDataAttributes();
  // clickAbout();
  // clickHome();
  // clickFunny();

}) (window);
