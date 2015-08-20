---
layout:     post
title:      "Atualizando a versão do PHP no Wampserver"
subtitle:   "Use o PHP 7 no Wampserver."
date:       2015-08-19 20:30:00
author:     "Rodrigo Alves"
header-img: "img/WampServer.jpg"
---

<p>Siga os passos abaixo para atualizar o php no Wampserver</p>
<hr>

<ol>
<li> Parar servidor WAMP.</li><br>

<li>Va para <a href="http://windows.php.net/qa/">A página de downloads do php</a> e faça o dowload do pacode zip da versão do php. Certifique-se que esta baixando a versão  **Thread Safe** compativel (x86 ou x64).</li><br>

<li>Crie uma pasta para sua versão do php. Ex: <samp>wamp/bin/php/php5.6.11</samp></li><br>

<li>Extraia o zip baixado para a pasta recém-criada</li><br>

<li>Copie os arquivos:
	<ul>
  <li>php.ini</li>
  <li>phpForApache.ini</li>
  <li>wampserver.conf</li>
  <p>a partir da pasta do seu PHP existente (ex: <samp>wamp/bin/php/php5.5.12</samp>) para a nova pasta php5.6.11.</p>
	</ul></li><br>
<li>Abra os arquivos:
<ul>
  <li>php.ini</li>
  <li>phpForApache.ini</li>
  <p>e substitua as string da versão antiga para a nova versão. Ex: de 5.5.12 para 5.6.11</p>
</ul></li><br>
<li>Vá para <samp>wamp/bin/apache/apache/apache2.2.11/bin</samp> e exclua o arquivo chamado php.ini</li>
<br>
<li>Reinicie o servidor WAMP.</li>
<br><li>Escolha a versão antiga do php. Ex: php 5.5.12</li>
<br><li>Reinicie o servidor WAMP.</li>
<br><li>Agora escolha a nova versão do php. Ex: php 5.6.11.</li>
<br><li>Verifique se o caminho do PEAR está correto em php.ini,  e modifique caso nessecario.</li>
<br><li>Reinicie o servidor WAMP.</li>
<br><li>Aproveite!</li>
</ol>
