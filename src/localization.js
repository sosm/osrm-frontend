'use strict';

var language_mapping = {
  en: require('../i18n/en'),
  de: require('../i18n/de'),
  fr: require('../i18n/fr'),
};

module.exports = {
  getLanguages: function() {
    var languages = {};
    for (var key in language_mapping) {
      languages[key] = language_mapping[key].name;
    }
    return languages;
  },
  get: function(language) {
    return language_mapping[language];
  },
  t: function(language, key) {
    if (language_mapping[language] && language_mapping[language][key]) {
      return language_mapping[language][key];
    } else if (language_mapping['en'] && language_mapping['en'][key]) {
      return language_mapping['en'][key];
    } else {
      return key;
    }
  }
};
