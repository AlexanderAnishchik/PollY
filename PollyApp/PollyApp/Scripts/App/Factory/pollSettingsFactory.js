(function () {
    PollyApp.factory("pollSettingsFactory", function () {
        return {
            PollType: [
             {
                 logicalName: "Single",
                 value: 1,
                 label: "Single",
                 imagePath: '/Content/images/list.png',
                 path: 'Content/partial/type/Single.html'
             },
               {
                   logicalName: "Multiply",
                   value: 2,
                   label: "Multiply",
                   imagePath: '/Content/images/layout22.png',
                   path: 'Content/partial/type/Multiply.html'
               },
               {
                   logicalName: "quiz",
                   value: 3,
                   label: "Quiz",
                   imagePath: '/Content/images/chronometer.png',
                   path: 'Content/partial/type/Quiz.html'
               }
            ],

            PollShare: [
              {
                  logicalName: "Public",
                  value: 1,
                  label: "Public"
              },
              {
                  logicalName: "Private",
                  value: 2,
                  label: "Private"
              }
            ],
            PollAccess: [
                 {
                     logicalName: "FreeLink",
                     value: 1,
                     label: "Free Link"
                 },
               {
                   logicalName: "UserSet",
                   value: 2,
                   label: "User Set"
               },
               {
                   logicalName: "CodeSet",
                   value: 3,
                   label: "Code Set"
               }
            ],
            PollSteps: [
                {
                    step: 'Content/partial/ChooseType.html',
                    isDone: false,
                    title: "Choose type"
                },
                {
                    step: 'Content/partial/ChooseAccess.html',
                    isDone: false,
                    title: "Choose access"
                },
                {
                    step: 'Content/partial/ChooseShare.html',
                    isDone: false,
                    title: "Choose share"
                },
                {
                    step: 'Content/partial/constructor.html',
                    isDone: false,
                    title: "Builder"
                },
                
            ]

        };
    });
})();