app.controller('softwareCtrl',function ($scope,$firebaseArray) {
    var ref = firebase.database().ref('Documentos').child('Software');
    $scope.softwares = $firebaseArray(ref);
});  