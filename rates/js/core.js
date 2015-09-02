/*
  Title: core.js
  Purpose - Set up internal methods/vars required on all pages
  Author - Doug Avery, Viget Labs
*/

/* Group: Initalize */

  /*
     Constant: astro

     Global scope for all variables/methods
  */
  window.astro = window.astro || {};

  /*
     Constant: astro.content

     Object full of big, functions full of selectors and chained methods
     Used in document.ready and on AJAX responses
  */
  astro.content = {};


/* End  */

/* Group: Prototype modifications */

  Array.prototype.average = function() {
    /*
       Function: array.prototype.average

       Arrays of integers need to be averages in some graphs

       See Also:
         <Original implementation at http://javascript.about.com/library/blaravg.htm>
    */
    var av = 0,
        cnt = 0,
        len = this.length;
    for (var i = 0; i < len; i++) {
      var e = +this[i];
      if(!e && this[i] !== 0 && this[i] !== '0') e--;
      if (this[i] == e) {av += e; cnt++;}
    }
    return av/cnt;
  };

/* End  */

/* Group: Utility methods */

  astro.content_init = function( callback, scope ){
    /*
       Function: astro.content_init

       Wraps a number of methods and takes a scope.
       This allows us to re-call a kind of document.ready after AJAX updates

       Parameters:
         scope - The DOM elements to execute content-init inside of. Leave blank for window
         callback - Big anonymous function, contains all the document.ready bindings.
                    Optionally takes a string, which finds a function in astro.content

        See also:
          <astro.content>
    */

    var
      scope = astro.content_init._get_appropriate_scope( scope ),
      callback_is_all = ( callback == 'all' || this === document ),
      callback_is_string = ( ! callback_is_all && typeof ( callback ) == 'string' );

    if ( callback_is_string && callback_is_all == false ) {
      callback = astro.content[ callback ] || function(){};
    }

    if ( callback_is_all ) {
      var callback_array = astro.content_init._get_all_content_callbacks( callback_array );
    } else {
      var callback_array = [ callback ];
    }

    astro.content_init._execute_all_callbacks(
      callback_array,
      scope
    );

  }

  astro.content_init._get_appropriate_scope = function( scope ){
    /*
       Function: astro.content_init._get_appropriate_scope

       Gets the scope for content_init to execute with

       Parameters:
         scope - Optional, the scope originally passed by a function

       Returns:
          Either a jQuery object or null
    */
    if ( scope === undefined || scope === null ) {
      return null;
    } else {
      return $( scope );
    }
  }

  astro.content_init._get_all_content_callbacks = function() {
    /*
       Function: astro.content_init._get_all_content_callbacks

       Parses astro.content and returns all the content callbacks specified in it

       Returns:
          Array full of callbacks
    */
    var callback_array = [];

    for ( var key in astro.content ) {
      callback_array.push( astro.content[ key ] );
    }

    return callback_array;

  }

  astro.content_init._execute_all_callbacks = function( callback_array, scope ) {
    /*
       Function: astro.content_init._execute_all_callbacks

       Parameters:
         callback_array - Array full of content callbacks
         scope - The scope to execute callbacks with

       Fire off all the callbacks in the callback_array
    */
    for ( var callback in callback_array ) {
      callback_array[ callback ]( scope );
    }
  }

  astro.get_root = function(){
    /*
       Function: astro.get_root

       Gets the root (http://proto.opower.com/astro/) of the app

       Returns:
         Full path to the root directory

       See also:
         <astro.root>
    */

    return $('#getRoot').text() + '/';

  }

  astro.get_states = function(){
    /*
       Function: astro.get_states

       Parse on-page JSON into a JS copy of the session

       Returns:
         Object with keys and values from the session

       See also:
         <astro.states>
    */
    var
      states = {},
      states_from_JSON = $.parseJSON( $('#states').text() );

    for( key in states_from_JSON ){
      states[key] = astro.toPrimitive( states_from_JSON[key] );
    };

    return states;

  }

  astro.wait = function( fn, delay ){
    /*
       Function: astro.wait

       Delays the execution of a function

       Parameters:
         fn - The function
         delay - The time (in ms) to wait
    */
    waitTimer = window.setTimeout( fn, delay );
  };

  astro.simpleToString = function( futureString ){
    /*
       Function: astro.toSring

       Returns element as string

       Parameters:
         futureString - What you want stringified
    */
    return '' + futureString;
  };

  astro.toPrimitive = function( string ){
    /*
       Function: astro.toPrimitive

       Converts a string to a more appropriate primitive variable (boolean, integer, etc)
       > value = astro.toPrimitive('true');
       > alert( value === true ) // alerts true

       Parameters:
         string - String to be converted

       Returns:
         A primitive variable
    */
    switch (string){
      case 'true':
        return true;
      case 'false':
        return false;
      case 'null':
        return null;
      case '':
        return undefined;
      case toString( parseFloat(string) ):
        return parseFloat(string);
      default:
        return string;
    }
  };

/* End */

