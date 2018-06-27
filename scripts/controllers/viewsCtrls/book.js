app.controller('bookCtrl',function ($scope,$firebaseArray) {
    var ref = firebase.database().ref('Documentos').child('Book');
    $scope.books = $firebaseArray(ref);
  });