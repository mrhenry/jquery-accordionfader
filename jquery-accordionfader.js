/*
 * jQuery Horizontal Accordion
 * Author: Mr. Henry
 * Version: 1.0.1
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
    var opts      = ctx.data('af_opts');
    var ctx_width = ctx.width();
    
    // Init state
    if ($(opts.active_class, ctx).length > 0) {
      var target = $(opts.active_class, ctx).first();
      $('a', ctx).not($('a', target)).width((ctx.width() - opts.max_width) / (($('li', ctx).length) - 1));
      $('a', target).width(opts.max_width);
    } else {
      $('li a', ctx).width(ctx_width / $('li', ctx).length);
    }
    
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
      "width": (ctx.width() - opts.max_width) / (($('li', ctx).length) - 1)
    });
    $('a', target).animate({
      "width": opts.max_width
    });

  };

  _hoverOut = function(ctx, target){
    var opts = ctx.data('af_opts');
    
    $('li, li a', ctx).stop(true);
    target.removeClass('hover');
    
    if ($(opts.active_class, ctx).length > 0) {
      _hoverIn(ctx, $(opts.active_class, ctx).first());
    } else {
      $('li a', ctx).animate({
        "width": ctx.width() / $('li', ctx).length
      });
    }

  };
  
  
  /*
   * Public
   */
  $.fn.accordionfader = function(options){
    
    return $(this).each(function(){
      var opts = options ? $.extend(opts, $.fn.accordionfader.defaults, options) : $.fn.accordionfader.defaults;
      ctx      = $(this);
      
      // Attach opts to element
      ctx.data("af_opts", opts);
      
      // Initialize
      _init($(this));
      
    });
    
  };
  
  // Default options
  $.fn.accordionfader.defaults = {
    max_width: 200,
    active_class: ".active"
  };
  
  
}(jQuery));