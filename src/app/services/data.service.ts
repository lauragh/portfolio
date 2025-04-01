import { Injectable, signal } from '@angular/core';
import * as english from '@en';
import * as spanish from '@es';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public language = signal('en');
  public translate = signal(english);
  public isProjectSelected = signal('');

  constructor() { }

}
