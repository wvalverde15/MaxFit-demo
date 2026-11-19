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
  templateUrl: './shop.component.html',
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

