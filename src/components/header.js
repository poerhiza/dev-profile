import m from 'mithril';

import wordcloudState from '../models/wordcloud-state';

const header = {
  view: () => {
    return m('header',
      {
        class: 'mdl-layout__header',
      },
      [
        m('div',
          {
            class: 'mdl-layout__header-row',
          },
          [
            m('span',
              {
                class: 'mdl-layout-title',
                style: 'margin-right:20px;',
              },
              'Skilz'
            ),
            m('button',
              {
                class: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent',
                style: 'margin-right:20px;',
                onclick: function (evt) {
                  wordcloudState.domainBy = 'line';
                },
                onupdate: (vnode) => {
                  if (wordcloudState.domainBy === 'line') {
                    vnode.dom.classList.remove('mdl-button--primary');
                    vnode.dom.classList.add('mdl-button--accent');
                  } else {
                    vnode.dom.classList.remove('mdl-button--accent');
                    vnode.dom.classList.add('mdl-button--primary');
                  }
                },
              },
              'By Line Count'
            ),
            m('button',
              {
                class: 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary',
                style: 'margin-right:20px;',
                onclick: function (evt, b, c) {
                  wordcloudState.domainBy = 'file';
                },
                onupdate: (vnode) => {
                  if (wordcloudState.domainBy === 'file') {
                    vnode.dom.classList.remove('mdl-button--primary');
                    vnode.dom.classList.add('mdl-button--accent');
                  } else {
                    vnode.dom.classList.remove('mdl-button--accent');
                    vnode.dom.classList.add('mdl-button--primary');
                  }
                },
              },
              'By File Count'
            ),
            m('span', {
              id: 'countContainer',
            }),
          ]
        ),
      ]
    );
  },
};

export default header;
