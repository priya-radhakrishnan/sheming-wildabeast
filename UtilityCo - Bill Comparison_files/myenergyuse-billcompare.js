
$(document).ready(function(){

    var $billCompare = $('.billCompare'),
        $spinner = $('.spinner').eq(0),
        transNone = "-webkit-transition:none;-moz-transition:none;-ms-transition:none;-o-transition:none;transition:none;",
        transStyle2 = "-webkit-transition: opacity 0.4s;-moz-transition: opacity 0.4s;-ms-transition: opacity 0.4s;-o-transition: opacity 0.4s;transition: opacity 0.4s;",
        transStyle1 = "-webkit-transition: height 0.6s;-moz-transition: height 0.6s;-ms-transition: height 0.6s;-o-transition: height 0.6s;transition: height 0.6s;";

    animateGraph = function(){

        // reset the bar heights

        $billCompare.find('.billAmount').attr('style',transNone).css('height',60);
        $billCompare.find('h4').attr('style',transNone).removeClass('active');

        // get the proper heights of the bars, motherfucker!

        var billArray = [];
            
        $billCompare.find('.billAmount').each(function(){
            var val = $(this).attr('data-billAmount');
            billArray.push(val);
        })

        // but wait, that higher value needs to consume the entire available area. MATH TIME, BITCHES

        var x = Math.max.apply(Math,billArray), // highest value
            y = 300 / x;  // multiplier to apply to lower value
        
        setTimeout(function(){
            $billCompare.find('.billAmount').each(function(){
                var val = $(this).attr('data-billAmount');
                $(this).attr('style',transStyle1).css('height',(val*y));
            $billCompare.find('h4').addClass('active');
            })
        },600);


    }

    animateGraph();

    // toggling the graph for dual fuel
/*
    $billCompare.find('select').on('change',function(){


        var activeOption =  $(this).find(':selected').attr('value'); // selected option

        // show the spinner, animate after 1s

        if (!$billCompare.find('#billCompare-'+activeOption).hasClass('active')) {
            $spinner.show();
            setTimeout(function(){
                $billCompare.find('.billCompareMain.active').removeClass('active');
                $billCompare.find('#billCompare-'+activeOption).addClass('active');
                animateGraph();
                $spinner.hide();
            },1000)
        }
            

    })
*/

});