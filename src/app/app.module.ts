import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './_shared/components/loading/loading.component';
import { LoadingInterceptor } from './_shared/interceptors/loading.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontawesomeModule } from './_shared/modules/fontawesome.module';
import { MaterialModule } from './_shared/modules/material.module';
import { ErrorInterceptor } from './_shared/interceptors/error.interceptor';
import { LayoutComponent } from './_shared/components/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FontawesomeModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
