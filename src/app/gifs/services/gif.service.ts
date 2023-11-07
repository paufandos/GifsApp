import { Gif, SearchResponse } from '../interfaces/gif.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

const GIPHI_API_KEY = 'Vee0yYDKJPGPtAnMzhZomrBrl8ExCXhl'

interface GiPhyRequestParams {
  serviceUrl: string;
  api_key: string;
  limit: string;
  q?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GifService {

  public gifList: Gif[] = []
  private _tagsHistory: string[] = [];

  private giPhyRequestParams: GiPhyRequestParams = {
    serviceUrl: 'https://api.giphy.com/v1/gifs',
    api_key: GIPHI_API_KEY,
    limit: '12',
  }

  constructor(private readonly http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory]
  }

  searchTag(tag: string): Gif[] {
    if (!this.isValidTag(tag)) return this.gifList;
    this.organizeHistory(tag)
    return this.getGifsByTag(tag)
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10)

    this.saveLocalStorge();
  }

  private isValidTag(tag: string): boolean {
    const minTagSize = 0;
    const maxTagSize = 30;
    return tag.length > minTagSize && tag.length <= maxTagSize
  }

  private getGifsByTag(tag: string): Gif[] {
    const searchEndpoint = '/search'
    const params = new HttpParams()
      .set('api_key', this.giPhyRequestParams.api_key)
      .set('limit', this.giPhyRequestParams.limit)
      .set('q', tag)


    this.http.get<SearchResponse>(this.giPhyRequestParams.serviceUrl + searchEndpoint, { params })
      .subscribe(gifs => this.gifList = gifs.data)

    return this.gifList
  }

  private saveLocalStorge(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const emptyHistory = 0
    const history = localStorage.getItem('history')

    if (!history || history.length === emptyHistory) return;

    this._tagsHistory = JSON.parse(history);
    this.searchTag(this._tagsHistory[0])
  }
}
