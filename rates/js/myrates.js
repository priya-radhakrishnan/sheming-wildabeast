/* 
  Title: myrates.js
  Purpose - Displaying and updating the rate overview page
  Author - Doug Avery, Viget Labs
*/

$.fn.ajaxContentDelay = function( fn, i ){
  
  /* 
    Function: $.fn.ajaxContentDelay

    Show an ajax spinner before firing callback

    Parameters: 
      fn - callback
      i - delay
  */

  return this.each(function(){
    
    var $this       = $(this),
        highlighted = ( $this.hasClass( 'highlighted' ) ) ? 'highlighted' : '',
        markup      = '<div class="ajaxOverlay ajaxDelay ' + 
                        highlighted + 
                        '"><p>Please wait while we find the next best rate for you.</p></div>',
        $ajax       = $( markup )
                        .css({
                          'height' : $this.outerHeight(),
                          'width'  : $this.outerWidth(),
                          'top'    : $this.offset().top,
                          'left'   : $this.offset().left
                        }).appendTo('body');
            
    setTimeout(function(){
      $ajax.fadeOut(600).remove();
      fn();
    }, i )
        
  });
  
}

// document ready
$(function(){
  
  // auto-reset the questionnaire when it opens
  $('.home').click(function(){
    $('#questionnaire-1').show().siblings().hide();
  });

  $('.wizard-button').click(function(){
    $(this).closest('.row').find('.wizard-button').removeClass('active').addClass('inactive');
    $(this).closest('.questionnaire').find('.btn.right').addClass('yellow');
    $(this).removeClass('inactive').addClass('active');
  });
  
  $('.wizard-prev').click(function(){
    
    var $screen  = $(this).closest('.wizard-screen'),
        $active  = $('#wizard-1').find('.wizard-button').filter('.active'),
        skip     = $active.attr('data-wizardSkip'),
        $prev    = $(this).closest('.wizard-screen').prev();
    
        if($prev.index() == skip - 1) {
          $prev = $prev.prev();
        }
    
        $prev.toggler('siblings');    
    
  });
    
  $('.showslow').fadeTo(0, 0).each(function(i){
    
    var $this = $(this),
        time  = ( i ) * 1500;
    
    $this.ajaxContentDelay(function(){
      $this.fadeTo(600, 1);
    }, time )      
    
  });
  
  $('.wizard-finish').click(function(){
    
    // if not already adjusted, do all this stuff
    if ( ! $('.cost-number:eq(0)').hasClass('adjusted') ) {
      
      // switch headers
      $('.adjusted-header').toggler('siblings');
      
      // get the new "lowest cost" plan and visually highlight it
      var best = {
        'savings' : 0,
        '$plan' : ''
      }
      $('.savings p.adjusted').each( function(i){
        var $this = $(this),
            $parent = $this.closest('.wizard-plan'),
            currency = $this.attr('data-currency');
            
        saved = parseInt( $(this).text().replace('Save '+currency, '').replace('/yr', ''), 10 );
        if ( saved > best['savings'] ) {
          best['savings'] = saved;
          best['$plan'] = $parent;
        }
                        
      });
            
      // if there's a recommeneded item (NOT a saved on), remove its highight and give it to the new item
      var $highlighted = $('.wizard-plan.highlighted'),
          $badge = $highlighted.find('.wizard-recommend');
      if ( $highlighted.length > 0 && $badge.length > 0 ) {
        astro.wait(function(){
          $highlighted.removeClass('highlighted'); 
          best['$plan'].addClass('highlighted').append( $badge ).fadeIn();
          $('.wizard-plan').equalHeight( true );          
        }, 2000)
      }
      
      // wait, then animate the savings and cost amounts
      astro.wait( function(){
      
        $('.savings p:first-child').fadeOut();
        $('.savings p:last-child').css({
          'top' : '0px',
          'opacity' : '0'
        }).fadeTo(750, 1);
      
        $('.cost-number span').animate({
          'top' : '-=45'
        }, 750, function(){
        
          $('.savings').addClass('adjusted');
          $('.cost-number').addClass('adjusted');
        
        });      
          
      }, 1200);
      
      $.fn.sessionSet('adjusted', 'true');
    
    }
    
  });
  
});
