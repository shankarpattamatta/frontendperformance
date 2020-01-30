const puppeteer = require('puppeteer');
const helperObj = require('./helpers.js');
const perfConfig = require('./config.performance.js')
const lighthouse = require('lighthouse');
//const ReportGeneratorV2 = require('lighthouse/lighthouse-core/report/v2/report-generator');
const fs = require('fs');
const homePageLocators= {
    searchTab:'input[id="suggestion-search"]',
    searchButton:'button[id="suggestion-search-button"]'
};
const searchPageLocators = {
    keyWords:'a[name="kw"]'
};

//create a browser using a closure
(async function(){
   
    const browser = await puppeteer.launch({headless:false,slowMo:250,defaultViewport:{width:1200,height:600}});

    const page = await browser.newPage();
     await page.goto('http://imdb.com');
     await page.waitFor(homePageLocators.searchTab);
     await verify(page,'imdbHomePage');
     await page.type(homePageLocators.searchTab,"JurassicPark");
     await page.click(homePageLocators.searchButton);
     await page.waitFor(searchPageLocators.keyWords);
     await verify(page,'searchResultsPage');
    await browser.close();
}());

async function verify(page, pageName) {
  //  await createDir(resultsDir);
    await page.screenshot({ path:`./results/${pageName}.png`, fullPage: true });
    const metrics = await helperObj.gatherLighthouseMetrics(page, perfConfig);
    fs.writeFileSync(`./results/${pageName}.json`, JSON.stringify(metrics, null, 2));
  // let reportHtml=  new ReportGeneratorV2().generateReportHtml('./results/${pageName}.json');
  //  fs.writeFileSync('/results/${pageName}.html',reportHtml);
    return metrics;
  }
  
  async function createDir(dirName) {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName, '0766');
    }
  }