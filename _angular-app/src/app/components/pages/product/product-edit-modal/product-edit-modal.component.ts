import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../../../bootstrap/modal/modal.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Product} from "../../../../model";
import {ProductHttpService} from "../../../../services/http/product-http.service";

@Component({
  selector: 'product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.css']
})
export class ProductEditModalComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    active: true
  };

  _productId: number;

  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  @Output() onError: EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();

  @ViewChild(ModalComponent, {read: '', static: true}) modal: ModalComponent;

  constructor(public productHttp: ProductHttpService) { }

  ngOnInit() {
  }

  @Input()
  set productId(value) {
    this._productId = value;
    if(this._productId) {
      this.productHttp.get(this._productId)
        .subscribe(product => this.product = product,
          responseError => {
            if(responseError.status == 401) {
              this.modal.hide();
            }
          });
    }
  }

  submit() {
    this.productHttp.update(this._productId, this.product)
      .subscribe((product) => {
        this.onSuccess.emit(product);
        this.modal.hide();
      }, error => this.onError.emit(error));
  }

  showModal() {
    this.modal.show();
  }

  hideModal($event) {
    this.product = {
      name: '',
      description: '',
      price: 0,
      active: true
    };
  }
}
