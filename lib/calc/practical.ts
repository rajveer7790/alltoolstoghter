import { num } from '../format';
import type { CalcResult } from '../types';

type Inputs = Record<string, unknown>;

const invalid = (value: string): CalcResult[] => [{ label: 'Check inputs', value, main: true }];
const positive = (value: unknown): boolean => Number.isFinite(Number(value)) && Number(value) > 0;

const sizeBytes: ReadonlyMap<string, number> = new Map([
  ['MB', 1e6], ['GB', 1e9], ['TB', 1e12], ['MiB', 2 ** 20], ['GiB', 2 ** 30],
]);
const speedBits: ReadonlyMap<string, number> = new Map([
  ['Mbps', 1e6], ['Gbps', 1e9], ['MB/s', 8e6],
]);

export function downloadTime(v: Inputs): CalcResult[] {
  const bytes = sizeBytes.get(String(v.sizeUnit));
  const bitsPerSecond = speedBits.get(String(v.speedUnit));
  if (!bytes || !bitsPerSecond || !positive(v.size) || !positive(v.speed)) {
    return invalid('Enter a positive file size and transfer speed with supported units.');
  }

  const seconds = Number(v.size) * bytes * 8 / (Number(v.speed) * bitsPerSecond);
  if (!Number.isFinite(seconds)) return invalid('Use a smaller file size or a faster transfer speed.');

  const totalSeconds = Math.round(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const duration = seconds < 1
    ? (seconds < 0.001 ? '<1 ms' : `${num(seconds * 1000, 1)} ms`)
    : [hours ? `${num(hours)} hr` : '', minutes ? `${minutes} min` : '', `${totalSeconds % 60} sec`].filter(Boolean).join(' ');
  return [
    { label: 'Estimated transfer time', value: duration, main: true },
    { label: 'Effective speed', value: `${num(Number(v.speed) * bitsPerSecond / 8e6, 4)} MB/s` },
  ];
}

export function pixelDensity(v: Inputs): CalcResult[] {
  const width = Number(v.width), height = Number(v.height);
  if (!Number.isSafeInteger(width) || width < 1 || !Number.isSafeInteger(height) || height < 1 ||
      !positive(v.diagonal) || (v.diagonalUnit !== 'in' && v.diagonalUnit !== 'cm')) {
    return invalid('Enter whole pixel dimensions and a positive screen diagonal.');
  }

  const inches = Number(v.diagonal) / (v.diagonalUnit === 'cm' ? 2.54 : 1);
  const diagonalPixels = Math.hypot(width, height);
  const ppi = diagonalPixels / inches;
  if (!Number.isFinite(ppi) || ppi <= 0) return invalid('Use a screen diagonal within the supported range.');
  return [
    { label: 'Pixel density', value: `${num(ppi, 2)} PPI`, main: true },
    { label: 'Pixel pitch', value: `${num(25.4 / ppi, 4)} mm` },
    { label: 'Screen width × height', value: `${num(width / ppi, 2)} × ${num(height / ppi, 2)} in` },
  ];
}

export function batteryRuntime(v: Inputs): CalcResult[] {
  const usablePercent = Number(v.usablePercent);
  if (!positive(v.capacity) || !positive(v.current) || !positive(v.usablePercent) || usablePercent > 100) {
    return invalid('Enter positive capacity and current and a usable percentage above 0 and at most 100.');
  }

  const usableCapacity = Number(v.capacity) * (usablePercent / 100);
  const hours = usableCapacity / Number(v.current);
  if (!Number.isFinite(hours)) return invalid('Use capacity and current within the supported range.');
  return [
    { label: 'Estimated runtime', value: `${num(hours, 4)} hr`, main: true },
    { label: 'Runtime in days', value: `${num(hours / 24, 4)} days` },
    { label: 'Usable capacity', value: `${num(usableCapacity, 2)} mAh` },
  ];
}
