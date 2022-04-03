import { Component } from '@angular/core';
import { Estabelecimento } from './Modelos/estabelecimento';
import { Transacao } from './Modelos/Transacao';
import { RestService } from './rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  file:any;
  estabelecimentos:Estabelecimento[];
  estabelecimentoSelected: Estabelecimento = new Estabelecimento;
  transacao:Transacao = new Transacao;

  constructor(public service: RestService) { }

  ngOnInit() {
    (<HTMLInputElement> document.getElementById("tableTransacao")).disabled = true;
    (<HTMLInputElement> document.getElementById("tableTransacao")).hidden = true;
    (<HTMLInputElement> document.getElementById("saldo")).hidden = true;
    this.carregarEstabelecimentos();
  }

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  salvarArquivo() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.salvar(fileReader.result)
    }
    if(this.file === undefined || this.file === null) {
      alert("Nenhum Arquivo selecionado!");
      return;
    }
    fileReader.readAsText(this.file);
  }

  salvar(transacoes: any) {
    var split = transacoes.split("\r\n");
    this.service.cadastraTransacoes(split).subscribe( result => {
      alert("Arquivo Inserido com sucesso");
      (<HTMLInputElement> document.getElementById("fileInput")).value = null;
      this.file=null;
      window.location.reload();
    });
  }

  carregarEstabelecimentos() {
    this.service.listarEstabelecimentos().subscribe(result => {
      this.estabelecimentos = result;
      this.estabelecimentoSelected = this.estabelecimentos[0];
    })
  }

  pesquisarTransacoes() {
    this.service.procurarDadosTransacao(this.estabelecimentoSelected.idEstabelecimento).subscribe(result => {
      (<HTMLInputElement> document.getElementById("tableTransacao")).disabled = false;
      (<HTMLInputElement> document.getElementById("tableTransacao")).hidden = false;
      (<HTMLInputElement> document.getElementById("saldo")).hidden = false;
      this.transacao = result;
      this.transacao.saldo = result.saldo.toFixed(2);
    });
  }
}
