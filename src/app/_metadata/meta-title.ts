"use server"
import cheerio from 'cheerio';

export const getMetaTitle = (html: string): string => {
  const $ = cheerio.load(html);
  return $('meta[property="og:title"]').attr('content')
    ?? $('meta[name="twitter:title"]').attr('content')
    ?? $('meta[property="twitter:title"]').attr('content')
    ?? $('title').text()
    ?? $('.post-title').text()
    ?? $('.entry-title').text()
    ?? $('h1[class*="title" i] a').text()
    ?? $('h1[class*="title" i]').text();
};
