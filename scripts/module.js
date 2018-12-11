var userAgentCustom = window.navigator.userAgent;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1;
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var CurClientWidth = window.innerWidth;
var Macbrowser = navigator.userAgent.indexOf('Chrome');
var Macos = navigator.userAgent.indexOf('Mac');
var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
var ipad = !!navigator.platform && /iPad|iPod/.test(navigator.platform);
var isiPhone = !!navigator.platform && /iPhone/.test(navigator.platform);
var isIE11version = !!navigator.userAgent.match(/Trident.*rv\:11\./);
var isSafari = navigator.userAgent.toLowerCase().indexOf('safari/') != -1;
var isIEEdge = /Edge/.test(navigator.userAgent);
var isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
var isFirefox = /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent);
var isIpad = userAgentCustom.match(/iPad/i)
var isIphone = navigator.userAgent.indexOf('iPhone') > -1
var delay = 1000;
if (iOS) {
    delay = 3000;
}
jQuery.fn.extend({
    k_enable: function () {
        return this.removeClass('disabled').attr("aria-disabled", "false").removeAttr("disabled");
    },
    k_disable: function () {
        this.addClass('disabled').attr("aria-disabled", "true").attr("disabled", "disabled");
        if (isIE11version) {
            if ($(this).attr("type") != undefined && $(this).attr("type") == "radio")
                return;
            $(this).removeAttr("disabled")
        }
        return;
    },
    k_IsDisabled: function () {
        if (this.hasClass('disabled')) { return true; } else { return false; }
    }
});
var _ModuleCommon = (function () {
    var reviewData = [];
    var pagesDataArray = [];
    return {
        EnableNext: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (currentPageData.customNext != undefined) {
                var custFunction = new Function(currentPageData.customNext.jsFunction);
                custFunction();

                currentPageData.iscusNext = true;

                $("#linknext").k_enable();
            }
            else {
                $("#linknext").k_enable();
            }
        },
        GetPageReviewData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        return reviewData[i];
                    }
                }
            }

        },
        GetReviewData: function () {
            return reviewData;
        },
        SetReviewData: function (rData) {
            reviewData = rData;
        },
        GetPagesDataArray: function () {
            return pagesDataArray;
        },
        SetPagesDataArray: function (pData) {
            pagesDataArray = pData;
        },
        GetPageDetailData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            return pageData;
        },
        ShowFeedbackReviewMode: function () {
            var pageData = this.GetPageDetailData();
            var currentPageData = _Navigator.GetCurrentPage();
            var fdkurl = "";
            if (pageData != undefined) {
                if (pageData.EmbedSettings != undefined) {
                    fdkurl = pageData.EmbedSettings.feedbackurl;
                }
                else {
                    if (pageData.ImageHotSpots != undefined) {
                        for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                            fdkurl = pageData.ImageHotSpots.Hotspots[i].feedbackurl;

                        }
                    }
                }
                if (fdkurl == undefined && currentPageData.pageId == "p14") {
                    fdkurl = _Settings.dataRoot + "feedbackdata/" + "feedbackp25.htm";
                }
                else if (currentPageData.pageId == "p7") {

                    url = "feedbackp3.htm";
                    fdkurl = _Settings.dataRoot + "feedbackdata/" + url;
                }
                else {
                    fdkurl = _Settings.dataRoot + "feedbackdata/" + fdkurl;
                }
                $("#div_feedback").show();
                $("#div_feedback").css("display", "inline-block");
                if (fdkurl.indexOf('feedbackp25.htm') > -1 && !(this.checkP19visited())) {
                    $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                      
                       $("#div_feedback .div_fdkcontent p:first").attr("tabindex","-1")
                        if (iOS) {
                            $(".hintcontainer .hintcontent").find("p:first").attr("role", "text")
                        }
                        window.scrollTo(0,document.body.scrollHeight)
                        $("#div_feedback p:first").focus();
                    });
                }
                else {
                    $("#div_feedback .div_fdkcontent").load(fdkurl, function () {
                        //this.SetFeedbackTop()
                        $('html,body').animate({ scrollTop: 0 }, 0, function () { });
                    });
                }
            }
        },


        DisplayInstructorReviewMode: function () {
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {

                this.InstructorReviewModeForTextEntry();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    for (var i = 0; i < reviewData.Positions.length; i++) {
                        var posObj = reviewData.Positions[i];
                        var appendImage = $(".activityimg");
                        var ht = appendImage.width();
                        var ht1 = appendImage.height();
                        if (ht < 796) {
                            ht = 796;
                        }
                        if (ht1 < 597) {
                            ht1 = 597;
                        }
                        while ((posObj.posX + 40) > ht) {
                            posObj.posX = posObj.posX - 2;
                        }
                        while ((posObj.posY + 40) > ht1) {
                            posObj.posY = posObj.posY - 2;
                        }
                        if (reviewData.pageId == "p3") {
                            posObj.posX = "771.5";
                            posObj.posY = "32"
                            if (posObj.isCorrect) {
                                var _div = "<div class='reviewDiv Correct' style='z-index:5;width:26px;height:26px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:26px;height:26px;' /></div>";
                                appendImage.parent().append(_div);


                            } else {
                                var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:26px;height:26px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:26px;height:26px;' /></div>";

                                appendImage.parent().append(_divI);
                            }

                        }
                        else {
                            if (posObj.isCorrect) {
                                var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                                appendImage.parent().append(_div);


                            } else {
                                var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                                appendImage.parent().append(_divI);
                            }
                        }
                    }
                }
            }
            this.ShowFeedbackReviewMode();

            $(".divHotSpot").addClass("disabled");
            $(".divHotSpot").attr("aria-disabled", "true");
            $(".divHotSpot").attr("disabled", "true");

        },
        InstructorReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {
                var p = "";
                for (i = 0; i < reviewData.textEntry.length; i++) {
                    if (reviewData.textEntry[i] != undefined && reviewData.textEntry[i] != "") {
                        if (reviewData.pageId == "p35") {
                            var tEntry = reviewData.textEntry[i].trim();
                        }
                        else {
                            var tEntry = reviewData.textEntry[i].trim().toLowerCase();
                        }

                        if (pageDetailData.EmbedSettings.validatearray.indexOf(tEntry) >= 0) {
                            if (reviewData.isCorrect && i == 0) {
                                $(".textentryreview1").html("<span class='greenspan' style='line-height:1em;'>" + reviewData.textEntry[i] + "</span>")
                                $(".textentryaccessibility").text("Correct url entered " + reviewData.textEntry[i])
                                $(".textentryreview1").attr("aria-hidden", "true")
                            }
                            else {
                                if (reviewData.pageId == "p35") {
                                    $(".textentryreview4").html("<span class='greenspan'  style='padding-left:10px;line-height:1em; '>" + reviewData.textEntry[i] + "</span>");
                                    $(".textentryreview4").show();

                                    $(".textentryreview4").attr("aria-hidden", "true")
                                }
                                else {
                                    $(".textentryreview2").html("<span class='greenspan'  style='padding-left:20px;line-height:1em; '>" + reviewData.textEntry[i] + "</span>");
                                    $(".textentryreview2").show();

                                    $(".textentryreview2").attr("aria-hidden", "true")
                                }
                            }
                        }
                        else {
                            $(".textentryreview1").html("<span class='redspan' style='line-height:1em;'>" + reviewData.textEntry[i] + "</span>")
                            $(".textentryreview1").attr("aria-hidden", "true")
                            $(".textentryaccessibility").text("Incorrect url entered " + reviewData.textEntry[0] + " Correct url entered " + reviewData.textEntry[1])
                        }
                    }

                }
                $(".textentryreview1").show();
                $(".textentryaccessibility").show();
                $(".textentryreview1").css("background", "#fff");
            }
        },
        DisplayUserReviewMode: function () {
           
            $(".reviewDiv").remove();
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData != undefined && pageDetailData.EmbedSettings != undefined) {
                
                this.DisplayReviewModeForTextEntry();
            }
            else {
                var reviewData = this.GetPageReviewData();
                if (reviewData != undefined && reviewData.Positions != undefined && reviewData.Positions.length > 0) {
                    if (reviewData.Positions.length > 1) {
                        for (var i = 0; i < reviewData.Positions.length; i++) {
                            var posObj = reviewData.Positions[i];
                            var appendImage = $(".wrapperimage");
                            var ht = appendImage.height();
                            while ((posObj.posY + 40) > ht) {
                                posObj.posY = posObj.posY - 2;
                            }
                            if (posObj.isCorrect) {
                                var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                                appendImage.append(_div);


                            } else {
                                var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                                appendImage.append(_divI);
                            }
                        }
                    }
                    else {
                        var posObj = reviewData.Positions[reviewData.Positions.length - 1];
                        var appendImage = $(".wrapperimage");
                        var ht = appendImage.height();
                        while ((posObj.posY + 40) > ht) {
                            posObj.posY = posObj.posY - 2;
                        }

                        if (posObj.isCorrect) {
                            var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                            appendImage.append(_div);


                        } else {
                            var _divI = "<div class='reviewDiv InCorrect' style='z-index:5;width:39px;height:35px;position:absolute;left:" + posObj.posX + "px;top:" + posObj.posY + "px;'><img src='assets/images/review-incorrect.png' style='width:39px;height:35px;' /></div>";

                            appendImage.append(_divI);
                        }
                    }
                }
            }
            this.ShowFeedbackReviewMode();


        },
        DisplayReviewModeForTextEntry: function () {
            $(".EmbededElement").hide();
            var reviewData = this.GetPageReviewData();
            var pageDetailData = this.GetPageDetailData();
            if (reviewData != undefined && reviewData.textEntry != undefined && reviewData.textEntry.length > 0) {

                if (reviewData.textEntry[reviewData.textEntry.length - 1] != undefined && reviewData.textEntry[reviewData.textEntry.length - 1] != "") {
                    var tEntry = reviewData.textEntry[reviewData.textEntry.length - 1].trim().toLowerCase();
                    if (pageDetailData.EmbedSettings.validatearray.indexOf(tEntry) >= 0) {
                        $(".textentryreview1").html("<span class='OpenSansFont' style='color:green;font-weight:bold;font-size: 13px; '>" + reviewData.textEntry[reviewData.textEntry.length - 1] + "</span>")
                    }

                }
                $(".textentryreview1").show();
                $(".textentryreview1").css("background", "#fff");
            }
        },
        AddHotspotClick: function (hotspotObj, event, isCorrect) {

            //$(".divHotSpot").remove();
            if (_Navigator.IsAnswered()) {
                return;
            }
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;

            var rposX;
            var rposY;
            if (event != undefined && event.pageX != undefined) {
                rposX = (event.pageX - posX);
                rposY = (event.pageY - posY);
            }
            if (rposX < 0 || rposY < 0) {//gp if module is attmpted using accessibility
                rposX = hotspotObj.position().left + 20;
                rposY = hotspotObj.position().top + 20;
            }
            var currentPageData = _Navigator.GetCurrentPage();
            var page = this.GetPageDetailData();
            if (page.EmbedSettings != undefined) {
                return;
            }
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    var posindex = 0;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posY == rposY) {
                                sameclick = true;
                                posindex = i;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                            if (currentPageData.pageId == "p15" || currentPageData.pageId == "p16" || currentPageData.pageId == "p18" || currentPageData.pageId == "p20" || currentPageData.pageId == "p21" || currentPageData.pageId == "p22" || currentPageData.pageId == "p23" || currentPageData.pageId == "p27" || currentPageData.pageId == "p28") {
                                reviewData[r].Positions.push(position);
                            }
                            else if (reviewData[r].Positions.length < 3) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                if (currentPageData.pageId == "p15" || currentPageData.pageId == "p16" || currentPageData.pageId == "p18" || currentPageData.pageId == "p20" || currentPageData.pageId == "p21" || currentPageData.pageId == "p22" || currentPageData.pageId == "p23" || currentPageData.pageId == "p27" || currentPageData.pageId == "p28") { } else {
                                    reviewData[r].Positions.splice(0, 1);
                                }
                                reviewData[r].Positions.push(position);
                            }
                        }
                        else {
                            if (reviewData[r].Positions[posindex].isCorrect == undefined || reviewData[r].Positions[posindex].isCorrect == false) {
                                reviewData[r].Positions[posindex].isCorrect = true;
                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: true };
                        reviewData[r].Positions = [position]
                    }

                    found = true;
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                if (isCorrect == undefined) {
                    isCorrect = true

                }
                var position = { posX: rposX, posY: rposY, isCorrect: isCorrect };
                _obj.Positions = [position]
                reviewData.push(_obj);

            }

        },
        AddEditPropertiesClick: function (event) {
            if (_Navigator.IsAnswered()) {
                return;
            }
            var pageDetailData = this.GetPageDetailData();
            if (pageDetailData.EmbedSettings != undefined)
                return;
            var imgObj = $(".activityimg");
            var posX = imgObj.offset().left;
            var posY = imgObj.offset().top;
            var found = false;

            var rposX = (event.pageX - posX);
            var rposY = (event.pageY - posY);
            if (isNaN(rposX) || isNaN(rposY))
                return;

            var currentPageData = _Navigator.GetCurrentPage();
            for (var r = 0; r < reviewData.length; r++) {
                if (reviewData[r].pageId == currentPageData.pageId) {
                    var sameclick = false;
                    if (reviewData[r].Positions != undefined) {
                        for (var i = 0; i < reviewData[r].Positions.length; i++) {
                            if (reviewData[r].Positions[i].posX == rposX && reviewData[r].Positions[i].posy == rposY) {
                                sameclick = true;
                                break;
                            }
                        }
                        if (!sameclick) {
                            var position = { posX: rposX, posY: rposY, isCorrect: false };
                            if (reviewData[r].Positions.length < 3) {
                                reviewData[r].Positions.push(position);
                            }
                            else {
                                
                                if (currentPageData.pageId == "p25") { } else {
                                    reviewData[r].Positions.splice(0, 1);
                                }
                                reviewData[r].Positions.push(position);

                            }
                        }
                    }
                    else {
                        var position = { posX: rposX, posY: rposY, isCorrect: false };
                        reviewData[r].Positions = [position]
                    }

                    found = true;
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                var position = { posX: rposX, posY: rposY, isCorrect: false };
                _obj.Positions = [position]
                reviewData.push(_obj);
            }

        },
        OnPageLoad: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            this.InitPageData();
            this.LoadHotSpot();
            this.ApplycontainerWidth();
            if ($("#div_feedback").length > 0) {
                $("#div_feedback").hide();

            }
            if (_Navigator.IsAnswered()) {
               
                this.DisplayInstructorReviewMode();

            }
            $("h2.pageheading").attr("tabindex", "-1");
            if (currentPageData.pageId == "p7" && !_Navigator.IsAnswered()) {
                this.HotspotFeedback();
                _Navigator.SetPageStatus(true);

            }
            if (currentPageData.pageId == "p35") {

                $("input.EmbededElement").val("political polls")
            }
        },


        LoadHotSpot: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = _PData[currentPageData.pageId];
            var aceessTextforImg = currentPageData.accessText;
            $(".activityimg").attr("alt", aceessTextforImg)
            if (pageData != undefined) {

                var hotspotdata = pageData.ImageHotSpots;
                var htmlForDivHotspotImage = "";
                if (pageData.ImageHotSpots != undefined) {
                    for (var i = 0; i < hotspotdata.Hotspots.length; i++) {
                        var currImg = $("img")
                        var orw = currImg.width();
                        var orh = currImg.height();

                        var hsId = hotspotdata.Hotspots[i].HotspotId;

                        var pwdth = hotspotdata.Hotspots[i].width;
                        var phight = hotspotdata.Hotspots[i].height;
                        var pleft = hotspotdata.Hotspots[i].left;
                        var ptop = hotspotdata.Hotspots[i].top;
                        var accessText = hotspotdata.Hotspots[i].accessText;
                        if ((hotspotdata.Hotspots[i].left + "").indexOf("px") != -1) {
                            pleft = getPerc(Number(hotspotdata.Hotspots[i].left.replace("px", "").replace("%", "")), orw) + "%";
                            ptop = getPerc(Number(hotspotdata.Hotspots[i].top.replace("px", "").replace("%", "")), orh) + "%";
                        }
                        htmlForDivHotspotImage += "<button type='button' hsId='" + hsId + "'  id='divHotspots" + i + "_" + hsId + "' class='divHotSpot' style=' width:" + pwdth + ";height:" + phight + ";left:" + pleft + ";top:" + ptop + ";' action='" + hotspotdata.Hotspots[i].action + "' role='button' aria-label='" + accessText + "'/>";
                    }
                    $(".wrapperimage").append(htmlForDivHotspotImage)
                }

            }
        },
        PresenterMode: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            var pageData = this.GetPageDetailData();
            var appendImage = $(".wrapperimage");
          
            
            if ((currentPageData.pageId == "p2" || currentPageData.pageId == "p13" || currentPageData.pageId == "p33" || currentPageData.pageId == "p35"  )&& pageData.EmbedSettings.validatearray != undefined) {
                $(".EmbededElement").show();
                $("input[type='text']").addClass("greenspan");
                $("input[type='text']").val(pageData.EmbedSettings.validatearray[0]);
                $("input[type='text']").k_disable();
                if(pageData.ImageHotSpots != undefined)
                {
                var posObj = pageData.ImageHotSpots.Hotspots[0];
                var _div = "<div class='reviewDiv Correct' style='z-index:5;width:39px;height:39px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:39px;height:35px;' /></div>";
                $(".divHotSpot").addClass("hotspotclicked");
                $(".divHotSpot").addClass("disabled");
                appendImage.append(_div);
                }
            }
            else{
       
            if(pageData.ImageHotSpots != undefined){
                if(currentPageData.pageId == "p14"){
                    $(".divHotSpot").addClass("hotspotclicked");
                    $(".divHotSpot").addClass("disabled");
                    for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                        var posObj = pageData.ImageHotSpots.Hotspots[i];
                       
                        var _div = "<div class='reviewDiv Correct' style='z-index:5;width:35px;height:35px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:35px;height:30px;' /></div>";
                        appendImage.append(_div);
                    }

                }
                else if(currentPageData.pageId == "p21" || currentPageData.pageId == "p25" || currentPageData.pageId == "p24"){

                    for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                        if(pageData.ImageHotSpots.Hotspots[i].isCorrect != undefined){

                            var isCorrect = pageData.ImageHotSpots.Hotspots[i].isCorrect;
                        
                        }
                       if(isCorrect){
                           if( pageData.ImageHotSpots.Hotspots[i].eventname == "correctclick" )
                           {
                                  $('.divHotSpot[hsid =' +pageData.ImageHotSpots.Hotspots[i].HotspotId +']').addClass("hotspotclicked");
                                  $('.divHotSpot[hsid =' +pageData.ImageHotSpots.Hotspots[i].HotspotId +']').addClass("disabled");
                               
                            }
                        var posObj = pageData.ImageHotSpots.Hotspots[i];
                      
                        var _div = "<div class='reviewDiv Correct' style='z-index:5;width:35px;height:35px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:35px;height:30px;' /></div>";
                        appendImage.append(_div);
                       }
                    }

                }
                else if (currentPageData.pageId == "p15" || currentPageData.pageId == "p16" || currentPageData.pageId == "p17" || currentPageData.pageId == "p18" || currentPageData.pageId == "p19" || currentPageData.pageId == "p20") {
                    $(".divHotSpot").addClass("hotspotclicked");
                    $(".divHotSpot").addClass("disabled");
                    for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                        var posObj = pageData.ImageHotSpots.Hotspots[i];

                        var _div = "<div class='reviewDiv Correct' style='z-index:5;width:35px;height:35px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:35px;height:30px;' /></div>";
                        appendImage.append(_div);
                    }
                
                }
                else{
                    $(".divHotSpot").addClass("hotspotclicked");
                    $(".divHotSpot").addClass("disabled");
                      var posObj = pageData.ImageHotSpots.Hotspots[0];
                    
                      var _div = "<div class='reviewDiv Correct' style='z-index:5;width:35px;height:35px;position:absolute;left:" + posObj.left + ";top:" + posObj.top + ";'><img src='assets/images/review-correct.png' style='width:35px;height:30px;' /></div>";
                      appendImage.append(_div);
                }
           
            }
        }
            $("#linknext").k_enable();
            _Navigator.SetPageStatus(true);
            _Navigator.UpdateProgressBar();
        },
        ApplycontainerWidth: function () {
           
            var innerWidth = $(window).width();

            $("#header-title img").attr("src", "assets/images/logo.png")

            if (innerWidth < 850) {
                if ($(".activityContainer").find(".activityimg").length > 0) {
                    var marginleft = $(".intro-content:first").css("margin-left");
                    marginleft = marginleft.substring(0, marginleft.indexOf("px"))

                    var imgcntwidth = innerWidth - (marginleft * 2);
                    $(".activity").css({ "width": imgcntwidth + "px" })
                }
                if (innerWidth <= 500) {
                    $("#header-title img").attr("src", "assets/images/pearson-logo-v1.png")
                }
            }
            else {
                $(".activity").css({ "width": "auto" })
            }

        },
        OrientationChange: function () {

            this.ApplycontainerWidth();
            var target = $(".header-content-dock");
            target.css({ "visibility": "hidden","top": "-80px"})
        },
        HotspotClick: function (_hotspot, event) {

            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnInteraction("Hotspot click.")
            }
            var isPg19Visitedtrue = false;
            if (_Navigator.IsAnswered())
                return;
            var action = _hotspot.attr("action")
            //  this.AddHotspotClick(_hotspot, event);
            var score = 0;
            var pageId = '';
            var pageData = this.GetPageDetailData();
            isCorrect = true;
            var currPage = _Navigator.GetCurrentPage();
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        if (pageData.ImageHotSpots.Hotspots[i].isCorrect != undefined) {
                            isCorrect = pageData.ImageHotSpots.Hotspots[i].isCorrect;
                        }
                        if (pageData.ImageHotSpots.Hotspots[i].pageId != undefined && pageData.ImageHotSpots.Hotspots[i].pageId != "") {
                            pageId = pageData.ImageHotSpots.Hotspots[i].pageId;
                        }
                    }
                }
            }
            this.AddHotspotClick(_hotspot, event, isCorrect);
            _Navigator.SetPageScore(score)
            switch (action) {
                case "next":
                    //if (pageId == "p15" || pageId == "p16" || pageId == "p17" || pageId == "p18" || pageId == "p19" || pageId == "p20" /*pageId == "p22" || pageId == "p23" || pageId == "p24" || pageId == "p25" || pageId == "p26" || pageId == "p27" || pageId == "p28"*/) {
                    //   // _Navigator.SetPageStatus(false)
                    //    $(".divHotSpot").each(function () {
                    //        $(this).removeClass("disabled hotspotclicked")

                    //    })
                    //    this.HotspotNext();
                    //}
                    //else {
                    _Navigator.SetPageStatus(true);
                    this.HotspotNext();

                    // }
                    break;
                case "feedback":
                    if (currPage.pageId != "p22" && currPage.pageId != "p27")
                        _Navigator.SetPageStatus(true);
                    this.HotspotFeedback(_hotspot);
                    if (currPage.pageId == "p22" || currPage.pageId == "p27") {
                        $("#divHotspots0_1").removeClass("disabled")
                        $("#divHotspots0_1").removeAttr("disabled")
                        $("#divHotspots0_1").removeAttr("aria-disabled")
                        _Navigator.SetPageStatus(false);
                    }

                    break;
                case "checkinput":
                    this.InputEnter($("input.EmbededElement"))
                    break;
                case "page":
                    
                    $(".divHotSpot").each(function () {
                        $(this).removeClass("disabled hotspotclicked")

                    })
                    _Navigator.LoadPage(pageId);

                    break;
                case "custom":
                    $(".divHotSpot").each(function () {
                        $(this).removeClass("disabled hotspotclicked")

                    })
                    if (this.checkalllinksvisited()) {

                        _Navigator.SetPageStatus(true);
                        _Navigator.LoadPage("p14");


                    }
                    else {
                        _Navigator.LoadPage("p14");
                        //  _Navigator.SetPageStatus(false)
                    }

                    break;
                case "custom1":
                    $(".divHotSpot").each(function () {
                        $(this).removeClass("disabled hotspotclicked")

                    })
                    _Navigator.LoadPage("p21");
                    break;
                default:
                    break;
            }
            _Navigator.GetBookmarkData();
        },
        showFeedback: function () {           
            var fdbkUrl = "Good Job."
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                $("#div_feedback .div_fdkcontent p:first").attr("tabindex","-1")
                if (iOS) {
                    $(".hintcontainer .hintcontent").find("p:first").attr("role", "text")
                }
                window.scrollTo(0,document.body.scrollHeight)
                $("#div_feedback p:first").focus();
            });

            this.EnableNext();

        },
        SetFeedbackTop: function () {
            var ptop = Number($("#div_feedback").position().top);
            var pheight = Number($("#div_feedback").outerHeight());
            var pdiff = (_Settings.minHeight + _Settings.topMargin) - (ptop + pheight);
            if (pdiff > 0) {
                $("#div_feedback").css("margin-top", (pdiff + 35) + "px");
            }
        },
        InputFeedback: function () {

            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnFeedback()
            }
            var pageData = this.GetPageDetailData();
            var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + pageData.EmbedSettings.feedbackurl;
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {
                // this.SetFeedbackTop()   
                $("#div_feedback p:first").attr("tabindex", "-1")
                if (iOS) {
                    $("#div_feedback p:first").attr("role", "text")
                }
                //$('html,body').animate({ scrollTop: document.body.scrollHeight }, delay, function () {
                window.scrollTo(0, document.body.scrollHeight)
                $("#div_feedback p:first").focus();
                //});
            });
            $("input").k_disable();
            this.EnableNext();
        },
        HotspotFeedback: function (_hotspot) {
            if (_Navigator.IsRevel()) {
                LifeCycleEvents.OnFeedback()
            }
            var pageData = this.GetPageDetailData();
            var currentPage = _Navigator.GetCurrentPage();
            var url = "";
            if (pageData.ImageHotSpots != undefined) {
                for (var i = 0; i < pageData.ImageHotSpots.Hotspots.length; i++) {
                    if (pageData.ImageHotSpots.Hotspots[i].HotspotId == _hotspot.attr("hsid")) {
                        url = pageData.ImageHotSpots.Hotspots[i].feedbackurl;
                    }
                }
            }
            if (currentPage.pageId == "p7") {

                url = "feedbackp3.htm";
                var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;
            }
            else {
                var fdbkUrl = _Settings.dataRoot + "feedbackdata/" + url;
            }
            $("#div_feedback").show();
            $("#div_feedback").css("display", "inline-block");
            $("#div_feedback .div_fdkcontent").load(fdbkUrl, function () {

                $("#div_feedback p:first").attr("tabindex", "-1")
                if (iOS) {
                    $("#div_feedback p:first").attr("role", "text")
                }
                //$('html,body').animate({ scrollTop: document.body.scrollHeight }, delay, function () {
                window.scrollTo(0, document.body.scrollHeight)
                $("#div_feedback p:first").focus();
                //});
            });
            if (currentPage.pageId == "p22" || currentPage.pageId == "p27") {

                $("#linknext").k_disable();
            }
            else {
                this.EnableNext();
            }
        },
        HotspotNext: function () {
            if (isAndroid) {
                $("#progressdiv").focus();
            }
            _Navigator.Next();
        },
        InputNext: function () {
            _Navigator.Next();
        },
        InitPageData: function () {
            var currentPageData = _Navigator.GetCurrentPage();
            if (_Navigator.IsAnswered()) {
                return;
            }
            for (var i = 0; i < pagesDataArray.length; i++) {
                if (currentPageData.pageId == pagesDataArray[i].PageID) {
                    return;
                }
            }
            var obj = {};
            obj.PageID = currentPageData.pageId;

            pagesDataArray.push(obj);
        },
        checkalllinksvisited: function () {
            var cnt = 0;
            pageArray = [];
            for (var i = 0; i < pagesDataArray.length; i++) {
                if (["p16", "p18", "p20"].indexOf(pagesDataArray[i].PageID) >= 0 && pageArray.indexOf(pagesDataArray[i].PageID) < 0) {
                    cnt++;
                    pageArray.push(pagesDataArray[i].PageID);
                }
            }
            if (cnt == 3) {
                return true;
            }
            return false;
        },

        checkP19visited: function () {
            var cnt = 0;
            pageArray = [];
            for (var i = 0; i < pagesDataArray.length; i++) {
                if (["p14", "p21"].indexOf(pagesDataArray[i].PageID) >= 0 && pageArray.indexOf(pagesDataArray[i].PageID) < 0) {
                    cnt++;
                    pageArray.push(pagesDataArray[i].PageID);
                }
            }
            if (cnt == 2) {
                return true;
            }
            return false;
        },
        checkP27visited: function () {
            var cnt = 0;
            pageArray = [];
            for (var i = 0; i < pagesDataArray.length; i++) {
                if (["p21", "p29"].indexOf(pagesDataArray[i].PageID) >= 0 && pageArray.indexOf(pagesDataArray[i].PageID) < 0) {
                    cnt++;
                    pageArray.push(pagesDataArray[i].PageID);
                }
            }
            if (cnt == 2) {
                return true;
            }
            return false;
        },
        checkP25visited: function () {
            var cnt = 0;
            pageArray = [];
            for (var i = 0; i < pagesDataArray.length; i++) {
                if (["p21", "p25"].indexOf(pagesDataArray[i].PageID) >= 0 && pageArray.indexOf(pagesDataArray[i].PageID) < 0) {
                    cnt++;
                    pageArray.push(pagesDataArray[i].PageID);
                }
            }
            if (cnt == 2) {
                return true;
            }
            return false;
        },
        checkP21visited: function () {
            var cnt = 0;
            pageArray = [];
            for (var i = 0; i < pagesDataArray.length; i++) {
                if (["p21", "p29"].indexOf(pagesDataArray[i].PageID) >= 0 && pageArray.indexOf(pagesDataArray[i].PageID) < 0) {
                    cnt++;
                    pageArray.push(pagesDataArray[i].PageID);
                }
            }
            if (cnt == 2) {
                return true;
            }
            return false;
        },
        InputEnter: function (inputtext) {           
            var pageData = this.GetPageDetailData();
            var action = pageData.EmbedSettings.action;
            var vtextarr = pageData.EmbedSettings.validatearray;
            var currentPageData = _Navigator.GetCurrentPage();
            var isVRequired = false;
            if (_Navigator.IsAnswered())
                return;
            if (action == "validate") {

                if ($.trim(inputtext.val()) != "") {
                    for (var i = 0; i < vtextarr.length; i++) {
                        if (currentPageData.pageId == "p35") {
                            if (($.trim(vtextarr[i])) == ($.trim($("input.EmbededElement").val()))) {
                                isVRequired = true;
                                break;
                            }
                            else {
                                $(".divHotSpot").removeClass("hotspotclicked disabled")
                                $(".divHotSpot").removeAttr("disabled")
                                $(".divHotSpot").removeAttr("aria-disabled")
                            }
                        } else {
                            if (($.trim(vtextarr[i])).toLowerCase() == ($.trim($("input.EmbededElement").val())).toLowerCase()) {
                                isVRequired = true;
                                break;
                            }
                            else {
                                $(".divHotSpot").removeClass("hotspotclicked disabled")
                                $(".divHotSpot").removeAttr("disabled")
                                $(".divHotSpot").removeAttr("aria-disabled")
                            }
                        }
                    }


                }
                else {
                    $(".divHotSpot").removeClass("hotspotclicked disabled")
                    $(".divHotSpot").removeAttr("disabled")
                    $(".divHotSpot").removeAttr("aria-disabled")

                }
            }
            else {



                for (var i = 0; i < vtextarr.length; i++) {
                    if (($.trim(vtextarr[i])).toLowerCase() == ($.trim(inputtext.val())).toLowerCase()) {
                        isVRequired = true;
                        break;
                    }
                }
            }
            var found = false;
            if (currentPageData.pageId == "p35") {
                var str = $.trim(inputtext.val());
            }
            else {
                var str = $.trim(inputtext.val()).toLowerCase();
            }
            if (reviewData != undefined && reviewData.length > 0) {
                for (var i = 0; i < reviewData.length; i++) {
                    if (reviewData[i].pageId == currentPageData.pageId) {
                        if (reviewData[i].textEntry.length < 2) {
                            reviewData[i].textEntry.push(str);
                        } else {
                            reviewData[i].textEntry.splice(0, 1);
                            reviewData[i].textEntry.push(str);
                        }

                        found = true;
                    }
                }
            }

            if (!found) {
                var _obj = {};
                _obj.pageId = currentPageData.pageId;
                _obj.textEntry = [str];
                _obj.isCorrect = true;
                reviewData.push(_obj);

            }


            if (isVRequired) {

                var score = pageData.EmbedSettings.score;
                _Navigator.SetPageScore(score)

                _Navigator.SetPageStatus(true);
                switch (action) {
                    case "next":
                        this.InputNext();
                        break;
                    case "feedback":
                        this.InputFeedback();
                        break;
                    case "validate":
                        this.InputNext();
                        break;
                    default:
                        break;
                }
            }
            else {
                $(".divHotSpot").removeClass("disabled");
                $(".divHotSpot").removeClass("hotspotclicked");
                $(".divHotSpot").k_enable();
            }
            _Navigator.GetBookmarkData();
        },
        AppendFooter: function () {
            if ($(".presentationModeFooter").length == 0) {
                var str = '<div class="presentationModeFooter">Presentation Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }
        },
        AppendScormReviewFooter: function () {
            if ($(".ScormReviewFooter").length == 0) {
                var str = '<div class="ScormReviewFooter"> Review Mode</div>';
                $("footer").append($(str));
                $("footer").show();
                $("#linknext").k_enable();
            }
        },
        AppendCss: function () {
            if (isIE11version) {
                $(".hintDiv").css("width", "70px");
            }
            if (isAndroid || iOS) {
                $("#footer-navigation ").css("display", "");

            }
        }
    }

})();



$(document).ready(function () {

    _Navigator.Initialize();
    $('body').attr({ "id": "thebody", "onmousedown": "document.getElementById('thebody').classList.add('no-focus');", "onkeydown": "document.getElementById('thebody').classList.remove('no-focus');" })
});