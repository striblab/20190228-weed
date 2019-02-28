import * as d3 from 'd3';
import * as c3 from 'c3';

class RaceChart {

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
                columns: [
                    ['Population',0.84,0.07,0.05,0.01,0.05],
                    ['Cases',0.55,0.24,0.05,0.10,0.06]
                ],
                type: 'bar',
                labels: {
                    format: {
                        'Population': d3.format('.0%'),
                        'Cases': d3.format('.0%')
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
                pattern: ['#CCCCCC','#857AAA']
            },
            axis: {
                rotated: true,
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
                    type: 'category',
                    categories: ['White','Black','Hispanic','Native','Asian'],
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
                        // value: 0.5,
                        // text: '',
                        // position: 'start',
                        // class: 'powerline'
                    }]

                }
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                    return '<div class="chart-tooltip gray5"><span class="tooltip-label">' + d[0].x + ':</span>' +
                        '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div>'
                }
            }
        });

        d3.selectAll(".c3-target-Cases")
        .selectAll(".c3-bar, .c3-texts")
        .attr("transform", "translate(0, 3)");

    }
}

export {
    RaceChart as
    default
}