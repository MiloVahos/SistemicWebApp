/**
 *@author:      Juan Camilo Peña Vahos
 *@description: Este documento las principales funciones de firebase y angular
 *@date:        10/07/2018
 */

'use strict';

var app = angular.module('MainModule',['ngRoute','firebase']);

app.config(function($routeProvider) {
    $routeProvider
      .when('/', {  //Rutas del navbar
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })
      .when('/authors',{ //Listo
        templateUrl: 'views/authors.html',
        controller: 'authorCtrl'
      })
      .when('/admin',{ //Listo
        templateUrl: 'views/admin.html',
        controller: 'adminCtrl'
      })
      .when('/login',{ //Listo
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/any', { 
        templateUrl: 'views/any.html',
        controller: 'anyCtrl'
      })
      .when('/book', { //Listo
        templateUrl: 'views/books.html',
        controller: 'bookCtrl'
      })
      .when('/bookChapter', {//Listo
        templateUrl: 'views/book_chapters.html',
        controller: 'book_chapterCtrl'
      })
      .when('/journal', {//Listo
        templateUrl: 'views/journal.html',
        controller: 'journalCtrl'
      })
      .when('/prototype', {//Listo
        templateUrl: 'views/prototypes.html',
        controller: 'prototypeCtrl'
      })
      .when('/software', {//Listo
        templateUrl: 'views/softwares.html',
        controller: 'softwareCtrl'
      })
      .when('/conference', {//Listo
        templateUrl: 'views/conference.html',
        controller: 'conferenceCtrl'
      })
      .when('/thesis/:type', { //Listo
        templateUrl: 'views/thesis.html',
        controller: 'thesisCtrl'
      })
      //RUTAS PARA EL ADD DEL ADMINISTRADOR
      .when('/addBook', { //Rutas para agregar del administrador
        templateUrl:'views/add/book.html',
        controller: 'addCtrl'
      })
      .when('/addBookChapter', {
        templateUrl:'views/add/book_chapter.html',
        controller: 'addCtrl'
      })
      .when('/addJournal', {
        templateUrl:'views/add/journal.html',
        controller: 'addCtrl'
      })
      .when('/addPrototype', {
        templateUrl:'views/add/prototype.html',
        controller: 'addCtrl'
      })
      .when('/addSoftware', {
        templateUrl:'views/add/software.html',
        controller: 'addCtrl'
      })
      .when('/addConference', {
        templateUrl:'views/add/conference.html',
        controller: 'addCtrl'
      })
      .when('/addThesis', { 
        templateUrl:'views/add/thesis.html',
        controller: 'addCtrl'
      })
      .when('/addAuthor',{ 
        templateUrl:'views/add/author.html',
        controller: 'addCtrl'
      })
      .when('/updateDelete',{ //Listo
        templateUrl:'views/update_delete.html',
        controller: 'updelCtrl'
      })
      .when('/:ok',{// Rutas de paso de datos //Listo
        templateUrl:'views/main.html',
        controller: 'mainCtrl'
      })
      .when('/SearchResult/doctype/:doc/filtType/:filt/tag/:tag',{ //Listo
        templateUrl: 'views/search.html',
        controller: 'bindCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
  