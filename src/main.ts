import {provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideRouter} from '@angular/router';
import {routes} from './app/app.routes';
import {App} from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZonelessChangeDetection()
  ]
}).catch((err) => console.error(err));
