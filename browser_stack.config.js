module.exports = {
  browsers: {
    bs_chrome_mac: {
      base: 'BrowserStack',
      browser: 'chrome',
      os: 'OS X',
      os_version: 'High Sierra'
    },
    bs_safari_mac: {
      base: 'BrowserStack',
      browser: 'safari',
      os: 'OS X',
      os_version: 'High Sierra'
    },
    bs_firefox_win: {
      base: 'BrowserStack',
      browser: 'firefox',
        // TODO: FF 65 compatibility
      browser_version: '64.0',
      os: 'Windows',
      os_version: '8.1'
    },
    bs_chrome_win: {
      base: 'BrowserStack',
      browser: 'chrome',
      os: 'Windows',
      os_version: '8.1'
    },
    bs_ie_win: {
      base: 'BrowserStack',
      browser: 'ie',
      os: 'Windows',
      os_version: '8.1'
    },
  }
}
