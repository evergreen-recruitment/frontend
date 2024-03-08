// @ts-nocheck
import p5 from 'p5'

class Particle {
  private vel: any
  private pos: any
  private life: number
  private maxLife: number
  private options: any
  private p: p5

  constructor(p: p5, options: any) {
    this.p = p
    this.options = options
    this.maxLife = this.options.Length
    this.vel = p.createVector(0, 0)
    this.pos = p.createVector(p.random(-50, p.width + 50), p.random(-50, p.height + 50))
    this.life = p.random(0, this.options.Length)
  }

  move(iterations: number) {
    if ((this.life -= 0.01666) < 0) {
      this.respawn()
    }
    while (iterations > 0) {
      const angle =
        this.p.noise(this.pos.x / this.options.noiseScale, this.pos.y / this.options.noiseScale) *
        this.p.TWO_PI *
        this.options.noiseScale
      this.vel.x = this.p.cos(angle)
      this.vel.y = this.p.sin(angle)
      this.vel.mult(0.2)
      this.pos.add(this.vel)
      --iterations
    }
  }

  checkEdge() {
    if (this.pos.x > this.p.width || this.pos.x < 0 || this.pos.y > this.p.height || this.pos.y < 0) {
      this.respawn()
    }
  }

  respawn() {
    this.pos.x = this.p.random(-50, this.p.width + 50)
    this.pos.y = this.p.random(-50, this.p.height + 50)
    this.life = this.maxLife
  }

  display(r: number) {
    this.p.ellipse(this.pos.x, this.pos.y, r, r)
  }
}

export default class PerlinNoise {
  private particles: Particle[] = []
  private maxLife: number
  private options: any
  private dom: HTMLElement | null = document.querySelector('.perlinNoise')
  private timer: any
  private p5: any

  constructor(dom: string, options: any) {
    this.dom = document.querySelector(dom)
    this.options = options
    this.p5 = new p5(this.sketch)
  }

  private sketch = (p: p5) => {
    let backgroundColor: any

    p.setup = () => {
      this.timer && clearInterval(this.timer)
      backgroundColor = p.color(this.options.Background)
      const canvas = p.createCanvas(p.windowWidth, p.windowHeight) as p5.Renderer
      canvas.parent(this.dom as HTMLElement)
      p.background(this.options.Background)
      for (let i = 0; i < this.options.Nums; i++) {
        this.particles[i] = new Particle(p, this.options)
      }

      this.timer = setInterval(() => {
        p.resetParticles()
      }, 60000)
    }

    p.draw = () => {
      p.noStroke()
      p.smooth()

      this.maxLife = this.options.Length
      for (let i = 1; i < this.options.Nums; i++) {
        const iterations = p.map(i, 0, this.options.Nums, 5, 1)
        const radius = this.options.Size

        this.particles[i].move(iterations)
        this.particles[i].checkEdge()

        const alpha = 255
        let particleColor
        let fadeRatio
        fadeRatio = p.min((this.particles[i].life * 5) / this.maxLife, 1)
        fadeRatio = p.min(((this.maxLife - this.particles[i].life) * 5) / this.maxLife, fadeRatio)
        const lifeRatioGrayscale = p.min(255, (255 * this.particles[i].life) / this.maxLife + p.red(backgroundColor))

        if (this.options.ColorMode === 'Normal') {
          if (i % 3 === 0) {
            particleColor = this.options.Color1
          }
          if (i % 3 === 1) {
            particleColor = this.options.Color2
          }
          if (i % 3 === 2) {
            particleColor = this.options.Color3
          }
        }

        if (this.options.ColorMode === 'Linear Gradient') {
          const percent1 = p.norm(this.particles[i].pos.x, 0, p.width / 2)
          const percent2 = p.norm(this.particles[i].pos.x, p.width / 2, p.width)
          const from = p.color(this.options.Color1)
          const middle = p.color(this.options.Color2)
          const to = p.color(this.options.Color3)
          const between1 = p.lerpColor(from, middle, percent1)
          const between2 = p.lerpColor(middle, to, percent2)

          if (this.particles[i].pos.x > 0 && this.particles[i].pos.x < p.width / 2) {
            particleColor = between1
          } else {
            particleColor = between2
          }
        }

        if (this.options.ColorMode === 'Radial Gradient') {
          const distance = p.dist(this.particles[i].pos.x, this.particles[i].pos.y, p.width / 2, p.height / 2)
          const percent1 = p.norm(distance, 0, 400)
          const percent2 = p.norm(distance, 400, p.width / 2)
          const from = p.color(this.options.Color1)
          const middle = p.color(this.options.Color2)
          const to = p.color(this.options.Color3)
          const between1 = p.lerpColor(from, middle, percent1)
          const between2 = p.lerpColor(middle, to, percent2)

          if (distance < 400) {
            particleColor = between1
          } else {
            particleColor = between2
          }
        }

        if (this.options.ColorMode === 'Splice') {
          if (this.particles[i].pos.x >= p.width / 3 && this.particles[i].pos.x <= (p.width / 3) * 2) {
            if (i % 3 === 0) {
              particleColor = this.options.Color1
            }
            if (i % 3 === 1) {
              particleColor = this.options.Color2
            }
            if (i % 3 === 2) {
              particleColor = this.options.Color3
            }
          } else if (this.particles[i].pos.x < p.width / 3) {
            if (i % 3 === 0) {
              particleColor = p.color(20)
            }
            if (i % 3 === 1) {
              particleColor = p.color(100)
            }
            if (i % 3 === 2) {
              particleColor = p.color(220)
            }
          } else if (this.particles[i].pos.x > (p.width / 3) * 2) {
            if (i % 3 === 0) {
              particleColor = p.color(
                255 - p.red(this.options.Color1),
                255 - p.green(this.options.Color1),
                255 - p.blue(this.options.Color1),
              )
            }
            if (i % 3 === 1) {
              particleColor = p.color(
                255 - p.red(this.options.Color2),
                255 - p.green(this.options.Color2),
                255 - p.blue(this.options.Color2),
              )
            }
            if (i % 3 === 2) {
              particleColor = p.color(
                255 - p.red(this.options.Color3),
                255 - p.green(this.options.Color3),
                255 - p.blue(this.options.Color3),
              )
            }
          }
        }

        p.fill(p.red(particleColor), p.green(particleColor), p.blue(particleColor), alpha * fadeRatio)
        this.particles[i].display(radius)
      }
    }

    p.resetParticles = () => {
      for (let i = 0; i < this.options.Nums; i++) {
        this.particles[i].respawn()
        this.particles[i].life = p.random(0, this.maxLife)
      }
      p.resizeCanvas(p.windowWidth, p.windowHeight)
      p.background(this.options.Background)
    }
    p.windowResized = () => {
      p.resetParticles()
    }
  }
}
