/*
 * jQuery Horizontal Accordion
 * Author: Mr. Henry
 * Version: 1.0.0
 */
 
(function($){

  // Private
  var _hoverIn
  ,   _hoverOut
  ;
  
  // Variables
  var nav
  ,   menu_state
  ;


  /*
   * Private
   */
  _init = function(ctx){
    
    var ctx_width = ctx.width();
    $('li a', ctx).width(ctx_width / 4);

    // Events
    $('li', ctx).hover(
      function(){
        _hoverIn(ctx, $(this));
      },
      function(){
        _hoverOut(ctx, $(this));
      }
    );
    
  };
  
  _hoverIn = function(ctx, target){
    var opts = ctx.data('af_opts');
    
    $('li, li a', ctx).stop(true);
    target.addClass('hover');
    $('a', ctx).not($('a', target)).animate({
      "width": (ctx.width() - opts.max_width) / 3
    });
    $('a', target).animate({
      "width": opts.max_width
    });

  };

  _hoverOut = function(ctx, target){
    var opts = ctx.data('af_opts');
    
    $('li, li a', ctx).stop(true);
    target.removeClass('hover');
    $('li a', ctx).animate({
      "width": ctx.width() / 4
    });

  };
  
  
  /*
   * Public
   */
  $.fn.accordionfader = function(options){
    
    return $(this).each(function(){
      var opts = options ? $.extend(opts, $.fn.accordionfader.options, options) : $.fn.accordionfader.defaults;
      ctx      = $(this);
      
      // Attach opts to element
      ctx.data("af_opts", opts);
      
      // Initialize
      _init($(this));
      
    });
    
  };
  
  // Default options
  $.fn.accordionfader.defaults = {
    max_width: 225
  };
  
  
}(jQuery));