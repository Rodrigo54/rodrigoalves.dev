+++
title = 'Angular 2 - Lógica de Paginação'
description = 'Este é um exemplo de como implementar uma paginação em Angular 2 com uma lógica como a do Google.'
date = '2017-03-18 07:20:00 -0700'
author = 'Rodrigo Alves'
thumbnail = 'img/post-bg-07.jpg'
comments = true
[music]
  title = 'Strobe - deadmau5'
  url = 'https://open.spotify.com/track/6c9EGVj5CaOeoKd9ecMW1U'
+++

Este é um exemplo de como implementar uma paginação em Angular 2 e TypeScript com uma lógica de resultados de pesquisa do Google.

## Lógica de paginação do Google

A lógica na paginação do Google é a seguinte:

Há 10 links de página mostrados a qualquer momento (por exemplo, 1 2 3 4 5 6 7 8 9 10) a menos que haja menos de 10 páginas totais
o link ativo (página atual) está na 6ª posição, exceto quando o link ativo da página está abaixo de 6 ou a menos de 4 da última posição

Aqui está o que parece para cada página se houver 15 páginas totais:

<div class="grid-angular-pag">
    <div>
        <span>
            <strong>1</strong>
        </span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
    </div>
    <div>
        <span>1</span>
        <span>
            <strong>2</strong>
        </span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
    </div>
    <div>
        <span>1</span>
        <span>2</span>
        <span>
            <strong>3</strong>
        </span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
    </div>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>
            <strong>4</strong>
        </span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>    
    </div>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>
            <strong>5</strong>
        </span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>    
    </div>
    <div>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>
            <strong>6</strong>
        </span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
    </div>
    <div>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>
            <strong>7</strong>
        </span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
    </div>
    <div>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>
            <strong>8</strong>
        </span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
    </div>
    <div>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>
            <strong>9</strong>
        </span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <span>13</span>
    </div>
    <div>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>
            <strong>10</strong>
        </span>
        <span>11</span>
        <span>12</span>
        <span>13</span>
        <span>14</span>
    </div>
    <div>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>
            <strong>11</strong>
        </span>
        <span>12</span>
        <span>13</span>
        <span>14</span>
        <span>15</span>
    </div>
    <div>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
        <span>
            <strong>12</strong>
        </span>
        <span>13</span>
        <span>14</span>
        <span>15</span>
    </div>
    <div>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <span>
            <strong>13</strong>
        </span>
        <span>14</span>
        <span>15</span>
    </div>
    <div>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <span>13</span>
        <span>
            <strong>14</strong>
        </span>
        <span>15</span>
    </div>
    <div>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>10</span>
        <span>11</span>
        <span>12</span>
        <span>13</span>
        <span>14</span>
        <span>
            <strong>15</strong>
        </span>
    </div>
</div>

## Executando o Exemplo Angular 2 Localmente

Foi usado o projeto angular 2 quickstart como uma base para o aplicativo, ele é escrito em TypeScript e usa systemjs para carregar módulos. Também é possivel usar o angular-cli para o aplicativo importando os componetes e services. Se você é novo no angular 2, eu recomendaria verificar o curos de angular 2 da [Loiane Groner](https://www.youtube.com/playlist?list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G), pois ela ensina em detalhes sobre como criar projetos com angular-cli.

1. Instale NodeJS e NPM de [nodejs.org](https://nodejs.org/en/download/), você pode verificar as versões que você instalou executando `node -v` e `npm -v` da linha de comando.

1. Faça o download do código-fonte do projeto em [github.com/cornflourblue/angular2-pagination-example](https://github.com/cornflourblue/angular2-pagination-example)

1. Instale todos os pacotes necessários com `npm install` npm é executando a partir da linha de comando na pasta raiz do projeto (onde o package.json está localizado).

1. Inicie o aplicativo executando `npm start` a partir da linha de comando na pasta raiz do projeto.

## Pager Service - Lógica de paginação em TypeScript como a do Google

Para facilitar a reutilização da lógica de paginação em diferentes componentes ou módulos Angular 2, colocamos a lógica de paginação em um serviço angular 2.

{{< highlight typescript >}}
import * as _ from 'underscore';

export class PagerService {
getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
// calculando o total de paginas
let totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number, endPage: number;
        if (totalPages <= 10) {
            // Se tiver menos de 10 páginas totais para mostrar tudo
            startPage = 1;
            endPage = totalPages;
        } else {
            // Se tiver mais de 10 páginas totais, calcular as páginas inicial e final
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }

        // Cálculo de índices de itens iniciais e finais
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // Criar um array de páginas para o ng-repeat no componente
        let pages = _.range(startPage, endPage + 1);

        // Retornar objeto com todas as propriedades exigidas para exibição
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

}
{{< /highlight >}}

## AppComponent que usa o serviço Pager

Um exemplo de componente angular 2 que usa o Pager Service acima para paginar uma lista de itens fictícios que são extraídos de um arquivo json no servidor.

{{< highlight typescript >}}
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import * as _ from 'underscore';

import { PagerService } from './_services/index'

@Component({
moduleId: module.id,
selector: 'app',
templateUrl: 'app.component.html'
})

export class AppComponent implements OnInit {
constructor(private http: Http, private pagerService: PagerService) { }

    // array com todos os itens a serem paginados
    private allItems: any[];

    // pager object
    pager: any = {};

    // items paginados
    pagedItems: any[];

    ngOnInit() {
        // pega os arquivos
        this.http.get('./dummy-data.json')
            .map((response: Response) => response.json())
            .subscribe(data => {
                //Definir os itens para a resposta json
                this.allItems = data;

                //Inicializar na página 1
                this.setPage(1);
            });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // pega o objeto pager do serviço
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // pega a página atual de itens
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

}
{{< /highlight >}}

# HTML Template com itens paginados e navegação

Um exemplo de modelo angular 2 que mostra uma lista de itens paginados e os links de paginação para navegar entre páginas.

{{< highlight html >}}

<div>
    <div class="container">
        <div class="text-center">
            <h1>Angular 2 - Lógica de Paginação</h1>
 
            <!-- Itens sendo paginados -->
            <div *ngFor="let item of pagedItems">{{item.name}}</div>
 
            <!-- Paginação -->
            <ul *ngIf="pager.pages && pager.pages.length" class="pagination">
                <li [ngClass]="{disabled:pager.currentPage === 1}">
                    <a (click)="setPage(1)">Início</a>
                </li>
                <li [ngClass]="{disabled:pager.currentPage === 1}">
                    <a (click)="setPage(pager.currentPage - 1)">Anterior</a>
                </li>
                <li *ngFor="let page of pager.pages" [ngClass]="{active:pager.currentPage === page}">
                    <a (click)="setPage(page)">{{page}}</a>
                </li>
                <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}">
                    <a (click)="setPage(pager.currentPage + 1)">Próximo</a>
                </li>
                <li [ngClass]="{disabled:pager.currentPage === pager.totalPages}">
                    <a (click)="setPage(pager.totalPages)">Último</a>
                </li>
            </ul>
        </div>
    </div>
</div>
{{< /highlight >}}

O projeto está disponível no GitHub em [github.com/cornflourblue/angular2-pagination-example](https://github.com/cornflourblue/angular2-pagination-example)

---

## Referências

- Blog do Jason Watmore - [Angular 2 - Pagination Example with Logic like Google](http://jasonwatmore.com/post/2016/08/23/angular-2-pagination-example-with-logic-like-google)
- Documentação do Angular 2 - [Angular docs](https://angular.io/docs/ts/latest/)
