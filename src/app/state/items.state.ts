import { Item } from '../models/item';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ItemsService } from '../items.service';
import { AddItemAction, RemoveItemAction } from './items.actions';
import { tap } from 'rxjs';

export interface ItemsStateModel {
  items: Item[];
}

@State({
  name: 'items',
  defaults: {
    items: [],
  },
})
@Injectable()
export class ItemState {
  constructor(private itemsService: ItemsService) {}

  @Action(AddItemAction)
  addItem(ctx: StateContext<ItemsStateModel>, action: AddItemAction) {
    return this.itemsService.addItemService(action.payload).pipe(
      tap((addedItem: Item) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          items: state.items.concat(addedItem),
        });
      })
    );
  }

  @Action(RemoveItemAction)
  removeItem(ctx: StateContext<ItemsStateModel>, action: RemoveItemAction) {
    return this.itemsService.removeItemService(action.payload).pipe(
      tap((itemId: number) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          items: state.items.filter((item: Item) => item.id !== itemId),
        });
      })
    )
  }

  @Selector()
  static getAllItems(state: ItemsStateModel) {
    return state.items;
  }

}
