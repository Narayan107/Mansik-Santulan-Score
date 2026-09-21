/* ── Config ── */
const API_URL = 'https://mansik-santulan-score-3-gqnp.onrender.com';

/* ── Gauge constants ── */
const GAUGE_CIRCUMFERENCE = 251.2; // π × 80 (radius)

/* ── Helpers ── */
function scoreColor(s) {
  if (s < 4)   return '#f06a6a';
  if (s < 6.5) return '#f5a623';
  if (s <= 8)  return '#22c55e';
  return '#14b8a6';
}

function scoreLabel(s) {
  if (s < 4)   return 'Signal needs attention';
  if (s < 6.5) return 'Signal is mixed';
  if (s <= 8)  return 'Signal is strong';
  return 'Signal is thriving';
}

function scoreMessage(s) {
  if (s < 4)   return "Your signal suggests it may be a good time to reach out to someone you trust or a professional.";
  if (s < 6.5) return "There are some areas worth nurturing. Small consistent habits can shift the signal meaningfully.";
  if (s <= 8)  return "Your habits are supporting your wellbeing well. Keep up the positive routines you've built.";
  return "Your mental wellbeing signal is thriving. You're in a great place — keep nourishing it.";
}

function sliderHint(field, val) {
  if (field === 'sleep') {
    if (val < 5)  return 'Below recommended rest range';
    if (val <= 9) return 'Balanced sleep range';
    return 'More than typical rest duration';
  }
  if (field === 'screen') {
    if (val < 2)  return 'Minimal screen exposure';
    if (val <= 4) return 'Moderate digital usage';
    return 'Higher screen time may affect recovery';
  }
  if (field === 'activity') {
    if (val < 0.5) return 'Adding movement can help mood';
    if (val <= 2)  return 'Good physical engagement';
    return 'Active lifestyle — excellent for signal';
  }
  if (field === 'study') {
    if (val < 1)  return 'Light academic load';
    if (val <= 5) return 'Steady study rhythm';
    return 'High study load — rest matters too';
  }
  return '';
}

/* ── Slider track fill ── */
function updateSliderFill(slider) {
  const min = parseFloat(slider.min);
  const max = parseFloat(slider.max);
  const val = parseFloat(slider.value);
  const pct = ((val - min) / (max - min)) * 100;
  slider.style.background = `linear-gradient(to right, #0E4B3C ${pct}%, #c8e6dc ${pct}%)`;
}

/* ── Bind a slider + number input pair ── */
function bindSlider(sliderId, numId, field, hintId) {
  const slider = document.getElementById(sliderId);
  const num    = document.getElementById(numId);
  const hint   = document.getElementById(hintId);

  function sync(val) {
    const v = Math.min(parseFloat(slider.max), Math.max(parseFloat(slider.min), parseFloat(val) || 0));
    slider.value = v;
    num.value    = v;
    updateSliderFill(slider);
    if (hint) hint.textContent = sliderHint(field, v);
  }

  slider.addEventListener('input', () => sync(slider.value));
  num.addEventListener('input',   () => sync(num.value));
  updateSliderFill(slider);
}

/* ── Bind pill groups ── */
function bindPills(groupId, hiddenId, onChange) {
  const group  = document.getElementById(groupId);
  const hidden = document.getElementById(hiddenId);

  group.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(b => {
        b.classList.remove('active');
        b.style.background = '';
        b.style.color      = '';
        b.style.borderColor = '';
        b.style.boxShadow  = '';
      });
      btn.classList.add('active');

      // Stress pills have custom colors
      const color = btn.dataset.color;
      if (color) {
        btn.style.background   = color;
        btn.style.color        = 'white';
        btn.style.borderColor  = color;
        btn.style.boxShadow    = `0 2px 8px ${color}55`;
      }

      hidden.value = btn.dataset.value;
      if (onChange) onChange(btn.dataset.value);
    });
  });

  // Apply initial active color for stress pills
  group.querySelectorAll('.pill.active').forEach(btn => {
    const color = btn.dataset.color;
    if (color) {
      btn.style.background   = color;
      btn.style.color        = 'white';
      btn.style.borderColor  = color;
      btn.style.boxShadow    = `0 2px 8px ${color}55`;
    }
  });
}

/* ── Gauge animation ── */
function animateGauge(score) {
  const fill        = document.getElementById('gauge-fill');
  const scoreText   = document.getElementById('gauge-score');
  const unitText    = document.getElementById('gauge-unit');
  const placeholder = document.getElementById('gauge-placeholder');

  const clamped  = Math.max(3, Math.min(10, score));
  const fraction = (clamped - 3) / 7;
  const offset   = GAUGE_CIRCUMFERENCE * (1 - fraction);
  const color    = scoreColor(score);

  placeholder.setAttribute('opacity', '0');
  fill.style.stroke          = color;
  fill.style.filter          = `drop-shadow(0 0 8px ${color}88)`;
  fill.style.strokeDashoffset = offset;

  // Animate number count-up
  const duration  = 1200;
  const start     = performance.now();
  const from      = 3;

  function step(now) {
    const t        = Math.min((now - start) / duration, 1);
    const eased    = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // ease-in-out
    const current  = from + (clamped - from) * eased;
    scoreText.textContent = current.toFixed(2);
    scoreText.setAttribute('opacity', '1');
    unitText.setAttribute('opacity', '1');
    if (t < 1) requestAnimationFrame(step);
    else scoreText.textContent = clamped.toFixed(2);
  }

  requestAnimationFrame(step);
}

