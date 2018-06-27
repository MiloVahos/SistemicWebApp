app.controller('mainCtrl', function($scope,$window,$firebaseArray){

    var DocType;
    var FilterType;
    var ResultAuto;
    var keys = [];//Llaves de firebase
    var list = [];//Lista para el autocompletado
    var ref = firebase.database().ref('Documentos');

    //Si el campos TypeSelect cambia, se reincia la busqueda
    document.getElementById("TypeSelect").onchange = function(){
        if($scope.state){
            $scope.state = !$scope.state;
            keys = [];
            list = [];
        }
    }

    //Si el campos FiltSelect cambia, se reincia la busqueda
    document.getElementById("FiltSelect").onchange = function(){
        if($scope.state){
            $scope.state = !$scope.state;
            keys = [];
            list = [];
        }
    }


    $scope.fillAutocomplete = function() {
        DocType = $scope.query['Document'];
        FilterType = $scope.query['Filter'];
        //Si no es Any, se hace una lista con solo los del tipo de documento, si es any, con todos
        if(DocType != 'Any'){
            if(FilterType != 'author'){
                createList(DocType,FilterType);
            }else{
                firebase.database().ref('Autores').on('value', function(snap){
                    snap.forEach(function(item) {
                        var itemVal = item.val();
                        keys.push(itemVal);
                    });
                });
                for (i=0; i < keys.length; i++) {
                    var value = keys[i].name;
                    var add = $.inArray(value,list);//Check if value exists, returns -1 if not
                    if(add == -1){
                        list.push(value);
                    }
                }   
            }
        }else{
            if(FilterType != 'author'){
                createList('Book',FilterType);
                createList('BookChapter',FilterType);
                createList('Journal',FilterType);
                createList('Prototype',FilterType);
                createList('Thesis',FilterType);
                createList('Software',FilterType);
                createList('Conference',FilterType);
            }else{
                firebase.database().ref('Autores').on('value', function(snap){
                    snap.forEach(function(item) {
                        var itemVal = item.val();
                        keys.push(itemVal);
                    });
                });
                for (i=0; i < keys.length; i++) {
                    var value = keys[i].name;
                    var add = $.inArray(value,list);//Check if value exists, returns -1 if not
                    if(add == -1){
                        list.push(value);
                    }
                }   
            }
        }
        $("#tags").autocomplete({
            source: list
        });
        $scope.state = !$scope.state;
        $scope.Doc = DocType;
        $scope.Filt = FilterType;
    }

    function createList(Dtype,Ftype){
        ref.child(Dtype).on('value', function(snap){
            snap.forEach(function(item) {
                var itemVal = item.val();
                keys.push(itemVal);
            });
        });
        for (i=0; i < keys.length; i++) {
            var value;
            switch(Ftype){
                case "title":
                    value = keys[i].title;
                break;
                case "year":
                    value = keys[i].year;
                break;
            }
            var add = $.inArray(value,list);//Check if value exists, returns -1 if not
            if(add == -1){
                list.push(value);
            }
        }
    }

    $scope.sendQuery = function(){
        keys = [];
        list = [];
        $scope.Tag = $("#tags").val();
    }
});