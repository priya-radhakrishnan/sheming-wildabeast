$(document).ready(function () {
    siteURL = "http://sharepointdev.exeloncorp.com/";
	  $('.ms-signInLink').hide();
    if ($(".EX_HomeLayout")[0]) {
        $("#s4-workspace").addClass("EX_NarrowLayout");
    } else {
        $("#s4-workspace").addClass("EX_WideLayout");
    }
    if ($(".EX_accountBill")[0]) {
        $("#s4-workspace").addClass("EX_WideLayout EX_AcctLayout");
    }
        if ($(".threecol")[0]) {
        $("#s4-workspace").addClass("EX_WideLayout EX_AcctLayout EX_ThreeCol");
    }



    $("#EX_notificationbar .closealert").click(function () {
        $("#EX_notificationbar").fadeOut();
    });

    var searchtxtbox = $(".ms-srch-sb-prompt");

    searchtxtbox.removeAttr("value");
    searchtxtbox.removeAttr("onblur");
    searchtxtbox.attr("placeholder", "Search...");

    $("#EX_alertbar .closealert").click(function () {
        $("#EX_alertbar").fadeOut();
    });
    $(".navbar-toggle").click(function () {
        $(this).toggleClass("active");
    });

    //Menu Positioning
    var containerposition = $("#mainbody").offset().left;

    //Topimage Background
    var TopImgBG = $(".EX_TopImage img").attr("src");

    $(".EX_TopImage").css("background-image", "url(" + TopImgBG + ")");
    $(".EX_TopImage img").hide();

    $(".root>li>ul>li:last-child>a").addClass("lastitem");

    $(window).resize(function () {
        onResizeEvent();
    });
    
    $('.EX_btn').on('click', function (event) {
        $(this).parent().toggleClass('open');
    });
    
    $('body').on('click', function (e) {
        if (!$('.EX_btn-group').is(e.target) && $('.EX_btn-group').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
            $('.EX_btn-group').removeClass('open');
        }
    });
    
    var megadropdown = $("#topnavbar #DeltaTopNavigation ul.root>li>ul.static>li.dynamic-children>ul.dynamic");

    function onResizeEvent() {

        windowWidth = window.innerWidth;
        if (windowWidth > 768) {
            $("#topnavbar ul.root>li>ul>li.static ").hover(function () {
                var menuposition = $(this).offset().left;
                var topnavpos = $('#topnavbar').offset().left;
                var combinedposition = menuposition - topnavpos;
                var finalpos = Math.abs(combinedposition) * -1;

                megadropdown.css("margin-left", +finalpos + 100);


            });
        } else {
            $("#topnavbar ul.root>li>ul>li.static ").hover(function () {
                //$("#topnavbar #DeltaTopNavigation ul.root>li>ul.static>li.dynamic-children>ul.dynamic").css("margin-left", '0');
            });
        }
    }

    $('#main_slider').skdslider({
        delay: 5000,
        animationSpeed: 1000,
        autoSlide: true,
        animationType: 'fading',
        showNav: true
    });
    $(window).trigger('resize');

    //MOBILE NAVIGATION BEHAVIOR

    $(".EX_mobiletools .login").click(function () {
        $(".EX_LoginMobile").toggle();
        $(this).toggleClass("active");
    });
    
	/*
    $(".EX_Topnav #topnavbar .root ul ul>li span").click(function () {
        var internalOptions = $(".level3nav .internaloptions");
        internalOptions.html('');
        
        var widthdist = $("#DeltaTopNavigation").width();
        var parentli = $(this).closest("li");
        
        var backButton = '<li class="dynamic"><a href="" class="menu-back-level dynamic menu-item ms-core-listMenu-item ms-displayInline ms-navedit-linkNode" tabindex="-1"><span class="additional-background ms-navedit-flyoutArrow"><span class="menu-item-text">Back</span></span></a></li>';
        
        parentli.children("ul").clone().appendTo(".level3nav .internaloptions");
        
        setTimeout(function(){
            $( ".level3nav .internaloptions ul" ).prepend(backButton);
        }, 100);
            
        $(".level3nav").fadeIn();
    });

    $(".EX_Topnav").on('click', '.menu-back-level', function () {
        $(".level3nav").fadeOut();
		return false;
    });
    */

});