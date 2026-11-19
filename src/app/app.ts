import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppShellComponent } from './components/intranet/app-shell/app-shell.component';
import { DashboardComponent } from './components/intranet/dashboard/dashboard.component';
import { FormHostComponent, FormSubmission } from './components/intranet/form-host/form-host.component';
import { LoginComponent } from './components/intranet/login/login.component';
import { ModulePageComponent } from './components/intranet/module-page/module-page.component';
import { UserTrainingComponent } from './components/intranet/user-training/user-training.component';
import { UserProgressComponent } from './components/intranet/user-progress/user-progress.component';
import { UserPaymentComponent, UserPaymentSubmission } from './components/intranet/user-payment/user-payment.component';
import { PaymentInboxComponent } from './components/intranet/payment-inbox/payment-inbox.component';
import { LoadFormComponent } from './components/intranet/load-form/load-form.component';
import { QrViewerComponent } from './components/intranet/qr-viewer/qr-viewer.component';
import { DetailPageComponent } from './components/intranet/detail-page/detail-page.component';
import { DemoStoreService } from './services/demo-store.service';
import { AuthService } from './services/auth.service';
import { ShopComponent } from './components/public/shop/shop.component';
import { LandingComponent } from './components/public/landing/landing.component';
import { ContactComponent, ContactInquiry } from './components/public/contact/contact.component';
import { LocationComponent } from './components/public/location/location.component';

