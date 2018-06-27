app.controller('journalCtrl',function ($scope,$firebaseArray) {
  var ref = firebase.database().ref('Documentos').child('Journal');
  $scope.journal_articles = $firebaseArray(ref);
});  