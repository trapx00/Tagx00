export function getCursorPosition(canvas: HTMLCanvasElement, e, scale: number) {
  const {top, left} = canvas.getBoundingClientRect();

  const point = e.changedTouches ? e.changedTouches[0] : e;
  console.log(e.changedTouches);

  return {
    x: Math.trunc((point.clientX - left)/scale),
    y: Math.trunc((point.clientY - top)/scale)
  };
}
