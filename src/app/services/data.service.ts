import { Injectable, signal } from '@angular/core';
import * as english from '@en';
import * as spanish from '@es';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public _language = signal('en');
  public _translate = signal(english);

  constructor() { }

}
