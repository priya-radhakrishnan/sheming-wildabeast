/* 
  Title: sessioncontrol.js
  Purpose - Group the main session-manipulation methods we use throughout Astro
  Author - Doug Avery, Viget Labs
*/

$.fn.sessionSet = function(key,value){

  /*
     Function: $.fn.sessionSet
     
     Set a key/value pair in the session

     Parameters:
       key - key to set
       value - value to set
  */

  var data   = {};
  
  if (typeof key == 'object'){    
    data = key;
  } else {
    data[ key ] = value;  
  }
    
  $.ajax({
    type:       'post',
    url:        astro.root + 'index.php?state',
    data :      data,
    timeout:    5000
  });
};


// document-ready binding ============================

$(function(){

  // Setting states on the overview page
  $('input[type="checkbox"].switchState, input[type="radio"].switchState, a.switchState').click(function(e){
  
    var $this    = $(this),
        $par     = $this.parents('li'),
        key      = $this.attr('data-key'),
        val      = $this.attr('data-value');

    if ( $.fn.openOptions ) {
      $this.openOptions(key, val);      
    }
    /*
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    } else {
      $this.removeClass('active');
    };
    */
    // Is this a field where multiple buttons can be active?
    if ($this.attr('type')!=='checkbox'){
      $this.siblings().attr('checked', '');
    } else {
      allVals = [];
      $('.switchState:checked',$par).each(function(){
        allVals.push($(this).attr('data-value'));
        });
      var val = allVals.join(' ');
    };

    // make sure we have at least one commodity selected
    if ( key == 'resources' ) {
      val = (val=='') ? 'electricity' : val;
    }
    setTimeout(function(){$this.sessionSet ( key, val );},100);
    
    if ( key == 'reset' || key == 'package' || key == 'theme' ) {
      for (var i =0; i < localStorage.length; i++) {
          localStorage.removeItem(localStorage.key(i));
      }
      astro.wait( function(){
        location.reload();
      }, 1000 );
    };
    
  });

  // checkbox session setter
  $('.checkSetSession').click(function(){
    var $this = $(this);
    if( $this.is(':checked') ){
      $this.sessionSet( $this.attr('data-key'), $(this).val() );
    } else {
      $this.sessionSet( $(this).attr('data-key'), '' );
    }

  });
  

  $('input.switchState, textarea.switchState').bind('focus blur keypress', function(){    
    var $this = $(this);
    if( $this.val() != '' ){
      $this.siblings().removeClass('active').filter('.key').css('backgroundColor','#' + $this.val() );
      $this.fadeTo(1, 1, function(){
        $this.sessionSet( $this.attr('data-key'), $(this).val() );
      });
    } else {
      $this.fadeTo(1, 1, function(){
        $this.siblings('.clearOut').addClass('active');
        $this.sessionSet( $(this).attr('data-key'), '' );
      });
    }
  });

  $('.clearOut').bind('click', function(e){

    e.preventDefault();
    
    var $this    = $(this),
        $wrapper = $this.closest('.field'),
        $target  = $( $(this).attr('data-toClear') );

    $this.addClass('active');
    $target.val('');
    
  });

  $('a.save').click(function(){
    location.reload();
  });
  
  
  // when cool-alert appears, set states in the form
  $('.setAlert').bind('appear',function(){
    $(this).sessionSet($(this).attr('data-key'),true);
  }).bind('hide',function(){
    $(this).sessionSet($(this).attr('data-key'),false);
  });
  
});
