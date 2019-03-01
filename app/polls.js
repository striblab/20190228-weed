import * as d3 from 'd3';
import * as c3 from 'c3';

class PollChart {

    constructor(target) {
        this.target = target;
        this.chartCounts = null;
    }

    render() {
        var self = this;

        var padding = {
            top: 20,
            right: 40,
            bottom: 20,
            left: 60,
        };

        self.chartCounts = c3.generate({
            bindto: self.target,
            padding: padding,
            data: {
                x: 'x',
                columns: [
                    ['x',1970,1971,1972,1973,1974,1975,1976,1977,1978,1979,1980,1981,1982,1983,1984,1985,1986,1987,1988,1989,1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],
                    ['US',0.12,null,null,0.16,null,null,null,0.28,null,null,0.25,null,null,null,null,0.23,null,null,null,null,null,null,null,null,0.25,null,null,null,null,null,0.31,null,null,0.34,null,0.36,null,null,null,null,0.46,null,0.48,0.58,0.51,0.58,null,0.64,0.66,null],
                    ['Midwest',null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,0.4,0.41,0.54,0.44,0.58,0.45,null,null,null,0.65,null]
                ],
                type: 'line',
                labels: {
                    format: {
                        // 'Source': d3.format('.0%')
                    }
                },
                line: {
                    connectNull: true
                }
            },
            legend: {
                show: false
            },
            line: {
                connectNull: true
            },
            point: {
                show: true,
                r: function(d) {
                    if (d.x == 2018) {
                        return 6;
                    } else {
                        return 2;
                    }
                }
            },
            color: {
                pattern: ['#299E3D','#C7E5B5']
            },
            axis: {
                // rotated: true,
                y: {
                    max: 1,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0, 0.25, 0.50, 0.75, 1],
                        format: d3.format('.0%')
                    }
                },
                x: {
                    padding: {
                        right: 0,
                        left: 0
                    },

                    tick: {
                        multiline: false
                    }
                }
            },
            grid: {
                focus: {
                    show: false
                },
                y: {
                    lines: [{
                        value: 0.5,
                        text: '',
                        position: 'start',
                        class: 'powerline'
                    }]

                }
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                    var tipThread = '<div class="chart-tooltip gray3"><span class="tooltip-label">' + d[0].x + '</span></div>';

                    if (d[0].value != null) {
                        tipThread = tipThread + '<div class="chart-tooltip green4"><span class="tooltip-label">National:</span><span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div>';
                    }
                    if (d[1].value != null) {
                        tipThread = tipThread + '<div class="chart-tooltip green2"><span class="tooltip-label">Midwest:</span><span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span></div>';
                    }
                    return tipThread;
                }
            }
        });

    }
}

export {
    PollChart as
    default
}