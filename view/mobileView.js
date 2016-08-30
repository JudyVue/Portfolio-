//click function for hamburger at <400px to display the menu when clicked on
//TODO: My hamburger menu still doesn't work. A user can toggle at <400px, but if they don't re-toggle menu back when they expand, they lose, the rest of the menu. Figure out how to fix it. Also, do some fancy CSS stuff to truly make the site a mobile-friendly site first and foremost

(function(module){
  $('.hamburger').click(function(){
    $('table').toggle('fast');
  });

}) (window);
