import m from 'mithril';

import styles from '../css/wordcloud.css';
import wordcloudState from '../models/wordcloud-state';

const _ = require('lodash');
const d3 = require('d3');
const cloud = require('d3-cloud');

let scaleSize = d3.scaleLog()
  .range([16, 48])
  .domain(wordcloudState.getTotalDomain());

const getSize = (wp=1, hp=1) => {
  const w = window,
    e = document.documentElement,
    g = document.documentElement.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth,
    height = w.innerHeight|| e.clientHeight|| g.clientHeight;
  return {width: wp*width, height: hp*height};
};

const cloudSize = getSize(1, .15);

let getCloud = () => {
  return cloud()
    .size([cloudSize.width, cloudSize.height])
    .words(
      wordcloudState.getLanguageTotals(scaleSize)
    )
    .padding(5)
    .font('Impact')
    .rotate(0)
    .fontSize((d) => { return d.size; })
    .on('end', (words) => {
      let countContainer = document.querySelector('#countContainer');
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
        .on('mouseover', function(evt) {
          this.oldColor = this.style.fill;
          this.style.fill = 'orange';
          countContainer.innerHTML = wordcloudState.getCountContainerText(this.innerHTML);
        })
        .on('mouseout', function() {
          this.style.fill = this.oldColor;
          countContainer.innerHTML = '';
        })
        .on('click', (item) => {
          location.hash = location.hash.replace(/language\/.*/, `language/${btoa(item.text)}`);

          if (location.hash.indexOf('language') === -1) {
            location.hash = `#!/language/${btoa(item.text)}`;
          }
        });
    });
};

const wordcloud = {
  onupdate: function(vnode) {

    if (vnode){//wordcloud plugin doesn't have a remove/clear method...
      while (vnode.dom.hasChildNodes()) {
        vnode.dom.removeChild(vnode.dom.lastChild);
      }
    }

    this.layout = getCloud().start();
  },
  oninit: function() {
    this.layout = getCloud();
  },
  oncreate: function() {
    this.layout.start();
  },
  view: function() {
    return [m('svg.wordcloud', {style: `min-height: ${cloudSize.height}px;`}), m('hr', {style: 'margin:0px;padding:0px;'})];
  },
};

export default wordcloud;
