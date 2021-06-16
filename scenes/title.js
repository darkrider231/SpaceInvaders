const title1 = add([
  text('SPACE'),
  color(1,0,0),
  pos(300,20),
  scale(10)
])

const title2 = add([
  text('Invaders!'),
  color(1,1,0),
  pos(140,100),
  scale(10)
])

const title3 = add([
  text('Press ENTER to start game'),
  color(5,2,5),
  pos(300, 250),
  scale(2)
])

const footer1 = add([
  text('Edited by: Grant Patterson'),
  color(0, 0, 3),
  pos(400, 400),
  scale(1)
])



keyDown('enter', () => {
  go('main')
})
