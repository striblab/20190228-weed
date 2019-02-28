/**
 * Main JS file for project.
 */

// Define globals that are added through the js.globals in
// the config.json file, here, mostly so linting won't get triggered
// and its a good queue of what is available:
// /* global _ */

// Dependencies
import utils from './shared/utils.js';

// Mark page with note about development or staging
utils.environmentNoting();



// Adding dependencies
// ---------------------------------
// Import local ES6 or CommonJS modules like this:
// import utilsFn from './shared/utils.js';
//
// Or import libraries installed with npm like this:
// import module from 'module';

// Adding Svelte templates in the client
// ---------------------------------
// We can bring in the same Svelte templates that we use
// to render the HTML into the client for interactivity.  The key
// part is that we need to have similar data.
//
// First, import the template.  This is the main one, and will
// include any other templates used in the project.
// import Content from '../templates/_index-content.svelte.html';
//
// Get the data parts that are needed.  There are two ways to do this.
// If you are using the buildData function to get data, then ?
//
// 1. For smaller datasets, just import them like other files.
// import content from '../assets/data/content.json';
//
// 2. For larger data points, utilize window.fetch.
// let content = await (await window.fetch('../assets/data/content.json')).json();
//
// Once you have your data, use it like a Svelte component:
//
// const app = new Content({
//   target: document.querySelector('.article-lcd-body-content'),
//   data: {
//     content
//   }
// });

import * as d3 from 'd3';

import PollChart from './polls.js';
import RaceChart from './race_chart.js';
import CrimeChart from './crime_chart.js';
import ConvictChart from './convict_chart.js';
import RevenueChart from './revenue_chart.js';

const chartPoll = new PollChart('#chartPoll');
const chartRace = new RaceChart("#chartRace");
const chartCrime = new CrimeChart("#chartCrime");
const chartConvict = new ConvictChart("#chartConvict");
const chartRevenue = new RevenueChart("#chartRevenue");
const chartRevenueM = new RevenueChart("#chartRevenueM");

chartPoll.render();
chartRace.render();
chartCrime.render();
chartConvict.render();
chartRevenue.render('rec');
chartRevenueM.render('med');

var aspect = 550 / 400, chart = $("#carto1 svg");
$(window).on("resize", function() {   
  var targetWidth = chart.parent().width();   
  chart.attr("width", targetWidth);   
  chart.attr("height", targetWidth / aspect);
});

