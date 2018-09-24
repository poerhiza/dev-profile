import m from 'mithril';

import wordcloudState from '../models/wordcloud-state';

const main = {
  view: (vnode) => {

    wordcloudState.selectedLanguage = (vnode.attrs.language) ? vnode.attrs.language : false;

    let projects = m('h3', {}, 'Click on a project in the header to get a listing of projects that utilize that language!');

    if (wordcloudState.selectedLanguage) {
      projects = [];

      _.forEach(wordcloudState.getProjectsFromLanguage(wordcloudState.selectedLanguage), (project) => {
        projects.push(
          m('div.project', {
            class: 'mdl-cell mdl-card mdl-shadow--4dp portfolio-card',
          }, [
            m('div', {class: 'mdl-card__title'},
              m('h2', {class: 'mdl-card__title-text'}, `${project}`)
            ),
            m('div', {class: 'mdl-card__supporting-text'}, 'Enim labore aliqua consequat ut quis ad occaecat aliquip incididunt. Sunt nulla eu enim irure enim nostrud aliqua consectetur ad consectetur sunt ullamco officia. Ex officia laborum et consequat duis.'),
            m('div', {class: 'mdl-card__actions mdl-card--border'}, [
              m('div', {class: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent', href:''}, 'Read more'),
            ]),
          ])
        );
      });
    }
    return m(
      'div.main',
      {
        class: 'mdl-layout__content',
      },
      [m('div',{class: 'mdl-grid portfolio-max-width'},projects)]
    );
  },
};

export default main;
