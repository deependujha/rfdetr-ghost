![rfdetr-ghost](https://raw.githubusercontent.com/deependujha/rfdetr-ghost/refs/heads/main/assets/header.png)

---

# **`rfdetr-ghost`**: A drop-in performance optimization layer for RF-DETR

**rfdetr-ghost** is a drop-in performance optimization layer for [RF-DETR](https://github.com/roboflow/rf-detr).

The goal is simple: **make RF-DETR significantly faster without requiring users to change their code or learn new APIs.**

Users replace:

```python
from rfdetr import ...
```

with:

```python
from rfdetr_ghost import ...
```

Everything else stays the same — models, APIs, training/inference code, and workflow.

Under the hood, Ghost patches and replaces performance-critical paths with **custom fused CUDA/Triton kernels** and other GPU-level optimizations, targeting things like kernel launch overhead, memory movement, and inefficient intermediate operations.

### Core idea

> **One import change. Same API. Faster execution.**

The project targets **up to ~5× speedup (80% less execution time)** on supported workloads, with actual gains depending on the GPU, model, batch size, and operation.

The deeper goal is to demonstrate that significant low-level GPU optimization can be packaged behind a familiar high-level API — allowing existing RF-DETR users to benefit from optimized kernels **out of the box, with zero migration effort.**

### Project positioning

**RF-DETR:**
`Python API → GPU`

**RF-DETR Ghost:**
`Same Python API → Ghost optimization layer → custom fused kernels → GPU`

Ghost is inspired by the idea of being **invisible to the application but highly visible in the benchmark.**
