import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
  private fragment: string;

  public product: Product;
  public formProduct: FormGroup;
  

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit() {

    this.formProduct = this.fb.group({
      productId: [0,[Validators.required]],
      code: ['',[Validators.required, Validators.minLength(3)]],
      name: [''],
      discount: [0],
      categoryId: [0],
      shortDescription: [''],
      longDescription: [''],
      weight: [0],
      tags: ['']
    })

    this.route.params.subscribe(({ id }) => this.getProductById(id));
    
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }


  getProductById(id: number){
    if(id > 0)
    {
      this.productService.getProductById(id).subscribe(
        (resp: any) => {
          this.product = resp.data;

          this.formProduct.setValue({ 
            productId: this.product.productId, 
            code: this.product.code, 
            name: this.product.name, 
            discount: this.product.discount, 
            categoryId: this.product.categoryId, 
            shortDescription: this.product.shortDescription, 
            longDescription: this.product.longDescription, 
            weight: this.product.weight, 
            tags: this.product.tags, 
          });

          console.log(resp);
        });
    }
  }

  ngAfterViewInit() {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  saveProduct() {
    this.productService.saveProduct(this.formProduct.value).subscribe(
      (resp: any) => {
        Swal.fire('Guardado', `Producto Guardado correctamente`, 'success');
    });
  }

  deleteProduct() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Eliminar artículo?',
      text: `Está a punto de eliminar este artículo`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        
      }
    });
  }

  delete(){
    this.productService.deleteProduct(this.product.productId).subscribe(
      (resp: any) => {
        Swal.fire('Eliminado', `Artículo Eliminado correctamente`, 'success');
        this.router.navigateByUrl('/ProductsList');
      });
  }
}
