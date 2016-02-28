PollyApp.controller('constructorController', ['$scope', '$http', 'headerKeeperService', 'pollSettingsFactory', 'pollBuilderService', function ($scope, $http, headerKeeperService, pollSettingsFactory, pollBuilderService) {
    var me = this;
    $scope.headerData = headerKeeperService.data;
    $scope.secureCodes = [];
    $scope.partialAccessPath = 'Content/partial/access/Default.html';
    $scope.partialSharePath = 'Content/partial/share/Default.html';
    $scope.access_type = 'Content/partial/FreeAccess.html'
    $scope.template = 'Content/partial/ChooseType.html';
    if ($scope.template == 'Content/partial/ChooseType.html') {
        $scope.next_template = 'Content/partial/ChooseAccess.html';
    }
    $scope.userGotAccess = [
    
    ];
    $scope.settingsView = {
        step1: 'Content/partial/ChooseType.html',
        step2: 'Content/partial/ChooseAccess.html',
        step3: 'Content/partial/ChooseShare.html',
        step4: 'Content/partial/constructor.html',
    };
    $scope.setStep = function (stepValue) {
        $scope.step = stepValue;
    }
    $scope.step = $scope.settingsView.step1;
    $scope.data = {};
    $scope.builderData = pollBuilderService.pollData;
    $scope.currentBlock = null;
    $scope.choosed = "Choose access";
    $scope.privacy = "Choose privacy";
    $scope.description = "Please choose type of privacy. Be careful when you will be choosing type and think carefully before you make a choice, because this may depend on the number of voting.";
    $scope.setShare = function (type) {
        pollBuilderService.setShare(type.value);
        $scope.privacy = type.label;
        $scope.share_set_complete = true;
        $scope.partialSharePath = 'Content/partial/share/' + type.logicalName + '.html';
    }
    $scope.access_types = null;
    $scope.share_list = null;
    $scope.answersSetCssClass = function (last, index) {
        if (last)
            return "add";
        if(index==0)
            return "disabled delete";
        return "delete";
    }
    $scope.indexNotification = 0;
    $scope.notifications = {};
    $scope.addBlock = function (last) {
        var i;
        if (!$scope.currentBlock.question.value) {
            i = $scope.indexNotification++;
            $scope.notifications[i] = "Question can't be empty!";
            return;
        }
        pollBuilderService.addBlock();
        $scope.changeBlock($scope.builderData.poll.length-1);
    }
    me.init = function () {
        $scope.access_types = pollSettingsFactory.PollAccess;
        $scope.share_list = pollSettingsFactory.PollShare;
        $scope.poll_type = pollSettingsFactory.PollType;
        pollBuilderService.testData();
        $scope.currentBlock = $scope.builderData.poll[0];
    };
    $scope.setPollType = function (type) {
        if (type.value == 2) {
            pollBuilderService.setType(type.value);
            $scope.step = $scope.settingsView.step2;
        }
        else {
            
        }
       
    }
    $scope.setAccess = function (type) {
        $scope.choosed = type.label;
        $scope.partialAccessPath = 'Content/partial/access/' + type.logicalName + '.html';
        $scope.access_set_complete = true;
        pollBuilderService.setAccess(type.value);
    };
    $scope.changeAnswerState = function (block, index, isAdd) {

        if (isAdd)
            pollBuilderService.addAnswer(block);
        else
            pollBuilderService.deleteAnswer(block,index);

    }
    $scope.changeBlock = function (index) {
        $scope.currentBlock = $scope.builderData.poll[index];
    };
    $scope.deleteBlock = function (index) {
        if ($scope.builderData.poll.length > 1) {
            pollBuilderService.deleteQuestion(index);
            $scope.currentBlock = $scope.builderData.poll[0];
        }
    };
    $scope.generateCode = function(count) {
        if (count > 0) {
            $http.post("Constructor/GenerateCode", { count: count }).then(function (response) {
                if (response.data.status) {
                    $scope.secureCodes = response.data.codes;
                }
            })
        }
        else {

        }
    }
    
    $scope.savePoll = function () {
        pollBuilderService.save();
    }
    $scope.error = null;
    $scope.loader = false;
    $scope.addNewField = function (email) {
        if (email != "") {
            $scope.tmp = false;
            if ($scope.userGotAccess.length > 0) {
                for (i = 0; i < $scope.userGotAccess.length; i++) {
                    if ($scope.userGotAccess[i].Email == email) {
                        $scope.tmp = true;
                        break;
                    }
                }
            }
            
            if ($scope.tmp) {
                $scope.error = "User already exist";
            }
            else {
                $scope.loader = true;
                $http.post("Account/GetUserByEmail", { email: email }).then(function (response) {
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

                })
            }
            
        }
        else {
            $scope.error = "Please enter email";
        }
        
        
    }
    
    $scope.deleteRow = function (idUser, index) {
        $scope.userGotAccess.splice(index,1);
    }


    
    $scope.changeTemplate = function () {
        if ($scope.step == 1) {
            $scope.next_template = 'Content/partial/ChoosePermission.html';
            $scope.template = $scope.next_template;
            $scope.step++;
        }
        else {
            if ($scope.step == 2) {
                $scope.next_template = 'Content/partial/constructor.html';
                $scope.template = $scope.next_template;
            }
            $scope.template = $scope.next_template;
            $scope.step++;
        }
        
    }

   
    
  
   
}]);

