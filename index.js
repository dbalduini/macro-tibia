'use strict'

const readline = require('readline')
const Macro = require('./macro')

const macros = []

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.emitKeypressEvents(process.stdin)
// process.stdin.setRawMode(true);

main()

function main () {
  console.log('Programa iniciado em:', new Date())
  console.log('Para sair a qualquer momento, pressione (Ctrl+C)')
  startReadlineEventListeners()
  printHelp()
}

function startReadlineEventListeners () {
  rl.on('line', (line) => {
    let input = line.trim()
    console.log(`Selecionado [${input}]`)
    if (input === '2') {
      start()
    }
    if (input === '1') {
      readNewMacro(input)
    }
  })

  rl.on('SIGINT', shutdown)
}

function printHelp () {
  console.log('\nDigite o número para executar um comando:')
  console.log('[1] = Adicionar Macro')
  console.log('[2] = Iniciar')
  rl.prompt()
}

function readNewMacro (input) {
  console.log('Pressione as teclas da Macro agora:')
  process.stdin.once('keypress', (str, key) => {
    rl.prompt()
    rl.clearLine()
    const macro = Macro.fromKeypressed(str, key)
    askConfirmation(macro)
  })
}

function askConfirmation (macro) {
  let question = 'Você entrou com a Macro: '

  question += macro.prettify() + '\n'
  question += 'Confirma? (s/n) => '

  rl.question(question, (answer) => {
    if (answer.toUpperCase() === 'S') {
      askDuration(macro)
    } else {
      failMacro()
    }
  })
}

function askDuration (macro) {
  rl.question('A cada quantos segundos? => ', (seconds) => {
    console.log('>', seconds)
    if (seconds < 1) {
      failMacro('Impossível criar macro menor que 1 segundo!')
    } else {
      macro.registerKeyTapInterval(seconds)
      macros.push(macro)
      console.log('Macro Criada!')
      console.log(macro.prettify(), 'a cada', macro.seconds, 'segundos')
    }
    printHelp()
  })
}

function failMacro (err) {
  console.log('\nA macro não será criada!')
  if (err) {
    console.error(err);
  }
  printHelp()
}

function start () {
  console.log('Iniciando as macros ...\n')

  rl.pause()
  if (macros.length === 0) {
    console.log('Nenhuma macro para inicializar. Tchau!')
    process.exit(0)
  }

  macros.forEach((macro) => {
    macro.start()
  })

  console.log('\n=================================================================')
  console.log('Toda as as macros foram inicializadas.')
  console.log('Deixe a janela do Tibia selecionada para que elas tenham efeitos.')
  console.log('NÃO FECHE ESTA JANELA!')
  console.log('Pressione (Ctrl+C) para terminar o programa.')
  console.log('=================================================================\n')

  rl.clearLine()
  rl.close()

  process.on('SIGINT', shutdown)
}

// Gracefull shutdown
function shutdown() {
  console.log("\nTerminando o programa agora, aguarde...\n")

  if (macros.length === 0) {
    process.exit(0)
  }

  macros.forEach(macro => {
    console.log('Cancelando macro:', macro.prettify())
    macro.stop()
  })
}
