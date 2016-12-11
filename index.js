const say = require('say')
const readline = require('readline')
const stdin = process.stdin
stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')

let currentWord = ''
let talking = false

stdin.on('data', key => {
  // ctrl-c
  if (key === '\u0003') {
    process.exit()
  }

  process.stdout.write(key)

  if (key === '\u007f') { // delete key
    readline.moveCursor(process.stdout, -1)
    readline.clearLine(process.stdout, 1)
    currentWord = currentWord.slice(0, -1)
  } else {
    currentWord += key
  }

  if(key === ' ') {
    if (currentWord && !talking) {
      talking = true
      say.speak(currentWord, null, null, err => {
        if (err) {
          console.error(err)
        }
        talking = false
        if(currentWord.endsWith(' ')){
          say.speak(currentWord)
          currentWord = ''
        }
      })
      currentWord = ''
    }
  }
})
