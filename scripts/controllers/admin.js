/**
 * @author: Juan Camilo Peña Vahos
 * @description: Controlador del panel de administrador
 */
app.controller('adminCtrl',function ($scope,$window) {

    //AuthStateListener -> Su función es detectar si el usuario esta loggeado
    firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
            $window.location.href = '#!/login';
        }
    });

    $scope.logout = function (){
        firebase.auth().signOut().then(function() {
            $window.location.href = '#!/login';
        }).catch(function(error) {
            
        });
    }

});
