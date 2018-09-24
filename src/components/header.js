import m from 'mithril';

//TODO: https://getmdl.io/components/index.html#layout-section
// update with transparent header menu item, on click have options for WC config.

import wordcloud from './wordcloud';

const header = {
  view: () => {
    return m('header',
      {
        class: 'mdl-layout__header portfolio-header',
        style: 'display: block',
      },
      m(wordcloud)
    );
  },
};

export default header;
