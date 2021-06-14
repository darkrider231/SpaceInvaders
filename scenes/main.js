const MOVE_SPEED = 200

layer(['obj', 'ui'], 'obj')

addLevel([
  '!^^^^^^^^^^     &',
  '!^^^^^^^^^^     &',
  '!^^^^^^^^^^     &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
  '!               &',
], {
  width: 30,
  height: 22,
  '^' : [ sprite('space-invader1'), scale(1.5), 'space-invader1'],
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

const score = add([
  text('Score: ' + '0'),
  pos(550, 50),
  layer('ui'),
  scale(3),
  {
    value: 0,
  }
])

// const TIME_LEFT = 100

// const timer = add([
//   text('Time Left: ' + '0'),
//   pos(550,90),
//   scale(2),
//   layer('ui'),
//   {
//     time: TIME_LEFT,
//   },
// ])

// timer.action(() => {
//   timer.time -= dt()
//   timer.text = 'Time Left: ' + timer.time.toFixed(0)

//   if (timer.time <= 0){
//      go('lose', { score: score.value  })
//   }
// })

const INVADER_SPEED = 100
let CURRENT_SPEED = INVADER_SPEED
const LEVEL_DOWN = 100

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
     go('lose', { score: 'Final Score: ' + '\n' + score.value  })
  }
})