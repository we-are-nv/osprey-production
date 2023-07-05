import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';


if (environment.PRODUCTION) {
	enableProdMode();
}

export { AppServerModule } from './app/app.server.module';
