<div style="align-center">

# Employee Task Tracker

Modern employee-facing task manager built with React, Vite, and Tailwind CSS. The UI ships with dashboard analytics, rich task CRUD, search + sort, toast notifications, and dark‑mode theming while persisting everything to localStorage (bonus requirement).

<table>
  <tr>
    <td><img src="/assets/light.png" width="400"></td>
    <td><img src="/assets/dark.png" width="400"></td>
  </tr>
</table>

</div>

<br>

## 🌟 Highlights
- Dashboard cards with completion rate progress and KPI chips
- Employee task boards with priority, due date, and description badges
- Create, edit, delete, and cycle task status with confirmation modals
- Global search, status filter, and multi-field sorting (title, status, priority, due date, employee)
- Dark mode toggle with persisted preference
- Toast feedback, empty states, and micro-interactions for every action
- 100% frontend using mock JSON + localStorage persistence

<br>

## 🧰 Tech Stack
- **React 18** + **Vite 5** (Lightning-fast dev/build tooling)
- **Tailwind CSS 3** (Utility-first styling)
- **Boxicons** (Iconography)
- **localStorage** (Bonus persistence requirement)

<br>

## ✅ Verification
Project was installed and compiled locally to confirm all workflows:
```bash
npm install
npm run build
```
`npm run build` (Vite) completed successfully on Nov 27, 2025. See `dist/` for output. Two moderate `npm audit` advisories remain (tooling deps); no runtime packages are affected.

<br>

## 🚀 Getting Started
```bash
git clone https://github.com/jayadeep8712/Employee_Task_Tracker.git
cd employee-task-tracker
npm install

# start dev server (http://localhost:5173)
npm run dev

# production build / preview
npm run build
npm run preview
```

> Node.js 16+ (or 18+) recommended. Tailwind’s JIT and Vite HMR expect modern browsers.

<br>

## 📂 Project Structure
```
src/
├── components/
│   ├── AddTask.jsx            # Rich task creation form
│   ├── Dashboard.jsx          # KPI + progress bar
│   ├── DarkModeToggle.jsx     # Floating theme switcher
│   ├── DeleteConfirmModal.jsx # Confirmation modal
│   ├── EmployeeList.jsx       # Task boards with actions
│   ├── Modal.jsx              # Reusable modal shell
│   ├── SortOptions.jsx        # Sorting control group
│   ├── TaskEditModal.jsx      # Task edit dialog
│   ├── TaskFilter.jsx         # Status filter chips
│   ├── TaskSearch.jsx         # Global search input
│   ├── Toast.jsx              # Toast atom
│   └── ToastContainer.jsx     # Toast portal
├── data/mockData.json         # Seed employees/tasks
├── utils/localStorage.js      # Load/save helpers
├── App.jsx                    # Feature orchestration
└── index.css                  # Global + dark mode styles
```

<br>

## 💡 Feature Walkthrough

### Dashboard
- Auto-aggregated totals across all employees
- Gradient cards for total/completed/in-progress/pending counts
- Completion percentage bar with animated progress + legend

### Task Management
- Add task form: employee, title, description, status, priority, due date
- Edit modal: inline editing with validation
- Delete modal: confirmation + irreversible warning
- Status cycling button on each card

### Search, Filter & Sort
- Search box filters tasks by title or description (debounced via controlled state)
- Pills for All / Pending / In Progress / Completed
- Sort toolbar toggles field + direction in one click

### Dark Mode & UX polish
- Floating toggle adds `.dark` class (Tailwind dark variant)
- Toast notifications for add/edit/delete/status changes
- Empty states when filters/search yield zero matches
- Hover-activated task actions + micro animations throughout

### Persistence
- Initial data bootstrapped from `mockData.json`
- Every add/edit/delete/status change writes to `localStorage`
- Dark mode preference stored under `darkMode`

<br>

## 🧪 Manual Test Plan (Executed)
| Flow | Result |
| --- | --- |
| `npm install` | ✅ |
| `npm run build` | ✅ (`vite build`) |
| Add → Edit → Delete task | ✅ (state updates + toast) |
| Status cycle | ✅ (Pending → In Progress → Completed) |
| Search/filter/sort combos | ✅ |
| Dark mode toggle persistence | ✅ |

<br>

## 📋 Assumptions & Limitations
1. **Single-user/local**: No authentication or multi-tenant separation.
2. **localStorage-only**: Treat as mock backend; clearing browser storage resets data.
3. **Task IDs**: Generated on the client by incrementing max ID.
4. **No attachments/comments** (documented in roadmap).
5. **Accessibility**: Keyboard focus and ARIA basics included; full WCAG AA pending.

<br>

## 🔮 Roadmap
Future enhancements live in `ENHANCEMENT_ROADMAP.md` (task comments, exports, multi-assign, drag & drop, etc.). `PRODUCTION_FEATURES.md` captures what is already done.

<br>

## 📄 License
Created for the Frontend Web Development assignment. Feel free to adapt or extend for educational or internal use.

<br>

Need help extending this into a full-stack product? Check `ENHANCEMENT_ROADMAP.md` or open an issue. Happy building! 🚀

