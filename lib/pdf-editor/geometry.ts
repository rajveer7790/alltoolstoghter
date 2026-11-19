export type Matrix = [number, number, number, number, number, number];
export type Point = { x: number; y: number };
export type Box = Point & { width: number; height: number };
export const transform = (m: Matrix, p: Point): Point => ({ x: m[0] * p.x + m[2] * p.y + m[4], y: m[1] * p.x + m[3] * p.y + m[5] });
export function inverse(m: Matrix): Matrix {
  const determinant = m[0] * m[3] - m[1] * m[2];
  if (!Number.isFinite(determinant) || Math.abs(determinant) < 1e-8) throw new Error('This page has an unsupported coordinate system.');
  return [m[3] / determinant, -m[1] / determinant, -m[2] / determinant, m[0] / determinant, (m[2] * m[5] - m[3] * m[4]) / determinant, (m[1] * m[4] - m[0] * m[5]) / determinant];
}
export function boxFromPoints(points: Point[]): Box {
  const left = Math.min(...points.map(p => p.x)), top = Math.min(...points.map(p => p.y));
  return { x: left, y: top, width: Math.max(...points.map(p => p.x)) - left, height: Math.max(...points.map(p => p.y)) - top };
}
export function placedMatrix(view: Matrix, x: number, y: number): Matrix {
  const inv = inverse(view), origin = transform(inv, { x, y });
  return [inv[0], inv[1], -inv[2], -inv[3], origin.x, origin.y];
}
