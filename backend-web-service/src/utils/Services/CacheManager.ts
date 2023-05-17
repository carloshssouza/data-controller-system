class CacheManager {
  private cache: Map<string, any>

  constructor () {
    this.cache = new Map<string, any>()
  }

  set (key: string, value: any): void {
    this.cache.set(key, value)
  }

  get (key: string): any {
    return this.cache.get(key)
  }

  delete (key: string): void {
    this.cache.delete(key)
  }

  clear (): void {
    this.cache.clear()
  }

  has (key: string): boolean {
    return this.cache.has(key)
  }

  getSize (): number {
    return this.cache.size
  }

  getKeys (): string[] {
    return Array.from(this.cache.keys())
  }

  getValues (): any[] {
    return Array.from(this.cache.values())
  }
}

export default new CacheManager()
