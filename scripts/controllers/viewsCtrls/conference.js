app.controller('conferenceCtrl',function ($scope,$firebaseArray) {
  var ref = firebase.database().ref('Documentos').child('Conference');
  $scope.conferences = $firebaseArray(ref);
});  

