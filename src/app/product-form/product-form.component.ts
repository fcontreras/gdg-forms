import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../products.service";
import {Product} from "../product";
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Output()
  formClose = new EventEmitter();

  productForm: FormGroup | undefined;

  suggestions: Product[] = [];

  constructor(private builder: FormBuilder, private productService: ProductsService) { }

  ngOnInit(): void {
    this.productForm = this.builder.group({
      name: ['', [Validators.required, this.validateNotEmpty]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      stock: ['', Validators.required],
    });

    this.productForm.controls.name.valueChanges
      .pipe(debounceTime(500))
      .subscribe((name: string) => {
      console.log('Sugerencias actualizadas');
      this.suggestions = this.productService.getSuggestions(name);
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
