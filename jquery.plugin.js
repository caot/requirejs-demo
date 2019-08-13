console.log(require);
console.log(requirejs);

require.config({
  baseUrl: "./js/",
  urlArgs: "v=1." + new Date().getTime(),
  paths: {
    'jquery': 'jquery-3.4.1',
    'jquery-ui': 'jquery-ui-1.12.1/jquery-ui',
    'vue': 'vue',
  },
  shim: {
    'jquery-ui': {
      deps: ['jquery'],
      exports: "$",
    },
    'vue': {
      exports: 'vue'
    }
  }
});

define(['jquery', 'vue', 'jquery-ui'], function ($, vue, ui) {
  console.log('jQuery: ', jQuery === $, jQuery);
  console.log('vue: ', vue);
  console.log('ui: ', ui);

  const vobj = new vue({
    delimiters: ['{[{', '}]}'],
    el: '#id-vue-app',
    data() {
      return {
        data: 'vue demo!',
      }
    },
  });

  $.fn.awesomePlugin = function () {
    console.log('this is an awesomePlugin')
  };

  console.log('awesomePlugin: ', $.awesomePlugin);

  $(function() {
    function log( message ) {
      $( "<div>" ).text( message ).prependTo( "#log" );
      $( "#log" ).scrollTop( 0 );
    };

    $('head').append(`
<link rel="stylesheet" type="text/css" href="js/jquery-ui-1.12.1/jquery-ui.css">
<style>
  .ui-autocomplete-loading {
    background: white url("js/jquery-ui-1.12.1/images/ui-anim_basic_16x16.gif") right center no-repeat;
  }
</style>
`);

    $( "#birds" ).autocomplete({
      source: function( request, response ) {
        console.log('request: ', request);
        console.log('response: ', response);

        $.ajax({
          url: "https://jqueryui.com/resources/demos/autocomplete/search.php",
          dataType: "jsonp",
          data: {
            term: request.term
          },
          success: function( data ) {
            response( data );
          }
        }).done(function( data ) {
          if ( console && console.log ) {
            console.log( "Sample of data:", data.slice( 0, 5 ) );
          }
        });
      },
      minLength: 2,
      select: function( event, ui ) {
        console.log('event: ', event);
        console.log('ui: ', ui);

        log( "Selected: " + ui.item.value + " aka " + ui.item.id );
        return false;
      },
      create: function () {
        // ref https://stackoverflow.com/questions/16371204/how-to-change-rendering-of-dropdown-in-jquery-ui-autocomplete-attached-to-a-clas/16372823#16372823
        $(this).data('ui-autocomplete')._renderItem = function (ul, item) {
          return $('<li>')
            .append('<a>label:' + item.label + ', value: ' + item.value + '</a>')
            .appendTo(ul);
        };
      }
    });
  });

});
