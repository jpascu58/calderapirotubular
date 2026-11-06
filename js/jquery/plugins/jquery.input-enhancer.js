(function($) {

    $.fn.inputEnhancer = function(options) {
        var o = $.extend({}, $.fn.inputEnhancer.defaults, options);

        return this.each(function() {
            var $this = $(this),
            origVal = $this.val(),
            origColor = $this.css("color");

            if (o.placeholder) {
                $this.css("color", o.color);

                if (typeof $this.data("placeholder") === "undefined") {
                    $this.data("placeholder", origVal);
                }
            }

            $this
            .unbind('focusin.inputEnhancer focusout.inputEnhancer')
            .bind({
                "focusin.inputEnhancer focusout.inputEnhancer" : function(e) {

                    var $this = $(this),
                    val = $this.val(),
                    isFocused = e.type === "focusin",
                    isOriginal = val === origVal,
                    isBlank = val === "",
                    isPlaceholder = o.placeholder;

                    if ($this.hasClass(o.exceptClass)) {
                        isPlaceholder = false;
                    }


                    if (isFocused) {

                        $this.css( 'color', origColor);

                    } else {

                        if (isPlaceholder && isOriginal) {
                            if  ($this.val() == "you@example.com" || "First" || "Last" || "Middle" || "business_name" || "Business Name") {
                            $this.css('color', o.color);
                        } else {

                        }
                        }
                    }

                    if (isPlaceholder) {
                        if (isOriginal && isFocused) {
                            if  ($this.val() == "you@example.com" || "First" || "Last" || "Middle" || "business_name" || "Business Name") {
                                $this.val("");
                            } else {
                            }
                        } else if (isBlank && !isFocused) {
                            $this.val(origVal);

                            $this.css('color', o.color);
                        }
                    }
                }
            });
        });
    };

    // default options
    $.fn.inputEnhancer.defaults = {
        color: "#CAC1A0",
        placeholder: false,
        exceptClass: "noplaceholder"
    };

})(jQuery);