$(window).on("load", function() {   
    var targetWidth = chart.parent().width();   
    chart.attr("width", targetWidth);   
    chart.attr("height", targetWidth / aspect);
  });


  var cartogram1 = {
    margin: {
        top: 40,
        right: 140,
        bottom: 0,
        left: 60
    },

    selector: '#carto1 svg',
    init: function() {
        var self = this;
        self.$el = $(self.selector);
        self.width = 550 - self.margin.left - self.margin.right;
        self.height = 400 - self.margin.top - self.margin.bottom;
        self.svg = d3.select(self.selector)
            .attr('height', self.height + self.margin.top + self.margin.bottom)
            .attr('width', self.width + self.margin.left + self.margin.right)
        self.state_size = self.width / 12;
        self.state_padding = 2;
        self.map = self.svg.append('g')
            .attr('transform', 'translate(' + self.margin.left + ','
                  + self.margin.top + ')')
        self.drawMap();
    },
    drawMap: function() {
        var self = this;
        var states = self.map.selectAll('.states')
            .data(self.state_pos_co2)
            .enter().append('g')
            .attr('class', 'state-groups');
        var state = states.append('rect')
            .attr('id', function(d) {
                return d.state_postal + "d";
            })
            .attr('class', 'state')
            .attr('class', function(d) {
                //rec sales
                if (d.state_postal == "AK" || d.state_postal == "CA" || d.state_postal == "CO" || d.state_postal == "MA" || d.state_postal == "NV" || d.state_postal == "OR"  || d.state_postal == "WA") {
                    return "green5";
                }
                //rec use
                else if (d.state_postal == "DC" || d.state_postal == "ME" || d.state_postal == "MI" || d.state_postal == "VT") {
                    return "green3";
                } 
                //medical
                else if (d.state_postal == "AZ" || d.state_postal == "AR" || d.state_postal == "CT" || d.state_postal == "DE" || d.state_postal == "FL" || d.state_postal == "HI"  || d.state_postal == "IL" || d.state_postal == "LA"  || d.state_postal == "MD"  || d.state_postal == "MN"  || d.state_postal == "MO"   || d.state_postal == "MT"  || d.state_postal == "NM" || d.state_postal == "NH"  || d.state_postal == "NY"  || d.state_postal == "ND"  || d.state_postal == "OH"  || d.state_postal == "OK"  || d.state_postal == "PA"  || d.state_postal == "RI"  || d.state_postal == "UT"  || d.state_postal == "WV") {
                    return "green1";
                } 
                //medical oils
                else if (d.state_postal == "AL" || d.state_postal == "GA" || d.state_postal == "IN" || d.state_postal == "IA" || d.state_postal == "KY" || d.state_postal == "MS"  || d.state_postal == "NC" || d.state_postal == "SC"  || d.state_postal == "TN"  || d.state_postal == "TX"  || d.state_postal == "VA"  || d.state_postal == "WY") {
                    return "steel";
                }
               else { return "purple3"; }
            })
            .attr('rx', 0)
            .attr('ry', 0)
            .attr('x', function(d) {
                return d.column * (self.state_size + self.state_padding);
            })
            .attr('y', function(d) {
                return d.row * (self.state_size + self.state_padding);
            })
            .attr('width', self.state_size)
            .attr('height', self.state_size)
            .on('click', function(d) {
          
            });

        var text = states.append('text')
            .attr('class', 'state-label')
            .attr('class', function(d) {
                return 'state';
            })
            .attr('dominant-baseline', 'central')
            .attr('x', function(d) {
                return (d.column * (self.state_size + self.state_padding))
                        + self.state_size / 2; })
            .attr('y', function(d) {
                return (d.row * (self.state_size + self.state_padding))
                    + self.state_size / 2; })
            .style('text-anchor', 'middle')
            .on('click', function(d) { 

            })
            .text(function(d) {
                return d.state_postal + d.mark;
            });
    },
    state_pos_co2: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'mark':''},
    {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'mark':''},
    {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'mark':''},
    {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'mark':''},
    {'state_full':'California','state_postal':'CA','row':3,'column':0,'mark':''},
    {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'mark':''},
    {'state_full':'Connecticut','state_postal':'CT','row':2,'column':9,'mark':'*'},
    {'state_full':'D.C.','state_postal':'DC','row':4,'column':8,'mark':''},
    {'state_full':'Delaware','state_postal':'DE','row':3,'column':9,'mark':'*'},
    {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'mark':''},
    {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'mark':''},
    {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'mark':''},
    {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'mark':''},
    {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'mark':'*'},
    {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'mark':''},
    {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'mark':''},
    {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'mark':''},
    {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'mark':''},
    {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'mark':''},
    {'state_full':'Maine','state_postal':'ME','row':-1,'column':10,'mark':''},
    {'state_full':'Maryland','state_postal':'MD','row':3,'column':8,'mark':'*'},
    {'state_full':'Massachusetts','state_postal':'MA','row':1,'column':9,'mark':'*'},
    {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'mark':''},
    {'state_full':'Minnesota','state_postal':'MN','row':1,'column':4,'mark':'*'},
    {'state_full':'Mississippi','state_postal':'MS','row':5,'column':5,'mark':'*'},
    {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'mark':'*'},
    {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'mark':''},
    {'state_full':'Nebraska','state_postal':'NE','row':3,'column':3,'mark':'*'},
    {'state_full':'Nevada','state_postal':'NV','row':2,'column':1,'mark':''},
    {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'mark':'*'},
    {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'mark':''},
    {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'mark':''},
    {'state_full':'New York','state_postal':'NY','row':1,'column':8,'mark':'*'},
    {'state_full':'North Carolina','state_postal':'NC','row':4,'column':6,'mark':'*'},
    {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'mark':''},
    {'state_full':'Ohio','state_postal':'OH','row':2,'column':6,'mark':'*'},
    {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'mark':''},
    {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'mark':''},
    {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'mark':''},
    {'state_full':'Rhode Island','state_postal':'RI','row':2,'column':10,'mark':'*'},
    {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'mark':''},
    {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'mark':''},
    {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'mark':''},
    {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'mark':''},
    {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'mark':''},
    {'state_full':'Vermont','state_postal':'VT','row':0,'column':9,'mark':''},
    {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'mark':''},
    {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'mark':''},
    {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'mark':''},
    {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'mark':''},
    {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'mark':''}]
};

  cartogram1.init();