/* Group: Globals */

  astro.text_before_and_afters = {
    /*
       Constant: astro.text_before_and_afters

       Used when changing text on links/buttons to provide feedback

       See Also:
         <astro.textChange>
    */
    "OK, I'll Do It"                     : "Added to your plan",
    "I'll Do It"                         : "Added",
    "I've Done It!"                      : "Completed",
    "I already do it"                    : "Done",
    "Already do it"                      : "Done",
    "Did it"                             : "Done",
    "No thanks"                          : "Tip skipped",
    "Skip this one"                      : "Tip skipped",
    "(details)"                          : "(hide)",
    "I\'m interested in the program"     : "Thanks for expressing interest!",
    "Add Tips to My Plan"                : "Added to your plan",
    "See details"                        : "Hide details",
    "Undo & add this tip to my plan"     : "Added to<br />your plan"
  };

  astro.states = astro.get_states(
    /*
       Constant: astro.states

       Key/value copy of the user's session, used on the config page

       See Also:
         <astro.get_states>
    */
  );

  astro.root = astro.get_root(
    /*
       Constant: astro.root

       The root URL (http://proto.opower.com/astro/), used in some AJAX calls

       See Also:
         <astro.get_root>
    */
  );

  astro.optionsHaveClicks = $('body').hasClass('webkit') === false;
  /*
     Constant: astro.optionsHaveClicks

     Whether or not option elements support click events

     See Also:
       <astro.detect_option_click_support>
  */

$.fn.getLocalData = function(){

  /*
    Function: $.fn.getLocalData

    Use local storage to pull display a user-entered image
    Used for profiles, pictures, client logos
  */

  return this.each(function(){

    var $img      = $(this),
        storageId = $img.attr('data-fileId'),
        alt       = $img.attr('data-fileAlt'),
        src       = localStorage.getItem( storageId );
    src       = ( src ) ? src : alt;

    $img.attr( 'src', src );

  });

};

