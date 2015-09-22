/* 
  Title: switcher.js
  Purpose - Big, complex switching for screens where multiple inputs point to a single set of elements (energyuse-details)
  Author - Doug Avery, Viget Labs
*/

$.fn.getValue = function(prepend){

  /*
     Function: $.fn.getValue
     
     Gets the value of a radio button and returns it with an optional prepended string

     Parameters:
       prepend - string to add
  */

  if( ! ( $(this).is('input[type=radio]') && $(this).is(':not(:checked)') || $(this).is('ul') ) ) {
    return prepend + $(this).val();
  } else if ( $(this).is('ul') ) {
    return prepend + $(this).find('.here a').attr('data-switchValue');
  } else {
    return '';
  }
}

triggerChoose = function(obj){

  /*
    Function: triggerChoose
    
    Triggers the "choose" event, used in the multi-switcher

    Parameters:
      obj - DOM object to trigger event on
  */

  $(obj).trigger('choose');
}

refreshSwitch = function(pointers, $set){
  /*
    Function: refreshSwitch
    
    Gets all the points, grabs their values, converts them to classes, then performs the toggle operation

    Parameters:
      pointers - all the elements (links, selects, etc) that point to this switcher
  */

  var classes = '',
    $toSwitch;
  $(pointers).each(function(){
    classes += $(this).getValue('.');
  });

  $('.multiSwitcher').attr('data-switchClasses',classes);

  $toSwitch = $set.find(classes);
  if ( $toSwitch.length === 0 ){
    $('.toggler-default').toggler('siblings');
  } else {
    $toSwitch.each(function(){
      if ( $(this).is(':hidden') ) {
        $(this).toggler('siblings');    
      }
      // create a graph
      if ($(this).find('.elroiGraph') && !$(this).find('.elroiGraph').hasClass('elroi')) {
        if (typeof buildGraph == 'function') {
          var $container = $(this).find('.elroiGraph'),
              args = $container.attr('data-graph_arguments'),
              url = $container.attr('data-graph_url');
          // fix this, dumbshit. why is it firing twice?
          if (args) {
            history.pushState(url,null,url) 
            buildGraph($container,eval(args));
          }
        }
        if (typeof animateGraph == 'function') {
          animateGraph();
        }
      }
    });
  }
}

$.fn.multiSwitch = function(){

  /*
    Function: $.fn.multiSwitch 
    
    Bind the "refreshSwitch" function to any changes on the pointers
  */
  
  return this.each(function(){
        
    var $set = $(this),
        target = $(this).attr('data-switchSet'),
        $pointers = $('[data-target="' + target + '"]'),
        $pointersExtended = $pointers.add($pointers.find('option'));
        
    refreshSwitch($pointers, $set);
    
    $pointersExtended.superBind(triggerChoose).each(function(){
      $(this).bind('choose',function(e){
        refreshSwitch($pointers, $set);
      });
    });
    
  }); 
  
}

astro.content.switcher = function( scope ){

  
  /*
    Function: astro.content.piechart
    
    Scoped setup call, trigger switching behavior on elements inseuo the scope

    Parameters:
      scope - element to look for charts in
  */

  $( '.multiSwitchMe', scope ).multiSwitch();
  
}
