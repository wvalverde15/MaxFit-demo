import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    localStorage.removeItem('maxfit-demo-state');
    localStorage.removeItem('maxfit-demo-state-v2');
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the login screen', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Iniciar sesión');
  });

  it('should authenticate the user role with demo credentials', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as any;
    app.loginEmail = 'usuario@maxfit.test';
    app.loginPassword = 'Usuario123';
    app.login();
    expect(app.session()?.role).toBe('USUARIO');
  });

  it('should update the client and history when a measurement is saved', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as any;
    app.session.set({ email: 'usuario@maxfit.test', name: 'Jorge Medina', role: 'USUARIO' });
    app.onMeasurementSaved({ date: '06 Nov 2026', weight: 71.8, waist: 81, chest: 99, arm: 36, leg: 58 });
    expect(app.clients().find((client: any) => client.name === 'Jorge Medina').weight).toBe(71.8);
    expect(app.measurements()[0].weight).toBe(71.8);
  });

  it('should save a completed training session', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as any;
    const initial = app.sessionRecords().length;
    app.saveSession({ duration: 45, routine: 'Fuerza e hipertrofia', completed: 5, sets: 15, repetitions: 48, totalLoad: 430, restSeconds: 75, effort: 8, notes: 'Sesión completada' });
    expect(app.sessionRecords().length).toBe(initial + 1);
    expect(app.sessionRecords()[0].totalLoad).toBe(430);
  });

  it('should validate a payment proof and mark WhatsApp confirmation', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance as any;
    app.paymentProofs.set([{ id: 1, client: 'Jorge Medina', plan: 'Mensual', amount: 120, method: 'Yape', phone: '979 431 110', fileName: 'prueba.jpg', submittedAt: 'Hoy', status: 'Pendiente', whatsappSent: false }]);
    app.validatePayment(1);
    expect(app.paymentProofs()[0].status).toBe('Validado');
    expect(app.paymentProofs()[0].whatsappSent).toBeTrue();
  });
});
