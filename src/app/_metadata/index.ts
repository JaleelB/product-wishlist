"use server"
import { type Metadata } from '@/types';
import { getMetaTitle } from './meta-title';
import { getMetaDescription } from './meta-description';
import { getMetaImage } from './meta-image';
import { getMetaUrl } from './meta-url';


export const getMetadata = async (url: string): Promise<Metadata> => {

  const response = await fetch(url);
  const html = await response.text();

  return {
    title: getMetaTitle(html),
    description: getMetaDescription(html),
    image: getMetaImage(html),
    url: getMetaUrl(html),
  };
};
