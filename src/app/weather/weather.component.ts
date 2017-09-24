import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [
    WeatherService
  ]
})
export class WeatherComponent implements OnInit {

  title:string;
  temperature:Number;
  text:string;
  forecast:any;
  location:any;
  className:string;
  resultsFound:boolean;
  // photo:string;
  constructor(private weatherService: WeatherService) { 
    
  }

  ngOnInit() {
  }

  
  getWeather(city) {
    this.weatherService.getWeather(city)
		  .subscribe(result => {
        if(result.query.results!=null){
          this.title = result.query.results.channel.title.substring(16);
          this.temperature = result.query.results.channel.item.condition.temp;
          this.text = result.query.results.channel.item.condition.text;
          this.forecast = result.query.results.channel.item.forecast;
          this.location = result.query.results.channel.location;
          this.className = 'wi-day-lightning;'
          // if(new Date(result.query.created).getHours()>18 || new Date(result.query.created).getHours() < 6 ){
          //   this.photo = '../assets/images/night.jpg';
          // }
          // else{
          //   this.photo = '../assets/images/day.jpg';
          // }
        }
        else{
          this.resultsFound=!false;
        }
        
      },
      (error) => {
        console.log('We are in error');
        console.error(error);
      });
	}

}
