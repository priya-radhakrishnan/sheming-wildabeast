
$(document).ready(function(){

    var $neighborCompareGraph = $('.neighbor-compare-graph'),
        $spinner = $('.spinner').eq(0),
        transNone = "-webkit-transition:none;-moz-transition:none;-ms-transition:none;-o-transition:none;transition:none;",
        transStyle2 = "-webkit-transition: opacity 0.4s;-moz-transition: opacity 0.4s;-ms-transition: opacity 0.4s;-o-transition: opacity 0.4s;transition: opacity 0.4s;",
        transStyle1 = "-webkit-transition: width 0.6s;-moz-transition: width 0.6s;-ms-transition: width 0.6s;-o-transition: width 0.6s;transition: width 0.6s;";

    animateGraph = function(speed){

        // reset the bar heights

        $neighborCompareGraph.find('.neighborusage').attr('style',transNone).css('width',60);
        //$neighborCompareGraph.find('h4').attr('style',transNone).removeClass('active');

        // get the proper heights of the bars, motherfucker!

        var billArray = [];

        $neighborCompareGraph.find('.neighborusage').each(function(){
            var val = $(this).attr('data-neighborusage');
            billArray.push(val);
        })

        // but wait, that higher value needs to consume the entire available area. MATH TIME, BITCHES

        var y = Math.max.apply(Math,billArray), // highest value
            x = ($(".bar").innerWidth() - $(".graphFooter").innerWidth() ) / y;  // multiplier to apply to lower value

        setTimeout(function(){
            $neighborCompareGraph.find('.neighborusage').each(function(){
                var val = $(this).attr('data-neighborusage');
                $(this).attr('style',transStyle1).css('width',(val*x));
            //$neighborCompareGraph.find('h4').addClass('active');
            })
        },speed);


    }

    animateGraph(1600);
});