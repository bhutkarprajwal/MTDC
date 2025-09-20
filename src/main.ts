import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { withInMemoryScrolling } from '@angular/router';
import { AppComponent } from './app/app.component';


const scrollConfig: Parameters<typeof withInMemoryScrolling>[0] = {
  scrollPositionRestoration: 'enabled', // exact literal
  anchorScrolling: 'enabled',           // exact literal
};

const inMemoryScrollingFeature = withInMemoryScrolling(scrollConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, inMemoryScrollingFeature),
  ],
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error('Bootstrap error:', err));


