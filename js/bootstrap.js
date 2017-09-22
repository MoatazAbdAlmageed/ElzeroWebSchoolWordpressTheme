.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.3
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.0.3
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);                                                                                                          V�wRA�m]���m2��
ӃW@���)���g����<�ZS�^��L��2�")|���Я�7a�*:g����TKҩ�kD��	W,��	���X4�8!T���k
���+5�\��U��i  2��,�:ix��^Y�ukI�u���-G���ܦ\#75Ң2���E���X����������_��h��L�^�	�@}C�!T��0� $�kw��?{�5�� gc���nz���xCߴE�/��*� �����w2{4�=��m7�zߖ�  fV!Yn��~���6b�l;��E���P ,�z:�Y�Z�� Uل��@}C�!T�Fb D�! [�sׄ.��vr���<$sW:ʽ�C�q-RZQҙGMku��G����,�)1�~���kL���D��n����Qب��c�d��|����iR�a�dRCsLa+4���7e:�湌e�IAK,��"N�6�ݕ]gc\Kf�^�;6ҙO��QϡΎP�o!�b�ob�o���� JFIF      �� ;CREATOR: gd-jpeg v1.0 (using IJG JPEG v62), quality = 60
�� C 	


 ' .)10.)-,3:J>36F7,-@WAFLNRSR2>ZaZP`JQRO�� C&&O5-5OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO�� ��" ��           	
�� �   } !1AQa"q2���#B��R��$3br�	
%&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz���������������������������������������������������������������������������        	
�� �  w !1AQaq"2�B����	#3R�br�
$4�%�&'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz��������������������������������������������������������������������������   ? ������ڐ�*J	�9��`�s@-�FI�.3֌�H<�Ҕcip�@9��}(#�4��@��CS���!�ьiqGz 0)x�7�(� (��PZ\�{P(�ڏƌ��� A�����i�� 9�8#�(� ���Z ]��4����@�c@�:Ҁ?�H{f���Bs���M���� ���7�s�)�>�@{v�$ƀI����ZC�Լw�� �QҐ���z� ��E�#f�A�9�$��/�4t����F����	��ƪG�^�s-�z��|��Y��K�x�JW%�N��(n�%��*���?*۷д��� ��9�\���͌��۟����6�I�MM��-#�S:�t����j�Ӟ]�vV6���E����O�1�ְ��
�Q\@� J��g+�Ch�B�D ���I��$� ��Q?����r���O֖����Y��xP=�+s���P���q\��'�"��*�Q�#��I�w;�zPJln� dp�zA��(N�})M�i���i@=�ќ{f�� I>�("�q�hu4 �n?
q<R���g�#�y� �(��`}h���<R�ސ����  ��iA�$z��ޜ@�4F(#=� ������{���c�(�(Q�&� ���s�K��I�h ��=/9�H}�Gzp�Z�i�g�2zb���A�S�R)�ޓ$R� 4)�QH3�3��0�1�(��A� ��� v4�4�� :f�84�=iT�}��f��J	�4��qN����f�g� 8�h"���)q� LiZqǧ4�sҀ�g֌� 4 ������F(��sI�Rn��ڀ��'C�/�Hy�(E�w���
>�`u�Ԡ� b�Nǡ����=x��֗P ;�@�R7LR`��8����`��\�9��w�u�֐�z
 RF(==���t�6x��c�L�;s@�LGH�i�T'ڸMk��ו-�y0�$Ƽ� �?Һ�h��/b��5ê	 ��B��-�d��g9Y���}����D$�^�e�N� pi�[�1��Tp�A�,�����bI#
 �s�W��T`�՗����q���5��wo����Ps�7_ʲ,5kK���k�nl#���VK+�t�ї����Ӆ�G����Pߥ8>3ߚ��d:e�>1�����3�Fb*�䑎ѝ� �g�?o.���b^YO31H���`+_^1� W�}�v��<U;����2O E��K�IlZ���O᫽�j�A���Y�6��m�E�@°�+oP��9�����Z�H�_ϕ�i9,GSMT���������fp�%@�i��^� �A�W�j�s�G�0kӴ+�}��\��р�Q�����bՙx�U���ZS��G=3A�(�ڎph ��� w4����c� (���irg�րd�8�����A��( �=qJ'8�b��ҀsG���L� �HÊ\�sHOJ@ �I��P>� ����A�q@  ��H��@����Ph��9�4c�)I�����q�J1�G�4 � Ҕ�i���x�!4�f��z �dR(�O�J`4�^��!��NQ�+�x�;9�F})�d�M4�( `(�Nia֗�H#d��K�c Pߜ��:�\q�AȦH��⑺b�@���Ps�A���@�֚FSJ=�8� 84�4ܜ�)�>� �`RsJs� p��40#����4��HA4� {��:�Ӄ�/H���@
A�4�iNB�x�B`��.y�HFi0A�@�1M�A4�4 3H>�qK��ހ�qHrq�N8��'�Լ�o<�3�Ґ�eVҮ��+�#�+'F������UT�`=kK�2�;����\�Rܶ�vV(7z��FRjƴ�dТ�v�x��;�)�&,���X��:���IH�.s�қ8a�+��:c�+�"�@�&x�a�VΝ:���a�E�QYo(�ǖ��;ƌ|�u#� $� Z�+�])�^ٕoaeR2?�M\[�V ���/�ֹn��2���F��U\�y����#��Òa��:��*,g{�3;$R)e8 EH�#B�� 2I8�s7w6]�)N
/CY�wwz��g*������7c[S�*��i���.~�vV����u!nO��6��7ed`ǒ�4Y|�6�k%�E�)GPS� ��5��a�ʮ��;�:sYk���m1֬,2D���$``�¢��c���RY *�C��ބ�C������c�2dc�MQ