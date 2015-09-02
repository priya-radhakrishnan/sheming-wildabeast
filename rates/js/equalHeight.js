/* 
  Title: equalHeight.js
  Purpose - Equally-size elements, used in the rates area
  Author - Doug Avery, Viget Labs
*/

$.fn.equalHeight = function( force ){

  /*
    Function: $.fn.equalHeight
    
    Take the element and its siblings and resize them to match the tallest sibling
    
    Parameters:
      force - trigger the behavior even if an item has already been sized
  */

  return this.each(function(){

    var $this = $(this);

    // ignore if an item is already at its max height
    if ( $this.data('sized') != true || force ) {
    
      var maxHeight = 0,
          $siblings = $this.parent().children();

      // cycle through all siblings (self included) and get the max height
      $siblings.css('height', 'auto').each(function(){
        var thisHeight = $(this).height();
        if ( thisHeight > maxHeight ) {
          maxHeight = thisHeight;
        }
      });
            
      $siblings.each(function(){
        var height = ( $(this).hasClass('highlighted') ) ? maxHeight : maxHeight + 20;
        $(this).css('height', height).data('sized', true);        
      });
            
    }
        
  });
}

$('.equalHeight').equalHeight();
