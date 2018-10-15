import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appValueController]'
})
export class ValueControllerDirective {
  @Output()
  keydown = new EventEmitter<boolean>();

  constructor() {}

  @HostListener('document:keydown', ['$event'])
  onKeyDown($event: Event) {
    // $event.preventDefault();
    $event.stopPropagation();

    this.keydown.emit(true);
  }
}
