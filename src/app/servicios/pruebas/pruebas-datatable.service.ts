import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PruebasDatatableService {

  constructor() { }

  persons:Array<any> = [
    {
      "name": "Ethel Price",
      "gender": "female",
      "company": "Johnson, Johnson and Partners, LLC CMP DDC",
      "age": 22
    },
    {
      "name": "Claudine Neal",
      "gender": "female",
      "company": "Sealoud",
      "age": 55
    },
    {
      "name": "Beryl Rice",
      "gender": "female",
      "company": "Velity",
      "age": 67
    },
    {
      "name": "Wilder Gonzales",
      "gender": "male",
      "company": "Geekko",
      "age": 67
    }
  ];

}
