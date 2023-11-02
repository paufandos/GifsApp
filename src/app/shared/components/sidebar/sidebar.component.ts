import { Component } from '@angular/core';
import { GifService } from 'src/app/gifs/services/gif.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  constructor(private gifService: GifService) { }

  get tags(): string[] {
    return this.gifService.tagsHistory
  }

  getGifsByTag(tag: string) {
    this.gifService.searchTag(tag);
  }
}
