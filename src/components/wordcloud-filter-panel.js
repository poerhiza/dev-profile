import m from 'mithril';

import styles from '../css/wordcloud-filter-panel.css';

const WordcloudFilterPanel = {
  view: () => {
    return m('div',
      {
        class: 'WordcloudFilterPanel',
      },
      [
        m('button', {'class': 'mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent'}, 'clickme'),
      ]
    );
  },
};

export default WordcloudFilterPanel;
