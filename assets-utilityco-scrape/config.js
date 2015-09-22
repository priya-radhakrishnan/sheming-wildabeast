/* 
  Title: config.js
  Purpose - Methods for the config view
  Author - Doug Avery, Viget Labs
*/

$(function(){

  configPanel = new slidePanel(document.getElementById('wrapper'));

  var hash = window.location.hash;
  if (hash == '#config') {
      $('#wrapper').addClass('configging');
  }

  $(document).keyup(function(event) {

    if( event.which === 67 && event.ctrlKey ) {
      $('#wrapper').toggleClass('configging');
    }
  });


  $('.togglePanes').click(function(e){
    
    e.preventDefault();
    
    var $button = $(this),
        $fields = $('.fields'),
        dataset = {};
    
    if ( $fields.eq(0).is(':visible') ) {
      $fields.each(function(counter){
        dataset['fieldset-' + counter] = 'hide';
        $(this).slideUp();
        $button.text('Open all');
      });      
    } else {
      $fields.each(function(counter){
        dataset['fieldset-' + counter] = 'show';
        $(this).slideDown().find('.dragTo').trigger('appear');
        $button.text('Close all');
      });            
    }
        
    $.fn.sessionSet(dataset);
        
  });

  $('.fieldset').each(function(counter){
    
    var $fieldset = $(this),
        $fields   = $fieldset.find('.fields').eq(0),
        $header   = $fieldset.find('h3'),
        key       = 'fieldset-' + counter;

    if( astro.states[key] == 'show'){
      $fields.show();
    } else {
      $fields.hide();      
    }
    
    if (counter == 0) {
      if ($fields.is(':visible')){
        $('.togglePanes').text('Close all');
      }
    }

    $header.click(function(){

      if ($fields.is(':hidden')){
        $fields.slideDown().find('.dragTo').trigger('appear');;
        $.fn.sessionSet(key, 'show');
      } else {
        $fields.slideUp();
        $.fn.sessionSet(key, 'hide');
      }

    });

  });

  $('.fieldColor-field').each(function(){

    var $wrapper    = $(this),
        isConfigPg  = ($('body').hasClass('config')) ? true : false,
        $container  = (isConfigPg) ? $('body') : $('#quick-config'),
        $picker     = $('<div class="farbtasticWrapper"></div>').appendTo($container).hide(),
        $field      = $wrapper.find('input');

    $picker.farbtastic( $field );

    $field.bind({
      'focus': function(){
        $picker.css({
          'top'     : (isConfigPg) ? $field.offset().top + 20 : $field.offset().top -100,
          'left'    : (isConfigPg) ? $field.offset().left : -216,
          'opacity' : 0,
          'display' : 'block'
        }).animate({
          'top'     : '+=20',
          'opacity' : 1        
        }, 500);
      },
      'focusout': function(){
        $picker.fadeOut(100);      
      }
    });

  });

  var drag_targets = [];
  
  $('.draggable').each(function(){

    var $this   = $(this),
        dragto  = $this.attr('data-dragto').split(' ');
    
    for ( var drag_target in dragto ) {
      if ( !drag_targets[ drag_target ] ) {
        drag_targets.push( '#switch' + dragto[ drag_target ] );
      }
    }

    $this.attr('draggable', 'true').draggable({
      'revert' : true
    });
    
  });

  $( drag_targets.join(', ') ).droppable({
    'hoverClass': 'focus',
    'drop' : function( event, ui ){
      var $this = $(this),
          slug  = $( ui.draggable ).attr( 'data-dropdata' ),
          val   = ( ' ' + $this.val() ).replace( slug, '' ).replace( '  ', ' ' ),
          text  = slug + val;
      $this.val( text ).trigger('blur');
    }
  });
  
  $('.dragTo').dragTo();  
  
  $('#query-string textarea').bind('mouseup', function(){
    $(this).select();
  });
  
  	// trigger form submit on file input change event
	$('.autoUpload').change(function(e) {
		
		var myRegExp = new RegExp(".*(\.[Jj][Ss][Oo][Nn])"),
			myVal = $(this).val();
		
		if (myRegExp.test(myVal)) {
		  $(this).closest('form').submit();
		} else {
			alert('Wrong filetype! Only JSON is valid.');
			$(this).val('');
		}
	});
  
});


