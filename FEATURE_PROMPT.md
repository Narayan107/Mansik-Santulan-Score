# Feature Prompt: Mental Health Score Predictor Dashboard

Redesign the Mental Health Score prediction frontend into a polished, colorful, responsive dashboard. Do not use a black-and-white, plain form layout. Build a modern wellness-focused UI with an interactive input panel on the left and a live prediction/status panel on the right.

Use React + Vite + Tailwind CSS + Recharts.

### Backend
- **Endpoint**: `POST /predict`
- **JSON Body**:
```json
{
  "age": 22,
  "gender": "Male",
  "country": "India",
  "academic_level": "Graduate",
  "most_used_platform": "YouTube",
  "purpose_of_use": "Entertainment",
  "avg_daily_usage_hours": 2,
  "daily_unlocks": 50,
  "study_hours": 2,
  "physical_activity_hours": 1,
  "sleep_hours_per_night": 7,
  "stress_level": "Medium"
}
```
- **Response**:
```json
{
  "predicted_mental_health_score": 7.99
}
```

### UI & Feature Requirements
- **Layout**: Desktop split ~60% form panel, ~40% prediction & analytics panel. Responsive for tablet & mobile.
- **Theme & Style**: Soft gradients, glassmorphism cards, smooth animations, dark/light mode toggle, modern soothing wellness color palette (pale mint / light warm slate, rich deep forest-green `#0E4B3C` accent, amber/coral/teal accents).
- **Form Panel**: Title "Mental Wellbeing Signal" with supportive subtitle.
  - Profile: Age, Gender, Country.
  - Academic & Digital Habits: Academic Level, Most-Used Platform (with icons), Purpose of Use, Screen Time slider + input (`hrs/day`), Phone Unlocks slider + input (`unlocks`).
  - Lifestyle & Stress: Study Hours (`hrs/day`), Physical Activity (`hrs/day`), Sleep (`hrs/night`), Stress Level (pill selector: Low, Medium, High, Very High).
  - Helper insights under sliders (e.g. balanced sleep indicator, screen time advisory).
  - CTA button: "Read my signal" with loading spinner and disabled state when invalid.
- **Prediction & Analytics Panel**:
  - Empty state with gauge outline.
  - Loading animated state ("Reading the signal...").
  - Animated semi-circular gauge (0–10) with color bands:
    - 0–3.9: Coral/Red ("Signal needs attention")
    - 4–6.4: Amber/Yellow ("Signal is mixed")
    - 6.5–8.0: Green ("Signal is strong")
    - 8.1–10.0: Teal/Blue-green ("Signal is thriving")
  - Numerical score display, non-diagnostic empathetic copy, disclaimer ("Educational model output, not medical advice").
  - Recharts-powered interactive analytics: Metrics breakdown vs healthy benchmarks radar/bar chart.
  - "Run another read" button.
- **Validation**: Strict boundary checks (age 10–100, hours 0–24, unlocks >= 0), graceful error toasts/alerts.
