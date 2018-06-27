app.controller('bindCtrl',function ($scope,$firebaseArray,$routeParams,$timeout) {

    var DocType = $routeParams.doc;
    var FilterType = $routeParams.filt;
    var Tag = $routeParams.tag;
    var list = [];

    $scope.queryBook = [];
    $scope.queryBookChapter = [];
    $scope.queryJournal = [];
    $scope.queryPrototype = [];
    $scope.querySoftware = [];
    $scope.queryThesis = [];
    $scope.queryConference = [];

    if(DocType != 'Any' && FilterType != 'author'){
        var ref = firebase.database().ref('Documentos').child(DocType).orderByChild(FilterType).equalTo(Tag);
            switch(DocType){
                case "Book":
                    $("#Book").toggle();
                    $scope.queryBook = $firebaseArray(ref);
                break;
                case "BookChapter":
                    $("#BookChapter").toggle();
                    $scope.queryBookChapter = $firebaseArray(ref);
                break;
                case "Prototype":
                    $("#Prototype").toggle();
                    $scope.queryPrototype = $firebaseArray(ref);
                break;
                case "Journal":
                    $("#Journal").toggle();
                    $scope.queryJournal = $firebaseArray(ref);
                break;
                case "Conference":
                    $("#Conference").toggle();
                    $scope.queryConference = $firebaseArray(ref);
                break;
                case "Software":
                    $("#Software").toggle();
                    $scope.querySoftware = $firebaseArray(ref);
                break;
                case "Thesis":
                    $("#Thesis").toggle();
                    $scope.queryThesis = $firebaseArray(ref);
                break;
            }
    }else if(DocType == 'Any' && FilterType != 'author'){
        var ref = firebase.database().ref('Documentos');
        refBook = ref.child('Book').orderByChild(FilterType).equalTo(Tag);
        $scope.queryBook = $firebaseArray(refBook);
        refChapter = ref.child('BookChapter').orderByChild(FilterType).equalTo(Tag);
        $scope.queryBookChapter = $firebaseArray(refChapter);
        refPrototype = ref.child('Prototype').orderByChild(FilterType).equalTo(Tag);
        $scope.queryPrototype = $firebaseArray(refPrototype);
        refJournal = ref.child('Journal').orderByChild(FilterType).equalTo(Tag);
        $scope.queryJournal = $firebaseArray(refJournal);
        refConference = ref.child('Conference').orderByChild(FilterType).equalTo(Tag);
        $scope.queryConference = $firebaseArray(refConference);
        refSoftware = ref.child('Software').orderByChild(FilterType).equalTo(Tag);
        $scope.querySoftware = $firebaseArray(refSoftware);
        refThesis =  ref.child('Thesis').orderByChild(FilterType).equalTo(Tag);
        $scope.queryThesis = $firebaseArray(refThesis);
        $("#Book").toggle();
        $("#BookChapter").toggle();
        $("#Journal").toggle();
        $("#Conference").toggle();
        $("#Prototype").toggle();
        $("#Software").toggle();
        $("#Thesis").toggle();
    }else if(DocType != 'Any' && FilterType == 'author'){
        var ref = firebase.database().ref('AutoresQuery').child(Tag);
        switch(DocType){
            case "Book":
                var ref2 = ref.child('Book');
                $scope.temp = $firebaseArray(ref2);
                $scope.temp.$loaded().then(function(data){
                    angular.forEach($scope.temp,function(data){
                        var ref = firebase.database().ref('Documentos/Book/'+data.document);
                        ref.on('value', function(snap){
                            $timeout(function(){
                                list.push(snap.val());
                            });
                        });
                    });
                    $scope.queryBook = list; 
                });
                $("#Book").toggle();
            break;         
            case "BookChapter":
                var ref2 = ref.child('BookChapter');
                $scope.temp = $firebaseArray(ref2);
                $scope.temp.$loaded().then(function(data){
                    angular.forEach($scope.temp,function(data){
                        var ref = firebase.database().ref('Documentos/BookChapter/'+data.document);
                        ref.on('value', function(snap){
                            $timeout(function(){
                                list.push(snap.val());
                            });
                        });
                    });
                    $scope.queryBookChapter = list; 
                });
                $("#BookChapter").toggle();
            break;
            case "Prototype":
                var ref2 = ref.child('Prototype');
                $scope.temp = $firebaseArray(ref2);
                $scope.temp.$loaded().then(function(data){
                    angular.forEach($scope.temp,function(data){
                        var ref = firebase.database().ref('Documentos/Prototype/'+data.document);
                        ref.on('value', function(snap){
                            $timeout(function(){
                                list.push(snap.val());
                            });
                        });
                    });
                    $scope.queryPrototype = list; 
                });
                $("#Prototype").toggle();
            break;
            case "Software":
                var ref2 = ref.child('Software');
                $scope.temp = $firebaseArray(ref2);
                $scope.temp.$loaded().then(function(data){
                    angular.forEach($scope.temp,function(data){
                        var ref = firebase.database().ref('Documentos/Software/'+data.document);
                        ref.on('value', function(snap){
                            $timeout(function(){
                                list.push(snap.val());
                            });
                        });
                    });
                    $scope.querySoftware = list; 
                });
                $("#Software").toggle();
            break;
            case "Journal":
                var ref2 = ref.child('Journal');
                $scope.temp = $firebaseArray(ref2);
                $scope.temp.$loaded().then(function(data){
                    angular.forEach($scope.temp,function(data){
                        var ref = firebase.database().ref('Documentos/Journal/'+data.document);
                        ref.on('value', function(snap){
                            $timeout(function(){
                                list.push(snap.val());
                            });
                        });
                    });
                    $scope.queryJournal = list; 
                });
                $("#Journal").toggle();
            break;
            case "Conference":
                var ref2 = ref.child('Conference');
                $scope.temp = $firebaseArray(ref2);
                $scope.temp.$loaded().then(function(data){
                    angular.forEach($scope.temp,function(data){
                        var ref = firebase.database().ref('Documentos/Conference/'+data.document);
                        ref.on('value', function(snap){
                            $timeout(function(){
                                list.push(snap.val());
                            });
                        });
                    });
                    $scope.queryConference = list; 
                });
                $("#Conference").toggle();
            break;
            case "Thesis":
                var ref2 = ref.child('Thesis');
                $scope.temp = $firebaseArray(ref2);
                $scope.temp.$loaded().then(function(data){
                    angular.forEach($scope.temp,function(data){
                        var ref = firebase.database().ref('Documentos/Thesis/'+data.document);
                        ref.on('value', function(snap){
                            $timeout(function(){
                                list.push(snap.val());
                            });
                        });
                    });
                    $scope.queryThesis = list;
                });
                $("#Thesis").toggle();
            break;
        }
    }

});  