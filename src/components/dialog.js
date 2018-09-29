import m from 'mithril';
import moment from 'moment';

import dialogPolyfill from 'dialog-polyfill';

import wordcloudState from '../models/wordcloud-state';

import '../css/dialog.css';

const dialog = {
  view: (vnode) => {
    let total = vnode.attrs.data['total'];
    delete vnode.attrs.data['total'];
    return [
      m('button', {class: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent', onclick: function(evt) {

        let dialog = evt.target.parentElement.lastChild;

        if (!dialog.showModal) {
          dialogPolyfill.registerDialog(dialog);
        }
        dialog.showModal();
        evt.redraw = false;
      }}, vnode.attrs.bt),
      m('dialog', {
        class: 'mdl-dialog',
        style: 'top: 20px;overflow-y:scroll;',
      },
      [
        m('h3', {class: 'mdl-dialog__title'}, vnode.attrs.title),
        m('div', {class: 'mdl-dialog__content', style: 'padding-top:0px;'},
          m('ul', {class: 'mdl-list', style: 'width: 100%;margin:0px;'}, _.map(vnode.attrs.data, (stats, author) => {
            let nsKey = `numstat${_.upperFirst(wordcloudState.domainBy)}`;
            let numstat = stats[nsKey];
            let firstDayWork = new moment(stats.firstCommitDate, 'YYYY-MM-DD HH:mm:ss +-HH:mm').format('dddd, MMMM Do YYYY');
            let lastDayWork = new moment(stats.lastCommitDate, 'YYYY-MM-DD HH:mm:ss +-HH:mm').format('dddd, MMMM Do YYYY');

            return m('li', {class: 'mdl-list__item mdl-list__item--three-line', style: 'height:100%;'}, [
              m('span', {class: 'mdl-list__item-primary-content', style: 'height:100%;'}, [
                m('span', {}, author),
                m('span', {class: 'mdl-list__item-text-body', style: 'height:100%;'},
                  `With a total of ${stats.commitCount} commits and ${stats.daysOfWork} days of work, ${author} started work on ${firstDayWork} and ended work on ${lastDayWork} with a total of ${numstat.added} ${wordcloudState.domainBy}s added, ${numstat.removed} ${wordcloudState.domainBy}s removed; leaving a total of ${numstat.total} ${wordcloudState.domainBy}s contributed.`
                ),
              ]),
            ]);
          }))
        ),
        m('div', {class: 'mdl-dialog__actions'}, [
          m('button', {class: 'mdl-button', type:'button', onclick: function(evt) {
            let dialog = evt.target.parentElement.parentElement;
            dialog.close();
            evt.redraw = false;
          }}, 'close'),
        ]),
      ]
      ),
    ];
  },
};

export default dialog;
