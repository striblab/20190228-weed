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
            states = ['AZ','IL','RI','NM','CT','NY','NJ','MT','FL','HI','MN','NH','DE'];
            totals = ['Revenue',406.7,91.1,60.2,54.2,50,40.9,37,31.8,17.4,17.2,9.6,7.2,7.1];
        } else {
            states = ['CA','CO','WA','OR','ME','MA','NV','AK','MI','DC'];
            totals = ['Revenue',2750,1560,1000,777.6,633,106,102.7,39.5,83.4,17.7];
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
                pattern: ['#5BBF48']
            },
            axis: {
                rotated: true,
                y: {
                    max: 3000,
                    min: 0, 
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                    tick: {
                        count: 4,
                        values: [0, 1000, 2000, 3000],
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