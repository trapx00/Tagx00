export function getCursorPosition(canvas: HTMLCanvasElement, e, scale: number) {
  const {top, left} = canvas.getBoundingClientRect();
  return {
    x: Math.trunc((e.clientX - left)/scale),
    y: Math.trunc((e.clientY - top)/scale)
  };
}
