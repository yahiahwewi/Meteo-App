import { AfterViewInit, Component } from '@angular/core';
import { finalize, map } from 'rxjs';
import {HttpService} from "./services/http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title='METEO'

  options = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Deps", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Rep", "Chad",
   "Chile", "China", "Colombia", "Comoros", "Congo", "Congo {Democratic Rep}", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", 
   "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland {Republic}", "Palestine", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea North", "Korea South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar, {Burma}", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", 
    "Portugal", "Qatar", "Romania", "Russian Federation", "Rwanda", "St Kitts & Nevis", "St Lucia", "Saint Vincent & the Grenadines", "Samoa", "San Marino", "Sao Tome & Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland",
     "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];


  tab = "weather";
  input = "";
  isShown = false;
  city = "";
  temp = 0;
  windspd = 0;
  humid = 0;
  code = 0;
  constructor(private req: HttpService ){}
  ngAfterViewInit(): void {this.isShown = false;window.onkeydown = (e)=>{if(e.key === "Enter") this.searchWeather();}}
  switchTab = (tab:string) => this.tab = tab;
  getWeather(val:any){
    this.req.getPlaceFrom(val.latitude,val.longitude).pipe(map((place:any)=>this.getPlace(place))).subscribe();
    const {temperature_120m,windspeed_120m,relativehumidity_2m,weathercode} = val.hourly;
    this.isShown = true;
    this.temp = temperature_120m[temperature_120m.length-1];
    this.windspd = windspeed_120m[windspeed_120m.length-1];
    this.humid = relativehumidity_2m[relativehumidity_2m.length-1];
    this.code = weathercode[weathercode.length-1];
  }
  searchWeather(){
    if(this.input.trim() === "") {alert("champ obligatoire");
  this.input = ""} 
  else this.req.getWeatherDetails(this.input).subscribe(val=>val.pipe(map((res:any)=>this.getWeather(res)),finalize(()=>this.input="")).subscribe());}

  getPlace(place:any){const {city,country} = place.address, 
  finalplace = city ;
  this.city = `${finalplace || ""}${finalplace ? ", " : ""} ${country}`}
}