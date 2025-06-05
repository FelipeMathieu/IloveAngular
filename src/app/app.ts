import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Fetcher } from './core/fetcher';
import { Observable } from 'rxjs';
import { IPostResponse } from './common/post-response.interface';
import { DataStore } from './core/data-store';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected $PostList: Observable<IPostResponse[]>;
  protected $Loading: Observable<boolean>;
  protected displayedColumns: string[] = ['userId', 'title', 'body'];

  constructor(
    private readonly _fetcher: Fetcher,
    private readonly _dataStore: DataStore
  ) {
    this.$PostList = this._dataStore.$Posts;
    this.$Loading = this._dataStore.$Loading;
  }

  public OnLoad() {
    this._fetcher.GetPostData().subscribe();
  }

  public trackById(_: number, value: IPostResponse) {
    return value.id;
  }
}
