import {
  Component,
  OnInit,
  AfterViewInit,
  AfterViewChecked
} from '@angular/core';
import * as Muuri from 'muuri';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
  listTest = [1, 2, 3, 4, 5, 6, 7];
  title = 'drag-drop2';
  draggingID;
  col = 1;
  lastCol = 0;
  grid;
  ngOnInit(): void {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
  }

  ngAfterViewInit(): void {}
  ngAfterViewChecked() {
    if (this.lastCol !== this.col) {
      console.log('changed');
      this.lastCol = this.col;
      if (!this.grid) {
        this.grid = new Muuri(document.querySelector('.grid'), {
          dragEnabled: true
        });
      } else {
        const gridel = document.querySelector('.grid');
        this.grid.destroy();
        this.grid = new Muuri(gridel, {
          dragEnabled: true
        });
      }
    }
  }
  onColChanged(e) {
    this.lastCol = this.col;
    this.col = e;
  }
}
