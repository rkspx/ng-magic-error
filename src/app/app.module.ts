import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { FormSubmitDirective } from './directives/form-submit.directive';

@NgModule({
  declarations: [
    AppComponent,
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    ControlErrorComponent,
    FormSubmitDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ControlErrorComponent]
})
export class AppModule { }
