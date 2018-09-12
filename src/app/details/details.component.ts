import { DatabaseService } from './../service/database.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.model';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  productId: number;
  product: Product;
  productSubscription: Subscription;
  updateSubscription: Subscription;

  detailsForm  = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    isActive: [''],
    icon: [''],
    priceOfSize: this.fb.array([
      this.fb.control('')
    ])
  });

  
  constructor(private route: ActivatedRoute, private databaseService: DatabaseService, private fb: FormBuilder) {
    
   }

   ngOnDestroy(){
     this.productSubscription.unsubscribe();
     this.updateSubscription.unsubscribe();
   }

  ngOnInit() {
    this.productId = this.route.snapshot.params.productId;
    console.log("Loading details of product ID: "+ this.productId);
    this.getProductFromDatabase(this.productId);
    
  }

  private getProductFromDatabase(productId: number){
    this.productSubscription = this.databaseService.getProduct(productId).subscribe((product) => this.product = product, () => {}, () => this.updateDetails());
  }

  updateDetails() {
    this.resetSizes();
    this.detailsForm.patchValue({
      name: this.product.name,
      description: this.product.description,
      icon: this.product.icon,
      isActive: this.product.isActive
    });
  }

  onSubmit(){
    this.saveChangesInDatabase();
  }

  private saveChangesInDatabase(){
    console.log("Sending data from form.");
    const updatedProduct: Product = {
      id: this.product.id,
      category: this.product.category,
      name: this.detailsForm.controls['name'].value,
      description: this.detailsForm.controls['description'].value,
      isActive: this.detailsForm.controls['isActive'].value,
      priceOfSize: this.priceOfSize.value,
      icon: this.detailsForm.controls['icon'].value,
    };
    this.updateSubscription = this.databaseService.updateProduct(updatedProduct).subscribe();
  }

  get priceOfSize() {
    return this.detailsForm.get('priceOfSize') as FormArray;
  }


  private addSize() {
    this.priceOfSize.push(this.fb.control(''));
  }

  private removeSize() {
    this.priceOfSize.removeAt(this.priceOfSize.length-1);
  }

  private resetSizes() {
    this.priceOfSize.controls = [];
    this.product.priceOfSize.forEach(p => this.priceOfSize.push(this.fb.control(p)));
  }


}
