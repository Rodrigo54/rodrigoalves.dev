+++
title = 'Formatação de datas no Jekyll'
description = 'Tudo o que você queria saber sobre formatação de datas no Jekyll, mas tinham medo de perguntar.'
date = '2015-12-17T12:00:00Z'
author = 'Rodrigo Alves'
thumbnail = 'img/post-bg-03.jpg'
comments = true
[music]
  title = 'Houdini - Foster The People'
  url = 'https://open.spotify.com/track/5Fli1xRi01bvCjsZvKWro0'
+++

Esses exemplos fornecem trechos de código testado para a exibição de vários
formatos de data em um site Jekyll. Eles também devem funcionar no GitHub Pages,
Shopify ou qualquer outra coisa que usa Liquid.

Jekyll (gerador de site estático) usa do Shopify o
[Liquid Template Engine](https://docs.shopify.com/themes/liquid-documentation/basics).
Para ver as datas é usando a tag `{{ page.date }}` fornecida pelo Liquid.
Com nenhuma outra alteração, as datas produzidas são algo como:

```liquid
2015-12-17 09:00:00 -0300
```

Se houver projetos que usam esse formato, eles são poucos e não se relacionam.
A criação de uma data mais amigável é feita através da aplicação do filtro `date:` do Liquid.
Por exemplo, combinando a tag e o filtro:

```liquid
{{ page.date | date: '%B %d, %Y' }}
```

produz uma data mais amigável ao leitor:

```liquid
December 17, 2015
```

Com isso fica muito melhor, mas dependendo da data, as questões de sutileza no design aparecem.
Por exemplo, durante os primeiros nove dias de cada mês "zeros à esquerda"
surgem (Ex: "August 03, 2013" em vez de "August 3, 2013").
Outros erros básicos com os filtros do Liquid incluem:

1. Adicionando uma data com os nomes dos meses abreviados temos que ajustar para lidar
   com Maio que em ingles fica May. Por exemplo, "Aug. 16, 2013" está abreviado.
   "May. 16, 2013" não esta.

2. Setembro é geralmente abreviado em ingle como "Sept" e não "Sep" como é o padrão do Liquid.

3. Para cumprir com o estilo americano os meses *April*, *May*, *June* e *July* não devem ser abreviados.
   Alterações semelhantes são necessárias para atender as orientações do Manual de Estilo de Chicago.

A maioria dos projetos acompanham os padrões disponíveis. Ou usando um formato que
não tem esses problemas ou, mais frequentemente, não se importam com esses detalhes.
Mesmo com essa situação as datas ainda ficam na home dos sites e como cada projeto
tem sua lista de tarefas de possíveis mudanças que se estendem até o horizonte as
datas não são itens de importância. Então é comum adiar encontrar uma solução, mas
não ter formatação de data adequada é sempre um incomodo. Enquanto essas soluções
resolverem a questão, esta postagem será como uma referência pública também.

Este conjunto de filtros para datas do Liquid resolve os problemas listados acima
e explora algumas outras opções de formatação. Cada um oferece uma solução para
um formato de exibição específico e é fornecido com quatro exemplos de saída
para as seguintes datas: 1) *3 de Maio de 2015*, 2) *4 de Julho 2015*,
3) *23 Setembro de 2015* e 4) *26 de Novembro de 2015*. Estes exemplos demonstram como
os vários problemas de formatação são manipulados. Após os exemplos, alguns trechos
de código para elementos individuais são fornecidos. Com estas amostras, é fácil
conseguir praticamente qualquer formato de data desejado.

## Usando Filtros do Jekyll para Date ##

*   **Data para String**

    ```liquid
    {{ page.date | date_to_string }}
    ```

    Saída do Examplo 1: **03 May 2015** <br>
    Saída do Examplo 2: **04 Jul 2015** <br>
    Saída do Examplo 3: **23 Sep 2015** <br>
    Saída do Examplo 4: **26 Nov 2015** <br>

*   **Data para String longa**

    ```liquid
    {{ page.date | date_to_long_string }}
    ```

    Saída do Examplo 1: **03 May 2015**  <br>
    Saída do Examplo 2: **04 July 2015**  <br>
    Saída do Examplo 3: **23 September 2015**  <br>
    Saída do Examplo 4: **26 November 2015**  <br>


*   **Data no padrão XML**

    ```liquid
    {{ page.date | date_to_xmlschema }}
    ```

    Saída do Examplo 1: **2015-05-03T00:00:00-03:00** <br>
    Saída do Examplo 2: **2015-07-04T00:00:00-03:00** <br>
    Saída do Examplo 3: **2015-09-23T00:00:00-03:00** <br>
    Saída do Examplo 4: **2015-11-26T00:00:00-03:00** <br>


*   **Data no padrão RFC-822**

    ```liquid
    {{ page.date | date_to_rfc822 }}
    ```
    
    Saída do Examplo 1: **Sun, 03 May 2015 00:00:00 -0300** <br>
    Saída do Examplo 2: **Sat, 04 Jul 2015 00:00:00 -0300** <br>
    Saída do Examplo 3: **Wed, 23 Sep 2015 00:00:00 -0300** <br>
    Saída do Examplo 4: **Thu, 26 Nov 2015 00:00:00 -0300** <br>

## Formatação de datas no Jekyll com Liquid ##

*   **Data no formato ISO 8601**

    ```liquid
    {{ page.date | date: "%Y-%m-%d" }}
    ```

    Saída do Examplo 1: **2015-05-03** <br>
    Saída do Examplo 2: **2015-07-04** <br>
    Saída do Examplo 3: **2015-09-23** <br>
    Saída do Examplo 4: **2015-11-26** <br>

