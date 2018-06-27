/**
 * @author: Juan Camilo Peña Vahos
 * @description: Controlador para update and delete
 */
app.controller('updelCtrl',function ($scope,$window,$firebaseArray) {

    //AuthStateListener -> Su función es detectar si el usuario esta loggeado
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            $window.location.href = '#!/login';
        }
    });

    //Se obtiene la base de datos
    var ref = firebase.database().ref('Documentos');
    var refBook = ref.child('Book');
    $scope.queryBook = $firebaseArray(refBook);
    var Books = $scope.queryBook;
    var refBookChapter = ref.child('BookChapter');
    $scope.queryBookChapter = $firebaseArray(refBookChapter);
    var refPrototype= ref.child('Prototype');
    $scope.queryPrototype = $firebaseArray(refPrototype);
    var refSoftware= ref.child('Software');
    $scope.querySoftware = $firebaseArray(refSoftware);
    var refEvents = ref.child('Events');
    $scope.queryEvents= $firebaseArray(refEvents);
    var refJournal = ref.child('Journal');
    $scope.queryJournal = $firebaseArray(refJournal);
    var refThesis = ref.child('Thesis');
    $scope.queryThesis = $firebaseArray(refThesis);



});