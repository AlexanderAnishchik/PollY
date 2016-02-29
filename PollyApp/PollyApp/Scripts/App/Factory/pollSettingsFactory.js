(function () {
    PollyApp.factory("pollSettingsFactory", function () {
        return {
            PollType: [
             {
                 logicalName: "Single",
                 value: 1,
                 label: "Single",
                 path: 'Content/partial/type/Single.html'
             },
               {
                   logicalName: "Multiply",
                   value: 2,
                   label: "Multiply",
                   path: 'Content/partial/type/Multiply.html'
               },
               {
                   logicalName: "quiz",
                   value: 3,
                   label: "Quiz",
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
            ]

        };
    });
})();