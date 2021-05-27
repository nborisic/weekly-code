function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

function getAngle (x1, y1, x2, y2) {
  return Math.atan2(y2-y1,x2-x1);
}


function canvasArrow(context, fromx, fromy, tox, toy) {
  var headlen = 10; 
  var dx = tox - fromx;
  var dy = toy - fromy;
  var angle = Math.atan2(dy, dx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
  context.moveTo(tox, toy);
  context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}
  
  module.exports = { randomIntFromRange, randomColor, distance, getAngle, canvasArrow }