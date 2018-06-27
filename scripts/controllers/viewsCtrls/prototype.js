app.controller('prototypeCtrl',function ($scope,$firebaseArray) {
  var ref = firebase.database().ref('Documentos').child('Prototype');
  $scope.prototypes = $firebaseArray(ref);
});  