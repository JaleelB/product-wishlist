"use server"
import cheerio from 'cheerio';

export const isMetaProduct = (html: string): boolean => {
    const $ = cheerio.load(html);
    const metaType = $('meta[property="og:type"]').attr('content')
        ?? $('meta[name="product"]').attr('content')
        ?? $('meta[name="twitter:card"]').attr('content')
        ?? $('meta[itemprop="itemtype"]').attr('content');

    const classTypeExists = $('.product').length > 0
        ?? $('.product-page').length > 0
        ?? $('.product-detail').length > 0
        ?? $('#product').length > 0
        ?? $('#productTitle').length > 0
        ?? $('#title #productTitle').length > 0
        ?? $('.a-price').length > 0
        ?? $('#item_name').length > 0
        ?? $('h1.a-size-large').length > 0

    return (metaType ? metaType.includes("product") : false) || classTypeExists;
};
