import moment from 'moment';
import * as puppeteer from 'puppeteer';

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://blog.twitch.tv/en/search/');

    const results: any = await page.evaluate(`
        import("/_pagefind/pagefind.js").then(pagefind => {
            return pagefind.search("badge", { sort: { date: "desc" } }).then(search => {
                return Promise.all(search.results.map(hit => hit.data()))
            })
        })
    `);

    await results
        // .filter((hit: any) => moment().diff(moment(new Date(hit.meta.dateFormatted)), 'days') < 400)
        .map((hit: any) => {
            const date = hit.meta.dateFormatted
            console.log(date)
        })
    
    await browser.close();
}

run()