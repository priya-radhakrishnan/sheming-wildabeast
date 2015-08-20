var smLogin = smLogin || {};

smLogin.standardError = "We are currently experiencing technical issues. Please try again later.";

smLogin.securebase = "http://dev-euapps.exeloncorp.com/siteminderagent";

smLogin.wwwbase = "https://stg-www.bge.com/";
smLogin.baseurl = "http://stg-secure.bge.com";
smLogin.securerealm = 'urn:SP2010';
var opco = '1';
$( document ).ready(function() {
  $('.ms-signInLink').hide();

opco = getParameterByName('u');
/* $('#DeltaSiteLogo > a').attr("href", "/?u="+opco); */
switch(opco) {
    case '1':
        $('img[src="/Style%20Library/Exelon/images/EX_logo.png"]').attr('src','/Style%20Library/Exelon/images/COMED/EX_logo_COMED_W.png');
 		$('link[href="/Style%20Library/Exelon/css/EX_Main_COMED_white.css"]').attr('href','/Style%20Library/Exelon/css/EX_Main_COMED_white.css');
		$('.EX_copyright').text("© 2015 Commonwealth Edison Company All Rights Reserved.");
		$('#main_slider > li:eq(2) > div > p').text("Open for Illinos Customers");
        break;
    case '2':
        $('img[src="/Style%20Library/Exelon/images/EX_logo.png"]').attr('src','/Style%20Library/Exelon/images/BGE/EX_logo_BGE.png');
 		$('link[href="/Style%20Library/Exelon/css/EX_Main_COMED_white.css"]').attr('href','/Style%20Library/Exelon/css/EX_Demo_BGE_white.css');
		$('.EX_copyright').text("©2015 Baltimore Gas and Electric Company. All Rights Reserved.");

		genBGEMenu();
        break;
    case '3':
        $('img[src="/Style%20Library/Exelon/images/EX_logo.png"]').attr('src','/Style%20Library/Exelon/images/PECO/EX_logo_peco.png');
 		$('link[href="/Style%20Library/Exelon/css/EX_Main_COMED_white.css"]').attr('href','/Style%20Library/Exelon/css/EX_Demo_PECO_white.css');
		$('.EX_copyright').text("©PECO Energy Company, 2016. All Rights Reserved.");
		$('#main_slider > li:eq(2) > div > p').text("Open for Pennsylvania Customers");
		genPECOMenu();
        break;
	default:
		$('#main_slider > li:eq(2) > div > p').text("Open for Illinos Customers");
		$('.EX_copyright').text("© 2015 Commonwealth Edison Company All Rights Reserved.");

    }


});

function postLogin() {
    /*if ($('input[name=remembercheckbox]').is(':checked'))
        smtarget = getTarget(smLogin.securebase, smLogin.securerealm, '%2Fcss%2Fpages%2Fadaptor.aspx%3Fpgcode%3D1%26rem%3D1');
    else
        smtarget = getTarget(smLogin.securebase, smLogin.securerealm, '/css/pages/adaptor.aspx?pgcode=1');

	*/


window.location.href = '/myaccount/Pages/default.aspx?u=' + opco ;

/*smtarget = '/pages/landing.aspx';
    post_to_url(smLogin.securebase + "/forms/login.fcc", {
        USER: $('#X_USER').val(),
        PASSWORD: $('#X_PASSWORD').val(),
        Target: smtarget,
        SMAUTHREASON: 0
    });
*/

}

function postLoginW() {
window.location.href = '/myaccount/Pages/default.aspx?u=' + opco ;

/*        smtarget = '/pages/landing.aspx';
    post_to_url(smLogin.securebase + "/forms/login.fcc", {
        USER: $('#W_USER').val(),
        PASSWORD: $('#W_PASSWORD').val(),
        Target: smtarget,
        SMAUTHREASON: 0
    });
*/

}

function postLoginY() {
window.location.href = '/myaccount/Pages/default.aspx?u=' + opco ;
/*
      smtarget = '/pages/landing.aspx';
    post_to_url(smLogin.securebase + "/forms/login.fcc", {
        USER: $('#Y_USER').val(),
        PASSWORD: $('#Y_PASSWORD').val(),
        Target: smtarget,
        SMAUTHREASON: 0
    });
*/

}