type Role = 'PROPIETARIO' | 'ADMI' | 'OPERADOR' | 'ASESOR' | 'USUARIO';
type ViewKey = 'dashboard' | 'prospectos' | 'clientes' | 'membresias' | 'ventas' | 'pagos' | 'clases' | 'entrenamiento' | 'progreso' | 'accesos' | 'reportes';
interface UserSession { email: string; name: string; role: Role; }
interface NavItem { key: ViewKey; label: string; icon: string; roles: Role[]; }
interface Client { id: number; name: string; initials: string; membership: string; status: string; expiry: string; phone: string; whatsapp: string; facebook: string; instagram: string; tiktok: string; weight: number; delta: string; lastPayment: string; }
interface MembershipPlan { name: string; duration: string; sessions: string; price: string; active: boolean; sold: number; }
interface ClassSession { name: string; trainer: string; time: string; room: string; capacity: number; booked: number; status: string; }
interface Workout { exercise: string; sets: string; load: string; progress: string; machine: string; image: string; video?: string; focus: string; cue: string; }
interface RoutinePlan { name: string; focus: string; duration: string; exercises: string[]; status: string; assigned: number; }
interface Machine { name: string; area: string; image: string; video: string; status: string; }
interface AccessEvent { client: string; time: string; type: string; result: string; reason: string; }
interface Prospect { id: number; name: string; phone: string; interest: string; advisor: string; status: string; nextContact: string; notes: string; }
interface Sale { id: number; client: string; item: string; amount: number; method: string; status: string; }
interface Appointment { id: number; person: string; type: string; advisor: string; date: string; time: string; status: string; notes: string; }
interface PaymentProof { id: number; client: string; plan: string; amount: number; method: 'Yape' | 'Plin'; phone: string; fileName: string; submittedAt: string; status: 'Pendiente' | 'Validado' | 'Rechazado'; whatsappSent: boolean; }
interface SessionRecord { id: number; date: string; routine: string; duration: number; completed: number; sets: number; repetitions: number; totalLoad: number; restSeconds: number; effort: number; notes: string; }
interface MeasurementRecord { id: number; date: string; weight: number; waist: number; chest: number; arm: number; leg: number; }

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, AppShellComponent, DashboardComponent, FormHostComponent, LoginComponent, ShopComponent, LandingComponent, ContactComponent, LocationComponent, ModulePageComponent, UserTrainingComponent, UserProgressComponent, UserPaymentComponent, PaymentInboxComponent, LoadFormComponent, QrViewerComponent, DetailPageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly store = inject(DemoStoreService);
  private readonly auth = inject(AuthService);
  protected readonly session = signal<UserSession | null>(null);
  protected readonly activeView = signal<ViewKey>('dashboard');
  protected readonly loginError = signal('');
  protected readonly isPaymentOpen = signal(false);
  protected readonly isMeasurementOpen = signal(false);
  protected readonly isMenuOpen = signal(false);
  protected readonly isClientFormOpen = signal(false);
  protected readonly clientFormReadOnly = signal(false);
  protected readonly selectedClientId = signal<number | null>(null);
  protected readonly isPlanFormOpen = signal(false);
  protected readonly isRoutineFormOpen = signal(false);
  protected readonly isRoutinePlanFormOpen = signal(false);
  protected readonly isMachineFormOpen = signal(false);
  protected readonly isSessionFormOpen = signal(false);
  protected readonly isProspectFormOpen = signal(false);
  protected readonly isAppointmentFormOpen = signal(false);
  protected readonly isSaleFormOpen = signal(false);
  protected readonly isManualAccessFormOpen = signal(false);
  protected readonly isLoadFormOpen = signal(false);
  protected readonly isQrOpen = signal(false);
  protected readonly selectedDetail = signal<{ kind: string; data: any } | null>(null);
  protected readonly selectedLoadExercise = signal<Workout | null>(null);
  protected readonly isFilterOpen = signal(false);
  protected readonly isVoiceListening = signal(false);
  protected readonly voiceText = signal('');
  protected readonly toast = signal('');
  protected readonly currentPath = signal(typeof window !== 'undefined' ? window.location.pathname.replace(/\/$/, '') || '/' : '/');
  protected readonly isLandingRoute = computed(() => !this.session() && (this.currentPath() === '/' || this.currentPath() === '/inicio'));
  protected readonly isContactRoute = computed(() => !this.session() && this.currentPath() === '/contacto');
  protected readonly isLocationRoute = computed(() => !this.session() && this.currentPath() === '/ubicacion');
  protected readonly isLoginRoute = computed(() => !this.session() && this.currentPath() === '/login');
  protected readonly isShopRoute = computed(() => !this.session() && (this.currentPath() === '/shop' || this.currentPath() === '/store'));
  protected loginEmail = 'admin@maxfit.test';
  protected loginPassword = 'Admin123';
  protected paymentClient = 'Jorge Medina';
  protected paymentAmount = 120;
  protected paymentMethod = 'Efectivo';
  protected readonly paymentProofs = signal<PaymentProof[]>([]);
  protected readonly sessionRecords = signal<SessionRecord[]>([
    { id: 1, date: '22 Oct 2026', routine: 'Fuerza e hipertrofia', duration: 52, completed: 5, sets: 18, repetitions: 54, totalLoad: 480, restSeconds: 90, effort: 8, notes: 'Buena técnica y energía.' },
    { id: 2, date: '20 Oct 2026', routine: 'Tren inferior', duration: 48, completed: 4, sets: 15, repetitions: 46, totalLoad: 420, restSeconds: 90, effort: 7, notes: 'Aumentar carga progresivamente.' }
  ]);
  protected readonly measurements = signal<MeasurementRecord[]>([
    { id: 1, date: '05 Sep 2026', weight: 72.5, waist: 82, chest: 98, arm: 36, leg: 57 },
    { id: 2, date: '05 Ago 2026', weight: 73.2, waist: 84, chest: 96, arm: 35, leg: 56 },
    { id: 3, date: '05 Jul 2026', weight: 74.1, waist: 86, chest: 95, arm: 35, leg: 55 }
  ]);
  protected newMeasurementDate = '05 Sep 2024';
  protected newWeight = 72.5;
  protected newWaist = 82;
  protected newChest = 98;
  protected newArm = 36;
  protected newLeg = 57;
  protected newClientName = '';
  protected newClientPhone = '';
  protected newClientMembership = 'Mensual';
  protected newPlanName = '';
  protected newPlanDuration = '30 días';
  protected newPlanSessions = 'Ilimitadas';
  protected newPlanPrice = 120;
  protected newRoutineExercise = '';
  protected newRoutineMachine = '';
  protected newRoutineSets = '3 × 12';
  protected newRoutineLoad = '20 kg';
  protected newMachineName = '';
  protected newMachineArea = 'Piernas';
  protected newMachineImage = '';
  protected newMachineVideo = '';
  protected sessionNotes = '';
  protected readonly prospects = signal<Prospect[]>([
    { id: 101, name: 'Ana Torres', phone: '999 410 220', interest: 'Musculación', advisor: 'María Torres', status: 'Interesado', nextContact: '24 Oct 2026', notes: 'Solicitó información sobre plan mensual.' },
    { id: 102, name: 'Pedro Salazar', phone: '987 220 118', interest: 'Bajar de peso', advisor: 'Carlos Ríos', status: 'Cita agendada', nextContact: '25 Oct 2026', notes: 'Evaluación inicial pendiente.' },
    { id: 103, name: 'Lucía Ramos', phone: '945 310 877', interest: 'Baile', advisor: 'María Torres', status: 'Contactado', nextContact: '28 Oct 2026', notes: 'Interesada en clases nocturnas.' },
  ]);
  protected readonly sales = signal<Sale[]>([
    { id: 1, client: 'Jorge Medina', item: 'Plan Mensual', amount: 120, method: 'Efectivo', status: 'Confirmada' },
    { id: 2, client: 'Valeria Sánchez', item: 'Plan Trimestral', amount: 300, method: 'Yape', status: 'Confirmada' },
  ]);
  protected readonly appointments = signal<Appointment[]>([
    { id: 1, person: 'Ana Torres', type: 'Cita comercial', advisor: 'María Torres', date: '24 Oct 2026', time: '09:00', status: 'Confirmada', notes: 'Interés en musculación.' },
    { id: 2, person: 'Jorge Medina', type: 'Seguimiento de cliente', advisor: 'María Torres', date: '24 Oct 2026', time: '11:30', status: 'Pendiente', notes: 'Revisar progreso.' },
  ]);
  protected readonly clients = signal<Client[]>([
    { id: 1, name: 'Jorge Medina', initials: 'JM', membership: 'Mensual', status: 'Activa', expiry: '30 Sep 2024', phone: '979 431 110', whatsapp: '+51 979 431 110', facebook: 'facebook.com/jorgemedina', instagram: '@jorgemedina.fit', tiktok: '@jorgefit', weight: 72.5, delta: '-2.8 kg', lastPayment: 'S/ 120' },
    { id: 2, name: 'Valeria Sánchez', initials: 'VS', membership: 'Trimestral', status: 'Activa', expiry: '14 Nov 2024', phone: '945 220 384', whatsapp: '+51 945 220 384', facebook: 'facebook.com/valeriasanchez', instagram: '@valeria.fit', tiktok: '@valeriamove', weight: 61.2, delta: '-1.4 kg', lastPayment: 'S/ 300' },
    { id: 3, name: 'Luis Villanueva', initials: 'LV', membership: 'Mensual', status: 'Por vencer', expiry: '25 Sep 2024', phone: '992 100 545', whatsapp: '+51 992 100 545', facebook: '', instagram: '@luisvillanueva', tiktok: '', weight: 84.8, delta: '+0.6 kg', lastPayment: 'S/ 120' },
    { id: 4, name: 'María Torres', initials: 'MT', membership: 'Semestral', status: 'Activa', expiry: '02 Feb 2025', phone: '956 441 872', whatsapp: '+51 956 441 872', facebook: 'facebook.com/mariatorres', instagram: '@mariat.fit', tiktok: '@mariatorres', weight: 67.3, delta: '-3.1 kg', lastPayment: 'S/ 540' },
  ]);
  protected readonly membershipPlans = signal<MembershipPlan[]>([
    { name: 'Mensual', duration: '30 días', sessions: 'Ilimitadas', price: 'S/ 120', active: true, sold: 184 },
    { name: 'Trimestral', duration: '90 días', sessions: 'Ilimitadas', price: 'S/ 300', active: true, sold: 129 },
    { name: 'Semestral', duration: '180 días', sessions: 'Ilimitadas', price: 'S/ 540', active: true, sold: 86 },
    { name: 'Pase 12 sesiones', duration: '60 días', sessions: '12 sesiones', price: 'S/ 180', active: false, sold: 42 },
  ]);
  protected readonly classSessions = signal<ClassSession[]>([
    { name: 'Musculación', trainer: 'Carlos Ríos', time: '07:00 - 08:00', room: 'Sala A', capacity: 20, booked: 16, status: 'Disponible' },
    { name: 'Funcional', trainer: 'Andrea Montalvo', time: '09:00 - 10:00', room: 'Sala B', capacity: 18, booked: 18, status: 'Completa' },
    { name: 'Baile Fitness', trainer: 'María Torres', time: '18:00 - 19:00', room: 'Sala B', capacity: 25, booked: 12, status: 'Disponible' },
    { name: 'Entrenamiento personal', trainer: 'Luis Villanueva', time: '19:30 - 20:30', room: 'Zona de fuerza', capacity: 4, booked: 2, status: 'Disponible' },
  ]);
  protected readonly workouts = signal<Workout[]>([
    { exercise: 'Prensa inclinada', sets: '4 × 12', load: '80 kg', progress: '+10 kg', machine: 'Leg press 45°', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85', video: 'https://www.youtube.com/embed/cDGOn-yfKJA', focus: 'Cuádriceps y glúteos', cue: 'Rodillas alineadas con los pies y espalda apoyada.' },
    { exercise: 'Press de pecho', sets: '4 × 10', load: '50 kg', progress: '+5 kg', machine: 'Chest press', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85', focus: 'Pecho y tríceps', cue: 'Empuja sin bloquear los codos y controla el regreso.' },
    { exercise: 'Jalón al pecho', sets: '4 × 10', load: '45 kg', progress: '+5 kg', machine: 'Lat pulldown', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=85', focus: 'Espalda y bíceps', cue: 'Lleva la barra al pecho sin balancear el torso.' },
    { exercise: 'Extensión de piernas', sets: '3 × 12', load: '35 kg', progress: '+5 kg', machine: 'Leg extension', image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=85', focus: 'Cuádriceps', cue: 'Sube con control y pausa un segundo arriba.' },
    { exercise: 'Remo sentado', sets: '3 × 12', load: '45 kg', progress: '+5 kg', machine: 'Seated row', image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1a?auto=format&fit=crop&w=900&q=85', focus: 'Espalda media', cue: 'Mantén el pecho abierto y junta las escápulas.' },
  ]);
  protected readonly routines = signal<RoutinePlan[]>([
    { name: 'Fuerza e hipertrofia', focus: 'Tren superior', duration: '8 semanas', exercises: ['Press de pecho', 'Jalón al pecho', 'Remo sentado'], status: 'Activa', assigned: 24 },
    { name: 'Tren inferior inicial', focus: 'Piernas y glúteos', duration: '6 semanas', exercises: ['Prensa inclinada', 'Extensión de piernas'], status: 'Activa', assigned: 18 },
    { name: 'Acondicionamiento general', focus: 'Pérdida de grasa', duration: '4 semanas', exercises: ['Prensa inclinada', 'Remo sentado', 'Jalón al pecho'], status: 'Borrador', assigned: 0 },
  ]);
  protected readonly machines = signal<Machine[]>([
    { name: 'Leg press 45°', area: 'Piernas', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85', video: 'https://www.youtube.com/embed/cDGOn-yfKJA', status: 'Activa' },
    { name: 'Chest press', area: 'Pecho', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85', video: '', status: 'Activa' },
    { name: 'Lat pulldown', area: 'Espalda', image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=900&q=85', video: '', status: 'Activa' },
    { name: 'Leg extension', area: 'Piernas', image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=900&q=85', video: '', status: 'Mantenimiento' },
  ]);
  protected readonly accessEvents = signal<AccessEvent[]>([
    { client: 'Jorge Medina', time: '08:42', type: 'Entrada', result: 'Permitido', reason: 'Membresía activa' },
    { client: 'Valeria Sánchez', time: '08:35', type: 'Entrada', result: 'Permitido', reason: 'Membresía activa' },
    { client: 'Luis Villanueva', time: '08:20', type: 'Entrada', result: 'Denegado', reason: 'Membresía por vencer' },
    { client: 'María Torres', time: '07:58', type: 'Salida', result: 'Registrado', reason: 'Salida registrada' },
  ]);
  protected readonly navItems: NavItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '⌂', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'ASESOR', 'USUARIO'] },
    { key: 'prospectos', label: 'Prospectos', icon: '♧', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'ASESOR'] },
    { key: 'clientes', label: 'Clientes', icon: '♙', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'ASESOR'] },
    { key: 'membresias', label: 'Membresías', icon: '▣', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
    { key: 'ventas', label: 'Ventas', icon: '▤', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR'] },
    { key: 'pagos', label: 'Pagos', icon: '$', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
    { key: 'clases', label: 'Clases', icon: '◫', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'ASESOR', 'USUARIO'] },
    { key: 'entrenamiento', label: 'Entrenamiento', icon: '✦', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'ASESOR', 'USUARIO'] },
    { key: 'progreso', label: 'Progreso', icon: '⌁', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'ASESOR', 'USUARIO'] },
    { key: 'accesos', label: 'Accesos', icon: '⌁', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'ASESOR', 'USUARIO'] },
    { key: 'reportes', label: 'Reportes', icon: '↗', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'ASESOR'] },
  ];
  protected readonly visibleNav = computed(() => {
    const role = this.session()?.role ?? 'USUARIO';
    const items = this.navItems.filter(item => item.roles.includes(role));
    return role === 'USUARIO' ? items.filter(item => item.key !== 'membresias').map(item => item.key === 'pagos' ? { ...item, label: 'Mi membresía y pagos', icon: '▣' } : item) : items;
  });
  protected readonly selectedClient = computed(() => this.clients().find(client => client.id === this.selectedClientId()) ?? null);
  protected readonly myPaymentProof = computed(() => this.paymentProofs().find(item => item.client === this.session()?.name) ?? null);
  protected readonly myAccessEvents = computed(() => this.accessEvents().filter(event => event.client === this.session()?.name));
  protected readonly roleLabel = computed(() => this.session()?.role === 'PROPIETARIO' ? 'Propietario' : this.session()?.role === 'ADMI' ? 'Administrador' : this.session()?.role === 'OPERADOR' ? 'Operador' : this.session()?.role === 'ASESOR' ? 'Asesor' : 'Cliente');
  protected readonly isAnyFormOpen = computed(() => this.isPaymentOpen() || this.isMeasurementOpen() || this.isClientFormOpen() || this.isPlanFormOpen() || this.isRoutinePlanFormOpen() || this.isRoutineFormOpen() || this.isMachineFormOpen() || this.isSessionFormOpen() || this.isProspectFormOpen() || this.isAppointmentFormOpen() || this.isSaleFormOpen() || this.isManualAccessFormOpen() || this.isLoadFormOpen());
  private readonly demoPersistence = effect(() => {
    this.store.write('maxfit-demo-state-v2', { clients: this.clients(), prospects: this.prospects(), sales: this.sales(), appointments: this.appointments(), membershipPlans: this.membershipPlans(), workouts: this.workouts(), routines: this.routines(), machines: this.machines(), accessEvents: this.accessEvents(), paymentProofs: this.paymentProofs(), sessionRecords: this.sessionRecords(), measurements: this.measurements(), classSessions: this.classSessions() });
  });
  constructor() {
    this.store.remove('maxfit-demo-state');
    const state = this.store.read<any>('maxfit-demo-state-v2');
    if (state) {
      if (state.clients) this.clients.set(state.clients); if (state.prospects) this.prospects.set(state.prospects); if (state.sales) this.sales.set(state.sales); if (state.appointments) this.appointments.set(state.appointments); if (state.membershipPlans) this.membershipPlans.set(state.membershipPlans); if (state.workouts) this.workouts.set(state.workouts); if (state.routines) this.routines.set(state.routines); if (state.machines) this.machines.set(state.machines); if (state.accessEvents) this.accessEvents.set(state.accessEvents); if (state.paymentProofs) this.paymentProofs.set(state.paymentProofs.filter((item: PaymentProof) => item.id !== 9001)); if (state.sessionRecords) this.sessionRecords.set(state.sessionRecords); if (state.measurements) this.measurements.set(state.measurements); if (state.classSessions) this.classSessions.set(state.classSessions);
    }
  }
  protected login(): void { const match = this.auth.authenticate(this.loginEmail, this.loginPassword); if (!match) { this.loginError.set('Usuario o contraseña incorrectos'); return; } this.loginError.set(''); this.session.set({ email: match.email, name: match.name, role: match.role }); this.activeView.set('dashboard'); }
  protected loginFromComponent(data: { email: string; password: string }): void { this.loginEmail = data.email; this.loginPassword = data.password; this.login(); }
  protected logout(): void { this.session.set(null); this.loginEmail = ''; this.loginPassword = ''; }
  protected openShop(): void { this.goToPath('/store'); }
  protected goToLogin(): void { this.goToPath('/login'); }
  protected goToLanding(): void { this.goToPath('/'); }
  protected openContact(): void { this.goToPath('/contacto'); }
  protected openLocation(): void { this.goToPath('/ubicacion'); }
  protected registerContact(inquiry: ContactInquiry): void {
    this.prospects.update(items => [{ id: Date.now(), name: inquiry.name, phone: inquiry.whatsapp, interest: inquiry.interest, advisor: 'Por asignar', status: 'Nuevo', nextContact: 'Pendiente', notes: inquiry.message || 'Consulta registrada desde la landing.' }, ...items]);
  }
  private goToPath(path: string): void { if (typeof window !== 'undefined') window.history.pushState({}, '', path); this.currentPath.set(path); }
  protected navigate(view: string): void {
    this.isMenuOpen.set(false);
    if (this.session()?.role === 'USUARIO' && view === 'membresias') view = 'pagos';
    if (this.session()?.role === 'USUARIO' && view === 'clientes') return;
    if (this.navItems.some(item => item.key === view)) this.activeView.set(view as ViewKey);
  }
  protected showToast(message: string): void {
    if (message.includes('Formulario de nuevo cliente')) { this.openClientForm(); return; }
    if (message.includes('Nuevo plan preparado')) { this.openPlanForm(); return; }
    if (message.includes('Nueva rutina preparada') || message.includes('Editor de rutina abierto')) { this.openRoutineForm(); return; }
    if (message.includes('Nueva máquina preparada')) { this.openMachineForm(); return; }
    if (message.includes('Registro de sesión abierto')) { this.isSessionFormOpen.set(true); return; }
    this.toast.set(message); setTimeout(() => this.toast.set(''), 2600);
  }
  protected startVoicePayment(): void { this.isVoiceListening.set(true); this.voiceText.set('Escuchando… diga: registrar pago de Jorge Medina por 120 soles en efectivo'); setTimeout(() => { this.voiceText.set('Registrar pago de Jorge Medina por 120 soles en efectivo'); this.isVoiceListening.set(false); }, 1500); }
  protected confirmPayment(): void { this.isPaymentOpen.set(false); this.showToast('Pago registrado correctamente'); }
  protected saveMeasurement(): void { this.isMeasurementOpen.set(false); this.showToast('Peso y medidas registrados correctamente'); }
  protected toggleMenu(): void { this.isMenuOpen.update(value => !value); }
  protected forgotPassword(): void { this.showToast('Se enviaron instrucciones al correo registrado'); }
  protected toggleFilters(): void { this.isFilterOpen.update(value => !value); }
  protected openClientForm(): void { this.activeView.set('clientes'); this.clientFormReadOnly.set(false); this.selectedClientId.set(null); this.isClientFormOpen.set(true); this.isFilterOpen.set(false); }
  protected openClientDetails(id: number): void { this.activeView.set('clientes'); this.selectedClientId.set(id); this.clientFormReadOnly.set(true); this.isClientFormOpen.set(true); }
  protected openPaymentForm(): void { this.activeView.set('pagos'); this.isPaymentOpen.set(true); }
  protected openProspectForm(): void { this.activeView.set('prospectos'); this.isProspectFormOpen.set(true); }
  protected openAppointmentForm(): void { this.activeView.set('prospectos'); this.isAppointmentFormOpen.set(true); }
  protected openSaleForm(): void { this.activeView.set('ventas'); this.isSaleFormOpen.set(true); }
  protected openManualAccessForm(): void { this.activeView.set('accesos'); this.isManualAccessFormOpen.set(true); }
  protected openLoadForm(exercise = 'Prensa inclinada'): void { this.activeView.set('entrenamiento'); this.selectedLoadExercise.set(this.workouts().find(item => item.exercise === exercise) ?? this.workouts()[0] ?? null); this.isLoadFormOpen.set(true); }
  protected saveLoad(data: { exercise: string; load: number; notes: string }): void {
    this.workouts.update(items => items.map(item => item.exercise === data.exercise ? { ...item, load: `${data.load} kg`, progress: 'Registrada' } : item));
    this.isLoadFormOpen.set(false); this.showToast(`Carga de ${data.load} kg registrada para ${data.exercise}`);
  }
  protected saveClient(): void {
    const name = this.newClientName.trim();
    if (!name) { this.showToast('Ingresa el nombre del cliente'); return; }
    this.clients.update(items => [...items, { id: Date.now(), name, initials: this.initials(name), membership: this.newClientMembership, status: 'Activa', expiry: '30 Oct 2024', phone: this.newClientPhone || 'Sin teléfono', whatsapp: this.newClientPhone || 'Sin WhatsApp', facebook: '', instagram: '', tiktok: '', weight: 0, delta: 'Nueva ficha', lastPayment: 'S/ 0' }]);
    this.newClientName = ''; this.newClientPhone = ''; this.isClientFormOpen.set(false); this.showToast('Cliente creado correctamente');
  }
  protected openPlanForm(): void { this.activeView.set('membresias'); this.isPlanFormOpen.set(true); }
  protected savePlan(): void {
    const name = this.newPlanName.trim();
    if (!name) { this.showToast('Ingresa el nombre del plan'); return; }
    this.membershipPlans.update(items => [...items, { name, duration: this.newPlanDuration, sessions: this.newPlanSessions, price: `S/ ${this.newPlanPrice}`, active: true, sold: 0 }]);
    this.newPlanName = ''; this.isPlanFormOpen.set(false); this.showToast('Plan creado correctamente');
  }
  protected openRoutineForm(): void { this.activeView.set('entrenamiento'); this.isRoutineFormOpen.set(true); }
  protected openRoutinePlanForm(): void { this.activeView.set('entrenamiento'); this.isRoutinePlanFormOpen.set(true); }
  protected saveRoutinePlan(data: { name: string; focus: string; duration: string; exercises: string }): void {
    const name = data.name.trim();
    if (!name || !data.exercises.trim()) { this.showToast('Completa nombre y ejercicios de la rutina'); return; }
    this.routines.update(items => [...items, { name, focus: data.focus, duration: data.duration, exercises: data.exercises.split(',').map(item => item.trim()).filter(Boolean), status: 'Activa', assigned: 0 }]);
    this.isRoutinePlanFormOpen.set(false); this.showToast('Plan de rutina creado correctamente');
  }
  protected saveRoutine(): void {
    const exercise = this.newRoutineExercise.trim();
    if (!exercise || !this.newRoutineMachine.trim()) { this.showToast('Completa ejercicio y máquina'); return; }
    this.workouts.update(items => [...items, { exercise, sets: this.newRoutineSets, load: this.newRoutineLoad, progress: 'Nuevo', machine: this.newRoutineMachine, image: this.newMachineImage || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=85', focus: 'Por definir', cue: 'Ajusta la máquina y solicita supervisión del entrenador.' }]);
    this.newRoutineExercise = ''; this.newRoutineMachine = ''; this.isRoutineFormOpen.set(false); this.showToast('Ejercicio agregado a la rutina');
  }
  protected openMachineForm(): void { this.activeView.set('entrenamiento'); this.isMachineFormOpen.set(true); }
  protected saveMachine(): void {
    const name = this.newMachineName.trim();
    if (!name) { this.showToast('Ingresa el nombre de la máquina'); return; }
    this.machines.update(items => [...items, { name, area: this.newMachineArea, image: this.newMachineImage || 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85', video: this.newMachineVideo, status: 'Activa' }]);
    this.newMachineName = ''; this.newMachineImage = ''; this.newMachineVideo = ''; this.isMachineFormOpen.set(false); this.showToast('Máquina agregada correctamente');
  }
  protected saveSession(data?: { duration: number; routine: string; completed: number; sets: number; repetitions: number; totalLoad: number; restSeconds: number; effort: number; notes: string }): void { if (data) this.sessionRecords.update(items => [{ id: Date.now(), date: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }), ...data }, ...items]); this.isSessionFormOpen.set(false); this.activeView.set('entrenamiento'); this.sessionNotes = ''; this.showToast('Sesión de entrenamiento registrada y guardada'); }
  protected reserveClass(): void {
    this.classSessions.update(items => items.map(item => item.name === 'Musculación' && item.booked < item.capacity ? { ...item, booked: item.booked + 1 } : item));
    this.showToast('Reserva confirmada. La clase quedó agregada a tu agenda.');
  }
  protected onPaymentSaved(data: { client: string; amount: number; method: string }): void { this.paymentClient = data.client; this.paymentAmount = data.amount; this.paymentMethod = data.method; this.confirmPayment(); }
  protected onUserPaymentSubmitted(data: UserPaymentSubmission): void {
    const client = this.session()?.name ?? 'Jorge Medina';
    this.paymentProofs.update(items => [{ id: Date.now(), client, plan: data.plan, amount: data.amount, method: data.method, phone: data.phone, fileName: data.fileName, submittedAt: new Date().toLocaleString('es-PE', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), status: 'Pendiente', whatsappSent: false }, ...items.filter(item => !(item.client === client && item.status === 'Pendiente'))]);
    this.activeView.set('pagos');
    this.showToast('Comprobante enviado. El operador revisará tu pago.');
  }
  protected validatePayment(id: number): void {
    this.paymentProofs.update(items => items.map(item => item.id === id ? { ...item, status: 'Validado', whatsappSent: true } : item));
    this.showToast('Pago validado. Confirmación enviada por WhatsApp al cliente.');
  }
  protected rejectPayment(id: number): void {
    this.paymentProofs.update(items => items.map(item => item.id === id ? { ...item, status: 'Rechazado', whatsappSent: false } : item));
    this.showToast('Comprobante observado. El cliente deberá enviar uno nuevo.');
  }
  protected copyPaymentNumber(phone: string): void {
    navigator.clipboard?.writeText(phone).catch(() => undefined);
    this.showToast(`Número ${phone} copiado`);
  }
  protected openPaymentApp(method: 'Yape' | 'Plin'): void { this.showToast(`Abriendo ${method}. En el demo puedes completar el pago desde tu celular.`); }
  protected onMeasurementSaved(data: { date: string; weight: number; waist: number; chest: number; arm: number; leg: number }): void {
    if (!data.date || data.weight <= 0 || data.waist <= 0 || data.chest <= 0 || data.arm <= 0 || data.leg <= 0) { this.showToast('Completa valores de peso y medidas mayores a cero'); return; }
    this.newMeasurementDate = data.date; this.newWeight = data.weight; this.newWaist = data.waist; this.newChest = data.chest; this.newArm = data.arm; this.newLeg = data.leg;
    this.measurements.update(items => [{ id: Date.now(), ...data }, ...items]);
    const userName = this.session()?.name;
    this.clients.update(items => items.map(client => client.name === userName ? { ...client, weight: data.weight, delta: `${(data.weight - client.weight).toFixed(1)} kg` } : client));
    this.saveMeasurement();
  }
  protected onClientSaved(data: { id?: number; name: string; phone: string; whatsapp: string; facebook: string; instagram: string; tiktok: string; membership: string }): void {
    if (this.clientFormReadOnly()) return;
    this.newClientName = data.name; this.newClientPhone = data.phone; this.newClientMembership = data.membership;
    if (data.id) { this.clients.update(items => items.map(client => client.id === data.id ? { ...client, ...data, initials: this.initials(data.name) } : client)); this.closeForm('client'); this.showToast('Ficha del cliente actualizada'); return; }
    const name = data.name.trim();
    if (!name) { this.showToast('Ingresa el nombre del cliente'); return; }
    this.clients.update(items => [...items, { id: Date.now(), name, initials: this.initials(name), membership: data.membership, status: 'Activa', expiry: '30 Oct 2024', phone: data.phone || 'Sin teléfono', whatsapp: data.whatsapp || 'Sin WhatsApp', facebook: data.facebook || '', instagram: data.instagram || '', tiktok: data.tiktok || '', weight: 0, delta: 'Nueva ficha', lastPayment: 'S/ 0' }]);
    this.closeForm('client'); this.showToast('Cliente creado correctamente');
  }
  protected onPlanSaved(data: { name: string; duration: string; sessions: string; price: number }): void { this.newPlanName = data.name; this.newPlanDuration = data.duration; this.newPlanSessions = data.sessions; this.newPlanPrice = data.price; this.savePlan(); }
  protected onRoutineSaved(data: { exercise: string; machine: string; sets: string; load: string }): void { this.newRoutineExercise = data.exercise; this.newRoutineMachine = data.machine; this.newRoutineSets = data.sets; this.newRoutineLoad = data.load; this.saveRoutine(); }
  protected onRoutinePlanSaved(data: { name: string; focus: string; duration: string; exercises: string }): void { this.saveRoutinePlan(data); }
  protected onMachineSaved(data: { name: string; area: string; image: string; video: string }): void { this.newMachineName = data.name; this.newMachineArea = data.area; this.newMachineImage = data.image; this.newMachineVideo = data.video; this.saveMachine(); }
  protected onSessionSaved(data: { duration: number; routine: string; completed: number; sets: number; repetitions: number; totalLoad: number; restSeconds: number; effort: number; notes: string }): void { this.sessionNotes = data.notes; this.saveSession(data); }
  protected onProspectSaved(data: { name: string; phone: string; interest: string; advisor: string; contactDate: string; notes: string }): void {
    const name = data.name.trim();
    if (!name) { this.showToast('Ingresa el nombre del prospecto'); return; }
    this.prospects.update(items => [...items, { id: Date.now(), name, phone: data.phone, interest: data.interest, advisor: data.advisor, status: 'Nuevo', nextContact: data.contactDate || 'Por programar', notes: data.notes }]);
    this.closeForm('prospect'); this.showToast('Prospecto registrado correctamente');
  }
  protected onAppointmentSaved(data: { person: string; type: string; advisor: string; date: string; time: string; notes: string }): void {
    if (!data.person.trim()) { this.showToast('Ingresa la persona de la cita'); return; }
    this.appointments.update(items => [...items, { id: Date.now(), person: data.person, type: data.type, advisor: data.advisor, date: data.date, time: data.time, status: 'Pendiente', notes: data.notes }]);
    this.closeForm('appointment'); this.showToast(`Cita de ${data.person} programada correctamente`);
  }
  protected onSaleSaved(data: { client: string; item: string; quantity: number; method: string; total: number }): void {
    this.sales.update(items => [...items, { id: Date.now(), client: data.client, item: data.item.split(' · ')[0], amount: data.total, method: data.method, status: 'Confirmada' }]);
    this.closeForm('sale'); this.showToast('Venta registrada correctamente');
  }
  protected onManualAccessSaved(data: { clientCode: string; movement: string; note: string }): void {
    const code = data.clientCode.trim().toUpperCase();
    if (!/^A\d{3}$/.test(code)) { this.showToast('Usa un código válido de cuatro caracteres, por ejemplo A001'); return; }
    const client = code === 'A001' ? 'Jorge Medina' : `Cliente ${code}`;
    this.accessEvents.update(items => [{ client, time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }), type: data.movement, result: 'Permitido', reason: 'Registro manual por operador' }, ...items]);
    this.closeForm('manual-access'); this.showToast(`Asistencia registrada para ${client}`);
  }
  protected handleFormSaved(submission: FormSubmission): void {
    switch (submission.kind) {
      case 'payment': this.onPaymentSaved(submission.data); break;
      case 'measurement': this.onMeasurementSaved(submission.data); break;
      case 'client': this.onClientSaved(submission.data); break;
      case 'plan': this.onPlanSaved(submission.data); break;
      case 'routine': this.onRoutineSaved(submission.data); break;
      case 'routine-plan': this.onRoutinePlanSaved(submission.data); break;
      case 'machine': this.onMachineSaved(submission.data); break;
      case 'session': this.onSessionSaved(submission.data); break;
      case 'prospect': this.onProspectSaved(submission.data); break;
      case 'appointment': this.onAppointmentSaved(submission.data); break;
      case 'sale': this.onSaleSaved(submission.data); break;
      case 'manual-access': this.onManualAccessSaved(submission.data); break;
    }
  }
  protected closeForm(kind: string): void {
    if (kind === 'payment') this.isPaymentOpen.set(false);
    if (kind === 'measurement') this.isMeasurementOpen.set(false);
    if (kind === 'client') { this.isClientFormOpen.set(false); this.clientFormReadOnly.set(false); this.selectedClientId.set(null); }
    if (kind === 'plan') this.isPlanFormOpen.set(false);
    if (kind === 'routine') this.isRoutineFormOpen.set(false);
    if (kind === 'routine-plan') this.isRoutinePlanFormOpen.set(false);
    if (kind === 'machine') this.isMachineFormOpen.set(false);
    if (kind === 'session') this.isSessionFormOpen.set(false);
    if (kind === 'prospect') this.isProspectFormOpen.set(false);
    if (kind === 'appointment') this.isAppointmentFormOpen.set(false);
    if (kind === 'sale') this.isSaleFormOpen.set(false);
    if (kind === 'manual-access') this.isManualAccessFormOpen.set(false);
    if (kind === 'load') { this.isLoadFormOpen.set(false); this.selectedLoadExercise.set(null); }
  }
  protected handleModuleAction(action: string): void {
    if (action === 'new-client') this.openClientForm();
    else if (action === 'new-prospect') this.openProspectForm();
    else if (action === 'new-appointment') this.openAppointmentForm();
    else if (action === 'new-sale') this.openSaleForm();
    else if (action === 'manual-access') this.openManualAccessForm();
    else if (action.startsWith('view-client:')) this.openClientDetails(Number(action.split(':')[1]));
    else if (action === 'new-plan') this.openPlanForm();
    else if (action === 'new-payment' || action === 'voice-payment') { this.activeView.set('pagos'); this.isPaymentOpen.set(true); if (action === 'voice-payment') this.startVoicePayment(); }
    else if (action === 'new-measurement') { this.activeView.set('progreso'); this.isMeasurementOpen.set(true); }
    else if (action === 'new-routine-plan' || action === 'new-routine') this.openRoutinePlanForm();
    else if (action === 'edit-routine' || action === 'new-routine-exercise' || action === 'new-machine') { this.activeView.set('entrenamiento'); action === 'new-machine' ? this.openMachineForm() : this.openRoutineForm(); }
    else if (action === 'new-session') { this.activeView.set('entrenamiento'); this.isSessionFormOpen.set(true); }
    else if (action === 'register-load' || action.startsWith('register-load:')) this.openLoadForm(action.split(':')[1] || undefined);
    else if (action === 'reserve-class') this.reserveClass();
    else if (action === 'class-action') this.showToast('Agenda de clases preparada');
    else if (action === 'scan-qr') this.registerQrAccess();
    else if (action === 'view-plan' || action === 'plan-detail') this.openDetail('routine');
    else if (action === 'view-payment') this.navigate('pagos');
    else if (action === 'renew-membership') this.navigate('pagos');
    else if (action.startsWith('validate-payment:')) this.validatePayment(Number(action.split(':')[1]));
    else if (action.startsWith('reject-payment:')) this.rejectPayment(Number(action.split(':')[1]));
    else if (action === 'copy-payment-number') this.copyPaymentNumber('979 431 110');
    else if (action === 'go-training') this.navigate('entrenamiento');
    else if (action === 'export-report') this.exportReport();
    else if (action === 'view-report') this.openDetail('report');
    else if (action === 'view-exercise') this.openDetail('exercise');
    else if (action === 'view-routine') this.openDetail('routine');
    else if (action === 'view-session' || action === 'view-history') this.openDetail('session');
    else if (action === 'view-prospect') this.openDetail('prospect');
    else if (action === 'view-sale') this.openDetail('sale');
    else if (action === 'view-class' || action === 'view-access') this.showToast('Detalle seleccionado');
    else this.showToast('Acción ejecutada correctamente');
  }
  protected registerQrAccess(): void {
    if (this.session()?.role === 'USUARIO') { this.isQrOpen.set(true); return; }
    this.accessEvents.update(items => [{ client: 'Jorge Medina', time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }), type: 'Entrada', result: 'Permitido', reason: 'QR validado · Membresía activa' }, ...items]);
    this.showToast('Ingreso registrado mediante QR para Jorge Medina');
  }
  protected closeQr(): void { this.isQrOpen.set(false); }
  protected closeDetail(): void { this.selectedDetail.set(null); }
  protected openDetail(kind: string): void {
    const data = kind === 'exercise' ? this.workouts()[0] : kind === 'routine' ? this.routines()[0] : kind === 'session' ? this.sessionRecords()[0] : kind === 'prospect' ? this.prospects()[0] : kind === 'sale' ? this.sales()[0] : {};
    this.selectedDetail.set({ kind, data });
  }
  protected exportReport(): void {
    const rows = [['Indicador', 'Valor'], ['Clientes activos', '428'], ['Ingresos del mes', 'S/ 12,450'], ['Asistencia promedio', '86%'], ['Clientes con seguimiento', '64']];
    const csv = rows.map(row => row.join(',')).join('\n');
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' })); link.download = 'max-fit-resumen.csv'; link.click(); URL.revokeObjectURL(link.href);
    this.showToast('Resumen exportado correctamente');
  }
  @HostListener('click', ['$event'])
  protected handleUnwiredButtons(event: Event): void {
    const button = (event.target as HTMLElement).closest('button');
    if (!button) return;
    if (button.classList.contains('link-button')) this.forgotPassword();
    // AppShell ya emite el evento del menú móvil; aquí solo se atienden botones globales.
    if (button.classList.contains('date-chip')) this.showToast('Fecha actual: 05 de septiembre de 2024');
    if (button.classList.contains('filter-button')) { this.toggleFilters(); this.showToast(this.isFilterOpen() ? 'Filtros disponibles en la tabla de clientes' : 'Filtros cerrados'); }
  }
  protected initials(name: string): string { return name.split(' ').map(part => part[0]).slice(0, 2).join(''); }
  protected parseLoad(value: string | undefined): number { return Number(String(value ?? '0').replace(/[^0-9.]/g, '')) || 0; }
}
