import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { IPostResponse } from '../common/post-response.interface';
import { DataStore } from './data-store';

const baseUrl = 'https://jsonplaceholder.typicode.com/';

@Injectable({
  providedIn: 'root',
})
export class Fetcher {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _dataStore: DataStore
  ) {}

  public GetPostData() {
    this._dataStore.Loading = true;

    return this._httpClient.get<IPostResponse[]>(baseUrl).pipe(
      shareReplay(),
      tap((response: IPostResponse[]) => {
        this._dataStore.Posts = response;
        this._dataStore.Loading = false;
      })
    );
  }
}
