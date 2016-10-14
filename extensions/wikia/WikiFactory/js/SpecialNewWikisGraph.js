window.rhfs=window.rhfs||[];rhfs.push('./extensions/wikia/WikiFactory/js/SpecialNewWikisGraph.js');
var SponsorshipDashboard = function(){
	var self = this;

	//params filled by PHP
	this.chartId = 0;
	this.datasets = [];
	this.fullTicks = [];
	this.hiddenSeries = [];
	this.monthly = null;
	this.ticks = [];
	//other params
	this.data = [];
	this.overview = null;
	this.plot = null;
	this.previousPoint = null;
	this.selectionRanges = null;

	//hard-code color indices to prevent them from shifting as series are turned on/off
	this.predefinedColors = ['#CB4B4B', '#4DA74D', '#EDC240', '#AFD8F8', '#9440ED', '#BEBE5D', '#FF00CC', '#0099FF', '#953737', '#387938', '#C29F34', '#8FB1CB', '#512381', '#999900', '#8B006F', '#006FB9', '#F1CECE', '#BEDFBE', '#F7E3A8', '#E2F1FC', '#D8BAF8', '#ECECD1', '#FF8BE8', '#D1ECFF'];

	this.plotOptions = {
		xaxis: {ticks: []},
		yaxis: {min: 0},
		grid: {
			backgroundColor: '#FFFFFF',
			hoverable: true
		},
		series: {
			points: {show: false},
			lines: {show: true}
		},
		legend: {show: false}
	};

	this.overviewOptions = {
		yaxis: {ticks: [], min: 0, autoscaleMargin: 0.1},
		xaxis: {ticks: []},
		grid: {backgroundColor: '#FFFFFF'},
		selection: {mode: 'x'},
		series: {
			lines: {show: true, lineWidth: 1},
			shadowSize: 1
		},
		legend: {show: false}
	};

	// console logging
	this.log = function(msg) {
		$().log(msg, 'SponsorshipDashboard');
	};

	//initialization - should be called by PHP generated script with passed extra data
	this.init = function(params) {
		self.log('init, params:');
		self.log(params);

		//add params generated by PHP
		$.extend(self, params);
		self.plotOptions.xaxis.ticks = params.ticks;

		//set default colors
		self.plotOptions.colors = self.predefinedColors;
		self.overviewOptions.colors = self.predefinedColors;

		//colorize series
		var colorNo = 0;
		$.each(self.datasets, function(key, val) {
			val.color = colorNo++;
		});

		//insert checkboxes
		self.choiceContainer = $('#choices' + self.chartId);
		self.log(self.datasets);
		var choiceContainerHtml = self.choiceContainer.html();
		self.choiceContainer.html('');
		$.each(self.datasets, function(key, val) {
			var tmpText = '<div class="colorHolder" style="background-color: ' + self.predefinedColors[val.color] +'"><input type="checkbox" name="' + key + '" ';
			if ($.inArray(key, self.hiddenSeries) == -1) {
				tmpText += ' checked="checked"';
			}
			tmpText = '<div class="sd-variable-wrapper">' + tmpText +' id="id' + key + self.chartId + '"></div><label for="id' + key + self.chartId + '"> ' + val.label + '</label></div>';

			self.choiceContainer.append(tmpText);
		});
		self.choiceContainer.append( choiceContainerHtml );

		//bindings
		self.choiceContainer.find('input').add('#sponsorshipDashboardShowTrends').click(self.plotAccordingToChoices);

		$('#sponsorshipDashboardDownloadChartPNG').click(self.downloadChartPNG);
        $('#sponsorshipDashboardDownloadChartCSV').click(self.downloadChartCSV);
		
		$('#placeholder' + self.chartId)
			.bind('plothover', self.onPlotHover)
			.bind('plotselected', self.onPlotSelected);

		$('#sponsorship-dashboard-select' + self.chartId).bind('click', function() {
			self.choiceContainer.find("INPUT[type='checkbox']").attr('checked', true);
			self.plotAccordingToChoices();

		});

		$('#sponsorship-dashboard-deselect' + self.chartId).bind('click', function() {
			self.choiceContainer.find("INPUT[type='checkbox']").attr('checked', false);
			self.plotAccordingToChoices();
		});

		$('#overview' + self.chartId).bind('plotselected', function (event, ranges) {
			self.plot.setSelection(ranges);
		});

		$('.datepicker').bind('change', self.dataFromPickers);

		//first draw
		self.plotAccordingToChoices();
	};

	this.onPlotHover = function (event, pos, item) {
		$("#x" + self.chartId).text(pos.x.toFixed(2));
		$("#y" + self.chartId).text(pos.y.toFixed(2));

		if (item) {
			if (self.previousPoint != item.datapoint) {

				self.previousPoint = item.datapoint;
				$("#tooltip" + self.chartId).remove();
				var	x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1];

				var xText = '';
				for (var i in self.fullTicks) {
					if (self.fullTicks[i][1] == item.datapoint[0]) {
						xText = self.fullTicks[i][0];
					}
				}

				self.showTooltip(item.pageX, item.pageY, xText + ' | ' + y + ' - ' + item.series.label);
			}
		} else {
			$("#tooltip" + self.chartId).remove();
			self.previousPoint = null;
		}
	};

	this.onPlotSelected = function (event, ranges) {
		// do the zooming
		self.log('#placeholder' + self.chartId + '.plotselected');

		var x1 = Math.round(ranges.xaxis.from),
			x2 = Math.round(ranges.xaxis.to);

		$.extend(true, self.plotOptions, {
			xaxis: {
				min: x1,
				max: x2
			}
		});

		self.selectionRanges = {
			x1: x1,
			x2: x2
		};

		var borderTicks = {};
		for (var i in self.fullTicks) {
			if (self.fullTicks[i][1] == x1) {
				borderTicks.from = self.fullTicks[i];
				self.log('borderTicks.from:' + borderTicks.from);
				var data2split = self.fullTicks[i][0].split('-');
				$('#sd-year-from').val(data2split[0]);
				$('#sd-month-from').val(data2split[1]);
				if (!self.monthly) {
					$('#sd-day-from').val(data2split[2]);
				}
			}
			if (self.fullTicks[i][1] == x2) {
				borderTicks.to = self.fullTicks[i];
				self.log('borderTicks.to:' + borderTicks.to);
				var data2split = self.fullTicks[i][0].split('-');
				$('#sd-year-to').val(data2split[0]);
				$('#sd-month-to').val(data2split[1]);
				if (!self.monthly) {
					$('#sd-day-to').val(data2split[2]);
				}
			}
		}

		// don't fire event on the overview to prevent eternal loop
		self.overview.setSelection(ranges, true);
		self.plotAccordingToChoices(true, borderTicks);
	};

	this.downloadChartPNG = function( e ) {

        e.preventDefault();

        var canvas = self.plot.getCanvas();

        var imageData = canvas.toDataURL();
		imageData = imageData.replace( 'image/png', 'image/octet-stream' );

        self.downloadGeneratedContent( imageData, 'metrics.png' );
	};

    this.downloadChartCSV = function( e ) {

        e.preventDefault();

        var table = [ ];

        var header = [ 'date', 'created' ];
        table.push( header );

        // Pick date bounds from UI
        var datesInterval = self.getDatesInterval();

        // Iterate over all existing data
        for ( var i in self.fullTicks ) {

            // Using existing data structure to get the date
            var date = self.fullTicks[ i ][ 0 ];

            // But pick only that points, which fits into specified dates interval
            if ( self.intervalContainsDate( datesInterval, date ) ) {

                // Looks like not very nice way of getting number of created Wikias
                // but I am just reusing existing data structures
                var index = self.fullTicks[ i ][ 1 ];
                var createdWikias = self.data[ 0 ][ 'data' ][ index ][ 1 ];

                var row = [ date, createdWikias ];

                table.push( row );
            }
        }

        var csvString = self.tableToCSVString( table );

        self.downloadGeneratedContent( 'data:attachment/csv,' + csvString, 'metrics.csv' );
    }

    /**
     * Returns object, which contains date bounds
     * @returns object with fields: startDate, endDate, startDateAsInt, endDateAsInt. All values are strings
     */
    this.getDatesInterval = function() {

        // Generating starting and ending date from existing UI controls
        var startDate = $( '#sd-year-from' ).val() + '-' + $( '#sd-month-from' ).val();
        var endDate = $( '#sd-year-to' ).val() + '-' + $( '#sd-month-to' ).val();
        if ( !self.monthly ) {
            startDate = startDate + '-' + $( '#sd-day-from' ).val();
            endDate = endDate + '-' + $( '#sd-day-to' ).val();
        }

        var startDateAsInt = self.dateStringAsInt( startDate );
        var endDateAsInt = self.dateStringAsInt( endDate );

        return {
            startDate : startDate,
            endDate : endDate,
            startDateAsInt : startDateAsInt,
            endDateAsInt : endDateAsInt
        };
    }

    /**
     * Check, if given date fits into the given interval of dates
     * @param datesInterval - must be produced by function self::getDatesInterval()
     * @param date - string in format Y-m-d
     * @returns {boolean}
     */
    this.intervalContainsDate = function( datesInterval, date ) {
        var startDateAsInt = datesInterval[ 'startDateAsInt' ];
        var endDateAsInt = datesInterval[ 'endDateAsInt' ];
        var dateAsInt = self.dateStringAsInt( date );

        return ( dateAsInt >= startDateAsInt ) && ( dateAsInt <= endDateAsInt );
    }

    /**
     * "2014-07-14" -> "20140714"
     * @param dateString in format Y-m-d
     * @returns string without dashes
     */
    this.dateStringAsInt = function( dateString ) {
        // Here described alternative ways of transforming date to number:
        // http://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript
        // But, for consistency with existing code - the following solution is used:
        return dateString.replace( /-/gi, '' );
    }

    /**
     * Transforms given table to CSV string
     * @param table - 2 dimensional array, where all rows have the same length
     * @returns string in CSV format
     */
    this.tableToCSVString = function( table ) {
        var csvRows = [ ];

        var comma = ',';

        for( var i = 0, l = table.length; i < l; ++i ){
            var row = table[ i ];
            var csvRow = row.join( comma );
            csvRows.push( csvRow );
        }

        var rowsSeparator = "%0A";

        var csvString = csvRows.join( rowsSeparator );

        return csvString;
    }

    /**
     * Ability to download content, which serialized to string.
     * Using HTML5 download attribute, which allows to define name of downloaded content.
     * see: http://stackoverflow.com/questions/17836273/export-javascript-data-to-csv-file-without-server-interaction/17836529#17836529
     *
     * @param content - string of serialized data
     * @param name - name of downloaded file
     */
    this.downloadGeneratedContent = function( content, name ) {

        var a = document.createElement( 'a' );
        a.href = content;
        a.target = '_blank';
        a.download = name;

        document.body.appendChild( a );

        a.click();
    }

	this.plotAccordingToChoices = function(stopRedrawOverview, borderTicks) {
		self.log('plotAccordingToChoices');
		self.data = [];
 		self.choiceContainer.find('input:checked').each(function() {
			var key = $(this).attr('name');
			if (key && self.datasets[key]) self.data.push(self.datasets[key]);
		});
		if (/*self.data.length > 0*/ 1 /*per request in FB#4380*/) {
			var localOptions = $.extend(true, {}, self.plotOptions);
			if (typeof borderTicks != 'undefined') {
				localOptions.xaxis.ticks.push([borderTicks.from[1], borderTicks.from[0]], [borderTicks.to[1], borderTicks.to[0]]);
			}
			if ($('#sponsorshipDashboardShowTrends').attr('checked')) {
				$.extend(true, localOptions, {trendline: {show: true}, lines: {show: false}, points: {show: true, radius:2}});
				$.extend(self.overviewOptions, {trendline:{show:true}});
			} else {
				delete self.overviewOptions['trendline'];
			}

			self.plot = $.plot($("#placeholder" + self.chartId), self.data, localOptions);
			if (stopRedrawOverview !== true) {
				self.overview = $.plot($("#overview" + self.chartId), self.data, self.overviewOptions);
				if (self.selectionRanges == null) {
					var axisX = self.overview.getXAxes()[0];
					self.selectionRanges = {x1: axisX.min, x2: axisX.max};
				}
				self.overview.setSelection(self.selectionRanges);
			}
		}
	};

	this.showTooltip = function(x, y, contents) {
		$('<div id="tooltip' + self.chartId + '">' + contents + '</div>').css({
			top: y + 5,
			left: x + 25,
			position: 'absolute',
			display: 'none',
			color: '#000',
			padding: '2px',
			'background-color': '#fff',
			opacity: 0.80,
			'z-index': 999
		}).appendTo('body').fadeIn(200);
	};
        
        this.setNewData = function( fromData, toData ) {
            self.log( 'setNewData' );
            $.get(
                '/wikia.php?controller=NewWikisGraphSpecialPage&method=getData&format=json',
                { startDate: fromData, endDate: toData, param: self.param },
                function( axData ) {
                    $.extend( self, axData );
                    self.plotOptions.xaxis.ticks = axData.ticks;
                    self.data = [];
                    self.choiceContainer.find('input:checked').each( function() {
                        var key = $( this ).attr( 'name' );
                        if ( key && self.datasets[key] ) self.data.push( self.datasets[key] );
                    } );
                    
                    fromData = '';
                    toData = '';
                    
                    for ( var i in self.fullTicks ) {
                        if ( '' == fromData ) {
                            fromData = self.fullTicks[i][0];
                        }
                        toData = self.fullTicks[i][0];
                    }
                    
                    self.drawFromPickers( fromData, toData );
                }
            );
        };

	this.dataFromPickers = function() {
		self.log('dataFromPickers');

		var fromData = $('#sd-year-from').val() + '-' + $('#sd-month-from').val();
		var toData = $('#sd-year-to').val() + '-' + $('#sd-month-to').val();
		if (!self.monthly) {
			fromData = fromData + '-' + $('#sd-day-from').val();
			toData = toData + '-' + $('#sd-day-to').val();
		}
                
                var fulltickAsInt = 0;
                var minDate = 99999999;
                var maxDate = 0;
                
                for ( var i in self.fullTicks ) {
                    fulltickAsInt = parseInt( i.replace( /-/gi, '' ) );
                    minDate = Math.min( minDate, fulltickAsInt );
                    maxDate = Math.max( maxDate, fulltickAsInt );
                }
                
                if ( parseInt(fromData.replace( /-/gi, '' ) ) < minDate || parseInt(toData.replace( /-/gi , '' ) ) > maxDate ) {
                    return self.setNewData( fromData, toData );
                }
                
                self.drawFromPickers( fromData, toData );
	};
        
        this.drawFromPickers = function( fromData, toData ) {
            
            var fulltickAsInt = 0;
            var fromDataAfter = 0;
            var toDataAfter = 0;
            var fromDataBuffer = 0;
            var toDataBuffer = 1;
            
            for ( var i in self.fullTicks) {
                fulltickAsInt = self.fullTicks[i][0].replace( /-/gi, '' );
                
                if ( parseInt( fromData.replace( /-/gi, '' ) ) > fulltickAsInt ) {
                    fromDataBuffer = self.fullTicks[i][1];
                }
                
                if ( parseInt( toData.replace( /-/gi, '' ) ) > fulltickAsInt ) {
                    toDataBuffer = self.fullTicks[i][1];
                }
                
                if ( fromData == self.fullTicks[i][0] ) {
                    fromDataAfter = self.fullTicks[i][1];
                }
                
                if ( toData == self.fullTicks[i][0] ) {
                    toDataAfter = self.fullTicks[i][1];
                }
            }
            
            if ( fromDataAfter == 0 ) fromDataAfter = fromDataBuffer;
            if ( toDataAfter == 0 ) toDataAfter = toDataBuffer;
            
            self.overview = $.plot( $( '#overview' + self.chartId ), self.data, self.overviewOptions );
            self.log( 'fromDataAfter:' + fromDataAfter );
            self.log( 'toDataAfter:' + toDataAfter );
            self.overview.setSelection( {x1: fromDataAfter, x2: toDataAfter} );
        };
};