$(function(){

  $('.getLocalData').getLocalData();

});

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

  console.log(data)

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


  $('input.switchState[type="text"], textarea.switchState').bind('focus blur keypress', function(){
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

/*
  Title: tipactions.js
  Purpose - Add, remove, and complete tips. Optionally fire off social messages.
  Author - Doug Avery, Viget Labs
*/

/* @group core functions */

  astro.sendTip = function( $this, data ){
    /*
       Function: astro.sendTip

       Send a tip action to the handler for processing

       Parameters:
         $this - the DOM object of the clicked element
         data - key/value pairs
           data.action - action to complete with the tip. Options: completed, added, removed, ignored
           data.slug - tip slug, like "maintain-ac"

       Returns:
         HTML from the AJAX response (for testing purposes)
    */
    var
      href   = $this.attr('href'),
      type   = $this[0].nodeName.toLowerCase(),
      $link  = ( type === 'a' || type === 'input') ? $this : $this.closest('a');

    $.ajax({
      type:       'post',
      url:        astro.root + 'index.php?tip',
      data :      data,
      timeout:    5000,
      success: function(html){

        if ( type == 'a' && href != '#' ){
          window.location.href = href;
        } else if ( type == 'button' ) {
          $this.closest('form').submit();
        }

        if ( $this.hasClass('move') ){
          if(data.action == 'completed'){
            $link.addClass('tip-hascheckbox-completed');
          } else {
            $link.removeClass('tip-hascheckbox-completed');
          }
          $link.detach();
          $('#tips-' + data.action).append($link);
        }

        return html;
      }
    });

  }

/* @end */

/* @group direct tip actions */

  astro.tipAction = function( event ){
    /*
       Function: astro.tipAction

       Complete a 'tip action' based on a link clicked by the user inside a tip div

       Parameters:
         event - passed in from the click event
    */

    var
      $this  = $(event.target),
      $tip   = $this.closest('.tip'),
      url    = astro.root + $tip.attr('href'),
      data   = {
        action : $this.attr('data-tipAction'),
        slug   : $tip.attr('id').replace('tip-', '')
      },
      $tipaction_set = $this.parent(),
      actiontoshow = ( data.action === '') ? 'default' : data.action,
      $newtipaction_set = $tipaction_set.siblings('.tipactions-' + actiontoshow);

    $tipaction_set.removeClass('show');
    $newtipaction_set.addClass('show');

    astro.sendTip( $this, data );

    if ( data.action == 'add' && $this.data('clicked') != true && ( astro.states.twitter_tip || astro.states.facebook_tip ) ){
      $this.data('clicked', true)
      astro.social('I just pledged to complete the tip "' + $hd.text() + '". Read more: ', 'tip', url);
    }

    return false;

  }

  $('span[data-tipAction]').live('click', astro.tipAction);

  $('span[data-tipAction]').live('mouseover', function(){
    $(this).closest('.tip').addClass('nothovered');
  });

  $('span[data-tipAction]').live('mouseout', function(){
    $(this).closest('.tip').removeClass('nothovered');
  });

/* @end */

/* @group tip modifications */

  astro.modifyTip = function( $this ){
    /*
       Function: astro.modifyTip

       Modify a tip based on data- attributes from the target element

       Parameters:
         $this - the DOM object of the clicked element
    */
    var
      data   = {
        action : $this.attr('data-tipModify'),
        slug   : $this.attr('data-tipToModify')
      };

    astro.sendTip( $this, data );

  }

  astro.modifyTip.fromLinkOrButton = function(event){
    /*
       Function: astro.modifyTip.fromLinkOrButton

       Modify a tip when a simple element is clicked

       Parameters:
         event - passed in from the click event
    */

    if ( $(this).get(0).nodeName.toLowerCase() !== 'input' ){
      event.preventDefault();
    };

    astro.modifyTip( $( event.target ) );

  }

  $('a[data-tipModify], input[data-tipModify], button[data-tipModify]')
    .live('click', astro.modifyTip.fromLinkOrButton );


  astro.modifyTip.fromSelect = function(){
    /*
       Function: astro.modifyTip.fromSelect

       Modify a tip when a select element is used
    */
    var
      $this   = $(this),
      $parent = $this.parent();

    if ( ! $parent.data('change-is-bound') ) {

      $parent.data('change-is-bound', true);

      $parent.bind('change', function( event ){
        astro.modifyTip( $(event.target).find('option:selected') );
      });

    }

  }

  $('option[data-tipModify]').each( astro.modifyTip.fromSelect );

/*
  Title: screen.js
  Purpose - Misc. functions that run on every page; global live-bound methods
  Author - Doug Avery, Viget Labs
*/

/* Group: jQuery plugins */

  $.fn.relate = function(){
    /*
       Function: $.fn.relate

       Makes an element position:relative, if necessary

       Returns:
         Original object
    */
    return this.each( function(){
      if ($(this).css( 'position' ) == 'static' ){ $(this).css( 'position','relative' ); }
    });
  };

  $.fn.ajaxState = function(set){
    /*
       Function: $.fn.ajaxState

       Triggers a simple effect while waiting for an ajax response

       Returns:
         Original object
    */
    $(this).each( function(){
      if( set == false ) {
        return $(this).fadeTo(500,1);
      } else {
        return $(this).fadeTo(500,.5);
      }
    });
  };

  $.fn.zzTop = function(levels){
    /*
       Function: $.fn.zzTop

       Move an element up in the z-index stack

       Scope:
         Only runs on single DOM object

       Parameters:
         levels - How many levels to ascend while changing z-index

       Returns:
         Original object
    */
    levels--;
    if(levels >= 0){
      $(this).relate().css( 'zIndex','1' ).parent().zzTop(levels);
    }
    return this;
  };

  $.fn.actsAsLink = function(){
    /*
       Function: $.fn.actsAsLink

       Use "data-link" as the url of an item, and send users to a new page on click

       Returns:
         Original object
    */
    return $(this).click( function(){
      window.location = $(this).attr( 'data-link' );
    });
  };

  $.fn.actsAsLinkList = function(){
    /*
       Function: $.fn.actsAsLinkList

       Adds click handlers to option elements
    */
    return this.each(function(){

      if ( astro.optionsHaveClicks === false ) {

        var $this = $(this);

        $this.bind('change', function(){

          var val = $this.val(),
            $option = $this.find('option[value=' + val + ']');

          $option.trigger('click');

        });

      }

    });

  };

  $.fn.toggleText = function(attr){
    /*
       Function: $.fn.toggleText

       On click, toggle text between the tag's text and the value of an attribute

       Parameters:
         attr - which attribute to draw the new text from

       Returns:
         Original object
    */
    return $(this).each( function(){
      var $t = $(this),
          e  = ( $t.is( 'input[type=radio]' ) ) ? 'change' : 'click',
          o  = $t.text(),
          n  = $t.attr(attr) || o;
      $(this).bind(e, function(){
        $t.text( ( $t.attr(attr) != $t.text() ) ? n : o );
      });
    });
  };

  $.fn.toggleTarget = function(mode){
    /*

       Function: $.fn.toggleTarget
       Flip an element on or off using fn.toggler

       Parameters:
         mode - 'siblings' denotes that a target's siblings are also toggled

       See also:
         <$.fn.toggleFromData>
         <$.fn.toggler>

       Returns:
         Original object

    */
    return $(this).each( function(){
      var eventType = this.nodeName.toLowerCase() === 'select' ? 'change' : 'click';
      $(this).bind( eventType, function(){
        $(this).toggleFromData(mode);
      });
    });
  };

  $.fn.toggleFromData = function(mode){
    /*
       Function: $.fn.toggleFromData

       Toggles an element based on its data- attributes

       Parameters:
         mode - 'siblings' denotes that a target's siblings are also toggled

       See also:
         <$.fn.toggleTarget>
         <$.fn.toggler>

       Returns:
         Original object
    */
    var $t = $(this),
        t  = $t.attr( 'data-toggleTarget' ) || $t.attr( 'href' ),
        showOnly = ( $t.attr( 'data-showOnly' ) == 'true' );

    $target = $(t);

    $target.toggler(mode, showOnly);

    // One-way toggles
    $( $t.attr( 'data-toggleOn' )  + ':hidden' ).not($target).fadeIn().trigger( 'appear' );
    $( $t.attr( 'data-toggleOff' ) + ':visible' ).not($target).fadeOut();

    return ( ! this.tagName == 'A' );

  };

  $.fn.toggler = function(mode, showOnly, force){
    /*
       Function: $.fn.toggler

       Flips an element on and off, hiding siblings if mode is specified

       Parameters:
         mode - 'siblings' denotes that a target's siblings are also toggled
         showOnly - if set to true, toggler will never hide the target
         force - if set to true, forces the target to toggle, even if siblings are hidden

       See also:
         <$.fn.toggleTarget>
         <$.fn.toggleFromData>

       Returns:
         Original object
    */
    return $(this).each( function(){
      var $t = $(this);

      if( $t.is( ':hidden' ) ) {
        if( mode == 'siblings' && ( $t.siblings( ':visible' ).length != 0 || force ) ) {
          $t.parent().css( 'height', $t.parent().height() );
          $t.siblings( ':visible:not(:animated)' ).each( function(i){
            $(this).show( 0, function(){
              $(this).hide().trigger( 'hide' );
              if ( i == 0 ) {
                $t.show()
                  .trigger( 'appear' )
                  .find( '.appear' )
                  .trigger( 'appear' );
              }
              $t.parent().css( 'height', 'auto' );
              $t.siblings().hide();
            });
          })
        } else {
          $t.show()
            .trigger( 'appear' )
            .find( '.appear' )
            .trigger( 'appear' );
        }
      } else {
        if( ! showOnly )
          $t.hide();
      }

    });
  };

  $.fn.tabbed = function(content,hereClass){
    /*
       Function: $.fn.tabbed

       Turn two lists into tabs

       Parameters:
         content - selector for the "content" parts of a tab structure
         hereClass - the class to apply to tabes

       Returns:
         Original object

    */
    var here = (hereClass == '' ) ? 'here' : hereClass;
    return $(this).each( function(){
      var $tabs = $(this),
          $content = $tabs.nextAll(content);
      $tabs.find( 'li:first-child' ).addClass(here);
      $content.children( ':not(:first-child)' ).hide();
      $tabs.find( 'a' ).click( function(){
        $p = $(this).parent();
        if ($p.is( ':not(.' + here + ' )' )){
          var t = $(this).attr( 'href' );
          $p.addClass(here).siblings( '.' + here).removeClass(here);
          $content.children( ':visible' ).fadeOut(1, function() {
            $(t).fadeIn( 'fast' );
          });
        }
        return false;
      });
    });
  };

  $.fn.superBind = function( fn){
    /*
       Function: $.fn.superBind

       Binds fn effectively to both links and selects

       Parameters:
         fn - Function to trigger on click/change/etc

       See also:
         <$.fn.multiSwitch>

       Returns:
         Original object
    */
    return $(this).each( function(){
      var $t = $(this);
      if ( $t.is( 'select' ) ) {
        $t.bind( 'change',function(){
          $t.find( ':selected' ).each( function(){
            fn($t);
          });
        });
      } else if ( $t.is( 'input[type="text"]' ) ) {
        $t.bind( 'keypress focusout',function(e){
          if ( ( e.type == 'keypress' && e.keyCode == 13 ) || ( e.type != 'keypress' ) ){
            fn($t);
          }
        });
      } else if ( $t.is( 'ul' ) ) {
        $t.find( 'a' ).bind( 'click',function(){
          fn($t);
        });
      } else {
        $t.bind( 'click',function(){
          fn($t);
        })
      }
    })
  };

  $.fn.getOpts = function(){

    /*
       Function: $.fn.tabbed

       Turn a series of "data" attributes into a usable object

       See also:
         <$.fn.drawLineGraph>

       Returns:
         Object with key/value pairs for all found data
    */

    var nodes = [], values = [], returnData = {};

    $.each( this[0].attributes, function(i){
      nodes.push(this.nodeName);
      values.push(this.nodeValue);
    });

    $.each( nodes, function(i){
      var val;
      if ( this.indexOf( 'data-' ) != -1){
        if ( values[i].indexOf(",") != -1 ){
          val = [];
          $.each( values[i].split(","), function(i){
            val[i] = astro.toPrimitive( this.slice( 1, this.length - 1 ) );
          });
        } else {
          val = astro.toPrimitive( values[i] );
        }
        returnData[ nodes[i].substring(5) ] = val;
      }
    });

    return returnData;

  };

  $.fn.showTooltipDescription = function(options){

    return $(this).each(function(){

      var $this = $(this),
        defaults = {
          descriptionhtml : $this.find('.tooltipdescription').html(),
          href : $this.attr('href'),
          addClass : ''
        },
        config = $.extend(defaults, options),
        //$overlayelement = $('<div class="tooltip-overlay ' + config.addClass + '">' + config.descriptionhtml + '<span class="tooltiparrowwrapper"><span class="tooltiparrow"></span></span></div>'),
        $overlayelement = $('<div class="tooltip-overlay ' + config.addClass + '">' + config.descriptionhtml + '</div>'),
        $container = $(this).closest('.module'),
        $overlay,
        intentTimeout,
        mouseOutTimer = function(){
          intentTimeout = setTimeout(function(){
            $overlay && $overlay.remove();
          }, 500);
        },
        mouseInTimer = function(){
          clearTimeout(intentTimeout);
        };

      if($container.length === 0 ){
        $container = $('body');
      }

      if(config.href){
        $overlayelement.find('p')
          .eq(0)
          .append("<a href='" + config.href + "'>more</a>");
      }

      $this.hover(function(){

        $('.tooltip-overlay').remove();

        clearTimeout(intentTimeout);
        var width = ( $this.outerWidth() > 400 ) ? 400 : $this.outerWidth(),
          rightpositioning = $this.offset().left + width + 25,
          leftpositioning = $this.offset().left - 290,
          top = (($this.offset().top) + ( $this.outerHeight() / 2)),
          isCloseToLeftSide = ( $this.offset().left - 250 ) > $container.offset().left,
          positioning = ( isCloseToLeftSide ) ? leftpositioning : rightpositioning;

       // top = (config.top) ? config.top() : top,
        positioning = (config.left) ? config.left() : positioning;
        isCloseToLeftSide = (config.isCloseToLeftSide) ? config.isCloseToLeftSide() : isCloseToLeftSide;

        $overlay = $overlayelement.css({
          'top' : top,
          'left' : positioning
        }).appendTo('body').hover(mouseInTimer, mouseOutTimer);
        $overlay.css({top: top - ($('.tooltip-overlay').outerHeight()/2)})
        if(isCloseToLeftSide){
          $overlay.addClass('leftside');
        } else {
          $overlay.removeClass('leftside');
        }
      }, mouseOutTimer);

    });

  };

  $.fn.colorAlert = function( text, callback, duration, width, height, windowClass ){

    /*
       Function: $.fn.colorAlert

       Brief 'loading' overlay

       Parameters:
         text - Text in the colorbox
         callback - Callback to fire when box disappears
         duration - Time the colorbox is on screen
         width - Width of colorbox
         height - Height of colorbox
         windowClass - Class to apply to the colorbox
    */

    var text        = text || $(this).attr( 'data-loadText' ),
        windowClass = (windowClass) ? windowClass : '',
        height      = (height) ? height : 60,
        width       = (width) ? width : 420;

    $.fn.colorbox({
      'html' : '<p class="large ' + windowClass + '"><strong>' + text + '</strong></p>',
      'transition'    : 'none',
      'width'         : width,
      'height'        : height,
      'overlayClose'  : false,
      'opacity'       : '.85',
      'onLoad'         : function(){
        $( '#cboxClose' ).hide();
      }
    });

    astro.wait( function(){
     $.fn.colorbox.close();
     callback && callback();
    }, duration );

  };

  $.fn.getLocalData = function(){
    /*
       Function: $.fn.getLocalData

       Retrieve image data from the local storage

       Returns:
         Original object
    */
    return this.each( function(){

      var $img      = $(this),
          storageId = $img.attr( 'data-fileId' ),
          alt       = $img.attr( 'data-fileAlt' ),
          src       = localStorage.getItem( storageId ),
          src       = ( src ) ? src : alt;

      $img.attr( 'src', src );

    });

  };

/* End */

/* Group: Helper Functions */

  astro.postFakeFB = function() {
    /*
      Function: astro.postFakeFB
      Post a fake message to the Facebook comment list

      Parameters:
        none
    */

    $('.fb-comments-submit button').click(function(e) {

      var $this = $(this),
        $parent = $this.closest('.fb-post-comment'),
        $comment = $parent.find('textarea'),
        $avatar = $parent.find('img').attr('src'),
        $post = '<div class="fb-comment cf"><img src="' + $avatar + '" height="50" width="50" /><a href="#" class="fb-comment-name">Bob Smith</a><div class="fb-comment-text">' + $comment.val() + '</div><p class="fb-comment-tools"><a href="#">Like</a> <sup>.</sup> <a href="#">Comment</a> <sup>.</sup> Just now</p></div>';

      console.log($avatar);
      $comment.val('');
      $parent.next().prepend($post);

    });
  };

  astro.social = function(message, type, link, callback){
    /*
      Function: astro.social
      Post a message to Facebook or Twitter

      Parameters:
        message - The message to send
        type - 'tip' or 'goal', affects formatting in the handler
        link - Link to post
        callback - Fires when pos is successful
    */
    $.fn.colorAlert( 'Sending...', null, 10000, 200, 55, 'ajaxLoading' );

    var data = {};

    data.message = message;
    data.type    = type;
    data.link    = link;

    $.ajax({
      type:       'post',
      url:        astro.root + 'index.php?social',
      data :      data,
      timeout:    10000,
      success:    function(html){
        if(html != '' ){
          $.fn.colorAlert(html, null, 1500, 360, 85, 'socialWindow' );
        }
        callback && callback();
      },
      error:      function(){
        $.fn.colorAlert( 'Sorry, an error has occurred', null, 1500, 360, 85, 'socialWindow' );
      }
    });

  };

/* End */

/* Group: Live-bound methods */

  /* Group: Colorbox */

    astro.showColorbox = function( event ){
      /*
        Function: astro.showColorbox

        Display a modal box with custom width/height.
        Uses the link's href attribute to select the content to be boxed

        Depends:
          jquery.colorbox.js

        Parameters:
          event - passed in from the click event
      */
      event.preventDefault();

      $t = $( event.currentTarget );
      width  = ( $t.attr( 'data-width' ) == undefined) ? '580px' : $t.attr( 'data-width' );
      height = ( $t.attr( 'data-height' ) == undefined) ? '' : $t.attr( 'data-height' );
      data_class = ( $t.attr( 'data-boxclass' ) == undefined) ? '' : $t.attr( 'data-boxclass' );

      $.fn.colorbox({
        'inline'        : 'true',
        'href'          : $t.attr( 'href' ),
        'initialWidth'  : width  - 40 + 'px',
        'initialHeight' : height - 40 + 'px',
        'width'         : width       + 'px',
        'height'        : height      + 'px',
        'boxClass'      : data_class,
        'opacity'       : '.85'
      });

    };

    astro.hideColorbox = function(){
      /*
        Function: astro.hideColorbox

        Hide any open colorbox overlay

        Depends:
          jquery.colorbox.js
      */

      $.fn.colorbox.close();
    }

    $( 'a.colorbox' ).live( 'click', astro.showColorbox);

    $( 'a.colorbox-close' ).live( 'click', astro.hideColorbox);

  /* End */

  /* Group: Graphs */

    astro.showGraphs = function( event ) {
      /*
        Function: astro.showGraphs

        Show and animate graph bars

        Parameters:
          event - passed in from the 'appear' event
      */
      $( event.target ).find( '.graph-mask' ).each( function(i){
        var orientation = ( $(this).hasClass( 'graph-mask-vert' ) ) ? 'vert' : 'horiz',
            settings = {
              width     : (orientation != "vert") ? "0" : "auto",
              height    : (orientation == "vert") ? "0" : "auto",
              left      : (orientation != "vert") ? "+=" + $(this).width()  + "px" : "auto",
              top       : (orientation == "vert") ? "+=0px" : "auto"
            };
        $(this).data( "style", $(this).attr("style") )
          .fadeTo( (i*100), 1)
          .animate(settings, 700);
      });
    }

    astro.hideGraphs = function( event ){
      /*
        Function: astro.hideGraphs

        Hide graphs, reseting bar positions for re-animation later

        Parameters:
          event - passed in from the 'hide' event
      */
      var $this = $( event.target );
      $this.find( '.graph-mask' ).each( function(){
        $this.attr( "style", $this.data("style") );
      });
    }

    $( '.graph' ).live( 'appear', astro.showGraphs);

    $( '.graph' ).live( 'hide', astro.hideGraphs);

  /* End */

  /* Group: Misc. Link Methods */

    astro.preventDefault = function(event){
      /*
        Function: astro.preventDefault

        Stop links to # from scrolling up

        Parameters:
          event - passed in from the click event
      */
      event.preventDefault();
    }

    astro.textChange = function(event){
      /*
        Function: astro.textChange

        Instant fake feedback; on click, check the links's text
        against the textChange constant and replace the text if necessary

        Parameters:
          event - passed in from the click event
      */
      var $this = $( event.target );

      if(! $this.hasClass( 'noChange' ) ){
        for (t in astro.text_before_and_afters) {
          if ( $this.text().toLowerCase()  == t.toLowerCase() ){
            $this
              .html(astro.text_before_and_afters[t])
              .addClass( 'textChanged' );
          }
        }
      }
    }

    $( 'a[href=#]' ).live( 'click', astro.preventDefault);

    $( 'a' ).live( 'click', astro.textChange);

  /* End */

/* End */

/* Group: Content */

  astro.content.screen = function( scope ){

    /*
      Function: astro.content.screen

      The baseline function to run on document.ready, responsible for running methods off the DOM

      See also:
        <astro.content>
        <astro.content_init>
    */

    // fix for event binding with older jQuery (http://stackoverflow.com/questions/7825448/webkit-issues-with-event-layerx-and-event-layery)
    $.event.props = $.event.props.join('|').replace('layerX|layerY|', '').split('|');

    // .tabs and .tab-content: Using hrefs to select tabs
    $( '.tabs', scope ).live( 'appear', function(){
      $( '.tabs' ).tabbed( '.tab-content','here' );
    }).tabbed( '.tab-content','here' );;

    // Remove alerts
    $( 'a.remove', scope ).click( function(event){
      event.preventDefault();
      if($(this).attr( 'data-remove' ) === undefined){
        $(this).parent().fadeTo(1000,1).fadeOut();
      } else {
        $( $(this).attr( 'data-remove' ) ).fadeTo(1000,1).fadeOut();
      }
    });

    // Begin a timer before graphs animate
    $( '.graph', scope ).filter( ':visible' ).each( function(i){
      var $g = $(this);
      setTimeout( function(){
        $g.trigger( 'appear' );
      }, i*1000);
    })

    // Tooltips
    $( '.tooltip', scope ).each( function(){
      var $t = $(this),
          $newTip;

      $t.parent()
        .addClass( 'tooltip-parent' )
        .hover( function(){

          $( '.floating-tip' ).remove();
          $newTip = $(this).find( '.tooltip' ).clone();

          $newTip.addClass( 'floating-tip' ).appendTo( 'body' ).css({
            'top'     : $t.parent().offset().top + $t.parent().outerHeight() + 10,
            'left'    : $t.parent().offset().left,
            'opacity' : '.01',
            'display' : 'block' })
          .fadeTo(500, 1);
        }, function(){
          $newTip.animate({
            'opacity' : 0
          }, function(){
            $newTip.remove();
          });
        });
    });

    // Profile drop-down
    $( '#profile-expand', scope ).click( function(){
      $( '#profile' ).toggleClass( 'open' ).toggleClass( 'closed' );
    });

    // Toggle Functions (example: <a href="#" class="toggleInGroup" data-toggleTarget=".tab">)
    $( '.toggleTarget', scope ).toggleTarget( 'single' );
    $( '.toggleInGroup', scope ).toggleTarget( 'siblings' );
    $( '.toggleText', scope ).toggleText( 'title' );

    // infieldLabels
    $( '.infield', scope ).inFieldLabels && $( '.infield' ).inFieldLabels();

    // Using select elements as links
    $( '.selectLink', scope ).each( function(){
      $(this).bind( 'change',function(){
        loc = $(this).find( 'option:selected' ).attr( 'value' );
        window.location = loc;
      });
    });

    // turn categories blue when clicked
    $( '.listCategories a', scope ).click( function(){
      $(this).toggleClass( 'active' );
      return false;
    });

    // block UI elements
    $( '.blocked', scope ).bind( 'click',function(){ return false; });

    // turn labels into links
    $( '.actsAsLink', scope ).actsAsLink();

    // style select boxes
    function styleSelects(){
      var $this = $(this);
      if(!$this.data('styled')){
        $this.uniform({
          selectClass: "select-parent " + $this.attr( 'class' ),
          focusClass: "select-parent-focus"
        }).hover( function(){
          $this.parent().addClass( 'hover' );
        }, function(){
          $this.parent().removeClass( 'hover' );
        });
      }
      $this.data('styled', true);
    };

    $( 'select.highlighted' )
      .each( styleSelects )
      .bind( 'appear' , styleSelects );

    $('input:not(:submit,:reset), textarea').uniform();

    // colorbox load/spinner
    $( '.colorAlert', scope ).click( function(){

      $(this).colorAlert(
        $(this).attr( 'data-loadText' ),
        null,
        1500,
        $(this).attr( 'data-alertWidth' ),
        $(this).attr( 'data-alertHeight' ),
        $(this).attr( 'data-alertClass' )
      );

    });

    // show spinner on pageload
    $( '#colorLoadAlert', scope ).each( function(){
      var $toHide = $( '.colorLoadAlertHide' );
      $toHide.each( function(){
        var $this = $(this),
            text  = $(this).html();
        $this
          .html( '---' )
          .bind( 'show', function(){
            $this.fadeTo(250, 0, function(){
              $this.html(text).fadeTo(250, 1);
            });
          });
      });
      $(this).colorAlert( $(this).html(), function(){
        $toHide.trigger( 'show' );
      }, 1500, 320, 55, 'ajaxLoading' );
    });

    // toggle ctrl-key state
     window.ctrl = false;
    $( document, scope ).bind({
      'keydown'  :  function(e){
                      if (e.keyCode == 17) {
                        window.ctrl = true;
                      }
      },
      'keyup'    :  function(e){
                      if (e.keyCode == 17) {
                        window.ctrl = false;
                      }
      }
    });

    // switch a target's class on or off
    $( '.toggleAllClasses', scope ).bind( 'click', function(e){
      e.preventDefault();
      var $this      = $(this),
          allClasses = $this.attr( 'data-toggleAllClasses' );
      if ( ! $this.hasClass( allClasses ) ) {
        $( '.' + allClasses).removeClass( allClasses );
        $this.addClass( allClasses );
      }
    });

    // HomeInfo preferences
    $( '.homeInfo', scope ).superBind( function($obj){
      var data   = {};
      data[ $obj.attr( 'name' ) ] = $obj.val();
      $obj.ajaxState();
      $.ajax({
        type:       'post',
        url:        astro.root + 'index.php?home',
        data :      data,
        timeout:    5000,
        success:    function(){
          $obj.ajaxState( false);
        }
      });
    });

    $( '.noSubmit', scope ).submit( function(e){
      e.preventDefault();
      $(this).find( '.colorbox-close' ).trigger( 'click' );
    });

    $( '.actsAsLinkList', scope ).actsAsLinkList();

    $( 'a.tip', scope ).showTooltipDescription();

    $( 'a.back', scope ).click(function(){
      history.back();
    });

    $( '.link[data-href]', scope ).click(function(event){

      window.location = $(this).attr('data-href');
      return false;

    });

    // fake FB comments
    astro.postFakeFB();

  }

/*
 * Based on Swipe 1.0 by Brad Birdsall, Prime
 * Modified by Justin Secor
 * Feb 2013
 */

window.slidePanel = function(element, options) {

    window.addEventListener('orientationchange', function(){

      $('#quick-config').css('opacity',0);
      setTimeout(function(){
        $('#quick-config').css('opacity',1);
      },500);

  });

    setTimeout(function(){
      $('#quick-config').css('opacity',1);
    },500);

  // return immediately if element doesn't exist
  if (!element) return null;

  var _this = this;

  // retreive options
  this.options = options || {};
  this.index = this.options.startSlide || 0;
  this.speed = this.options.speed || 300;
  this.callback = this.options.callback || function() {};
  this.delay = this.options.auto || 0;

  // reference dom elements
  this.element = element; // the slide pane

  this.config = false;

  // add event listeners
  if (this.element.addEventListener) {
    this.element.addEventListener('touchstart', this, false);
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
    this.element.addEventListener('touchcancel', this, false);
    this.element.addEventListener('webkitTransitionEnd', this, false);
    this.element.addEventListener('msTransitionEnd', this, false);
    this.element.addEventListener('oTransitionEnd', this, false);
    this.element.addEventListener('transitionend', this, false);
    window.addEventListener('resize', this, false);
  }

};

slidePanel.prototype = {

  pullOut: function(index, state, duration) {

    var style = this.element.style;

    // fallback to default speed
    if (duration == undefined) {
        duration = this.speed;
    }

    // fallback to default state
    if (state == undefined) {
      this.config == true ? state = 0 : state = 1;
    }

    // is the menu up or not?
    state == 1 ? this.config = true : this.config = false;

    // set duration speed (0 represents 1-to-1 scrolling)
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';

    // translate to given index position
    style.MozTransform = style.webkitTransform = 'translate3d(-'+ (state * 220) +'px, 0px,0)';

  },

  stop: function() {
    this.delay = 0;
    clearTimeout(this.interval);
  },

  resume: function() {
    this.delay = this.options.auto || 0;
    this.begin();
  },

  handleEvent: function(e) {
    switch (e.type) {
      case 'touchstart': this.onTouchStart(e); break;
      case 'touchmove': this.onTouchMove(e); break;
      case 'touchcancel' :
      case 'touchend': this.onTouchEnd(e); break;
    }
  },

  onTouchStart: function(e) {

    this.start = {

      // get touch coordinates for delta calculations in onTouchMove
      pageX: e.touches[0].pageX,
      pageY: e.touches[0].pageY,

      // set initial timestamp of touch sequence
      time: Number( new Date() )

    };

    // used for testing first onTouchMove event
    this.isScrolling = undefined;

    // reset deltaX
    this.deltaX = 0;

    // set transition time to 0 for 1-to-1 touch movement
    this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;

    e.stopPropagation();
  },

  onTouchMove: function(e) {

    this.deltaX = e.touches[0].pageX - this.start.pageX;
    this.deltaY = e.touches[0].pageY - this.start.pageY;
    // determine if scrolling test has run - one time test
    if ( typeof this.isScrolling == 'undefined') {
      this.isScrolling = !!( this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY) );
    }

    // if user is not trying to scroll vertically
    if (!this.isScrolling && e.touches.length >= 2 ) {

      // prevent native scrolling
      e.preventDefault();

      // is the menu showing already?
      if (!this.config) {
        this.deltaX = Math.max(this.deltaX, -220);
        this.deltaX = Math.min(this.deltaX, 0);
      } else {
        this.deltaX = Math.max(this.deltaX-220, -220);
        this.deltaX = Math.min(this.deltaX, 0);
      }

      // translate immediately 1-to-1
      this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(' + this.deltaX + 'px,0,0)';

      e.stopPropagation();

    } else {
      this.deltaX = 0;
    };

  },

  onTouchEnd: function(e) {

    // if not scrolling vertically
    if (!this.isScrolling && this.deltaX !== 0) {

      // determine if slide attempt triggers next/prev slide
      var isValidSlide =
            Number(new Date()) - this.start.time < 250      // if slide duration is less than 250ms
            && Math.abs(this.deltaX) > 20                   // and if slide amt is greater than 20px
            || Math.abs(this.deltaX) > 110;        // or if slide amt is greater than half the width

      this.pullOut(this.index, isValidSlide ? 1 : 0, this.speed );

    }

    e.stopPropagation();
  }

};


