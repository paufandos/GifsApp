import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() public gif!: Gif;

  ngOnInit(): void {
    if (!this.gif) throw Error('There are not any GIF')
  }

}
