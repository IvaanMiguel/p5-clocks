export const midpointCircle = (p5, xc, yc, r) => {
  const mirrorPoint = (x, y) => {
    p5.point(xc + x, yc + y)
    p5.point(xc - x, yc + y)
    p5.point(xc + x, yc - y)
    p5.point(xc - x, yc - y)
    p5.point(xc + y, yc + x)
    p5.point(xc - y, yc + x)
    p5.point(xc + y, yc - x)
    p5.point(xc - y, yc - x)
  }

  let x = 0
  let y = r
  let p = 1 - r

  mirrorPoint(x, y)

  while (x < y) {
    x += 1

    if (p < 1) {
      p = p + (2 * x) + 1
    } else {
      y -= 1
      p = p + 2 * (x - y) + 1
    }

    mirrorPoint(x, y)
  }
}

export const pointSlopeLine = (p5, x0, y0, x1, y1) => {
  const dx = x1 - x0
  const dy = y1 - y0
  let m, b

  if (dx !== 0) {
    m = dy / dx
    b = y1 - (m * x1)
  }

  const drawLine = (x0, y0, x1, y1) => {
    let x = x0
    let y = y0
    let prevY

    while (x <= x1) {
      prevY = y
      y = dx !== 0 ? p5.round((m * x) + b) : y1

      p5.point(x, y)

      let middleY = y
      const yStep = y0 < y1 ? -1 : 1
      const dMiddleY = p5.abs(middleY - prevY)

      for (let _ = 0; _ < dMiddleY; _++) {
        p5.point(x, middleY)
        middleY += yStep
      }

      x++
    }
  }

  dx < 0 ? drawLine(x1, y1, x0, y0) : drawLine(x0, y0, x1, y1)
}

export const ddaLine = (p5, x0, y0, x1, y1) => {
  const deltaX = x1 - x0
  const deltaY = y1 - y0

  if (deltaX === 0) {
    if (y0 > y1) {
      for (let y = y0; y >= y1; y--) {
        p5.point(x0, y)
      }
    } else {
      for (let y = y0; y <= y1; y++) {
        p5.point(x0, y)
      }
    }
    return
  }

  const m = deltaY / deltaX

  if (m <= 1) {
    let y = y0

    if (x0 > x1) {
      for (let x = x0; x >= x1; x--) {
        p5.point(x, y)
        y = y - m
      }
    } else {
      for (let x = x0; x < x1; x++) {
        p5.point(x, y)
        y = y + m
      }
    }
  } else {
    let x = x0

    if (y0 > y1) {
      for (let y = y0; y >= y1; y--) {
        p5.point(x, y)
        x = x - (1 / m)
      }
    } else {
      for (let y = y0; y < y1; y++) {
        p5.point(x, y)
        x = x + (1 / m)
      }
    }
  }
}

export const bresenhamLine = (p5, x0, y0, x1, y1) => {
  const dxAbs = p5.abs(x1 - x0)
  const dyAbs = p5.abs(y1 - y0)
  const xStep = x1 < x0 ? -1 : 1
  const yStep = y1 < y0 ? -1 : 1

  let x = x0
  let y = y0

  if (dxAbs > dyAbs) {
    let p = 2 * dyAbs - dxAbs

    for (let i = 0; i <= dxAbs; i++) {
      p5.point(x, y)

      if (p < 0) {
        x += xStep
        p += 2 * dyAbs
      } else {
        x += xStep
        y += yStep
        p += 2 * (dyAbs - dxAbs)
      }
    }
  } else {
    let p = 2 * dxAbs - dyAbs

    for (let i = 0; i <= dyAbs; i++) {
      p5.point(x, y)

      if (p < 0) {
        y += yStep
        p += 2 * dxAbs
      } else {
        x += xStep
        y += yStep
        p += 2 * (dxAbs - dyAbs)
      }
    }
  }
}
