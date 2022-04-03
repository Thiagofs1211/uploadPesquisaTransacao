import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estabelecimento } from './Modelos/estabelecimento';
import { Transacao } from './Modelos/Transacao';

const endpoint = 'http://localhost:8080';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  })
};

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private http: HttpClient) { }

  cadastraTransacoes(data: Object): Observable<any> {
    return this.http.post(endpoint+'/transacao/salvarLote', JSON.stringify(data), httpOptions)
  }

  listarEstabelecimentos(): Observable <any> {
    return this.http.get<Estabelecimento>(endpoint+'/estabelecimento/listar');
  }

  procurarDadosTransacao(id:Number): Observable <any> {
    return this.http.get<Transacao>(endpoint+'/transacao/buscarTransacao/'+id);
  }
}
