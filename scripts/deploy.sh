#!/bin/bash

# === CONFIGURAÇÕES ===
VPS_USER="root"                 # Usuário da VPS
VPS_IP="82.25.71.137"           # IP da VPS
VPS_DIR="/var/www/blog"       # Diretório onde o projeto será hospedado
LOCAL_BUILD_DIR="dist/analog/public"          # Diretório de build do Vite
DOMAIN="vps.rodrigoalves.dev"   # Domínio configurado no Caddy
REMOTE_CADDYFILE="/etc/caddy/sites-enabled/blog.caddy"

echo "🚀 Iniciando Deploy do Blog para $VPS_IP ..."

# 1️⃣ Gera o build do projeto
echo "📦 Construindo o projeto..."
bun install
bun run build
# Copia o arquivo Caddyfile para a pasta de build
cp Caddyfile $LOCAL_BUILD_DIR/

# 2️⃣ Faz upload dos arquivos para a VPS
echo "📤 Enviando arquivos para a VPS..."
ssh $VPS_USER@$VPS_IP "mkdir -p $VPS_DIR"  # Garante que o diretório existe
ssh $VPS_USER@$VPS_IP "rm -rf $VPS_DIR/*"  # Limpa o diretório antes de enviar os arquivos
scp -r $LOCAL_BUILD_DIR/* $VPS_USER@$VPS_IP:$VPS_DIR

# 3. Upload do Caddyfile específico do site
scp Caddyfile $VPS_USER@$VPS_IP:/tmp/blog.caddy
ssh $VPS_USER@$VPS_IP "sudo mv /tmp/blog.caddy $REMOTE_CADDYFILE"

# 4. Reload do Caddy
ssh $VPS_USER@$VPS_IP "sudo caddy reload --config /etc/caddy/Caddyfile"

echo "🔍 Verificando o status do Caddy..."
ssh $VPS_USER@$VPS_IP "systemctl status caddy"

echo "✅ Deploy concluído com sucesso! Acesse: https://$DOMAIN"
