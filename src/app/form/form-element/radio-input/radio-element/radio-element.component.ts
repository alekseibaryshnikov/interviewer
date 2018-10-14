import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormElementModel } from 'src/app/shared/models/form-element.model';
import { DynamicComponent } from 'src/app/shared/models/dynamic-component';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-radio-element',
  templateUrl: './radio-element.component.html',
  styleUrls: ['./radio-element.component.scss']
})
export class RadioElementComponent implements OnInit, DynamicComponent {

  @Input() data: FormElementModel;
  @Input() type: string;

  @ViewChild('label') label: ElementRef;

  constructor(private _storageService: StorageService) { }

  ngOnInit() {
  }

  editElement() {
    if(this.label.nativeElement.innerHTML.trim() !== '') {
      this.data.label = this.label.nativeElement.innerHTML;
      this._storageService.onEditVariant(this.data);
    }
  }

  onRemoveVariant() {
    this._storageService.onRemoveVariant(this.data);
  }

}
