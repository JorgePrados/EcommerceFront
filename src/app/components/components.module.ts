import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { DonnaComponent } from './donna/donna.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [IncrementadorComponent, DonnaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementadorComponent,
    DonnaComponent
  ]
})
export class ComponentsModule { }
