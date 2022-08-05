import { format } from './formatHex';

abstract class Parser {
  protected buffer: Buffer;

  protected position: number;

  abstract parse(): any;

  abstract readString(): string;

  constructor(buffer: Buffer) {
    this.buffer = buffer;
    this.position = 0;
  }

  protected read(length: number = 1) {
    let result = '';

    for (let index = 0; index < length; index += 1) {
      const charCode = this.buffer[this.position + index];
      result += format(charCode);
    }

    this.position += length;

    if (result.length === 0) return 0;

    return parseInt(result, 16);
  }

  protected step(count: number) {
    return (this.position + count) <= this.buffer.length;
  }

  protected seek(position: number) {
    if (position >= this.buffer.length) {
      return false;
    }

    this.position = position;

    return true;
  }
}

export default Parser;
