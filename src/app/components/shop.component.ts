import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, computed, signal } from '@angular/core';

type ShopCategory = 'Todos' | 'Proteínas' | 'Rendimiento' | 'Accesorios' | 'Bienestar';

interface ShopProduct {
  name: string;
  category: Exclude<ShopCategory, 'Todos'>;
  price: number;
  detail: string;
  badge?: string;
  position: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="shop-page">
      <header class="shop-header">
        <a class="shop-brand" href="/shop" aria-label="Max Fit Shop">
          <span class="shop-brand-mark">MF</span>
          <span>MAX <b>FIT</b><small>SHOP</small></span>
        </a>
        <nav class="shop-nav" aria-label="Navegación de tienda">
          <a href="#catalogo">Catálogo</a>
          <a href="#beneficios">Beneficios</a>
          <button class="shop-login-button" type="button" (click)="backToLogin.emit()">Iniciar sesión <span>→</span></button>
        </nav>
      </header>

      <section class="shop-hero">
        <div class="shop-hero-copy">
          <span class="shop-kicker"><i></i> MAX FIT SHOP</span>
          <h1>Tu siguiente nivel empieza con lo que eliges.</h1>
          <p>Suplementos y accesorios seleccionados para acompañar cada entrenamiento, cada meta y cada victoria.</p>
          <div class="shop-hero-actions">
            <button class="shop-primary-button" type="button" (click)="scrollToCatalog()">Explorar productos <span>↓</span></button>
            <span class="shop-trust"><b>12</b> productos seleccionados</span>
          </div>
        </div>
        <div class="shop-hero-visual" aria-label="Selección de productos Max Fit"></div>
      </section>

      <section class="shop-benefits" id="beneficios" aria-label="Beneficios de Max Fit Shop">
        <div><span>01</span><strong>Selección deportiva</strong><small>Productos pensados para tu rendimiento.</small></div>
        <div><span>02</span><strong>Compra informada</strong><small>Conoce cada detalle antes de elegir.</small></div>
        <div><span>03</span><strong>Atención Max Fit</strong><small>Te orientamos según tu objetivo.</small></div>
      </section>

      <section class="shop-catalog" id="catalogo">
        <div class="shop-section-heading">
          <div><span class="shop-kicker"><i></i> CATÁLOGO</span><h2>Equipamiento para tu progreso</h2></div>
          <p>Descubre suplementos y accesorios para entrenar con intención.</p>
        </div>
        <div class="shop-category-row" role="tablist" aria-label="Categorías de productos">
          @for (category of categories; track category) {
            <button type="button" role="tab" [attr.aria-selected]="selectedCategory() === category" [class.active]="selectedCategory() === category" (click)="selectedCategory.set(category)">{{ category }}</button>
          }
        </div>
        <div class="shop-product-grid">
          @for (product of filteredProducts(); track product.name) {
            <article class="shop-product-card" [class.featured]="product.badge">
              <div class="shop-product-image" [style.background-position]="product.position" role="img" [attr.aria-label]="product.name"></div>
              <div class="shop-product-body">
                <div class="shop-product-meta"><span>{{ product.category }}</span>@if (product.badge) { <b>{{ product.badge }}</b> }</div>
                <h3>{{ product.name }}</h3>
                <p>{{ product.detail }}</p>
                <div class="shop-product-footer"><strong>S/ {{ product.price }}</strong><button type="button" (click)="selectProduct(product)">Ver ficha <span>↗</span></button></div>
              </div>
            </article>
          }
        </div>
      </section>

      @if (selectedProduct(); as product) {
        <section class="shop-selection" aria-live="polite">
          <div><span class="shop-kicker"><i></i> PRODUCTO SELECCIONADO</span><h2>{{ product.name }}</h2><p>{{ product.detail }} Ideal para complementar tu plan de entrenamiento en Max Fit.</p></div>
          <div class="shop-selection-price"><span>Precio referencial</span><strong>S/ {{ product.price }}</strong><button class="shop-primary-button" type="button" (click)="selectedProduct.set(null)">Seguir explorando</button></div>
        </section>
      }

      <footer class="shop-footer"><div class="shop-brand"><span class="shop-brand-mark">MF</span><span>MAX <b>FIT</b><small>DISCIPLINA · PERSONAS · RESULTADOS</small></span></div><div><span>¿Ya tienes una cuenta?</span><button type="button" (click)="backToLogin.emit()">Ingresar al sistema <span>→</span></button></div></footer>
    </main>
  `,
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  @Output() readonly backToLogin = new EventEmitter<void>();

  protected readonly categories: ShopCategory[] = ['Todos', 'Proteínas', 'Rendimiento', 'Accesorios', 'Bienestar'];
  protected readonly selectedCategory = signal<ShopCategory>('Todos');
  protected readonly selectedProduct = signal<ShopProduct | null>(null);
  protected readonly products: ShopProduct[] = [
    { name: 'Whey Protein Gold', category: 'Proteínas', price: 189, detail: '2 lb · 24 g de proteína por porción', badge: 'Más elegido', position: '0% 0%' },
    { name: 'Whey Isolate Zero', category: 'Proteínas', price: 229, detail: '2 lb · fórmula ligera y de rápida absorción', position: '33.333% 0%' },
    { name: 'Creatina Monohidratada', category: 'Rendimiento', price: 99, detail: '300 g · fuerza y recuperación diaria', badge: 'Esencial', position: '66.666% 0%' },
    { name: 'Pre-Workout Fury', category: 'Rendimiento', price: 119, detail: '30 servicios · energía para tu sesión', position: '100% 0%' },
    { name: 'BCAA Recovery', category: 'Rendimiento', price: 89, detail: '30 servicios · apoyo durante el entrenamiento', position: '0% 50%' },
    { name: 'Mass Gainer Pro', category: 'Proteínas', price: 179, detail: '6 lb · aporte para ganar masa muscular', position: '33.333% 50%' },
    { name: 'Shaker Max Fit', category: 'Accesorios', price: 39, detail: '700 ml · mezclador con cierre seguro', position: '66.666% 50%' },
    { name: 'Protein Bars Pack', category: 'Proteínas', price: 59, detail: 'Caja x 12 · snack práctico y proteico', position: '100% 50%' },
    { name: 'Multivitamínico Active', category: 'Bienestar', price: 69, detail: '60 cápsulas · soporte para tu rutina', position: '0% 100%' },
    { name: 'Bandas de Resistencia', category: 'Accesorios', price: 79, detail: 'Set x 3 · movilidad y activación', position: '33.333% 100%' },
    { name: 'Guantes de Entrenamiento', category: 'Accesorios', price: 49, detail: 'Talla ajustable · agarre y protección', position: '66.666% 100%' },
    { name: 'Toalla Max Fit', category: 'Accesorios', price: 35, detail: 'Microfibra · ligera y de secado rápido', position: '100% 100%' }
  ];
  protected readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    return category === 'Todos' ? this.products : this.products.filter(product => product.category === category);
  });

  protected selectProduct(product: ShopProduct): void { this.selectedProduct.set(product); }
  protected scrollToCatalog(): void { document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}
