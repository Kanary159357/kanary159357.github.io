---
title: "Why useRef has different types?"
description: "Let's figure out why useRef has several types in types/react"
pubDate: "Dec 12 2023"
---

## What is useRef?

## useRef's types

When examining the type definition of React's useRef, you may notice several function overloads for useRef.

[Look at @types/react](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/0928217380812c4b25ee324405e347fb6506eaa1/types/react/index.d.ts#L1067)

```typescript
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```

The first one is quite straightforward: the type is set as the initial value.

But why are the following two types present?

```typescript
function useRef<T>(initialValue: T | null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```

Let's understand what RefObject and MutableRefObject are.

## `RefObject`and `MutableRefObject`

```typescript
interface MutableRefObject<T> {
  current: T;
}
interface RefObject<T> {
  readonly current: T | null;
}
```

`MutableRefObject` is an object with a `current` property of generic type `T`.

`RefObject` contains readonly nullable `current` property

So, we can deduce that:

```typescript
const refA = useRef<string>(null);
//    typeof refA = { current: readonly string|null}
const refB = useRef<string | null>(null);
//    typeof refB = { current: string| null }
```

`RefObject` is the return type of createRef (initially), used for handling DOM elements in class components.

[Refer to the old docs for legacy use of createRef](https://ko.legacy.reactjs.org/docs/refs-and-the-dom.html)

Initially, when called, it is null; after being attached to an element, its type becomes that of the attached element, e.g., `<HTMLElement | null>`.

It should not be changed by user after attachment, hence the `readonly` property.

## After introducing Hook API in React 16

With the introduction of the Hook API in React 16, useRef gained more uses than createRef, which was primarily for attaching elements. It is now also used for handling values between re-renders.

![Image showing useRef use cases](/src/content/blog/images/why_use_ref/more_ref.png)

The type definition with `RefObject` might have been designed to retain the createRef type for attaching DOM elements, aiding in migration.

Additional types was for general uses.

# Let's check PR

This is my hypothesis. Now, let's review the PR where the useRef type was first introduced:

[First PR](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/30057)

![Image from the first PR](/src/content/blog/images/why_use_ref/first_pr.png)

We can observe that useRef<T>(initialValue: T | null) was introduced to handle ref in React.

In the first PR introducing useRef, there were no types for function useRef<T = undefined>(): MutableRefObject<T | undefined>;.

This type was introduced in a later [PR](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/33220), which added support for cases using undefined in useState, useRef, useMemo.
