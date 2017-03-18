---
layout:     post
title:      "Formatação de datas no Jekyll"
subtitle:   "Tudo o que você queria saber sobre formatação de datas no Jekyll, mas tinham medo de perguntar."
date:       2015-12-17 12:00:00
author:     "Rodrigo Alves"
header-img: "img/post-bg-03.jpg"
music:
  title:    "Houdini - Foster The People"
  url:      "https://open.spotify.com/track/5Fli1xRi01bvCjsZvKWro0"
---

Esses exemplos fornecem trechos de código testado para a exibição de vários
formatos de data em um site Jekyll. Eles também devem funcionar no GitHub Pages,
Shopify ou qualquer outra coisa que usa Liquid.

Jekyll (gerador de site estático) usa do Shopify o
[Liquid Template Engine](https://docs.shopify.com/themes/liquid-documentation/basics).
Para ver as datas é usando a tag `{% raw  %}{{ page.date }}{% endraw %}` fornecida pelo Liquid.
Com nenhuma outra alteração, as datas produzidas são algo como:

```liquid
{{ page.date }}
```

Se houver projetos que usam esse formato, eles são poucos e não se relacionam.
A criação de uma data mais amigável é feita através da aplicação do filtro `date:` do Liquid.
Por exemplo, combinando a tag e o filtro:

```liquid
{% raw  %}{{ page.date | date: '%B %d, %Y' }}{% endraw %}
```

produz uma data mais amigável ao leitor:

```liquid
{{ page.date | date: '%B %d, %Y' }}
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
    {% raw  %}{{ page.date | date_to_string }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date_to_string }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date_to_string }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date_to_string }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date_to_string }}** <br>

*   **Data para String longa**

    ```liquid
    {% raw  %}{{ page.date | date_to_long_string }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date_to_long_string }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date_to_long_string }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date_to_long_string }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date_to_long_string }}** <br>


*   **Data no padrão XML**

    ```liquid
    {% raw  %}{{ page.date | date_to_xmlschema }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date_to_xmlschema }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date_to_xmlschema }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date_to_xmlschema }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date_to_xmlschema }}** <br>


*   **Data no padrão RFC-822**

    ```liquid
    {% raw  %}{{ page.date | date_to_rfc822 }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date_to_rfc822 }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date_to_rfc822 }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date_to_rfc822 }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date_to_rfc822 }}** <br>

## Formatação de datas no Jekyll com Liquid ##

*   **Data no formato ISO 8601**

    ```liquid
    {% raw  %}{{ page.date | date: "%Y-%m-%d" }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date: "%Y-%m-%d" }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date: "%Y-%m-%d" }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date: "%Y-%m-%d" }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date: "%Y-%m-%d" }}** <br>

*   **Data no formato Americano com ano de 4 digitos** (com zeros à esquerda)

    ```liquid
    {% raw  %}{{ page.date | date: "%m/%d/%Y" }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date: "%m/%d/%Y" }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date: "%m/%d/%Y" }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date: "%m/%d/%Y" }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date: "%m/%d/%Y" }}** <br>

*   **Data no formato Americano com ano de 4 digitos** (sem zeros à esquerda)

    ```liquid
    {% raw  %}{{ page.date | date: "%-m/%-d/%Y" }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date: "%-m/%-d/%Y" }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date: "%-m/%-d/%Y" }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date: "%-m/%-d/%Y" }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date: "%-m/%-d/%Y" }}** <br>

*   **Data no formato Americano com ano de 2 digitos** (sem zeros à esquerda)

    ```liquid
    {% raw  %}{{ page.date | date: "%-m/%-d/%y" }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date: "%-m/%-d/%y" }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date: "%-m/%-d/%y" }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date: "%-m/%-d/%y" }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date: "%-m/%-d/%y" }}** <br>

