import { IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';
import { FeaturedImagesMap } from '../data/featured-images';

function imageLoader(config: ImageLoaderConfig): string {
  return config.src;
}

@Component({
  selector: 'featured-image',
  imports: [NgOptimizedImage],
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        placeholderResolution: 40,
        disableImageSizeWarning: true,
      },
    },
    {
      provide: IMAGE_LOADER,
      useValue: imageLoader,
    },
  ],
  template: `
    @switch (this.imageType()) { @case ('full') {
    <picture>
      <img [ngSrc]="this.imageFull()" [width]="1920" [height]="1080" placeholder priority [alt]="this.alt()" />
    </picture>
    } @case ('cell') {
    <picture>
      <img [ngSrc]="this.imageCell()" [width]="700" [height]="320" placeholder [alt]="this.alt()" />
    </picture>
    } @case ('row') {
    <picture>
      <img [ngSrc]="this.imageRow()" [width]="320" [height]="250" placeholder [alt]="this.alt()" />
    </picture>
    } }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedImage {
  image = input.required<string>();
  featuredImagesMap = FeaturedImagesMap;
  alt = input('Featured Image');
  fullWidth = input(false, { transform: booleanAttribute });
  gridType = injectLocalStorage<'cell' | 'row'>('grid', { defaultValue: 'row' });

  imageType = computed<'full' | 'cell' | 'row'>(() => {
    if (this.fullWidth()) {
      return 'full';
    }
    if (this.gridType() === 'cell') {
      return 'cell';
    }
    return 'row';
  });

  imageFull = computed((): string => {
    const image = this.image();
    return this.featuredImagesMap.get(image)?.sizes['1920x1080'] || image;
  });

  imageCell = computed((): string => {
    const image = this.image();
    return this.featuredImagesMap.get(image)?.sizes['700x320'] || image;
  });

  imageRow = computed((): string => {
    const image = this.image();
    return this.featuredImagesMap.get(image)?.sizes['320x250'] || image;
  });
}
