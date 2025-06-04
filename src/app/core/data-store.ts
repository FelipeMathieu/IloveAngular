import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPostResponse } from '../common/post-response.interface';

@Injectable({
  providedIn: 'root',
})
export class DataStore {
  private readonly _posts = new BehaviorSubject<IPostResponse[]>([]);
  private readonly _loading = new BehaviorSubject<boolean>(false);

  constructor() {}

  public get $Posts(): Observable<IPostResponse[]> {
    return this._posts.asObservable();
  }

  public set Posts(value: IPostResponse[]) {
    this._posts.next(value);
  }

  public get $Loading() {
    return this._loading.asObservable();
  }

  public set Loading(value: boolean) {
    this._loading.next(value);
  }
}
