import { Time } from "@angular/common";

export class DadosTransacao {
    idTransacao:Number;
    data:Date;
    valor:Number;
    cartao:string;
    hora:Time;
    tipoTransacao:string;
    naturezaTransacao:string;
}