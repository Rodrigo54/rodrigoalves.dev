#!/bin/bash

# Define o diretório alvo
target_directory="./src/content"

# Verifica se o diretório alvo existe
if [[ ! -d "$target_directory" ]]; then
  echo "Erro: O diretório '$target_directory' não existe."
  exit 1
fi

# Função para calcular o tempo de leitura
calculate_reading_time() {
  local file=$1
  local word_count=$(wc -w < "$file")
  local reading_time=$((word_count / 200)) # Considerando uma velocidade de leitura de 200 palavras por minuto

  # Verifica se o arquivo possui front matter
  if grep -q "^---" "$file"; then
    # Localiza o final do front matter
    front_matter_end=$(awk '/^---/{if (NR>1) {print NR; exit}}' "$file")

    if [[ -n "$front_matter_end" ]]; then
      # Remove o timeToRead existente, se houver
      sed -i "/^timeToRead:/,+2d" "$file"

      # Insere o timeToRead logo antes do fechamento '---' do front matter
      awk -v rt="timeToRead:\n  minutes: ${reading_time}\n  words: ${word_count}" '
        BEGIN { inside_front_matter = 0 }
        /^---/ { if (inside_front_matter) { print rt; inside_front_matter = 0 } else { inside_front_matter = 1 } }
        { print }
      ' "$file" > temp.md && mv temp.md "$file"
    fi
  else
    # Sem front matter, adiciona no topo
    sed -i "1i ---\ntimeToRead:\n  minutes: ${reading_time}\n  words: ${word_count}\n---" "$file"
  fi

  echo "$file: ~${reading_time} min(s) de leitura, ${word_count} palavras"
}

# Encontra e processa todos os arquivos .md no diretório alvo
for md_file in "$target_directory"/*.md; do
  if [[ -f "$md_file" ]]; then
    calculate_reading_time "$md_file"
  fi
done
