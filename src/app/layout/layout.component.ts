import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store, Actions, ActionCompletion, ofAction, ofActionDispatched, ofActionSuccessful, ofActionCompleted } from '@ngxs/store';
import { Observable, takeUntil, Subject } from 'rxjs';
import { Item } from '../models/item';
import { AddItemAction, RemoveItemAction } from '../state/items.actions';
import { ItemState } from '../state/items.state';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @Select(ItemState.getAllItems) allItems$: Observable<Item[]> | undefined;

  loadingItems: boolean[] = [];
  item = '';

  private ngUnscubscribe = new Subject<void>();

  constructor(private store: Store, private actions$: Actions) {};

  ngOnInit(): void {
    //получаем 2 action'а: при диспатче и при завершении
    // this.actions$.pipe(ofAction(AddItemAction, RemoveItemAction), takeUntil(this.ngUnscubscribe))

    //в этом случае получим action ТОЛЬКО в момент диспатча
    // this.actions$.pipe(ofActionDispatched(AddItemAction, RemoveItemAction), takeUntil(this.ngUnscubscribe))

    //тут только в момент завершения (completed)
    // this.actions$.pipe(ofActionSuccessful(AddItemAction, RemoveItemAction), takeUntil(this.ngUnscubscribe))

    //в payload получаем объект action'а и result object, в котором говорится в каком статусе выполнился action
    this.actions$.pipe(ofActionCompleted(AddItemAction, RemoveItemAction), takeUntil(this.ngUnscubscribe))
    .subscribe((data: ActionCompletion) => {
      if (data.result.successful) {
        if (data.action instanceof RemoveItemAction) {
          //inform user about the removal
        } else if (data.action instanceof AddItemAction) {
          // inform user about the item addition
        } else if (data.result.error) {
          //inform the user about an error
        }
      }
      this.loadingItems.pop();
    });
  };

  ngOnDestroy(): void {
    this.ngUnscubscribe.next();
    this.ngUnscubscribe.complete();
  }

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
