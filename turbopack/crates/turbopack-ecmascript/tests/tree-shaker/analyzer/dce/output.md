# Items

Count: 4

## Item 1: Stmt 0, `ImportOfModule`

```js
import { baz } from './module';

```

- Hoisted
- Side effects

## Item 2: Stmt 0, `ImportBinding(0)`

```js
import { baz } from './module';

```

- Hoisted
- Declares: `baz`

## Item 3: Stmt 1, `Normal`

```js
if (1 + 1 == 3) {
    baz();
}

```

- Side effects
- Reads: `baz`

# Phase 1
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item4;
    Item4["ModuleEvaluation"];
```
# Phase 2
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item4;
    Item4["ModuleEvaluation"];
    Item3 --> Item2;
    Item3 --> Item1;
```
# Phase 3
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item4;
    Item4["ModuleEvaluation"];
    Item3 --> Item2;
    Item3 --> Item1;
```
# Phase 4
```mermaid
graph TD
    Item1;
    Item2;
    Item3;
    Item4;
    Item4["ModuleEvaluation"];
    Item3 --> Item2;
    Item3 --> Item1;
    Item4 --> Item3;
```
# Final
```mermaid
graph TD
    N0["Items: [ItemId(ModuleEvaluation)]"];
    N1["Items: [ItemId(0, ImportOfModule)]"];
    N2["Items: [ItemId(1, Normal)]"];
```
# Entrypoints

```
{
    ModuleEvaluation: 0,
    Exports: 3,
}
```


# Modules (dev)
## Part 0
```js
"module evaluation";

```
## Part 1
```js
import './module';

```
## Part 2
```js
if (1 + 1 == 3) {
    baz();
}

```
## Part 3
```js

```
## Merged (module eval)
```js
"module evaluation";

```
# Entrypoints

```
{
    ModuleEvaluation: 0,
    Exports: 3,
}
```


# Modules (prod)
## Part 0
```js
"module evaluation";

```
## Part 1
```js
import './module';

```
## Part 2
```js
if (1 + 1 == 3) {
    baz();
}

```
## Part 3
```js

```
## Merged (module eval)
```js
"module evaluation";

```
