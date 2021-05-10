

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagenPipe } from './pipes/imagen.pipe';

@NgModule({
  declarations: [
    imagenPipe
  ],
  imports: [
  ],
  exports: [
    imagenPipe
  ]
  providers: [],
  bootstrap: [AppComponent]
})
export class PipesModule { }
