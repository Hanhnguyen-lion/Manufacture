import { 
  ApplicationConfig, 
  provideBrowserGlobalErrorListeners,
  importProvidersFrom, 
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor} from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    importProvidersFrom(NgIdleKeepaliveModule.forRoot()),
    provideZonelessChangeDetection()
  ]
};
