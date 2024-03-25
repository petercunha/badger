import { SearchResult } from './types';
import puppeteer from 'puppeteer';


export async function getPosts(): Promise<SearchResult[]> {
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

    await browser.close();
    return results;
}