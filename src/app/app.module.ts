import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { OrganizerComponent } from './organizer/organizer.component';
import { HeroFormComponent } from './_shared/components/hero-form/hero-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicPortraitComponent } from './_shared/components/portraits/basic-portrait/basic-portrait.component';
import { DetailedPortraitComponent } from './_shared/components/portraits/detailed-portrait/detailed-portrait.component';
import { HeroCardComponent } from './_shared/components/hero-card/hero-card.component';
import { ConfirmDialogComponent } from './_shared/components/confirm-dialog/confirm-dialog.component';
import { TagsComponent } from './_shared/components/tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent,
    LayoutComponent,
    OrganizerComponent,
    HeroFormComponent,
    BasicPortraitComponent,
    DetailedPortraitComponent,
    HeroCardComponent,
    ConfirmDialogComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FontawesomeModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
