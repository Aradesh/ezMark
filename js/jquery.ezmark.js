/**
 * ezMark - A Simple Checkbox and Radio button Styling plugin. 
 * This plugin allows you to use a custom Image for Checkbox or Radio button. Its very simple, small and easy to use.
 * 
 * Copyright (c) Abdullah Rubiyath <http://www.itsalif.info/>.
 * Released under MIT License
 * 
 * Files with this plugin:
 * - jquery.ezmark.js
 * - ezmark.css
 * 
 * <usage>
 * At first, include both the css and js file at the top
 * 
 * Then, simply use: 
 * $('selector').ezMark([options]);
 *  
 * [options] accepts following JSON properties:
 *  checkboxCls - custom Checkbox Class
 *  checkedCls  - checkbox Checked State's Class
 *  radioCls    - custom radiobutton Class
 *  selectedCls - radiobutton's Selected State's Class
 *  disabledCls - class for disabled input
 *  
 * </usage>
 * 
 * View Documention/Demo here:
 * http://www.itsalif.info/content/ezmark-jquery-checkbox-radiobutton-plugin
 * 
 * @author Abdullah Rubiyath, Vladimir Kuleba
 * @version 1.2
 * @date April 23, 2014
 */
(function($){

  $.widget("customforms.ezMark", {

    options: {
        checkboxCls : 'ez-checkbox',
        checkedCls  : 'ez-checked',
        radioCls    : 'ez-radio',
        selectedCls : 'ez-selected',
        disabledCls : 'ez-disabled',
        hideCls     : 'ez-hide'
    },

    _create : function(){
      this._initDecorator();
    },

    _initDecorator : function(){
      var _self    = this,
          _element = this.element,
          _wrapTag = _element.attr('type') == 'checkbox' ? '<div class="'+this.options.checkboxCls+'">' : '<div class="'+this.options.radioCls+'">';

      // for checkbox
      if( _self._getInputType(_element) == 'checkbox') {

        _element.addClass(this.options.hideCls).wrap(_wrapTag);

        _self._on({
          change: "_onChange"
        });     
        
        if( _element.is(':checked') ) {
          _element.parent().addClass(this.options.checkedCls);
        }

        if( _element.is(':disabled') ) { 
          _element.parent().addClass(this.options.disabledCls); 
        } 

      } else if( _self._getInputType(_element) == 'radio') {

        _element.addClass(this.options.hideCls).wrap(_wrapTag);

        this._on({
          change: "_onChange"
        });

        if( _element.is(':checked') ) {
          _element.parent().addClass(this.options.selectedCls);
        }

        if( _element.is(':disabled') ) { 
          _element.parent().addClass(this.options.disabledCls); 
        }     
      }
    },

    _onChange: function (event) {
      var _self = this,
          _element = this.element,
          _options = this.options;

      // for checkbox
      if( _self._getInputType(_element) == 'checkbox') {

        if( _element.is(':checked') ) { 
          _element.parent().addClass(_options.checkedCls); 
        } 
        else {  
          _element.parent().removeClass(_options.checkedCls);  
        }
        if( _element.is(':disabled') ) { 
          _element.parent().addClass(_options.disabledCls); 
        } 
        else {  
          _element.parent().removeClass(_options.disabledCls);
        }
      } else if( _self._getInputType(_element) == 'radio') {
        // radio button may contain groups! - so check for group
        $('input[name="'+_element.attr('name')+'"]').each(function() {
          if( $(this).is(':checked') ) { 
            $(this).parent().addClass(_options.selectedCls); 
          } else {
            $(this).parent().removeClass(_options.selectedCls);                 
          }

          if( $(this).is(':disabled') ) { 
            $(this).parent().addClass(_options.disabledCls); 
          } else {
            $(this).parent().removeClass(_options.disabledCls);                 
          }
        });  
        
      }
    },

    _getInputType: function(element){
      return element.attr('type');
    },

    redraw: function() {
      this._onChange();
    },

    destroy: function() {
        this.element
            .unwrap()
            .removeClass(this.options.hideCls)
            .off( "change" );
 
        // Call the base destroy function.
        $.Widget.prototype.destroy.call( this );
    }

  });

}(jQuery));
