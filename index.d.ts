type Autocomplete<T extends string> = T | (string & {})
type Truthy<T> = Exclude<T, undefined | null | ''>
interface BooleanConstructor {
  <T>(b: T): b is Truthy<T>
}

interface ObjectConstructor {
  keys<T> (obj: T): Array<keyof T>
  values<T> (obj: T): Array<T[keyof T]>
  entries<T> (obj: T): Array<[keyof T, T[keyof T]]>
  fromEntries<T, U> (entries: Array<[T, U]>): Record<T, U>
}

interface String {
  toLowerCase<T extends string> (this: T): Lowercase<T>
  toUpperCse<T extends string> (this: T): Uppercase<T>
}

// This is so cursed
// This allows for narrowing in the event of string literals but also doesn't `never` a string in the event of a string[]
interface Array<T> {
  includes (searchElement: any, fromIndex?: number): searchElement is (string extends T ? `${any}` : T)
}
interface ReadonlyArray<T> {
  includes (searchElement: any, fromIndex?: number): searchElement is (string extends T ? `${any}` : T)
}

type StrictObject<T, U extends T, V = {}> = {
  [K in keyof U]: K extends keyof V
    ? U[K]
    : K extends keyof T
      ? T[K] extends object
          ? StrictObject<T[K], U[K]>
          : U[K]
      : never
}

var Boolean: BooleanConstructor
var Object: ObjectConstructor

type Span = [start: number, end: number]

type Writeable<T> = { -readonly [P in keyof T]: T[P] extends object ? Writeable<T[P]> : T[P] }
type Compute<T> = { [K in keyof T]: T[K] extends object ? Compute<T[K]> : T[K] } & {}
