import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import {map} from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/product';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  getProductList(theCategoryId: number) : Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategories>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    console.log(searchUrl);
    return this.getProducts(searchUrl);    
  }

  getProduct(theProductId: number) : Observable<Product>{
    const searchUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(searchUrl);
  }

  getProducts(searchUrl: string) {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.product)
    );
  }

  
}



interface GetResponseProducts{
  _embedded: {
    product : Product[];
  }
}

interface GetResponseProductCategories{
  _embedded: {
    productCategory: ProductCategory[];
  }
}
