---
title: 'Angular 16: Novos recursos para melhorar a experiência do desenvolvedor'
description: 'Descubra as novidades do Angular 16, como o recurso de sinais, a melhoria no modelo de reatividade, a marcação de entradas obrigatórias em componentes, entre outros recursos e melhorias.'
createAt: '2023-05-07 12:00:00 -0300'
author: 'Rodrigo Alves'
featuredImage: '/img/post-bg-06.webp'
comments: true
tags: ['angular']
music:
  title: 'Bon Appétit - Katy Perry ft Migos'
  url: 'https://open.spotify.com/track/4rHmKlFRiFzabiVO6e9w2e?si=1489aeb041fc42a9'
---

Com o Angular 16 muitos desenvolvedores estão animados com as novas funcionalidades e melhorias que vieram com essa nova versão.
Neste artigo, vamos explorar as principais novidades do Angular 16 e o que elas significam para o desenvolvimento de aplicações web modernas.

### Signals

Um dos recursos mais aguardados do Angular 16 é a introdução dos Signals.
Os Signals são uma nova forma de gerenciamento de estados em aplicações Angular, inspirados no Solid.js.
Os Signals também podem depender de outros Signals, criando um grafo de valores reativos que é atualizado automaticamente sempre que houver mudanças nas dependências.
Os Signals podem ser usados com os observables do RxJS, que ainda são suportados no Angular 16, para criar fluxos de dados poderosos e declarativos.

#### O que são signals?

Um signal é uma abstração em torno de um valor que pode notificar consumidores interessados quando esse valor muda.
Signals podem conter qualquer valor, desde tipos primitivos simples até estruturas de dados complexas.
O valor de um signal é sempre lido por meio de uma função getter, o que permite que o Angular rastreie onde o signal é usado.
Signals podem ser graváveis ou somente leitura.

#### Signals graváveis
Signals graváveis fornecem uma API para atualizar seus valores diretamente.
Você cria signals graváveis chamando a função signal com o valor inicial do signal:

```ts
const count = signal(0);

// Signals são funções getter - chamá-las lê seu valor.
console.log('A contagem é: ' + count());
```

Para alterar o valor de um signal gravável, você pode atribuir diretamente o novo valor usando o método .set():

```ts
count.set(3);
```

ou usar a operação .update() para calcular um novo valor com base no valor anterior:

```ts
// Incrementa a contagem em 1.
count.update(valor => valor + 1);
```

Ao trabalhar com signals que contêm objetos, às vezes é útil mutar o objeto diretamente. Por exemplo, se o objeto for um array, você pode querer adicionar um novo valor sem substituir completamente o array. Para fazer uma mudança interna como essa, use o método .mutate:

```ts
const todos = signal([{title: 'Aprender signals', done: false}]);

todos.mutate(valor => {
  // Muda o primeiro TODO do array para 'done: true' sem substituí-lo.
  valor[0].done = true;
});
```

Signals graváveis têm o tipo WritableSignal.

#### Signals computados
Um signal computado deriva seu valor de outros signals. Defina um signal computado usando a função computed e especificando uma função de derivação:

```ts
const count: WritableSignal<number> = signal(0);
const doubleCount: Signal<number> = computed(() => count() * 2);
```

O signal doubleCount depende de count. Sempre que count é atualizado, o Angular sabe que qualquer coisa que dependa de count ou doubleCount também precisa ser atualizada.

Os signals computados são tanto avaliados preguiçosamente (lazily evaluated) quanto memorizados (memoized). A função de derivação de doubleCount não é executada para calcular seu valor até a primeira vez que doubleCount é lido. Uma vez calculado, esse valor é armazenado em cache, e leituras futuras de doubleCount retornarão o valor em cache sem recalcular.

Quando count muda, ele informa doubleCount que seu valor em cache não é mais válido, e o valor só é recalculado na próxima leitura de doubleCount.

Como resultado, é seguro realizar derivações computacionalmente caras em signals computados, como filtrar arrays.

Os signals computados não são signals graváveis
Você não pode atribuir valores diretamente a um signal computado. Ou seja, a seguinte operação produzirá um erro de compilação, porque doubleCount não é um WritableSignal:

```ts
doubleCount.set(3);
```

Em resumo, os signals são uma maneira poderosa e flexível de lidar com valores reativos em aplicações Angular.
Eles oferecem uma forma mais clara e simples de modelar dependências e fluxos de dados,
além de proporcionar melhor desempenho e interoperabilidade com outras bibliotecas, como o RxJS.
Com os signals, é possível criar sistemas reativos mais eficientes e elegantes, sem comprometer a simplicidade e a legibilidade do código.


### Required Inputs
Outra funcionalidade interessante do Angular 16 é a capacidade de marcar algumas entradas de componentes como obrigatórias,
o que significa que o componente pai deve fornecê-las, ou então um erro será lançado.
Isso ajudará a capturar erros e erros de digitação em tempo de compilação e garantir que os componentes recebam todos os dados necessários para funcionar corretamente.
As entradas obrigatórias também tornarão os componentes mais auto-documentáveis e fáceis de usar.

```ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  template: `
    <div>
      <h1>{{ title }}</h1>
      <ng-content></ng-content>
    </div>
  `
})
export class App {
  @Input({ required: true }) title: string = '';

  constructor() { }
}

```


