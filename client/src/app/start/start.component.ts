import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../http.service';
import { Game } from '../game.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  title = 'app';
  pickerUrl = 'http://localhost:4200/picker/'
  gameUrl;
  votes: number = 2;

  constructor(private httpService: HttpService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log('here')
    console.log(form.value.location)
    this.votes = form.value.votes;
    this.httpService.getRestaurants(form.value.location).subscribe(
      (data: {businesses: any[]}) => {
        let game = new Game(form.value.votes);
        data.businesses.forEach((business) => {
          game.options.push({ option_id: business.id, votes: 0});
        })
        console.log(game);
        this.postNewGame(game);
      },
      (err) => {
        console.log(err);
      }
    )  
  }

  idGenerator(length: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  postNewGame(game: Game) {
    this.httpService.postNewGame(game).subscribe(
      (response: {name: string }) => {
        this.gameUrl = this.pickerUrl + response.name;
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
