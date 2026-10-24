import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    @if (role === 'USUARIO') {
      <section class="page-head">
        <div>
          <span class="eyebrow">PORTAL DEL CLIENTE</span>
          <h2>Hola, {{ name || 'Cliente' }}</h2>
          <p>Tu progreso, entrenamiento y acceso en un solo lugar.</p>
        </div>
        <button class="icon-button" type="button" (click)="navigate.emit('progreso')">↗</button>
      </section>

      <section class="dashboard-grid user-dashboard-grid">
        <article class="membership-hero"><div><span class="eyebrow">MEMBRESÍA ACTUAL <span class="status-pill active">Activa</span></span><h3>Plan Mensual</h3><p>Vence el 30/09/2026 · 18 días restantes</p><button class="hero-link" type="button" (click)="navigate.emit('membresias')">Ver detalle →</button></div><span class="hero-icon">♛</span></article>
        <article class="panel qr-card"><div class="panel-head"><div><span>MI QR DE ACCESO</span><small>Preséntalo en la entrada</small></div><span class="status-dot"></span></div><div class="qr-frame"><span class="qr-corner top-left"></span><span class="qr-corner top-right"></span><span class="qr-corner bottom-left"></span><span class="qr-corner bottom-right"></span><div class="qr-svg" aria-label="Código QR de acceso">▦<b>MAX</b></div><i class="qr-scan-line"></i></div><div class="qr-meta"><span>Jorge Medina</span><span><i class="status-dot"></i>Activo</span></div><small>Válido para tu membresía actual</small><button class="secondary-button full" type="button" (click)="action.emit('scan-qr')">Ampliar QR</button></article>
        <article class="panel progress-card"><div class="panel-head"><span>MI PROGRESO</span><strong>72.5 <small>kg</small></strong></div><div class="line-chart"><svg viewBox="0 0 400 100" preserveAspectRatio="none"><polyline points="0,18 95,34 190,56 285,72 400,82" fill="none" stroke="#ff7a00" stroke-width="3"/><circle cx="0" cy="18" r="4"/><circle cx="95" cy="34" r="4"/><circle cx="190" cy="56" r="4"/><circle cx="285" cy="72" r="4"/><circle cx="400" cy="82" r="4"/></svg></div><div class="chart-labels"><small>Jun</small><small>Jul</small><small>Ago</small><small>Sep</small></div><div class="progress-foot"><span class="positive">−2.8 kg</span><button class="text-action" type="button" (click)="navigate.emit('progreso')">Ver progreso →</button></div></article>
        <article class="panel measure-card"><div class="panel-head"><span>MEDIDAS CORPORALES</span><span class="muted">Última medición</span></div><div class="measure-row"><span>Cintura</span><i class="progress-line"><i style="width:72%"></i></i><b>82 cm</b></div><div class="measure-row"><span>Pecho</span><i class="progress-line"><i style="width:84%"></i></i><b>98 cm</b></div><div class="measure-row"><span>Brazo</span><i class="progress-line"><i style="width:66%"></i></i><b>36 cm</b></div><button class="text-action" type="button" (click)="navigate.emit('progreso')">Ver todas las medidas →</button></article>
        <article class="panel load-panel"><div class="panel-head"><div><span>CARGA ACTUAL DE ENTRENAMIENTO</span><small>Última sesión · Fuerza e hipertrofia</small></div><button class="text-action" type="button" (click)="navigate.emit('entrenamiento')">Ver plan completo →</button></div><div class="load-grid"><div><span>Prensa inclinada</span><strong>80 kg</strong><small>4 × 12 · +10 kg</small></div><div><span>Press de pecho</span><strong>50 kg</strong><small>4 × 10 · +5 kg</small></div><div><span>Jalón al pecho</span><strong>45 kg</strong><small>4 × 10 · +5 kg</small></div><div><span>Remo sentado</span><strong>45 kg</strong><small>3 × 12 · +5 kg</small></div></div></article>
      </section>
    } @else if (role === 'PROPIETARIO') {
      <section class="page-head">
        <div><span class="eyebrow">PANEL DEL PROPIETARIO</span><h2>El negocio en una mirada</h2><p>Resultados y decisiones clave de Max Fit.</p></div>
        <span class="date-chip">Hoy · 23 oct 2026</span>
      </section>

      <section class="owner-kpi-grid">
        <article class="owner-kpi"><span>INGRESOS DEL MES</span><strong>S/ 42,680</strong><small class="positive">▲ 12.4% vs. mes anterior</small></article>
        <article class="owner-kpi"><span>CLIENTES ACTIVOS</span><strong>428</strong><small class="positive">▲ 8.6% crecimiento</small></article>
        <article class="owner-kpi"><span>RENOVACIÓN</span><strong>84.2%</strong><small class="positive">▲ 3.2 puntos</small></article>
        <article class="owner-kpi"><span>OCUPACIÓN PROMEDIO</span><strong>68%</strong><small class="muted">Meta mensual: 75%</small></article>
      </section>

      <section class="owner-dashboard-grid">
        <article class="panel owner-revenue-panel">
          <div class="panel-head"><span>INGRESOS Y MEMBRESÍAS</span><button class="select-chip" type="button">Últimos 6 meses⌄</button></div>
          <div class="revenue-chart" aria-label="Gráfico de ingresos"><span style="height:42%"></span><span style="height:54%"></span><span style="height:49%"></span><span style="height:68%"></span><span style="height:76%"></span><span style="height:92%"></span></div>
          <div class="chart-labels"><small>May</small><small>Jun</small><small>Jul</small><small>Ago</small><small>Sep</small><small>Oct</small></div>
          <div class="owner-revenue-legend"><span><i class="legend-dot orange"></i>Ingresos</span><span><i class="legend-dot green"></i>Renovaciones</span></div>
        </article>
        <article class="panel owner-alerts-panel"><div class="panel-head"><span>ATENCIÓN REQUERIDA</span><span class="alert-count">4</span></div><div class="alert-list"><div><b>28</b><span>Membresías por vencer</span><button type="button" (click)="navigate.emit('membresias')">Revisar →</button></div><div><b>7</b><span>Pagos pendientes</span><button type="button" (click)="navigate.emit('pagos')">Revisar →</button></div><div><b>3</b><span>Clases con baja asistencia</span><button type="button" (click)="navigate.emit('clases')">Ver clases →</button></div></div></article>
      </section>
      <section class="owner-lower-grid"><article class="panel"><div class="panel-head"><span>ACTIVIDAD RECIENTE</span><button class="text-action" type="button" (click)="navigate.emit('clientes')">Ver todo →</button></div><div class="owner-activity"><div><i class="activity-dot green"></i><span><b>Nuevo cliente registrado</b><small>María Fernanda · hace 8 min</small></span><strong>+1</strong></div><div><i class="activity-dot orange"></i><span><b>Pago recibido</b><small>Plan trimestral · hace 22 min</small></span><strong>S/ 300</strong></div><div><i class="activity-dot blue"></i><span><b>Rutina actualizada</b><small>Tren superior · hace 1 h</small></span><strong>OK</strong></div></div></article><article class="panel owner-actions"><div class="panel-head"><span>ACCESOS RÁPIDOS</span></div><button type="button" (click)="navigate.emit('clientes')"><span>＋</span> Gestionar clientes</button><button type="button" (click)="navigate.emit('pagos')"><span>S/</span> Revisar pagos</button><button type="button" (click)="navigate.emit('reportes')"><span>↗</span> Ver reportes</button></article></section>
    } @else {
      <section class="page-head">
        <div><span class="eyebrow">CONTROL OPERATIVO</span><h2>Dashboard del operador</h2><p>Lo importante de tu turno, en un solo vistazo.</p></div>
        <span class="date-chip">Turno activo · Hoy</span>
      </section>

      <section class="metric-grid">
        <article class="metric-card"><span class="metric-icon orange">♙</span><div><small>CLIENTES ACTIVOS</small><strong>428</strong><em class="positive">+12% este mes</em></div></article>
        <article class="metric-card"><span class="metric-icon green">S/</span><div><small>PAGOS DEL DÍA</small><strong>S/ 1,240</strong><em class="positive">12 pagos registrados</em></div></article>
        <article class="metric-card"><span class="metric-icon blue">↔</span><div><small>ACCESOS HOY</small><strong>186</strong><em class="positive">94% membresías activas</em></div></article>
        <article class="metric-card"><span class="metric-icon purple">◷</span><div><small>CLASES DE HOY</small><strong>36</strong><em class="muted">4 próximas en agenda</em></div></article>
      </section>

      <section class="operator-dashboard-grid">
        <article class="panel"><div class="panel-head"><span>CAJA Y COBRANZAS</span><span class="status-pill active">Abierta</span></div><div class="operator-queue"><div class="operator-queue-row"><span class="operator-queue-icon">S/</span><div><strong>S/ 1,240 recaudados</strong><small>12 pagos · último hace 6 min</small></div><b class="positive">+18%</b></div><div class="operator-queue-row"><span class="operator-queue-icon">!</span><div><strong>7 pagos pendientes</strong><small>Requieren seguimiento hoy</small></div><button class="text-action" type="button" (click)="navigate.emit('pagos')">Ver →</button></div></div><div class="panel-actions"><button class="primary-button compact" type="button" (click)="action.emit('new-payment')">Registrar pago</button><button class="secondary-button compact" type="button" (click)="action.emit('voice-payment')">Pago por voz</button></div></article>
        <article class="panel"><div class="panel-head"><span>ACCESOS EN TIEMPO REAL</span><button class="text-action" type="button" (click)="navigate.emit('accesos')">Ver todos →</button></div><div class="live-access"><div><strong>42</strong><small>personas dentro</small></div><div><strong class="positive">186</strong><small>accesos hoy</small></div><div><strong class="negative">7</strong><small>denegados</small></div></div><div class="access-bar"><span style="width:78%"></span></div><small class="muted">Último ingreso: Carlos Mendoza · hace 2 min</small></article>
        <article class="panel"><div class="panel-head"><span>AGENDA DE HOY</span><button class="text-action" type="button" (click)="navigate.emit('clases')">Ver agenda →</button></div><div class="operator-schedule"><div><span class="schedule-time">08:00</span><span><strong>Funcional</strong><small>Sala principal · 12/18 inscritos</small></span><i class="status-pill active">En curso</i></div><div><span class="schedule-time">10:30</span><span><strong>Musculación guiada</strong><small>Zona de pesas · 8/12 inscritos</small></span><i class="status-pill">Próxima</i></div><div><span class="schedule-time">18:00</span><span><strong>HIIT</strong><small>Sala grupal · 16/20 inscritos</small></span><i class="status-pill">Próxima</i></div></div></article>
        <article class="panel"><div class="panel-head"><span>SEGUIMIENTO PENDIENTE</span><span class="alert-count">35</span></div><div class="operator-follow-up"><button type="button" (click)="navigate.emit('membresias')"><b>28</b><span>Membresías por vencer<small>En los próximos 7 días</small></span><strong>→</strong></button><button type="button" (click)="navigate.emit('clientes')"><b>7</b><span>Clientes sin medición<small>Actualizar peso y medidas</small></span><strong>→</strong></button></div></article>
      </section>

      <section class="operator-quick-actions"><button type="button" (click)="action.emit('new-client')"><span>＋</span><div><strong>Nuevo cliente</strong><small>Registrar y asignar plan</small></div></button><button type="button" (click)="action.emit('new-payment')"><span>S/</span><div><strong>Registrar pago</strong><small>Actualizar membresía</small></div></button><button type="button" (click)="action.emit('voice-payment')"><span>◉</span><div><strong>Pago por voz</strong><small>Registro rápido</small></div></button><button type="button" (click)="navigate.emit('entrenamiento')"><span>⚡</span><div><strong>Entrenamiento</strong><small>Rutinas del día</small></div></button></section>

      <section class="operator-activity-grid"><article class="panel"><div class="panel-head"><span>ACTIVIDAD RECIENTE</span><button class="text-action" type="button" (click)="navigate.emit('clientes')">Ver todo →</button></div><div class="operator-activity-row"><i class="activity-dot green"></i><div><strong>Nuevo cliente registrado</strong><small>María Fernanda · Plan mensual</small></div><span class="muted">hace 8 min</span></div><div class="operator-activity-row"><i class="activity-dot orange"></i><div><strong>Pago recibido</strong><small>Jorge Salazar · S/ 120</small></div><span class="muted">hace 22 min</span></div><div class="operator-activity-row"><i class="activity-dot blue"></i><div><strong>Acceso validado</strong><small>Carlos Mendoza · membresía activa</small></div><span class="muted">hace 35 min</span></div></article><article class="panel"><div class="panel-head"><span>RECORDATORIO DEL TURNO</span></div><div class="operator-reminder"><span class="operator-queue-icon">✓</span><div><strong>Cierre de caja a las 22:00</strong><small>Verifica pagos en efectivo y tarjeta antes de finalizar tu turno.</small></div></div><button class="secondary-button full" type="button" (click)="navigate.emit('pagos')">Revisar movimientos</button></article></section>
    }
  `
})
export class DashboardComponent {
  @Input() role = '';
  @Input() name = '';
  @Output() navigate = new EventEmitter<string>();
  @Output() action = new EventEmitter<string>();
}
