import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ChevronRight,
  ChevronDown,
  Filter,
  Package,
  BookOpen,
  Skull,
  Truck,
  Store
} from 'lucide-react';
import { products } from './data';
import { Product, CartItem } from './types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOGO_URL = "https://scontent.fgdl3-1.fna.fbcdn.net/v/t39.30808-6/468130689_969276495036825_7144227031339595849_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=Kt37THAg6MAQ7kNvwGNSckp&_nc_oc=AdmZzBiaxyxfv9I35xyynPrVeP3hfowWW4xKwuDc9nlXvKfkvZUcNEyyPe3rpYXN014&_nc_zt=23&_nc_ht=scontent.fgdl3-1.fna&_nc_gid=JlwBtoAUVh7PAGkuuPlD0Q&oh=00_AftdKERkIWAd5E99QIy-Gb8LOvZokg_sK30qsEBU-fJpyg&oe=69A2AB32";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<'all' | 'figura' | 'comic'>('all');
  const [subcategoryFilter, setSubcategoryFilter] = useState<'all' | 'dc' | 'marvel' | 'starwars' | 'lego' | 'anime'>('all');
  const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [needsShipping, setNeedsShipping] = useState(false);

  const handleCheckout = () => {
    const phoneNumber = "521234567890"; // TODO: Reemplazar con el número de WhatsApp real
    const itemsText = cart.map(item => `• ${item.name} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`).join('\n');
    const shippingText = needsShipping ? "Con envío (Por cotizar)" : "Sin envío (Recoger en tienda)";
    const totalText = `Total a pagar: $${cartTotal.toFixed(2)}`;
    
    const message = `¡Hola Dr. Veneno! 🧪✨\nMe gustaría realizar el siguiente pedido:\n\n${itemsText}\n\n📦 Envío: ${shippingText}\n\n💰 ${totalText}`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesFilter = filter === 'all' || p.category === filter;
      const matchesSubcategory = filter !== 'figura' || subcategoryFilter === 'all' || p.subcategory === subcategoryFilter;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSubcategory && matchesSearch;
    });
  }, [filter, subcategoryFilter, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, Math.min(item.quantity + delta, item.stock));
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-venom-dark selection:bg-venom-green selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-venom-dark/80 backdrop-blur-md border-b border-venom-green/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-2 bg-venom-green/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative w-16 h-16 bg-black border-2 border-venom-green/50 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.3)] group-hover:shadow-[0_0_25px_rgba(57,255,20,0.6)] transition-all">
                <img 
                  src={LOGO_URL} 
                  alt="DR. VENENO Logo" 
                  className="w-full h-full object-cover scale-110"
                  onError={(e) => {
                    // Fallback si no encuentra la imagen local
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/skull/200/200";
                  }}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="flex flex-col -space-y-2">
              <span className="text-sm font-black text-venom-green tracking-[0.3em] uppercase italic ml-1">DR.</span>
              <span className="text-4xl font-display font-black tracking-tighter uppercase italic leading-none text-white drop-shadow-[0_0_12px_rgba(57,255,20,0.4)]">
                VENENO
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setFilter('all')}
              className={cn("text-sm uppercase tracking-widest hover:text-venom-green transition-colors", filter === 'all' && "text-venom-green underline underline-offset-8")}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilter('figura')}
              className={cn("text-sm uppercase tracking-widest hover:text-venom-green transition-colors", filter === 'figura' && "text-venom-green underline underline-offset-8")}
            >
              Figuras
            </button>
            <button 
              onClick={() => setFilter('comic')}
              className={cn("text-sm uppercase tracking-widest hover:text-venom-green transition-colors", filter === 'comic' && "text-venom-green underline underline-offset-8")}
            >
              Cómics
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-venom-muted border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-venom-green/50 w-48 transition-all focus:w-64"
              />
            </div>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-venom-green text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,var(--color-venom-green)_0%,transparent_70%)] blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic mb-6 leading-[0.85]">
              LA DOSIS <br />
              <span className="text-venom-green drop-shadow-[0_0_25px_rgba(0,255,65,0.4)]">SUPREMA</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto text-lg mb-10 font-medium">
              Figuras de colección y cómics con el sello del Doctor. Entra en el laboratorio y consigue las piezas más letales para tu colección. Los esperamos en esta su casa donde siempre reina el caos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-venom-green text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2">
                Ver Novedades <ChevronRight className="w-4 h-4" />
              </button>
              <button className="border border-white/20 hover:border-venom-green/50 px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-colors">
                Sobre Nosotros
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 pb-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <h2 className="text-3xl font-bold uppercase tracking-tight flex items-center gap-3">
            <Filter className="w-6 h-6 text-venom-green" />
            Catálogo <span className="text-white/20 hidden sm:inline">/ {filter === 'all' ? 'Todos' : filter === 'figura' ? 'Figuras' : 'Cómics'}</span>
          </h2>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
            {['all', 'figura', 'comic'].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f as any);
                  if (f !== 'figura') setSubcategoryFilter('all');
                }}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                  filter === f ? "bg-venom-green text-black" : "bg-venom-muted text-white/40 hover:text-white"
                )}
              >
                {f === 'all' ? 'Todos' : f === 'figura' ? 'Figuras' : 'Cómics'}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {filter === 'figura' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-12 relative z-20"
            >
              <div className="flex flex-col gap-2 max-w-[240px]">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-venom-green ml-1">Universo</label>
                <div className="relative">
                  <button 
                    onClick={() => setIsSubcategoryOpen(!isSubcategoryOpen)}
                    className="w-full bg-venom-muted border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-bold uppercase tracking-widest hover:border-venom-green/30 transition-all"
                  >
                    <span>
                      {subcategoryFilter === 'all' ? 'Todas las Marcas' : 
                       subcategoryFilter === 'starwars' ? 'Star Wars' : 
                       subcategoryFilter.toUpperCase()}
                    </span>
                    <ChevronDown className={cn("w-4 h-4 text-venom-green transition-transform", isSubcategoryOpen && "rotate-180")} />
                  </button>
                  
                  <AnimatePresence>
                    {isSubcategoryOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 5 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-venom-muted border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl z-30"
                      >
                        {[
                          { id: 'all', label: 'Todas las Marcas' },
                          { id: 'dc', label: 'DC Comics' },
                          { id: 'marvel', label: 'Marvel' },
                          { id: 'starwars', label: 'Star Wars' },
                          { id: 'lego', label: 'Lego' },
                          { id: 'anime', label: 'Anime' }
                        ].map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              setSubcategoryFilter(sub.id as any);
                              setIsSubcategoryOpen(false);
                            }}
                            className={cn(
                              "w-full px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest transition-colors border-b border-white/5 last:border-0",
                              subcategoryFilter === sub.id 
                                ? "bg-venom-green text-black" 
                                : "hover:bg-white/5 text-white/60 hover:text-white"
                            )}
                          >
                            {sub.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group bg-venom-muted rounded-2xl overflow-hidden border border-white/5 hover:border-venom-green/30 transition-colors"
              >
                <div className="aspect-[3/4] overflow-hidden relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-black/80 backdrop-blur-md text-venom-green text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-venom-green/20">
                      {product.category === 'figura' ? <Package className="inline w-3 h-3 mr-1" /> : <BookOpen className="inline w-3 h-3 mr-1" />}
                      {product.category}
                    </span>
                    {product.subcategory && (
                      <span className="bg-venom-green text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-[0.2em] w-fit">
                        {product.subcategory}
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-venom-green text-black py-3 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"
                    >
                      Añadir al Carrito <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold group-hover:text-venom-green transition-colors">{product.name}</h3>
                    <span className="text-venom-green font-display font-bold text-lg">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-white/40 text-sm line-clamp-2">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-venom-muted z-[70] border-l border-venom-green/10 flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h2 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6 text-venom-green" />
                  Carrito <span className="text-white/20">({cartCount})</span>
                </h2>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-40">
                    <ShoppingCart className="w-16 h-16" />
                    <p className="text-lg font-medium">Tu carrito está vacío</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-venom-green underline underline-offset-4 font-bold uppercase tracking-widest text-sm"
                    >
                      Seguir Comprando
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold truncate pr-2">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-venom-green font-display font-medium mb-3">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-black/40 rounded-lg border border-white/5">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:text-venom-green transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:text-venom-green transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-[10px] text-white/20 uppercase font-bold tracking-widest">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-black/40 border-t border-white/5 space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/40">Opciones de Entrega</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setNeedsShipping(false)}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-2",
                        !needsShipping 
                          ? "bg-venom-green/10 border-venom-green text-venom-green" 
                          : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                      )}
                    >
                      <Store className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-tight">Sin Envío</span>
                    </button>
                    <button 
                      onClick={() => setNeedsShipping(true)}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-2",
                        needsShipping 
                          ? "bg-venom-green/10 border-venom-green text-venom-green" 
                          : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                      )}
                    >
                      <Truck className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase tracking-tight">Con Envío</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/40">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/40">
                    <span>Envío</span>
                    <span className={cn(needsShipping ? "text-yellow-500 italic" : "text-venom-green")}>
                      {needsShipping ? "Por cotizar" : "Gratis (Recoger)"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-white/5">
                    <span>Total</span>
                    <span className="text-venom-green">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                  className="w-full bg-venom-green text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:hover:scale-100"
                >
                  Finalizar Pedido
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-venom-muted border-t border-white/5 py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-venom-green/50 shadow-[0_0_20px_rgba(57,255,20,0.3)]">
                <img 
                  src={LOGO_URL} 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/skull/200/200";
                  }}
                  referrerPolicy="no-referrer" 
                />
              </div>
              <div className="flex flex-col -space-y-2">
                <span className="text-sm font-black text-venom-green tracking-[0.3em] uppercase italic ml-1">DR.</span>
                <span className="text-4xl font-display font-black tracking-tighter uppercase italic leading-none">
                  VENENO
                </span>
              </div>
            </div>
            <p className="text-white/40 max-w-md font-medium text-lg leading-relaxed">
              La guarida oficial de las piezas más letales del coleccionismo. 
              Calidad tóxica garantizada por el Doctor.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Navegación</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-venom-green transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-venom-green transition-colors">Figuras</a></li>
              <li><a href="#" className="hover:text-venom-green transition-colors">Cómics</a></li>
              <li><a href="#" className="hover:text-venom-green transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Legal</h4>
            <ul className="space-y-4 text-white/40 text-sm">
              <li><a href="#" className="hover:text-venom-green transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-venom-green transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-venom-green transition-colors">Envíos y Devoluciones</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} Doctor Veneno. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
