import { Component } from '@angular/core';
import { Gif } from '../../interfaces/gif.interface';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private readonly gifService: GifService) { }

  get gifs(): Gif[] {
    return this.gifService.gifList;
  }
}
