# HabitOS — Premium Personal Habit Tracking & Self-Improvement Engine

> **Optimized specifically for MacBook & Laptop workflows**: Native macOS Desktop App styling, Command Palette (`⌘K`), complete keyboard navigation, Web Audio synthesizer haptics, and zero-telemetry local persistence.

---

## ⚡ 1. Product Overview

**HabitOS** is a production-grade personal habit tracking and behavioral analytics operating system designed inspired by the minimalist elegance and density of Linear, Notion, and high-performance analytics dashboards.

Unlike generic checklists or toy habit apps:
- **Real Calculations Only**: Every chart, streak, and score is computed mathematically from saved historical records.
- **Mac / Laptop Optimized**: Features a native macOS window header with interactive traffic lights, collapsible sidebar (`⌘B`), instant Command Palette (`⌘K`), and full keyboard shortcuts (`⌘1`–`⌘8`, `⌘N`, `T`, `[`, `]`).
- **Minimum Viable Habit Fallbacks**: Allows users to log a "Minimum Version" (e.g. reading 1 page instead of 20) on difficult days to prevent breaking streak momentum while honestly distinguishing partial completions from full target completions in analytics.
- **No False Failure Penalties**: Future dates and non-scheduled days are never counted as failures or broken streaks. Unrecorded days are treated distinctly from recorded misses.
- **Privacy First**: 100% client-side persistence in `localStorage` with full JSON & CSV data export and backup restoration.

---

## 🚀 2. Quick Launch & Native macOS Desktop App

