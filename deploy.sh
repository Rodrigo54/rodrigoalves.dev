#!/bin/bash

# === CONFIGURAÇÕES ===
VPS_USER="root"                 # Usuário da VPS
VPS_IP="82.25.71.137"           # IP da VPS
VPS_DIR="/var/www/blog"       # Diretório onde o projeto será hospedado
LOCAL_BUILD_DIR="dist/analog/public"          # Diretório de build do Vite
DOMAIN="vps.rodrigoalves.dev"   # Domínio configurado no Caddy

echo "🚀 Iniciando Deploy do Blog para $VPS_IP ..."

# 1️⃣ Gera o build do projeto
echo "📦 Construindo o projeto..."
npm install
npm run build
# Copia o arquivo Caddyfile para a pasta de build
cp Caddyfile $LOCAL_BUILD_DIR/

# 2️⃣ Faz upload dos arquivos para a VPS
echo "📤 Enviando arquivos para a VPS..."
ssh $VPS_USER@$VPS_IP "mkdir -p $VPS_DIR"  # Garante que o diretório existe
ssh $VPS_USER@$VPS_IP "rm -rf $VPS_DIR/*"  # Limpa o diretório antes de enviar os arquivos
scp -r $LOCAL_BUILD_DIR/* $VPS_USER@$VPS_IP:$VPS_DIR

# 4️⃣ Reinicia o Caddy para aplicar as mudanças
echo "🔄 Reiniciando o Caddy..."
ssh $VPS_USER@$VPS_IP "cd $VPS_DIR && caddy fmt --overwrite"
ssh $VPS_USER@$VPS_IP "cd $VPS_DIR && caddy reload"

echo "🔍 Verificando o status do Caddy..."
ssh $VPS_USER@$VPS_IP "systemctl status caddy"

echo "✅ Deploy concluído com sucesso! Acesse: https://$DOMAIN"
