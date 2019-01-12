+++
title = 'Várias versões do PHP no Wampserver'
description = 'Use desde o PHP 5.3 até o PHP 7.0 no Wampserver.'
date = '2015-12-07T16:30:15Z'
author = 'Rodrigo Alves'
thumbnail = 'img/post-bg-01.jpg'
comments = true
[music]
  title = "Don't Stop - Knightlife"
  url = 'https://open.spotify.com/track/377e3RYbkuNSpZkV0yEQKE'
+++


Quando iniciamos um projeto do zero, fica fácil decidir qual a versão do PHP será usada.
Mais quando se trata de softwares legados, temos que utilizar a versão na qual o software foi feito.
As vezes também pode ocorrer que o servidor de hospedagem utilizado usa uma versão do PHP
que não temos instalado em nosso ambiente de desenvolvimento.

Com tudo isso, torna-se necessário instalar várias versões de PHP no mesmo ambiente de
desenvolvimento para diminuir a possibilidade de erros na hora de subir a aplicação
para o ambiente de produção.

## Wampserver 3.0

Desde 01 de maio de 2014, o wampserver 2.5 não sofria uma atualização,
o projeto parecia ter sido abandonado pela empresa francesa Alterway
que mantinha o projeto no sourceforge. Mais um francês de 71 anos de idade,
Dominique Ottello de codinome Otomatic, revoltado com o descaso, começou a
ele mesmo a fazer as atualizações do wampserver e a postá-las no fórum do
wampserver, ele chegou a atualizar até a versão 2.5.18 quando enfim a Alterway
decidiu implementar as atualizações feitas por ele e a inclui-lo no processo de
desenvolvimento do wampserver.

Veja o Changelog do wampserver 2.5.18 [aqui](http://forum.wampserver.com/read.php?2,130837).

Veja o Changelog do wampserver 3.0.0 [aqui](http://forum.wampserver.com/read.php?2,136483).

## Por onde começar?

Existem dois modos de adicionar versões do PHP no wampserver.
Uma das maneiras é a manual que pode ser conferida
[aqui nesse artigo](/blog/atualizando-a-versao-do-php-no-wampserver/).
E a outra é utilizando os add-ons do próprio wampserver.
Nesse artigo, vou mostrar como adicionar uma nova versão do PHP utilizando
os add-ons do wampserver 3.0.

1.  Instale o wampserver 3.0 no [sourceforge](https://sourceforge.net/projects/wampserver/files/latest/download)

    > É importante notar que apenas as versões do PHP 5.5 e superiores
    > dão suporte 64 bits por isso para instalar versões como o
    > PHP 5.4 ou inferiores é necessário instalar o wampserver x86

2.  Baixe os Add-ons do *wampserver x86* <br>
    * [PHP 5.3](http://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/wampserver3_x86_addon_php5.3.29.exe/download)
    * [PHP 5.4](http://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/wampserver3_x86_addon_php5.4.45.exe/download)
    * [PHP 5.5](http://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/wampserver3_x86_addon_php5.5.30.exe/download)
    * [PHP 5.6](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php5.6.27.exe/download)
    * [PHP 7.0](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php7.0.13.exe/download)
    * [PHP 7.1](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Php/wampserver3_x86_addon_php7.1.0.exe/download)
    * *Opcional* [Apache 2.2](https://sourceforge.net/projects/wampserver/files/WampServer%203/WampServer%203.0.0/Addons/Apache/wampserver3_x86_addon_apache2.2.31.exe/download)

## PHP na linha de comando

O PHP, assim como outras linguagens de programação, oferece a opção
de execução via linha de comando. Para quem usa o [Composer](https://getcomposer.org/) é preciso
definir a variável de ambiente do PHP no Windows. Mas já que temos
várias versões do PHP instaladas será mais eficiente fazer com que
a variável de ambiente do Windows mude conforme mudamos a versão do php no wampserver.

Para isso vamos precisar cria um arquivo **php.bat** para que dinamicamente mude a variável de ambiente "PATH" após troca da versão do PHP no wampserver. O arquivo deve se parecer com esse abaixo.

{{< gist hieblmedia d83b0ace4861a51344ca >}}

Crie o arquivo **php.bat** em `path\para-o\wamp\bin\php`

Depois adicione a variável de ambiente *PATH* para o php *`";path\para-o\wamp\bin\php"`*
(se existir remova seu *PATH* php antigo)

Agora você pode executar o PHP na linha de comando sempre globalmente
com a versão atual do PHP no wampserver.
