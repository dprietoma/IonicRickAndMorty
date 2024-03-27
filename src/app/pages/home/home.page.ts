import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  character: any[] = [];
  params = {}  as any;

  constructor(private rickAndmrotySvc: RickAndMortyService) { }

  ngOnInit() {
    this.params.page = 0;
    this.getCharacters();
  }

  getCharacters(event?: any) {
    this.params.page += 1;
    this.rickAndmrotySvc.getCharacters(this.params).subscribe({
      next: (res: any ) => {
        this.character.push(...res.results)
        console.log(this.character);
        if(event) event.target.complete();
      },
      error: (error: any) => {
        console.error("Ocurrió un error:", error);
        if(event) event.target.complete();
      }
    })
  }

  serchCharacters() {
    this.params.page = 1;
    this.rickAndmrotySvc.getCharacters(this.params).subscribe({
      next: (res: any ) => {
        this.character = res.results;
        console.log(this.character);
        
      },
      error: (error: any) => {
        console.error("Ocurrió un error:", error);
      }
    })
  }

}
