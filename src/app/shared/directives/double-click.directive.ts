import { Directive, HostListener, Renderer2, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDoubleClick]'
})
export class DoubleClickDirective {

  private _editor: HTMLInputElement;
  private _parent: HTMLElement;
  private _target;
  private _isActive: boolean;

  @Input()
  setPlaceholder: boolean;

  @Output()
  onOutclick = new EventEmitter<boolean>();

  constructor(private _renderer: Renderer2) { }

  /**
   * When doubleclicked at label of form element, enable editor
   *
   * @param {Event} $event
   * @memberof DoubleClickDirective
   */
  @HostListener('dblclick', ['$event'])
  onDoubleClick($event: Event) {
    this._target = <HTMLElement>$event.target;

    if (!this._editor && !this._isActive) {
      this._editor = this._makeEditorField(this._target);
      this._parent = this._renderer.parentNode(this._target);
      const nextSibling = this._renderer.nextSibling(this._target);
      this._renderer.insertBefore(this._parent, this._editor, nextSibling);

      this._toggleEditor(true);
    } else if (!this._isActive) {
      this._toggleEditor(true);
    }
  }

  /**
   * When otclicked from the form element save it
   *
   * @param {Event} $event
   * @memberof DoubleClickDirective
   */
  @HostListener('document:click', ['$event'])
  onClick($event: Event) {
    const target = <HTMLElement>$event.target;
    if (this._isActive && target !== this._editor) {
      this._changeLabelData();
    }
  }

  /**
   * When enter key was pressed save the form element
   *
   * @param {KeyboardEvent} $event
   * @memberof DoubleClickDirective
   */
  @HostListener('document:keydown', ['$event'])
  onkeydown($event: KeyboardEvent) {
    if ($event.keyCode === 13) {
      this._changeLabelData();
    }
  }

  private _changeLabelData() {
    this._toggleEditor(false);
    if (this._editor.value.trim() !== '') {
      this._target.innerHTML = this._editor.value;
    } else {
      this._editor.value = this._target.innerHTML;
    }
    this.onOutclick.emit(true);
  }

  private _toggleEditor(status: boolean) {
    if (status) {
      this._isActive = true;
      this._renderer.setStyle(this._target, 'display', 'none');
      this._renderer.setStyle(this._editor, 'display', 'block');
    } else {
      this._isActive = false;
      this._renderer.setStyle(this._target, 'display', 'block');
      this._renderer.setStyle(this._editor, 'display', 'none');
    }
  }

  private _makeEditorField(target: HTMLElement) {
    const input = this._renderer.createElement('input');
    this._renderer.addClass(input, 'form-control');
    this._renderer.addClass(input, 'is-valid');
    this._renderer.addClass(input, 'mb-3');
    this._renderer.setAttribute(input, 'value', (<HTMLElement>target).innerHTML);
    return input;
  }
}
