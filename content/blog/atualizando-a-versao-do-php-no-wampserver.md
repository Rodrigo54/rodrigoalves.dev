+++
title = 'Atualizando a versão do PHP no Wampserver'
description = 'Use o PHP 5.6 no Wampserver.'
date = '2015-08-19T20:30:00Z'
author = 'Rodrigo Alves'
thumbnail = 'img/home-bg.jpg'
comments = true
[music]
  title = 'There Might Be Coffee - deadmau5'
  url = 'https://open.spotify.com/track/7rwgvDDkdHTBMAruB2Lr3Z'
+++

Siga os passos abaixo para atualizar o php no Wampserver

1.  Parar servidor WAMP.

2.  Vá para [A página de downloads do php](http://windows.php.net/download/) e faça o dowload do pacode zip da versão do php. Certifique-se que esta baixando a versão  **Thread Safe** compativel (x86 ou x64).

3.  Crie uma pasta para sua versão do php. Ex: `wamp/bin/php/php5.6.11`

4. Extraia o zip baixado para a pasta recém-criada

5.  Copie os arquivos:
    * php.ini
    * phpForApache.ini
    * wampserver.conf

    a partir da pasta do seu PHP existente (ex: `wamp/bin/php/php5.5.12`) para a nova pasta php5.6.11.

6.  Abra os arquivos:
    * php.ini
    * phpForApache.ini

    e substitua as string da versão antiga para a nova versão. Ex: de 5.5.12 para 5.6.11

7. Vá para `wamp/bin/apache/apache/apache2.2.11/bin` e exclua o arquivo chamado php.ini

8. Reinicie o servidor WAMP.

9. Escolha a versão antiga do php. Ex: php 5.5.12
10. Reinicie o servidor WAMP.
11. Agora escolha a nova versão do php. Ex: php 5.6.11.
12. Verifique se o caminho do PEAR está correto em php.ini,  e modifique caso precise.
13. Reinicie o servidor WAMP.
14. Aproveite!
