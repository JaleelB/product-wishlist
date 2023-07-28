"use server"
import cheerio from 'cheerio';

export const getMetaDescription = (html: string): string => {
  const $ = cheerio.load(html);
  return $('meta[property="og:description"]').attr('content')
    ?? $('meta[name="description"]').attr('content')
    ?? $('meta[name="twitter:description"]').attr('content')
    ?? $('.post-description').text()
    ?? $('.entry-description').text()
    ?? $('.articleBody').text()
    ?? $('.description').text();
};
