import * as d3 from 'd3';
import * as c3 from 'c3';

class CrimeChart {

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
                    ['x',2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019],
                    ['Convictions',null,4098,4310,4321,4518,5047,null,null,null,null]
                ],
                type: 'area',
                labels: {
                    format: {
                        'Convictions': d3.format(',')
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
                pattern: ['#333333','#5BBF48']
            },
            axis: {
                rotated: true,
                y: {
                    max: 6000,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0,2000,4000,6000],
                        format: d3.format(',')
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
                        tipThread = tipThread + '<div class="chart-tooltip gray5"><span class="tooltip-label">National:</span><span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div>';
                    }
                    if (d[1].value != null) {
                        tipThread = tipThread + '<div class="chart-tooltip green3"><span class="tooltip-label">Midwest:</span><span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span></div>';
                    }
                    return tipThread;
                }
            }
        });

    }
}

export {
    CrimeChart as
    default
}