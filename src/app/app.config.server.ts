import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { provideLocalStorageImpl } from 'ngxtension/inject-local-storage';
import { appConfig } from './app.config';

const localStoreMock = {
  getItem: (key: string) => null,
  setItem: (key: string, value: string) => {},
  removeItem: (key: string) => {},
  clear: () => {},
  key: (index: number) => null,
  length: 0,
};

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideLocalStorageImpl(localStoreMock)],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
