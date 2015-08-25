$.fn.ajaxRefresh = function( parameters ){

  /*
    Function: $.fn.ajaxRefresh

    Take an element and, refresh its content from the server

    Parameters:
      parameters - key/value object of parameters to pass in the query string
  */

  function init(){

    var
      $this = $(this),
      $this_new,
      $wrapper = $('<div class="ajaxWrapper"></div>').insertBefore( $this ),
      object_id = $this.get(0).id,
      object_class = $this.get(0).getAttribute('class'),
      object_class = ( object_class )
        ? object_class.split(' ').join('.')
        : '',
      object_selector = ( object_id )
        ? '#' + object_id
        : '.' + object_class,
      object_properties = {
        'outerHeight' : $this.outerHeight(),
        'height' : $this.height(),
        'width' : $this.width(),
        'marginTop' : $this.css('margin-top'),
        'marginBottom' : $this.css('margin-bottom')
      },
      query_string = _build_query_string( parameters );

    _prepare_for_switch( $this, query_string );

    function _build_query_string( parameters ){

      var query_string = '',
          acts_as_page = {
            'acts_as_page' : 'true'
          },
          new_parameters =
            $.extend(
              {},
              parameters,
              acts_as_page
            );

      for ( var key in new_parameters ) {
        query_string +=
          '&' +
          key +
          '=' +
          new_parameters[ key ];
      }

      return location.href + query_string;

    }

    function _prepare_for_switch( $this ){

      var
        wrapper_css = {
          'height' : object_properties.outerHeight,
          'marginTop' : object_properties.marginTop,
          'marginBottom' : object_properties.marginBottom
        },
        this_css = {
          'marginTop' : 0,
          'marginBottom' : 0
        };

      $this
        .css( this_css)
        .appendTo( $wrapper );

      $wrapper
        .css( wrapper_css)
        .children()
        .fadeTo(
          500,
          .01,
          function(){
            _refresh_content( query_string );
          });

    }

    function _refresh_content( query_string ) {

      $.ajax({
        type:       'get',
        //url:        query_string,
        timeout:    10000,
        success:    _success,
        error:      _error
      });

    }

    function _success( html ){

      $page = $( html );
      _switch_out_content();

    }

    function _switch_out_content(){

      $this_new = $page.find( object_selector ).css( 'opacity', 0 );

      $wrapper
        .html('')
        .append( $this_new )
        .children()
        .css( 'opacity', 0 );

      astro.wait(
        _reappear,
        250
      );

    }

    function _reappear(){

      var
        this_css = {
          'left' : '-9999px',
          'marginBottom' : '0',
          'marginTop' : '0',
          'position' : 'absolute',
          'width' : object_properties.width
        },
        wrapper_animation = {
          outerHeight :
            $this
            .css( this_css )
            .outerHeight()
        };

      $wrapper.animate(
        wrapper_animation,
        500,
        __fade_new_object_in
      );

      function __fade_new_object_in(){


        $this_new
          .attr('style', '')
          .css('opacity', 0)
          .fadeTo(
            500,
            1,
            _cleanup
          );

      }

    }

    function _cleanup(){

      $this_new.unwrap();
      astro.content_init( 'all', $this_new );

    }

    function _error( html ){

      log( 'Error!' );
      log( html );

    }

  }

  return this.each( init );

};