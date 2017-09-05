import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[jhiPointer]'
})
export class PointerDirective {

  @HostBinding('style.cursor') cursor = 'pointer';

  constructor() { }

}
