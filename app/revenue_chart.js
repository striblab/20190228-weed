import * as d3 from 'd3';
import * as c3 from 'c3';

class RevenueChart {

    constructor(target) {
        this.target = target;
        this.chartCounts = null;
    }

    render(type) {
        var self = this;
        var states;
        var totals;

        if (type == 'med') {
            states = ['MI','AZ','IL','RI','NM','CT','NY','NJ','MT','FL','HI','MN','NH','DE'];
            totals = ['Revenue',633,406,91,60,54,50,41,37,32,17,17,9,7,7];
        } else {
            states = ['CA','CO','WA','OR','MA','NV','AK'];
            totals = ['Revenue',6000,1500,1300,520,195,102,39];
        }

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
                    totals
                ],
                type: 'bar',
                labels: {
                    format: {
                        'Revenue': d3.format('$,')
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
                pattern: ['#299E3D']
            },
            axis: {
                rotated: true,
                y: {
                    max: 8000,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0, 2000, 4000, 6000, 8000],
                        format: d3.format('$,')
                    }
                },
                x: {
                    padding: {
                        right: 0,
                        left: 0
                    },
                    type: 'category',
                    categories: states,
                    tick: {
                        multiline: false
                    }
                }
            },
            grid: {
                focus: {
                    show: false
                }
                // y: {
                //     lines: [{
                //         value: 0.5,
                //         text: '',
                //         position: 'start',
                //         class: 'powerline'
                //     }]

                // }
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color) {
                    return '<div class="chart-tooltip gray5"><span class="tooltip-label">' + d[0].x + ':</span>' +
                        '<span class="tooltip-value">' + defaultValueFormat(d[0].value) + '</span></div>'
                }
            }
        });

    }
}

export {
    RevenueChart as
    default
}