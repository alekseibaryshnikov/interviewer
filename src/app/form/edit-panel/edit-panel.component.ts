import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { FormElementModel } from 'src/app/shared/models/form-element.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-edit-panel',
  templateUrl: './edit-panel.component.html',
  styleUrls: ['./edit-panel.component.scss']
})
export class EditPanelComponent implements OnInit {
  @Input()
  formElement: FormElementModel;

  requiredClass = {};
  requiredTitle = '';

  constructor(
    private _storageService: StorageService,
    private _renderer2: Renderer2
  ) {}

  ngOnInit() {
    this.requiredClass = {
      'btn-warning': this.formElement.required
    };
    this.requiredTitle = this.formElement.required
      ? 'Required'
      : 'Not required';
  }

  onDelete() {
    this._storageService.onRemoveElement(this.formElement);
  }

  onMoveUp() {
    this._storageService.onMoveElement(this.formElement, 'up');
  }

  onMoveDown() {
    this._storageService.onMoveElement(this.formElement, 'down');
  }

  onSetRequired($event) {
    const element = $event.target;

    if (this.formElement.required) {
      this._renderer2.removeClass(element, 'btn-warning');
      element.innerHTML = 'Not required';
      this._storageService.onChangeRequired(this.formElement, false);
    } else {
      this._renderer2.addClass(element, 'btn-warning');
      element.innerHTML = 'Required';
      this._storageService.onChangeRequired(this.formElement, true);
    }
  }
}
