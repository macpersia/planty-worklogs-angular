import {bootstrap}    from '@angular/platform-browser-dynamic';
import {
  provide,
  ComponentRef,
  enableProdMode
} from '@angular/core';
import {
  APP_BASE_HREF,
  LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';
//import {ROUTER_PROVIDERS, LocationStrategy, PathLocationStrategy} from '@angular/router-deprecated';
import {appInjector} from './app/utils/app-injector';
import {LoginService} from './app/service/login.service';
import {GlobalsService} from './app/service/globals.service';
import {ErrorService} from './app/service/error.service';
import {UtilsService} from './app/service/utils.service';
import {AppComponent} from './app/app.comp';
import {environment} from './app/environment';
import 'rxjs/Rx';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  HTTP_PROVIDERS,
  GlobalsService,
  LoginService,
  ErrorService,
  UtilsService,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  //provide(APP_BASE_HREF, {useValue: '/'}),
  provide(LocationStrategy, {useClass: PathLocationStrategy})
]).then((appRef: ComponentRef<any>) => {
  // store a reference to the application injector
  appInjector(appRef.injector);
});
