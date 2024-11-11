# Items

Count: 6

## Item 1: Stmt 0, `Normal`

```js
await Promise.resolve();

```

- Side effects

## Item 2: Stmt 1, `VarDeclarator(0)`

```js
export const effects = [];

```

- Declares: `effects`
- Write: `effects`

## Item 3: Stmt 2, `Normal`

```js
export function effect(name) {
    effects.push(name);
}

```

- Hoisted
- Declares: `effect`
- Reads (eventual): `effects`
- Write: `effect`
- Write (eventual): `effects`

# Phase 1
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item4;
    Item4["ModuleEvaluation"];
    Item5;
    Item5["export effects"];
    Item6;
    Item6["export effect"];
```
# Phase 2
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item4;
    Item4["ModuleEvaluation"];
    Item5;
    Item5["export effects"];
    Item6;
    Item6["export effect"];
    Item5 --> Item2;
    Item6 --> Item3;
```
# Phase 3
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item4;
    Item4["ModuleEvaluation"];
    Item5;
    Item5["export effects"];
    Item6;
    Item6["export effect"];
    Item5 --> Item2;
    Item6 --> Item3;
    Item3 --> Item2;
    Item3 -.-> Item5;
```
# Phase 4
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item4;
    Item4["ModuleEvaluation"];
    Item5;
    Item5["export effects"];
    Item6;
    Item6["export effect"];
    Item5 --> Item2;
    Item6 --> Item3;
    Item3 --> Item2;
    Item3 -.-> Item5;
    Item4 --> Item1;
```
# Final
```mermaid
graph TD
    N0["Items: [ItemId(ModuleEvaluation)]"];
    N1["Items: [ItemId(Export((&quot;effect&quot;, #2), &quot;effect&quot;))]"];
    N2["Items: [ItemId(1, VarDeclarator(0))]"];
    N3["Items: [ItemId(0, Normal)]"];
    N4["Items: [ItemId(2, Normal)]"];
    N5["Items: [ItemId(Export((&quot;effects&quot;, #2), &quot;effects&quot;))]"];
    N1 --> N2;
```
# Entrypoints

```
{
    ModuleEvaluation: 0,
    Export(
        "effect",
    ): 1,
    Exports: 6,
    Export(
        "effects",
    ): 5,
}
```


# Modules (dev)
## Part 0
```js
"module evaluation";

```
## Part 1
```js
import { a as effect } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: -4
};
import "__TURBOPACK_PART__" assert {
    __turbopack_part__: 2
};
export { effect };

```
## Part 2
```js
const effects = [];
export { effects as b } from "__TURBOPACK_VAR__" assert {
    __turbopack_var__: true
};

```
## Part 3
```js
await Promise.resolve();

```
## Part 4
```js
import { b as effects } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: -2
};
function effect(name) {
    effects.push(name);
}
export { effect as a } from "__TURBOPACK_VAR__" assert {
    __turbopack_var__: true
};

```
## Part 5
```js
import { b as effects } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: -2
};
export { effects };

```
## Part 6
```js
export { effect } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: "export effect"
};
export { effects } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: "export effects"
};

```
## Merged (module eval)
```js
"module evaluation";

```
# Entrypoints

```
{
    ModuleEvaluation: 0,
    Export(
        "effect",
    ): 1,
    Exports: 6,
    Export(
        "effects",
    ): 2,
}
```


# Modules (prod)
## Part 0
```js
"module evaluation";

```
## Part 1
```js
import { a as effect } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: -5
};
import "__TURBOPACK_PART__" assert {
    __turbopack_part__: 3
};
export { effect };

```
## Part 2
```js
import { b as effects } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: -3
};
export { effects };

```
## Part 3
```js
const effects = [];
export { effects as b } from "__TURBOPACK_VAR__" assert {
    __turbopack_var__: true
};

```
## Part 4
```js
await Promise.resolve();

```
## Part 5
```js
import { b as effects } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: -3
};
function effect(name) {
    effects.push(name);
}
export { effect as a } from "__TURBOPACK_VAR__" assert {
    __turbopack_var__: true
};

```
## Part 6
```js
export { effect } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: "export effect"
};
export { effects } from "__TURBOPACK_PART__" assert {
    __turbopack_part__: "export effects"
};

```
## Merged (module eval)
```js
"module evaluation";

```
