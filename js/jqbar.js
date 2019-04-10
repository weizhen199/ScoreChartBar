(function ($) {
    $.fn.extend({
        jqbar: function (options) {
            var settings = $.extend({
                animationSpeed: 2000,
                barLength: 755,
                orientation: 'h',
                barWidth: 35,
                barColor: 'red',
                label: '&nbsp;',
                value: 100.00
            }, options);

            return this.each(function () {

                var valueLabelHeight = 0;
                var progressContainer = $(this);

                if (settings.orientation == 'h') {
                    progressContainer.addClass('jqbar horizontal').append('<span class="bar-label"></span><span class="bar-level-wrapper"><span class="bar-level"></span></span><span class="bar-percent"></span>');

                    var progressLabel = progressContainer.find('.bar-label').html(settings.label);

                    progressLabel.css('font-size','36px');

					//这里拉宽
					progressLabel.css("height",settings.barWidth * 1.5);
                    //progressLabel.css("transform", "scale(2.5,1.5)");
					
                    var progressBar = progressContainer.find('.bar-level').attr('data-value', settings.value);

                    var progressBarWrapper = progressContainer.find('.bar-level-wrapper');

                    progressBar.css({ height: settings.barWidth, width: 0, backgroundColor: settings.barColor });
                    //柱状图css在这里
                    progressBar.css("box-shadow","5px 5px 5px #888888");

                    var valueLabel = progressContainer.find('.bar-percent');
					
                    valueLabel.css("height", settings.barWidth * 1.2);

                    valueLabel.css('font-size', '36px');
					//valueLabel.css("transform","scale(2.5,1.5)");
					
                    valueLabel.html('0');
                }
                else {

                    progressContainer.addClass('jqbar vertical').append('<span class="bar-percent"></span><span class="bar-level-wrapper"><span class="bar-level"></span></span><span class="bar-label"></span>');

                    var progressLabel = progressContainer.find('.bar-label').html(settings.label);
                    var progressBar = progressContainer.find('.bar-level').attr('data-value', settings.value);
                    var progressBarWrapper = progressContainer.find('.bar-level-wrapper');

                    progressContainer.css('height', settings.barLength);
                    progressBar.css({ height: settings.barLength, top: settings.barLength, width: settings.barWidth, backgroundColor: settings.barColor });
                    progressBarWrapper.css({ height: settings.barLength, width: settings.barWidth });

                    var valueLabel = progressContainer.find('.bar-percent');
                    valueLabel.html('0');
                    valueLabelHeight = parseFloat(valueLabel.outerHeight());
                    valueLabel.css({ top: (settings.barLength - valueLabelHeight) + 'px' });
                }

                animateProgressBar(progressBar);

                function animateProgressBar(progressBar) {

                    var level = parseFloat(progressBar.attr('data-value'));
                    if (level > 100) {
                        level = 100;
                        alert('max value cannot exceed 100 percent');
                    }
                    var w = settings.barLength * (level - 50) * 2 / 100.00;

                    if (settings.orientation == 'h') {
                        progressBar.animate({ width: w }, {
                            duration: 2000,
                            step: function (currentWidth) {
                                var percent = parseFloat(currentWidth / settings.barLength * 100);
                                if (isNaN(percent))
                                    percent = 0;
                                progressContainer.find('.bar-percent').html((percent/2+ 50).toFixed(2));
                            }
                        });
                    }
                    else {

                        var h = settings.barLength - settings.barLength * level / 100;
                        progressBar.animate({ top: h }, {
                            duration: 2000,
                            step: function (currentValue) {
                                var percent = parseFloat((settings.barLength - parseFloat(currentValue)) / settings.barLength * 100);
                                if (isNaN(percent))
                                    percent = 0;
                                progressContainer.find('.bar-percent').html(Math.abs(percent).tofixed(2) + '%');
                            }
                        });

                        progressContainer.find('.bar-percent').animate({ top: (h - valueLabelHeight) }, 2000);

                    }
                }

            });
        }
    });

})(jQuery);