import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, Search, Leaf, Package, CheckCircle, ChevronRight,
  Star, Heart, X, Plus, Minus, Shield, Award, Users, TrendingUp,
  Clock, MapPin, Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  artisan: string;
  rating: number;
  image: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface CartItem {
  product: Product;
  quantity: number;
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

const Navbar = ({
  onViewChange, onOpenPanel, onOpenCart, currentView,
  user, onLogout, cartCount, searchQuery, onSearch,
}: {
  onViewChange: (view: string) => void;
  onOpenPanel: (panel: 'seller' | 'admin' | 'none') => void;
  onOpenCart: () => void;
  currentView: string;
  user: { email: string; role: 'admin' | 'seller' } | null;
  onLogout: () => void;
  cartCount: number;
  searchQuery: string;
  onSearch: (q: string) => void;
}) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/80 backdrop-blur-lg border-b border-primary/5">
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="flex justify-between items-center h-24">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('marketplace')}>
          <div className="w-11 h-11 brazil-gradient text-white rounded-full flex items-center justify-center font-bold text-sm">AH</div>
          <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-dark">ArtisanHub</span>
        </div>

        <div className="hidden md:flex flex-1 max-w-sm mx-12">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30" size={16} />
            <input
              type="text"
              placeholder="Buscar arte brasileira..."
              value={searchQuery}
              onChange={(e) => {
                onSearch(e.target.value);
                if (e.target.value) onViewChange('catalog');
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-white/40 border border-primary/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/10 font-sans text-[11px] uppercase tracking-wider"
            />
          </div>
        </div>

        <div className="flex items-center gap-10">
          <nav className="font-sans text-[11px] uppercase tracking-widest flex gap-8 opacity-70 hidden lg:flex">
            <button
              className={`hover:opacity-100 transition-opacity ${currentView === 'marketplace' ? 'opacity-100 font-bold' : ''}`}
              onClick={() => onViewChange('marketplace')}
            >Marketplace</button>
            <button
              className={`hover:opacity-100 transition-opacity ${currentView === 'catalog' ? 'opacity-100 font-bold' : ''}`}
              onClick={() => onViewChange('catalog')}
            >Catálogo</button>
            <button
              className={`hover:opacity-100 transition-opacity ${currentView === 'curatorship' ? 'opacity-100 font-bold' : ''}`}
              onClick={() => onViewChange('curatorship')}
            >Curadoria</button>
            <button
              className={`hover:opacity-100 transition-opacity ${currentView === 'transparency' ? 'opacity-100 font-bold' : ''}`}
              onClick={() => onViewChange('transparency')}
            >Sobre</button>
            {user?.role === 'admin' && (
              <button className="hover:opacity-100 transition-opacity text-accent font-bold" onClick={() => onOpenPanel('admin')}>Admin</button>
            )}
            {user?.role === 'seller' && (
              <button className="hover:opacity-100 transition-opacity text-primary font-bold" onClick={() => onOpenPanel('seller')}>Meu Painel</button>
            )}
          </nav>

          <div className="flex items-center gap-5">
            <div className="relative cursor-pointer group" onClick={onOpenCart}>
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform text-dark" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
              )}
            </div>
            {user ? (
              <button
                onClick={onLogout}
                className="font-sans text-[10px] font-bold uppercase tracking-widest bg-dark text-white px-6 py-3 rounded-full hover:bg-red-500 transition-all"
              >Sair</button>
            ) : (
              <button
                className="font-sans text-[10px] font-bold uppercase tracking-widest border border-dark/20 px-6 py-3 rounded-full hover:bg-dark hover:text-white transition-all"
                onClick={() => onViewChange('auth')}
              >Acesso</button>
            )}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

// ─── HERO ────────────────────────────────────────────────────────────────────

const Hero = ({ onCatalogClick }: { onCatalogClick: () => void }) => (
  <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
    <div className="grid lg:grid-cols-12 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="lg:col-span-7"
      >
        <span className="font-sans italic text-sm text-primary mb-4 block">Conectando raízes à tecnologia</span>
        <h1 className="hero-heading mb-8">
          Artesanato <br />
          <span className="italic font-normal">Brasileiro</span>
        </h1>
        <p className="font-sans text-lg text-dark/60 max-w-md font-light leading-relaxed mb-12">
          Uma plataforma premium focada na valorização da cultura nacional através de processos gerenciados e curadoria rigorosa.
        </p>
        <div className="flex flex-wrap gap-8 items-center">
          <button
            onClick={onCatalogClick}
            className="brazil-gradient text-white px-10 py-5 rounded-full font-sans text-xs font-bold uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-transform flex items-center gap-2 group"
          >
            Explorar Catálogo <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-dark/10 overflow-hidden">
                  <img src={`https://picsum.photos/seed/user${i}/100`} alt="Artesão" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-full border-2 border-white bg-primary flex items-center justify-center text-[10px] text-white font-bold tracking-tighter">+120</div>
            </div>
            <span className="font-sans text-[10px] text-dark/40 font-bold uppercase tracking-widest leading-none">
              Artesãos <br /> Ativos
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="lg:col-span-5 relative"
      >
        <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-3xl relative z-10 border-[12px] border-white/50">
          <img
            src="https://picsum.photos/seed/artisanhub-vibe/800/1000"
            alt="Artesanato Brasileiro"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-0"></div>
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[120px] -z-0"></div>
      </motion.div>
    </div>
  </section>
);

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

