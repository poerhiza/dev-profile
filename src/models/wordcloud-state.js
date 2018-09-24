const languageToProjects = require('../data/languages-to-projects.json');

let wordcloudState = {
  selectedLanguage: false,
  getProjectsFromLanguage: (language) => {
    return languageToProjects[language];
  },
};

export default wordcloudState;
