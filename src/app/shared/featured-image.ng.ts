import { IMAGE_CONFIG, IMAGE_LOADER, ImageLoaderConfig, NgOptimizedImage } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { injectLocalStorage } from 'ngxtension/inject-local-storage';

function imageLoader(config: ImageLoaderConfig): string {
  const url = new URL(config.src, 'https://images.unsplash.com/');
  if (config.loaderParams) {
    const defaultParams = {
      w: 1920,
      h: 1080,
      auto: 'format',
      fit: 'crop',
      crop: 'entropy',
      fm: 'webp',
      q: 80,
    };
    const loaderParams = { ...defaultParams, ...config.loaderParams };
    Object.entries(loaderParams).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
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
    @if (this.fullWidth()) {
    <picture>
      <img
        [ngSrc]="this.image()"
        [width]="1920"
        [height]="1080"
        placeholder
        priority
        [alt]="this.alt()"
        [loaderParams]="this.loaderParams()" />
    </picture>
    } @else { @if (this.gridType() === 'cell') {
    <picture>
      <img
        [ngSrc]="this.image()"
        [width]="500"
        [height]="120"
        placeholder
        priority
        [alt]="this.alt()"
        [loaderParams]="this.loaderParams()" />
    </picture>
    } @if (this.gridType() === 'row') {
    <picture>
      <img
        [ngSrc]="this.image()"
        [width]="320"
        [height]="250"
        placeholder
        priority
        [alt]="this.alt()"
        [loaderParams]="this.loaderParams()" />
    </picture>
    } }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturedImage {
  image = input.required<string>();
  alt = input('Featured Image');
  fullWidth = input(false, { transform: booleanAttribute });
  gridType = injectLocalStorage<'cell' | 'row'>('grid', { defaultValue: 'row' });

  loaderParams = computed((): Record<string, string | number> => {
    const isRow = this.gridType() === 'row';
    const isFullWidth = this.fullWidth();
    return {
      w: isFullWidth ? 1920 : isRow ? 320 : 500,
      h: isFullWidth ? 1080 : isRow ? 250 : 120,
      auto: 'format',
      fit: 'crop',
      crop: 'entropy',
      fm: 'webp',
      q: 80,
    };
  });
}
