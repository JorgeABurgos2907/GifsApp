import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private _historial: string[] = [];
  private apiKey: string = "OMDgceSIIXn0RulJXcoeYBeoRrT6U6RP";
  private servicioUrl: string = "https://api.giphy.com/v1/gifs";

  //TODO: CAMBIAR ANY POR SU TIPO CORRESPONDIENTE
  public resultados: Gif[] = [];

  constructor( private http: HttpClient ){

    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];

    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse( localStorage.getItem('historial')! ) ;
    // }

    this.resultados = JSON.parse( localStorage.getItem('imagenes')! ) || [];
  }

  get historial(){
    return [...this._historial];
  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes( query )){
      this._historial.unshift(query)
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this._historial = this._historial.splice(0,10);

    console.log(this._historial);

    const params = new HttpParams().set('api_key',this.apiKey).set('q',query).set('limit','10')

    console.log(params.toString)

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params:params})
    .subscribe( (resp ) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('imagenes', JSON.stringify(this.resultados));
    } )
  }

  

}
