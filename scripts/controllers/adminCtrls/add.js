/**
 *@author: Juan Camilo Peña Vahos
 *@description: Este controlador se encarga de los create de la aplicación
 */
'use strict';

app.controller('addCtrl', function addController($scope, $window, $firebaseArray, $timeout) {  

   //Declaración de variables
   var keys = [];
   var ListaAutores = []; //Lista que se llena al subir un documento
   var AuthorsList = []; //Lista con todos los autores

  //AuthStateListener -> Su función es detectar si el usuario esta loggeado
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        $window.location.href = '#!/login';
    }
  });

  //FUNCIONES DE FIREBASE
  var refAutores = firebase.database().ref('Autores');
  var temp = $firebaseArray(refAutores);
  temp.$loaded().then(function(data){
    angular.forEach(temp,function(data){
      $timeout(function(){
        AuthorsList.push(data.name);
      });
    });
  });

  //Definición de variables del scope
  $scope.currentYear = new Date().getFullYear();
  $scope.author = {}; 
  $scope.bookChapter = {};
  $scope.book = {};
  $scope.journal = {};
  $scope.proto = {};
  $scope.software = {};
  $scope.conference = {};
  $scope.thesis = {};
  $scope.author['Active'] = false;
  //Preparación de la interfaz
  $("#success").hide();
  $("#danger").hide();

  $("#SearchAuthor").autocomplete({
    source: AuthorsList
  });

  //FUNCIONES LLAMADAS DESDE LA INTERFAZ CON EL SCOPE
  $scope.addToList =  function(){
    var actual = $scope.autor;
    ListaAutores.push(actual);
    var li = "<li>" + actual + "</li>";
    $("#AuthorsList").append(li);
  }

  //FUNCIONES JAVASCRIPT
  function messages(error){
    if (error) {
      $("#danger").fadeTo(2000, 500).slideUp(500, function(){
        $("#danger").alert('close');
      });
    } else {
      $('form').get(0).reset()
      $("#AuthorsList").empty();
      $("#success").fadeTo(2000, 500).slideUp(500, function(){
        $("#success").slideUp(500);
      });
    }
  }

  //**************************************************************************************/
  //Función para agregar autores
  $scope.saveAuthor = function (){
    firebase.database().ref('Autores').child($scope.author['Name']).set({
      name: $scope.author['Name'],
      membershipType: $scope.author['MembershipType'],
      email: $scope.author['Email'],
      active: $scope.author['Active'] //Este parámetro esta inicializado en false;
    }, function(error) {
      messages(error);
    });
  }
  //**************************************************************************************/

  //**************************************************************************************/
  //Función para agregar libros
  $scope.saveBook = function(){
    var autores = ListaAutores.toString();
    firebase.database().ref('Documentos').child('Book').push({
      title: $scope.book['Title'],
      editorial: $scope.book['Editorial'],
      year: $scope.book['Year'].toString(),
      author: autores
    }, function(error) {
      messages(error);
    }).then((snap) => {
      var key = snap.key;
      for(var i=0; i<ListaAutores.length; i++){
        var autor = ListaAutores[i];
        firebase.database().ref('AutoresQuery').child(autor).child("Book").push({
          document: key
        });
      }
      ListaAutores = [];
    });
  }
  /****************************************************************************************/

  /****************************************************************************************/
  //Función para agregar capítulos de libros
  $scope.saveBookChapter = function(){
    var autores = ListaAutores.toString();
    firebase.database().ref('Documentos').child('BookChapter').push({
      title: $scope.bookChapter['Title'],
      bookTitle: $scope.bookChapter['TitleBook'],
      pages: $scope.bookChapter['Pages'].toString(),
      editorial: $scope.bookChapter['Editorial'],
      year: $scope.bookChapter['Year'].toString(),
      author: autores
    },function(error) {
      messages(error);
    }).then((snap) => {
      var key = snap.key;
      for(var i=0; i<ListaAutores.length; i++){
        var autor = ListaAutores[i];
        firebase.database().ref('AutoresQuery').child(autor).child("BookChapter").push({
          document: key
        });
      }
      ListaAutores = [];
    });
  }
  /****************************************************************************************/

  //**************************************************************************************/
  //Función para agregar Journal Articles
  $scope.saveJournal = function(){
    var autores = ListaAutores.toString();
    firebase.database().ref('Documentos').child('Journal').push({
      title: $scope.journal['Title'],
      journal: $scope.journal['Journal'],
      number: $scope.journal['Number'],
      volume: $scope.journal['Volume'],
      pages: $scope.journal['Pages'],
      url: $scope.journal['Link'],
      year: $scope.journal['Year'].toString(),
      colciencias: $scope.journal['CategoryColciencias'],
      sjRJcR: $scope.journal['CategoryJcr'],
      author: autores
    }, function(error) {
      messages(error);
    }).then((snap) => {
      var key = snap.key;
      for(var i=0; i<ListaAutores.length; i++){
        var autor = ListaAutores[i];
        firebase.database().ref('AutoresQuery').child(autor).child("Journal").push({
          document: key
        });
      }
      ListaAutores = [];
    });
  }
  /****************************************************************************************/
  /****************************************************************************************/
  //Función para agregar prototipos
  $scope.savePrototype = function(){
    var autores = ListaAutores.toString();
    firebase.database().ref('Documentos').child('Prototype').push({
      title: $scope.proto['Title'],
      availability: $scope.proto['Availability'],
      institution: $scope.proto['Institution'],
      year: $scope.proto['Year'].toString(),
      author: autores
    },function(error) {
      messages(error);
    }).then((snap) => {
      var key = snap.key;
      for(var i=0; i<ListaAutores.length; i++){
        var autor = ListaAutores[i];
        firebase.database().ref('AutoresQuery').child(autor).child("Prototype").push({
          document: key
        });
      }
      ListaAutores = [];
    });
  }
  /****************************************************************************************/

  /****************************************************************************************/
  //Función para agregar softwares
  $scope.saveSoftware = function(){
    var autores = ListaAutores.toString();
    firebase.database().ref('Documentos').child('Software').push({
      title: $scope.software['Title'],
      name: $scope.software['Name'],
      availability: $scope.software['Availability'],
      institution: $scope.software['Institution'],
      year: $scope.software['Year'].toString(),
      author: autores
    },function(error) {
      messages(error);
    }).then((snap) => {
      var key = snap.key;
      for(var i=0; i<ListaAutores.length; i++){
        var autor = ListaAutores[i];
        firebase.database().ref('AutoresQuery').child(autor).child("Software").push({
          document: key
        });
      }
      ListaAutores = [];
    });
  }
  /****************************************************************************************/

  /****************************************************************************************/
  //Función para agregar tesis de grado
  $scope.saveThesis = function(){
    var autores = ListaAutores.toString();
    firebase.database().ref('Documentos').child('Thesis').push({
      title: $scope.thesis['Title'],
      student: $scope.thesis['Student'],
      type: $scope.thesis['Type'],
      university: $scope.thesis['University'],
      year: $scope.thesis['Year'].toString(),
      author: autores
    },function(error) {
      messages(error);
    }).then((snap) => {
      var key = snap.key;
      for(var i=0; i<ListaAutores.length; i++){
        var autor = ListaAutores[i];
        firebase.database().ref('AutoresQuery').child(autor).child("Thesis").push({
          document: key
        });
      }
      ListaAutores = [];
    });
  }
  /****************************************************************************************/


  /****************************************************************************************/
  //Función para agregar eventos científicos
  $scope.saveConference = function(){
    var autores = ListaAutores.toString();
    firebase.database().ref('Documentos').child('Conference').push({
      title: $scope.conference['Title'],
      conference: $scope.conference['Conference'],
      pages: $scope.conference['Pages'],
      url: $scope.conference['Link'],
      year: $scope.conference['Year'].toString(),
      ambit: $scope.conference['Ambit'],
      author: autores
    },function(error) {
      messages(error);
    }).then((snap) => {
      var key = snap.key;
      for(var i=0; i<ListaAutores.length; i++){
        var autor = ListaAutores[i];
        firebase.database().ref('AutoresQuery').child(autor).child("Conference").push({
          document: key
        });
      }
      ListaAutores = [];
    });
  } 
  /****************************************************************************************/
  
});