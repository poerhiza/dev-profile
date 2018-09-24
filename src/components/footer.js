import m from 'mithril';

import pkg from '../../package.json';

const footer = {
  view: () => {
    return m('footer',
      {
        class: 'mdl-mini-footer',
      },
      [
        m('div',
          {
            class: 'mdl-mini-footer__left-section',
          },
          `${pkg.name} Portfolio v${pkg.version} - ${pkg.description}`
        ),
        m('div',
          {
            class: 'mdl-mini-footer__right-section',
          },
          m('ul',
            {
              class: 'mdl-mini-footer__link-list',
            },
            [
              m('li',
                m('a', {href: '/'}, 'About')
              ),
            ]
          )
        ),
      ]
    );
  },
};

export default footer;
