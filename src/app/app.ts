import { CommonModule } from '@angular/common';
import { Component, HostListener, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppShellComponent } from './components/app-shell.component';
import { DashboardComponent } from './components/dashboard.component';
import { FormHostComponent, FormSubmission } from './components/form-host.component';
import { LoginComponent } from './components/login.component';
import { ModulePageComponent } from './components/module-page.component';

type Role = 'PROPIETARIO' | 'ADMI' | 'OPERADOR' | 'USUARIO';
type ViewKey = 'dashboard' | 'clientes' | 'membresias' | 'pagos' | 'clases' | 'entrenamiento' | 'progreso' | 'accesos';
interface UserSession { email: string; name: string; role: Role; }
interface NavItem { key: ViewKey; label: string; icon: string; roles: Role[]; }
interface Client { id: number; name: string; initials: string; membership: string; status: string; expiry: string; phone: string; whatsapp: string; facebook: string; instagram: string; tiktok: string; weight: number; delta: string; lastPayment: string; }
interface MembershipPlan { name: string; duration: string; sessions: string; price: string; active: boolean; sold: number; }
interface ClassSession { name: string; trainer: string; time: string; room: string; capacity: number; booked: number; status: string; }
interface Workout { exercise: string; sets: string; load: string; progress: string; machine: string; image: string; video?: string; focus: string; cue: string; }
interface RoutinePlan { name: string; focus: string; duration: string; exercises: string[]; status: string; assigned: number; }
interface Machine { name: string; area: string; image: string; video: string; status: string; }
interface AccessEvent { client: string; time: string; type: string; result: string; reason: string; }

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, AppShellComponent, DashboardComponent, FormHostComponent, LoginComponent, ModulePageComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly credentials = [
    { email: 'propietario@maxfit.test', password: 'Owner123', name: 'Jürgen Max Fit', role: 'PROPIETARIO' as Role },
    { email: 'admin@maxfit.test', password: 'Admin123', name: 'Andrea Montalvo', role: 'ADMI' as Role },
    { email: 'operador@maxfit.test', password: 'Operador123', name: 'Carlos Ríos', role: 'OPERADOR' as Role },
    { email: 'usuario@maxfit.test', password: 'Usuario123', name: 'Jorge Medina', role: 'USUARIO' as Role },
  ];
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
  protected readonly isFilterOpen = signal(false);
  protected readonly isVoiceListening = signal(false);
  protected readonly voiceText = signal('');
  protected readonly toast = signal('');
  protected loginEmail = 'admin@maxfit.test';
  protected loginPassword = 'Admin123';
  protected paymentClient = 'Jorge Medina';
  protected paymentAmount = 120;
  protected paymentMethod = 'Efectivo';
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
    { key: 'dashboard', label: 'Dashboard', icon: '⌂', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
    { key: 'clientes', label: 'Clientes', icon: '♙', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR'] },
    { key: 'membresias', label: 'Membresías', icon: '▣', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
    { key: 'pagos', label: 'Pagos', icon: '$', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
    { key: 'clases', label: 'Clases', icon: '◫', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
    { key: 'entrenamiento', label: 'Entrenamiento', icon: '✦', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
    { key: 'progreso', label: 'Progreso', icon: '⌁', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
    { key: 'accesos', label: 'Accesos', icon: '⌁', roles: ['PROPIETARIO', 'ADMI', 'OPERADOR', 'USUARIO'] },
  ];
  protected readonly visibleNav = computed(() => this.navItems.filter(item => item.roles.includes(this.session()?.role ?? 'USUARIO')));
  protected readonly selectedClient = computed(() => this.clients().find(client => client.id === this.selectedClientId()) ?? null);
  protected readonly myAccessEvents = computed(() => this.accessEvents().filter(event => event.client === this.session()?.name));
  protected readonly roleLabel = computed(() => this.session()?.role === 'PROPIETARIO' ? 'Propietario' : this.session()?.role === 'ADMI' ? 'Administrador' : this.session()?.role === 'OPERADOR' ? 'Operador' : 'Cliente');
  protected readonly isAnyFormOpen = computed(() => this.isPaymentOpen() || this.isMeasurementOpen() || this.isClientFormOpen() || this.isPlanFormOpen() || this.isRoutinePlanFormOpen() || this.isRoutineFormOpen() || this.isMachineFormOpen() || this.isSessionFormOpen());
  protected login(): void { const match = this.credentials.find(item => item.email === this.loginEmail && item.password === this.loginPassword); if (!match) { this.loginError.set('Usuario o contraseña incorrectos'); return; } this.loginError.set(''); this.session.set({ email: match.email, name: match.name, role: match.role }); this.activeView.set('dashboard'); }
  protected loginFromComponent(data: { email: string; password: string }): void { this.loginEmail = data.email; this.loginPassword = data.password; this.login(); }
  protected logout(): void { this.session.set(null); this.loginEmail = ''; this.loginPassword = ''; }
  protected navigate(view: string): void {
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
  protected saveSession(): void { this.isSessionFormOpen.set(false); this.activeView.set('entrenamiento'); this.sessionNotes = ''; this.showToast('Sesión de entrenamiento registrada'); }
  protected onPaymentSaved(data: { client: string; amount: number; method: string }): void { this.paymentClient = data.client; this.paymentAmount = data.amount; this.paymentMethod = data.method; this.confirmPayment(); }
  protected onMeasurementSaved(data: { date: string; weight: number; waist: number; chest: number; arm: number; leg: number }): void { this.newMeasurementDate = data.date; this.newWeight = data.weight; this.newWaist = data.waist; this.newChest = data.chest; this.newArm = data.arm; this.newLeg = data.leg; this.saveMeasurement(); }
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
  protected onSessionSaved(notes: string): void { this.sessionNotes = notes; this.saveSession(); }
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
  }
  protected handleModuleAction(action: string): void {
    if (action === 'new-client') this.openClientForm();
    else if (action.startsWith('view-client:')) this.openClientDetails(Number(action.split(':')[1]));
    else if (action === 'new-plan') this.openPlanForm();
    else if (action === 'new-payment' || action === 'voice-payment') { this.activeView.set('pagos'); this.isPaymentOpen.set(true); if (action === 'voice-payment') this.startVoicePayment(); }
    else if (action === 'new-measurement') { this.activeView.set('progreso'); this.isMeasurementOpen.set(true); }
    else if (action === 'new-routine-plan' || action === 'new-routine') this.openRoutinePlanForm();
    else if (action === 'edit-routine' || action === 'new-routine-exercise' || action === 'new-machine') { this.activeView.set('entrenamiento'); action === 'new-machine' ? this.openMachineForm() : this.openRoutineForm(); }
    else if (action === 'new-session') { this.activeView.set('entrenamiento'); this.isSessionFormOpen.set(true); }
    else if (action === 'register-load') this.showToast('Carga registrada en la sesión actual');
    else if (action === 'reserve-class') this.showToast('Reserva confirmada');
    else if (action === 'class-action') this.showToast('Agenda de clases preparada');
    else if (action === 'scan-qr') this.showToast('Escáner QR preparado');
    else if (action === 'view-plan') this.showToast('Detalle del plan seleccionado');
    else if (action === 'view-payment') this.navigate('pagos');
    else if (action === 'renew-membership') this.navigate('pagos');
    else if (action === 'view-class') this.showToast('Detalle de la clase seleccionado');
    else if (action === 'view-access') this.showToast('Detalle del acceso seleccionado');
    else this.showToast('Acción ejecutada correctamente');
  }
  @HostListener('click', ['$event'])
  protected handleUnwiredButtons(event: Event): void {
    const button = (event.target as HTMLElement).closest('button');
    if (!button) return;
    if (button.classList.contains('link-button')) this.forgotPassword();
    if (button.classList.contains('mobile-menu')) this.toggleMenu();
    if (button.classList.contains('date-chip')) this.showToast('Fecha actual: 05 de septiembre de 2024');
    if (button.classList.contains('filter-button')) { this.toggleFilters(); this.showToast(this.isFilterOpen() ? 'Filtros disponibles en la tabla de clientes' : 'Filtros cerrados'); }
  }
  protected initials(name: string): string { return name.split(' ').map(part => part[0]).slice(0, 2).join(''); }
}
