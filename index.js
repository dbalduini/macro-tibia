'use strict'

const robot = require('robotjs')
const readline = require('readline')
const inSeconds = (ms) => ms * 1000
// const inMinutes = (ms) => inSeconds(ms) * 60
const macros = []

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.emitKeypressEvents(process.stdin)
// process.stdin.setRawMode(true);

function printHelp () {
  console.log()
  console.log('Digite o número para executar um comando:')
  console.log('[1] = Adicionar Macro')
  console.log('[2] = Iniciar')
  rl.prompt()
}

printHelp()

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

function createNewMacro (macro) {
  let modified = []

  if (macro.shift) {
    modified.push('shift')
  }

  if (macro.ctrl) {
    modified.push('ctrl')
  }

  macro.ms = inSeconds(macro.seconds)

  macro.keyTap = function () {
    console.log('Pressionando [' + macro.key + ']')
    robot.keyTap(macro.key, modified)
  }

  console.log('Macro Criada!')
  console.log(JSON.stringify(macro, null, 2))
  macros.push(macro)
}

function askDuration (robotKey) {
  rl.question('A cada quantos segundos? => ', (seconds) => {
    console.log('>', seconds)
    robotKey.seconds = seconds
    createNewMacro(robotKey)
    printHelp()
  })
}

function askConfirmation (robotKey) {
  let question = 'Você entrou com a Macro: ['

  if (robotKey.shift) {
    question += 'SHIFT + '
  } else if (robotKey.ctrl) {
    question += 'CTRL + '
  }
  question += robotKey.key + ']\nConfirma? (s/n) => '

  rl.question(question, (answer) => {
    if (answer.toUpperCase() === 'S') {
      askDuration(robotKey)
    } else {
      console.log('Negado, a macro não será criada!')
      printHelp()
    }
  })
}

function parseKeypressed (str, key) {
  let robotKey = {}
  let name = key ? key.name : str

  if (typeof key === 'object') {
    robotKey.shift = key.shift
    robotKey.ctrl = key.ctrl
  }

  if (name === 'return') {
    name = 'enter'
  }

  robotKey.key = name

  return robotKey
}

function readNewMacro (input) {
  console.log('Pressione as teclas da Macro agora:')
  process.stdin.once('keypress', (str, key) => {
    rl.prompt()
    rl.clearLine()
    askConfirmation(parseKeypressed(str, key))
  })
}

function start () {
  console.log('Iniciando as macros ...\n')

  if (macros.length === 0) {
    console.log('Nenhuma macro para inicializar. Tchau!')
    return
  }

  macros.forEach((macro) => {
    console.log(`(${macro.key}) será pressionada a cada ${macro.time} segundos`)
    setInterval(macro.keyTap, macro.ms)
  })

  console.log()
  console.log('Toda as as macros foram inicializadas.')
  console.log('Deixe a janela do Tibia selecionada para que elas tenham efeitos')
  console.log('NÃO FECHE ESTA JANELA!')
}
