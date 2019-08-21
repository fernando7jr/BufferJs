/**
 * An iterable data buffer. Ideal for parsing text data or tokens.
 * Works with any array-like data.
 * @export
 * @class Buffer
 * @template T 
 */
export class Buffer<T> {
    private __pos = 0;
    private __data: ArrayLike<T>;
    private __saved: number[] = [];

    /**
     * Creates an instance of Buffer.
     * @param  {ArrayLike<T>} data 
     * @memberof Buffer
     */
    constructor(data: ArrayLike<T>) {
        this.__data = data;
    }

    /**
     * The length of the buffer
     * @readonly
     * @type number
     * @memberof Buffer
     */
    get length(): number {
        return this.__data.length;
    }

    /**
     * The value at the current position
     * @readonly
     * @type (T | undefined)
     * @memberof Buffer
     */
    get current(): T | undefined {
        return this.__data[this.__pos];
    }

    /**
     * The next value
     * @readonly
     * @type (T | undefined)
     * @memberof Buffer
     */
    get next(): T | undefined {
        return this.__data[this.__pos + 1];
    }

    /**
     * The previous read value
     * @readonly
     * @type (T | undefined)
     * @memberof Buffer
     */
    get prev(): T | undefined {
        return this.__data[this.__pos - 1];
    }

    /**
     * Verify if there is a value to read at the current position
     * @readonly
     * @memberof Buffer
     */
    get hasCurrent() {
        return !!this.current;
    }

    /**
     * Verify if there is a value to read at the next position
     * @readonly
     * @type boolean
     * @memberof Buffer
     */
    get hasNext(): boolean {
        return !!this.next;
    }

    /**
     * Verify if there is a value to read at the previous position
     * @readonly
     * @type boolean
     * @memberof Buffer
     */
    get hasPrev(): boolean {
        return !!this.prev;
    }

    /**
     * The current position number
     * @readonly
     * @type number
     * @memberof Buffer
     */
    get position(): number {
        return this.__pos;
    }

    /**
     * Change the current position number to pos
     * Values bigger than the buffer legth or less than 0 will be forced to stay in the range
     * @param  {number} [pos] 
     * @return {void}@memberof Buffer
     */
    seek(pos?: number): void {
        this.__pos = Math.min(Math.max(pos || 0, 0), this.length);
    }

    /**
     * Consume the value at the current position and move count times
     * Negative values are accepted and move backwards instead
     * @param  {number} [count] 
     * @return {void}@memberof Buffer
     */
    consume(count?: number): void {
        count = count === undefined || count === null ? 1 : count;
        this.seek(this.__pos + count);
    }

    /**
     * Move to the next position and then return the value
     * @return (T | undefined) 
     * @memberof Buffer
     */
    toNext(): T | undefined {
        this.consume();
        return this.current;
    }

    /**
     * Move to the previous position and then return the value
     * @return (T | undefined) 
     * @memberof Buffer
     */
    toPrev(): T | undefined {
        this.consume(-1);
        return this.current;
    }

    /**
     * Save the current position for later
     * Saved positions are stored in stack
     * @return {void}@memberof Buffer
     */
    save(): void {
        this.__saved.push(this.__pos);
    }

    /**
     * Remove the latest saved position from the stack
     * @return {void}@memberof Buffer
     */
    drop(): void {
        this.__saved.pop();
    }

    /**
     * Restore to the latest saved position
     * The position is removed from the stack
     * @return {void}@memberof Buffer
     */
    restore(): void {
        this.seek(this.__saved.pop());
    }

    /**
     * Return to the starting position of the buffer
     * @return {void}@memberof Buffer
     */
    rewind(): void {
        this.seek(0);
    }

    /**
     * Iterate the buffer until it reaches its end
     * 
     * If the buffer does not change it is position inside the callback
     * this.consume will be called to ensure an infinite loop is not created by mistake
     * @param  {((next: T, pos: number) => void)} callback 
     * @return this 
     * @memberof Buffer
     */
    forEach(callback: ((next: T, pos: number) => void)): this {
        while (this.hasCurrent) {
            const pos = this.__pos;
            callback(<T>this.current, pos);
            if (pos === this.__pos) {
                this.consume();
            }
        }
        return this;
    }

    /**
     * Iterate from the current position untill filter return false
     * or there is no data to process anymore
     * @param  {((next: T, pos: number) => boolean)} filter 
     * @return this 
     * @memberof Buffer
     */
    iterate(filter: ((next: T, pos: number) => boolean)): this {
        let pos = 0;
        while (this.current && filter(this.current, pos)) {
            pos += 1;
            this.consume(1);
        }
        return this;
    }

    /**
     * Iterate from the current position untill filter return false
     * or there is no data to process anymore
     * Return the iterated data
     * @param  {((next: T, pos: number) => boolean)} filter 
     * @return T[] 
     * @memberof Buffer
     */
    extract(filter: ((next: T, pos: number) => boolean)): T[] {
        const __arr: T[] = [];
        this.iterate((next, pos) => {
            const result = filter(next, pos);
            if (!result) {
                return false;
            }
            __arr.push(next);
            return true;
        });
        return __arr;
    }

    /**
     * Returns the value at position pos
     * If mode is 'relative' it is considered from the current position instead of 0
     * Negative values are accepted in the 'relative' mode
     * In the 'absolute' mode negative values will always yield undefined
     * @param  {number} pos 
     * @param  {('absolute' | 'relative')} [access] 
     * @return T | undefined
     * @memberof Buffer
     */
    at(pos: number, mode?: 'absolute' | 'relative'): T | undefined {
        mode = mode || 'absolute';
        const posModifier = mode === 'relative' ? this.__pos : 0;
        return this.__data[pos + posModifier];
    }

    toArray(): T[] {
        return Array.from(this.__data)
    }

    /**
     * Return the string representation of the data
     * @return string 
     * @memberof Buffer
     */
    toString(): string {
        return this.toArray().toString();
    }

    /**
     * Join the data into a string using the separator sep
     * @param  {string} sep 
     * @return string 
     * @memberof Buffer
     */
    join(sep: string): string {
        return this.toArray().join(sep);
    }
}
