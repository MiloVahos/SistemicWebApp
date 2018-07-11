/** 
 *@author:      Juan Camilo Peña Vahos
 *@description: Este controlador se encarga de los create de la aplicación
 *@lastRevised: 10/07/2018
 * 
 * CONVENCIONES EN ESTE DOCUMENTO
 *      =>LAS COLECCIONES LAS LLAMO EN MAYÚSCULAS
 *      =>LOS DOCUMENTOS CON LA PRIMERA LETRA EN MAYÚSCULA
 *      =>LOS DATOS TIENEN LA LLAVE ('KEY') EN MINÚSCULA
 */
'use strict';

app.controller('addCtrl', function addController($scope, $window) {  

  //Objetos de la base de datos
  var db              = firebase.firestore();

  //Definición de referencias
  var AuthorsRef            = db.collection('AUTHORS'); 
  var BooksRef              = db.collection('BOOKS');
  var ChaptersRef           = db.collection('CHAPTERS');
  var JournalsRef           = db.collection('JOURNALS');
  var ConferencesRef        = db.collection('CONFERENCES');
  var PrototypesRef         = db.collection('PROTOTYPES');
  var SoftwareRef           = db.collection('SOFTWARE');
  var ThesisRef             = db.collection('THESIS');
  
  //Declaración de variables
  var keys                  = [];
  var ListaAutores          = [];    //Lista que se llena al subir un documento
  var AuthorsList           = [];    //Lista con todos los autores

  
  //DEFINICIÓN DE OBJETOS DEL SCOPE
  $scope.currentYear        = new Date().getFullYear();
  $scope.author             = {}; 
  $scope.bookChapter        = {};
  $scope.book               = {};
  $scope.journal            = {};
  $scope.proto              = {};
  $scope.software           = {};
  $scope.conference         = {};
  $scope.thesis             = {};
  $scope.author['Active']   = false;

  //AuthStateListener: Su función es detectar si el usuario esta loggeado
  firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        $window.location.href = '#!/login';
    }
  });

  //FUNCIONES DE FIREBASE
  //CON ESTA FUNCIÓN SE OBTIENEN TODOS LOS AUTORES PARA PODER LLENAR EL AUTOCOMPLETE DE AUTORES
  AuthorsRef.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      AuthorsList.push(doc.data().name);
    });
  });

  //PREPARACIÓN DE LA INTERFAZ
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

  //messages: Controla el mensaje que se despliega cuando se suben datos
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
    AuthorsRef.doc($scope.author['Name']).set({
      name:       $scope.author['Name'],
      membership: $scope.author['MembershipType'],
      email:      $scope.author['Email'],
      active:     $scope.author['Active']
    }).then(function(docRef) {
      messages(false)
    }).catch(function(error) {
      message(true)
    });
  }
  //**************************************************************************************/

  //**************************************************************************************/
  //Función para agregar libros
  $scope.saveBook = function(){
    var autores = ListaAutores.toString();
    BooksRef.add({
      title:      $scope.book['Title'],
      editorial:  $scope.book['Editorial'],
      year:       $scope.book['Year'].toString(),
      author:     autores
    })
    .then(function(docRef) {
      for(var i = 0;  i < ListaAutores.length;  i++){
        var author  = ListaAutores[i];
        AuthorsRef.doc(author).collection('BOOKS').add({
          title:      $scope.book['Title'],
          editorial:  $scope.book['Editorial'],
          year:       $scope.book['Year'].toString(),
          author:     autores
        });
      }
      messages(false);
      ListaAutores  = [];
    }).catch(function(error) {
      messages(true);
    });
  }
  /****************************************************************************************/

  /****************************************************************************************/
  //Función para agregar capítulos de libros
  $scope.saveBookChapter = function(){
    var autores = ListaAutores.toString();
    ChaptersRef.add({
      title:        $scope.bookChapter['Title'],
      bookTitle:    $scope.bookChapter['TitleBook'],
      pages:        $scope.bookChapter['Pages'].toString(),
      editorial:    $scope.bookChapter['Editorial'],
      year:         $scope.bookChapter['Year'].toString(),
      author:       autores
    })
    .then(function(docRef) {
      for(var i = 0;  i < ListaAutores.length;  i++){
        var author  = ListaAutores[i];
        AuthorsRef.doc(author).collection('CHAPTERS').add({
          title:        $scope.bookChapter['Title'],
          bookTitle:    $scope.bookChapter['TitleBook'],
          pages:        $scope.bookChapter['Pages'].toString(),
          editorial:    $scope.bookChapter['Editorial'],
          year:         $scope.bookChapter['Year'].toString(),
          author:       autores
        });
      }
      messages(false);
      ListaAutores  = [];
    }).catch(function(error) {
      messages(true);
    });
  }
  /****************************************************************************************/

  //**************************************************************************************/
  //Función para agregar Journal Articles
  $scope.saveJournal = function(){
    var autores = ListaAutores.toString();
    JournalsRef.add({
      title:        $scope.journal['Title'],
      journal:      $scope.journal['Journal'],
      number:       $scope.journal['Number'],
      volume:       $scope.journal['Volume'],
      pages:        $scope.journal['Pages'],
      url:          $scope.journal['Link'],
      year:         $scope.journal['Year'].toString(),
      colciencias:  $scope.journal['CategoryColciencias'],
      sjRJcR:       $scope.journal['CategoryJcr'],
      author:       autores
    })
    .then(function(docRef) {
      for(var i = 0;  i < ListaAutores.length;  i++){
        var author  = ListaAutores[i];
        AuthorsRef.doc(author).collection('JOURNALS').add({
          title:        $scope.journal['Title'],
          journal:      $scope.journal['Journal'],
          number:       $scope.journal['Number'],
          volume:       $scope.journal['Volume'],
          pages:        $scope.journal['Pages'],
          url:          $scope.journal['Link'],
          year:         $scope.journal['Year'].toString(),
          colciencias:  $scope.journal['CategoryColciencias'],
          sjRJcR:       $scope.journal['CategoryJcr'],
          author:       autores
        });
      }
      messages(false);
      ListaAutores  = [];
    }).catch(function(error) {
      messages(true);
    });
  }
  /****************************************************************************************/

  /****************************************************************************************/
  //Función para agregar eventos científicos
  $scope.saveConference = function(){
    var autores = ListaAutores.toString();
    ConferencesRef.add({
      title:        $scope.conference['Title'],
      conference:   $scope.conference['Conference'],
      pages:        $scope.conference['Pages'],
      url:          $scope.conference['Link'],
      year:         $scope.conference['Year'].toString(),
      ambit:        $scope.conference['Ambit'],
      author:       autores
    })
    .then(function(docRef) {
      for(var i = 0;  i < ListaAutores.length;  i++){
        var author  = ListaAutores[i];
        AuthorsRef.doc(author).collection('CONFERENCES').add({
          title:        $scope.conference['Title'],
          conference:   $scope.conference['Conference'],
          pages:        $scope.conference['Pages'],
          url:          $scope.conference['Link'],
          year:         $scope.conference['Year'].toString(),
          ambit:        $scope.conference['Ambit'],
          author:       autores
        });
      }
      messages(false);
      ListaAutores  = [];
    }).catch(function(error) {
      messages(true);
    });
  }
  /****************************************************************************************/

  /****************************************************************************************/
  //Función para agregar prototipos
  $scope.savePrototype = function(){
    var autores = ListaAutores.toString();
    PrototypesRef.add({
      title:          $scope.proto['Title'],
      availability:   $scope.proto['Availability'],
      institution:    $scope.proto['Institution'],
      year:           $scope.proto['Year'].toString(),
      author:         autores
    })
    .then(function(docRef) {
      for(var i = 0;  i < ListaAutores.length;  i++){
        var author  = ListaAutores[i];
        AuthorsRef.doc(author).collection('PROTOTYPES').add({
          title:          $scope.proto['Title'],
          availability:   $scope.proto['Availability'],
          institution:    $scope.proto['Institution'],
          year:           $scope.proto['Year'].toString(),
          author:         autores
        });
      }
      messages(false);
      ListaAutores  = [];
    }).catch(function(error) {
      messages(true);
    });
  }
  /****************************************************************************************/

  /****************************************************************************************/
  //Función para agregar softwares
  $scope.saveSoftware = function(){
    var autores = ListaAutores.toString();
    SoftwareRef.add({
      title:          $scope.software['Title'],
      name:           $scope.software['Name'],
      availability:   $scope.software['Availability'],
      institution:    $scope.software['Institution'],
      year:           $scope.software['Year'].toString(),
      author:         autores
    })
    .then(function(docRef) {
      for(var i = 0;  i < ListaAutores.length;  i++){
        var author  = ListaAutores[i];
        AuthorsRef.doc(author).collection('SOFTWARE').add({
          title:          $scope.software['Title'],
          name:           $scope.software['Name'],
          availability:   $scope.software['Availability'],
          institution:    $scope.software['Institution'],
          year:           $scope.software['Year'].toString(),
          author:         autores
        });
      }
      messages(false);
      ListaAutores  = [];
    }).catch(function(error) {
      messages(true);
    });
  }
  /****************************************************************************************/

  /****************************************************************************************/
  //Función para agregar tesis de grado
  $scope.saveThesis = function(){
    var autores = ListaAutores.toString();
    ThesisRef.add({
      title:        $scope.thesis['Title'],
      student:      $scope.thesis['Student'],
      type:         $scope.thesis['Type'],
      university:   $scope.thesis['University'],
      year:         $scope.thesis['Year'].toString(),
      author:       autores
    })
    .then(function(docRef) {
      for(var i = 0;  i < ListaAutores.length;  i++){
        var author  = ListaAutores[i];
        AuthorsRef.doc(author).collection('THESIS').add({
          title:        $scope.thesis['Title'],
          student:      $scope.thesis['Student'],
          type:         $scope.thesis['Type'],
          university:   $scope.thesis['University'],
          year:         $scope.thesis['Year'].toString(),
          author:       autores
        });
      }
      messages(false);
      ListaAutores  = [];
    }).catch(function(error) {
      messages(true);
    });
  }
  /****************************************************************************************/  
});