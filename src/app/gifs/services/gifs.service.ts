import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _historial: string[] = [];
  private apKey: string = "OMDgceSIIXn0RulJXcoeYBeoRrT6U6RP";

  //TODO: CAMBIAR ANY POR SU TIPO CORRESPONDIENTE
  public resultados: any[] = [];

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

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=OMDgceSIIXn0RulJXcoeYBeoRrT6U6RP&q=${ query }&limit=10`)
    .subscribe( (resp: any) => {
      console.log(resp.data);
      this.resultados = resp.data;
    } )
  }

  

}
