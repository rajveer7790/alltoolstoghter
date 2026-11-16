/**
 * Minimal persistent key-value store backed by a JSON file, with an in-memory cache.
 * Dependency-free and portable. For production scale, swap this module for
 * Redis, Cloudflare KV, or Postgres — the interface (get/set/all) stays the same.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'node:fs';
import { dirname } from 'node:path';

export class JsonStore {
  constructor(file) {
    this.file = file;
    this.cache = new Map();
    mkdirSync(dirname(file), { recursive: true });
    if (existsSync(file)) {
      this.cache = new Map(Object.entries(JSON.parse(readFileSync(file, 'utf8'))));
    }
  }
  get(key) { return this.cache.get(key) ?? null; }
  has(key) { return this.cache.has(key); }
  set(key, value) { const previous=this.cache.get(key), existed=this.cache.has(key); this.cache.set(key,value); try { this._flush(); } catch (error) { if(existed)this.cache.set(key,previous);else this.cache.delete(key);throw error; } }
  all() { return Object.fromEntries(this.cache); }
  _flush() {
    const temporary=this.file+'.tmp';
    writeFileSync(temporary, JSON.stringify(this.all(), null, 2));
    renameSync(temporary,this.file);
  }
}
