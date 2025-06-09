import { render } from '@analogjs/router/server';
import '@angular/platform-server/init';

import AppRoot from './app/app-root.ng';
import { config } from './app/app.config.server';

export default render(AppRoot, config);
