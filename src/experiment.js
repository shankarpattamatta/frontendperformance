const puppeteer = require('puppeteer');

const homePageLocators= {
    dropdown:'input[id="suggestion-search"]',
    searchButton:'button[id="suggestion-search-button"]'
};
const searchPageLocators = {
    keyWords:'a[name="kw"]'
};

//create a browser using a closure
(async function(){
   
    const browser = await puppeteer.launch({headless:false,slowMo:250,defaultViewport:{width:1200,height:600}});
    
    const newPage = await browser.newPage();
   const imdbPage= await newPage.goto('https://www.irctc.co.in/nget/train-search');
    await imdbPage.waitFor(homePageLocators.searchTab);
//    // await verify(imdbPage,'imdbHomePage');
//     await imdbPage.type(homePageLocators.searchTab,"JurassicPark");
//     const searchResultsPage=await imdbPage.click(homePageLocators.searchButton);
//     await searchResultsPage.waitFor(searchPageLocators.keyWords);
//   //  await verify ()
    await browser.close();
}());
