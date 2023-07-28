"use server"
import cheerio from 'cheerio';

export const isMetaProduct = (html: string): boolean => {
    const $ = cheerio.load(html);
    const isProduct =  $('meta[property="og:type"]').attr('content')
        ?? $('meta[name="type"]').attr('content')
        ?? $('meta[name="twitter:type"]').attr('content')
        ?? $('.post-type').text()
        ?? $('.entry-type').text()
        ?? $('.articleType').text()
        ?? $('.type').text()

    return isProduct.includes("product") ? true : false;
};
