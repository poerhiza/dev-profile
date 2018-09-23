import m from 'mithril';

import styles from '../css/wordcloud.css';

var d3 = require('d3');
var cloud = require('d3-cloud');

const wordcloud = {
  oninit: function() {
    this.layout = cloud()
      .size([500, 500])
      .words([
        'Hello', 'world', 'normally', 'you', 'want', 'more', 'words',
        'than', 'this'].map(function(d) {
        return {text: d, size: 10 + Math.random() * 90, test: 'haha'};
      }))
      .padding(5)
      .rotate(function() { return 0;})
      .font('Impact')
      .fontSize(function(d) { return d.size; })
      .on('end', (words) => {
        d3.select('svg.wordcloud')
          .attr('width', this.layout.size()[0])
          .attr('height', this.layout.size()[1])
          .append('g')
          .attr('transform', 'translate(' + this.layout.size()[0] / 2 + ',' + this.layout.size()[1] / 2 + ')')
          .selectAll('text')
          .data(words)
          .enter().append('text')
          .attr('class', 'wordcloudItem')
          .style('font-size', function(d) { return d.size + 'px'; })
          .style('font-family', 'Impact')
          .attr('text-anchor', 'middle')
          .attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
          })
          .text(function(d) { return d.text; })
          .on('mouseover', function() {
            this.style.fill = 'orange';
          })
          .on('mouseout', function() {
            this.style.fill = 'black';
          })
          .on('click', (item) => {
            console.log(item);
          });
      });


  },
  oncreate: function() {
    this.layout.start();
  },
  view: function() {
    return m('svg.wordcloud');
  },
};

export default wordcloud;
