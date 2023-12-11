---
title: "Why useRef has different types?"
description: "Let's figure out why useRef has several types in types/react"
pubDate: "Dec 12 2023"
---

## What is useRef?

## useRef's types

When you look at React useRef's type definition, you could notice that there are several function overriding for useRef.

[Look at @types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0928217380812c4b25ee324405e347fb6506eaa1/types/react/index.d.ts#L1067)

```
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```

First one is quite obvious. The type is set as initial value.

But why there are below 2 types?

```
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```

Why there `function useRef<T>(initialValue: T | null): RefObject<T>` is `RefObject` and `function useRef<T = undefined>(): MutableRefObject<T | undefined>` is `MutableRefObject`?

Let' see what is `RefObject` and `MutableRefObject` first.

## `RefObject`and `MutableRefObject`

```
interface MutableRefObject<T> {
    current: T;
}

interface RefObject<T> {
    readonly current: T | null;
}
```

Literally, main difference between `MutableRefObject` and `RefObject` is `readOnly` property. You could not reassign the value to current property.

Now we knows that `useRef<T>(initialValue: T | null)` return immutable object, and `useRef<T>(initialValue)`

It's kind of rule to use `useRef<T>(initialValue: T | null)` for getting DOM Element's value with `ref` property.
