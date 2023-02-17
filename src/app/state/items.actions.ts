import { Item } from "../models/item";

export class AddItemAction {
  static readonly type = '[Items] Add Item';
  constructor (public payload: Item) {};
}

export class RemoveItemAction {
  static readonly type = '[Items] Remove Item';
  constructor (public payload: number) {};
}
