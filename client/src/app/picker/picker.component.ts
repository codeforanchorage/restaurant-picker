import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';
import { Game } from '../game.model';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.css']
})
export class PickerComponent implements OnInit {
  gameId;
  activeGame: Game;
  currentIndex: number = 0;
  currentOption;
  chosenOption;
  //launchButton: ElementRef = new ElementRef('launchChosen');
  @ViewChild('launchChosen') launchButton: ElementRef;

  constructor(private route: ActivatedRoute,
              private httpService: HttpService) { }

  ngOnInit() {
    this.gameId = this.route.snapshot.params.id;
    this.httpService.getGameById(this.gameId).subscribe(
      (data: Game) => {
        this.activeGame = data;
        this.getRestaurantById(this.activeGame.options[this.currentIndex].option_id);
      },
      (err) => {
        console.log(err)
      }
    )
  }

  getRestaurantById(id: string) {
    this.httpService.getRestaurantById(id).subscribe(
      (data) => {
        this.currentOption = data;
        console.log(data)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  onSelect(selected: boolean) {
    if (selected) {
      // update vote count
      this.addVote(this.currentIndex);
      console.log('option selected')
    }
    this.currentIndex++;
    let businessId = this.activeGame.options[this.currentIndex].option_id;
    this.getRestaurantById(businessId);
  }

  addVote(index: number) {
    console.log(this.activeGame);
    this.httpService.getVoteCount(this.gameId,index).subscribe(
      (data: {option_id: string, votes: number}) => {
        console.log('votes')
        console.log(data)
        let newTotal = data.votes + 1;
        console.log(newTotal);
        if (newTotal >= this.activeGame.votes_needed) {
          console.log('game over')
          console.log(this.launchButton.nativeElement)
          this.launchButton.nativeElement.click()
        } 
        else {
            this.httpService.addVote(this.gameId,index,newTotal).subscribe(
            (data) => {
              console.log('vote added')
              console.log(data)
            },
            (err) => {
              console.log(err)
            }
          )
        }
      },
      (err) => {
        console.log(err)
      }
    )
  }



}
