import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IProduct } from './product';
import { debug } from 'util';

@Injectable ({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {}
    /**
     * Gets all elements.
     * @return {Observable<IProduct[]>} - Return an observable with of IProduct objects
     */
    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All: '+ JSON.stringify(data))),
            catchError(this.handleError)
        );
    }
    /**
     * Gets one product filtered by ID.
     * @param {string} id - The title of the book.
     * @return {Iproduct} - Return a single object
     */
    getSingleProduct(id): Observable<IProduct> {
        return this.http.get<IProduct>(this.productUrl).pipe(
            map(data => data.find(dat => dat.productId == id )),
            catchError(this.handleError)
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        console.log('ereadfasdfasdf');
        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error ocurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}
