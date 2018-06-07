export function getCursorPosition(canvas: HTMLCanvasElement, e, scale: number) {
  disableTouchScroll(e);
  const {top, left} = canvas.getBoundingClientRect();

  const point = e.changedTouches ? e.changedTouches : e;

  return {
    x: Math.trunc((point.clientX - left)/scale),
    y: Math.trunc((point.clientY - top)/scale)
  };
}

export function disableTouchScroll(e) {
  if (e.changedTouches) {
    console.log("executed");
    e.preventDefault();
  }
}
