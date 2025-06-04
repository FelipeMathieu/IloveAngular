import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Fetcher } from './core/fetcher';
import { Observable } from 'rxjs';
import { IPostResponse } from './common/post-response.interface';
import { DataStore } from './core/data-store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected $PostList: Observable<IPostResponse[]>;

  constructor(
    private readonly _fetcher: Fetcher,
    private readonly _dataStore: DataStore
  ) {
    this.$PostList = this._dataStore.$Posts;
  }

  public OnLoad() {
    this._fetcher.GetPostData();
  }

  public trackById(_: number, value: IPostResponse) {
    return value.id;
  }
}
