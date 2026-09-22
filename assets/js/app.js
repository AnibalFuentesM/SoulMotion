/* Soul Motion · Academia de Baile
   Prototipo navegable. Todo corre en el navegador: no hay backend, no hay
   base de datos y no hay red. El estado vive en localStorage bajo
   STORAGE_KEY y se puede borrar desde "Reiniciar demo".
   UI y comentarios en espanol; nombres de variables y funciones en ingles. */

const STORAGE_KEY = 'soulmotion-academy-demo-v1';
const STATE_VERSION = 1;

const TODAY = startOfDay(new Date());
const WEEKDAY_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const CURRENCY = 'Q';

/* ---------------------------------------------------------------- catalogo */

const roleConfig = {
  student: {
    label: 'Alumno',
    person: 'Camila Ordóñez',
    kicker: 'Portal de alumno',
    nav: [
      { route: 'inicio', label: 'Inicio' },
      { route: 'clases', label: 'Mis clases' },
      { route: 'carne', label: 'Carné' },
      { route: 'pagos', label: 'Mensualidad' },
    ],
  },
  teacher: {
    label: 'Maestro',
    person: 'Bruno Estrada',
    kicker: 'Panel de maestro',
    nav: [
      { route: 'inicio', label: 'Inicio' },
      { route: 'agenda', label: 'Agenda' },
      { route: 'asistencia', label: 'Pasar lista' },
    ],
  },
  admin: {
    label: 'Administración',
    person: 'Diana Caravantes',
    kicker: 'Administración',
    nav: [
      { route: 'inicio', label: 'Inicio' },
      { route: 'alumnos', label: 'Alumnos' },
      { route: 'pagos', label: 'Pagos' },
      { route: 'asistencia', label: 'Asistencia' },
    ],
  },
  guardian: {
    label: 'Encargado',
    person: 'Lucía Méndez',
    kicker: 'Portal de encargado',
    nav: [
      { route: 'inicio', label: 'Inicio' },
      { route: 'pagos', label: 'Pagos' },
      { route: 'carne', label: 'Carnés' },
    ],
  },
};

// Horario fijo de la academia. weekday: 0 domingo … 6 sabado.
const classData = [
  { id: 'sm-salsa-lun', name: 'Salsa en línea · Nivel 1', weekday: 1, time: '6:30 PM', teacher: 'Bruno Estrada', room: 'Sala Fuego', capacity: 18 },
  { id: 'sm-bachata-mar', name: 'Bachata sensual', weekday: 2, time: '7:30 PM', teacher: 'Bruno Estrada', room: 'Sala Fuego', capacity: 16 },
  { id: 'sm-salsa-mie', name: 'Salsa en línea · Nivel 1', weekday: 3, time: '6:30 PM', teacher: 'Bruno Estrada', room: 'Sala Fuego', capacity: 18 },
  { id: 'sm-jazz-jue', name: 'Jazz funk', weekday: 4, time: '6:00 PM', teacher: 'Karla Ixcot', room: 'Sala Luna', capacity: 20 },
  { id: 'sm-contemp-vie', name: 'Contemporáneo', weekday: 5, time: '5:00 PM', teacher: 'Karla Ixcot', room: 'Sala Luna', capacity: 14 },
  { id: 'sm-ballet-sab', name: 'Ballet infantil', weekday: 6, time: '9:00 AM', teacher: 'Tita Morales', room: 'Sala Aurora', capacity: 15 },
  { id: 'sm-hiphop-sab', name: 'Hip hop teens', weekday: 6, time: '10:30 AM', teacher: 'Karla Ixcot', room: 'Sala Luna', capacity: 22 },
];

const membershipPlans = [
  { planName: 'Ritmo Uno', price: 225, days: 1, allowance: 4, detail: '1 día por semana' },
  { planName: 'Ritmo Dos', price: 350, days: 2, allowance: 8, detail: '2 días por semana' },
  { planName: 'Full Soul', price: 495, days: 5, allowance: null, detail: 'Clases ilimitadas' },
  { planName: 'Kids Soul', price: 290, days: 2, allowance: 8, detail: 'Infantil · 2 días' },
];

const DEMO_STUDENT_ID = 'SM-0104';
const GUARDIAN_ID = 'TU-0007';

const guardians = [
  { id: GUARDIAN_ID, name: 'Lucía Méndez', phone: '5512 8840', children: ['SM-0118', 'SM-0121'] },
];

const baseStudents = [
  { id: 'SM-0104', name: 'Camila Ordóñez', plan: 'Ritmo Dos', phone: '4488 1220', level: 'Intermedio', classes: ['sm-salsa-lun', 'sm-salsa-mie'], status: 'active' },
  { id: 'SM-0112', name: 'Renato Villagrán', plan: 'Ritmo Uno', phone: '5570 3391', level: 'Principiante', classes: ['sm-bachata-mar'], status: 'active' },
  { id: 'SM-0118', name: 'Aitana Pérez Méndez', plan: 'Kids Soul', phone: '5512 8840', level: 'Infantil', classes: ['sm-ballet-sab'], status: 'active' },
  { id: 'SM-0121', name: 'Matías Pérez Méndez', plan: 'Kids Soul', phone: '5512 8840', level: 'Teens', classes: ['sm-hiphop-sab'], status: 'active' },
  { id: 'SM-0127', name: 'Fernanda Girón', plan: 'Full Soul', phone: '3320 7745', level: 'Avanzado', classes: ['sm-jazz-jue', 'sm-contemp-vie', 'sm-bachata-mar'], status: 'active' },
  { id: 'SM-0133', name: 'Sebastián Coronado', plan: 'Ritmo Dos', phone: '4190 2288', level: 'Intermedio', classes: ['sm-salsa-lun', 'sm-bachata-mar'], status: 'active' },
  { id: 'SM-0141', name: 'Valentina Chacón', plan: 'Ritmo Uno', phone: '5903 1174', level: 'Principiante', classes: ['sm-jazz-jue'], status: 'active' },
  { id: 'SM-0146', name: 'Diego Arriaza', plan: 'Ritmo Dos', phone: '4477 6620', level: 'Intermedio', classes: ['sm-salsa-mie', 'sm-contemp-vie'], status: 'suspended' },
];

/* ---------------------------------------------------------------- utilerias */

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return startOfDay(copy);
}

