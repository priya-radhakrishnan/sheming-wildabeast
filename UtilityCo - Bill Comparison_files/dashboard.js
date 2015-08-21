/*
  Title: dashboard.js
  Purpose - Special JS for specific dashboard features
  Author - Doug Avery, Viget Labs
*/

$('#updateDashboardUsage').click(function(event){
  event.preventDefault();
  $('#dashboard-usage').ajaxRefresh();
});

  $(document).keyup(function(event) {

    if( event.which === 88 && event.ctrlKey ) {
      $('.promos .extensible-widget').removeClass('hide').siblings('.promo').addClass('hide');
    }

  });

  $('.extensible-widget .btn').click(function(){

    event.preventDefault();
    $('#xwebAccept').sessionSet('xweb-sketch-Accepted',true);
    $(this).addClass('hide').siblings('.success').removeClass('hide');

  });

$('.unusualusage').each(function(){
  var amt = $('h2 strong',this).html();
  var $this = $(this),
    content = '<p>Based on your recent fuel usage. you&rsquo;re headed towards costs that are 30% higher than is typlcal for you this time of year.</p>';
    content += '<p><strong>Your typical June usage costs: '+amt+'</strong></p>';
    content += '<p><strong>There are 22 days left to save this period.</strong></p>';
    content += '<p class="graytext">Your actual blll wlll vary based on usage, taxes &amp; fees.</p>';

  $this.showTooltipDescription({
    descriptionhtml : content + '<span class="tooltiparrowwrapper"><span class="tooltiparrow"></span></span>',
    href : null,
    isCloseToLeftSide : function(){ return true; },
    addClass : 'unusualusage-tooltip',
    left : function(){
      return $this.offset().left - 300;
    }
  });
});

  // elroi stuffs
  var weather_today_f = [
        [
            {value: avg_temp-40, date: "2013-07-10T03:00:00"},
            {value: avg_temp-45, date: "2013-07-10T04:00:00"},
            {value: avg_temp-38, date: "2013-07-10T05:00:00"},
            {value: avg_temp-32, date: "2013-07-10T06:00:00"},
            {value: avg_temp-36, date: "2013-07-10T07:00:00"},
            {value: avg_temp-40, date: "2013-07-10T08:00:00"},
            {value: avg_temp-34, date: "2013-07-10T09:00:00"},
            {value: avg_temp-24, date: "2013-07-10T10:00:00"},
            {value: avg_temp-06, date: "2013-07-10T11:00:00"},
            {value: avg_temp+07, date: "2013-07-10T12:00:00"},
            {value: avg_temp+13, date: "2013-07-10T13:00:00"},
            {value: avg_temp+22, date: "2013-07-10T14:00:00"},
            {value: avg_temp+27, date: "2013-07-10T15:00:00"},
            {value: avg_temp+23, date: "2013-07-10T16:00:00"},
            {value: avg_temp+10, date: "2013-07-10T17:00:00"},
            {value: avg_temp-03, date: "2013-07-10T18:00:00"},
            {value: avg_temp-15, date: "2013-07-10T19:00:00"},
            {value: avg_temp-18, date: "2013-07-10T20:00:00"},
            {value: avg_temp-32, date: "2013-07-10T21:00:00"},
            {value: avg_temp-48, date: "2013-07-10T22:00:00"},
            {value: avg_temp-53, date: "2013-07-10T23:00:00"},
            {value: avg_temp-54, date: "2013-07-11T00:00:00"}
        ]
      ],
      weather_today_peak_f = [
        [
            {value: null, date: "2013-07-10T03:00:00"},
            {value: null, date: "2013-07-10T04:00:00"},
            {value: null, date: "2013-07-10T05:00:00"},
            {value: null, date: "2013-07-10T06:00:00"},
            {value: null, date: "2013-07-10T07:00:00"},
            {value: null, date: "2013-07-10T08:00:00"},
            {value: null, date: "2013-07-10T09:00:00"},
            {value: null, date: "2013-07-10T10:00:00"},
            {value: null, date: "2013-07-10T11:00:00"},
            {value: avg_temp+07, date: "2013-07-10T12:00:00"},
            {value: avg_temp+13, date: "2013-07-10T13:00:00"},
            {value: avg_temp+22, date: "2013-07-10T14:00:00"},
            {value: avg_temp+27, date: "2013-07-10T15:00:00"},
            {value: avg_temp+23, date: "2013-07-10T16:00:00"},
            {value: avg_temp+10, date: "2013-07-10T17:00:00"}
        ]
      ],weather_tomorrow_f = [
        [
            {value: avg_temp-43, date: "2013-07-10T03:00:00"},
            {value: avg_temp-44, date: "2013-07-10T04:00:00"},
            {value: avg_temp-42, date: "2013-07-10T05:00:00"},
            {value: avg_temp-40, date: "2013-07-10T06:00:00"},
            {value: avg_temp-30, date: "2013-07-10T07:00:00"},
            {value: avg_temp-28, date: "2013-07-10T08:00:00"},
            {value: avg_temp-32, date: "2013-07-10T09:00:00"},
            {value: avg_temp-22, date: "2013-07-10T10:00:00"},
            {value: avg_temp-17, date: "2013-07-10T11:00:00"},
            {value: avg_temp-12, date: "2013-07-10T12:00:00"},
            {value: avg_temp+3, date: "2013-07-10T13:00:00"},
            {value: avg_temp+14, date: "2013-07-10T14:00:00"},
            {value: avg_temp+19, date: "2013-07-10T15:00:00"},
            {value: avg_temp+15, date: "2013-07-10T16:00:00"},
            {value: avg_temp+10, date: "2013-07-10T17:00:00"},
            {value: avg_temp+03, date: "2013-07-10T18:00:00"},
            {value: avg_temp-7, date: "2013-07-10T19:00:00"},
            {value: avg_temp-12, date: "2013-07-10T20:00:00"},
            {value: avg_temp-27, date: "2013-07-10T21:00:00"},
            {value: avg_temp-29, date: "2013-07-10T22:00:00"},
            {value: avg_temp-18, date: "2013-07-10T23:00:00"},
            {value: avg_temp-14, date: "2013-07-11T00:00:00"}
        ]
      ],
      weather_tomorrow_peak_f = [
        [
            {value: null, date: "2013-07-10T03:00:00"},
            {value: null, date: "2013-07-10T04:00:00"},
            {value: null, date: "2013-07-10T05:00:00"},
            {value: null, date: "2013-07-10T06:00:00"},
            {value: null, date: "2013-07-10T07:00:00"},
            {value: null, date: "2013-07-10T08:00:00"},
            {value: null, date: "2013-07-10T09:00:00"},
            {value: null, date: "2013-07-10T10:00:00"},
            {value: null, date: "2013-07-10T11:00:00"},
            {value: avg_temp-12, date: "2013-07-10T12:00:00"},
            {value: avg_temp+3, date: "2013-07-10T13:00:00"},
            {value: avg_temp+14, date: "2013-07-10T14:00:00"},
            {value: avg_temp+19, date: "2013-07-10T15:00:00"},
            {value: avg_temp+15, date: "2013-07-10T16:00:00"},
            {value: avg_temp+10, date: "2013-07-10T17:00:00"}
        ]
      ],
      today_args = {
        data:
          [
            {
              series:weather_today_f,
              options: {
                maxYValue: 100,
                minYValue: 50,
                type:'line',
                fillLines:true
              }
            },
            {
              series:weather_today_peak_f,
              options: {
                maxYValue: 100,
                minYValue: 50,
                type:'line',
                fillLines:true
              }
            }
          ],
        options: {
          showEvery: 3,
          labelWidth: 10,
          dates : {
              format: 'h a'
          },
          colors: ['#fff', '#fff'],
          grid : {
              show: false,
              numYLabels : 6,
              numXLabels : 6,
              baseLineColor : '#00a5e3'
          },
          axes: {
            y1: {
              unit:'&deg;',
              topUnit:"&deg;"
            }
          },
        lines : {
            width : 3,
            fillOpacity :0.3,
            fillColor : '90-#00a5e3-#00658f'
          },
        padding: {top:0, right:-30, bottom:0, left:-30}
      }
    },
      tomorrow_args = {
        data:
          [
            {
              series:weather_tomorrow_f,
              options: {
                maxYValue: 100,
                minYValue: 50,
                type:'line',
                fillLines:true
              }
            },
            {
              series:weather_tomorrow_peak_f,
              options: {
                maxYValue: 100,
                minYValue: 50,
                type:'line',
                fillLines:true
              }
            }
          ],
        options: {
          showEvery: 3,
          labelWidth: 10,
          dates : {
              format: 'h a'
          },
          colors: ['#fff', '#fff'],
          grid : {
              show: false,
              numYLabels : 6,
              numXLabels : 6,
              baseLineColor : '#00a5e3'
          },
          axes: {
            y1: {
              unit:'&deg;',
              topUnit:"&deg;"
            }
          },
        lines : {
            width : 3,
            fillOpacity :0.3,
            fillColor : '90-#00a5e3-#00658f'
          },
        padding: {top:0, right:-30, bottom:0, left:-30}
      }
  };

function buildGraph($container, args) {

  var graph = elroi(
      $container,
      args.data,
      args.options,
      false
    );
  };


if ($('#module-today').length > 0) {
  buildGraph($('#module-today .elroiGraph'), today_args);
};

