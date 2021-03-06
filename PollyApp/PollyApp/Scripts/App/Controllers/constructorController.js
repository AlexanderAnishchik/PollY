﻿PollyApp.controller('constructorController', ['$scope', '$http', 'headerKeeperService', 'modalService', 'pollSettingsFactory', 'recoveryService', 'pollBuilderService', '$mdDialog', function ($scope, $http, headerKeeperService, modalService, pollSettingsFactory, recoveryService, pollBuilderService, $mdDialog) {
    var me = this;

    $scope.headerData = headerKeeperService.data;
    $scope.accessData = {
        secureCodes: [],
        choosedLabel: "Choose access",
        path: 'Content/partial/access/Default.html',
        access_types: null,
        set_complete: false,
        singleOrMultiply: true,
        multiplyResults: [],
        userGotAccess: [],
        codesCount: null,

    }
    $scope.privacyData = {
        share_list: [],
        choosedLabel: "Choose privacy",
        path: 'Content/partial/share/Default.html',
        access_types: null,
        set_complete: false,
        singleOrMultiply: true,
        multiplyResults: [],
        userGotAccess: [],
        codesCount: null,

    }
    $scope.resetValues = function () {
        $scope.accessData.secureCodes = [];
        $scope.accessData.choosedLabel = "Choose access";
        $scope.accessData.path = 'Content/partial/access/Default.html';
        $scope.accessData.set_complete = false;
        $scope.accessData.singleOrMultiply = true;
        $scope.accessData.multiplyResults = [];
        $scope.accessData.userGotAccess = [];
        $scope.accessData.codesCount = null;
        $scope.privacyData.choosedLabel = "Choose access";
        $scope.privacyData.path = 'Content/partial/access/Default.html';
        $scope.privacyData.set_complete = false;
        $scope.privacyData.singleOrMultiply = true;
        $scope.privacyData.multiplyResults = [];
        $scope.privacyData.userGotAccess = [];
        $scope.privacyData.codesCount = null;
    }
    $scope.saved = false;
    $scope.partialAccessPath = 'Content/partial/access/Default.html';
    $scope.partialSharePath = 'Content/partial/share/Default.html';

    $scope.access_type = 'Content/partial/FreeAccess.html';
    $scope.template = 'Content/partial/ChooseType.html';
    if ($scope.template == 'Content/partial/ChooseType.html') {
        $scope.next_template = 'Content/partial/ChooseAccess.html';
    }

    $scope.settingsView = {
    	step1: 'Content/partial/ChooseType.html',
    	step2: 'Content/partial/ChooseAccess.html',
    	step3: 'Content/partial/ChooseShare.html',
    	step3Quiz: 'Content/partial/SetCountQuestion.html',
    	step4: 'Content/partial/constructor.html',
    };
    $scope.steps = pollSettingsFactory.PollSteps;
    $scope.isBuilder = $scope.steps[$scope.steps.length - 1].isDone;
    $scope.step = $scope.settingsView.step1;

    $scope.data = {};
    $scope.builderData = {};
    $scope.currentBlock = null;

    $scope.description = "Please choose type of privacy. Be careful when you will be choosing type and think carefully before you make a choice, because this may depend on the number of voting.";

    $scope.indexNotification = 0;
    $scope.notifications = {};

    $scope.error = null;
    $scope.loader = false;


    $scope.settings = { showSettings: false };

    var intr = setInterval(function () {
        var saveData = {
            builderData: $scope.builderData,
            isBuilder: $scope.isBuilder,
            accessData: $scope.accessData,
            privacyData: $scope.privacyData,
            saved: $scope.saved
        };
        var data = recoveryService.getRecoveryPollData();
        if (data != null && data.saved) {
            recoveryService.clearRecoveryPollData();
            clearInterval(intr);
        }
        else {
            if ($scope.builderData.PollName != null & $scope.builderData.PollName != "")
                recoveryService.setRecoveryPollData(saveData);
        }
    }, 2000);
    me.loadPoll = function () {
        var data = recoveryService.getRecoveryPollData();
        if (data == null) return false;
        for (var field in data) {
            $scope[field] = data[field];
        }
        return true;
    }
    
    $scope.setStep = function (stepValue) {
        $scope.step = stepValue;
        for (var i = 1; i < $scope.steps.length; i++) {
            if ($scope.step == $scope.steps[i].step) {
                $scope.steps[i - 1].isDone = true;
            }
        }
        if ($scope.builderData.poll.length >= 2 && $scope.builderData.PollName) {
            $scope.steps[$scope.steps.length - 1].isDone = true;
        }
        else
            $scope.steps[$scope.steps.length - 1].isDone = false;
        if ($scope.step == $scope.settingsView.step4) {
            $scope.isBuilder = true;
        }

    }

	  
    $scope.setShare = function (type) {
        $scope.privacyData.choosedLabel = type.label;
        pollBuilderService.setShare(type.value);
        $scope.privacy = type.label;
        $scope.privacyData.set_complete = true;
        $scope.privacyData.path = 'Content/partial/share/' + type.logicalName + '.html';
    }
    $scope.answersSetCssClass = function (last, index) {
        if (last)
            return "add";

        if (index == 0)
            return "disabled delete";
        return "delete";
    }
    
    $scope.addBlock = function (event, last) {
        if (!$scope.currentBlock.question.value) {
            var modalObject = {
                title: "Error",
                textContent: "Question must be not empty!",
                ariaLabel: "yourpolly.com",
                event: event
            };
            modalService.showAlert(modalObject, function () { }, function () { });
            return;
        }
        var countEmptyAnswers = 0;
        for (var i in $scope.currentBlock.answers) {

            if (!$scope.currentBlock.answers[i].value) {
                countEmptyAnswers++;
            }
        }
        if ($scope.currentBlock.answers.length - countEmptyAnswers < 2) {
            var modalObject = {
                title: "Error",
                textContent: "Question must have more then one answers",
                ariaLabel: "Question must have more then one answers",
                event: event
            };
            modalService.showAlert(modalObject, function () { }, function () { });
            return;
        }

        pollBuilderService.addBlock();
        $scope.changeBlock($scope.builderData.poll.length - 1);
    }
    me.init = function () {
        var status = me.loadPoll();
        if (status) {
            pollBuilderService.pollData = $scope.builderData;
            $scope.step = $scope.settingsView.step4;
            for (var i = 0 ; i < $scope.steps.length - 1; i++) {
                $scope.steps[i].isDone = true;
            }
            $scope.currentBlock = $scope.builderData.poll[0];
        }
        $scope.accessData.access_types = pollSettingsFactory.PollAccess;
        $scope.privacyData.share_list = pollSettingsFactory.PollShare;
        $scope.poll_type = pollSettingsFactory.PollType;
    };
    $scope.setPollType = function (type, event) {
        pollBuilderService.initData();
        $scope.builderData = pollBuilderService.pollData;
        $scope.currentBlock = $scope.builderData.poll[0];
        var data = recoveryService.getRecoveryPollData();
        if (data == null) {
            $scope.steps[0].isDone = true;
            pollBuilderService.setType(type.value);
            $scope.step = $scope.settingsView.step2;
        }
        else {
            var modalObject = {
                title: "Confirmation",
                textContent: "Do you want create new project?",
                ariaLabel: "Do you want create new project?",
                event: event
            };

            modalService.showConfirm(modalObject, function () {
                recoveryService.clearRecoveryPollData();
                for (var i = 0 ; i < $scope.steps.length; i++) {
                    $scope.steps[i].isDone = false;
                }
                $scope.isBuilder = false;
                $scope.resetValues();
                $scope.steps[0].isDone = true;
                if (type.value == 2) {
                    pollBuilderService.setType(type.value);
                    $scope.step = $scope.settingsView.step2;
                }

            },
            function () {
                $scope.steps[0].isDone = true;
                if (type.value == 2) {
                    pollBuilderService.setType(type.value);
                    $scope.step = $scope.settingsView.step2;
                }
            });
        }



    }

    $scope.setAccess = function (type) {
        $scope.accessData.choosedLabel = type.label;
        $scope.accessData.path = 'Content/partial/access/' + type.logicalName + '.html';
        $scope.accessData.set_complete = true;
        pollBuilderService.setAccess(type.value);
    };
    $scope.changeAnswerState = function (block, index, isAdd) {

        if (isAdd)
            pollBuilderService.addAnswer(block);
        else
            pollBuilderService.deleteAnswer(block, index);

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
    $scope.parseMultiplyUsers = function () {
        return $scope.accessData.multiplyResults.split(";");
    };
    $scope.generateCode = function (count) {
        if (count > 0) {
            $http.post("Constructor/GenerateCode", { count: count }).then(function (response) {
                if (response.data.status) {
                    $scope.accessData.secureCodes = response.data.codes;
                    pollBuilderService.saveCodeSet($scope.accessData.secureCodes);
                    var blob = new Blob([response.data.codes], { type: "text/plain;charset=utf-8" });
                    saveAs(blob, "codes.txt");
                }
            })
        }
        else {

        }
    }

    $scope.saveUserSet = function () {
        if ($scope.accessData.singleOrMultiply) {
            var users = [];
            var i = $scope.accessData.userGotAccess.length;
            while (i--) {
                users.push($scope.accessData.userGotAccess[i].Email)
            }
            pollBuilderService.saveUserSet(users);
        } else {
            $scope.parseMultiplyUsers();
            pollBuilderService.saveUserSet($scope.parseMultiplyUsers());
        }
    }


    $scope.openCustomDialog = function (event, func) {
        var object = {
            controller: 'dialogController',
            template: 'pollsavetype.tmpl.html',
            outerClose: true,
            escapeClose: true,
            event: event
        };
        modalService.showCustomDialog(object, { clearPollData: func });
    };
    $scope.validateCallback = function (err, data) {
        if (err) {
            modalService.showAlert(
                {
                    title: "Error",
                    textContent: err,
                    ariaLabel: "yourpolly.com / Confirm save",
                    event: event
                }, function () { });
        } else {
            //save after popup
            $scope.openCustomDialog(event, function (saved) {
                var data = recoveryService.getRecoveryPollData();
                data.saved = saved;
                if (data != null && data.saved) {
                    recoveryService.clearRecoveryPollData();
                    clearInterval(intr);
                }
            });
        }
    }
    $scope.savePoll = function (event) {
        if (pollBuilderService.pollData.PollType == 1) {
            pollBuilderService.validatePoll($scope.validateCallback, true);
        } else {
            pollBuilderService.validatePoll($scope.validateCallback, false);
        }
        //pollBuilderService.save(function () {
        //    $scope.saved = true;
        //   //$scope.openCustomDialog(event);
        //}, function (message) {
        //        if (!message) {
        //            message = "You can't save the project, check your data";
        //        }
        //        modalService.showAlert(
        //            {
        //                title: "Error",
        //                textContent: message,
        //                ariaLabel: "yourpolly.com / Confirm save",
        //                event: event
        //            }
        //        )
        //    }, function () { });
    }
    
    $scope.addNewField = function (email) {
        $scope.tmp = null;
        if (email != undefined && email != "") {
            $scope.tmp = false;

            if ($scope.accessData.userGotAccess.length > 0) {
                for (i = 0; i < $scope.accessData.userGotAccess.length; i++) {
                    if ($scope.accessData.userGotAccess[i].Email == email) {
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

                        $scope.accessData.userGotAccess.push(data.user);
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

        $scope.accessData.userGotAccess.splice(index, 1);
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

    
    $scope.showSettingsBlock = function () {
    	if ($scope.settings.showSettings)
    		$scope.settings.showSettings = false;
        else
    		$scope.settings.showSettings = true;
    }


}]);