### Passando dados do roteador como entradas de componentes
A nova versão do Angular, a v16, traz uma funcionalidade muito aguardada pelos desenvolvedores: a capacidade de passar parâmetros de rota diretamente para os inputs dos componentes correspondentes.
Isso significa que agora é possível acessar dados de resolvers, propriedades de dados, parâmetros de caminho e parâmetros de consulta diretamente nos inputs do componente de roteamento correspondente.
Essa é uma melhoria significativa na experiência do desenvolvedor, que agora pode acessar esses dados de maneira mais direta e conveniente.

```ts
const routes = [
  {
    path: 'about',
    loadComponent: import('./about'),
    resolve: { contact: () => getContact() }
  }
];

@Component(...)
export class About {
  // The value of "contact" is passed to the contact input
  @Input() contact?: string;
}
```

### Tags Auto fechadas
Uma funcionalidade recentemente implementada no Angular 16 é a possibilidade de usar tags auto-fecháveis para componentes em templates.
Essa é uma pequena melhoria na experiência de desenvolvimento que pode economizar tempo de digitação.
Em vez de escrever a tag de fechamento do componente, agora é possível fechar a tag usando uma barra (/) no final.
Essa é uma atualização simples, mas útil, que pode tornar o desenvolvimento Angular um pouco mais conveniente.

```html
<!-- // Agora você pode substituir isso -->
<super-duper-long-component-name [prop]="someVar"></super-duper-long-component-name>

<!-- // para isso -->
<super-duper-long-component-name [prop]="someVar"/>
```
### DestroyRef provider

Os hooks de ciclo de vida do Angular fornecem muita flexibilidade para conectar diferentes momentos da execução do seu aplicativo.
Nos últimos anos, uma oportunidade de melhoria tem sido permitir maior flexibilidade, por exemplo, fornecendo acesso a OnDestroy como um observável.
Na versão 16, o OnDestroy tornou-se injetável, o que permite a flexibilidade que os desenvolvedores estão pedindo.

Essa nova funcionalidade permite que você injete **DestroyRef** correspondente a um componente, diretiva, serviço ou pipe e registre o gancho de ciclo de vida onDestroy.
O DestroyRef pode ser injetado em qualquer lugar dentro de um contexto de injeção, incluindo fora do seu componente - nesse caso, o gancho onDestroy é executado quando o injetor correspondente é destruído.
Com isso, é possível criar uma lógica reutilizável que executa tarefas de limpeza necessárias em diferentes partes do aplicativo.

O novo provider chamado DestroyRef, que permite registrar callbacks de destruição para um ciclo de vida específico.
Essa novidade traz inúmeras vantagens, como a possibilidade de criar lógicas reutilizáveis para executar tarefas de
limpeza necessárias, além de facilitar a desinscrição de observables.
Com novo provider, é possível criar uma lógica que depende do **DestroyRef**, enquanto o novo operador **takeUntilDestroyed** permite concluir um stream quando
o contexto de um componente, diretiva ou pipe é destruído. Isso torna a programação Angular ainda mais eficiente e intuitiva,
proporcionando aos desenvolvedores uma maneira mais fácil e organizada de gerenciar os ciclos de vida de seus componentes.

```ts
import { Component, OnInit, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component(...)
export class App implements OnInit {

  public destroyRef = inject(DestroyRef);

 public ngOnInit() {
    this.getTodoList().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }
}
```

### Re-hidratação não destrutiva

O Angular 16 traz uma novidade muito esperada pelos desenvolvedores: melhorias na renderização do lado do servidor (SSR) e na hidratação de aplicações.
Essa nova hidratação não destrutiva de aplicativos completos evita que o Angular renderize a aplicação do zero.
Em vez disso, o framework procura nós DOM existentes enquanto constrói estruturas de dados internas e anexa ouvintes de eventos a esses nós.
Entre os benefícios dessa nova funcionalidade estão:

* A eliminação da "flickering" de conteúdo na página para os usuários finais,
* Melhores Web Core Vitals em cenários específicos
* Uma arquitetura à prova de futuro que permite o carregamento de código granular com primitivas que serão lançadas ainda este ano,
* Integração fácil com aplicativos existentes em poucas linhas de código e
* Adoção incremental da hidratação com o atributo ngSkipHydration em modelos para componentes que realizam manipulação manual do DOM.

Em testes iniciais, foi observado uma melhoria de até 45% no Largest Contentful Paint com a hidratação completa do aplicativo!

### Conclusão

Em conclusão, a versão 16 do Angular trouxe diversas novidades e
melhorias que vão facilitar a vida dos desenvolvedores e aumentar a performance e eficiência das aplicações criadas com o framework.
Todas essas mudanças tornam o Angular 16 uma atualização bastante aguardada pelos desenvolvedores.
Além dessas novidades, o Angular 16 também trouxe outras melhorias como:

* Servidor de desenvolvimento baseado em esbuild/vite (para ng serve)
* criação de novos projetos standalone a partir do CLI.
* novo comando de esquemas de migração para atualizar componentes para a nova API de componentes autônomos
* suporte experimental ao Jest para testes unitários
* tokens de design na biblioteca Angular Material
* O serviço de linguagem agora permite a importação automática de componentes e pipes em templates.
* Suporte ao TypeScript 5.0

No geral, o Angular 16 promete ser uma ótima versão com muitos recursos novos e melhorias que tornam cada vez melhor.
Se você ainda não experimentou essa nova versão, vale a pena conferir e explorar todas as suas novas funcionalidades e melhorias.
