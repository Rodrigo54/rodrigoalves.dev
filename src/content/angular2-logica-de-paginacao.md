---
title: 'Lógica de Paginação com Angular'
description: 'Este é um exemplo de como implementar uma paginação em Angular 2 com uma lógica como a do Google.'
createAt: '2017-03-18 07:20:00 -0300'
author: 'Rodrigo Alves'
comments: true
tags: ['angular', 'typescript']
featuredImage: 
  name: 'Birds Eye View do Litoral'
  author: '@lance_asper'
  url: 'https://unsplash.com/pt-br/fotografias/birds-eyeview-do-litoral-3P3NHLZGCp8'
  raw: 'https://images.unsplash.com/photo-1548454934-8c01558aa290'
music:
  title: 'Strobe - deadmau5'
  url: 'https://open.spotify.com/track/6c9EGVj5CaOeoKd9ecMW1U'
timeToRead:
  minutes: 5
  words: 1040
---

## Lógica de paginação do Google

A lógica na paginação do Google é a seguinte:

A paginação do Google segue uma lógica específica para exibir os números das páginas de resultados. Normalmente, são mostrados até 10 links numéricos para navegação entre as páginas (por exemplo: **1 2 3 4 5 6 7 8 9 10**), a menos que o total de páginas disponíveis seja inferior a 10.  

A posição do número que representa a página atual dentro dessa sequência segue um padrão:  

- Se a página atual for **1, 2, 3, 4 ou 5**, ela aparecerá na posição exata correspondente ao seu número. Por exemplo, se estiver na página 3, a sequência mostrada será **1 2 3 4 5 6 7 8 9 10**.  
- Se a página atual estiver em um número maior ou igual a 6, ela será posicionada sempre no **6º lugar dentro da sequência exibida**. Por exemplo, se estiver na página 7, a exibição será **2 3 4 5 6 7 8 9 10 11**.  
- No entanto, quando a página atual estiver **nos últimos 4 números disponíveis**, a numeração se ajusta para manter a última página visível no final da sequência. Por exemplo, se houver 12 páginas no total e o usuário estiver na página 10, os números exibidos serão **3 4 5 6 7 8 9 10 11 12**, garantindo que a última página apareça no final.  

Esse sistema ajuda a manter a navegação equilibrada, garantindo que o usuário tenha acesso tanto às páginas anteriores quanto às seguintes de forma intuitiva.

## Executando o Exemplo Angular 2 Localmente

Foi usado o projeto angular 2 quickstart como uma base para o aplicativo, ele é escrito em TypeScript e usa systemjs para carregar módulos. Também é possivel usar o angular-cli para o aplicativo importando os componetes e services. Se você é novo no angular 2, eu recomendaria verificar o curos de angular 2 da [Loiane Groner](https://www.youtube.com/playlist?list=PLGxZ4Rq3BOBoSRcKWEdQACbUCNWLczg2G), pois ela ensina em detalhes sobre como criar projetos com angular-cli.

1. Instale NodeJS e NPM de [nodejs.org](https://nodejs.org/en/download/), você pode verificar as versões que você instalou executando `node -v` e `npm -v` da linha de comando.

1. Faça o download do código-fonte do projeto em [github.com/cornflourblue/angular2-pagination-example](https://github.com/cornflourblue/angular2-pagination-example)

1. Instale todos os pacotes necessários com `npm install` npm é executando a partir da linha de comando na pasta raiz do projeto (onde o package.json está localizado).

1. Inicie o aplicativo executando `npm start` a partir da linha de comando na pasta raiz do projeto.

## Pager Service - Lógica de paginação em TypeScript como a do Google

Para facilitar a reutilização da lógica de paginação em diferentes componentes ou módulos Angular 2, colocamos a lógica de paginação em um serviço angular 2.

```typescript
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
      pages: pages,
    };
  }
}
```

## AppComponent que usa o serviço Pager

Um exemplo de componente angular 2 que usa o Pager Service acima para paginar uma lista de itens fictícios que são extraídos de um arquivo json no servidor.

```typescript
import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as _ from 'underscore';

import { PagerService } from './_services/index';

@Component({
  moduleId: module.id,
  selector: 'app',
  templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private http: Http, private pagerService: PagerService) {}

  // array com todos os itens a serem paginados
  private allItems: any[];

  // pager object
  pager: any = {};

  // items paginados
  pagedItems: any[];

  ngOnInit() {
    // pega os arquivos
    this.http
      .get('./dummy-data.json')
      .map((response: Response) => response.json())
      .subscribe((data) => {
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
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
}
```

## HTML Template com itens paginados e navegação

Um exemplo de modelo angular 2 que mostra uma lista de itens paginados e os links de paginação para navegar entre páginas.

```html
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
        <li
          *ngFor="let page of pager.pages"
          [ngClass]="{active:pager.currentPage === page}"
        >
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
```

O projeto está disponível no GitHub em [github.com/cornflourblue/angular2-pagination-example](https://github.com/cornflourblue/angular2-pagination-example)

---

## Referências

- Blog do Jason Watmore - [Angular 2 - Pagination Example with Logic like Google](http://jasonwatmore.com/post/2016/08/23/angular-2-pagination-example-with-logic-like-google)
- Documentação do Angular 2 - [Angular docs](https://angular.io/docs/ts/latest/)
