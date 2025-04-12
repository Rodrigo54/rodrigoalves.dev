import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';

import AppRoot from './app/app-root.ng';
import { appConfig } from './app/app.config';

bootstrapApplication(AppRoot, appConfig);
