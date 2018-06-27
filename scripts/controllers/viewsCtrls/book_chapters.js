app.controller('book_chapterCtrl',function ($scope,$firebaseArray) {
  var ref = firebase.database().ref('Documentos').child('BookChapter');
  $scope.book_chapters = $firebaseArray(ref);
});