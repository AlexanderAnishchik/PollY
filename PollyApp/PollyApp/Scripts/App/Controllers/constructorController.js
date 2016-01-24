PollyApp.controller('constructorController', ['$scope', '$http', 'headerKeeperService', 'pollSettingsFactory', function ($scope, $http, headerKeeperService, pollSettingsFactory) {
    var me = this;
    $scope.generated = "";
    $scope.access_type = 'Content/partial/FreeAccess.html'
    $scope.template = 'Content/partial/ChooseType.html';
    if ($scope.template == 'Content/partial/ChooseType.html') {
        $scope.next_template = 'Content/partial/ChooseAccess.html';
    }
    $scope.userGotAccess = [
    
    ];
    $scope.data = {};
    $scope.choosed = "Choose access";
    $scope.privacy = "Choose privacy";
    $scope.description = "Please choose type of privacy. Be careful when you will be choosing type and think carefully before you make a choice, because this may depend on the number of voting.";
    $scope.setPrivacy = function (type) {
        $scope.privacy = type.label;
        $scope.partialPath = 'Content/partial/share/' + type.logicalName + '.html';
    }
    $scope.access_types = null;
    $scope.share_list = null;
    me.init = function () {
        $scope.access_types = pollSettingsFactory.PollAccess;
        $scope.share_list = pollSettingsFactory.PollShare;
    };
 
    $scope.setAccess = function (type) {
        $scope.choosed = type.label;
        $scope.partialPath = 'Content/partial/access/' + type.logicalName + '.html';
    };
    $scope.generateCode = function() {
        var result = '';
        var words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        var max_position = words.length - 1;
        for (i = 0; i < 5; ++i) {
            position = Math.floor(Math.random() * max_position);
            result = result + words.substring(position, position + 1);
        }
        $scope.generated = result;
    }
    

    $scope.error = null;
    $scope.loader = false;
    $scope.addNewField = function (id_textbox) {
        $scope.tmp = false;
        for (i = 0; i < $scope.userGotAccess.length; i++) {
            if($scope.userGotAccess[i].Id == id_textbox)
            {
                $scope.tmp = true;
                break;
            }
        }
        if ($scope.tmp) {
            $scope.error = "User already exist";
        }
        else {
            $scope.loader = true;
            $http.post("Account/GetUserById", { id: id_textbox }).then(function (response) {
                $scope.loader = false;
                var data = response.data;
                if (data.user == null) {
                    $scope.tmp = true;
                    $scope.error = "The user does not exist";
                    
                }
                else {
                    if (data.user.Logo == null) {
                        data.user.Logo = 'nophoto.png';
                    }
                    $scope.userGotAccess.push(data.user);
                    $scope.tmp = false;
                }
                
                
            },
            function (response) {
                
                   
                    
                
            });
        }
        

        $scope.data.user_id_textbox = null;
        
    }
    
    $scope.deleteRow = function (idUser, index) {
        $scope.userGotAccess.splice(index,1);
    }


    $scope.count = 0;
    $scope.changeTemplate = function () {
        if ($scope.count == 1) {
            $scope.next_template = 'Content/partial/ChoosePermission.html';
            $scope.template = $scope.next_template;
        }
        else {
            $scope.template = $scope.next_template;
            $scope.count++;
        }
        
    }


  
   
}]);

