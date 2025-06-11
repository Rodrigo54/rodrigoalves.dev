A extensão de arquivo `.analog` e `.ag` do AnalogJS são um novo formato de arquivo para SFCs (Single File Components) que visa simplificar a experiência de criação e fornecer componentes e diretivas compatíveis com Angular.

Juntos, combinam:
- Código dentro de Tags `<template>`, `<script>`, e `<style>` 
- Uso de APIs de sinal angular sem decoradores
- Padrões de desempenho em primeiro lugar (detecção de alterações, sem acessos a etc.) OnPush, ngDoCheck

Exemplo de um arquivo `.analog`:
```analog
<script lang="ts">
  // counter.analog
  import { signal } from '@angular/core';

  const count = signal(0);

  function add() {
    count.set(count() + 1);
  }
</script>

<template>
  <div class="container">
    <button (click)="add()">{{count()}}</button>
  </div>
</template>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  button {
    font-size: 2rem;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
  }
</style>
<script lang="ts">
  // counter.analog
  import { signal } from '@angular/core';

  const count = signal(0);

  function add() {
    count.set(count() + 1);
  }
</script>

<template>
  <div class="container">
    <button (click)="add()">{{count()}}</button>
  </div>
</template>

<style>
  .container {
    display: flex;
    justify-content: center;
  }

  button {
    font-size: 2rem;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
  }
</style>
```

Os componentes do Angular são os principais blocos de construção dos aplicativos. Cada componente representa uma pequena parte de uma maior de uma pagina da web. Organizar um aplicativo em componentes ajuda a fornecer estrutura ao seu projeto, separando claramente o código em partes específicas que são fáceis de manter e crescer ao longo do tempo.

exemplo de um arquivo `.ng.ts`:
```angular
<script lang="ts">
  // counter.ng.ts
  import { Component, signal } from '@angular/core';

  @Component({
    selector: 'app-example',
    template: `
      <div class="container">
        <button (click)="add()">{{count()}}</button>
      </div>
    `,
    styles: [`
      .container {
        display: flex;
        justify-content: center;
      }
      button {
        font-size: 2rem;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
      }
    `]
  })
  export default class Counter {
    count = signal(0);

    add() {
      this.count.set(this.count() + 1);
    }
  }
</script>


Para converter um arquivo `.analog` ou `.ag` para um arquivo `.ng.ts`, você pode usar os seguintes passos:

1. Crie um novo arquivo com a extensão `.ng.ts`.
2. Importe os módulos necessários do Angular.
3. Defina o componente usando o decorador `@Component` usando os dados de `defineMetadata`.
4. Transfira a lógica do arquivo `.analog` para o novo componente.
5. use `export default class` para definir o componente e não use o sufixo `Component` na classe.
6. Adicione o template e os estilos diretamente no decorador `@Component`.
7. use a nova sintaxe de fluxo de controle do Angular, como `@if`, `@for`, etc.
8. use a nova API de signal como o `input()` e `output()`.
9. Adicione um seletor ao componente no decorador `@Component` sem prefixos do tipo app-post-item.
10. renomeie o arquivo analog para `.txt`.

