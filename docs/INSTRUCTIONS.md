# VectorShift — Frontend Technical Assessment

> **Single Source of Truth** — this document supersedes `assessment.txt` and `Task.md`.

Thank you for taking the time to interview with us at VectorShift! As part of the interview process, we would like you to complete a frontend technical assessment. You can find all files necessary for the assignment in the `/frontend/src` and `/backend` folders. Feel free to make any changes to the provided files, including adding new files, deleting existing files, installing new packages, and modifying any provided code.

**Tech Stack Requirements:**

| Layer    | Stack                |
| -------- | -------------------- |
| Frontend | JavaScript / React   |
| Backend  | Python / FastAPI     |

The assessment consists of **four parts** detailed below. Read all parts before starting so you can plan your approach holistically.

---

## Getting Started

### Frontend

```bash
cd frontend
npm i
npm start
```

The React app runs on `http://localhost:3000` by default.

### Backend

```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

The FastAPI server runs on `http://localhost:8000` by default. Interactive docs are available at `http://localhost:8000/docs`.

### Questions

Reach out to **recruiting@vectorshift.ai** for any clarifications.

---

## Project Structure (Starter Code)

```
dynamic-workflow-builder/
├── backend/
│   └── main.py                 # FastAPI app — /pipelines/parse endpoint
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js              # Root component
│       ├── index.js            # React entry point
│       ├── index.css           # Global styles
│       ├── store.js            # Zustand state management (nodes, edges)
│       ├── ui.js               # React Flow canvas / pipeline builder
│       ├── toolbar.js          # Node palette / toolbar
│       ├── draggableNode.js    # Draggable node component for toolbar
│       ├── submit.js           # Submit button component
│       └── nodes/
│           ├── inputNode.js    # Input node
│           ├── outputNode.js   # Output node
│           ├── llmNode.js      # LLM node
│           └── textNode.js     # Text node
└── docs/
    └── INSTRUCTIONS.md         # ← You are here
```

---

## Part 1: Node Abstraction

### Context

In `/frontend/src/nodes`, there are four node files (`inputNode.js`, `outputNode.js`, `llmNode.js`, `textNode.js`). Each node has different text, content, and input/output connections (called **Handles**), but shares a significant amount of boilerplate code (wrapper `<div>`, handle positioning, label rendering, etc.).

Currently, creating a new node means copying an existing file and modifying it — this doesn't scale as the node count grows.

### Task

1. **Create a reusable node abstraction** (e.g., a `BaseNode` component or a node factory/config pattern) that extracts all shared logic and styling into a single, maintainable place.
2. **Demonstrate the abstraction** by building **5 new custom nodes** of your choosing using it.

### Acceptance Criteria

- [ ] A shared component/abstraction exists that all nodes (old + new) consume.
- [ ] Adding a new node requires minimal boilerplate — ideally just a config object or a small wrapper.
- [ ] The 4 original nodes (`Input`, `Output`, `LLM`, `Text`) are refactored to use the new abstraction.
- [ ] 5 new nodes are added. Examples you could consider:
  - **Filter Node** — filter data by condition
  - **API Node** — HTTP request configuration
  - **Timer / Delay Node** — add a delay in a pipeline
  - **Conditional / If-Else Node** — branch logic
  - **Math / Transform Node** — apply a transformation
  - **Database Node** — query a data source
  - **Notification Node** — send alerts / emails
  - **Merge Node** — combine multiple inputs
  - **Logger Node** — log data to console
  - **Custom Function Node** — user-defined JS function

> **Tip:** Don't over-engineer the node _behavior_ — focus on demonstrating the **flexibility and efficiency** of your abstraction pattern.

---

## Part 2: Styling

### Context

The starter code ships with minimal CSS. The pipeline builder should feel polished and professional.

### Task

Style all components (toolbar, canvas, nodes, submit button, etc.) into an **appealing, unified design**.

### Guidelines

- You may use VectorShift's production UI as inspiration, or create your own design language.
- Any React CSS library/framework is allowed (CSS Modules, styled-components, Tailwind, Chakra UI, etc.).
- Aim for a **dark-mode** or **modern SaaS-style** aesthetic.
- Ensure a consistent color palette, typography, spacing, and hover/focus states.

### Acceptance Criteria

- [ ] All nodes share a cohesive visual style.
- [ ] The toolbar/node palette is visually distinct and intuitive.
- [ ] The canvas area is clean with visible grid/dots.
- [ ] The submit button has clear interactive states (hover, active, disabled).
- [ ] The overall UI feels professional — not "default React."

