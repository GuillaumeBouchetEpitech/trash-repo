export class CanvasRenderer {
  private _canvas: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;
    this._ctx = this._canvas.getContext('2d')!;
  }

  //

  clear() {
    // this._ctx.clearRect(0,0,800,600);

    this._ctx.fillStyle = 'black';
    this._ctx.fillRect(0, 0, 800, 640);
  }

  //

  drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();
    this._ctx.moveTo(x1, y1);
    this._ctx.lineTo(x2, y2);
    this._ctx.stroke();
  }

  //

  drawThickLine(x1: number, y1: number, x2: number, y2: number, color: string) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 4;
    this._ctx.beginPath();
    this._ctx.moveTo(x1, y1);
    this._ctx.lineTo(x2, y2);
    this._ctx.stroke();
  }

  //

  drawLineStrip(lines: [number, number][], color: string) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();

    this._ctx.moveTo(lines[0][0], lines[0][1]);
    for (var i = 1; i < lines.length; ++i)
      this._ctx.lineTo(lines[i][0], lines[i][1]);

    this._ctx.stroke();
  }

	drawLineLoop(lines: [number, number][], color: string) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();

    this._ctx.moveTo(lines[0][0], lines[0][1]);
    for (var i = 1; i < lines.length; ++i)
      this._ctx.lineTo(lines[i][0], lines[i][1]);
		this._ctx.lineTo(lines[0][0], lines[0][1]);

    this._ctx.stroke();
  }

  //

  drawLines(lines: [[number, number], [number, number]][], color: string) {
    this._ctx.strokeStyle = color;
    this._ctx.lineWidth = 1;
    this._ctx.beginPath();

    for (var i = 0; i < lines.length; ++i) {
      this._ctx.moveTo(lines[i][0][0], lines[i][0][1]);
      this._ctx.lineTo(lines[i][1][0], lines[i][1][1]);
    }

    this._ctx.stroke();
  }

  //

  drawPoint(x: number, y: number, size: number, color: string) {
    this.drawLine(x - size, y - size, x + size, y + size, color);
    this.drawLine(x - size, y + size, x + size, y - size, color);
  }

  //

  drawSquare(x: number, y: number, size: number, color: string) {
    this._ctx.fillStyle = color;
    this._ctx.beginPath();
    this._ctx.rect(x, y, size, size);
    this._ctx.fill();
  }

  //

  drawText(x: number, y: number, text: string, color: string) {
    this._ctx.fillStyle = color;
    this._ctx.font = '15px serif';
    this._ctx.fillText(text, x, y);
  }

  getCanvas() {
    return this._canvas;
  }

  getContext() {
    return this._ctx;
  }
}
