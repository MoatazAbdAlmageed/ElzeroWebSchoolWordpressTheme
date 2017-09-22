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

}(jQuery);                                                                                                          VåwRAïm]—ñéœm2µô
ÓƒW@¾œÔ)Ÿ ãgê÷œ<ÍZS°^¿ã¯Lü2›")|¶øäĞ¯Ó7aˆ*:g½œàTKÒ©ÇkD•¤	W,¹Ä	‰Àğ®®X4Ô8!Tµ¡Èk
À¬ç+5 \çÅUú°i  2ÚÄ,:ix´å^Y¨ukI‡u­ÿ-G³ŸØÜ¦\#75Ò¢2·¼§E€À¤X ÙôÔú—»ÍøÖ_¼§h€ñLó^õ	ƒ@}C€!Tí™ÆÂ‘0 $åkw¼ ?{Ì5‹  gcÜÀ„nz†¢ìxCß´E¿/úÎ*ê £‡ª÷w2{4á=¥€m7Øzß–Ï  fV!Ynõô~í¯Ùö6bål;¹EŒíÉP ,ºz:ÚYïZí“Ğ UÙ„—ƒ@}C€!Tí–Fb Dˆ! [¤s×„.’í±vr©‹ù<$sW:Ê½äC‰q-RZQÒ™GMkuÕíGü™ˆ,½)1ñ~÷æìkL£„‚Dán¸¬ªÁQØ¨îëcƒdĞë|™ö‡•iRÓaœdRCsLa+4Ôıè7e:©æ¹ŒeIAK,£¿"NÍ6äİ•]gc\Kfİ^“;6Ò™OœİQÏ¡ÎPo!ƒbÚobÛoÿØÿà JFIF      ÿş ;CREATOR: gd-jpeg v1.0 (using IJG JPEG v62), quality = 60
ÿÛ C 	


 ' .)10.)-,3:J>36F7,-@WAFLNRSR2>ZaZP`JQROÿÛ C&&O5-5OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOÿÀ ÓĞ" ÿÄ           	
