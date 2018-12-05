//This api will contain navigation logic and page load.
//It will also handle the question navigation if the page is having multiple questions.
var _Navigator = (function () {
    var packageType = "";//presenter/scorm/revel
    var isReviewMode = false;
    var _currentPageId = "";
    var _currentPageObject = {};
    var progressLevels = [40];
    var totalsimscore = 18;
    //var presentermode = false;
    var bookmarkpageid = "";
    var quizpageid = "p37";
    var _NData = {
        "p1": {
            pageId: "p1",
            prevPageId: "",
            nextPageId: "p2",
            dataurl: "p1.htm",
            isStartPage: true,
            isAnswered: true,


        },
        "p2": {
            pageId: "p2",
            prevPageId: "p1",
            nextPageId: "p3",
            dataurl: "p2.htm",
            hinturl: "hintp2.htm",
            hasActivity: true,
            isDND: false,
            accessText: "Google Chrome browser",


        },
        "p3": {
            pageId: "p3",
            prevPageId: "p2",
            nextPageId: "p4",
            dataurl: "p3.htm",
            hinturl: "hintp3.htm",
            hasActivity: true,
            isDND: true,
            accessText: "National Oceanic and Atmospheric Administration’s website",
        },
        "p4": {
            pageId: "p4",
            prevPageId: "p3",
            nextPageId: "p5",
            dataurl: "p4.htm",
            hinturl: "hintp4.htm",
            hasActivity: true,
            isDND: false,
            accessText: "Menu sub menu open",
        },
        "p5": {
            pageId: "p5",
            prevPageId: "p4",
            nextPageId: "p6",
            dataurl: "p5.htm",
            hinturl: "hintp5.htm",
            hasActivity: true,
            isDND: false,
            accessText: "Chrome settings window",

        },
        "p6": {
            pageId: "p6",
            prevPageId: "p5",
            nextPageId: "p7",
            dataurl: "p6.htm",
            hinturl: "hintp6.htm",
            hasActivity: true,
            accessText: "Chrome settings window",

        },
        "p7": {
            pageId: "p7",
            prevPageId: "p6",
            nextPageId: "p9",
            dataurl: "p7.htm",
            hinturl: "hintp7.htm",
            hasActivity: true,
            isDND: false,
            accessText: "Chrome settings window popup  startup pages window",

        },
        "p8": {
            pageId: "p8",
            prevPageId: "p7",
            nextPageId: "p9",
            dataurl: "p8.htm",
            hinturl: "hintp8.htm",
            hasActivity: true,
            accessText: "Chrome settings window popup  startup pages window",

        },
        "p9": {
            pageId: "p9",
            prevPageId: "p7",
            nextPageId: "p10",
            dataurl: "p9.htm",
            hinturl: "hintp9.htm",
            hasActivity: true,
            isDND: false,
            accessText: "National Oceanic and Atmospheric Administration’s website",

        },
        "p10": {
            pageId: "p10",
            prevPageId: "p9",
            nextPageId: "p11",
            dataurl: "p10.htm",
            hinturl: "hintp10.htm",
            hasActivity: true,
            isDND: false,
            accessText: "Menu sub menu",

        },
        "p11": {
            pageId: "p11",
            prevPageId: "p10",
            nextPageId: "p12",
            dataurl: "p11.htm",
            hinturl: "hintp11.htm",
            hasActivity: true,
            isDND: false,
            accessText: " Chrome settings window",

        },
        "p12": {
            pageId: "p12",
            prevPageId: "p11",
            nextPageId: "p13",
            dataurl: "p12.htm",
            hinturl: "hintp12.htm",
            hasActivity: true,
            isDND: false,
            accessText: "Search engine combo box expanded list google"

        },
        "p13": {
            pageId: "p13",
            prevPageId: "p12",
            nextPageId: "p14",
            dataurl: "p13.htm",
            hinturl: "hintp13.htm",
            hasActivity: true,
            accessText: "Chrome settings window"

        },
        "p14": {
            pageId: "p14",
            prevPageId: "p13",
            nextPageId: "p21",
            dataurl: "p14.htm",
            hinturl: "hintp14.htm",
            hasActivity: true,
            accessText: "political polls search result page"
        },
        "p15": {
            pageId: "p15",
            prevPageId: "p14",
            nextPageId: "p16",
            dataurl: "p15.htm",
            hinturl: "hintp15.htm",
            hasActivity: true,
            accessText: "Real News Poll Home page"
            //customNext :"p21"

        },
        "p16": {
            pageId: "p16",
            prevPageId: "p15",
            nextPageId: "p17",
            dataurl: "p16.htm",
            hinturl: "hintp16.htm",
            hasActivity: true,
            isAnswered: false,
            accessText: "Real News Poll About us page"

        },
        "p17": {
            pageId: "p17",
            prevPageId: "p14",
            nextPageId: "p18",
            dataurl: "p17.htm",
            hinturl: "hintp17.htm",
            hasActivity: true,
            customReviewPrev: "p16",
            accessText: "A1 Politics Poll Home page"
        },
        "p18": {
            pageId: "p18",
            prevPageId: "p17",
            nextPageId: "p19",
            dataurl: "p18.htm",
            hinturl: "hintp18.htm",
            hasActivity: true,
            accessText: "A1 Politics Poll About us page"


        },
        "p19": {
            pageId: "p19",
            prevPageId: "p14",
            nextPageId: "p20",
            dataurl: "p19.htm",
            hinturl: "hintp19.htm",
            hasActivity: true,
            customReviewPrev: "p18",
            accessText: "Denver Pilot Opinion Home page"

        },
        "p20": {
            pageId: "p20",
            prevPageId: "p19",
            nextPageId: "p21",
            dataurl: "p20.htm",
            hinturl: "hintp20.htm",
            hasActivity: true,
            accessText: "Denver Pilot Opinion About Us page"


        },
        "p21": {
            pageId: "p21",
            prevPageId: "p20",
            nextPageId: "p24",
            dataurl: "p21.htm",
            hinturl: "hintp21.htm",
            hasActivity: true,
            accessText: "political polls search result page"



        },
        "p22": {
            pageId: "p22",
            prevPageId: "p21",
            nextPageId: "",
            dataurl: "p22.htm",
            hinturl: "hintp22.htm",
            hasActivity: true,
            iscusNext: false,
            customNext: "p21",
            accessText: "Real News Poll Home page"


        },
        "p23": {
            pageId: "p23",
            prevPageId: "p22",
            nextPageId: "p22",
            dataurl: "p23.htm",
            hinturl: "hintp23.htm",
            hasActivity: true,
            accessText: " Real News Poll About us page"


        },
        "p24": {
            pageId: "p24",
            prevPageId: "p21",
            nextPageId: "p25",
            dataurl: "p24.htm",
            hinturl: "hintp24.htm",
            hasActivity: true,
            accessText: " A1 Politics Poll Home page"


        },
        "p25": {
            pageId: "p25",
            prevPageId: "p24",
            nextPageId: "p29",
            dataurl: "p25.htm",
            hinturl: "hintp25.htm",
            hasActivity: true,
            accessText: "Bookmark Dialog  Name http://www.a1.com"


        },
        "p26": {
            pageId: "p26",
            prevPageId: "p25",
            nextPageId: "p25",
            dataurl: "p26.htm",
            hinturl: "hintp26.htm",
            hasActivity: true,
            accessText: "A1 Politics Poll About Us page"

        },
        "p27": {
            pageId: "p27",
            prevPageId: "p21",
            nextPageId: "",
            dataurl: "p27.htm",
            hinturl: "hintp27.htm",
            hasActivity: true,
            iscusNext: false,
            customNext: "p21",
            accessText: "Denver Pilot Opinion Home page"


        },
        "p28": {
            pageId: "p28",
            prevPageId: "p27",
            nextPageId: "p27",
            dataurl: "p28.htm",
            hinturl: "hintp28.htm",
            hasActivity: true,
            accessText: "Denver Pilot Opinion About Us page"


        },
        "p29": {
            pageId: "p29",
            prevPageId: "p25",
            nextPageId: "p30",
            dataurl: "p29.htm",
            hinturl: "hintp29.htm",
            hasActivity: true,
            accessText: " A1 Politics Poll Home page"


        },
        "p30": {
            pageId: "p30",
            prevPageId: "p29",
            nextPageId: "p31",
            dataurl: "p30.htm",
            hinturl: "hintp30.htm",
            hasActivity: true,
            accessText: "Menu sub menu"
        },
        "p31": {
            pageId: "p31",
            prevPageId: "p30",
            nextPageId: "p32",
            dataurl: "p31.htm",
            hinturl: "hintp31.htm",
            hasActivity: true,
            accessText: "Chrome settings window"
        },
        "p32": {
            pageId: "p32",
            prevPageId: "p31",
            nextPageId: "p33",
            dataurl: "p32.htm",
            hinturl: "hintp32.htm",
            hasActivity: true,
            accessText: "Search engine combo box expanded list bing"
        },
        "p33": {
            pageId: "p33",
            prevPageId: "p32",
            nextPageId: "p34",
            dataurl: "p33.htm",
            hinturl: "hintp33.htm",
            hasActivity: true,
            accessText: " Chrome settings window"
        },
        "p34": {
            pageId: "p34",
            prevPageId: "p33",
            nextPageId: "p35",
            dataurl: "p34.htm",
            hinturl: "hintp34.htm",
            hasActivity: true,
            accessText: "political polls search result page"
        },
        "p35": {
            pageId: "p35",
            prevPageId: "p34",
            nextPageId: "p36",
            dataurl: "p35.htm",
            hinturl: "hintp35.htm",
            hasActivity: true,
            accessText: "political polls search result page"
        },
        "p36": {
            pageId: "p36",
            prevPageId: "p35",
            nextPageId: "p37",
            dataurl: "p36.htm",
            hinturl: "hintp36.htm",
            hasActivity: true,
            accessText: "political polls AND Connecticut search result page"
        },
        "p37": {
            pageId: "p37",
            prevPageId: "p36",
            nextPageId: "",
            dataurl: "p37.htm",
            hasActivity: true,
            isLastPage: true,
            isAssessment: true,
            hideHint: true,
        }

    }
    var _StateData = {}

    function OnPageLoad() {

        $(".hintcontainer").hide()
        $(".hintlink").removeClass("expanded");
        $(".hintlink").attr("aria-expanded", "false")
        $("#header-title h1").show()
        $("#header-title").removeClass("startpage");
        if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
            $("#header-title h1").hide()
            $("#header-title").addClass("startpage");
        }
        _ModuleCommon.AppendCss();
        if (_currentPageObject.accessText != undefined) {
            $(".activityimg").attr("alt", _currentPageObject.accessText);
        }
        _ModuleCommon.OnPageLoad();
        if (_Navigator.IsPresenterMode()) {
            $("#linknext").k_enable();
            $(".start-btn").k_disable();
        }
        if (_Navigator.IsReviewMode()) {
            $("#linknext").k_enable();
            $(".start-btn").k_disable();
        }
    }
    return {
        Get: function () {
            return _NData;
        },
        Start: function () {
            this.LoadPage("p1");
            if (this.IsPresenterMode()) {
                _ModuleCommon.AppendFooter();
            }
            if(this.IsReviewMode()){
                _ModuleCommon.AppendScormReviewFooter();
                _Assessment.SetCurrentQuestionIndex(0);
            }
            
        },
        LoadPage: function (pageId, jsonObj) {
            $(".hintcontainer").hide()
            $(".header-content-dock").css({ "visibility": "hidden" });
            if (_Navigator.IsRevel() && _currentPageId != undefined && _currentPageId != "") {
                LifeCycleEvents.OnUnloadFromPlayer()
            }
            bookmarkpageid = pageId;
            if (jsonObj == undefined) {
                jsonObj = {};
            }
            _currentPageId = pageId;

            _currentPageObject = _NData[_currentPageId]
            if (_currentPageId == "p15" || _currentPageId == "p17" || _currentPageId == "p19" || _currentPageId == "p22" || _currentPageId == "p27") {
                _currentPageObject.isAnswered = false;

            }
            if (_currentPageId == "p25" || _ModuleCommon.checkP25visited()) {
                _NData["p21"].isAnswered = true;
                _NData["p23"].isAnswered = true;
                _NData["p28"].isAnswered = true;
                _NData["p26"].isAnswered = true;
                _NData["p22"].isAnswered = true;
                _NData["p27"].isAnswered = true;
            }
            if (_ModuleCommon.checkalllinksvisited()) {
                _NData["p14"].isAnswered = true;

                if (_ModuleCommon.checkP19visited()) {
                    _NData["p19"].isAnswered = true;
                    _NData["p15"].isAnswered = true;
                    _NData["p16"].isAnswered = true;
                    _NData["p17"].isAnswered = true;
                    _NData["p18"].isAnswered = true;
                    _NData["p20"].isAnswered = true;
                }
            }

            // if (_currentPageId == "p29" || _ModuleCommon.checkP25visited()) {

            //     _NData["p23"].isAnswered = true;           
            //     _NData["p28"].isAnswered = true;
            //     _NData["p26"].isAnswered = true;
            // }

            // if (_ModuleCommon.checkP27visited() ||_ModuleCommon.checkP25visited() ) {
            //     _NData["p22"].isAnswered = true;
            //     _NData["p27"].isAnswered = true;
            // }
            this.UpdateProgressBar();
            $("#header-progress").show();
            $("#header-title").show();
            $("footer").show();

            $('html,body').css({ scrollTop: 0 })
            if (_currentPageObject.isStartPage != undefined && _currentPageObject.isStartPage) {
                $("#linkprevious").k_disable();
                $("#linknext").k_enable();
                $("footer").hide();
                $("#header-progress").hide();
                if(this.IsReviewMode()){
                    _ModuleCommon.AppendScormReviewFooter();
                    _Assessment.SetCurrentQuestionIndex(0)
                }
                if (this.IsPresenterMode())
                    _ModuleCommon.AppendFooter();

            }
            if (_currentPageObject.hasActivity != undefined && _currentPageObject.hasActivity && !this.IsAnswered()) {
                $("#linknext").k_disable();
            }
            if (this.IsAnswered()) {
                $("#linknext").k_enable();

            }
            if (_currentPageObject.isLastPage != undefined && _currentPageObject.isLastPage) {
                $("#linknext").k_disable();
            }


            _currentPageObject.isVisited = true;

            var pageUrl = _Settings.dataRoot + _currentPageObject.dataurl + _Caching.GetUrlExtension();
            if (_currentPageObject.pageId == "p2") { // temporary fix
                $("#progressdiv").css("margin-left", "-20px")
            }
            else {
                $("#progressdiv").css("margin-left", "-15px")
            }
            if (_currentPageObject.isStartPage) {
                $(".main-content").load(pageUrl, function () {
                    OnPageLoad();
                    //setReader("header1");
                    $("#header1").focus();
                });
            } else {
                $(".main-content").fadeTo(250, 0.25, function () {
                    $(".main-content").html("");
                    $(".main-content").load(pageUrl, function () {
                        $(this).fadeTo(600, 1)
                        if ($(".activityimg").length > 0) {
                            $('.activityimg').load(function () {
                                OnPageLoad();
                                if (_Navigator.IsPresenterMode()) {
                                    _ModuleCommon.PresenterMode();
                                }
                                if (_currentPageObject.pageId == "p2") {
                                    $("#titleheader").focus();
                                }

                                else if (!_Navigator.IsAnswered() && _PData[_currentPageId].EmbedSettings != undefined
                                ) {
                                    $("input[type='text']").focus()
                                }
                               
                               else if ((isiPhone || isAndroid) && _NData[_currentPageId].isLoaded != undefined && _NData[_currentPageId].isLoaded == true) {//iphone android on previous focus is set to header
                                    $("h2").focus();
                                }
                                else {
                                   if(isChrome)
                                   {
                                    $("h2").focus();
                                   }
                                   else
                                   {
                                    $("#progressdiv").focus();
                                   }
                                  
                                }
                                _NData[_currentPageId].isLoaded = true;
                                event.preventDefault();

                            });
                        }
                        else {
                            OnPageLoad();
                            _NData[_currentPageId].isLoaded = true;
                        }

                        if (_currentPageId == quizpageid)//  change to assessment id
                        {
                            _Assessment.ShowQuestion();
                        }
                        $("#hintdiv").show();
                        if (_currentPageObject.hideHint != undefined && _currentPageObject.hideHint) {
                            $("#hintdiv").hide();
                            $(".hintcontainer").hide();
                        }
                        if (_currentPageObject.hinturl != undefined) {
                            $(".hintlink").k_enable();
                            $(".hintcontent").load("pagedata/hintdata/" + _currentPageObject.hinturl, function () { });
                        }
                        else {
                            $(".hintlink").k_disable();
                        }

                        if ((/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))) {
                            $('#footer-navigation').css('display', 'table');
                        }

                        _Navigator.GetBookmarkData();
                    });
                })
            }

            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnLoadFromPlayer()
            }

        },

        Prev: function () {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Previous link click.")
            }
            if (_currentPageObject.pageId == quizpageid && typeof (currentQuestionIndex) != 'undefined' && currentQuestionIndex > 0) {
                $("#ReviewIns").hide();
                $(".intro-content-question").show();
                $("#Questioninfo").show();
                currentQuestionIndex = currentQuestionIndex - 1;
                $("#Summary").empty();
                $("#Summary").hide();
                _Assessment.ShowQuestion();
            }
            else if (_currentPageObject.customReviewPrev != undefined && _ModuleCommon.checkP19visited()) {

                this.LoadPage(_currentPageObject.customReviewPrev);
            }
            else {
                this.LoadPage(_currentPageObject.prevPageId);
            }

        },
        Next: function () {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Next link click.")
            }
            $("#linkprevious").k_enable();
            if (_currentPageObject.customNext != undefined && !_currentPageObject.customNext.isComplete) {
                var custFunction = new Function(_currentPageObject.customNext.jsFunction);
                custFunction();
            }
            if (_currentPageObject.pageId == quizpageid) {
                {

                    if (typeof (currentQuestionIndex) != 'undefined' && typeof (gRecordData.Questions) != 'undefined' && (currentQuestionIndex + 1) < gRecordData.Questions.length) {
                        currentQuestionIndex = currentQuestionIndex + 1
                        $("#Questioninfo").show();
                        _Assessment.ShowQuestion()
                        if (gRecordData.Status != "Completed" && !this.IsPresenterMode()) {
                            $("#linknext").k_disable();
                            $("#linkprevious").k_disable();
                        }

                    }

                    else if (typeof (currentQuestionIndex) != 'undefined' && typeof (gRecordData.Questions) != 'undefined' && (currentQuestionIndex + 1) == gRecordData.Questions.length) {
                        //this.UpdateProgressBar();
                        // Show review instruction

                        $(".intro-content-question").hide();
                        $(".questionwrapper").hide();
                        currentQuestionIndex = currentQuestionIndex + 1;
                        $("#Summary").show();
                        $("#Questioninfo").hide();
                        $("#Summary").load("pagedata/Summary.htm", function () {
                            _Assessment.ShowSummary()
                            $("#linkprevious").k_enable();

                        })
                        $("#climate-deal").css("margin-left", "23%");
                        $("#linknext").k_disable();


                    }
                }
            }
            else {

                this.LoadPage(_currentPageObject.nextPageId);

            }
        },
        GetProgressData: function () {
            var visitpage = 0;
            for (var i in _NData) {
                if (_NData[i].isAnswered != undefined && (_NData[i].isAnswered == true)) {
                    visitpage++;
                }
            }
            visitpage += this.GetAnswerCount();
            return visitpage;
        },
        GetAnswerCount: function () {
            var cnt = (gRecordData.Questions.filter(function (item) {
                return item.IsAnswered;
            }).length)
            cnt += gRecordData.Status == "Completed" ? 1 : 0;
            return cnt;
        },
        UpdateProgressBar: function () {
            var progData = this.GetProgressData();
            var lprog_pecent = (progData * 100 / progressLevels[0]).toFixed(0);
            $(".progressdiv").text("Progress: " + lprog_pecent + "%");
            $(".progressFg").css("width", lprog_pecent + "%");


        },
        GetCurrentPage: function () {
            return _currentPageObject;
        },
        CompletePage: function (extendedJson) {
            _currentPageObject.IsComplete = true;
            _currentPageObject = $.extend(true, _currentPageObject, extendedJson)
            _StateData[_currentPageObject.pageId] = $.extend(true, {}, _currentPageObject);
        },
        GetTotalScore: function () {
            var ObtainPoint = 0;

            for (var i in _NData) {
                if (_NData[i].points > 0) {
                    ObtainPoint += _NData[i].points
                }
            }
            var score = (ObtainPoint / totalsimscore) * 100;
            return score.toFixed(0);
        },
        UpdateScore: function () {
            var percScore = this.GetTotalScore()
            $("#scorediv").html("Score: " + percScore + "%");
        },
        SetPageScore: function (points) {
            if (!_currentPageObject.isAnswered) {
                _NData[_currentPageId].points = points;
                this.UpdateScore();
            }
        },
        IsReviewMode: function(){
            return isReviewMode;
        },
        SetIsReviewMode: function(isReviewModeStatus){
            isReviewMode = isReviewModeStatus;
        },
        SetPageStatus: function (isAnswered) {
            if (isAnswered) {
                _NData[_currentPageObject.pageId].isAnswered = true;
                this.UpdateProgressBar();
            }
        },
        IsAnswered: function () {
            if (_currentPageObject.isAnswered != undefined && _currentPageObject.isAnswered)
                return true;

            return false;

        },

        IsLoaded: function () {
            if (_currentPageObject.isLoaded != undefined && _currentPageObject.isLoaded)
                return true;

            return false;

        },
        CheckIfPageLoaded: function (pageid) {
            return _NData[pageid].isLoaded != undefined && _NData[pageid].isLoaded ? true : false;
        },
        SetPresenterMode: function (val) {
            packageType = val;
        },
        IsPresenterMode: function () {
            if (packageType == "presenter") {
                return true;
            }
            else {
                return false;
            }
        },
        SetVideoStatus: function () {
            _NData[_currentPageId].played = true;
        },
        SetBookmarkData: function () {
            var bookmarkdata;
            if (this.IsScorm()) {
                bookmarkdata = _ScormUtility.GetSuspendData();
            }
            else if (this.IsRevel()) {
                bookmarkdata = JSON.stringify(k_Revel.get_StateData())
            }

            if (bookmarkdata != undefined && bookmarkdata != "") {
                bookmarkdata = JSON.parse(bookmarkdata);
                bookmarkpageid = bookmarkdata.BMPageId;
                this.SetNavigatorBMData(bookmarkdata.VisistedPages)
                progressLevels = bookmarkdata.ProgressLevels;
                _ModuleCommon.SetReviewData(bookmarkdata.ReviewData)
                _ModuleCommon.SetPagesDataArray(bookmarkdata.PagesDataArray)
                _Assessment.Setbookmarkdata(bookmarkdata.AssessmentData)
            }
        },
        GetBookmarkData: function () {
            if (!this.IsScorm() && !this.IsRevel() && !this.IsReviewMode())
                return;
            var bookmarkobj = {}
            bookmarkobj.BMPageId = bookmarkpageid;
            bookmarkobj.VisistedPages = this.GetNavigatorBMData();
            bookmarkobj.ProgressLevels = progressLevels;
            bookmarkobj.ReviewData = _ModuleCommon.GetReviewData();
            bookmarkobj.AssessmentData = _Assessment.Getbookmarkdata();
            bookmarkobj.PagesDataArray = _ModuleCommon.GetPagesDataArray();
            if (this.IsRevel()) {
                if (k_Revel.get_LaunchData().mode == LaunchModes.do) {
                    var suspend_data = JSON.stringify(bookmarkobj);
                    k_Revel.set_StateData(JSON.parse(suspend_data))
                    k_Revel.PostData(gRecordData.Score, gRecordData.AssessmentScore);
                }
            }
            else if (this.IsScorm()) {
                _ScormUtility.SetSuspendData(JSON.stringify(bookmarkobj))
            }

        },
        GetNavigatorBMData: function () {
            var gVisistedPages = [];
            for (var i in _NData) {
                if (_NData[i].isAnswered) {
                    gVisistedPages.push(_NData[i].pageId)
                }
            }
            return gVisistedPages;
        },
        SetNavigatorBMData: function (gVisistedPages) {

            for (var i = 0; i < gVisistedPages.length; i++) {
                _NData[gVisistedPages[i]].isAnswered = true;
            }
        },

        SetBookMarkPage: function () {
          if(this.IsReviewMode())
           return;
            if (this.IsScorm()  ) {
                _ScormUtility.SetBookMark(bookmarkpageid);
            }
            else if (this.IsRevel()) {
                this.GetBookmarkData();
            }
        },
        GetBookMarkPage: function () {
            return bookmarkpageid;
        },
        Initialize: function () {
            if (packageType == "scorm") {
                _ScormUtility.Init();
                _Navigator.SetBookmarkData();
                //bookmarkpageid = _ScormUtility.GetBookMark();
                if(_ScormUtility.IsScormReviewMode()){
                    _Navigator.SetIsReviewMode(true);
                }
                this.GotoBookmarkPage();
            }
            else if (packageType == "revel") {
                g_tempIntv = setInterval(function () {
                    if ((typeof piSession != 'undefined' && typeof piSession.currentToken() != 'undefined' && piSession.currentToken() != null)) {
                        clearInterval(g_tempIntv);
                        g_tempIntv = null;
                        //The rest of the code will go here.
                        LifeCycleEvents.InitParams();
                        LifeCycleEvents.OnLoad();
                        if (!k_Revel.isLaunchInitialize()) {
                            k_Revel.InitLaunch()
                            var suspend_data = JSON.stringify(k_Revel.get_StateData());
                            if (suspend_data != "" && suspend_data != "{}") {
                                var isTrue = this.SetBookmarkData();
                                if (isTrue && k_Revel.get_LaunchData().mode == "do") {
                                    this.GotoBookmarkPage();
                                } else {
                                    k_Revel.set_StateData(JSON.parse(suspend_data))
                                }
                            }
                        }
                        if (k_Revel.get_LaunchData().mode == "review") {
                            var suspend_data = JSON.stringify(k_Revel.get_StateData());
                            if (suspend_data != "" && suspend_data != "{}") {
                                this.SetBookmarkData(suspend_data);
                                isReview = true;
                            }
                        }
                    }
                }, 100);

            }
            else {
                _Navigator.Start();
            }
        },
        GotoBookmarkPage: function () {

            if (bookmarkpageid != undefined && bookmarkpageid != "") {
                _Navigator.LoadPage(bookmarkpageid)
            }
            else {
                _Navigator.Start();
            }
        },
        IsScorm: function () {
            if (packageType == "scorm")
                return true;

            return false;

        },
        IsRevel: function () {
            if (packageType == "revel")
                return true;
            return false;
        },
        GetPackageType: function () {
            return packageType;
        },
        GetQuizPageId: function () {
            return quizpageid;
        }
    };
})();



function setReader(idToStartReading) {
    $('#hiddenAnchor').attr("href", "#" + idToStartReading)
    $('#hiddenAnchor')[0].click()
}


function removeCSS(cssFileToRemove) {
    for (var w = 0; w < document.styleSheets.length; w++) {
        if (document.styleSheets[w].href.indexOf(cssFileToRemove) != -1) {
            document.styleSheets[w].disabled = true;
        }
    }
}
function addCSS(cssFileToAdd) {
    var isCSSAlreadyAdded = false;
    for (var w = 0; w < document.styleSheets.length; w++) {
        if (document.styleSheets[w].href.indexOf(cssFileToAdd) != -1) {
            isCSSAlreadyAdded = false;
        }
    }
    console.log(isCSSAlreadyAdded + " --")
    if (!isCSSAlreadyAdded) {
        var newlink = document.createElement("link");
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("type", "text/css");
        newlink.setAttribute("href", cssFileToAdd);
        document.getElementsByTagName("head").item(0).appendChild(newlink);
    }
}

function changeCSS(cssFile, cssLinkIndex) {

    var oldlink = document.getElementsByTagName("link").item(cssLinkIndex);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", cssFile);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}
