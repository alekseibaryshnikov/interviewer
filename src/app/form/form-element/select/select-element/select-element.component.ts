import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DynamicComponent } from 'src/app/shared/models/dynamic-component';
import { FormElementModel } from 'src/app/shared/models/form-element.model';
import { StorageService } from 'src/app/shared/services/storage.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-select-element',
  templateUrl: './select-element.component.html',
  styleUrls: ['./select-element.component.scss']
})
export class SelectElementComponent implements OnInit, DynamicComponent {
  @Input()
  data: FormElementModel;
  @Input()
  type: string;

  @ViewChild('variantValue')
  variantValue: ElementRef;

  private _variantValue = new BehaviorSubject(<any>[]);
  variantValue$ = this._variantValue.asObservable();

  constructor(private _storageService: StorageService) {}

  ngOnInit() {
    this._variantValue.next(this.data.value);

    this.variantValue$.subscribe(value => {
      this.data.value = value;
    });
  }

  onRemoveVariant() {
    this._storageService.onRemoveVariant(this.data);
  }

  onValueChanged($event) {
    this._variantValue.next($event.target.value);
  }

  onSaveValue() {
    this._storageService.onEditVariant(this.data);
  }
}
