const MOVE_SPEED = 200
const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 200
const TIME_LEFT = 30
const BULLET_SPEED = 400

layer(['obj', 'ui'], 'obj')

addLevel([
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &',
  '!^^^^^^^^^^^^    &', 
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
  '!                &',
], {
  width: 30,
  height: 22,
  '^' : [ sprite('space-invader1'), scale(0.7), 'space-invader1'],
  '!' : [ sprite('wall'), 'left-wall'],
  '&' : [ sprite('wall'), 'right-wall'],
})

const player = add([
  sprite('space-ship'),
  pos(width() / 2, height() / 2),
  origin('center')
])

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
  if (b.pos.y < 0) {
    destroy(b)
  }
})

collides('bullet', 'space-invader1', (b,s) => {
  camShake(4)
  destroy(b)
  destroy(s)
  score.value++
  score.text = 'Score: ' + score.value
})

const title = add([
  text('Space' + '\n' + ' Invaders' + '\n' + ' Game'),
  pos(800, 60),
  color(1,3,0),
  origin('center'),
  scale(3),
  layer('ui'),
])

const score = add([
  text('Score: ' + '0'),
  pos(700, 130),
  layer('ui'),
  scale(3),
  {
    value: 0,
  }
])

const timer = add([
  text('0'),
  pos(700,100),
  scale(3),
  layer('ui'),
  {
    time: TIME_LEFT,
  },
])

const instructions = add([
  text('Instructions:' + '\n' + 'Left or Right Arrow to Move' + '\n' + 'Spacebar to shoot'),
  pos(700, 160),
  scale(1),
  color(0,3,0),
  layer('ui')
])


timer.action(() =>  {
  timer.time -= dt()
  timer.text = 'Timer: ' + timer.time.toFixed(0)
  if (timer.time <= 0 ) {
    go('lose', { score: score.value })
  }
})

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
  go('lose', { score: score.value })
})

action('space-invader1', (s) => {
  if (s.pos.y >= (12 * 22)) {
  // if (s.pos.y >= height() /2) {
      go('lose', { score: score.value })
  }
})