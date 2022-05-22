abstract class Parser {
  protected _buffer: Buffer;
  protected _position: number;
  protected _size: number;

  constructor(buffer: Buffer) {
    this._buffer = buffer;
    this._size = buffer.length;
    this._position = 0;
  }

  protected readInt() {
    return this._buffer[this._position++];
  }

  protected readString() {
    if (this._position > this._size) {
      return '';
    }

    let result = '';

    const length = this._buffer[this._position];

    for (let index = 1; index < length; index++) {
      const charCode = this._buffer[this._position + index];
      result += String.fromCharCode(charCode);
    }

    this._position += length;

    return result;
  }

  protected seek(position: number) {
    if (position > this._size) {
      return false;
    }

    this._position = position;

    return true;
  }

  abstract parse(): any;
}

export default Parser;
