import { bresenhamLine, midpointCircle } from './utils.js'

export default class Clock {
  secondHandLength
  minuteHandLength
  hourHandLength
  currentSecond = 0
  markCoords = []

  constructor(x, y, r, time, drawingLineFunction, text) {
    this.x = x
    this.y = y
    this.r = r
    this.time = time
    this.drawingLineFunction = drawingLineFunction
    this.text = text

    this.secondHandLength = this.r * .8
    this.minuteHandLength = this.r * .6
    this.hourHandLength = this.r * .4
  }

  draw(p5) {
    p5.strokeWeight(5)
    p5.stroke('black')

    midpointCircle(p5, this.x, this.y, this.r)

    this.drawClockMarks(p5)

    p5.strokeWeight(5)
    p5.stroke('red')
    this.drawClockHand(p5, this.secondHandLength, this.time.sec)

    p5.stroke('blue')
    this.drawClockHand(p5, this.minuteHandLength, this.time.min)

    p5.stroke('green')
    this.drawClockHand(p5, this.hourHandLength, this.time.hrs, 12)

    this.drawText(p5)
  }

  update(p5, sec) {
    if (this.currentSecond === sec) return

    this.currentSecond = sec
    this.time.sec++

    const hours = this.time.hrs * 3600
    const minutes = this.time.min * 60
    const timestamp = hours + minutes + this.time.sec

    this.time.hrs = p5.floor(timestamp / 3600)
    this.time.min = p5.floor((timestamp % 3600) / 60)
    this.time.sec = timestamp % 60

    if (this.time.hrs >= 24) this.time.hrs = this.time.hrs % 24
  }

  drawClockHand(p5, length, clockHandTime, gaps = 60) {
    const angle = 360 / gaps * clockHandTime
    const { x, y } = this.getCartesianCoords(p5, length, angle)

    this.drawingLineFunction(p5, this.x, this.y, y + this.x, -x + this.y)
  }

  drawText(p5) {
    p5.stroke('none')
    p5.fill('black')

    p5.textSize(28)
    p5.textAlign(p5.CENTER)
    p5.text(
      `${this.text}\n${this.time.hrs.toString().padStart(2, '0')}:${this.time.min.toString().padStart(2, '0')}:${this.time.sec.toString().padStart(2, '0')}`,
      this.x, this.y + this.r + 40
    )
  }

  drawClockMarks(p5) {
    p5.stroke('black')

    for (let i = 0; i < 60; i++) {
      const strokeWeight = (i % 5 === 0) ? 6 : 2

      p5.strokeWeight(strokeWeight)
      /*
       * Tuvimos que usar la función line de p5 para dibujar los detalles del reloj
       * porque al utilizar nuestras implementaciones el dibujado se ralentizaba mucho.
       * Todo el resto de líneas en el reloj sí fueron dibujadas con nuestros algoritmos
       * y el código funciona perfectamente sin este método de la clase.
       */
      p5.line(this.x, this.y, this.markCoords[i].x, this.markCoords[i].y)
    }

    // Necesitábamos dibujar un círculo que se rellenara, el nuestro no puede hacer eso :(.
    p5.stroke('none')
    p5.fill('white')
    p5.ellipseMode(p5.RADIUS)
    p5.circle(this.x, this.y, this.r * 0.85)
  }

  getCartesianCoords(p5, r, angle) {
    const radians = p5.radians(angle)

    return {
      x: p5.round(r * p5.cos(radians), 3),
      y: p5.round(r * p5.sin(radians), 3)
    }
  }

  calculateCoords(p5) {
    for (let i = 0; i < 60; i++) {
      const angle = 360 / 60 * i

      const { x, y } = this.getCartesianCoords(p5, this.r, angle)

      this.markCoords.push({
        x: y + this.x,
        y: (-x) + this.y
      })
    }
  }
}
