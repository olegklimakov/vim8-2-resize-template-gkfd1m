import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IfViewportSizeDirective } from './directives/ifViewportSize.directive';
import { ViewportService } from './services/viewport.service'
import { ViewPortConfig } from './tokens/viewportConfig.token'

@NgModule({
  declarations: [
    IfViewportSizeDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ViewportService,
    { provide: ViewPortConfig, useValue: {
      medium: 120,
      large: 1200, 
    } },
  ],
  exports: [
    IfViewportSizeDirective
  ]
})
export class WidgetsModule { }