function dayKey(date) {
  const d = startOfDay(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function monthKey(date) {
  return dayKey(date).slice(0, 7);
}

function monthName(date) {
  return date.toLocaleDateString('es-GT', { month: 'long', year: 'numeric' });
}

function longDate(date) {
  return date.toLocaleDateString('es-GT', { weekday: 'long', day: 'numeric', month: 'long' });
}

function shortDate(date) {
  return date.toLocaleDateString('es-GT', { day: '2-digit', month: 'short' });
}

function shortDayLabel(date) {
  return `${WEEKDAY_SHORT[date.getDay()]} ${date.getDate()}`;
}

function nextDateFor(weekday) {
  const diff = (weekday - TODAY.getDay() + 7) % 7;
  return addDays(TODAY, diff);
}

function previousDateFor(weekday) {
  const diff = (TODAY.getDay() - weekday + 7) % 7;
  return addDays(TODAY, -(diff || 7));
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Buenos días';
  if (hour < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

function formatAmount(value) {
  return Number(value || 0).toLocaleString('es-GT');
}

function money(value) {
  return `${CURRENCY} ${formatAmount(value)}`;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]
  ));
}

function initials(name) {
  return String(name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

function planByName(name) {
  return membershipPlans.find((plan) => plan.planName === name)
    || { planName: name || 'Sin plan', price: 0, allowance: null, detail: 'Plan fuera del catálogo' };
}

function currentPeriodLabel() {
  const label = monthName(TODAY);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

/* ------------------------------------------------------------------- estado */

function createDefaultPayments() {
  const period = monthKey(TODAY);
  const prev = monthKey(new Date(TODAY.getFullYear(), TODAY.getMonth() - 1, 1));
  const rows = [];
  let seq = 1;
  baseStudents.forEach((student, index) => {
    const amount = planByName(student.plan).price;
    // Tres estados de ejemplo repartidos entre el padron: pagado, pendiente y mora.
    const status = index % 3 === 0 ? 'Pagado' : index % 3 === 1 ? 'Pendiente' : 'Mora';
    rows.push({
      id: `PG-${String(seq++).padStart(4, '0')}`,
      studentId: student.id,
      period,
      amount,
      method: status === 'Pagado' ? 'Transferencia' : '—',
      status,
      paidAt: status === 'Pagado' ? dayKey(addDays(TODAY, -(index + 2))) : null,
    });
    rows.push({
      id: `PG-${String(seq++).padStart(4, '0')}`,
      studentId: student.id,
      period: prev,
      amount,
      method: 'Efectivo',
      status: 'Pagado',
      paidAt: `${prev}-05`,
    });
  });
  return rows;
}

const ALWAYS_ABSENT = ['SM-0141', 'SM-0146'];

function createDefaultAttendance() {
  const log = [];
  // Dos semanas de historial para que asistencia y alertas tengan de donde leer.
  for (let week = 1; week <= 2; week += 1) {
    classData.forEach((item) => {
      const date = addDays(previousDateFor(item.weekday), -(7 * (week - 1)));
      if (date > TODAY) return;
      rosterFor(item.id, baseStudents).forEach((student, index) => {
        // Dos alumnos faltan siempre: son los que disparan la alerta de
        // ausencias consecutivas. El resto falta de vez en cuando.
        if (ALWAYS_ABSENT.includes(student.id)) return;
        if ((index + week) % 4 === 0) return;
        log.push({ studentId: student.id, classId: item.id, at: dayKey(date) });
      });
    });
  }
  return log;
}

function createDefaultState() {
  return {
    version: STATE_VERSION,
    role: 'student',
    students: baseStudents.map((student) => ({ ...student, classes: [...student.classes] })),
    payments: createDefaultPayments(),
    attendanceLog: createDefaultAttendance(),
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState();
    const saved = JSON.parse(raw);
    if (!saved || saved.version !== STATE_VERSION || !Array.isArray(saved.students)) {
      return createDefaultState();
    }
    return {
      version: STATE_VERSION,
      role: roleConfig[saved.role] ? saved.role : 'student',
      students: saved.students,
      payments: Array.isArray(saved.payments) ? saved.payments : [],
      attendanceLog: Array.isArray(saved.attendanceLog) ? saved.attendanceLog : [],
    };
  } catch (error) {
    console.warn('No se pudo leer el estado guardado, se reinicia la demo.', error);
    return createDefaultState();
  }
}

let state = loadState();
let activeRole = state.role || 'student';
let activeRoute = 'inicio';
let activeClassId = classData[0].id;
let activeChildId = guardians[0].children[0];
let studentSearchQuery = '';
let paymentFilter = 'all';
let lastFocusedElement = null;

function persistState() {
  try {
    state.role = activeRole;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    showToast('No se pudo guardar', 'El navegador bloqueó el almacenamiento local.');
  }
}

/* ----------------------------------------------------------------- consultas */

function studentById(id) {
  return state.students.find((student) => student.id === id) || null;
}

function currentStudent() {
  return studentById(DEMO_STUDENT_ID) || state.students[0] || null;
}

function currentGuardian() {
  return guardians[0];
}

function childrenOf(guardian) {
  return guardian.children.map(studentById).filter(Boolean);
}

function findClass(classId) {
  return classData.find((item) => item.id === classId) || null;
}

// source explicito: durante la siembra inicial `state` todavia no existe.
function rosterFor(classId, source = null) {
  const list = source || state.students;
  return list.filter((student) => (student.classes || []).includes(classId) && student.status !== 'archived');
}

function classesForStudent(studentId) {
  const student = studentById(studentId);
  if (!student) return [];
  return (student.classes || []).map(findClass).filter(Boolean);
}

function upcomingClassesForStudent(studentId, count = 4) {
  return classesForStudent(studentId)
    .map((item) => ({ ...item, date: nextDateFor(item.weekday) }))
    .sort((a, b) => a.date - b.date)
    .slice(0, count);
}

function teacherClasses(teacherName) {
  return classData.filter((item) => item.teacher === teacherName);
}

function todayClassesFor(teacherName) {
  return teacherClasses(teacherName).filter((item) => item.weekday === TODAY.getDay());
}

function paymentFor(studentId, period = monthKey(TODAY)) {
  return state.payments.find((item) => item.studentId === studentId && item.period === period) || null;
}

function pendingPayments() {
  return state.payments.filter((item) => item.period === monthKey(TODAY) && item.status !== 'Pagado');
}

function paymentPillClass(status) {
  if (status === 'Pagado') return 'is-paid';
  if (status === 'Mora') return 'is-late';
  return 'is-pending';
}

function attendedThisMonth(studentId) {
  const period = monthKey(TODAY);
  return state.attendanceLog.filter((entry) => entry.studentId === studentId && entry.at.startsWith(period)).length;
}

function attendanceFor(classId, date = TODAY) {
  const key = dayKey(date);
  return state.attendanceLog.filter((entry) => entry.classId === classId && entry.at === key).map((entry) => entry.studentId);
}

function nextPaymentId() {
  const numbers = state.payments.map((item) => Number(String(item.id).replace(/\D/g, '')) || 0);
  return `PG-${String(Math.max(0, ...numbers) + 1).padStart(4, '0')}`;
}

function nextStudentId() {
  const numbers = state.students.map((item) => Number(String(item.id).replace(/\D/g, '')) || 0);
  return `SM-${String(Math.max(0, ...numbers) + 1).padStart(4, '0')}`;
}

// Alumnos con dos o mas ausencias seguidas en sesiones que ya pasaron.
function absenceAlerts() {
  const alerts = [];
  state.students.filter((student) => student.status === 'active').forEach((student) => {
    let streak = 0;
    let lastClass = null;
    (student.classes || []).forEach((classId) => {
      [1, 2].forEach((weeksAgo) => {
        const date = addDays(previousDateFor(findClass(classId)?.weekday ?? 1), -7 * (weeksAgo - 1));
        if (date > TODAY) return;
        const attended = state.attendanceLog.some((entry) => entry.studentId === student.id && entry.classId === classId && entry.at === dayKey(date));
        if (!attended) {
          streak += 1;
          lastClass = classId;
        }
      });
    });
    if (streak >= 2) alerts.push({ student, misses: streak, classId: lastClass });
  });
  return alerts.sort((a, b) => b.misses - a.misses).slice(0, 4);
}

/* ------------------------------------------------------------------- shell */

const elements = {
  intro: document.querySelector('#intro'),
  access: document.querySelector('#accessView'),
  shell: document.querySelector('#appShell'),
  sidebar: document.querySelector('#sidebar'),
  sideNav: document.querySelector('#sideNav'),
  bottomNav: document.querySelector('#bottomNav'),
  content: document.querySelector('#mainContent'),
  kicker: document.querySelector('#topbarKicker'),
  date: document.querySelector('#topbarDate'),
  roleSwitcher: document.querySelector('#roleSwitcher'),
  profileInitials: document.querySelector('#profileInitials'),
  menuButton: document.querySelector('#menuButton'),
  modalLayer: document.querySelector('#modalLayer'),
  modalTitle: document.querySelector('#modalTitle'),
  modalEyebrow: document.querySelector('#modalEyebrow'),
  modalBody: document.querySelector('#modalBody'),
  toastRegion: document.querySelector('#toastRegion'),
};

function navMarkup(config) {
  return config.nav.map((item, index) => `
    <button class="nav-item ${item.route === activeRoute ? 'is-active' : ''}" type="button" data-route="${item.route}" aria-current="${item.route === activeRoute ? 'page' : 'false'}">
      <span class="nav-index">${String(index + 1).padStart(2, '0')}</span>
      <span>${escapeHtml(item.label)}</span>
    </button>`).join('');
}

function updateShell() {
  const config = roleConfig[activeRole];
  elements.sideNav.innerHTML = navMarkup(config);
  elements.bottomNav.innerHTML = navMarkup(config);
  elements.kicker.textContent = config.kicker;
  elements.date.textContent = longDate(TODAY);
  elements.roleSwitcher.value = activeRole;
  elements.profileInitials.textContent = initials(config.person);
}

const renderers = {
  student: {
    inicio: renderStudentHome,
    clases: renderStudentClasses,
    carne: renderStudentCard,
    pagos: renderStudentPayments,
  },
  teacher: {
    inicio: renderTeacherHome,
    agenda: renderTeacherAgenda,
    asistencia: renderTeacherAttendance,
  },
  admin: {
    inicio: renderAdminHome,
    alumnos: renderAdminStudents,
    pagos: renderAdminPayments,
    asistencia: renderAdminAttendance,
  },
  guardian: {
    inicio: renderGuardianHome,
    pagos: renderGuardianPayments,
    carne: renderGuardianCards,
  },
};

function renderApp() {
  const byRole = renderers[activeRole] || renderers.student;
  const render = byRole[activeRoute] || byRole.inicio;
  if (!byRole[activeRoute]) activeRoute = 'inicio';
  elements.content.innerHTML = render();
  elements.content.classList.remove('page-enter');
  void elements.content.offsetWidth;
  elements.content.classList.add('page-enter');
  updateShell();
}

function routeTo(route) {
  activeRoute = route;
  setMenuOpen(false);
  renderApp();
  elements.content.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function enterDemo(role) {
  activeRole = role;
  activeRoute = 'inicio';
  persistState();
  elements.access.classList.add('is-hidden');
  elements.shell.classList.remove('is-hidden');
  renderApp();
}

function leaveDemo() {
  setMenuOpen(false);
  elements.shell.classList.add('is-hidden');
  elements.access.classList.remove('is-hidden');
  window.scrollTo({ top: 0 });
}

function setMenuOpen(open) {
  elements.sidebar.classList.toggle('is-open', open);
  elements.menuButton.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
}

/* ---------------------------------------------------------- bloques comunes */

function weekStrip(classes) {
  return `<div class="week-strip">${Array.from({ length: 7 }, (_, offset) => {
    const date = addDays(TODAY, offset);
    const hasClass = classes.some((item) => item.weekday === date.getDay());
    return `<span class="day-pill ${offset === 0 ? 'is-today' : ''} ${hasClass ? 'has-class' : ''}">
      <strong>${WEEKDAY_SHORT[date.getDay()]}</strong>${date.getDate()}
    </span>`;
  }).join('')}</div>`;
}

function classCards(items) {
  if (!items.length) {
    return '<div class="empty-state"><strong>Sin clases por ahora</strong>No hay sesiones programadas en este rango.</div>';
  }
  return `<div class="cards-grid">${items.map((item, index) => `
    <article class="class-card" data-class="${item.id}" tabindex="0" role="button">
      <div class="class-card-top">
        <span class="class-card-index">${String(index + 1).padStart(2, '0')}</span>
        <span class="tag">${escapeHtml(item.room)}</span>
      </div>
      <h3>${escapeHtml(item.name)}</h3>
      <p class="schedule-teacher">${escapeHtml(item.teacher)}</p>
      <div class="class-card-foot">
        <span class="schedule-time">${escapeHtml(WEEKDAY_SHORT[item.weekday])} · ${escapeHtml(item.time)}</span>
        <span class="capacity">${rosterFor(item.id).length}/${item.capacity}</span>
      </div>
    </article>`).join('')}</div>`;
}

function scheduleList(items) {
  return `<div class="schedule-list">${items.map((item) => `
    <button class="schedule-row" type="button" data-class="${item.id}">
      <span class="schedule-time">${escapeHtml(WEEKDAY_SHORT[item.weekday])} ${escapeHtml(item.time)}</span>
      <span class="schedule-name">${escapeHtml(item.name)}<small class="schedule-teacher">${escapeHtml(item.teacher)} · ${escapeHtml(item.room)}</small></span>
      <span class="capacity">${rosterFor(item.id).length}/${item.capacity}</span>
    </button>`).join('')}</div>`;
}

function qrMarkup(seed) {
  // QR decorativo, determinista por carne: la demo no lee codigos reales.
  const size = 21;
  let hash = 0;
  for (let i = 0; i < String(seed).length; i += 1) hash = (hash * 31 + String(seed).charCodeAt(i)) % 99991;
  const cells = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const corner = (x < 7 && y < 7) || (x > size - 8 && y < 7) || (x < 7 && y > size - 8);
      const ring = corner && (x === 0 || y === 0 || x === size - 1 || y === size - 1
        || (x >= 2 && x <= 4 && y >= 2 && y <= 4)
        || (x >= size - 5 && x <= size - 3 && y >= 2 && y <= 4)
        || (x >= 2 && x <= 4 && y >= size - 5 && y <= size - 3)
        || (corner && (x % 6 === 0 || y % 6 === 0)));
      hash = (hash * 1103515245 + 12345) % 2147483648;
      const on = corner ? ring : (hash >> 8) % 100 < 46;
      if (on) cells.push(`<rect x="${x}" y="${y}" width="1" height="1" />`);
    }
  }
  return `<div class="qr-code"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Código QR de demostración">${cells.join('')}</svg></div>`;
}

function memberCardMarkup(student) {
  const suspended = student.status === 'suspended';
  return `
    <article class="member-card">
      <div class="member-card-header">
        <img class="member-logo" src="./assets/soulmotion-logo.png" alt="Soul Motion" />
        <span class="tag ${suspended ? 'tag--red' : 'tag--dark'}">${suspended ? 'Suspendido' : 'Permanente'}</span>
      </div>
      <p class="member-card-label">Carné de alumno</p>
      <h2 class="member-name">${escapeHtml(student.name)}</h2>
      <p class="member-id">${escapeHtml(student.id)} · ${escapeHtml(student.level)}</p>
      <div class="qr-panel">
        ${qrMarkup(student.id)}
        <span class="qr-demo-label">${suspended ? 'Carné suspendido' : 'QR de demostración'}</span>
      </div>
      <p class="member-validity">${escapeHtml(planByName(student.plan).planName)} · ${escapeHtml(planByName(student.plan).detail)}</p>
    </article>`;
}

function paymentCardMarkup(student) {
  const payment = paymentFor(student.id);
  const plan = planByName(student.plan);
  const status = payment?.status || 'Sin registro';
  return `
    <article class="surface-card">
      <p class="eyebrow">${escapeHtml(currentPeriodLabel())} · ${escapeHtml(student.name)}</p>
      <p class="payment-amount">${escapeHtml(money(payment?.amount ?? plan.price))}</p>
      <p class="payment-meta">${escapeHtml(status)}${payment?.paidAt ? ` · pagado el ${escapeHtml(payment.paidAt)}` : ''}<br/>${escapeHtml(plan.planName)} · ${escapeHtml(plan.detail)}</p>
      <span class="status-pill ${paymentPillClass(status)}">${escapeHtml(status)}</span>
    </article>`;
}

/* ------------------------------------------------------------------ alumno */

function renderStudentHome() {
  const student = currentStudent();
  const plan = planByName(student.plan);
  const next = upcomingClassesForStudent(student.id)[0];
  const attended = attendedThisMonth(student.id);
  const payment = paymentFor(student.id);
  const remaining = plan.allowance === null ? null : Math.max(0, plan.allowance - attended);
  return `
    <section class="student-hero">
      <div class="student-hero-copy">
        <div>
          <p class="eyebrow">Soul Motion · ${escapeHtml(shortDayLabel(TODAY))}</p>
          <h1 class="hero-title">${escapeHtml(greeting())}, ${escapeHtml(student.name.split(' ')[0])}.<br/><span>El alma se mueve primero.</span></h1>
        </div>
        <div class="hero-foot">
          <div class="next-class">
            <span class="next-class-label">Próxima clase</span>
            <strong>${next ? escapeHtml(next.name) : 'Sin clases asignadas'}</strong>
            <p class="payment-meta">${next ? escapeHtml(`${longDate(next.date)} · ${next.time}`) : 'Pedí en recepción que te asignen un horario.'}${next ? `<br/>${escapeHtml(`${next.room} · ${next.teacher}`)}` : ''}</p>
          </div>
          <button class="button button--light" type="button" data-go="clases">Ver mi semana</button>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-head"><div><h2>Tu semana</h2><p>Los días marcados tienen clase tuya.</p></div></div>
      ${weekStrip(classesForStudent(student.id))}
    </section>

    <section class="split-grid">
      <article class="surface-card">
        <p class="eyebrow">Plan activo</p>
        <p class="payment-amount">${escapeHtml(plan.planName)}</p>
        <p class="payment-meta">${escapeHtml(plan.detail)} · ${escapeHtml(money(plan.price))} al mes<br/>${remaining === null ? 'Asistencia sin límite este mes' : `${remaining} de ${plan.allowance} clases disponibles`}</p>
      </article>
      <article class="surface-card">
        <p class="eyebrow">Mensualidad ${escapeHtml(currentPeriodLabel())}</p>
        <p class="payment-amount">${escapeHtml(money(payment?.amount ?? plan.price))}</p>
        <p class="payment-meta">${escapeHtml(payment?.status || 'Sin registro')} · se paga en recepción</p>
        <span class="status-pill ${paymentPillClass(payment?.status)}">${escapeHtml(payment?.status || 'Sin registro')}</span>
      </article>
    </section>

    <section class="section">
      <div class="section-head"><div><h2>Próximas clases</h2><p>Tocá una tarjeta para ver el detalle.</p></div></div>
      ${classCards(upcomingClassesForStudent(student.id, 3))}
    </section>
  `;
}

function renderStudentClasses() {
  const student = currentStudent();
  const own = classesForStudent(student.id);
  return `
    <header class="page-heading">
      <div><p class="eyebrow">Tu horario</p><h1>Mis clases.<br/>Semana a semana.</h1><p>Horario fijo de ${escapeHtml(plural(own.length, 'clase', 'clases'))} según tu plan ${escapeHtml(planByName(student.plan).planName)}.</p></div>
    </header>
    ${weekStrip(own)}
    <section class="section">
      <div class="section-head"><div><h2>Tu horario asignado</h2></div></div>
      ${own.length ? scheduleList(own) : '<div class="empty-state"><strong>Sin clases asignadas</strong>Pedí en recepción que te agreguen a un horario.</div>'}
    </section>
    <section class="section">
      <div class="section-head"><div><h2>Otras clases de la academia</h2><p>Consultá disponibilidad en recepción antes de sumarte.</p></div></div>
      ${scheduleList(classData.filter((item) => !own.some((mine) => mine.id === item.id)))}
    </section>
  `;
}

function renderStudentCard() {
  const student = currentStudent();
  return `
    <header class="page-heading"><div><p class="eyebrow">Identificación digital</p><h1>Tu carné.<br/>Siempre listo.</h1><p>El número de carné es permanente. Mostralo en recepción al llegar a clase.</p></div></header>
    <div class="member-card-wrap">
      ${memberCardMarkup(student)}
      <aside class="surface-card">
        <p class="eyebrow">Uso del carné</p>
        <h2>Acceso a la academia</h2>
        <p class="payment-meta">Credencial digital e intransferible. La asistencia la registra el maestro desde su panel; este QR es solo demostrativo.</p>
        <p class="payment-meta"><strong>${escapeHtml(student.id)}</strong> · ${escapeHtml(student.level)} · ${escapeHtml(attendedThisMonth(student.id))} clases este mes</p>
      </aside>
    </div>
  `;
}

function renderStudentPayments() {
  const student = currentStudent();
  const history = state.payments.filter((item) => item.studentId === student.id).sort((a, b) => b.period.localeCompare(a.period));
  return `
    <header class="page-heading"><div><p class="eyebrow">Mensualidad</p><h1>Tu cuenta.<br/>Sin sorpresas.</h1><p>La academia registra acá los pagos recibidos en recepción. No se cobra en línea.</p></div></header>
    ${paymentCardMarkup(student)}
    <section class="section">
      <div class="section-head"><div><h2>Historial</h2><p>${escapeHtml(plural(history.length, 'registro', 'registros'))} en la demo.</p></div></div>
      <div class="table-wrap"><table class="data-table">
        <thead><tr><th scope="col">Período</th><th scope="col">Monto</th><th scope="col">Método</th><th scope="col">Estado</th></tr></thead>
        <tbody>${history.map((item) => `
          <tr>
            <td>${escapeHtml(item.period)}</td>
            <td>${escapeHtml(money(item.amount))}</td>
            <td>${escapeHtml(item.method)}</td>
            <td><span class="status-pill ${paymentPillClass(item.status)}">${escapeHtml(item.status)}</span></td>
          </tr>`).join('')}</tbody>
      </table></div>
    </section>
  `;
}

/* ----------------------------------------------------------------- maestro */

function renderTeacherHome() {
  const teacher = roleConfig.teacher.person;
  const today = todayClassesFor(teacher);
  const mine = teacherClasses(teacher);
  const studentsCount = new Set(mine.flatMap((item) => rosterFor(item.id).map((s) => s.id))).size;
  return `
    <section class="teacher-hero">
      <div>
        <p class="eyebrow">Panel de maestro · ${escapeHtml(shortDayLabel(TODAY))}</p>
        <h1 class="hero-title">Hola, ${escapeHtml(teacher.split(' ')[0])}.<br/><span>${today.length ? `Tenés ${plural(today.length, 'clase', 'clases')} hoy.` : 'Hoy no tenés clase.'}</span></h1>
      </div>
      <div class="teacher-hero-foot">
        <div><strong>${mine.length}</strong><span>clases a cargo</span></div>
        <div><strong>${studentsCount}</strong><span>alumnos en lista</span></div>
      </div>
    </section>
    <section class="section">
      <div class="section-head"><div><h2>Hoy</h2><p>Pasá lista al terminar cada sesión.</p></div>
        ${today.length ? '<button class="text-button" type="button" data-go="asistencia">Pasar lista →</button>' : ''}
      </div>
      ${today.length ? classCards(today) : '<div class="empty-state"><strong>Día libre</strong>No hay sesiones tuyas programadas para hoy.</div>'}
    </section>
    <section class="section">
      <div class="section-head"><div><h2>Tu semana</h2></div></div>
      ${scheduleList(mine)}
    </section>
  `;
}

function renderTeacherAgenda() {
  const mine = teacherClasses(roleConfig.teacher.person);
  return `
    <header class="page-heading"><div><p class="eyebrow">Agenda</p><h1>Tus clases.<br/>De lunes a sábado.</h1></div></header>
    ${weekStrip(mine)}
    <section class="section">
      <div class="section-head"><div><h2>Horario asignado</h2><p>${escapeHtml(plural(mine.length, 'sesión', 'sesiones'))} por semana.</p></div></div>
      ${scheduleList(mine)}
    </section>
    <section class="section">
      <div class="section-head"><div><h2>Listas por clase</h2></div></div>
      ${classCards(mine)}
    </section>
  `;
}

function renderTeacherAttendance() {
  const mine = teacherClasses(roleConfig.teacher.person);
  if (!mine.some((item) => item.id === activeClassId)) activeClassId = mine[0]?.id;
  const current = findClass(activeClassId);
  const present = new Set(attendanceFor(activeClassId));
  const roster = rosterFor(activeClassId);
  return `
    <header class="page-heading"><div><p class="eyebrow">Control de clase</p><h1>Pasar lista.<br/>En un minuto.</h1><p>Marcá quién llegó y guardá. Se registra con la fecha de hoy, ${escapeHtml(shortDate(TODAY))}.</p></div></header>
    <div class="filter-row" role="group" aria-label="Elegir clase">
      ${mine.map((item) => `<button class="filter-chip ${item.id === activeClassId ? 'is-active' : ''}" type="button" data-class-filter="${item.id}">${escapeHtml(item.name)} · ${escapeHtml(WEEKDAY_SHORT[item.weekday])}</button>`).join('')}
    </div>
    <section class="section">
      <div class="section-head">
        <div><h2>${escapeHtml(current?.name || '')}</h2><p>${escapeHtml(current?.room || '')} · ${escapeHtml(current?.time || '')} · ${roster.length} en lista</p></div>
        <span class="tag">${present.size} presentes</span>
      </div>
      <form class="attendance-roster" id="attendanceForm">
        ${roster.length ? roster.map((student) => `
          <label class="student-check">
            <input type="checkbox" name="present" value="${escapeHtml(student.id)}" ${present.has(student.id) ? 'checked' : ''} />
            <span class="person-cell">
              <span class="avatar">${escapeHtml(initials(student.name))}</span>
              <span><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.id)} · ${escapeHtml(student.level)}</small></span>
            </span>
          </label>`).join('') : '<div class="empty-state"><strong>Lista vacía</strong>Ningún alumno está inscrito en esta clase.</div>'}
        <div class="form-actions">
          <button class="button button--red" type="submit">Guardar asistencia</button>
        </div>
      </form>
    </section>
  `;
}

/* -------------------------------------------------------------------- admin */

function renderAdminHome() {
  const due = pendingPayments();
  const alerts = absenceAlerts();
  const teachers = new Set(classData.map((item) => item.teacher)).size;
  const collected = state.payments
    .filter((item) => item.status === 'Pagado' && item.period === monthKey(TODAY))
    .reduce((sum, item) => sum + item.amount, 0);
  return `
    <section class="admin-intro">
      <div><p class="eyebrow">Administración · ${escapeHtml(shortDayLabel(TODAY))}</p><h1 class="hero-title">La academia,<br/><span>en orden.</span></h1></div>
      <div class="admin-intro-meta">
        <div><strong>${state.students.filter((s) => s.status === 'active').length}</strong><span>alumnos activos</span></div>
        <div><strong>${teachers}</strong><span>maestros en agenda</span></div>
        <div><strong>${escapeHtml(money(collected))}</strong><span>cobrado este mes</span></div>
      </div>
    </section>
    <section class="section">
      <div class="section-head"><div><h2>Acciones de hoy</h2><p>Lo que el equipo de recepción hace a diario.</p></div></div>
      <div class="filter-row" role="group" aria-label="Acciones administrativas">
        <button class="button button--red" type="button" data-open-payment>+ Registrar pago</button>
        <button class="button button--light" type="button" data-open-student>+ Nuevo alumno</button>
        <button class="button button--light" type="button" data-go="asistencia">Revisar asistencia</button>
      </div>
    </section>
    <section class="section">
      <div class="section-head"><div><h2>Seguimiento de asistencia</h2><p>${alerts.length ? `${plural(alerts.length, 'alumno acumula', 'alumnos acumulan')} dos o más ausencias recientes.` : 'Sin alertas de inasistencia.'}</p></div></div>
      ${alerts.length ? `<div class="cards-grid">${alerts.map((alert) => `
        <article class="compact-card">
          <p class="eyebrow">${escapeHtml(alert.misses)} ausencias</p>
          <h3>${escapeHtml(alert.student.name)}</h3>
          <p class="payment-meta">${escapeHtml(findClass(alert.classId)?.name || '')} · ${escapeHtml(alert.student.phone)}</p>
          <button class="text-button" type="button" data-student-detail="${escapeHtml(alert.student.id)}">Ver ficha →</button>
        </article>`).join('')}</div>` : '<div class="empty-state"><strong>Todo al día</strong>Nadie acumula ausencias consecutivas en la demo.</div>'}
    </section>
    <section class="section">
      <div class="section-head"><div><h2>Pagos por resolver</h2><p>${escapeHtml(plural(due.length, 'registro necesita', 'registros necesitan'))} seguimiento.</p></div><button class="text-button" type="button" data-go="pagos">Ver todos →</button></div>
      ${paymentTable(due.slice(0, 6))}
    </section>
  `;
}

function paymentTable(rows) {
  if (!rows.length) {
    return '<div class="empty-state"><strong>Nada por resolver</strong>No hay mensualidades pendientes en los datos demo.</div>';
  }
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr><th scope="col">Alumno</th><th scope="col">Período</th><th scope="col">Monto</th><th scope="col">Método</th><th scope="col">Estado</th><th scope="col">Acción</th></tr></thead>
    <tbody>${rows.map((item) => {
      const student = studentById(item.studentId);
      return `<tr>
        <td><span class="person-cell"><span class="avatar">${escapeHtml(initials(student?.name))}</span><span><strong>${escapeHtml(student?.name || item.studentId)}</strong><small>${escapeHtml(item.studentId)}</small></span></span></td>
        <td>${escapeHtml(item.period)}</td>
        <td>${escapeHtml(money(item.amount))}</td>
        <td>${escapeHtml(item.method)}</td>
        <td><span class="status-pill ${paymentPillClass(item.status)}">${escapeHtml(item.status)}</span></td>
        <td>${item.status === 'Pagado'
          ? `<button class="table-action" type="button" data-receipt="${escapeHtml(item.id)}">Recibo</button>`
          : `<button class="table-action" type="button" data-collect="${escapeHtml(item.studentId)}">Registrar</button>`}</td>
      </tr>`;
    }).join('')}</tbody>
  </table></div>`;
}

function renderAdminStudents() {
  const query = studentSearchQuery.trim().toLowerCase();
  const filtered = state.students.filter((student) => !query
    || student.name.toLowerCase().includes(query)
    || student.id.toLowerCase().includes(query));
  return `
    <header class="page-heading">
      <div><p class="eyebrow">Base de alumnos</p><h1>Personas,<br/>no expedientes.</h1><p>Datos ficticios para validar la experiencia de gestión.</p></div>
      <div class="heading-actions"><button class="button button--red" type="button" data-open-student>+ Nuevo alumno</button></div>
    </header>
    <div class="section-head">
      <label class="search-box">
        <span aria-hidden="true">⌕</span>
        <span class="sr-only">Buscar alumno por nombre o carné</span>
        <input id="studentSearch" type="search" placeholder="Buscar por nombre o carné" autocomplete="off" value="${escapeHtml(studentSearchQuery)}" />
      </label>
      <span class="tag">${state.students.length} registros</span>
    </div>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th scope="col">Alumno</th><th scope="col">Plan</th><th scope="col">Teléfono</th><th scope="col">Estado</th><th scope="col">Acción</th></tr></thead>
      <tbody>${filtered.length ? filtered.map((student) => `
        <tr>
          <td><span class="person-cell"><span class="avatar">${escapeHtml(initials(student.name))}</span><span><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.id)} · ${escapeHtml(student.level)}</small></span></span></td>
          <td>${escapeHtml(student.plan)}</td>
          <td>${escapeHtml(student.phone)}</td>
          <td><span class="status-pill ${student.status === 'active' ? 'is-paid' : 'is-late'}">${student.status === 'active' ? 'Activo' : 'Suspendido'}</span></td>
          <td><button class="table-action" type="button" data-student-detail="${escapeHtml(student.id)}">Ver ficha</button></td>
        </tr>`).join('') : '<tr><td colspan="5">Ningún alumno coincide con la búsqueda.</td></tr>'}</tbody>
    </table></div>
  `;
}

function renderAdminPayments() {
  const period = monthKey(TODAY);
  const all = state.payments.filter((item) => item.period === period);
  const rows = paymentFilter === 'all' ? all : all.filter((item) => item.status === paymentFilter);
  const collected = all.filter((item) => item.status === 'Pagado').reduce((sum, item) => sum + item.amount, 0);
  const owed = all.filter((item) => item.status !== 'Pagado').reduce((sum, item) => sum + item.amount, 0);
  return `
    <header class="page-heading">
      <div><p class="eyebrow">Control de pagos</p><h1>Registrar.<br/>Conciliar. Listo.</h1><p>Solo registra cobros hechos fuera del sistema: no procesa tarjetas ni emite FEL.</p></div>
      <div class="heading-actions"><button class="button button--red" type="button" data-open-payment>+ Registrar pago</button></div>
    </header>
    <section class="split-grid" style="margin-bottom:28px">
      <article class="surface-card"><p class="eyebrow">Cobrado en ${escapeHtml(currentPeriodLabel())}</p><p class="payment-amount">${escapeHtml(money(collected))}</p><p class="payment-meta">Suma de los pagos marcados como pagados.</p></article>
      <article class="surface-card"><p class="eyebrow">Pendiente y mora</p><p class="payment-amount">${escapeHtml(money(owed))}</p><p class="payment-meta">Requiere seguimiento de recepción.</p></article>
    </section>
    <div class="filter-row" role="group" aria-label="Filtrar pagos">
      ${['all', 'Pendiente', 'Mora', 'Pagado'].map((value) => `
        <button class="filter-chip ${paymentFilter === value ? 'is-active' : ''}" type="button" data-payment-filter="${value}">${value === 'all' ? 'Todos' : value}</button>`).join('')}
    </div>
    ${paymentTable(rows)}
  `;
}

function renderAdminAttendance() {
  const rows = classData.map((item) => {
    const lastDate = previousDateFor(item.weekday);
    const present = attendanceFor(item.id, lastDate).length;
    const roster = rosterFor(item.id).length;
    return { item, lastDate, present, roster };
  });
  return `
    <header class="page-heading"><div><p class="eyebrow">Asistencia</p><h1>Quién vino.<br/>Quién no.</h1><p>Resumen de la última sesión registrada de cada clase.</p></div></header>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th scope="col">Clase</th><th scope="col">Maestro</th><th scope="col">Última sesión</th><th scope="col">Asistencia</th></tr></thead>
      <tbody>${rows.map(({ item, lastDate, present, roster }) => `
        <tr>
          <td><strong>${escapeHtml(item.name)}</strong><br/><small>${escapeHtml(item.room)} · ${escapeHtml(item.time)}</small></td>
          <td>${escapeHtml(item.teacher)}</td>
          <td>${escapeHtml(shortDate(lastDate))}</td>
          <td><span class="status-pill ${present >= roster * 0.7 ? 'is-paid' : 'is-pending'}">${present}/${roster}</span></td>
        </tr>`).join('')}</tbody>
    </table></div>
    <section class="section">
      <div class="section-head"><div><h2>Alertas</h2><p>Alumnos con dos o más ausencias recientes.</p></div></div>
      ${absenceAlerts().length ? `<div class="cards-grid">${absenceAlerts().map((alert) => `
        <article class="compact-card">
          <p class="eyebrow">${escapeHtml(alert.misses)} ausencias</p>
          <h3>${escapeHtml(alert.student.name)}</h3>
          <p class="payment-meta">${escapeHtml(alert.student.phone)}</p>
        </article>`).join('')}</div>` : '<div class="empty-state"><strong>Todo al día</strong>Sin ausencias consecutivas.</div>'}
    </section>
  `;
}

/* ---------------------------------------------------------------- encargado */

function renderGuardianHome() {
  const guardian = currentGuardian();
  const kids = childrenOf(guardian);
  return `
    <header class="page-heading"><div><p class="eyebrow">Portal de encargado</p><h1>${escapeHtml(greeting())}, ${escapeHtml(guardian.name.split(' ')[0])}.</h1><p>Solo ves la información de ${kids.length === 1 ? 'tu hijo' : `tus ${escapeHtml(kids.length)} hijos`}.</p></div></header>
    <div class="cards-grid">
      ${kids.map((child) => {
        const payment = paymentFor(child.id);
        const next = upcomingClassesForStudent(child.id)[0];
        return `<article class="compact-card">
          <span class="person-cell"><span class="avatar">${escapeHtml(initials(child.name))}</span><span><strong>${escapeHtml(child.name)}</strong><small>${escapeHtml(child.id)} · ${escapeHtml(child.level)}</small></span></span>
          <p class="payment-meta">Próxima clase: ${next ? escapeHtml(`${next.name} · ${WEEKDAY_SHORT[next.weekday]} ${next.time}`) : 'sin asignar'}</p>
          <p class="payment-meta">${escapeHtml(attendedThisMonth(child.id))} clases este mes</p>
          <span class="status-pill ${paymentPillClass(payment?.status)}">${escapeHtml(payment?.status || 'Sin registro')}</span>
        </article>`;
      }).join('')}
    </div>
    <section class="section">
      <div class="section-head"><div><h2>Horario de la familia</h2></div></div>
      ${scheduleList(kids.flatMap((child) => classesForStudent(child.id)))}
    </section>
  `;
}

function renderGuardianPayments() {
  const kids = childrenOf(currentGuardian());
  const total = kids.reduce((sum, child) => sum + (paymentFor(child.id)?.amount ?? planByName(child.plan).price), 0);
  return `
    <header class="page-heading"><div><p class="eyebrow">Pagos de la familia</p><h1>Un solo lugar.<br/>Todas las cuotas.</h1><p>Los pagos se hacen en recepción; acá solo ves el estado.</p></div></header>
    <article class="surface-card" style="margin-bottom:24px">
      <p class="eyebrow">Total ${escapeHtml(currentPeriodLabel())}</p>
      <p class="payment-amount">${escapeHtml(money(total))}</p>
      <p class="payment-meta">${escapeHtml(plural(kids.length, 'alumno', 'alumnos'))} a tu cargo</p>
    </article>
    <div class="split-grid">${kids.map(paymentCardMarkup).join('')}</div>
  `;
}

function renderGuardianCards() {
  const kids = childrenOf(currentGuardian());
  if (!kids.some((child) => child.id === activeChildId)) activeChildId = kids[0]?.id;
  const child = studentById(activeChildId);
  return `
    <header class="page-heading"><div><p class="eyebrow">Carnés</p><h1>Sus credenciales.<br/>En tu teléfono.</h1></div></header>
    <div class="filter-row" role="group" aria-label="Elegir hijo">
      ${kids.map((kid) => `<button class="filter-chip ${kid.id === activeChildId ? 'is-active' : ''}" type="button" data-child="${escapeHtml(kid.id)}">${escapeHtml(kid.name.split(' ')[0])}</button>`).join('')}
    </div>
    ${child ? `<div class="member-card-wrap">${memberCardMarkup(child)}
      <aside class="surface-card">
        <p class="eyebrow">Datos de contacto</p>
        <h2>${escapeHtml(child.name)}</h2>
        <p class="payment-meta">Encargado: ${escapeHtml(currentGuardian().name)} · ${escapeHtml(currentGuardian().phone)}</p>
        <p class="payment-meta">Clases: ${escapeHtml(classesForStudent(child.id).map((item) => item.name).join(', ') || 'sin asignar')}</p>
      </aside></div>` : '<div class="empty-state"><strong>Sin alumnos</strong>No hay carnés vinculados a esta cuenta.</div>'}
  `;
}

function plural(count, one, many) {
  return `${count} ${count === 1 ? one : many}`;
}

/* ------------------------------------------------------------------ modales */

function openModal({ title, eyebrow = 'Acción demo', body }) {
  lastFocusedElement = document.activeElement;
  elements.modalTitle.textContent = title;
  elements.modalEyebrow.textContent = eyebrow;
  elements.modalBody.innerHTML = body;
  elements.modalLayer.classList.remove('is-hidden');
  elements.modalLayer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  const focusable = elements.modalBody.querySelector('input, select, textarea, button');
  (focusable || elements.modalLayer.querySelector('.modal')).focus({ preventScroll: true });
}

function closeModal() {
  elements.modalLayer.classList.add('is-hidden');
  elements.modalLayer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  elements.modalBody.innerHTML = '';
  if (lastFocusedElement?.isConnected) lastFocusedElement.focus({ preventScroll: true });
}

function showToast(title, detail = '') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<strong>${escapeHtml(title)}</strong>${detail ? `<span>${escapeHtml(detail)}</span>` : ''}`;
  elements.toastRegion.appendChild(toast);
  setTimeout(() => toast.remove(), 4200);
}

function openPaymentModal(studentId = null) {
  const options = state.students.map((student) => `<option value="${escapeHtml(student.id)}" ${student.id === studentId ? 'selected' : ''}>${escapeHtml(student.name)} · ${escapeHtml(student.id)}</option>`).join('');
  const selected = studentById(studentId) || state.students[0];
  openModal({
    title: 'Registrar pago',
    eyebrow: 'Administración',
    body: `
      <form id="paymentForm" class="form-grid">
        <label class="field field--wide"><span>Alumno</span><select name="studentId" id="paymentStudent">${options}</select></label>
        <label class="field"><span>Período</span><input type="month" name="period" value="${escapeHtml(monthKey(TODAY))}" required /></label>
        <label class="field"><span>Monto (Q)</span><input type="number" name="amount" min="0" step="5" value="${escapeHtml(planByName(selected?.plan).price)}" required /></label>
        <label class="field"><span>Método</span><select name="method"><option>Transferencia</option><option>Efectivo</option><option>Tarjeta</option></select></label>
        <label class="field"><span>Referencia</span><input type="text" name="reference" placeholder="Opcional" /></label>
        <p class="modal-note field--wide">Demo local: el pago se guarda solo en este navegador. No se emite factura ni se cobra en línea.</p>
        <div class="form-actions field--wide">
          <button class="button button--ghost" type="button" data-close-modal>Cancelar</button>
          <button class="button button--red" type="submit">Guardar pago</button>
        </div>
      </form>`,
  });
}

function openStudentModal() {
  openModal({
    title: 'Nuevo alumno',
    eyebrow: 'Administración',
    body: `
      <form id="studentForm" class="form-grid">
        <label class="field field--wide"><span>Nombre completo</span><input type="text" name="name" required placeholder="Nombre y apellido" /></label>
        <label class="field"><span>Teléfono</span><input type="tel" name="phone" placeholder="0000 0000" /></label>
        <label class="field"><span>Nivel</span><select name="level"><option>Principiante</option><option>Intermedio</option><option>Avanzado</option><option>Infantil</option><option>Teens</option></select></label>
        <label class="field"><span>Plan</span><select name="plan">${membershipPlans.map((plan) => `<option value="${escapeHtml(plan.planName)}">${escapeHtml(plan.planName)} · ${escapeHtml(money(plan.price))}</option>`).join('')}</select></label>
        <label class="field"><span>Clase inicial</span><select name="classId">${classData.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} · ${escapeHtml(WEEKDAY_SHORT[item.weekday])} ${escapeHtml(item.time)}</option>`).join('')}</select></label>
        <p class="modal-note field--wide">Se genera un número de carné nuevo y se crea la cuota del mes en estado pendiente.</p>
        <div class="form-actions field--wide">
          <button class="button button--ghost" type="button" data-close-modal>Cancelar</button>
          <button class="button button--red" type="submit">Crear alumno</button>
        </div>
      </form>`,
  });
}

function openStudentDetail(studentId) {
  const student = studentById(studentId);
  if (!student) return;
  const payment = paymentFor(student.id);
  openModal({
    title: student.name,
    eyebrow: `${student.id} · ${student.level}`,
    body: `
      <div class="split-grid">
        <article class="surface-card">
          <p class="eyebrow">Plan</p>
          <p class="payment-amount">${escapeHtml(planByName(student.plan).planName)}</p>
          <p class="payment-meta">${escapeHtml(planByName(student.plan).detail)} · ${escapeHtml(money(planByName(student.plan).price))}</p>
        </article>
        <article class="surface-card">
          <p class="eyebrow">${escapeHtml(currentPeriodLabel())}</p>
          <p class="payment-amount">${escapeHtml(money(payment?.amount ?? planByName(student.plan).price))}</p>
          <span class="status-pill ${paymentPillClass(payment?.status)}">${escapeHtml(payment?.status || 'Sin registro')}</span>
        </article>
      </div>
      <p class="payment-meta">Teléfono: ${escapeHtml(student.phone)}</p>
      <p class="payment-meta">Clases: ${escapeHtml(classesForStudent(student.id).map((item) => `${item.name} (${WEEKDAY_SHORT[item.weekday]} ${item.time})`).join(', ') || 'sin asignar')}</p>
      <p class="payment-meta">Asistencias este mes: ${escapeHtml(attendedThisMonth(student.id))}</p>
      <div class="form-actions">
        <button class="button button--ghost" type="button" data-toggle-status="${escapeHtml(student.id)}">${student.status === 'active' ? 'Suspender' : 'Reactivar'}</button>
        <button class="button button--red" type="button" data-collect="${escapeHtml(student.id)}">Registrar pago</button>
      </div>`,
  });
}

function openClassDetail(classId) {
  const item = findClass(classId);
  if (!item) return;
  const roster = rosterFor(classId);
  openModal({
    title: item.name,
    eyebrow: `${WEEKDAY_SHORT[item.weekday]} ${item.time} · ${item.room}`,
    body: `
      <p class="payment-meta">Maestro: ${escapeHtml(item.teacher)}</p>
      <p class="payment-meta">Cupo: ${roster.length} de ${item.capacity}</p>
      <p class="payment-meta">Próxima sesión: ${escapeHtml(longDate(nextDateFor(item.weekday)))}</p>
      <h3 style="margin-top:18px">Lista</h3>
      <div class="attendance-roster">
        ${roster.length ? roster.map((student) => `
          <div class="attendance-line"><span class="person-cell"><span class="avatar">${escapeHtml(initials(student.name))}</span><span><strong>${escapeHtml(student.name)}</strong><small>${escapeHtml(student.id)}</small></span></span></div>`).join('')
          : '<p class="payment-meta">Nadie inscrito todavía.</p>'}
      </div>`,
  });
}

function openReceipt(paymentId) {
  const payment = state.payments.find((item) => item.id === paymentId);
  if (!payment) return;
  const student = studentById(payment.studentId);
  openModal({
    title: 'Recibo demo',
    eyebrow: payment.id,
    body: `
      <article class="surface-card">
        <p class="eyebrow">${escapeHtml(payment.period)}</p>
        <p class="payment-amount">${escapeHtml(money(payment.amount))}</p>
        <p class="payment-meta">${escapeHtml(student?.name || payment.studentId)} · ${escapeHtml(payment.method)}<br/>Pagado el ${escapeHtml(payment.paidAt || '—')}</p>
      </article>
      <p class="modal-note">Comprobante de demostración. No tiene validez fiscal ni se envía por correo.</p>`,
  });
}

function openProfile() {
  const config = roleConfig[activeRole];
  openModal({
    title: config.person,
    eyebrow: config.label,
    body: `
      <p class="payment-meta">Perfil de demostración. Cambiá de rol desde el selector de la barra superior para ver la app con otros permisos.</p>
      <div class="form-actions">
        <button class="button button--ghost" type="button" id="profileExit">Cambiar acceso</button>
        <button class="button button--red" type="button" id="profileReset">Reiniciar demo</button>
      </div>`,
  });
}

function openResetModal() {
  openModal({
    title: 'Reiniciar la demo',
    eyebrow: 'Datos locales',
    body: `
      <p class="payment-meta">Se borran los pagos, alumnos y asistencias que registraste en este navegador y vuelven los datos de muestra.</p>
      <div class="form-actions">
        <button class="button button--ghost" type="button" data-close-modal>Cancelar</button>
        <button class="button button--red" type="button" id="confirmReset">Sí, reiniciar</button>
      </div>`,
  });
}

/* -------------------------------------------------------------------- acciones */

function registerPayment({ studentId, period, amount, method, reference }) {
  const student = studentById(studentId);
  if (!student) return;
  const existing = state.payments.find((item) => item.studentId === studentId && item.period === period);
  if (existing && existing.status === 'Pagado') {
    showToast('Ya estaba pagado', `${student.name} no tiene saldo para ${period}.`);
    return;
  }
  const record = {
    id: existing?.id || nextPaymentId(),
    studentId,
    period,
    amount: Number(amount),
    method,
    reference: reference || '',
    status: 'Pagado',
    paidAt: dayKey(TODAY),
  };
  if (existing) Object.assign(existing, record);
  else state.payments.push(record);
  persistState();
  renderApp();
  showToast('Pago registrado', `${student.name} · ${money(record.amount)}`);
}

function createStudent({ name, phone, level, plan, classId }) {
  const student = {
    id: nextStudentId(),
    name: name.trim(),
    plan,
    phone: phone.trim() || '—',
    level,
    classes: classId ? [classId] : [],
    status: 'active',
  };
  state.students.push(student);
  state.payments.push({
    id: nextPaymentId(),
    studentId: student.id,
    period: monthKey(TODAY),
    amount: planByName(plan).price,
    method: '—',
    status: 'Pendiente',
    paidAt: null,
  });
  persistState();
  renderApp();
  showToast('Alumno creado', `${student.name} · carné ${student.id}`);
}

function saveAttendance(classId, ids) {
  const key = dayKey(TODAY);
  state.attendanceLog = state.attendanceLog.filter((entry) => !(entry.classId === classId && entry.at === key));
  ids.forEach((studentId) => state.attendanceLog.push({ studentId, classId, at: key }));
  persistState();
  renderApp();
  showToast('Asistencia guardada', `${plural(ids.length, 'alumno presente', 'alumnos presentes')} · ${shortDate(TODAY)}`);
}

function toggleStudentStatus(studentId) {
  const student = studentById(studentId);
  if (!student) return;
  student.status = student.status === 'active' ? 'suspended' : 'active';
  persistState();
  closeModal();
  renderApp();
  showToast(student.status === 'active' ? 'Alumno reactivado' : 'Alumno suspendido', student.name);
}

function resetDemo() {
  localStorage.removeItem(STORAGE_KEY);
  state = createDefaultState();
  activeRoute = 'inicio';
  closeModal();
  renderApp();
  showToast('Demo reiniciada', 'Volvieron los datos de muestra.');
}

/* --------------------------------------------------------------------- eventos */

document.addEventListener('click', (event) => {
  const roleButton = event.target.closest('[data-enter-role]');
  if (roleButton) {
    enterDemo(roleButton.dataset.enterRole);
    return;
  }

  const navButton = event.target.closest('[data-route]');
  if (navButton) {
    routeTo(navButton.dataset.route);
    return;
  }

  const goButton = event.target.closest('[data-go]');
  if (goButton) {
    routeTo(goButton.dataset.go);
    return;
  }

  if (event.target.closest('[data-close-modal]')) {
    closeModal();
    return;
  }

  const classCard = event.target.closest('[data-class]');
  if (classCard) {
    openClassDetail(classCard.dataset.class);
    return;
  }

  const classFilter = event.target.closest('[data-class-filter]');
  if (classFilter) {
    activeClassId = classFilter.dataset.classFilter;
    renderApp();
    return;
  }

  const childChip = event.target.closest('[data-child]');
  if (childChip) {
    activeChildId = childChip.dataset.child;
    renderApp();
    return;
  }

  const filterChip = event.target.closest('[data-payment-filter]');
  if (filterChip) {
    paymentFilter = filterChip.dataset.paymentFilter;
    renderApp();
    return;
  }

  if (event.target.closest('[data-open-payment]')) {
    openPaymentModal();
    return;
  }

  if (event.target.closest('[data-open-student]')) {
    openStudentModal();
    return;
  }

  const collect = event.target.closest('[data-collect]');
  if (collect) {
    openPaymentModal(collect.dataset.collect);
    return;
  }

  const receipt = event.target.closest('[data-receipt]');
  if (receipt) {
    openReceipt(receipt.dataset.receipt);
    return;
  }

  const detail = event.target.closest('[data-student-detail]');
  if (detail) {
    openStudentDetail(detail.dataset.studentDetail);
    return;
  }

  const toggle = event.target.closest('[data-toggle-status]');
  if (toggle) {
    toggleStudentStatus(toggle.dataset.toggleStatus);
    return;
  }

  if (event.target.closest('#menuButton')) {
    setMenuOpen(!elements.sidebar.classList.contains('is-open'));
    return;
  }

  if (event.target.closest('#profileButton')) {
    openProfile();
    return;
  }

  if (event.target.closest('#profileExit')) {
    closeModal();
    leaveDemo();
    return;
  }

  if (event.target.closest('#profileReset') || event.target.closest('#resetDemo')) {
    openResetModal();
    return;
  }

  if (event.target.closest('#confirmReset')) {
    resetDemo();
    return;
  }

  if (event.target.closest('#exitDemo')) {
    leaveDemo();
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target;

  if (form.id === 'paymentForm') {
    event.preventDefault();
    const data = new FormData(form);
    registerPayment({
      studentId: data.get('studentId'),
      period: data.get('period'),
      amount: data.get('amount'),
      method: data.get('method'),
      reference: data.get('reference'),
    });
    closeModal();
    return;
  }

  if (form.id === 'studentForm') {
    event.preventDefault();
    const data = new FormData(form);
    if (!String(data.get('name')).trim()) return;
    createStudent({
      name: data.get('name'),
      phone: data.get('phone') || '',
      level: data.get('level'),
      plan: data.get('plan'),
      classId: data.get('classId'),
    });
    closeModal();
    return;
  }

  if (form.id === 'attendanceForm') {
    event.preventDefault();
    const ids = Array.from(form.querySelectorAll('input[name="present"]:checked')).map((input) => input.value);
    saveAttendance(activeClassId, ids);
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'studentSearch') {
    studentSearchQuery = event.target.value;
    const caret = event.target.selectionStart;
    renderApp();
    const field = document.querySelector('#studentSearch');
    if (field) {
      field.focus();
      field.setSelectionRange(caret, caret);
    }
  }
  if (event.target.id === 'paymentStudent') {
    const student = studentById(event.target.value);
    const amount = document.querySelector('#paymentForm input[name="amount"]');
    if (student && amount) amount.value = planByName(student.plan).price;
  }
});

document.addEventListener('change', (event) => {
  if (event.target.id === 'roleSwitcher') {
    activeRole = event.target.value;
    activeRoute = 'inicio';
    persistState();
    renderApp();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    if (!elements.modalLayer.classList.contains('is-hidden')) closeModal();
    else setMenuOpen(false);
  }
});

elements.content.addEventListener('keydown', (event) => {
  const card = event.target.closest('[data-class]');
  if (card && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    openClassDetail(card.dataset.class);
  }
});

/* ---------------------------------------------------------------------- arranque */

setTimeout(() => elements.intro?.remove(), 3200);
updateShell();
