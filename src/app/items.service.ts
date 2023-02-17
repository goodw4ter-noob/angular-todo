import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Item } from './models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private allItems: Item[] = [];
  private idNumber = 1;

  constructor() { };

  addItemService(item: Item): Observable<Item> {
    item.id = this.idNumber;
    this.allItems.push(item);
    this.idNumber += 1;
    return of(item).pipe(delay(1000))
  }

  removeItemService(itemId: number): Observable<number> {
    this.allItems = this.allItems.filter((item: Item) => item.id !== itemId);
    return of(itemId).pipe(delay(500));
  }

  getAllItemsService(): Observable<Item[]> {
    return of(this.allItems).pipe(delay(1500));
  }
}