---

## Part 3: Text Node Logic

### Context

The Text node in `/frontend/src/nodes/textNode.js` has a basic text input field. It needs two functional enhancements.

### Task

#### 3A — Dynamic Resizing

The Text node's width and height should **grow/shrink automatically** as the user types more or less text, so the full content remains visible without scrolling.

#### 3B — Variable Parsing (Dynamic Handles)

Allow users to define **template variables** inside the text input using double curly bracket syntax:

```
Hello, {{ name }}! Your order {{ orderId }} is ready.
```

**Rules:**

- A variable is any valid JavaScript identifier wrapped in `{{ }}`.
- Valid JS identifiers: start with a letter, `_`, or `$`; followed by letters, digits, `_`, or `$`.
  - ✅ `{{ input }}`, `{{ my_var }}`, `{{ $data }}`, `{{ _private }}`
  - ❌ `{{ 123 }}`, `{{ my-var }}`, `{{ hello world }}`
- For each unique, valid variable detected, a **new input Handle** should appear on the **left side** of the Text node.
- Handles should update dynamically — added when a variable appears, removed when it's deleted.
- Duplicate variable names should result in only **one** Handle.

### Acceptance Criteria

- [ ] Text node resizes dynamically as content grows/shrinks.
- [ ] Valid `{{ variableName }}` patterns generate left-side input Handles.
- [ ] Invalid patterns are silently ignored (no errors, no Handles).
- [ ] Removing a variable from the text removes its corresponding Handle.
- [ ] Duplicate variables produce only one Handle.

> **Reference:** Try using a [VectorShift Text node](https://vectorshift.ai) or watch VectorShift tutorials to see the expected behavior.

---

## Part 4: Backend Integration

### Context

The `/backend/main.py` file contains a minimal FastAPI server with a `/pipelines/parse` endpoint. The `/frontend/src/submit.js` file has a submit button that currently does nothing meaningful.

### Task

Build a full-stack integration so that clicking **Submit** sends the current pipeline to the backend for analysis.

#### 4A — Frontend (`/frontend/src/submit.js`)

- On button click, collect all **nodes** and **edges** from the React Flow state (via Zustand store).
- Send them as a `POST` request to `http://localhost:8000/pipelines/parse`.
- Handle loading, success, and error states.

#### 4B — Backend (`/backend/main.py`)

- Accept the nodes and edges in the request body.
- Calculate:
  - `num_nodes` — total number of nodes in the pipeline.
  - `num_edges` — total number of edges (connections) in the pipeline.
  - `is_dag` — whether the graph formed by the nodes and edges is a **Directed Acyclic Graph** (DAG).
- Return the response in the following JSON format:

```json
{
  "num_nodes": 5,
  "num_edges": 4,
  "is_dag": true
}
```

> **Hint for DAG check:** You can use topological sort, DFS cycle detection, or Python's `networkx` library.

#### 4C — User Alert

- When the frontend receives the backend response, display a **user-friendly alert** (modal, toast, or inline notification) showing:
  - Number of nodes
  - Number of edges
  - Whether the pipeline is a DAG (with clear ✅ / ❌ indicator)

### Acceptance Criteria

- [ ] Clicking Submit sends the current pipeline (nodes + edges) to the backend.
- [ ] The backend correctly returns `num_nodes`, `num_edges`, and `is_dag`.
- [ ] The DAG check is correct (returns `false` for cyclic graphs, `true` for acyclic).
- [ ] A styled alert/notification displays the results to the user.
- [ ] CORS is configured so frontend ↔ backend communication works seamlessly.

---

## Summary Checklist

| Part | Deliverable                              | Status |
| ---- | ---------------------------------------- | ------ |
| 1    | Node abstraction + 5 new nodes          | ⬜     |
| 2    | Polished, unified UI styling            | ⬜     |
| 3A   | Text node dynamic resizing              | ⬜     |
| 3B   | Text node variable parsing + Handles    | ⬜     |
| 4A   | Frontend submit → backend POST          | ⬜     |
| 4B   | Backend DAG analysis endpoint           | ⬜     |
| 4C   | User-friendly result alert              | ⬜     |

---

## Evaluation Notes

- **Code quality** matters — clean, readable, well-structured code.
- **Abstraction design** is the core of Part 1 — show that adding new nodes is trivial.
- **Visual polish** is explicitly evaluated — don't submit raw/unstyled components.
- **Correctness** of the DAG check and variable parsing will be tested.
- **User experience** — the final product should feel like a real tool, not a prototype.

---

*Last updated: May 2026*
