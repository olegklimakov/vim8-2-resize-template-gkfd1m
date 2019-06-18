import { Directive, TemplateRef, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { ViewportService } from './../services/viewport.service'
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnDestroy {

  subscriptionsList: Subscription[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private viewportService: ViewportService
    ) {}
    
  ngOnDestroy() {
    this.subscriptionsList.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  handleSize(condition: string) {

    // Probably there are some better and optimized variant but I should spend on it more than 1 hr
    const subscription = this.viewportService.size$.subscribe(size => {
      this.viewContainer.clear();
      if (condition === size) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })
    this.subscriptionsList.push(subscription);
  }

  @Input() set ifViewportSize(condition: string) {
    this.handleSize(condition)
  }
}
