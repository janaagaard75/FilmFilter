import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

// TODO: Next step: https://angular.io/docs/ts/latest/tutorial/toh-pt6.html