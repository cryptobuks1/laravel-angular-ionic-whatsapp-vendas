import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {CategoryHttpService} from "../../../../services/http/category-http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import fieldsOptions from "../category-form/category-fields-options";

@Component({
  selector: 'category-edit-modal',
  templateUrl: './category-edit-modal.component.html',
  styleUrls: ['./category-edit-modal.component.css']
})
export class CategoryEditModalComponent implements OnInit {

  form: FormGroup;

  _categoryId: number;

  errors = {};

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {read: '', static: true}) modal: ModalComponent;

  constructor(private categoryHttp: CategoryHttpService, private formBuilder: FormBuilder) {
    const maxLength = fieldsOptions.name.validationMessage.maxlength;
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(maxLength)]],
      active: true
    });
  }

  ngOnInit() {
  }

  @Input()
  set categoryId(value) {
    this._categoryId = value;
    if(this._categoryId) {
      this.categoryHttp.get(this._categoryId)
        .subscribe(category => this.form.patchValue(category),
          responseError => {
            if(responseError.status == 401) {
              this.modal.hide();
            }
          });
    }
  }

  submit() {
    this.categoryHttp.update(this._categoryId, this.form.value)
      .subscribe((category) => {
        this.onSuccess.emit(category);
        this.modal.hide();
      }, responseError => {
        if(responseError.status === 422) {
          this.errors = responseError.error.errors
        }
        this.onError.emit(responseError)
      });
  }

  showModal() {
    this.modal.show();
  }

  showErrors() {
    return Object.keys(this.errors).length != 0;
  }

  hideModal($event) {

  }
}
