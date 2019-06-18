import { Injectable, Inject } from '@angular/core';
import { ViewPortConfig } from './../tokens/viewportConfig.token';
// import { IConfig, ViewPortOptions } from './../models/viewport'
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class ViewportService {

//Better to use tap

  
  initialSize = Observable.of(window.innerWidth)
  windowSize$ = Observable
    .fromEvent(window, 'resize')
    .debounceTime(100)

  size$ = Observable
  .merge(this.initialSize, this.windowSize$)
  .map((e: Event | number) => {
      const size = e.target ? e.target.innerWidth: e;
      if (size < this.viewPortConfig.medium) {
        return 'small'
      } else if (size < this.viewPortConfig.large ) {
        return 'medium';
      } else {
        return 'large'
      }
    })
        
  constructor(
    @Inject(ViewPortConfig) private viewPortConfig: IConfig,
  ) {}

}