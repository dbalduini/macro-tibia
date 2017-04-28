# macro-tibia
Tibia macro by command line

## Requisitos

Node v7.9.0

## Linha de comando

1. Clone o macro-tibia ou faça download do zip do mesmo.

2. Unzip macro-tibia.zip

3. Acesse a pasta macro-tibia/

4. Instalação

```
  npm install
```

5. Execução

```
npm start
```

## Interface Desktop
Não implementado.

## Como usar

Ao iniciar a execução, o programa irá pedir por um número de comando:

```
Digite o número para executar um comando:
[1] = Adicionar Macro
[2] = Iniciar
```

### Criando Macros

Para criar macros, digite __1__

```
Pressione as teclas da Macro agora:
```

Digite qualquer tecla (algumas não irão funcionar, como Command no MacOs) do teclado, exemplo:

> k
> l
> 1
> SHIFT + k
> CTRL + l

```
Você entrou com a Macro: [SHIFT + k]
Confirma? (s/n) => s
```

Em seguinda informe a periodicidade em segundos a qual a macro será executada, ex: a cada 10 segundos

```
A cada quantos segundos? => 10
> 10
Macro Criada!
{
  "shift": true,
  "ctrl": false,
  "key": "k",
  "seconds": "10",
  "ms": 10000
}
```

Repita este passo para adicionar quantas macros forem necessárias.

### Executando as MacrosK

Para iniciar a execução das macros que você criou, digite __2__.

```
Iniciando as macros ...

(l) será pressionada a cada 3 segundos
(k) será pressionada a cada 10 segundos

Toda as as macros foram inicializadas.
Deixe a janela do Tibia selecionada para que elas tenham efeitos
NÃO FECHE ESTA JANELA!
```

Para parar o programa, pressione `ctrl+c`.
