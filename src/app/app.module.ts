import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './_shared/components/loading/loading.component';
import { MaterialModule } from './_shared/modules/material.module';
import { FontawesomeModule } from './_shared/modules/fontawesome.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './_shared/interceptors/loading.interceptor';
import { ErrorInterceptor } from './_shared/interceptors/error.interceptor';
import { ErrorComponent } from './error/error.component';
import { OrderByPipe } from './_shared/pipes/order-by.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrganizerComponent } from './organizer/organizer.component';
import { AddHeroComponent } from './_shared/components/_dialogs/add-hero/add-hero.component';
import { PortraitComponent } from './_shared/components/portrait/portrait.component';
import { LayoutComponent } from './_shared/components/layout/layout.component';
import { HeroCardComponent } from './_shared/components/hero-card/hero-card.component';
import { DeleteComponent } from './_shared/components/_dialogs/delete/delete.component';
import { EditHeroComponent } from './_shared/components/_dialogs/edit-hero/edit-hero.component';
import { FormHeroComponent } from './_shared/components/form-hero/form-hero.component';
import { SetPriorityComponent } from './_shared/components/_dialogs/change-priority/change-priority.component';
import { ChangeVisibilityComponent } from './_shared/components/_dialogs/change-visibility/change-visibility.component';
import { FooterComponent } from './_shared/components/layout/footer/footer.component';
import { FiltersComponent } from './_shared/components/hero-filter/hero-filter.component';
import { ByStatusComponent } from './_shared/components/hero-filter/by-status/by-status.component';
import { ByVisibilityComponent } from './_shared/components/hero-filter/by-visibility/by-visibility.component';
import { ByChipComponent } from './_shared/components/hero-filter/by-chip/by-chip.component';


@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    ErrorComponent,
    OrderByPipe,
    OrganizerComponent,
    AddHeroComponent,
    PortraitComponent,
    LayoutComponent,
    HeroCardComponent,
    DeleteComponent,
    EditHeroComponent,
    FormHeroComponent,
    SetPriorityComponent,
    ChangeVisibilityComponent,
    FooterComponent,
    FiltersComponent,
    ByStatusComponent,
    ByVisibilityComponent,
    ByChipComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontawesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
