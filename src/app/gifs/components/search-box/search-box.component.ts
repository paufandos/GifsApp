import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../../services/gif.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  constructor(private readonly gifService: GifService) { }

  @ViewChild('searchInput') public tagInput!: ElementRef<HTMLInputElement>;

  searchTag(): void {
    const newTag = this.tagInput.nativeElement.value
    this.gifService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }
}
