(function(){
  'use strict';
  var app = angular.module('myApp');
  app.directive('slider', [ function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $('.Slider-galery').slick({
          dots: true,
          infinite: true,
          speed: 600,
          arrows: false,
          fade: true,
          cssEase: 'linear'
        });
      }
    };
  }]);
})();
