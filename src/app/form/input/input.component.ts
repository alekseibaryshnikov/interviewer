import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DynamicComponent } from 'src/app/shared/models/dynamic-component';
import { FormElementModel } from 'src/app/shared/models/form-element.model';
import { StorageService } from 'src/app/shared/services/storage.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, DynamicComponent {

  constructor(private _storageService: StorageService) { }

  @Input() data: FormElementModel;

  @ViewChild('label') label: ElementRef;
  @ViewChild('input') input: ElementRef;

  ngOnInit() { }

  onDelete() {
    this._storageService.onRemoveElement(this.data);
  }

  editElement() {
    this.data.label = this.label.nativeElement.innerHTML;
    this._storageService.onEditElement(this.data);
  }
}
