import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
//import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch'

@Injectable()
export class WeatherService {

  constructor(private http:Http) { }
  
  getWeather(city:string){
     return this.http.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='+'"'+city+'"'+')&format=json&env=store://datatables.org/alltableswithkeys')
        .map(response => response.json());
  }

  private handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}