const ProductCard = ({ product, onClick }: { product: Product; onClick: () => void }) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="premium-card p-5 group cursor-pointer"
    onClick={onClick}
  >
    <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden mb-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <button className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full text-dark hover:bg-dark hover:text-white transition-all shadow-sm">
        <Heart size={16} />
      </button>
      <div className="absolute bottom-5 left-5 right-5">
        <div className="bg-dark text-white p-3 rounded-2xl shadow-lg flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-300">
          <span className="text-[10px] font-bold font-sans tracking-widest uppercase ml-2">Explorar Peça</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <ChevronRight size={14} />
          </div>
        </div>
      </div>
    </div>
    <div className="px-1">
      <div className="flex justify-between items-start mb-3">
        <span className="text-[10px] font-sans text-primary font-bold uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded-md">{product.category}</span>
        {product.rating > 0 && (
          <div className="flex items-center gap-1 opacity-60">
            <Star size={10} className="fill-accent text-accent" />
            <span className="text-[10px] font-bold font-sans">{product.rating}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold mb-1 truncate text-dark leading-none">{product.name}</h3>
      <p className="text-[13px] text-dark/40 font-sans mb-5 italic">por {product.artisan}</p>
      <p className="text-xl font-bold font-sans text-dark tracking-tight">R$ {product.price.toFixed(2)}</p>
    </div>
  </motion.div>
);

// ─── CART DRAWER ──────────────────────────────────────────────────────────────

const CartDrawer = ({
  cart, isOpen, onClose, onUpdateQty, onRemove, onCheckout,
}: {
  cart: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const [ordered, setOrdered] = useState(false);

  const handleCheckout = () => {
    setOrdered(true);
    onCheckout();
    setTimeout(() => {
      setOrdered(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-dark/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-[80] w-full max-w-md bg-secondary shadow-2xl flex flex-col"
          >
            <div className="p-8 border-b border-primary/10 flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">Carrinho</h2>
              <button onClick={onClose} className="p-2 hover:bg-primary/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              {ordered ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-6">
                  <div className="w-20 h-20 brazil-gradient rounded-full flex items-center justify-center">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Pedido Confirmado!</h3>
                  <p className="font-sans text-dark/60 text-sm leading-relaxed max-w-xs">Seu pedido foi recebido e está sendo processado. Uma confirmação será enviada para o seu e-mail.</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center gap-4">
                  <ShoppingCart size={48} className="text-dark/20" />
                  <h3 className="text-xl font-bold">Carrinho vazio</h3>
                  <p className="font-sans text-dark/50 text-sm">Adicione peças do nosso catálogo para começar.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.product.id} className="flex gap-4 items-start">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-primary/10">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.product.name}</h4>
                        <p className="font-sans text-xs text-dark/40 italic mb-3">por {item.product.artisan}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-primary/10 rounded-full bg-white overflow-hidden">
                            <button
                              onClick={() => onUpdateQty(item.product.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-primary/5 transition-colors"
                            ><Minus size={12} /></button>
                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-primary/5 transition-colors"
                            ><Plus size={12} /></button>
                          </div>
                          <p className="font-bold text-sm">R$ {(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <button onClick={() => onRemove(item.product.id)} className="p-1 text-dark/30 hover:text-red-500 transition-colors mt-1">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {!ordered && cart.length > 0 && (
              <div className="p-8 border-t border-primary/10 space-y-4">
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-dark/50">Subtotal</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-sans text-sm">
                  <span className="text-dark/50">Frete</span>
                  <span className="text-green-600 font-bold">Grátis</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-primary/10 pt-4">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full py-4 brazil-gradient text-white rounded-full font-sans text-[11px] font-bold uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-transform"
                >
                  Finalizar Pedido
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── SELLER DASHBOARD ─────────────────────────────────────────────────────────

const SellerDashboard = ({
  onClose, products, onSubmitProduct,
}: {
  onClose: () => void;
  products: Product[];
  onSubmitProduct: (p: Omit<Product, 'id' | 'rating' | 'status'>) => void;
}) => {
  const [form, setForm] = useState({ name: '', category: 'Cerâmica', price: 0, artisan: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const myProducts = products.filter(p => p.status !== 'rejected');
  const revenue = myProducts.filter(p => p.status === 'approved').reduce((s, p) => s + p.price * 2, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProduct({ ...form, image: `https://picsum.photos/seed/prod${Date.now()}/400/500` });
    setForm({ name: '', category: 'Cerâmica', price: 0, artisan: '', description: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#fdfcf9] flex flex-col font-serif overflow-hidden">
      <div className="p-10 border-b border-primary/10 flex justify-between items-center">
        <div>
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40 block mb-1">Área Privada</span>
          <h2 className="text-4xl font-black tracking-tighter">Painel do Artesão</h2>
        </div>
        <button onClick={onClose} className="font-sans text-[10px] font-bold uppercase tracking-widest border border-dark/20 px-8 py-3 rounded-full hover:bg-dark hover:text-white transition-all">
          Sair do Painel
        </button>
      </div>

      <div className="flex-1 p-10 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card p-8">
            <p className="text-[10px] font-sans text-dark/40 uppercase tracking-[0.2em] mb-2 font-bold">Faturamento</p>
            <p className="text-4xl font-bold tracking-tight">R$ {revenue.toFixed(0)}</p>
          </div>
          <div className="glass-card p-8">
            <p className="text-[10px] font-sans text-dark/40 uppercase tracking-[0.2em] mb-2 font-bold">Produtos Aprovados</p>
            <p className="text-4xl font-bold tracking-tight">{myProducts.filter(p => p.status === 'approved').length}</p>
          </div>
          <div className="glass-card p-8">
            <p className="text-[10px] font-sans text-dark/40 uppercase tracking-[0.2em] mb-2 font-bold">Em Curadoria</p>
            <p className="text-4xl font-bold tracking-tight">{myProducts.filter(p => p.status === 'pending').length}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-6">Meus Produtos</h3>
            {myProducts.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <p className="font-sans text-dark/50 text-sm">Nenhum produto cadastrado. Publique sua primeira peça!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myProducts.map(p => (
                  <div key={p.id} className="glass-card p-5 flex items-center gap-4">
                    <div className="w-14 h-14 bg-dark/5 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm truncate">{p.name}</p>
                      <p className="font-sans text-xs text-dark/40">R$ {p.price.toFixed(2)} · {p.category}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase font-sans flex-shrink-0 ${
                      p.status === 'approved' ? 'bg-green-500/10 text-green-700' :
                      p.status === 'pending' ? 'bg-accent/20 text-accent' :
                      'bg-red-500/10 text-red-600'
                    }`}>
                      {p.status === 'approved' ? 'Aprovado' : p.status === 'pending' ? 'Em análise' : 'Rejeitado'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-2xl font-bold tracking-tight mb-6">Publicar Nova Peça</h3>
            {submitted ? (
              <div className="glass-card p-12 text-center space-y-4">
                <div className="w-16 h-16 brazil-gradient rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-bold">Enviado para Curadoria!</h4>
                <p className="font-sans text-dark/50 text-sm">Nossa equipe analisará sua peça em até 24 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-5 font-sans">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Nome da Peça *</label>
                  <input required type="text" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-5 py-3 bg-white border border-primary/10 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Categoria</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                      className="w-full px-5 py-3 bg-white border border-primary/10 rounded-2xl text-sm focus:outline-none">
                      {['Cerâmica', 'Têxtil', 'Escultura', 'Bordado', 'Madeira', 'Couro', 'Jóias'].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Preço (R$) *</label>
                    <input required type="number" min="1" step="0.01" value={form.price || ''}
                      onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
                      className="w-full px-5 py-3 bg-white border border-primary/10 rounded-2xl text-sm focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Artesão / Mestre *</label>
                  <input required type="text" value={form.artisan}
                    onChange={e => setForm({ ...form, artisan: e.target.value })}
                    className="w-full px-5 py-3 bg-white border border-primary/10 rounded-2xl text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Descrição *</label>
                  <textarea required value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    className="w-full px-5 py-3 bg-white border border-primary/10 rounded-2xl text-sm focus:outline-none h-28 resize-none" />
                </div>
                <button type="submit" className="w-full py-4 brazil-gradient text-white rounded-full font-bold uppercase text-[10px] tracking-widest shadow-lg">
                  Enviar para Curadoria
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────

const AdminDashboard = ({
  user, onClose, products, onApprove, onReject, onAddProduct,
}: {
  user: { email: string; role: string } | null;
  onClose: () => void;
  products: Product[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onAddProduct: () => void;
}) => {
  const pending = products.filter(p => p.status === 'pending');
  const approved = products.filter(p => p.status === 'approved');

  return (
    <div className="fixed inset-0 z-[60] bg-dark text-secondary flex flex-col font-serif">
      <div className="p-10 border-b border-white/5 flex justify-between items-center">
        <div>
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 block mb-1">Painel de Governança</span>
          <h2 className="text-4xl font-black tracking-tighter">Administração do Marketplace</h2>
        </div>
        <div className="flex gap-4">
          {user?.email === 'admin@artisa.com.br' && (
            <button
              onClick={onAddProduct}
              className="font-sans text-[10px] font-bold uppercase tracking-widest bg-accent text-white px-8 py-3 rounded-full hover:bg-white hover:text-dark transition-all"
            >+ Adicionar Produto</button>
          )}
          <button onClick={onClose} className="font-sans text-[10px] font-bold uppercase tracking-widest border border-white/20 px-8 py-3 rounded-full hover:bg-white hover:text-dark transition-all">
            Fechar
          </button>
        </div>
      </div>

      <div className="flex-1 p-10 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 brazil-gradient opacity-10 blur-3xl group-hover:opacity-30 transition-opacity"></div>
            <p className="text-[10px] font-sans opacity-40 uppercase tracking-[0.3em] mb-2 font-bold">Aguardando Curadoria</p>
            <p className="text-6xl font-bold tracking-tighter">{pending.length}</p>
          </div>
          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
            <p className="text-[10px] font-sans opacity-40 uppercase tracking-[0.3em] mb-2 font-bold">Produtos Aprovados</p>
            <p className="text-6xl font-bold tracking-tighter">{approved.length}</p>
          </div>
          <div className="bg-white/5 p-10 rounded-[40px] border border-white/10">
            <p className="text-[10px] font-sans opacity-40 uppercase tracking-[0.3em] mb-2 font-bold">Total no Catálogo</p>
            <p className="text-6xl font-bold tracking-tighter">{products.length}</p>
          </div>
        </div>

        <h3 className="text-3xl font-bold mb-8 tracking-tight">Produtos Pendentes de Aprovação</h3>
        {pending.length === 0 ? (
          <div className="bg-white/5 p-12 rounded-[40px] text-center">
            <p className="font-sans opacity-40 text-sm">Nenhum produto aguardando aprovação no momento.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pending.map(product => (
              <div key={product.id} className="bg-white/5 p-6 rounded-[32px] border border-white/5 flex items-center justify-between gap-8 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-white/10 rounded-3xl overflow-hidden flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tracking-tight">{product.name}</p>
                    <p className="text-[11px] font-sans opacity-40 uppercase tracking-widest mt-1">
                      Artesão: {product.artisan} · {product.category} · R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 font-sans flex-shrink-0">
                  <button
                    onClick={() => onApprove(product.id)}
                    className="px-8 py-3 bg-white text-dark rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-400 transition-colors"
                  >Aprovar</button>
                  <button
                    onClick={() => onReject(product.id)}
                    className="px-8 py-3 bg-red-500/20 text-red-400 border border-red-500/20 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
                  >Rejeitar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activePanel, setActivePanel] = useState<'seller' | 'admin' | 'none'>('none');
  const [currentView, setCurrentView] = useState('marketplace');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: 'admin' | 'seller' } | null>(null);
  const [showLeafInfo, setShowLeafInfo] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCatalogCategory, setActiveCatalogCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    name: '', price: 0, category: 'Cerâmica', artisan: '', description: '',
    image: 'https://picsum.photos/seed/global/400/500',
  });

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) return prev.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(prev =>
      prev.map(item => item.product.id === productId
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const approveProduct = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'approved' } : p));
  };

  const rejectProduct = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
  };

  const handleSubmitSellerProduct = (productData: Omit<Product, 'id' | 'rating' | 'status'>) => {
    setProducts(prev => [...prev, { id: `p-${Date.now()}`, ...productData, rating: 0, status: 'pending' }]);
  };

  const handleAddGlobalProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product: Product = {
      id: `g-${Date.now()}`,
      ...newProductForm,
      image: `https://picsum.photos/seed/glob${Date.now()}/400/500`,
      rating: 5.0,
      status: 'approved',
    };
    setProducts(prev => [product, ...prev]);
    setAddingProduct(false);
    setNewProductForm({ name: '', price: 0, category: 'Cerâmica', artisan: '', description: '', image: '' });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (loginForm.email === 'admin@artisa.com.br' && loginForm.password === 'admin@123') {
      setCurrentUser({ email: loginForm.email, role: 'admin' });
      setActivePanel('admin');
      setCurrentView('marketplace');
    } else if (loginForm.email && loginForm.password.length >= 6) {
      setCurrentUser({ email: loginForm.email, role: 'seller' });
      setActivePanel('seller');
      setCurrentView('marketplace');
    } else {
      setLoginError('E-mail ou senha inválidos. A senha deve ter ao menos 6 caracteres.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('marketplace');
    setActivePanel('none');
    setLoginForm({ email: '', password: '' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product_detail');
    window.scrollTo(0, 0);
  };

  const approvedProducts = products.filter(p => p.status === 'approved');
  const categories = ['Todos', ...Array.from(new Set(approvedProducts.map(p => p.category)))];
  const filteredProducts = approvedProducts.filter(p => {
    const matchCat = activeCatalogCategory === 'Todos' || p.category === activeCatalogCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.name.toLowerCase().includes(q) || p.artisan.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const renderView = () => {
    switch (currentView) {

      // ── MARKETPLACE ──────────────────────────────────────────────────────────
      case 'marketplace':
        return (
          <>
            <Hero onCatalogClick={() => setCurrentView('catalog')} />

            <section className="py-20 px-4 max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <p className="text-accent font-sans text-xs font-semibold uppercase tracking-[0.2em] mb-2">Curadoria ArtisanHub</p>
                  <h2 className="text-4xl font-bold">Destaques da Semana</h2>
                </div>
                <button onClick={() => setCurrentView('catalog')} className="text-primary font-sans font-bold border-b-2 border-primary pb-1 hover:opacity-70 transition-opacity">
                  Ver Catálogo Completo
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                  {loading
                    ? [1, 2, 3].map(i => (
                        <div key={i} className="premium-card p-4 animate-pulse">
                          <div className="aspect-[4/5] bg-primary/5 rounded-2xl mb-6"></div>
                          <div className="h-4 bg-primary/5 rounded w-1/4 mb-4"></div>
                          <div className="h-8 bg-primary/5 rounded w-3/4 mb-4"></div>
                          <div className="h-4 bg-primary/5 rounded w-1/2"></div>
                        </div>
                      ))
                    : approvedProducts.slice(0, 6).map(product => (
                        <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
                      ))
                  }
                </AnimatePresence>
              </div>
            </section>

            <section className="bg-dark text-secondary py-32 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[600px] h-full brazil-gradient opacity-10 blur-[150px]"></div>
              <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-24 items-center">
                <div className="relative">
                  <div className="flex gap-6">
                    <div className="flex-1 mt-16">
                      <img src="https://picsum.photos/seed/artisan-focus/500/700" className="pill-image w-full border-[10px] border-white/5" alt="Artesão trabalhando" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <img src="https://picsum.photos/seed/artisan-hands/500/700" className="pill-image w-full border-[10px] border-white/5" alt="Mãos do artesão" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div
                    onClick={() => setShowLeafInfo(true)}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 brazil-gradient rounded-full shadow-3xl flex items-center justify-center border-[12px] border-dark group cursor-pointer hover:scale-110 transition-transform"
                  >
                    <Leaf size={40} className="text-white fill-white/20" />
                  </div>
                </div>
                <div>
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 block">Nossa Essência</span>
                  <h2 className="text-6xl font-bold mb-10 leading-[0.95] tracking-tight">Empoderando quem cria <br /><span className="italic font-normal">com as próprias mãos.</span></h2>
                  <div className="space-y-10">
                    <div className="flex gap-8 group">
                      <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-accent/20 transition-colors">
                        <CheckCircle className="text-accent" size={24} />
                      </div>
                      <div className="max-w-sm">
                        <h4 className="text-2xl font-bold mb-2">CMMI Gerenciado</h4>
                        <p className="font-sans text-sm text-secondary/50 leading-relaxed">Processos curados e monitorados para garantir que cada entrega seja uma experiência premium.</p>
                      </div>
                    </div>
                    <div className="flex gap-8 group">
                      <div className="flex-shrink-0 w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 group-hover:bg-accent/20 transition-colors">
                        <Package className="text-accent" size={24} />
                      </div>
                      <div className="max-w-sm">
                        <h4 className="text-2xl font-bold mb-2">B2C Escalável</h4>
                        <p className="font-sans text-sm text-secondary/50 leading-relaxed">Tecnologia avançada para conectar a escala global ao micro-empreendedor nacional.</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { if (currentUser) setActivePanel('seller'); else setCurrentView('auth'); }}
                    className="mt-14 px-12 py-6 bg-white text-dark rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-accent transition-colors shadow-2xl"
                  >
                    Junte-se à Revolução
                  </button>
                </div>
              </div>
            </section>
          </>
        );

      // ── CATÁLOGO ─────────────────────────────────────────────────────────────
      case 'catalog':
        return (
          <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-5xl font-bold mb-3 tracking-tight">Catálogo Completo</h2>
              <p className="font-sans text-dark/50 text-sm">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'peça encontrada' : 'peças encontradas'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <aside className="md:col-span-1 space-y-8 font-sans">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-40">Busca</h4>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/30" size={14} />
                    <input
                      type="text"
                      placeholder="Nome, artesão..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 bg-white border border-primary/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/10"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-40">Categorias</h4>
                  <ul className="space-y-1 text-sm">
                    {categories.map(cat => (
                      <li key={cat}>
                        <button
                          onClick={() => setActiveCatalogCategory(cat)}
                          className={`w-full text-left flex justify-between items-center py-2 px-3 rounded-xl transition-colors ${
                            activeCatalogCategory === cat ? 'bg-primary/10 text-primary font-bold' : 'hover:text-accent hover:bg-primary/5'
                          }`}
                        >
                          <span>{cat}</span>
                          <span className="text-[10px] opacity-50">
                            ({cat === 'Todos' ? approvedProducts.length : approvedProducts.filter(p => p.category === cat).length})
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {(searchQuery || activeCatalogCategory !== 'Todos') && (
                  <button
                    onClick={() => { setSearchQuery(''); setActiveCatalogCategory('Todos'); }}
                    className="font-sans text-[11px] text-primary font-bold underline"
                  >
                    Limpar filtros
                  </button>
                )}
              </aside>

              <div className="md:col-span-3">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-24">
                    <p className="font-sans text-dark/40 text-lg mb-4">Nenhuma peça encontrada.</p>
                    <button
                      onClick={() => { setSearchQuery(''); setActiveCatalogCategory('Todos'); }}
                      className="font-sans text-sm text-primary font-bold underline"
                    >Limpar filtros</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} onClick={() => handleProductClick(product)} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      // ── CURADORIA ────────────────────────────────────────────────────────────
      case 'curatorship':
        return (
          <section className="pt-40 pb-20 px-8 max-w-5xl mx-auto">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 block">Nossa Metodologia</span>
            <h2 className="text-6xl font-bold mb-12 tracking-tighter leading-none">Curadoria <br /><span className="italic font-normal">de Qualidade.</span></h2>
            <div className="grid md:grid-cols-2 gap-12 font-sans">
              <div className="space-y-8">
                <div className="p-8 glass-card">
                  <h3 className="text-xl font-bold mb-4">CMMI Gerenciado (Nível 2)</h3>
                  <p className="text-dark/60 leading-relaxed text-sm">Adotamos processos estruturados onde cada pedido é planejado, executado e monitorado, garantindo rastreabilidade desde a mesa do artesão até a casa do cliente.</p>
                </div>
                <div className="p-8 glass-card">
                  <h3 className="text-xl font-bold mb-4">Engenharia de Software</h3>
                  <p className="text-dark/60 leading-relaxed text-sm">Desenvolvimento incremental com foco em módulos funcionais, validando cada etapa com testes de usabilidade rigorosos.</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-8 glass-card">
                  <h3 className="text-xl font-bold mb-4">IHC & Usabilidade</h3>
                  <p className="text-dark/60 leading-relaxed text-sm">A interface ArtisanHub é desenhada sob princípios de Interação Humano-Computador, priorizando acessibilidade e fluxos intuitivos para todos os perfis de usuário.</p>
                </div>
                <div className="p-8 glass-card">
                  <h3 className="text-xl font-bold mb-4">Padrões de Qualidade</h3>
                  <p className="text-dark/60 leading-relaxed text-sm">Rigorosa análise de cada produto: autenticidade cultural, procedência sustentável e acabamento técnico verificado antes da publicação.</p>
                </div>
              </div>
            </div>
          </section>
        );

      // ── AUTH ─────────────────────────────────────────────────────────────────
      case 'auth':
        return (
          <section className="pt-40 pb-20 px-8 max-w-md mx-auto">
            <div className="glass-card p-10">
              <h2 className="text-4xl font-bold mb-2 text-center text-dark">Acesso Seguro</h2>
              <p className="text-center font-sans text-sm text-dark/40 mb-8">Entre como artesão ou administrador</p>
              <form onSubmit={handleLogin} className="space-y-4 font-sans">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">E-mail</label>
                  <input
                    type="email" required
                    value={loginForm.email}
                    onChange={e => { setLoginForm({ ...loginForm, email: e.target.value }); setLoginError(''); }}
                    placeholder="seu@email.com.br"
                    className="w-full px-5 py-3 bg-white border border-primary/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Senha</label>
                  <input
                    type="password" required
                    value={loginForm.password}
                    onChange={e => { setLoginForm({ ...loginForm, password: e.target.value }); setLoginError(''); }}
                    placeholder="••••••••"
                    className="w-full px-5 py-3 bg-white border border-primary/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/10 text-sm"
                  />
                </div>
                {loginError && (
                  <p className="text-red-500 font-sans text-xs">{loginError}</p>
                )}
                <button type="submit" className="w-full py-4 bg-dark text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors mt-6 shadow-xl shadow-primary/10">
                  Entrar na Plataforma
                </button>
              </form>
              <p className="text-center font-sans text-[11px] text-dark/30 mt-6">
                Novo artesão?{' '}
                <button onClick={() => { setCurrentUser({ email: 'artesao@artisanhub.com.br', role: 'seller' }); setActivePanel('seller'); setCurrentView('marketplace'); }} className="text-primary font-bold hover:underline">
                  Comece aqui
                </button>
              </p>
            </div>
          </section>
        );

      // ── DETALHE DO PRODUTO ───────────────────────────────────────────────────
      case 'product_detail':
        if (!selectedProduct) return null;
        return (
          <section className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentView('catalog')}
              className="font-sans text-[10px] font-bold uppercase tracking-widest mb-12 flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity"
            >
              ← Voltar ao Catálogo
            </button>
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[16px] border-white">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-4">{selectedProduct.category}</span>
                <h2 className="text-6xl font-bold mb-4 tracking-tighter">{selectedProduct.name}</h2>
                <div className="flex items-center gap-6 mb-8 py-4 border-y border-primary/5">
                  {selectedProduct.rating > 0 && (
                    <>
                      <div className="flex items-center gap-2">
                        <Star size={16} className="fill-accent text-accent" />
                        <span className="font-bold">{selectedProduct.rating}</span>
                      </div>
                      <span className="text-dark/20">|</span>
                    </>
                  )}
                  <p className="font-sans text-sm">Produzido por <span className="font-bold">{selectedProduct.artisan}</span></p>
                </div>
                <p className="font-sans text-lg text-dark/60 leading-relaxed mb-12">
                  {selectedProduct.description}
                </p>
                <div className="flex items-center gap-10 mb-12">
                  <p className="text-4xl font-bold tracking-tight">R$ {selectedProduct.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="brazil-gradient text-white py-6 rounded-full font-sans text-xs font-bold uppercase tracking-widest shadow-2xl hover:scale-[1.02] transition-transform"
                >
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>

            <div className="mt-20">
              <h3 className="text-3xl font-bold mb-10 tracking-tight">Outras Peças que Você Pode Gostar</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {approvedProducts
                  .filter(p => p.id !== selectedProduct.id && p.category === selectedProduct.category)
                  .slice(0, 3)
                  .map(p => (
                    <ProductCard key={p.id} product={p} onClick={() => { setSelectedProduct(p); window.scrollTo(0, 0); }} />
                  ))}
              </div>
            </div>
          </section>
        );

      // ── TRANSPARÊNCIA ────────────────────────────────────────────────────────
      case 'transparency':
        return (
          <section className="pt-40 pb-20 px-8 max-w-5xl mx-auto">
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 block">Sobre Nós</span>
            <h2 className="text-6xl font-bold mb-6 tracking-tighter leading-none">
              Transparência <br /><span className="italic font-normal">é nossa base.</span>
            </h2>
            <p className="font-sans text-dark/60 text-lg max-w-2xl leading-relaxed mb-16">
              O ArtisanHub nasceu da necessidade de criar uma ponte justa entre os mestres artesãos do Brasil e consumidores que valorizam autenticidade. Operamos com total clareza em cada etapa do processo.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                { icon: Users, label: 'Artesãos Cadastrados', value: '842+' },
                { icon: Award, label: 'Peças Curadas', value: '4.200+' },
                { icon: TrendingUp, label: 'Pedidos Realizados', value: '12.400+' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass-card p-10 text-center">
                  <div className="w-14 h-14 brazil-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-white" size={24} />
                  </div>
                  <p className="text-4xl font-bold tracking-tight mb-2">{value}</p>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-dark/40 font-bold">{label}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-16 font-sans">
              <div>
                <h3 className="text-2xl font-bold mb-8">Como Funcionamos</h3>
                <div className="space-y-6">
                  {[
                    { step: '01', title: 'Cadastro', desc: 'O artesão se registra e envia suas peças para análise com fotos e descrição detalhada.' },
                    { step: '02', title: 'Curadoria', desc: 'Nossa equipe valida autenticidade, qualidade cultural e sustentabilidade de cada peça.' },
                    { step: '03', title: 'Publicação', desc: 'Após aprovação, o produto é listado no marketplace e fica disponível para compra.' },
                    { step: '04', title: 'Venda & Entrega', desc: 'Gerenciamos logística e garantimos entrega segura. O artesão recebe em até 5 dias úteis.' },
                  ].map(item => (
                    <div key={item.step} className="flex gap-6 items-start">
                      <span className="font-bold text-accent text-sm font-sans mt-0.5 flex-shrink-0">{item.step}</span>
                      <div>
                        <h4 className="font-bold mb-1">{item.title}</h4>
                        <p className="text-sm text-dark/60 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-8">Nossos Compromissos</h3>
                <div className="space-y-6">
                  {[
                    { icon: Shield, title: 'Dados Protegidos', desc: 'Todas as transações são criptografadas. Seus dados nunca são compartilhados com terceiros.' },
                    { icon: Clock, title: 'Prazo Garantido', desc: 'SLA de entrega monitorado em tempo real. Atrasos são comunicados proativamente.' },
                    { icon: MapPin, title: 'Rastreabilidade', desc: 'Cada peça tem origem documentada: artesão, região, técnica e materiais utilizados.' },
                    { icon: Mail, title: 'Suporte Humano', desc: 'Atendimento real, sem automação. Respondemos em até 4 horas úteis.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4 items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="text-primary" size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{title}</h4>
                        <p className="text-sm text-dark/60 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      // ── TERMOS CMMI ──────────────────────────────────────────────────────────
      case 'cmmi_terms':
        return (
          <section className="pt-40 pb-20 px-8 max-w-4xl mx-auto font-sans">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 block">Governança</span>
            <h2 className="font-serif text-5xl font-bold mb-6 tracking-tighter">Termos & Processos CMMI Nível 2</h2>
            <p className="text-dark/60 text-base leading-relaxed mb-12">
              O ArtisanHub opera segundo as diretrizes do Capability Maturity Model Integration (CMMI) em nível Gerenciado (Nível 2), garantindo processos planejados, rastreáveis e documentados em todas as áreas da plataforma.
            </p>
            <div className="space-y-6">
              {[
                {
                  title: 'Gerência de Requisitos (REQM)',
                  content: 'Todos os requisitos funcionais e não-funcionais são identificados, documentados e rastreados ao longo do ciclo de vida. Mudanças passam por análise de impacto antes de implementação.',
                },
                {
                  title: 'Planejamento de Projeto (PP)',
                  content: 'Cada ciclo de desenvolvimento é precedido por plano detalhado com estimativas de esforço, cronograma, recursos e identificação de riscos. O planejamento é revisado a cada iteração.',
                },
                {
                  title: 'Monitoramento e Controle (PMC)',
                  content: 'O progresso é acompanhado com métricas claras: velocidade de entregas, taxa de defeitos, cobertura de testes e satisfação dos usuários medida através de formulários periódicos.',
                },
                {
                  title: 'Gestão de Fornecedor (SAM)',
                  content: 'Parceiros logísticos e de pagamento são avaliados segundo critérios de qualidade, SLA contratual e conformidade com as políticas da plataforma, com revisões trimestrais.',
                },
                {
                  title: 'Medição e Análise (MA)',
                  content: 'Coletamos e analisamos métricas de desempenho: tempo de aprovação de produtos, índice de satisfação de artesãos e compradores, e taxa de rejeição na curadoria.',
                },
                {
                  title: 'Garantia de Qualidade (PPQA)',
                  content: 'Auditorias periódicas verificam aderência dos processos aos padrões definidos. Não-conformidades são registradas, tratadas e monitoradas até resolução completa.',
                },
              ].map(({ title, content }) => (
                <div key={title} className="glass-card p-8">
                  <h3 className="font-serif text-xl font-bold mb-3">{title}</h3>
                  <p className="text-dark/60 leading-relaxed text-sm">{content}</p>
                </div>
              ))}
            </div>
          </section>
        );

      // ── QUALIDADE IHC ────────────────────────────────────────────────────────
      case 'ihc_quality':
        return (
          <section className="pt-40 pb-20 px-8 max-w-4xl mx-auto font-sans">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 block">Design & Usabilidade</span>
            <h2 className="font-serif text-5xl font-bold mb-6 tracking-tighter">Qualidade em IHC</h2>
            <p className="text-dark/60 text-base leading-relaxed mb-12">
              A interface do ArtisanHub foi desenvolvida sob os princípios de Interação Humano-Computador (IHC), aplicando as heurísticas de Nielsen e diretrizes de acessibilidade para garantir uma experiência inclusiva e intuitiva.
            </p>

            <h3 className="font-serif text-2xl font-bold mb-8">As 10 Heurísticas de Nielsen Aplicadas</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-16">
              {[
                { num: '01', title: 'Visibilidade do Status', desc: 'Feedback imediato em todas as ações: estados de carregamento, confirmações de compra e status de curadoria em tempo real.' },
                { num: '02', title: 'Correspondência com o Mundo Real', desc: 'Linguagem natural em português brasileiro, terminologia familiar ao artesão e ao comprador local.' },
                { num: '03', title: 'Controle e Liberdade do Usuário', desc: 'Saídas claras em todos os fluxos: cancelar, fechar painel, voltar ao catálogo sem perder o progresso.' },
                { num: '04', title: 'Consistência e Padrões', desc: 'Design system unificado com tipografia, cores e componentes reutilizáveis em toda a aplicação.' },
                { num: '05', title: 'Prevenção de Erros', desc: 'Validação em tempo real nos formulários, confirmações antes de ações irreversíveis, campos obrigatórios sinalizados.' },
                { num: '06', title: 'Reconhecimento vs. Recordação', desc: 'Ícones padronizados, categorias visíveis no menu e navegação clara sem exigir memorização.' },
                { num: '07', title: 'Flexibilidade e Eficiência', desc: 'Busca global na navbar, filtros por categoria para usuários experientes navegarem mais rapidamente.' },
                { num: '08', title: 'Design Estético e Minimalista', desc: 'Interface limpa com hierarquia visual clara, sem informação desnecessária que desvie o foco do produto.' },
                { num: '09', title: 'Ajuda para Recuperar Erros', desc: 'Mensagens de erro descritivas e específicas, indicando exatamente o que precisa ser corrigido.' },
                { num: '10', title: 'Ajuda e Documentação', desc: 'Seção de curadoria explicando os processos, suporte humano e fluxos autoexplicativos.' },
              ].map(({ num, title, desc }) => (
                <div key={num} className="glass-card p-6 flex gap-4">
                  <span className="text-accent font-bold text-xs font-sans mt-0.5 flex-shrink-0">{num}</span>
                  <div>
                    <h4 className="font-serif font-bold mb-2">{title}</h4>
                    <p className="text-sm text-dark/60 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-card p-10">
              <h3 className="font-serif text-2xl font-bold mb-8">Métricas de Usabilidade</h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {[
                  { value: '92%', label: 'Taxa de Conclusão de Tarefas' },
                  { value: '< 3s', label: 'Tempo para Encontrar Produto' },
                  { value: '4.7/5', label: 'Score de Satisfação (SUS)' },
                ].map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-serif text-4xl font-bold mb-2">{value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-dark/40 font-bold">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      // ── PRIVACIDADE ──────────────────────────────────────────────────────────
      case 'privacy':
        return (
          <section className="pt-40 pb-20 px-8 max-w-3xl mx-auto font-sans">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-6 block">Legal</span>
            <h2 className="font-serif text-5xl font-bold mb-4 tracking-tighter">Política de Privacidade</h2>
            <p className="text-dark/40 text-sm mb-12">Última atualização: Janeiro de 2025</p>
            <div className="space-y-10 text-dark/70 leading-relaxed text-sm">
              {[
                {
                  title: '1. Dados Coletados',
                  content: 'Coletamos informações fornecidas diretamente: nome completo, e-mail, endereço de entrega e dados de pagamento (processados por parceiros certificados PCI-DSS). Para artesãos, coletamos também CPF/CNPJ e dados bancários para repasse de valores.',
                },
                {
                  title: '2. Uso das Informações',
                  content: 'Seus dados são utilizados exclusivamente para: processar pedidos, comunicar status de entregas, personalizar a experiência de navegação e enviar comunicações de marketing (somente com consentimento explícito).',
                },
                {
                  title: '3. Compartilhamento de Dados',
                  content: 'Não vendemos nem alugamos seus dados. Compartilhamos apenas com parceiros essenciais — transportadoras (endereço de entrega) e processadores de pagamento — todos com acordo de confidencialidade assinado.',
                },
                {
                  title: '4. Segurança',
                  content: 'Adotamos criptografia TLS em todas as comunicações, armazenamento de senhas com hash seguro e monitoramento contínuo de acessos. Auditorias de segurança são realizadas semestralmente.',
                },
                {
                  title: '5. Seus Direitos (LGPD)',
                  content: 'Conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018), você tem direito a acessar, corrigir, excluir e portar seus dados, além de revogar consentimento a qualquer momento. Contato: privacidade@artisanhub.com.br',
                },
                {
                  title: '6. Cookies',
                  content: 'Utilizamos cookies estritamente necessários para funcionamento da plataforma (sessão, preferências) e cookies analíticos para entender padrões de navegação, com opção de recusa a qualquer momento.',
                },
              ].map(({ title, content }) => (
                <div key={title}>
                  <h3 className="font-serif text-lg font-bold text-dark mb-3">{title}</h3>
                  <p>{content}</p>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-dark">
      <Navbar
        onViewChange={setCurrentView}
        onOpenPanel={setActivePanel}
        onOpenCart={() => setCartOpen(true)}
        currentView={currentView}
        user={currentUser}
        onLogout={handleLogout}
        cartCount={cartCount}
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
      />

      <main>{renderView()}</main>

      <footer className="bg-secondary border-t border-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 brazil-gradient text-white rounded-full flex items-center justify-center font-bold text-sm">AH</div>
              <span className="text-xl font-bold tracking-tighter text-dark">ArtisanHub</span>
            </div>
            <p className="font-sans text-sm text-dark/40 max-w-sm leading-relaxed">
              O ponto de convergência entre a tradição dos mestres artesãos brasileiros e a tecnologia de um marketplace moderno e escalável.
            </p>
          </div>
          <div>
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-dark/30 mb-8">Plataforma</h4>
            <ul className="space-y-4 font-sans text-[11px] font-bold uppercase tracking-widest text-dark/60">
              <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('marketplace')}>Marketplace</li>
              <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('catalog')}>Catálogo</li>
              <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('curatorship')}>Curadoria</li>
              <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => { if (currentUser) setActivePanel('seller'); else setCurrentView('auth'); }}>Seja um Artesão</li>
              <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('transparency')}>Transparência</li>
            </ul>
          </div>
          <div>
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-dark/30 mb-8">Governança</h4>
            <ul className="space-y-4 font-sans text-[11px] font-bold uppercase tracking-widest text-dark/60">
              <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('cmmi_terms')}>Termos CMMI 2</li>
              <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('ihc_quality')}>Qualidade IHC</li>
              <li className="hover:text-accent cursor-pointer transition-colors" onClick={() => setCurrentView('privacy')}>Privacidade</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-sans text-[11px] font-bold">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-dark/30 uppercase tracking-widest">Online & Estável</span>
          </div>
          <p className="font-sans text-[10px] text-dark/30 uppercase tracking-widest">© 2025 ArtisanHub. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Carrinho */}
      <CartDrawer
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        onCheckout={() => setCart([])}
      />

      {/* Painéis */}
      <AnimatePresence>
        {activePanel === 'seller' && (
          <SellerDashboard
            onClose={() => setActivePanel('none')}
            products={products}
            onSubmitProduct={handleSubmitSellerProduct}
          />
        )}
        {activePanel === 'admin' && (
          <AdminDashboard
            user={currentUser}
            onClose={() => setActivePanel('none')}
            products={products}
            onApprove={approveProduct}
            onReject={rejectProduct}
            onAddProduct={() => setAddingProduct(true)}
          />
        )}

        {addingProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-dark/80 backdrop-blur-sm flex items-center justify-center p-8"
          >
            <div className="bg-white p-12 rounded-[40px] max-w-xl w-full shadow-2xl">
              <h3 className="text-3xl font-bold mb-8">Adicionar Produto ao Catálogo</h3>
              <form onSubmit={handleAddGlobalProduct} className="space-y-6 font-sans">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Nome da Peça *</label>
                    <input type="text" required value={newProductForm.name}
                      onChange={e => setNewProductForm({ ...newProductForm, name: e.target.value })}
                      className="w-full px-5 py-3 border border-primary/10 rounded-2xl text-sm focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Preço (R$) *</label>
                    <input type="number" required min="1" step="0.01" value={newProductForm.price || ''}
                      onChange={e => setNewProductForm({ ...newProductForm, price: parseFloat(e.target.value) })}
                      className="w-full px-5 py-3 border border-primary/10 rounded-2xl text-sm focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Artesão / Mestre *</label>
                  <input type="text" required value={newProductForm.artisan}
                    onChange={e => setNewProductForm({ ...newProductForm, artisan: e.target.value })}
                    className="w-full px-5 py-3 border border-primary/10 rounded-2xl text-sm focus:outline-none" />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Categoria</label>
                  <select value={newProductForm.category}
                    onChange={e => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full px-5 py-3 border border-primary/10 rounded-2xl text-sm focus:outline-none">
                    {['Cerâmica', 'Têxtil', 'Escultura', 'Bordado', 'Madeira', 'Couro', 'Jóias'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2 block">Descrição *</label>
                  <textarea required value={newProductForm.description}
                    onChange={e => setNewProductForm({ ...newProductForm, description: e.target.value })}
                    className="w-full px-5 py-3 border border-primary/10 rounded-2xl text-sm focus:outline-none h-32 resize-none" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 py-4 brazil-gradient text-white rounded-full font-bold uppercase text-[10px] tracking-widest">
                    Publicar Agora
                  </button>
                  <button type="button" onClick={() => setAddingProduct(false)} className="px-8 py-4 border border-dark/20 rounded-full font-bold uppercase text-[10px] tracking-widest">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}

        {showLeafInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-md flex items-center justify-center p-8"
          >
            <div className="max-w-2xl text-center">
              <div className="w-20 h-20 brazil-gradient rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <Leaf size={40} className="text-white" />
              </div>
              <h2 className="text-5xl font-bold text-white mb-8 tracking-tighter">O Significado da Folha</h2>
              <div className="space-y-6 font-sans text-lg text-secondary/70 leading-relaxed">
                <p>
                  As artes manuais não são apenas objetos; são a representação viva da nossa história. Cada peça no <strong>ArtisanHub</strong> carrega a herança cultural de comunidades que preservam técnicas milenares.
                </p>
                <p>
                  Valorizar o artesanato é combater a produção em massa desenfreada. É escolher o <strong>sustentável</strong>, o <strong>humano</strong> e o <strong>autêntico</strong>. Quando você apoia um artesão, mantém viva uma tradição e fortalece a economia regional do nosso Brasil.
                </p>
              </div>
              <button
                onClick={() => setShowLeafInfo(false)}
                className="mt-12 px-12 py-5 border border-white/20 rounded-full text-white font-bold uppercase tracking-widest hover:bg-white hover:text-dark transition-all text-[11px]"
              >
                Voltar à Jornada
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
