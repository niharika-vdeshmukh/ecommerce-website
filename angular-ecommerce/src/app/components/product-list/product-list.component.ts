import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number=1;
  searchMode: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;
  previousCategoryId: number=1;

  previousKeyWord: string = "";

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log(this.searchMode);
    if(this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.listProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string =  this.route.snapshot.paramMap.get('keyword')!;
    if(this.previousKeyWord == theKeyword) {
      this.thePageNumber=1;
    }
    this.previousKeyWord = theKeyword;
    this.productService.searchProductPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              theKeyword).subscribe(
      this.processResult()
    );
  }

  listProducts() {

    //check if Id is present in call
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    console.log(hasCategoryId);
    if(hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      console.log(this.currentCategoryId);
    } else {
      this.currentCategoryId = 1;
    }

    if(this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate( this.thePageNumber-1, 
                                                this.thePageSize, 
                                                this.currentCategoryId).subscribe(
      this.processResult()
    )
  }

  updatePageSize(pageSize: string) {
      this.thePageSize = +pageSize;
      this.thePageNumber =1;
      this.listProducts();
  }

  processResult() {
    return (data:any) => {
      this.products = data._embedded.product;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }

}
