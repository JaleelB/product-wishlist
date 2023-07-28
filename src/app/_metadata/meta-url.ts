"use server"
import cheerio from 'cheerio';

export const getMetaUrl = (html: string): string => {
  const $ = cheerio.load(html);
  return $('meta[property="og:url"]').attr('content')!
    ?? $('link[rel="canonical"]').attr('href')
    ?? $('.post-url').attr('href')
    ?? $('.entry-url').attr('href');
};
