/**
 * @author: Juan Camilo Peña Vahos
 * @description: Controlador del searchbox ubicado en el navbar
 */

app.controller('searchBoxCtrl',function ($scope,$window) {

    var authorsList = []; //Lista de autores
    var keys = [];
    var ref = firebase.database().ref('Autores');

    //Se crea una lista con los autores.
    ref.on('value', function(snap){
        snap.forEach(function(item) {
            var itemVal = item.val();
            keys.push(itemVal);
        });
        for (i=0; i < keys.length; i++) {
            var value = keys[i].name;
            var add = $.inArray(value,authorsList);//Check if value exists, returns -1 if not
            if(add == -1){
                authorsList.push(value);
            }
        }
    });

    $("#searchBox").autocomplete({ //Esta función es de JQUERY-UI no de ANGULAR
        source: authorsList
    });
    
    $scope.search = function (){
        var Tag = $("#searchBox").val();
        if(Tag != ''){
            $window.location.href = '#!/SearchResult/doctype/Any/filtType/author/tag/'+Tag;
        }
    }
    
});