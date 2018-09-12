import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:3000/api';
  private dbUrl = 'https://restaurant-picker-8b69e.firebaseio.com/games'
  private fileType = '.json';

  constructor(private http: HttpClient) { }

  getRestaurants(location: string) {
    let url = this.apiUrl + '?location=' + location;
    console.log(url)
    return this.http.get(url)
  }

  postNewGame(game: Game) {
    return this.http.post(this.dbUrl + this.fileType,game);
  }

  getGameById(id: string) {
    return this.http.get(this.dbUrl + '/' + id + this.fileType);
  }

  getRestaurantById(id: string) {
    return this.http.get(this.apiUrl + '/business?id=' + id)
  }

  getVoteCount(game_id: string, index: number) {
    return this.http.get(this.dbUrl + '/' + game_id + '/options/' + index + this.fileType)
  }

  addVote(game_id: string, index: number, votes: number) {
    return this.http.put(this.dbUrl + '/' + game_id + '/options/' + index + '/votes' + this.fileType, votes)
  }
}
