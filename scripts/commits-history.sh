#!/bin/bash

# Diretório onde os arquivos serão salvos
OUTPUT_DIR="commits_by_branch"
rm -rf "$OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# Para cada branch local e remota, pega as mensagens de commit e salva em um arquivo
for branch in $(git for-each-ref --format='%(refname:short)' refs/heads/ refs/remotes/); do
  # Substitui '/' por '_' para nomes de arquivos válidos
  safe_branch=$(echo "$branch" | sed 's|/|_|g')
  git log --pretty=format:"%s" "$branch" > "$OUTPUT_DIR/${safe_branch}_commits.txt"
done

echo "Mensagens de commit salvas em $OUTPUT_DIR/"