function resetGauge() {
  const fill        = document.getElementById('gauge-fill');
  const scoreText   = document.getElementById('gauge-score');
  const unitText    = document.getElementById('gauge-unit');
  const placeholder = document.getElementById('gauge-placeholder');

  fill.style.strokeDashoffset = GAUGE_CIRCUMFERENCE;
  fill.style.stroke           = '#2d5a4a';
  fill.style.filter           = '';
  scoreText.setAttribute('opacity', '0');
  unitText.setAttribute('opacity',  '0');
  placeholder.setAttribute('opacity', '1');
}

/* ── UI state helpers ── */
function showEmpty() {
  document.getElementById('empty-state').classList.remove('hidden');
  document.getElementById('loading-state').classList.add('hidden');
  document.getElementById('result-content').classList.add('hidden');
}

function showLoading() {
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('loading-state').classList.remove('hidden');
  document.getElementById('result-content').classList.add('hidden');
}

function showResult(score) {
  document.getElementById('empty-state').classList.add('hidden');
  document.getElementById('loading-state').classList.add('hidden');
  const rc = document.getElementById('result-content');
  rc.classList.remove('hidden');

  document.getElementById('score-label').textContent  = scoreLabel(score);
  document.getElementById('score-label').style.color  = scoreColor(score);
  document.getElementById('score-message').textContent = scoreMessage(score);
}

function setButtonLoading(loading) {
  const btn     = document.getElementById('submitBtn');
  const text    = document.getElementById('btn-text');
  const spinner = document.getElementById('btn-spinner');

  btn.disabled = loading;
  if (loading) {
    text.textContent = 'Reading the signal…';
    spinner.classList.remove('hidden');
  } else {
    text.textContent = '✦ Read my signal';
    spinner.classList.add('hidden');
  }
}

/* ── Validation ── */
function validateAge() {
  const ageField = document.getElementById('age');
  const val      = parseInt(ageField.value, 10);
  const valid    = val >= 10 && val <= 100;
  const wrap     = ageField.closest('.field');
  wrap.classList.toggle('invalid', !valid);
  return valid;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {

  /* Sliders */
  bindSlider('avg_daily_usage_hours', 'avg_daily_usage_hours_num', 'screen',   'screen-hint');
  bindSlider('daily_unlocks',         'daily_unlocks_num',         'unlocks',  'unlocks-hint');
  bindSlider('study_hours',           'study_hours_num',           'study',    'study-hint');
  bindSlider('physical_activity_hours','physical_activity_hours_num','activity','activity-hint');
  bindSlider('sleep_hours_per_night', 'sleep_hours_per_night_num', 'sleep',    'sleep-hint');

  /* Pills */
  bindPills('gender-group', 'gender');
  bindPills('stress-group', 'stress_level');

  /* Age validation on blur/input */
  document.getElementById('age').addEventListener('input', validateAge);
  document.getElementById('age').addEventListener('blur',  validateAge);

  /* Reset button */
  document.getElementById('resetBtn').addEventListener('click', () => {
    showEmpty();
    resetGauge();
    document.getElementById('error-box').classList.add('hidden');
  });

  /* Form submit */
  document.getElementById('predForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateAge()) return;

    const payload = {
      age:                      parseInt(document.getElementById('age').value, 10),
      gender:                   document.getElementById('gender').value,
      country:                  document.getElementById('country').value,
      academic_level:           document.getElementById('academic_level').value,
      most_used_platform:       document.getElementById('most_used_platform').value,
      purpose_of_use:           document.getElementById('purpose_of_use').value,
      avg_daily_usage_hours:    parseFloat(document.getElementById('avg_daily_usage_hours').value),
      daily_unlocks:            parseInt(document.getElementById('daily_unlocks').value, 10),
      study_hours:              parseFloat(document.getElementById('study_hours').value),
      physical_activity_hours:  parseFloat(document.getElementById('physical_activity_hours').value),
      sleep_hours_per_night:    parseFloat(document.getElementById('sleep_hours_per_night').value),
      stress_level:             document.getElementById('stress_level').value,
    };

    setButtonLoading(true);
    showLoading();
    document.getElementById('error-box').classList.add('hidden');

    try {
      const res = await fetch(`${API_URL}/predict`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.detail ?? `Server returned ${res.status}`);
      }

      const data  = await res.json();
      const score = Math.max(3, Math.min(10, data.predicted_mental_health_score));

      animateGauge(score);
      showResult(score);

    } catch (err) {
      showEmpty();
      const box = document.getElementById('error-box');
      box.textContent = err.message || 'Could not reach the prediction service. Make sure your backend is running on port 2200.';
      box.classList.remove('hidden');
    } finally {
      setButtonLoading(false);
    }
  });
});
