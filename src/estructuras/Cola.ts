export class Cola<T> {
  #items: T[] = [];
  #frente = 0;

  encolar(x: T): void {
    this.#items.push(x);
  }

  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const valor = this.#items[this.#frente];
    this.#frente += 1;

    if (this.#frente > 10 && this.#frente * 2 > this.#items.length) {
      this.#compactar();
    }

    return valor;
  }

  frente(): T | undefined {
    return this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.#frente >= this.#items.length;
  }

  get tamanio(): number {
    return this.#items.length - this.#frente;
  }

  aArray(): T[] {
    return this.#items.slice(this.#frente);
  }

  #compactar(): void {
    this.#items = this.#items.slice(this.#frente);
    this.#frente = 0;
  }
}