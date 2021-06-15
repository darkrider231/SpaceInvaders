add([
  text('GAME OVER!'),
  color(1, 0, 0),
  origin('center'),
  scale(7),
  pos(width() / 2, height() / 3),
])

add([
  text('Final Score: ' + '\n' + args.score),
  color(0, 0, 1),
  origin('center'),
  scale(7),
  pos(width() / 2, height() / 2),
  
])