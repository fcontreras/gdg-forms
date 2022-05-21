import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Output()
  formClose = new EventEmitter();

  productForm: FormGroup | undefined;

  constructor(private builder: FormBuilder, private productService: ProductsService) { }

  ngOnInit(): void {
    this.productForm = this.builder.group({
      name: ['', [Validators.required, this.validateNotEmpty]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
    })
  }

  addProduct() {
    if (this.productForm && this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.productService.createProduct(this.productForm?.value);
    this.formClose.emit();
  }

  /**
   * Function that validates that a control has no empty white-spaced values
   * @param control
   */
  validateNotEmpty = function (control: AbstractControl) {
    const value = control.value;

    if (value === null || value.trim().length === 0)
      return {
        validateNotEmpty: true
      }
    else return null;
  }
}
