app.controller('authorCtrl',function ($scope,$firebaseArray) {
    var ref = firebase.database().ref('Autores');
    $scope.authors = $firebaseArray(ref);
});