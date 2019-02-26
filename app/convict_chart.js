import * as d3 from 'd3';
import * as c3 from 'c3';

class ConvictChart {

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
                    ['x',2013,2014,2015,2016,2017,2018,2019],
                    ['Petty',7019,7088,7351,7246,7561,7012,null],
                    ['Misdemeanor',3794,3910,4304,4288,4556,4534,null],
                    ['Felony',91,90,71,247,657,747,null]
                ],
                type: 'area',
                groups: [['Petty', 'Misdemeanor', 'Felony']],
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
                    if (d.x == 2017) {
                        return 1;
                    } else {
                        return 1;
                    }
                }
            },
            color: {
                pattern: ['#F7F7F7','#969696','#252525']
            },
            axis: {
                // rotated: true,
                y: {
                    max: 15000,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0,3000,6000,9000,12000,15000],
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
                }
                // x: {
                //     lines: [{
                //         value: 2014,
                //         text: '',
                //         position: 'start',
                //         class: 'powerline'
                //     }]

                // }
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                    var tipThread = '<div class="chart-tooltip gray3"><span class="tooltip-label">' + d[0].x + '</span></div><div class="chart-tooltip gray1"><span class="tooltip-label">Petty: </span><span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div><div class="chart-tooltip gray3"><span class="tooltip-label">Misdemeanor: </span><span class="tooltip-value">' + defaultValueFormat(d[1].value) + '</span></div><div class="chart-tooltip gray5"><span class="tooltip-label">Felony: </span><span class="tooltip-value">' + defaultValueFormat(d[2].value) + '</span></div>';

                    return tipThread;
                }
            }
        });

    }
}

export {
    ConvictChart as
    default
}