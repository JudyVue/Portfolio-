(function(module){

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

  FunFacts.getFunFacts();
}) (window);
