import FeaturedImages from './featured-images.json';

type ImageValue = (typeof FeaturedImages)[0];

export const FeaturedImagesMap = new Map<string, ImageValue>(
  FeaturedImages.map(item => [item.raw, item as ImageValue]),
);
