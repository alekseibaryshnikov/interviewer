import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { FormElementModel } from 'src/app/shared/models/form-element.model';
import { DynamicComponent } from 'src/app/shared/models/dynamic-component';

@Component({
  selector: 'app-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent implements OnInit, DynamicComponent {

  constructor(private _storageService: StorageService) { }

  @Input() data: FormElementModel;
  @Input() type: string;

  @ViewChild('label') label: ElementRef;

  ngOnInit() { }

  editElement() {
    if(this.label.nativeElement.innerHTML.trim() !== '') {
      this.data.label = this.label.nativeElement.innerHTML;
      this._storageService.onEditElement(this.data);
    }
  }
}
