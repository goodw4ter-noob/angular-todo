import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { AddItemAction, RemoveItemAction } from '../state/items.actions';
import { ItemState } from '../state/items.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @Select(ItemState.getAllItems) allItems$: Observable<Item[]> | undefined;

  loadingItems: boolean[] = [];
  item = '';

  constructor(private store: Store) {};

  ngOnInit(): void {};

  addItem(itemName: string): void {
    this.loadingItems.push(true);

    this.store.dispatch( new AddItemAction(new Item(itemName)) ).subscribe(() =>
      this.loadingItems.pop()
    );
  }

  removeItem(id: number): void {
    this.store.dispatch(new RemoveItemAction(id));
  }
}
