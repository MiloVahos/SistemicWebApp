/**
 * @author: Juan Camilo Peña Vahos
 * @description: Controlador para el loggeo de usuario administradores
 */

app.controller('loginCtrl',function ($scope,$window) {
    
    $scope.user = {};

    $scope.login = function(){
        firebase.auth()
                .signInWithEmailAndPassword($scope.user['Email'], $scope.user['Password'])
                .catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    $(".alert").text(errorMessage);
                    $(".alert").alert();
        });
    }

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            $window.location.href = '#!/admin';
        }
    });
      
    
});