### Method A: Native macOS Application Bundle (`HabitOS.app`)
A real macOS `.app` bundle is included in this folder:
- **Direct Launch**: Double-click [`HabitOS.app`](file:///Users/cherishgoyal/Downloads/new2/HabitOS.app) directly in Finder.
- **Copy to Desktop / Dock**: Double-click [`Install_To_Desktop.command`](file:///Users/cherishgoyal/Downloads/new2/Install_To_Desktop.command) to immediately install `HabitOS.app` directly onto your Mac Desktop!

### Method B: One-Click macOS Launcher Script
Double-click [`run_habitos.command`](file:///Users/cherishgoyal/Downloads/new2/run_habitos.command) in macOS Finder, or run in Terminal:
```bash
./run_habitos.command
```
This automatically starts the local server and opens HabitOS in your default browser at `http://localhost:8081/habitos.html` (or `8080`).

### Method C: macOS Internet Shortcut (.webloc)
Double-click [`Launch_HabitOS.webloc`](file:///Users/cherishgoyal/Downloads/new2/Launch_HabitOS.webloc) directly in Finder or Desktop.

### Method D: Progressive Web App (PWA) / Safari Add to Dock
In Google Chrome / Brave, click the **Install HabitOS** icon in the URL bar, or in Safari select **File > Add to Dock** to run HabitOS as a standalone window without browser tabs.

---

## 🔒 3. Privacy Passcode Vault Lock

HabitOS includes a **macOS-style Privacy Lock Screen** with 4-digit PIN protection to keep your personal habits, streaks, and reflections 100% confidential when stepping away from your laptop:
- **Lock Anytime**: Click the 🔒 lock button in the top titlebar or press <kbd>⌘ Cmd</kbd> + <kbd>L</kbd>.
- **Default PIN**: `1234` (You can change this anytime in Settings).
- **Auto-Lock Timeout**: Automatically locks after 1, 5, or 15 minutes of user inactivity (configurable in Settings).
- **Physical Keyboard & On-Screen Keypad**: Type digits `0-9` directly on your Mac keyboard or click the sleek on-screen glassmorphism numpad. Incorrect PIN triggers an Apple-style shake animation and error sound.

---

## ⏰ 4. Hourly Task Reminders

HabitOS features an integrated **Hourly Habit Nudge System**:
- **Dashboard Countdown Strip**: Displays a live countdown on the Home screen (e.g. `Next nudge in ~45m • 3 habit(s) pending`).
- **Periodic Audio Bell Chime**: Plays a pleasant 3-tone harmonic chime (`AudioEngine.playReminderChime()`).
- **Desktop & In-App Notifications**: Alerts you to remaining pending habits for the day so you never lose momentum.
- **Configurable Intervals**: Choose between every 30 minutes, 1 hour (default), or 2 hours in Settings.
- **Test Nudge Button**: Test the chime and notification banner anytime with one click!

---

## ⌨️ 5. Mac & Laptop Keyboard Shortcuts

| Shortcut | Action | Description |
| :--- | :--- | :--- |
| <kbd>⌘ Cmd</kbd> + <kbd>L</kbd> | **Lock Vault** | Locks HabitOS behind the 4-digit privacy passcode |
| <kbd>⌘ Cmd</kbd> + <kbd>K</kbd> | **Command Palette** | Instant search across habits, quick mark actions, and view navigation |
| <kbd>⌘ Cmd</kbd> + <kbd>N</kbd> | **New Habit** | Opens the custom habit creation modal |
| <kbd>⌘ Cmd</kbd> + <kbd>B</kbd> | **Toggle Sidebar** | Smoothly collapses / expands the left navigation drawer |
| <kbd>⌘ Cmd</kbd> + <kbd>1</kbd> | **Dashboard** | Jumps to Today's checklist and progress dial |
| <kbd>⌘ Cmd</kbd> + <kbd>2</kbd> | **Calendar** | Monthly calendar & 52-week contribution matrix |
| <kbd>⌘ Cmd</kbd> + <kbd>3</kbd> | **Analytics** | 10 real data visualizations & charts |
| <kbd>⌘ Cmd</kbd> + <kbd>4</kbd> | **Habits** | Habit management catalogue (active, paused, archived) |
| <kbd>⌘ Cmd</kbd> + <kbd>5</kbd> | **Goals** | Weekly targets, sprint challenges & milestone badges |
| <kbd>⌘ Cmd</kbd> + <kbd>6</kbd> | **Coach** | Smart behavioral insights & weekly retrospective journal |
| <kbd>⌘ Cmd</kbd> + <kbd>7</kbd> | **History** | Searchable audit log table, CSV & JSON export |
| <kbd>⌘ Cmd</kbd> + <kbd>8</kbd> | **Settings** | Light/dark theme, passcode lock, hourly reminder intervals |
| <kbd>T</kbd> | **Jump to Today** | Immediately centers calendar and checklist on today's date |
| <kbd>[</kbd> / <kbd>]</kbd> | **Previous / Next Month** | Step backwards or forwards in the interactive calendar |
| <kbd>ESC</kbd> | **Dismiss Modals** | Closes any active modal dialog or command palette |
| <kbd>?</kbd> | **Shortcuts Cheat Sheet** | Displays the full keyboard shortcut reference modal |

---

## 📊 4. Core Features & 8 Primary Views

### 1. Dashboard (`⌘1`)
- **Dynamic Welcome Section**: Time-of-day greeting, current local date, and rotating stoic & behavioral quotes (Atomic Habits, Marcus Aurelius, Naval Ravikant).
- **Circular SVG Progress Dial**: Shows today's percentage completion, remaining habits, and day-over-day pace comparison against yesterday ("▲ +14% vs yesterday").
- **Compact Habit Checklist**: High-density desktop rows with 3-state completion controls (**✓ Done**, **✕ Missed**, **Not Recorded**), plus **⭐ Mini** fallback button.
- **Bulk Action & Undo**: One-click "Mark All Completed" with instant 5-second undo toast banner.

### 2. Interactive Calendar & 52-Week Matrix (`⌘2`)
- **Monthly Grid View**: Shows each day's completion badge, percentage, and color-coded status dots for scheduled habits.
- **Slide-Over Day Inspector**: Clicking any past date opens a side inspector allowing inspection and retroactive editing of habit statuses and daily notes.
- **52-Week Contribution Matrix**: GitHub/Linear-style rolling 365-day heatmap with a 5-tier intensity scale and rich tooltips showing completed/scheduled ratios.

### 3. Analytics & 10 Data Visualizations (`⌘3`)
Every chart renders via native, lightweight SVG with zero bulky dependencies:
1. **Daily Completion Trend**: Smooth spline curve with area fill and interactive data point tooltips.
2. **Weekly Performance**: Comparative bar chart across past 8 weeks.
3. **Monthly Performance**: Daily rate bars across the current active month.
4. **Habit Category Distribution**: Donut chart breaking down completed instances by category (Health, Learning, Fitness, Productivity, Mindfulness, etc.).
5. **Individual Habit Rankings**: Horizontal comparative bar chart with adherence percentages and current streaks.
6. **Scheduled Outcome Breakdown Donut**: Clearly displays Full Completions, Minimum Fallbacks, Missed, and Unrecorded past days separately.
7. **52-Week Consistency Matrix**: Full rolling calendar heatmap.
8. **Streak Stability Leaderboard**: Compares current active streak vs all-time personal bests.
9. **Weekday Velocity Analysis**: Monday through Sunday comparative performance bars.
10. **Target Adherence & Consistency Score Meter**.

### 4. Habit Architecture & Lifecycle (`⌘4`)
- Create user-defined habits with custom names, reasons/why, categories, emojis, accent colors, measurable targets (e.g., 2.5L, 30 mins, 20 pages), and minimum viable fallback versions.
- Flexible scheduling: Every day, selected weekdays (Mon-Fri), or custom days of the week.
- Habit lifecycle management: **Pause** (suspends schedule without breaking past records), **Archive** (hides from checklist while preserving historical analytics), and **Delete**.

### 5. Goals, Challenges & Milestones (`⌘5`)
- Configurable weekly adherence target slider (50% to 100%).
- Curated challenges: 7-Day Atomic Momentum, 14-Day Morning Mastery, 21-Day Habit Crucible, 30-Day Master Discipline.
- Achievement badges with particle confetti celebrations upon unlocking milestones:
  - 🌱 Spark (3-Day Streak)
  - 🔥 Atomic Momentum (7-Day Streak)
  - ⚡ Habit Crucible (14-Day Streak)
  - 💎 Consistency Master (30-Day Streak)
  - 👑 Century Club (100 Total Completions)
  - 🛡️ Resilience Shield (Streak preserved via Minimum Version)
  - 🎯 Flawless Day (100% on a scheduled day)

### 6. Personal Improvement Coach & Retrospective (`⌘6`)
- **Rule-Based Insights**: Real pattern analysis without false AI claims:
  - Week-over-week velocity changes.
  - Habit stacking pairing suggestions (e.g. "You complete Reading 88% reliably vs Cardio 45%—stack Cardio immediately following Reading").
  - Peak day identification (e.g. "Historically, Wednesday is your highest velocity day at 92%").
  - Slump warnings (habits missed 3+ times recently).
- **Weekly Retrospective Notebook**: Persistent 3-question review journal saved by ISO week (`YYYY-Wxx`):
  1. *What went exceptionally well this week?*
  2. *What was difficult or caused friction?*
  3. *What is my single system improvement for next week?*

### 7. History Log & Data Management (`⌘7`)
- Searchable tabular audit log with live keyword search and outcome filter.
- Inline editing of past records and notes.
- **Export to CSV**: Formatted RFC 4180 CSV with escaped quotes, dates, habit names, categories, and notes.
- **Export to JSON**: Complete structured JSON database backup.
- **Import JSON**: Validated file parser with preview confirmation.
- **Data Reset**: Full wipe with confirmation protection.

### 8. Preferences & Settings (`⌘8`)
- **Theme Switch**: Light theme and sophisticated default Dark theme.
- **Sound Effects**: Web Audio synthesizer haptic feedback (crisp Apple completion tone, soft missed tone, celebratory chord fanfare).
- **Realistic 45-Day Demo Mode**: 1-click button to load realistic 45-day sample history across 6 varied habits, and 1-click button to reset cleanly.

---

## 📐 5. Transparent Mathematical Engine

HabitOS adheres strictly to transparent, documented mathematical formulas:

$$\text{Completion Rate} = \frac{\text{Completed} + \text{Minimum Fallbacks}}{\text{Scheduled Instances with a Recorded Outcome}} \times 100$$

$$\text{Tracking Coverage} = \frac{\text{Recorded Scheduled Instances}}{\text{Total Eligible Past Scheduled Instances}} \times 100$$

$$\text{Consistency Score} = 0.60 \times \text{Completion Rate} + 0.25 \times \text{Tracking Coverage} + 0.15 \times \min\left(100, \frac{\text{Streak Days}}{14} \times 100\right)$$

### Streak Calculation Rules
1. Streaks are calculated per habit using its individual schedule.
2. A missed scheduled day (`status === 'missed'`) breaks the streak.
3. An unrecorded past scheduled day breaks the streak.
4. **Non-scheduled days NEVER break a streak** (e.g. a weekday habit scheduled Mon-Fri preserves its streak over Saturday and Sunday).
5. **Minimum Version completions preserve the streak**.
6. **Today's Status**: If today is scheduled and completed, it is included in the streak. If today is scheduled and not yet recorded, the active streak from yesterday carries over until the end of the day.
7. Future days are strictly excluded from all performance calculations.

---

## 🧪 6. Automated Verification Test Suite

HabitOS includes an automated Python test suite verifying streak algorithms, edge cases, formulas, CSV escaping, and assets:

```bash
python3 test_habitos_full.py
```

Output:
```
.....
----------------------------------------------------------------------
Ran 5 tests in 0.001s

OK
```

---

## 📁 7. File Structure

```
new2/
├── habitos.html             # Main desktop web app (HTML5 / macOS window frame)
├── habitos_app.js           # Core reactive engine, math formulas, charts, audio
├── habitos_style.css        # Design system, dark/light theme, typography, glassmorphism
├── run_habitos.command      # Executable macOS launcher script
├── Launch_HabitOS.webloc     # macOS internet shortcut
├── server.py                # Local development HTTP server (ports 8080/8081)
├── test_habitos_full.py     # Automated calculation & integrity test suite
├── hub.html                 # Apex Master Launchpad linking all apps
└── HABITOS_README.md        # Comprehensive technical & product documentation
```
