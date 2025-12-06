---
title: 'Novidades do Angular 21'
description: >-
  O Angular 21 traz diversas melhorias e novos recursos para desenvolvedores. Neste artigo, exploramos as principais novidades, incluindo atualizações no framework, novas ferramentas e aprimoramentos de desempenho que tornam o desenvolvimento de aplicações web ainda mais eficiente e agradável.
createAt: '2025-11-21T12:00:00-03:00'
author: Rodrigo Alves
slug: novidades-do-angular21
comments: true
tags:
  - angular
featuredImage:
  name: Birds Eye View do Litoral
  author: '@lance_asper'
  url: 'https://unsplash.com/pt-br/fotografias/cordilheira-irregular-iluminada-pela-luz-solar-da-hora-dourada-AvFJkZrsnkY'
  raw: 'https://images.unsplash.com/photo-1762886457614-98d4dc98f6ef'
music:
  title: Fly Out West - Yot Club
  url: 'https://open.spotify.com/intl-pt/track/1GPmqcYcbgQeOiu7P3S6Xo?si=d98e7ea4dede4039'
timeToRead:
  minutes: 5
  words: 966
---

O Angular 21 marca uma das maiores mudanças na história recente do framework. Lançado em novembro de 2025, ele não apenas consolida a arquitetura baseada em *Signals*, como também redefine padrões de performance, produtividade e assistência ao desenvolvedor.

Nesta versão, três pilares se destacam: **Zoneless**, **Signal Forms** e o **Servidor MCP** — uma plataforma de IA integrada ao ecossistema Angular.
A seguir, um panorama técnico das principais novidades e o impacto prático para equipes que desenvolvem aplicações com Angular.

## Zoneless por Padrão — A Nova Base de Performance

A principal mudança estrutural do Angular 21 é a remoção do `zone.js` em novos projetos. O modelo zoneless já era previsto desde que os Signals foram introduzidos, mas agora ele se torna o padrão oficial.

### Por que isso importa?

**Redução no bundle:**
Sem `zone.js`, aplicações ficam significativamente menores. Na prática, a comunidade tem observado reduções entre 25% e 40% no tamanho final do bundle.

**Change Detection mais eficiente:**
A detecção de mudanças (CD) agora é granular e baseada em Signals, não no rastreamento abrangente do zone.js. Isso se traduz em um ganho de runtime, com relatórios de até 50% de redução em re-renders desnecessários.

**DX Simplificada:**
Menos código mágico, depuração mais fácil e compatibilidade nativa com padrões modernos como `async/await`.

### Desafio: projetos legados

Aplicações antigas dependem fortemente do Zone.js e, geralmente, não estão preparadas para o modo Zoneless — especialmente se não usam `ChangeDetectionStrategy.OnPush`. Felizmente, a v21 resolve esse problema com uma ferramenta de IA: use o **Servidor MCP** (Multi-Context Platform), que agora está estável. O tool **onpush_zoneless_migration** analisa seu código e gera um plano de ação passo a passo para refatorar tudo para OnPush. É o jeito mais seguro de encarar a migração.

## Signal Forms — Uma Nova Era para Formulários (Experimental)

Signal Forms é a nova API para formulários do Angular e representa uma reescrita completa do modelo baseado em `FormControl`, `FormGroup` e no histórico `ControlValueAccessor`.

### Principais mudanças

**Tipagem forte por padrão:**
O estado do formulário é definido via Signals, eliminando gambiarras para ajudar o TypeScript e reduzindo erros comuns.

**Fim do `ControlValueAccessor`:**
Criar componentes de formulário customizados sempre envolveu boilerplate e muita configuração.
Com Signal Forms, a comunicação é direta, baseada em Signals — sem CVA.

**Reatividade consistente:**
Toda a reatividade segue o mesmo padrão do restante do framework, reduzindo a necessidade de subscriptions manuais.

```typescript auth.component.ts
import { Component } from '@angular/core';
import { signal } from '@angular/core/signals';
import { schema, form, Field, required, email, minLength } from '@angular/forms/signals';

export const LoginFormSchema = schema<Book>(fieldPath => {
  required(fieldPath.email);
  email(fieldPath.email);
  required(fieldPath.password);
  minLength(fieldPath.password, 8);
});

@Component({
  // ...
  imports: [Field],
  template: `
    <form>
      <input [field]="loginForm.email" placeholder="Email" />
      <input [field]="loginForm.password" placeholder="Password" />
    </form>
  `,
})
export class MyForm {
  protected readonly loginData = signal<LoginForm>({
    email: '',
    password: ''
  });

  protected readonly loginForm = form(this.loginData, LoginFormSchema);
}
```

### Estado da API

Signal Forms ainda é experimental e já sofreu mudanças (como a renomeação de `Control` para `Field` na versão `next.8`).
Recomendação atual:

- Ideal para testes e POCs.
- Ainda não recomendado para produção.

## MCP — A IA Integrada ao Ecossistema Angular

