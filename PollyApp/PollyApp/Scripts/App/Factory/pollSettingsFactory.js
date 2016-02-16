(function () {
    PollyApp.factory("pollSettingsFactory", function () {
        return {
            PollType: [
             {
                 logicalName: "Single",
                 value: 1,
                 label: "Single"
             },
               {
                   logicalName: "Multiply",
                   value: 2,
                   label: "Multiply"
               },
               {
                   logicalName: "quiz",
                   value: 3,
                   label: "Quiz"
               }
            ],

            PollShare: [
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
            PollAccess: [
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

            ]

        };
    });
})();