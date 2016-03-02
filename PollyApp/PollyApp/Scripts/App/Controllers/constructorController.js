PollyApp.controller('constructorController', ['$scope', '$http', 'headerKeeperService', 'modalService', 'pollSettingsFactory', 'pollBuilderService', '$mdDialog', function ($scope, $http, headerKeeperService, modalService, pollSettingsFactory, pollBuilderService, $mdDialog) {
    var me = this;
    
    $scope.headerData = headerKeeperService.data;
    $scope.secureCodes = [];

    me.singleOrMultiply = true;
    $scope.partialAccessPath = 'Content/partial/access/Default.html';
    $scope.partialSharePath = 'Content/partial/share/Default.html';

    $scope.access_type = 'Content/partial/FreeAccess.html';
    $scope.template = 'Content/partial/ChooseType.html';
    if ($scope.template == 'Content/partial/ChooseType.html') {
        $scope.next_template = 'Content/partial/ChooseAccess.html';
    }
    me.userGotAccess = [

    ];
    $scope.settingsView = {
        step1: 'Content/partial/ChooseType.html',
        step2: 'Content/partial/ChooseAccess.html',
        step3: 'Content/partial/ChooseShare.html',
        step4: 'Content/partial/constructor.html',
    };
    $scope.isBuilder = false;
    $scope.setStep = function (stepValue) {
        $scope.step = stepValue;
        if ($scope.step == $scope.settingsView.step4) {
            pollBuilderService.isBuilder = true;
            $scope.isBuilder = pollBuilderService.isBuilder;
        }
        
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

        if (index == 0)
            return "disabled delete";
        return "delete";
    }
    $scope.indexNotification = 0;
    $scope.notifications = {};

    $scope.addBlock = function (event, last) {
        if (!$scope.currentBlock.question.value) {
            var modalObject = {
                title: "Error",
                textContent: "Question must be not empty!",
                ariaLabel: "yourpolly.com",
                event:event
            };
            modalService.showAlert(modalObject, function () { }, function () { });
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
    me.multiplyResults = [];
    $scope.parseMultiplyUsers = function () {
        var res = me.multiplyResults.split(";");
        me.multiplyResults = res;
    };
    $scope.generateCode = function (count) {
        if (count > 0) {
            $http.post("Constructor/GenerateCode", { count: count }).then(function (response) {
                if (response.data.status) {
                    $scope.secureCodes = response.data.codes;
                    pollBuilderService.saveCodeSet($scope.secureCodes);
                }
            })
        }
        else {

        }
    }

    $scope.saveUserSet = function () {
        debugger;
        if (me.singleOrMultiply) {
            var users = [];
            var i = me.userGotAccess.length;
            while (i--) {
                users.push(me.userGotAccess[i].Email)
            }
            pollBuilderService.saveUserSet(users);
        } else {
            $scope.parseMultiplyUsers();
            pollBuilderService.saveUserSet(me.multiplyResults);
        }
    }


    $scope.openCustomDialog = function (event) {
        var object = {
            controller: 'dialogController',
            template: 'pollsavetype.tmpl.html',
            outerClose:false,
            event: event
        };
        modalService.showCustomDialog(object, function () { }, function () { });
    };
    $scope.savePoll = function (event) {
        var modalObject = {
            title: "Confirmation",
            textContent: "Are you sure that you want to save your project?",
            ariaLabel: "yourpolly.com / Save project",
            event: event
        };
        modalService.showConfirm(modalObject,
            function () {
                pollBuilderService.save(function () {
                    $scope.openCustomDialog(event);
                }, function () { modalService.showAlert({ title: "Error", textContent: "You can not save the poll, check your data", ariaLabel: "yourpolly.com / Confirm save", event: event }) }, function () { });
            },
        function () { });
        
        
    }
    $scope.error = null;
    $scope.loader = false;
    $scope.addNewField = function (email) {
        $scope.tmp = null;
        if (email != undefined && email!="") {
            $scope.tmp = false;

            if (me.userGotAccess.length > 0) {
                for (i = 0; i < me.userGotAccess.length; i++) {
                    if (me.userGotAccess[i].Email == email) {
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
             
                        me.userGotAccess.push(data.user);                      
                        $scope.data.user_id_textbox = "";
                        $scope.tmp = false;
                    }

                })
            }

        }
        else {
            $scope.error = "Please enter email";
            $scope.tmp = true;
        }


    }
    
    $scope.deleteRow = function (idUser, index) {
    
        me.userGotAccess.splice(index, 1);
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

