const languageToProjects = require('../data/languages-to-projects.json');
const languages = require('../data/languages.json');

let wordcloudState = {
  selectedLanguage: false,
  domainBy: 'line',// line, file
  languages,
  getCountContainerText: (language) => {
    return `${languages.total[language][`${wordcloudState.domainBy}s`]} ${wordcloudState.domainBy}s of ${language}`;
  },
  getLanguageTotals: (scaleSize) => {
    return _.map(wordcloudState.languages.total, (languageItem, language) => {
      return {text: language, size: scaleSize(languageItem[`${wordcloudState.domainBy}s`])};
    });
  },
  getTotalDomain: () => {
    return [languages.total[`${wordcloudState.domainBy}Domain`].min, languages.total[`${wordcloudState.domainBy}Domain`].max];
  },
  getProjectsFromLanguage: (language) => {
    return languageToProjects[language];
  },
};

export default wordcloudState;
