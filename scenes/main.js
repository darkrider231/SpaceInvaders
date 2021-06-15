const MOVE_SPEED = 200
const BULLET_SPEED = 400
const TIME_LEFT = 40
const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 100

layer(['obj', 'ui'], 'obj')

addLevel([



  '*********************&',
  '!^^^^^^^^^^          &',
  '!^^^^^^^^^^          &',
  '!^^^^^^^^^^          &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
  '!                    &',
], {
  width: 30,
  height: 22,
  '^' : [ sprite('space-invader1'), scale(1.5), 'space-invader1'],
  '*' : [ sprite('wall'), 'left-wall'],
  '!' : [ sprite('wall'), 'left-wall', solid()],
  '&' : [ sprite('wall'), 'right-wall', solid()],
})

const player = add([
  sprite('space-ship'),
  pos(width() / 5, height() / 1.7),
  origin('center')
])

collides('player', 'left-wall,', (p, w) => {
  if (p.pos.x <= w){
    p.move == 0
  }
})

collides('player', 'right-wall', (p, w) => {
  player.move(0, 0)
})

keyDown('left', () => {
  player.move(-MOVE_SPEED, 0)
})

keyDown('right', () => {
  player.move(MOVE_SPEED, 0)
})

function spawnBullet(p) {
  add([
    rect(6,18), 
    pos(p), 
    origin('center'), 
    color(0.5, 0.5, 1),
    'bullet'
    ])
}

keyPress('space', () => {
  spawnBullet(player.pos.add(0, -25))
})

action('bullet', (b) => {
  b.move(0, -BULLET_SPEED)
  if (b.pos.y < 0){
    destroy(b)
  }
})

collides('bullet', 'space-invader1', (b, s) => {
  camShake(4)
  destroy(b)
  destroy(s)
  score.value++
  score.text = 'Score: ' + score.value
})

const title = add([
  text('Space Invaders'),
  color(1,6,0),
  pos(700,20),
  layer('ui'),
  scale(2)
])

const score = add([
  text('Score: ' + '0'),
  color(1, 0, 0),
  pos(700, 50),
  layer('ui'),
  scale(3),
  {
    value: 0,
  }
])

const timer = add([
  text('Time Left: ' + '0'),
  color(1, 0, 0),
  pos(700,90),
  scale(2),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])

timer.action(() => {
  timer.time -= dt()
  timer.text = 'Time Left: ' + timer.time.toFixed(0)

  if (timer.time <= 0){
     go('lose', { score: score.value  })
  }
})

const instructions = add([
  text('Instructions ' + '\n' + 'Left and Right arrows to move' + '\n' + 'left or right.' + '\n' + 'Spacebar to shoot'),
  pos(700, 140),
  color(0,0,1),
  scale(1)
])

action('space-invader1', (s) => {
  s.move(CURRENT_SPEED, 0)
})

collides('space-invader1', 'right-wall', () => {
  CURRENT_SPEED = -INVADER_SPEED
  every('space-invader1', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

collides('space-invader1', 'left-wall', () => {
  CURRENT_SPEED = INVADER_SPEED
  every('space-invader1', (s) => {
    s.move(0, LEVEL_DOWN)
  })
})

player.overlaps('space-invader1', () => {
  go('lose', { score: score.value  })
})

action('space-invader1', (s) => {
  if (s.pos.y >= (12 * 22)) {
  //if (s.pos.y >= height() / 2) {
     go('lose', { score: score.value  })
  }
})

action('space-invader1', (s) => {
  if(s.value <= 0){
    go('win', { score: score.value })
  }
})