// Create a drag-to area that saves images in FF's local storage
$.fn.dragTo = function(){
  
  return this.each(function(){

    var $dragArea        = $(this),
        $dragInfo        = $dragArea.find('.dragInfo'),
          $switchUpload      = $dragInfo.find('.switchUpload'),
          $dragUpload        = $dragArea.find('.dragUpload'),
          $dragUpload_file   = $dragUpload.find('input[type="file"]'),
        $img             = $dragArea.find('img'),
        $clear,
        $img             = ( $img[0] ) ? $img : $('<img />').appendTo( $dragArea), 
        storageId        = $dragArea.attr('data-fileId'),
        imageType        = /image.*/,
        hoverClass       = 'hovered',
        loadClass        = 'load',
        fullClass        = 'full';


    // binds
    $dragArea.bind({
      'dragover' : function(e){
        $dragArea.over(e);
      },
      'dragleave' : function(e){
        $dragArea.leave(e);
      },
      'drop' : function(e){
        $dragArea.drop(e);
      }
    });
    
    $switchUpload.bind('click', function(){
      $dragInfo.fadeOut();
      $dragUpload.fadeIn();
    });
    
    $dragUpload_file.change(function(){

      var files = $dragUpload_file[0].files;

      $dragArea.trigger({
        type: "drop",
        file: files[0]
      });

    });
    
    // internal methods
    $dragArea.over = function(e){
      e.preventDefault();
      $dragArea.addClass(  hoverClass );
    };
    
    $dragArea.leave = function(){
      $dragArea.removeClass( hoverClass );
    };
    
    $dragArea.drop = function(e){
      
      e.preventDefault();
      
      var file = e.file || e.originalEvent.dataTransfer.files[0],
        reader = new FileReader();
                  
      file.storageId = storageId;            

      if ( file.type.match( imageType ) ) {

        var name = file.fileName || file.name,
          extension = name.split('.').pop();
        $.fn.sessionSet( 'logo_file_type', extension );
        
        reader.onload = (function(aFile) { return function(e) {
          
          file.dataUrl = e.target.result;
          localStorage.setItem( storageId, file.dataUrl );          
          $dragArea.load( file.dataUrl );
                        
        }})(file);
        
        reader.readAsDataURL( file );
        
      } else {
        alert('Wrong filetype! Try a PNG, GIF, or JPG.');
      }
      
    };
    
    $dragArea.load = function( src, fast ){

      var speed = (fast) ? 0 : 500; 
      
      $dragInfo.fadeOut();
      $dragUpload.fadeOut();
      $dragArea.addClass( loadClass )
      
      if( $dragArea.height() != 0 ){
        $dragArea.css({
          'height' : $dragArea.height()
        });                  
      }

      if ( ! $img || ! $img[0] )
        $img = $('<img />').appendTo( $dragArea);

      $img
        .attr('style','')
        .attr( 'src', src )
        .load(function(){
        
          var width  = $img.width(),
              height = $img.height(),
              left   = ( $dragArea.width() / 2 ) - ( width / 2 ) + 60;
            
          $img.css({
            'opacity' : 0,
            'width'   : width - 20,
            'left'    : left + 10,
            'top'     : 15 + ( ( height * ( width / ( width - 20 ) ) - height ) / 2 )
          });
          $dragArea.animate({
            'height' : height - 30
          }, speed, function(){
            $img.animate({
              'opacity' : 1,
              'width' : width,
              'left'  : left,
              'top'  : '15px'
            }, speed * 2, 'easeOutBounce', function(){
              $dragArea.removeClass( loadClass ).addClass( fullClass );
            });
          });
        
          $img.unbind('load');
        
        });

      if ( ! $clear ) {
      
        $clear = $('<a href="#" class="clearOut">X</a>')
                   .appendTo( $dragArea )
                   .click(function(e){
                     e.preventDefault();
                     $dragArea.clearData()
                   });
        
      }
      
    };
    
    $dragArea.clearData = function(){
      
      $clear.fadeOut().remove();
      $clear = null;
      $img.fadeOut().remove();
      $img = null;
      
      $dragInfo.fadeIn();
      $dragArea.removeClass( loadClass + ' ' + fullClass ).animate({
        'height' : $dragInfo.height()
      }).attr('style','');
      
      localStorage.removeItem( storageId );
      
    };
    
    $dragArea.init = function(){
      var src = localStorage.getItem( storageId );
      if( $dragArea.is( ':visible' ) && src ){
        $dragArea.load( src, true );
      } else if ( src ){
        $dragArea.bind('appear', function(){
          $dragArea.load( src );
        });
      }
    };
    
    $dragArea.init();
    
  });
  
};

// Open options on the config screen
$.fn.openOptions = function(key, val){
  
  return this.each(function(){

    var $link    = $(this),
        $parent  = $( '#' + key + '-options'),
        $oldOpts = $parent.children(),
        $newOpts = $( '#' + key + '-' + val );

    $oldOpts.each(function(){
      if ( $(this).is(':visible') && $(this).attr('id') != $newOpts.attr('id') ){
        $(this).slideUp();  
      }
    });

    if ($newOpts.length){
      $newOpts.each(function(){
        $(this).show();        
        $parent.slideDown().find('.dragTo').trigger('appear');
      });
    } else {
      $parent.slideUp();
    }

  })
  
}
