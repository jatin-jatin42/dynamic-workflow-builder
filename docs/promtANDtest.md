
### Step 1: Node Abstraction

**Prompt to give the agent:**

> "Review the 4 existing nodes in `/frontend/src/nodes`. Refactor them to use a single, unified `BaseNode` abstraction component to eliminate boilerplate code. Once refactored, generate 5 new custom nodes (e.g., Filter, API, Timer, Math, and Logger) using this new `BaseNode` abstraction. Ensure all nodes integrate seamlessly with the existing Zustand store and React Flow canvas."

**How to verify:**

1. Run `npm start`.
2. Open the browser and check if the toolbar displays all 9 nodes (4 original + 5 new).
3. Drag and drop every single node onto the canvas.
4. Connect the handles of different nodes together.
5. Open the browser's Developer Tools (F12) -> Console. Ensure there are zero React warnings or errors when dragging or connecting them.

### Step 2: UI & Styling

**Prompt to give the agent:**

> "Implement a modern, highly attractive, and clean UI design for the entire application. Apply a cohesive dark-mode or sleek SaaS aesthetic to the canvas, toolbar, nodes, and submit button. Ensure all interactive elements have distinct hover, focus, and disabled states. The nodes should look professional and unified."

**How to verify:**

1. Visually inspect the canvas. The nodes should no longer look like raw HTML elements.
2. Hover over the nodes, toolbar items, and the submit button to check for interactive feedback (color changes, shadows).
3. Verify that the input/output handles (the little dots) are perfectly aligned with their respective labels and are easy to click.

### Step 3: Text Node Logic

**Prompt to give the agent:**

> "Update the `textNode` component to include two features: 1) The textarea must dynamically resize its width and height as the user types so a scrollbar is not needed. 2) Parse the text input for variables enclosed in double curly brackets (e.g., `{{ variableName }}`). For every valid JavaScript identifier found inside brackets, dynamically generate a new input Handle on the left side of the node. Ensure duplicate variables only create one handle, and handles disappear immediately if the variable is deleted from the text."

**How to verify:**

1. Drag a Text Node onto the canvas.
2. Type a very long paragraph. The node and text area should expand automatically to fit the text.
3. Type `Hello {{ user }}`. A handle labeled 'user' should immediately appear on the left.
4. Add `{{ data }}`. A second handle should appear.
5. Add `{{ user }}` again. No new handle should appear (testing deduplication).
6. Type `{{ 123invalid }}`. No handle should appear (testing JS identifier rules).
7. Delete `{{ user }}` from the text. The 'user' handle should disappear.

### Step 4: Backend Integration & DAG Check

**Prompt to give the agent:**

> "First, update the Python FastAPI backend in `/backend/main.py`. The `/pipelines/parse` endpoint must accept the nodes and edges payload, calculate `num_nodes` and `num_edges`, and use a topological sort or DFS algorithm to determine if the graph is a Directed Acyclic Graph (`is_dag`). Second, update the React frontend in `/frontend/src/submit.js` to send a POST request with the React Flow state to this endpoint when 'Submit' is clicked. Display the returned JSON values in a cleanly styled, user-friendly alert or modal."

**How to verify:**

1. **Isolate the Python Logic:** Since the backend is FastAPI, navigate to `http://localhost:8000/docs` in your browser. Use the interactive Swagger UI to send a test JSON payload of nodes and edges to the `/pipelines/parse` endpoint to ensure the Python code executes correctly and returns the expected JSON structure.
2. **Test Frontend Connection:** Go back to the React app (`http://localhost:3000`). Drag three nodes onto the canvas.
3. **Test Acyclic Graph (DAG = True):** Connect Node A -> Node B -> Node C. Click Submit. The alert should show: `Nodes: 3, Edges: 2, Is DAG: True`.
4. **Test Cyclic Graph (DAG = False):** Connect Node C back to Node A to create a loop. Click Submit. The alert should show: `Nodes: 3, Edges: 3, Is DAG: False`.