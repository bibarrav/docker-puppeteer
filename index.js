//Ultra-simple puppeteer to load a page, take a snapshop and upload to azure storage

var azure = require('azure-storage');
var blobService = azure.createBlobService();

//Get Env Variables
var url2Browse = process.env.URL;
var storage_container = process.env.STORAGE_CONTAINER;
var snapshot_name = process.env.SNAPSHOT_NAME;

const puppeteer = require('puppeteer');

(async () => {
    console.log("[Puppeteer] Initializing...");
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--enable-logging', '--v=1'
        ]
    });

    const page = await browser.newPage();
    console.log("[Puppeteer] Open new Page");
    const navigationPromise = page.waitForNavigation({waitUntil: 'networkidle0'});

    await page.goto(url2Browse);
    console.log("[Puppeteer] Loading Page = Browsing to url : " + await page.url());
    await page.setViewport({ width: 1120, height: 621 })
    await navigationPromise;

    console.log("[Puppeteer] Taking Snapshot");
    await page.screenshot({path: '/screenshots/' + snapshot_name + '.png', fullPage: true});

    await blobService.createBlockBlobFromLocalFile(storage_container, 'taskblob', '/screenshots/' + snapshot_name + '.png', function(error, result, response) {
        if (!error) {
          // file uploaded
          ("[Puppeteer] Snapshot Uploaded!");
        } else {
            ("[Puppeteer] Error Uploading Snapshot: " + error);
        }
      });
    
    await browser.close();
    console.log("[Puppeteer] End");
    
})();