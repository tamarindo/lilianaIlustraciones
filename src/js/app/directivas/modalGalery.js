(function(){
  'use strict';
  var app = angular.module('myApp');
  app.directive('modalGalery', [ function() {
    return {
      restrict: 'A',
      link: function( scope, element ) {

        var btnClose = $('.modalGalery-close'),
            modalGalery = $('.modalGalery'),
            cards = element.find('.Card');

        function closeModal(){
          modalGalery.hide();
        }

        function openModal(element){
          var img = element.target;
          console.log(element);
          modalGalery.find(".modalGalery-body").html('').append($(img).clone());
          modalGalery.show();

        }

        btnClose.on('click',closeModal);

        cards.on('click',openModal);

        console.log('hola');
      }
    };
  }]);
})();
