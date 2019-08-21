/**
 * An iterable data buffer. Ideal for parsing text data or tokens.
 * Works with any array-like data.
 * @export
 * @class Buffer
 * @template T
 */
export declare class Buffer<T> {
    private __pos;
    private __data;
    private __saved;
    /**
     * Creates an instance of Buffer.
     * @param  {ArrayLike<T>} data
     * @memberof Buffer
     */
    constructor(data: ArrayLike<T>);
    /**
     * The length of the buffer
     * @readonly
     * @type number
     * @memberof Buffer
     */
    readonly length: number;
    /**
     * The value at the current position
     * @readonly
     * @type (T | undefined)
     * @memberof Buffer
     */
    readonly current: T | undefined;
    /**
     * The next value
     * @readonly
     * @type (T | undefined)
     * @memberof Buffer
     */
    readonly next: T | undefined;
    /**
     * The previous read value
     * @readonly
     * @type (T | undefined)
     * @memberof Buffer
     */
    readonly prev: T | undefined;
    /**
     * Verify if there is a value to read at the current position
     * @readonly
     * @memberof Buffer
     */
    readonly hasCurrent: boolean;
    /**
     * Verify if there is a value to read at the next position
     * @readonly
     * @type boolean
     * @memberof Buffer
     */
    readonly hasNext: boolean;
    /**
     * Verify if there is a value to read at the previous position
     * @readonly
     * @type boolean
     * @memberof Buffer
     */
    readonly hasPrev: boolean;
    /**
     * The current position number
     * @readonly
     * @type number
     * @memberof Buffer
     */
    readonly position: number;
    /**
     * Change the current position number to [pos]
     * Values bigger than the buffer legth or less than 0 will be forced to stay in the range
     * @param  {number} [pos]
     * @return {void}@memberof Buffer
     */
    seek(pos?: number): void;
    /**
     * Consume the value at the current position and move [count] times
     * Negative values are accepted and move backwards instead
     * @param  {number} [count]
     * @return {void}@memberof Buffer
     */
    consume(count?: number): void;
    /**
     * Move to the next position and then return the value
     * @return (T | undefined)
     * @memberof Buffer
     */
    toNext(): T | undefined;
    /**
     * Move to the previous position and then return the value
     * @return (T | undefined)
     * @memberof Buffer
     */
    toPrev(): T | undefined;
    /**
     * Save the current position for later
     * Saved positions are stored in stack
     * @return {void}@memberof Buffer
     */
    save(): void;
    /**
     * Remove the latest saved position from the stack
     * @return {void}@memberof Buffer
     */
    drop(): void;
    /**
     * Restore to the latest saved position
     * The position is removed from the stack
     * @return {void}@memberof Buffer
     */
    restore(): void;
    /**
     * Return to the starting position of the buffer
     * @return {void}@memberof Buffer
     */
    rewind(): void;
    /**
     * Iterate the buffer until it reaches its end
     *
     * If the buffer does not change it is position inside the callback
     * this.consume will be called to ensure an infinite loop is not created by mistake
     * @param  {((next: T, pos: number) => void)} callback
     * @return this
     * @memberof Buffer
     */
    forEach(callback: ((next: T, pos: number) => void)): this;
    /**
     * Iterate from the current position untill [filter] return false
     * or there is no data to process anymore
     * @param  {((next: T, pos: number) => boolean)} filter
     * @return this
     * @memberof Buffer
     */
    iterate(filter: ((next: T, pos: number) => boolean)): this;
    /**
     * Iterate from the current position untill [filter] return false
     * or there is no data to process anymore
     * Return the iterated data
     * @param  {((next: T, pos: number) => boolean)} filter
     * @return T[]
     * @memberof Buffer
     */
    extract(filter: ((next: T, pos: number) => boolean)): T[];
    /**
     * Returns the value at position [pos]
     * If mode is 'relative' it is considered from the current position instead of 0
     * Negative values are accepted in the 'relative' mode
     * In the 'absolute' mode negative values will always yield undefined
     * @param  {number} pos
     * @param  {('absolute' | 'relative')} [access]
     * @return T | undefined
     * @memberof Buffer
     */
    at(pos: number, mode?: 'absolute' | 'relative'): T | undefined;
    toArray(): T[];
    /**
     * Return the string representation of the data
     * @return string
     * @memberof Buffer
     */
    toString(): string;
    /**
     * Join the data into a string using the separator [sep]
     * @param  {string} sep
     * @return string
     * @memberof Buffer
     */
    join(sep: string): string;
}
