import m from 'mithril';

import 'material-design-lite';

import theme from '../css/material.min.css';
import styles from '../css/layout.css';

import header from './header';
import wordcloud from './wordcloud';
import main from './main';
import footer from './footer';

const layout = {
  view: (vnode) => {
    return m('div', {
      class: 'mdl-layout mdl-js-layout mdl-layout--fixed-header',
    },
    [
      m(header),
      m(wordcloud),
      m(main, vnode.attrs),
      m(footer),
    ]
    );
  },
};

export default layout;
