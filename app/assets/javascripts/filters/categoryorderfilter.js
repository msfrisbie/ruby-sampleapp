window.angular.module('Outhouse.categoryOrderFilter', [])
  .filter('setCategoryOrder', function() {
    return function(items) {
      return [
        items['good-eats']
      , items['study-corners']
      , items['happy-hour-every-hour']
      , items['pop-some-tags']
      , items['go-green']
      , items['get-outside']
      , items['explore']
      ]
    };
  });