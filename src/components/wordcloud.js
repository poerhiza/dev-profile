import m from 'mithril';

import styles from '../css/wordcloud.css';
import wordcloudState from '../models/wordcloud-state';
import WordcloudFilterPanel from './wordcloud-filter-panel';

const _ = require('lodash');
const d3 = require('d3');
const cloud = require('d3-cloud');

const languages = require('../data/languages.json');

let scaleSize = d3.scaleLog()
  .range([1, 50])
  .domain([languages.total.lineDomain.min, languages.total.lineDomain.max]);

const getSize = (wp=1, hp=1) => {
  const w = window,
    e = document.documentElement,
    g = document.documentElement.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;
  return {width: wp*width, height: hp*height};
};

const wordcloud = {
  oninit: function() {
    let cloudSize = getSize(1, .3);

    this.layout = cloud()
      .size([cloudSize.width, cloudSize.height])
      .words(
        _.map(languages.total, (languageItem, language) => {
          return {text: language, size: scaleSize(languageItem.lines)};
        })
      )
      .padding(5)
      .font('Impact')
      .rotate(0)
      .fontSize((d) => { return d.size; })
      .on('end', (words) => {
        d3.select('svg.wordcloud')
          .attr('width', cloudSize.width)
          .attr('height', cloudSize.height)
          .append('g')
          .attr('transform', 'translate(' + cloudSize.width / 2 + ',' + cloudSize.height / 2 + ')')
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
            this.oldColor = this.style.fill;
            this.style.fill = 'orange';
          })
          .on('mouseout', function() {
            this.style.fill = this.oldColor;
          })
          .on('click', (item) => {
            location.hash = location.hash.replace(/language\/.*/, `language/${item.text}`);

            if (location.hash.indexOf('language') === -1) {
              location.hash = `#!/language/${item.text}`;
            }
          });
      });
  },
  oncreate: function() {
    this.layout.start();
  },
  view: function() {
    return [m('svg.wordcloud'), m(WordcloudFilterPanel)];
  },
};

export default wordcloud;
