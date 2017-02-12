var loaded = require('./facebook');

chrome.webNavigation.onHistoryStateUpdated.addListener(loaded);
