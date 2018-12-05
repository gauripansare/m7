gRecordData = {
    Status: "NotStarted",
    AssessmentScore: "4",
    VisitedNumberOfPages: "0",
    LastVisitedPage: "", // UserSelectedOptionId will be used to jump to the unattempted question
    RecordTitle: "How Does Barbara Corcoran Pick Her Investments on Shark Tank?",
    LandingPageURL: "record2_landing.htm",
    QuestionSequence: "Numbers", // this can be used later if different display style is required
    OptionSequence: "LowerAlphabets", // this can be used later if different display style is required
    RandomizeQuestions: true,
    RandomizeOptions: true,
    Questions: [
                    {
                        QuestionId: "1",
                        QuestionText: "Which of the following is a way to set the webpage you are viewing as your only start page in Chrome?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Click the Favorites arrow and click Internet Options to set your home page.",
                                         "IsCorrect": false,

                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Click the Home button, click Add or Change Home Page, click Use this webpage as your only home page, and click Yes.",
                                         "IsCorrect": false
                                         
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "On the browser’s toolbar, click the Customize and control Chrome button. Click Settings. Under On startup, click Open a specific page or set of pages. Click Set pages. Click Use current page, and then click OK. ",
                                         "IsCorrect": true,
                                         score: 2
                                     }

                        ],
                        IsAnswered:false,
                        CorrectFeedback: "That’s right.",
                        IncorrectFeedback: "​That’s not right. Click the Customize and control Chrome button. Click Settings. Under On startup, click Open a specific page or set of pages. Click Set pages. Click Use current page, and then click OK.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "2",
                        QuestionText: "How would you begin to set your default search engine in Chrome?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "On the Settings tab, under Search, click the search arrow.",
                                         "IsCorrect": true,
                                         score: 2

                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Click the Find arrow and click Find More Providers.",
                                         "IsCorrect": false,
                                        

                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Click the Tools arrow and click Add Search Provider.",
                                         "IsCorrect": false,

                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "That’s not right. On the Settings tab, under Search, click the search arrow.",
                        CorrectFeedback: "That’s right.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "3",
                        QuestionText: "Which tool would you use in Chrome to return to the page you just viewed?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Refresh",
                                         "IsCorrect": false
                                        
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "Press ENTER",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "The Back Button",
                                         "IsCorrect": true,
                                         score: 2
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​That’s not right. You would click the Back button. ​",
                        CorrectFeedback: "That’s right.​",
                        "UserSelectedOptionId": ""

                    },
                    {
                        QuestionId: "4",
                        QuestionText: "How do you add a website to the Bookmarks?",
                        Options: [
                                     {
                                         "OptionId": "1",
                                         "OptionText": "Right-click the address bar and click Pin to Favorites.",
                                         "IsCorrect": false
                                     },
                                     {
                                         "OptionId": "2",
                                         "OptionText": "On the Chrome address bar, click the star to Bookmark this page. Click Done.",
                                         "IsCorrect": true,
                                          score: 2
                                     },
                                     {
                                         "OptionId": "3",
                                         "OptionText": "Click the Tools menu and then click Add site to Apps.",
                                         "IsCorrect": false
                                        
                                     }

                        ],
                        IsAnswered:false,
                        IncorrectFeedback: "​That’s not right. On the Chrome address bar, click the star to Bookmark this page. Click Done.",
                        CorrectFeedback: "That’s right.​",
                        "UserSelectedOptionId": ""

                    }

    ]
}