import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from 'src/app/services/rick-and-morty.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
})
export class CharacterDetailPage implements OnInit {
  characterId: string = '';
  characterData = null as any;
  episodes: any[] = [];

  constructor(private activedRoute: ActivatedRoute,
    private rickAndmrotySvc: RickAndMortyService) {
    this.characterId = this.activedRoute.snapshot.paramMap.get('id') as string;
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getCharacter();
  }

  getCharacter() {

    this.rickAndmrotySvc.getCharactersById(this.characterId).subscribe({
      next: (res: any ) => {
       this.characterData = res;
       this.getEpisode();
      },
      error: (error: any) => {
        console.error("Ocurrió un error:", error);
        
      }
    })
  }

  getEpisode() {
    for (let url of this.characterData.episode) {
      this.rickAndmrotySvc.getByUrl(url).subscribe({
        next: (res: any ) => {
         console.log(res);
         this.episodes.push(res);
        },
        error: (error: any) => {
          console.error("Ocurrió un error:", error);
          
        }
      })
      
    }
    
  }

}
