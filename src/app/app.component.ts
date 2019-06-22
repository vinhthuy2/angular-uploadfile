import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import * as Muuri from 'muuri';
import { log } from 'util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  listTest = [
    { id: 'id1', name: '0', order: 0 },
    { id: 'id2', name: '1', order: 1 },
    { id: 'id3', name: '2', order: 2 },
    { id: 'id4', name: '3', order: 3 },
    { id: 'id5', name: '4', order: 4 },
    { id: 'id6', name: '5', order: 5 },
    { id: 'id7', name: '6', order: 6 }
  ];
  title = 'drag-drop2';
  draggingID;
  col = 1;
  lastCol = 0;
  grid;
  lastLength = this.listTest.length;
  deletedID;
  latestAddedID;
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  ngAfterViewInit(): void {}
  ngAfterViewChecked() {
    const gridEl = document.querySelector('.grid');

    if (this.lastCol !== this.col) {
      console.log('changed');
      this.lastCol = this.col;
      if (!this.grid) {
        this.grid = new Muuri(gridEl, {
          dragEnabled: true,
          dragSortPredicate: {
            threshold: 50,
            action: 'swap'
          }
        });
      } else {
        this.grid.destroy();
        this.grid = new Muuri(gridEl, {
          dragEnabled: true,
          dragSortPredicate: {
            threshold: 50,
            action: 'swap'
          }
        });
      }
    }

    if (this.listTest.length !== this.lastLength) {
      console.log('list length changed');

      if (this.listTest.length > this.lastLength) {
        const node = document.querySelector(`#${this.latestAddedID}`);
        console.log(node);

        this.grid.add([node]);
      }
      this.lastLength = this.listTest.length;
    }
  }
  onColChanged(e) {
    this.lastCol = this.col;
    this.col = e;
  }

  onDeleteClicked(id) {
    this.listTest = this.listTest.filter(l => l.id !== id);
    this.deletedID = id;

    const node = document.querySelector(`#${id}`);
    this.grid.remove([node], { removeElements: true });
  }

  onAddClicked() {
    const next = 'id' + new Date().getTime();
    this.listTest.push({
      id: next,
      name: '' + next,
      order: this.listTest.length - 1
    });
    this.latestAddedID = next;
  }
}