A versão 21 marca a estabilização do **Servidor MCP**, uma plataforma que fornece contexto estruturado para LLMs e oferece ferramentas focadas em manutenção e modernização de aplicações Angular.

### Ferramentas já disponíveis

- **onpush_zoneless_migration** (estável)
  Gera o plano de migração Zoneless/OnPush.

- **find_examples** (estável)
  Retorna exemplos atualizados de padrões modernos (Signals, Aria, Form API, etc.).

- **ai_tutor** (experimental)
  Um tutor interativo que avalia o código enquanto o desenvolvedor avança.

O MCP consolida o conceito de *AI-assisted Angular development*, permitindo que equipes reduzam tempo de migração, consultem boas práticas e evoluam suas codebases com mais segurança.

## Testes com Vitest — Novo Padrão Oficial

O Angular 21 oficializa o **Vitest** como test runner padrão.

### O que muda

- Novos projetos gerados com `ng new` já utilizam Vitest.
- Suporte experimental a Jest e Web Test Runner foi descontinuado (remoção prevista para a v22).
- Um schematic experimental facilita a migração:

  ```bash
  ng g @schematics/angular:refactor-jasmine-vitest
  ```

Projetos baseados em Karma/Jasmine continuam funcionando, mas a recomendação é iniciar a transição.

## Angular Aria — Componentes Headless com Acessibilidade Integrada

O **Angular Aria**, em Developer Preview, introduz uma biblioteca de componentes headless (sem estilos), focada em acessibilidade (WAI-ARIA).

Ele fornece a lógica comportamental e os atributos corretos enquanto o desenvolvedor cuida da marcação e do estilo — ideal para equipes que mantêm Design Systems customizados.

Com isso, o Angular agora oferece três camadas de UI:

1. **Material** — componentes prontos
2. **CDK** — primitives de comportamento
3. **Aria** — componentes acessíveis, porém sem estilo

## Melhorias de DX e Cleanup de Código

Além das grandes novidades, a v21 inclui melhorias sutis, mas valiosas:

### HttpClient simplificado

Disponível por padrão no root injector; `provideHttpClient()` só é necessário para interceptors ou configurações específicas.

### Schematics de modernização

- `ngclass-to-class-migration`
  Migra `NgClass` para bindings modernos.
- `common-to-standalone`
  Facilita a modularização de imports standalone.

### Router aprimorado

`navigateByUrl()` agora suporta opções de scroll configuráveis.

## Conclusão e Recomendações Estratégicas

A versão 21 não é apenas uma evolução, mas uma redefinição do ecossistema Angular.
Se você está planejando atualizar ou iniciar um novo projeto, estas são as prioridades recomendadas:

| Prioridade | Recurso       | Status       | Ação                                  |
| ---------- | ------------- | ------------ | ------------------------------------- |
| Alta       | Zoneless      | Padrão       | Adotar em novos projetos              |
| Alta       | MCP Migration | Estável      | Usar para modernizar projetos legados |
| Média      | Signal Forms  | Experimental | Testar, mas evitar produção           |
| Média      | Vitest        | Estável      | Adotar como padrão nos novos projetos |
| Baixa      | Angular Aria  | Preview      | Avaliar se você usa Design System     |

O Angular 21 é, acima de tudo, uma versão que prepara o terreno para um futuro mais leve, mais rápido e mais assistido por IA. As equipes que abraçarem desde cedo o novo modelo — especialmente Signals e Zoneless — terão um ciclo de desenvolvimento mais simples, estável e moderno.

## Referências

- DEV Community — Mohit Decodes — [Angular 21 Released: What's New & Developer Guide](https://dev.to/mohitdecodes/angular-21-released-whats-new-developer-guide-3lm5)
- Blog oficial do Angular — [Announcing Angular v21](https://blog.angular.dev/announcing-angular-v21-57946c34f14b)
- Documentação Angular — [Angular versioning and releases](https://angular.dev/reference/releases)
- DEV Community — M. Mourouh — [Angular 21 is Here: Real Features That Actually Improve Your Daily Workflow](https://dev.to/mmourouh/angular-21-is-here-real-features-that-actually-improve-your-daily-workflow-ogk)
- Bacancy Technology — [Angular 21 Release: What's New for Developers & Enterprises](https://www.bacancytechnology.com/blog/angular-21)
- Ninja Squad — [What's new in Angular 21.0?](https://blog.ninja-squad.com/2025/11/20/what-is-new-angular-21.0)
- Medium — Angle Brackets — [Signal Forms](https://anglebrackets-dev.medium.com/signal-forms-4c4c647d1e6a)
- YouTube — Angular Academy — [Signal Forms Custom Controls — Simplifying ControlValueAccessor](https://www.youtube.com/watch?v=gvL_mTQZIYE)
- Documentação Angular — [Angular Aria • Overview](https://angular.dev/guide/aria/overview)
- Documentação Angular — [Accessibility • Angular](https://angular.dev/best-practices/a11y)
- Documentação Angular — [Angular AI Tutor](https://angular.dev/ai/ai-tutor)
