/*
 * Integrantes:
 * Núñez Romero Marielena
 * Domínguez Cota Miguel Iván
 */

import Clock from './Clock.class.js'
import { bresenhamLine, ddaLine, pointSlopeLine } from './utils.js'

const localClock = new Clock(300, 400, 200, { hrs: 23, min: 59, sec: 59 }, pointSlopeLine, 'B. C. S.')
const mexicoClock = new Clock(800, 400, 200, { hrs: 0, min: 59, sec: 59 }, ddaLine, 'CDMX')
const barcelonaClock = new Clock(1300, 400, 200, { hrs: 8, min: 59, sec: 59 }, bresenhamLine, 'Barcelona')

const input = document.getElementById('input-time')
const button = document.getElementById('update-time')

let seconds = 0

button.addEventListener('click', () => {
  const formatHour = (hrs) => hrs >= 24 ? hrs % 24 : hrs

  const inputTime = input.value.split(':')

  localClock.time = {
    hrs: +inputTime[0],
    min: inputTime[1],
    sec: inputTime[2]
  }
  mexicoClock.time = {
    hrs: formatHour(+inputTime[0] + 1),
    min: inputTime[1],
    sec: inputTime[2]
  }
  barcelonaClock.time = {
    hrs: formatHour(+inputTime[0] + 9),
    min: inputTime[1],
    sec: inputTime[2]
  }
})

const sketch = p5 => {
  let timeElapsed = 0

  p5.setup = () => {
    p5.createCanvas(1600, 800)

    localClock.calculateCoords(p5)
    mexicoClock.calculateCoords(p5)
    barcelonaClock.calculateCoords(p5)
  }

  p5.draw = () => {
    timeElapsed += p5.deltaTime

    p5.background('white')

    localClock.update(p5, seconds)
    mexicoClock.update(p5, seconds)
    barcelonaClock.update(p5, seconds)

    localClock.draw(p5)
    mexicoClock.draw(p5)
    barcelonaClock.draw(p5)

    seconds = (timeElapsed - (timeElapsed % 1000)) / 1000
  }
}

new p5(sketch)