function post_to_url(path, params, method) {
    method = method || "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    form.setAttribute("target", "_parent");

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function submitenter(myfield, e) {
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;
    else
        return true;

    if (keycode == 13) {
        checkUser();
        return false;
    } else
        return true;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

var currentYear = "";
currentYear = (new Date()).getFullYear();

function setCookieEx(c_name, value, exdays) {
    var currentDate = new Date();
    var exdate = new Date(currentDate.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var c_value = escape(value) + ((exdays == null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=.bge.com;path=/";
    //var c_value = escape(value) + ((exdays == null) ? "" : ";expires=" + exdate.toUTCString()) + ";cookie_domain=.Ceg.Corp.Net;path=/";
    document.cookie = c_name + "=" + c_value;

}

function setCookie(c_name, value) {
    var currentDate = new Date();
    var exdays = 1;
    var exdate = new Date(currentDate.getTime() + (10 * 60 * 1000));
    var c_value = escape(value) + ((exdays == null) ? "" : ";expires=" + exdate.toUTCString()) + ";domain=.bge.com;path=/";
    //var c_value = escape(value) + ((exdays == null) ? "" : ";expires=" + exdate.toUTCString()) + ";cookie_domain=.Ceg.Corp.Net;path=/";
    document.cookie = c_name + "=" + c_value;

}

function getCookie(c_name) {
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1) {
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1) {
        c_value = null;
    } else {
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1) {
            c_end = c_value.length;
        }
        c_value = unescape(c_value.substring(c_start, c_end));
    }
    return c_value;
}

function checkNull(source) {
    if (typeof source == "undefined" || source == null)
        return "";
    else
        return source;
}

smLogin.showLoadIndicator = function () {
    $("body div.modal, body div.modal-text").show();
    $("body div.modal-text").css({
        opacity: 1
    });
    $("body div.modal").css({
        opacity: .5
    });
    $("body div.modal, body div.modal-text").fadeIn();

}
smLogin.hideLoadIndicator = function () {
    $("body div.modal, body div.modal-text").hide();
}


function genL3(title){
	return '<li class="dynamic"><a class="dynamic menu-item ms-core-listMenu-item ms-displayInline ms-navedit-linkNode" tabindex="0" href="/myaccount/mybill/Pages/'+ title +'.aspx"><span class="additional-background ms-navedit-flyoutArrow"><span class="menu-item-text">'+ title +'</span></span></a></li>'
}

function genPECOMenu(){
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(0) > li > ul:eq(0)').empty().append(genL3('Pay My Bill')+genL3('My Bill Details')+genL3('My Usage')+genL3('Rates & Pricing'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(0) > li > ul:eq(1)').empty().append(genL3('Start Stop Move')+genL3('Construction & Remodeling')+genL3('Customer Choice')+genL3('Outdoor Lighting')+genL3('Manage Properties'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(0) > li > ul:eq(2)').empty().append(genL3('My Account Profile')+genL3('My Home Profile')+genL3('My Reports & Alerts'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(0) > li > ul:eq(3)').empty().append(genL3('Assistance Programs')+genL3('FAQs')+genL3('Contact Us')+genL3('Damage and Theft'));

	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(1) > li > ul:eq(0)').empty().append(genL3('Outage Center'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(1) > li > ul:eq(1)').empty().append(genL3('Outage Status')+genL3('Outage Map'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(1) > li > ul:eq(2)').empty().append(genL3('Storm Center FAQs')+genL3('Storm Restoration Process')+genL3('Common Outages Causes'));

	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(2) > li > ul:eq(0)').empty().append(genL3('PECO Smart Appliance Recycling')+genL3('PECO Smart Home Rebates')+genL3('PECO Smart House Call')+genL3('PECO Smart Lighting Discounts')+genL3('PECO Smart Energy Saver')+genL3('PECO Smart Builder Rebates')+genL3('PECO Smart Driver Rebates')+genL3('PECO Smart A/C Saver')+genL3('PECO Smart Gas Efficiency Upgrade')+genL3('PECO Smart Natural Gas Conversion'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(2) > li > ul:eq(1)').empty().append(genL3('Small Business Advantage Grants')+genL3('PECO Smart Equipment Incentives')+genL3('PECO Smart Construction Incentives')+genL3('PECO Smart Business Solutions')+genL3('PECO Smart Multifamily Solutions')+genL3('PECO Smart On-Site'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(2) > li > ul:eq(2)').empty().append(genL3('Home e-Audit')+genL3('Business e-Audit')+genL3('Tools & Calculators')+genL3('Tips & Guides')+genL3('SeasonalTips')+genL3('PecoTalks')+genL3('Business Data Tool')+genL3('Online Store'));

	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(3) > li > ul:eq(0)').empty().append(genL3('New Page'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(3) > li > ul:eq(1)').empty().append(genL3('Advanced Grid Technology')+genL3('Advanced Meter Technology'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(3) > li > ul:eq(2)').empty().append(genL3('Electric Vehicles')+genL3('Compressed Natural Gas Vehicles'));

	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(4) > li > ul:eq(0)').empty().append(genL3('Employee Volunteering ')+genL3('Charitable Giving')+genL3('Energizing Education')+genL3('Green Region')+genL3('Community Funding')+genL3('Events and Sponsorships')+genL3('Crown Lights'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(4) > li > ul:eq(1)').empty().append(genL3('Understanding Energy')+genL3('Tips for Kids')+genL3('Kids Corner')+genL3('Electric Universe')+genL3('Fire Academy'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(4) > li > ul:eq(2)').empty().append(genL3('Gas & Electric Safety')+genL3('Power Line Safety')+genL3('Call Before You Dig')+genL3('Emergency')+genL3('Natural Gas Conversion Application')+genL3('Make Work Site Safe')+genL3('Trees and Powerlines'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(4) > li > ul:eq(3)').empty().append(genL3('Our Commitment ')+genL3('Our Initiatives ')+genL3('Carbon Footprint ')+genL3('Take Action'));
}

function genBGEMenu(){
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(0) > li > ul:eq(0)').empty().append(genL3('Pay My Bill')+genL3('My Bill Details')+genL3('My Usage')+genL3('Rates & Pricing'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(0) > li > ul:eq(1)').empty().append(genL3('Start Stop Move')+genL3('Construction & Remodeling')+genL3('Customer Choice')+genL3('Outdoor Lighting')+genL3('Manage Properties'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(0) > li > ul:eq(2)').empty().append(genL3('My Account Profile')+genL3('My Home Profile')+genL3('My Reports & Alerts'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(0) > li > ul:eq(3)').empty().append(genL3('Assistance Programs')+genL3('FAQs')+genL3('Contact Us')+genL3('Damage and Theft'));

	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(1) > li > ul:eq(0)').empty().append(genL3('Report an Outage')+genL3('Report a Street Light Out')+genL3('Report a Gas Emergency'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(1) > li > ul:eq(1)').empty().append(genL3('Current Outages Map')+genL3('Check Outage Status')+genL3('Planned Outages')+genL3('Restoring Power')+genL3('Gas Outages'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(1) > li > ul:eq(2)').empty().append(genL3('Storm Center')+genL3('Storms & Outages')+genL3('What Causes Outages')+genL3('Preventing Outages'));

	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(2) > li > ul:eq(0)').empty().append(genL3('Manage Your Usage')+genL3('Home Improvements')+genL3('Quick Home Energy Check-Up')+genL3('Savings & Rebate Programs')+genL3('Peak Rewards')+genL3('Energy Savings Days')+genL3('Success Stories'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(2) > li > ul:eq(1)').empty().append(genL3('Energy Solutions for Business')+genL3('Retrocommissioning (RCx)')+genL3('Commercial Systems & Energy Information')+genL3('Success Stories'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(2) > li > ul:eq(2)').empty().append(genL3('SummerReady')+genL3('WinterReady')+genL3('Energy Use Varies')+genL3('How Weather Impacts Usage'));

	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(3) > li > ul:eq(0)').empty().append(genL3('Smart Energy Savers Programs'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(3) > li > ul:eq(1)').empty().append(genL3('Smart Meters')+genL3('Customer Communication')+genL3('Data Privacy Policy'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(3) > li > ul:eq(2)').empty().append(genL3('Plug-in Electric Vehicles'));

	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(4) > li > ul:eq(0)').empty().append(genL3('Employee Volunteering')+genL3('Charitable Contributions')+genL3('Community Outreach')+genL3('Elected Officials - Common Ground'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(4) > li > ul:eq(1)').empty().append(genL3('For Teachers & Kids')+genL3('Speaker\'s Bureau Program')+genL3('Employee Training')+genL3('Energy Basics'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(4) > li > ul:eq(2)').empty().append(genL3('Electric Safety')+genL3('Construction Safety')+genL3('Natural Gas Safety')+genL3('Commitment to Safety')+genL3('Reliability'));
	$('#topnavbar #DeltaTopNavigation ul.root ul.static > li > ul:eq(4) > li > ul:eq(3)').empty().append(genL3('Environmental Policy')+genL3('Accountability')+genL3('Stewardship Initiatives')+genL3('Energy Saving Tree Program'));
}