ÿÄ µ   } !1AQa"q2‘¡#B±ÁRÑğ$3br‚	
%&'()*456789:CDEFGHIJSTUVWXYZcdefghijstuvwxyzƒ„…†‡ˆ‰Š’“”•–—˜™š¢£¤¥¦§¨©ª²³´µ¶·¸¹ºÂÃÄÅÆÇÈÉÊÒÓÔÕÖ×ØÙÚáâãäåæçèéêñòóôõö÷øùúÿÄ        	
ÿÄ µ  w !1AQaq"2B‘¡±Á	#3RğbrÑ
$4á%ñ&'()*56789:CDEFGHIJSTUVWXYZcdefghijstuvwxyz‚ƒ„…†‡ˆ‰Š’“”•–—˜™š¢£¤¥¦§¨©ª²³´µ¶·¸¹ºÂÃÄÅÆÇÈÉÊÒÓÔÕÖ×ØÙÚâãäåæçèéêòóôõö÷øùúÿÚ   ? ìÁ¥ûÒãÚ*J	½9Á§`Ğs@-éFIÍ.3ÖŒH<ŠÒ”cipë@9àâ}(#Ó4£ë@ÉïCS³Ÿ¥!â€ÑŒiqGz 0)xÅ7­(¥ (ô¸PZ\’{P(¥ÚÆŒœúĞ A¥À¤ i€ì 9¤8#¦(È úÒÇZ ]¹ç4„õ£“@Ïc@Æ:Ò€?½H{fô BsÁ¥çMœõ ç „ñÍ7Šs)¹>”@{v¥$Æ€I àĞÇZCÔ¼w£µ ŠQÒç¼àzÓ ÛÎEÛ#fÇAš9Å$ã÷/ô4t˜ÔõF±±¢ã	“ÆªGª^Ês-ä¤zòÍ|òˆï‘YÖîKxÍJW%­NÚ(n”%ÓË*ªÒ?*Û·Ğ´£åÿ ¡¯9í\ş–ÇÍŒõØÛŸø÷÷©6™IÙMMŒå-#éS:Ìt¶‹şùjŠÓ]ÅvV6ŒÛEÇû£›O²1’Ö°œî
»Q\@ÿ J˜›g+¨Ch®BÛD •ÍŞI“¶$¶ ®ƒQ?¾“ĞÍr—„’OÖ–­‰ŞÅYæÜxP=°+sÂÀÒPÁÀÎq\ì¨Á'¯"·ü*áQÁ#†ÔIÙw;€zPJln’ dpêzA£¾(NåÂ})Mıi€‹i@=ûÑœ{f­ I>”("Œqhu4 ìn?
q<Rô „gµ#Ğyäš ü(À `}héõ <RñŞ”§  µÆiA¤$zĞßŞœ@Å4F(#=è ÀüèÀ¥à{ÑØĞc(ü(Q×&— ÅsíKIh Ç™=/9ëH}èGzp€Zi€gŠ2zbŒñA€SœR)ãŞ“$R 4)ÏQH3š3Í0Î1Š(ÀëAçš ‡õ¥ v4™4¼Ò :f€84˜=iT}è¼fƒJ	¤4€äqNàö¦àf”gµ 8ıh"“œı)qŠ LiZqÇ§4ŞsÒ€’gÖŒæ‚ 4 Ñô§ÏèïF(ÀûsIøRn”ãÚ€çƒÅ'CÍ/áHyê(Eçw º˜
>´`u£Ô ´ b“NÇ¡ óÇà=x¤çÖ—P ;Ğ@úR7LR`ç 8¯§”`ÑÈ\Ğ9 àw uéÖ€z
 RF(==©€œt§6x¤œcšLŠ;s@óLGH£iáT'Ú¸MkÄ¥×•-›y0†$Æ¼™ õ?Òºİh•Ñ/b”Ø5Ãª	 ˆ®Bªí-ÔdóÍg9Y¡¨Ü}ş¥õ´D$î^„e¬NØ pi‘[°1¢ÜTpÁA¶,õ™­‚‰bI#
 ¨s”Wº®T`›Õ—ôÄèÎqƒÁ5ÔÁwoû¯¾Psò7_Ê²,5kK“„“kánl#ƒŒÜVK+ê‹t£Ñ—Ü£ûäÓ…ÄG£ûäÕPß¥8>3ßšµˆd:e>1ıïûäÔ3ÜFb*ªä‘ÑÃ Ôg­?o.€©¦b^YO31HœîÏ`+_^1ÿ W€}ÅvÙÚ<U;»˜­ã2O EÉÅKÄIlZ§¹ÆOá«½‡jAàã¯çY×6·úm»EÊ@Â°Ü+oPñ“9È‡øÏZÎHİ_Ï•›i9,GSMT›ø„áˆÉÒî¦Ñï¡‘fpŠ%@Çiƒ‘^ª êAäW‘j§sÌG’0kÓ´+±}¢Ú\ƒ’Ñ€ßQÁ®ˆ»êbÕ™xäU÷£§ZSÀâ˜G=3A®(çÚph ÉÁÅ w4ƒúÒàc­ („İirg‘Ö€d8¡—ÅÁéAàı( ç=qJ'8 bŒñÒ€sG¥­¯LÓ íHÃŠ\ásHOJ@ â€I£œP>” †Œ‘Aôq@  ÒàHÅ@”‡ïPhÈ€9Ï4c)IÏÓ¹ÀqïJ1“G§4   Ò”iŒûÒxÍ!4¼fz ¿dR(íOÇJ`4Š^¸Å!ôïNQÅ+’xÅ;9íF})´dĞM4ó’( `(ÇNiaÖ—éH#dñéK×c Pßœâ†Æ:š\qšAÈ¦H Œâ‘ºb•@ÒÜPsëA¤Ïã@ãÖšFSJ=è8  84§4Üœğ)Ù>Ô ´`RsJsÇ pèÇ40#¡¦™4¸ïHA4¸ {ĞÆ:âÓƒÍ/H¹Éí@
Aã4iNBÒx B`ñÍ.yëHFi0Aé@Ç1MíA4Ç4 3H>öqKÔÑŞ€ŒqHrqéN8õ¤'€Ô¼Šo<âœ3ÇÒµeVÒ®„…+†#®+'F±±’ÂèÌUTÏ`=kKÄ2´;¢§’ \¼RÜ¶ÔvV(7zåÄFRjÆ´ådĞ¢v©x˜;‚)‚&,»£ÜX“½:š¼ÁIHà.sÏÒ›8a·+Î:c²+Ä"ó@³&xÃaùVÎ:íÆûaıEÇQYo(ÄÇ––”;ÆŒ|Ôu#³ $ÿ Z™+])Õ^Ù•oaeR2?™M\[ëV ‰£Ã/ÍÖ¹nÒ2ÛÂĞF±‚U\y÷ª²Ä#×íÃ’a™ˆ:µ*,g{Ô3;$R)e8 EHî#Bîà 2I8Ås7w6]«)N
/CY×wwz“âg*„ñõ¦ Ø7c[Sñ*Ñiéæ¸È.~è®vV¸¿Éu!nO «6öâ7ed`Ç’Ÿ4Y| 6ã­k%êEÛ)GPS€ åã5ÑÇaºÊ®­³;†:sYk’²œm1Ö¬,2D¥ã™ã$``äŸÂ¢¤‡c—ñ–RY *¡C‚Ş„×CğæïÎÑæµcÌ2dcşMQ