import { NoteComponent } from './component/note/note.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import Aura from '@primeng/themes/aura';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
@NgModule({
  declarations: [AppComponent, NoteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    DialogModule,
    TextareaModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
