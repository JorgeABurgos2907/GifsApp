import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = "OMDgceSIIXn0RulJXcoeYBeoRrT6U6RP";

  //TODO: CAMBIAR ANY POR SU TIPO CORRESPONDIENTE
  public resultados: Gif[] = [];

  constructor( private http: HttpClient ){}

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift(query)
    }

    this._historial = this._historial.splice(0,10);

    console.log(this._historial);

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${ this.apiKey }&q=${ query }&limit=10`)
    .subscribe( (resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
    } )
  }

  

}
