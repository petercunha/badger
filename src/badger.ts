import { SearchResult } from './types';
import puppeteer from 'puppeteer';
import moment from 'moment';

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://blog.twitch.tv/en/search/');

    const results = await await page.evaluate(`
        // This code is run inside a headless browser via puppeteer
        import("/_pagefind/pagefind.js").then(pagefind => {
            return pagefind.search("badge", { sort: { date: "desc" } }).then(search => {
                return Promise.all(search.results.map(hit => hit.data()))
            })
        })
    `) as SearchResult[];
    
    results
        .filter((hit: any) => moment().diff(moment(new Date(hit.meta.dateFormatted)), 'days') < 30)
        .map((hit: any) => {
            const date = hit.meta.dateFormatted
            console.log(date)
        })
    
    await browser.close();
}

run()