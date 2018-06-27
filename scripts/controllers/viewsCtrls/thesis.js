app.controller('thesisCtrl',function ($scope,$firebaseArray,$routeParams) {

  var type = $routeParams.type;
  var ref = firebase.database().ref('Documentos').child('Thesis').orderByChild('type').equalTo(type);
  $scope.thesis = $firebaseArray(ref);

});  