*   **Data no formato Americano com ano de 4 digitos** (com zeros à esquerda)

    ```liquid
    {{ page.date | date: "%m/%d/%Y" }}
    ```

    Saída do Examplo 1: **05/03/2015** <br>
    Saída do Examplo 2: **07/04/2015** <br>
    Saída do Examplo 3: **09/23/2015** <br>
    Saída do Examplo 4: **11/26/2015** <br>

*   **Data no formato Americano com ano de 4 digitos** (sem zeros à esquerda)

    ```liquid
    {{ page.date | date: "%-m/%-d/%Y" }}
    ```

    Saída do Examplo 1: **5/3/2015** <br>
    Saída do Examplo 2: **7/4/2015** <br>
    Saída do Examplo 3: **9/23/2015** <br>
    Saída do Examplo 4: **11/26/2015** <br>

*   **Data no formato Americano com ano de 2 digitos** (sem zeros à esquerda)

    ```liquid
    {{ page.date | date: "%-m/%-d/%y" }}
    ```

    Saída do Examplo 1: **5/3/15** <br>
    Saída do Examplo 2: **7/4/15** <br>
    Saída do Examplo 3: **9/23/15** <br>
    Saída do Examplo 4: **11/26/15** <br>

*   **Data no formato Americano com mês completo** (sem zeros à esquerda)

    ```liquid
    {{ page.date | date: "%-d %B %Y" }}
    ```

    Saída do Examplo 1: **3 May 2015** <br>
    Saída do Examplo 2: **4 July 2015** <br>
    Saída do Examplo 3: **23 September 2015** <br>
    Saída do Examplo 4: **26 November 2015** <br>

*   **Data no formato Brasileiro com mês completo** (sem zeros à esquerda)

    ```liquid
    {% raw  %}
    {% assign m = page.date | date: "%-m" %}
    {{ page.date | date: "%-d de" }}
    {% case m %}
      {% when '1' %}Janeiro
      {% when '2' %}Fevereiro
      {% when '3' %}Março
      {% when '4' %}Abril
      {% when '5' %}Maio
      {% when '6' %}Junho
      {% when '7' %}Julho
      {% when '8' %}Agosto
      {% when '9' %}Setembro
      {% when '10' %}Outubro
      {% when '11' %}Novembro
      {% when '12' %}Dezembro
    {% endcase %}
    {{ page.date | date: " de %Y" }}
    {% endraw %}
    ```

    Saída do Examplo 1: **3 de Maio de 2015** </br> 
    Saída do Examplo 2: **4 de Julho de 2015** </br> 
    Saída do Examplo 3: **23 de Setembro de 2015** </br> 
    Saída do Examplo 4: **26 de Novembro de 2015** </br> 

*   **Data no formato padrão Americano com mês completo** (sem zeros à esquerda)

    ```liquid
    {{ page.date | date: "%B %-d, %Y" }}
    ```

    Saída do Examplo 1: **May 3, 2015** <br>
    Saída do Examplo 2: **July 4, 2015** <br>
    Saída do Examplo 3: **September 23, 2015** <br>
    Saída do Examplo 4: **November 26, 2015** <br>

*   **Data no formato Americano com mês completo e dias ordenados** (sem zeros à esquerda)

    ```liquid
    {% raw  %}
    {% assign d = page.date | date: "%-d"  %}
    {{ page.date | date: "%B" }}
    {% case d %}
      {% when '1' or '21' or '31' %}{{ d }}st
      {% when '2' or '22' %}{{ d }}nd
      {% when '3' or '23' %}{{ d }}rd
      {% else %}{{ d }}th
    {% endcase %},
    {{ page.date | date: "%Y" }}
    {% endraw %}
    ```

    Saída do Examplo 1: **May 3rd 2015** </br> 
    Saída do Examplo 2: **July 4th 2015** </br> 
    Saída do Examplo 3: **September 23rd 2015** </br> 
    Saída do Examplo 4: **November 26th 2015** </br> 

*   **Data no formato Brasileiro com dia e mês completo** (sem zeros à esquerda)

    ```liquid
    {% raw  %}
    {% assign d = page.date | date: "%a" %}
    {% assign m = page.date | date: "%-m" %}
    {% case d %}
      {% when "Sun" %}Domingo
      {% when "Mon" %}Segunda feira
      {% when "Tue" %}Terça feira
      {% when "Wed" %}Quarta feira
      {% when "Thu" %}Quinta feira
      {% when "Fri" %}Sexta feira
      {% when "Sat" %}Sábado
    {% endcase %}
    {{ page.date | date: "%-d de " }}
    {% case m %}
      {% when '1' %}Janeiro
      {% when '2' %}Fevereiro
      {% when '3' %}Março
      {% when '4' %}Abril
      {% when '5' %}Maio
      {% when '6' %}Junho
      {% when '7' %}Julho
      {% when '8' %}Agosto
      {% when '9' %}Setembro
      {% when '10' %}Outubro
      {% when '11' %}Novembro
      {% when '12' %}Dezembro
    {% endcase %}
    {{ page.date | date: " de %Y" }}
    {% endraw %}
    ```

    Saída do Examplo 1: **Domingo, 3 de Maio de 2015** </br>
    Saída do Examplo 2: **Sábado, 4 de Julho de 2015** </br>
    Saída do Examplo 3: **Quarta feira, 23 de Setembro de 2015** </br>
    Saída do Examplo 4: **Quinta feira, 26 de Novembro de 2015** </br>

----------------------------------------------

## Referências ##

  * Blog do Alan W. Smith - [Jekyll Date Formatting Examples](http://alanwsmith.com/jekyll-liquid-date-formatting-examples)
  * Documentação do Liquid - [Liquid for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
  * Documentação do Shopify - [Additional Filters](https://docs.shopify.com/themes/liquid-documentation/filters/additional-filters#date)
