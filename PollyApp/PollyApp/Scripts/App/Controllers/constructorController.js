PollyApp.controller('constructorController', ['$scope', 'headerKeeperService', function ($scope, headerKeeperService) {
    var me = this;
    $scope.generated = "";
    $scope.access_type = 'Content/partial/FreeAccess.html'
    $scope.template = 'Content/partial/ChooseType.html';
    if ($scope.template == 'Content/partial/ChooseType.html') {
        $scope.next_template = 'Content/partial/ChooseAccess.html';
    }
    
    
    
    $scope.choosed = "Choose access"
    me.init = function () {

    };
    $scope.access_types = [
    {
        'name': 'Free Access',
        
    },
    {
        'name': 'Code Access',
        
    },
    {
        'name': 'Someone People',
        
    }
    ];
    $scope.setAccess = function (type) {
        $scope.choosed = type;
        type = type.replace(/\s+/g, '');
        $scope.access_type = 'Content/partial/' + type + '.html';
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

    $scope.addNewField = function () {
        
        alert("SANYA PLZ DO THIS EVENT");
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


    $scope.privacy = "Choose privacy";
    $scope.description = "Please choose type of privacy. Be careful when you will be choosing type and think carefully before you make a choice, because this may depend on the number of voting.";
    $scope.privacy_list = [
    {
        'name': 'Public',
        'description': 'This type of survey allows the creator of privacy and all voting to see who voted for which option.',

    },
    {
        'name': 'Private',
        'description': 'This type of privacy to hide data on voters and to leave all voting incognito.',
    }
    ];
    $scope.setPrivacy = function (name,desc) {
        $scope.privacy = name;
        $scope.description = desc;
    }
}]);

