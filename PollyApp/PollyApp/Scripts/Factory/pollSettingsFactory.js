(function () {
    PollyApp.factory("pollSettingsFactory", function () {
        debugger;
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
               }
            ],

            PollShare: [
               {
                   logicalName: "FreeLink",
                   value: 1,
                   label: "Poll Share"
               },
               {
                   logicalName: "PasswordLink",
                   value: 2,
                   label: "Password Link"
               },
               {
                   logicalName: "CommunityLink",
                   value: 3,
                   label: "Community Link"
               }
            ],
            PollAccess: [
              {
                  logicalName: "Public",
                  value: 1,
                  label: "Public"
              },
              {
                  logicalName: "Anonymous",
                  value: 2,
                  label: "Anonymous"
              },
               {
                   logicalName: "Someone",
                   value: 3,
                   label: "Someone People"
               }


            ]

        };
    });
})();