*   **Data no formato Americano com mês completo** (sem zeros à esquerda)

    ```liquid
    {% raw  %}{{ page.date | date: "%-d %B %Y" }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date: "%-d %B %Y" }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date: "%-d %B %Y" }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date: "%-d %B %Y" }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date: "%-d %B %Y" }}** <br>

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

    Saída do Examplo 1: <strong>{% assign m = '2015-05-03' | date: "%-m" %}
    {{ '2015-05-03' | date: "%-d de" }}
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
    {% endcase %} {{ '2015-05-03' | date: " de %Y" }}</strong> <br>
    Saída do Examplo 2: <strong>{% assign m = '2015-07-04' | date: "%-m" %}
    {{ '2015-07-04' | date: "%-d de" }}
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
    {% endcase %} {{ '2015-07-04' | date: " de %Y" }}</strong> <br>
    Saída do Examplo 3: <strong>{% assign m = '2015-09-23' | date: "%-m" %}
    {{ '2015-09-23' | date: "%-d de" }}
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
    {% endcase %} {{ '2015-09-23' | date: " de %Y" }}</strong> <br>
    Saída do Examplo 4: <strong>{% assign m = '2015-11-26' | date: "%-m" %}
    {{ '2015-11-26' | date: "%-d de" }}
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
    {% endcase %} {{ '2015-11-26' | date: " de %Y" }}</strong> <br>

*   **Data no formato padrão Americano com mês completo** (sem zeros à esquerda)

    ```liquid
    {% raw  %}{{ page.date | date: "%B %-d, %Y" }}{% endraw %}
    ```

    Saída do Examplo 1: **{{ '2015-05-03' | date: "%B %-d, %Y" }}** <br>
    Saída do Examplo 2: **{{ '2015-07-04' | date: "%B %-d, %Y" }}** <br>
    Saída do Examplo 3: **{{ '2015-09-23' | date: "%B %-d, %Y" }}** <br>
    Saída do Examplo 4: **{{ '2015-11-26' | date: "%B %-d, %Y" }}** <br>

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

    Saída do Examplo 1: <strong>{% assign d = '2015-05-03' | date: "%-d" %}
    {{ '2015-05-03' | date: "%B" }}
    {% case d %}
      {% when '1' or '21' or '31' %}{{ d }}st
      {% when '2' or '22' %}{{ d }}nd
      {% when '3' or '23' %}{{ d }}rd
      {% else %}{{ d }}th
    {% endcase %} {{ '2015-05-03' | date: "%Y" }}</strong> <br>
    Saída do Examplo 2: <strong>{% assign d = '2015-07-04' | date: "%-d" %}
    {{ '2015-07-04' | date: "%B" }}
    {% case d %}
      {% when '1' or '21' or '31' %}{{ d }}st
      {% when '2' or '22' %}{{ d }}nd
      {% when '3' or '23' %}{{ d }}rd
      {% else %}{{ d }}th
    {% endcase %} {{ '2015-07-04' | date: "%Y" }}</strong> <br>
    Saída do Examplo 3: <strong>{% assign d = '2015-09-23' | date: "%-d" %}
    {{ '2015-09-23' | date: "%B" }}
    {% case d %}
      {% when '1' or '21' or '31' %}{{ d }}st
      {% when '2' or '22' %}{{ d }}nd
      {% when '3' or '23' %}{{ d }}rd
      {% else %}{{ d }}th
    {% endcase %} {{ '2015-09-23' | date: "%Y" }}</strong> <br>
    Saída do Examplo 4: <strong>{% assign d = '2015-11-26' | date: "%-d" %}
    {{ '2015-11-26' | date: "%B" }}
    {% case d %}
      {% when '1' or '21' or '31' %}{{ d }}st
      {% when '2' or '22' %}{{ d }}nd
      {% when '3' or '23' %}{{ d }}rd
      {% else %}{{ d }}th
    {% endcase %} {{ '2015-11-26' | date: "%Y" }}</strong> <br>

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

    Saída do Examplo 1: <strong>{% assign d = '2015-05-03' | date: "%a" %}{% assign m = '2015-05-03' | date: "%-m" %}
    {% case d %}
      {% when "Sun" %}Domingo,
      {% when "Mon" %}Segunda feira,
      {% when "Tue" %}Terça feira,
      {% when "Wed" %}Quarta feira,
      {% when "Thu" %}Quinta feira,
      {% when "Fri" %}Sexta feira,
      {% when "Sat" %}Sábado,
    {% endcase %}{{ '2015-05-03' | date: "%-d de" }}
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
    {% endcase %} {{ '2015-05-03' | date: " de %Y" }}</strong><br>
    Saída do Examplo 2: <strong>{% assign d = '2015-07-04' | date: "%a" %}{% assign m = '2015-07-04' | date: "%-m" %}
    {% case d %}
      {% when "Sun" %}Domingo,
      {% when "Mon" %}Segunda feira,
      {% when "Tue" %}Terça feira,
      {% when "Wed" %}Quarta feira,
      {% when "Thu" %}Quinta feira,
      {% when "Fri" %}Sexta feira,
      {% when "Sat" %}Sábado,
    {% endcase %}{{ '2015-07-04' | date: "%-d de" }}
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
    {% endcase %} {{ '2015-07-04' | date: " de %Y" }}</strong><br>
    Saída do Examplo 3: <strong>{% assign d = '2015-09-23' | date: "%a" %}{% assign m = '2015-09-23' | date: "%-m" %}
    {% case d %}
      {% when "Sun" %}Domingo,
      {% when "Mon" %}Segunda feira,
      {% when "Tue" %}Terça feira,
      {% when "Wed" %}Quarta feira,
      {% when "Thu" %}Quinta feira,
      {% when "Fri" %}Sexta feira,
      {% when "Sat" %}Sábado,
    {% endcase %}{{ '2015-09-23' | date: "%-d de" }}
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
    {% endcase %} {{ '2015-09-23' | date: " de %Y" }}</strong><br>
    Saída do Examplo 4: <strong>{% assign d = '2015-11-26' | date: "%a" %}{% assign m = '2015-11-26' | date: "%-m" %}
    {% case d %}
      {% when "Sun" %}Domingo,
      {% when "Mon" %}Segunda feira,
      {% when "Tue" %}Terça feira,
      {% when "Wed" %}Quarta feira,
      {% when "Thu" %}Quinta feira,
      {% when "Fri" %}Sexta feira,
      {% when "Sat" %}Sábado,
    {% endcase %}{{ '2015-11-26' | date: "%-d de" }}
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
    {% endcase %} {{ '2015-11-26' | date: " de %Y" }}</strong><br>

----------------------------------------------

## Referências ##

  * Blog do Alan W. Smith - [Jekyll Date Formatting Examples](http://alanwsmith.com/jekyll-liquid-date-formatting-examples)
  * Documentação do Liquid - [Liquid for Designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
  * Documentação do Shopify - [Additional Filters](https://docs.shopify.com/themes/liquid-documentation/filters/additional-filters#date)