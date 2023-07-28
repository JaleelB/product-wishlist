"use server"
import cheerio from 'cheerio';

export const getMetaImage = (html: string): string => {
  const $ = cheerio.load(html);
  return $('meta[property="og:image"]').attr('content')!
    ?? $('meta[name="twitter:image"]').attr('content')
    ?? $('input[name="productImageUrl"]').attr('value')
    ?? $('#productImageUrl').attr('value')
    ?? $('meta[itemprop="image"]').attr('content')
    ?? $('article img[src]').attr('src')
    ?? $('#content img[src]').attr('src')
    ?? $('img[alt*="author" i]').attr('src')
    ?? $('.post-image').attr('src')
    ?? $('.entry-image').attr('src')
    ?? $('meta[property="og:image:secure_url"]').attr('content')
    ?? $('meta[property="og:image:url"]').attr('content')
    ?? $('meta[property="og:image"]').attr('content')
    ?? $('meta[name="twitter:image:src"]').attr('content')
    ?? $('meta[property="twitter:image:src"]').attr('content')
    ?? $('meta[property="twitter:image"]').attr('content')
    ?? $('meta[itemprop="image"]').attr('content')
    ?? $('article img[src]').attr('src')
    ?? $('#content img[src]').attr('src')
    ?? $('img[alt*="author" i]').attr('src')
    ?? $('img[src]:not([aria-hidden="true"])').attr('src')
    ?? $('.a-dynamic-image').attr('data-old-hires')
    ?? $('.a-dynamic-image').attr('src');
};
