app.controller('anyCtrl',function ($scope,$firebaseArray) {

    var ref = firebase.database().ref('Documentos');

    var refBook = ref.child('Book');
    $scope.queryBook = $firebaseArray(refBook);

    var refBookChapter = ref.child('BookChapter');
    $scope.queryBookChapter = $firebaseArray(refBookChapter);

    var refPrototype= ref.child('Prototype');
    $scope.queryPrototype = $firebaseArray(refPrototype);

    var refSoftware= ref.child('Software');
    $scope.querySoftware = $firebaseArray(refSoftware);

    var refConference = ref.child('Conference');
    $scope.queryConference = $firebaseArray(refConference);

    var refJournal = ref.child('Journal');
    $scope.queryJournal = $firebaseArray(refJournal);

    var refThesis = ref.child('Thesis');
    $scope.queryThesis = $firebaseArray(refThesis);

});