const languageToProjects = require('../data/languages-to-projects.json');
const languages = require('../data/languages.json');
const projectInfo = require('../data/projectInfo.json');

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
    let min = (languages.total[`${wordcloudState.domainBy}Domain`].min > 0) ? languages.total[`${wordcloudState.domainBy}Domain`].min : 1;
    let max = (languages.total[`${wordcloudState.domainBy}Domain`].max > 0) ? languages.total[`${wordcloudState.domainBy}Domain`].max : min + 1;
    return [min, max];
  },
  getLanguagesForProject: (project) => {
    let ret = [];
    var total = 0;

    _.forEach(languages[project], function(counts, language) {

      if (language.indexOf('Domain') === -1) {
        total += counts[`${wordcloudState.domainBy}s`];
      }
    });

    _.forEach(languages[project], (junk, language) => {

      if (language.indexOf('Domain') === -1) {
        let value = Number(junk[`${wordcloudState.domainBy}s`]/ total * 100).toFixed(0);
        ret.push({
          'text': language,
          'percent': `${(value > 1) ? value : 1}%`,
        });
      }
    });
    return ret;
  },
  getProjectInfoForProject: (project) => {
    return (projectInfo[project]) ? projectInfo[project] : false;
  },
  getProjectsFromLanguage: (language) => {
    return languageToProjects[language];
  },
};

export default wordcloudState;
