(function(module){

  var FunFacts = {};



  FunFacts.getFunFacts = function() {
    var countriesRender = Handlebars.compile($('#aboutme_template').html());

    $.getJSON ('data/funFacts.json', function (data) {
      FunFacts.allFunFacts = [];
      FunFacts.loadFunFacts(data);
      FunFacts.getJobsWithNoDups();
      FunFacts.getCountriesWithNoDups();
      FunFacts.countryNames = FunFacts.countries.map(function(country) {
        return {
          countryName: country
        };
      });
      FunFacts.countryNames.forEach(function(country){
        $('.countries').append(countriesRender(country));
      });
    });
  };

// TODO: Find a way to render jobs to about me via Handlebars
  FunFacts.getJobsWithNoDups = function() {
    FunFacts.jobs = [];
    console.log(FunFacts.allFunFacts);
    FunFacts.allFunFacts.map(function(currentObject){
      FunFacts.jobs.push(currentObject.job);
      return currentObject.job;
    });
    FunFacts.jobsNoDups = FunFacts.jobs.filter(function(element, index){
      return FunFacts.jobs.indexOf(element) === index;
    });
    FunFacts.jobsToRender = FunFacts.jobsNoDups.map(function(job){
      console.log(job);
      return {
        jobName: job
      };
    });
  };


  FunFacts.getCountriesWithNoDups = function() {
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

  FunFacts.getFunFacts();
}) (window);
