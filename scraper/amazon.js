const puppeteer = require('puppeteer');
function run () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto("https://www.amazon.com/s?k=iphone");
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('.a-section img');
                let items2 = document.querySelectorAll('.a-offscreen');
                let items3 = document.querySelectorAll('.a-link-normal');
                items.forEach((item) => {
                    results.push({
                        title:  item.getAttribute('alt'),
                        image:  item.getAttribute('src')                        
                        
                    });
                });
                
                items2.forEach((item) => {
                    results.push({
                       
                        price:  item.innerText
                                               
                    });
                });
                
                items3.forEach((item) => {
                    results.push({
                       
                        link:  item.getAttribute('href')
                                                
                    });
                });
                

                
                return results;
            })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
run().then(console.log).catch(console.error);