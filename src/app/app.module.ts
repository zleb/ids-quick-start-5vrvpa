import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

import {
  SohoButtonModule,
  SohoComponentsModule,
  SohoLocaleModule
} from "ids-enterprise-ng";

import { AppComponent } from "./app.component";
import { SohoLocaleInitializerModule } from "./locale/soho-locale-initializer.module";
import { HeaderComponent } from "./header/header.component";
import { PersonalizeMenuComponent } from "./personalize-menu/personalize-menu.component";
import { IdmModalComponent } from "./idm-modal/idm-modal.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PersonalizeMenuComponent,
    IdmModalComponent
  ],
  imports: [
    BrowserModule,
    SohoLocaleModule,
    SohoButtonModule,
    SohoLocaleInitializerModule,
    SohoComponentsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "en-US"
    }
  ],
  entryComponents: IdmModalComponent,
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
