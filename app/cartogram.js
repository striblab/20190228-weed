import * as d3 from 'd3';

$(document).ready(function() {
  cartogram4.init();
});

var cartogram4 = {
  margin: {
      top: 70,
      right: -110,
      bottom: 30,
      left: 30
  },

  selector: '#map2 svg',

  init: function() {
      var self = this;

      self.$el = $(self.selector);

      self.width = 605;
      self.height = 300;

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
          .data(self.state_legal)
          .enter().append('g')
          .attr('class', 'state-groups');

      var state = states.append('rect')
          .attr('id', function(d) {
              return d.state_postal + "d";
          })
          .attr('class', 'state')

          .attr('class', function(d) {
              return d.color;
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
          .attr('criminal', function(d) {
              return d.criminal;
          });
          // .call(tip3)
          // .on('mouseover', tip3.show)
          //  .on('mouseout', tip3.hide);

      var text = states.append('text')
          .attr('class', 'state-label')
          .attr('class', function(d) {
              return d.color;
          })
          .attr('dominant-baseline', 'central')
          .attr('x', function(d) {
              return (d.column * (self.state_size + self.state_padding))
                      + self.state_size / 2; })
          .attr('y', function(d) {
              return (d.row * (self.state_size + self.state_padding))
                  + self.state_size / 2; })
          .style('text-anchor', 'middle')
          .call(tip2)
          .on('mouseover', tip3.show)
           .on('mouseout', tip3.hide)
          .text(function(d) {
              return d.state_postal;
          });
  },

state_legal: [{'state_full':'Alabama','state_postal':'AL','row':5,'column':6,'state_total':'No laws legalizing marijuana','color':'dq0'},
      {'state_full':'Alaska','state_postal':'AK','row':6,'column':0,'state_total':'Marijuana legalized for recreational use','color':'dq3','criminal':'yes'},
      {'state_full':'Arizona','state_postal':'AZ','row':4,'column':1,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'yes'},
      {'state_full':'Arkansas','state_postal':'AR','row':4,'column':4,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'yes'},
      {'state_full':'California','state_postal':'CA*','row':3,'column':0,'state_total':'No laws legalizing marijuana','color':'dq2','criminal':'no'},
      {'state_full':'Colorado','state_postal':'CO','row':3,'column':2,'state_total':'Marijuana legalized for recreational use','color':'dq3','criminal':'yes'},
      {'state_full':'Connecticut','state_postal':'CT*','row':2,'column':9,'state_total':'Marijuana legalized for medical use','color':'dq3','criminal':'no'},
      {'state_full':'District of Columbia','state_postal':'DC','row':4,'column':8,'state_total':'Marijuana legalized for medical use','color':'dq3','criminal':'yes'},
      {'state_full':'Delaware','state_postal':'DE*','row':3,'column':9,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'Florida','state_postal':'FL','row':6,'column':8,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'Georgia','state_postal':'GA','row':5,'column':7,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Hawaii','state_postal':'HI','row':6,'column':-1,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'yes'},
      {'state_full':'Idaho','state_postal':'ID','row':1,'column':1,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Illinois','state_postal':'IL','row':1,'column':6,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'yes'},
      {'state_full':'Indiana','state_postal':'IN','row':2,'column':5,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Iowa','state_postal':'IA','row':2,'column':4,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'Kansas','state_postal':'KS','row':4,'column':3,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Kentucky','state_postal':'KY','row':3,'column':5,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'Louisiana','state_postal':'LA','row':5,'column':4,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Maine','state_postal':'ME*','row':-1,'column':10,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'Maryland','state_postal':'MD*','row':3,'column':8,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'Massachusetts','state_postal':'MA*','row':1,'column':9,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'Michigan','state_postal':'MI','row':1,'column':7,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'yes'},
      {'state_full':'Minnesota','state_postal':'MN*','row':1,'column':4,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'Mississippi','state_postal':'MS*','row':5,'column':5,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'no'},
      {'state_full':'Missouri','state_postal':'MO','row':3,'column':4,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'Montana','state_postal':'MT','row':1,'column':2,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'yes'},
      {'state_full':'Nebraska','state_postal':'NE*','row':3,'column':3,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'no'},
      {'state_full':'Nevada','state_postal':'NV*','row':2,'column':1,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'New Hampshire','state_postal':'NH','row':0,'column':10,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'yes'},
      {'state_full':'New Jersey','state_postal':'NJ','row':2,'column':8,'state_total':'No laws legalizing marijuana','color':'dq2','criminal':'yes'},
      {'state_full':'New Mexico','state_postal':'NM','row':4,'column':2,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'yes'},
      {'state_full':'New York','state_postal':'NY*','row':1,'column':8,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'North Carolina','state_postal':'NC*','row':4,'column':6,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'no'},
      {'state_full':'North Dakota','state_postal':'ND','row':1,'column':3,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Ohio','state_postal':'OH*','row':2,'column':6,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'no'},
      {'state_full':'Oklahoma','state_postal':'OK','row':5,'column':3,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Oregon','state_postal':'OR','row':2,'column':0,'state_total':'Marijuana legalized for recreational use','color':'dq3','criminal':'yes'},
      {'state_full':'Pennsylvania','state_postal':'PA','row':2,'column':7,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Rhode Island','state_postal':'RI*','row':2,'column':10,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'South Carolina','state_postal':'SC','row':4,'column':7,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'South Dakota','state_postal':'SD','row':2,'column':3,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Tennessee','state_postal':'TN','row':4,'column':5,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'Texas','state_postal':'TX','row':6,'column':3,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Utah','state_postal':'UT','row':3,'column':1,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'Vermont','state_postal':'VT*','row':0,'column':9,'state_total':'Marijuana legalized for medical use','color':'dq2','criminal':'no'},
      {'state_full':'Virginia','state_postal':'VA','row':3,'column':7,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'Washington','state_postal':'WA','row':1,'column':0,'state_total':'Marijuana legalized for recreational use','color':'dq3','criminal':'yes'},
      {'state_full':'West Virginia','state_postal':'WV','row':3,'column':6,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'},
      {'state_full':'Wisconsin','state_postal':'WI','row':1,'column':5,'state_total':'No laws legalizing marijuana','color':'dq0','criminal':'yes'},
      {'state_full':'Wyoming','state_postal':'WY','row':2,'column':2,'state_total':'No laws legalizing marijuana','color':'dq1','criminal':'yes'}]

};