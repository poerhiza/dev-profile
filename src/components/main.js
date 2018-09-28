import m from 'mithril';

import dialog from './dialog';
import wordcloudState from '../models/wordcloud-state';

const main = {
  view: (vnode) => {
    wordcloudState.selectedLanguage = (vnode.attrs.language) ? vnode.attrs.language : false;

    let projects = m('h3', {}, 'Click on a project in the header to get a listing of projects that utilize that language!');

    if (wordcloudState.selectedLanguage) {
      projects = [];

      _.forEach(wordcloudState.getProjectsFromLanguage(atob(wordcloudState.selectedLanguage)), (project) => {
        let projectInfo = wordcloudState.getProjectInfoForProject(project);
        let projectDescription = 'Default project description not found, create a .skilz file in the root of the project...';
        let projectTitle = 'Default Project Title';
        let projectLinks = [];

        if (projectInfo.description) {
          projectDescription = projectInfo.description;
        }

        if (projectInfo.title) {
          projectTitle = projectInfo.title;
        }

        if (projectInfo.links) {
          projectLinks = projectInfo.links;
        }

        let links = _.map(projectLinks, (link) => {
          return m(
            'a',{
              class: 'mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-button--accent',
              href: link.href,
              target: '_blank',
            },
            link.title
          );
        });

        links.push(m(dialog, {title: 'test', bt: 'Git Stats'}));

        projects.push(
          m('div.project', {
            class: 'mdl-cell mdl-card mdl-shadow--4dp portfolio-card',
          }, [
            m('div', {class: 'mdl-card__title'},
              m('h2', {class: 'mdl-card__title-text'}, `${projectTitle}`)
            ),
            m('div', {class: 'mdl-card__supporting-text', style:'height:100%;margin-top:0px;padding-top:0px;'}, [
              m('div', {class: 'mdl-grid'}, [
                m('div', {class: 'mdl-cell mdl-cell--12-col'}, projectDescription),
                m('div', {class: 'mdl-cell mdl-cell--12-col'}, _.map(wordcloudState.getLanguagesForProject(project), (item, index) => {
                  return m('div', {class: 'mdl-grid mdl-grid--no-spacing', style: 'flex: 1'}, [
                    m('div', {class: 'mdl-cell mdl-cell--4-col', style: 'text-align:right'}, item.text),
                    m('div', {class: 'mdl-cell mdl-cell--8-col'}, [
                      m('div', {class: 'mdl-progress', style: 'height:15px;margin:4px;width: 100%;'}, [
                        m('div', {class: 'progressbar bar', style: `width: ${item.percent}`}),
                        m('div', {class: 'bufferbar bar', style: 'width: 100%;'}),
                      ]),
                    ]),
                  ]);
                })),
              ]),
            ]),
            m(
              'div',
              {
                class: 'mdl-card__actions mdl-card--border',
              },
              links
            ),
          ]
          )
        );
      });
      return m(
        'div.main',
        {
          class: 'mdl-layout__content',
        },
        [m('div',{class: 'mdl-grid portfolio-max-width'},projects)]
      );
    }
  },
};

export default main;
