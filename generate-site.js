#!/usr/bin/env node
/**
 * SEKTV · Premium Digital Store
 * Style: Kith-inspired minimal, clean, fashion-forward
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, 'dist');

function loadJSON(name) {
    const fp = path.join(DATA_DIR, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fixImg(url, base) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return base + url;
    return url;
}

// ── SEO ──
function loadRootJSON(name) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
const SEO = loadRootJSON('seo.json') || {};
const SEO_KEYWORDS = SEO.keywords || '';
const SEO_DESC = SEO.description || '';
const SITE_TITLE = SEO.title || 'SEKTV';
const SEO_TITLE_SUFFIX = SEO.titleSuffix || '';
const SEO_AUTHOR = SEO.author || SITE_TITLE;
const SEO_ROBOTS = SEO.robots || 'index, follow';
const SEO_CANONICAL = SEO.canonical || '';
const SEO_OG = SEO.og || {};
const SEO_TWITTER = SEO.twitter || {};
const SEO_JSON_LD = SEO.jsonLd || {};
const SEO_FAVICON = SEO.favicon || '';

// ── CSS: Kith-inspired minimal ──
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

:root {
  --bg: #fafafa;
  --bg-alt: #f0f0f0;
  --bg-dark: #000;
  --text: #111;
  --text-light: #666;
  --text-muted: #999;
  --border: #e5e5e5;
  --border-dark: #111;
  --accent: #000;
  --accent-hover: #333;
  --white: #fff;
  --font: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  --max-w: 1400px;
  --nav-h: 64px;
  --ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }

body {
  font-family: var(--font);
  background: var(--bg);
  color: var(--text);
  line-height: 1.5;
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a { color: inherit; text-decoration: none; }
img { max-width: 100%; height: auto; display: block; }
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 clamp(16px, 4vw, 48px); }

/* ── Announcement Bar ── */
.announce-bar {
  background: var(--bg-dark);
  color: var(--white);
  text-align: center;
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  overflow: hidden;
}
.announce-bar .marquee {
  display: flex;
  animation: marquee 30s linear infinite;
  white-space: nowrap;
}
.announce-bar .marquee span {
  flex-shrink: 0;
  padding: 0 60px;
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ── Navigation ── */
.nav {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--white);
  border-bottom: 1px solid var(--border);
  height: var(--nav-h);
  transition: box-shadow 0.3s var(--ease);
}
.nav.scrolled { box-shadow: 0 1px 8px rgba(0,0,0,0.06); }
.nav-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 48px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 4px;
  text-transform: uppercase;
}
.logo a { display: flex; align-items: center; gap: 10px; }
.logo img { height: 32px; width: auto; border-radius: 4px; }
.nav-links { display: flex; align-items: center; gap: 32px; }
.nav-links a {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--text);
  position: relative;
  transition: color 0.2s;
}
.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--text);
  transition: width 0.3s var(--ease-out);
}
.nav-links a:hover::after { width: 100%; }
.nav-links a:hover { color: var(--text-light); }
.nav-cta {
  padding: 10px 28px;
  background: var(--bg-dark);
  color: var(--white) !important;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  border-radius: 0;
  transition: background 0.2s, transform 0.2s;
}
.nav-cta::after { display: none !important; }
.nav-cta:hover { background: #333; transform: translateY(-1px); color: var(--white) !important; }
.lang-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--text);
  background: none;
  border: 1.5px solid var(--border);
  cursor: pointer;
  transition: all 0.2s var(--ease);
  font-family: var(--font);
}
.lang-toggle:hover {
  border-color: var(--text);
  background: var(--bg-alt);
}
.lang-toggle .globe { font-size: 14px; line-height: 1; }

/* ── Hero ── */
.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: var(--bg-dark);
  color: var(--white);
}
.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.35;
  transition: transform 8s linear;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%);
}
.hero-content {
  position: relative;
  z-index: 1;
  padding: 80px 24px;
}
.hero-eyebrow {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 24px;
  opacity: 0.8;
}
.hero h1 {
  font-size: clamp(40px, 8vw, 96px);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 0.95;
  margin-bottom: 24px;
}
.hero h1 em {
  font-style: italic;
  font-weight: 300;
}
.hero-sub {
  font-size: clamp(14px, 1.6vw, 18px);
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0.7;
  max-width: 500px;
  margin: 0 auto 40px;
  line-height: 1.6;
}
.hero-btn {
  display: inline-block;
  padding: 16px 48px;
  background: var(--white);
  color: var(--bg-dark);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 2px solid var(--white);
  transition: all 0.3s var(--ease);
}
.hero-btn:hover {
  background: transparent;
  color: var(--white);
  transform: translateY(-2px);
}

/* ── Stats Strip ── */
.stats-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-bottom: 1px solid var(--border);
}
.stat-item {
  padding: 32px 24px;
  text-align: center;
  border-right: 1px solid var(--border);
  transition: background 0.3s;
}
.stat-item:last-child { border-right: none; }
.stat-item:hover { background: var(--bg-alt); }
.stat-num {
  font-size: 32px;
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 4px;
}
.stat-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
}

/* ── Section Headers ── */
.section-header {
  text-align: center;
  padding: 80px 24px 48px;
}
.section-header h2 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 12px;
}
.section-header p {
  font-size: 14px;
  color: var(--text-light);
  letter-spacing: 0.5px;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.7;
}
.section-line {
  width: 40px;
  height: 2px;
  background: var(--text);
  margin: 20px auto 0;
}

/* ── Filter ── */
.filter-bar {
  display: flex;
  justify-content: center;
  gap: 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.filter-btn {
  padding: 16px 28px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  cursor: pointer;
  white-space: nowrap;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  transition: all 0.2s var(--ease);
  user-select: none;
}
.filter-btn:hover { color: var(--text); }
.filter-btn.active {
  color: var(--text);
  border-bottom-color: var(--text);
}

/* ── Products Grid ── */
.products-section { padding: 0 0 80px; }
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0;
  border-left: 1px solid var(--border);
}
.product-card {
  display: block;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: var(--white);
  transition: all 0.4s var(--ease-out);
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}
.product-card:hover {
  z-index: 2;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
}
.card-img-wrap {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
  background: var(--bg-alt);
}
.card-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s var(--ease-out);
}
.product-card:hover .card-img-wrap img { transform: scale(1.06); }
.card-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 2;
  padding: 5px 14px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: var(--bg-dark);
  color: var(--white);
}
.card-body {
  padding: 20px;
}
.card-cat {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.1em;
}
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-price {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.5px;
}
.card-price .from {
  font-size: 11px;
  font-weight: 400;
  color: var(--text-muted);
  margin-right: 2px;
}
.card-cta {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid var(--border);
  font-size: 14px;
  transition: all 0.3s var(--ease);
  color: var(--text-light);
}
.product-card:hover .card-cta {
  background: var(--bg-dark);
  border-color: var(--bg-dark);
  color: var(--white);
}

/* ── Features ── */
.features-section {
  background: var(--bg-dark);
  color: var(--white);
  padding: 80px 0;
}
.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.feature-item {
  padding: 40px 32px;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.1);
  transition: background 0.3s;
}
.feature-item:last-child { border-right: none; }
.feature-item:hover { background: rgba(255,255,255,0.03); }
.feature-icon {
  font-size: 28px;
  margin-bottom: 20px;
}
.feature-item h3 {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 10px;
}
.feature-item p {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  line-height: 1.6;
}

/* ── CTA ── */
.cta-section {
  padding: 100px 24px;
  text-align: center;
  background: var(--white);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.cta-section h2 {
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 900;
  letter-spacing: -1px;
  margin-bottom: 16px;
}
.cta-section p {
  font-size: 14px;
  color: var(--text-light);
  margin-bottom: 36px;
  letter-spacing: 0.3px;
}
.cta-btn {
  display: inline-block;
  padding: 16px 48px;
  background: var(--bg-dark);
  color: var(--white);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: all 0.3s var(--ease);
}
.cta-btn:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  color: var(--white);
}

/* ── Footer ── */
.footer {
  background: var(--bg-dark);
  color: var(--white);
  padding: 60px 24px 40px;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 32px;
}
.footer-brand .logo {
  color: var(--white);
  margin-bottom: 12px;
}
.footer-brand p {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  line-height: 1.8;
  max-width: 300px;
}
.footer-links-group h4 {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  color: rgba(255,255,255,0.6);
}
.footer-links-group a {
  display: block;
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  margin-bottom: 10px;
  transition: color 0.2s;
}
.footer-links-group a:hover { color: var(--white); }
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.footer-bottom p {
  font-size: 11px;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.5px;
}
.footer-bottom a { color: rgba(255,255,255,0.3); }
.footer-bottom a:hover { color: var(--white); }

/* ── Animations ── */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s var(--ease-out);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Mobile ── */
@media (max-width: 1024px) {
  .features-grid { grid-template-columns: repeat(2, 1fr); }
  .feature-item:nth-child(2) { border-right: none; }
  .feature-item:nth-child(1), .feature-item:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.1); }
}
@media (max-width: 768px) {
  .nav-links { display: none; }
  .hero { min-height: 70vh; }
  .hero h1 { letter-spacing: -1px; }
  .stats-strip { grid-template-columns: repeat(2, 1fr); }
  .stat-item:nth-child(2) { border-right: none; }
  .stat-item:nth-child(1), .stat-item:nth-child(2) { border-bottom: 1px solid var(--border); }
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .card-img-wrap { aspect-ratio: 3/4; }
  .card-body { padding: 14px; }
  .card-title { font-size: 12px; }
  .card-price { font-size: 14px; }
  .filter-btn { padding: 12px 18px; font-size: 10px; }
  .section-header { padding: 60px 16px 32px; }
  .features-section { padding: 60px 0; }
  .cta-section { padding: 60px 16px; }
  .footer-top { flex-direction: column; }
}
@media (max-width: 480px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); }
  .card-img-wrap { aspect-ratio: 3/4; }
  .card-body { padding: 10px; }
  .card-title { font-size: 11px; min-height: auto; -webkit-line-clamp: 2; }
  .card-badge { font-size: 8px; padding: 3px 8px; top: 8px; left: 8px; }
  .card-cta { width: 28px; height: 28px; font-size: 11px; }
  .stat-num { font-size: 24px; }
  .features-grid { grid-template-columns: 1fr; }
  .feature-item { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.1); }
}
`;

const JS = `
function filterCategory(id, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.product-card').forEach((c, i) => {
    if (id === 'all' || c.dataset.cat == id) {
      c.style.display = '';
      c.style.opacity = '0'; c.style.transform = 'translateY(20px)';
      setTimeout(() => { c.style.transition = 'all .5s cubic-bezier(0.16,1,0.3,1)'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 50);
    } else { c.style.display = 'none'; }
  });
}
window.addEventListener('scroll', () => {
  document.querySelector('.nav').classList.toggle('scrolled', window.scrollY > 20);
});
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  const saved = localStorage.getItem('sektv_lang');
  if (saved) setLang(saved);
});
const i18n = {
  en: {
    'nav.shop': 'Shop', 'nav.why': 'Why Us', 'nav.store': 'Visit Store',
    'hero.eyebrow': 'Premium Digital Accounts', 'hero.title1': 'Digital', 'hero.title2': 'Essentials',
    'hero.sub': 'Curated selection of premium digital accounts and professional web services. Delivered instantly.',
    'hero.btn': 'Explore Collection',
    'stats.cats': 'Categories', 'stats.prods': 'Products', 'stats.opts': 'Options', 'stats.del': 'Delivery',
    'collection.title': 'The Collection', 'collection.desc': 'Browse our curated selection of premium digital accounts and services',
    'filter.all': 'All', 'filter.gv': 'GV Numbers', 'filter.gmail': 'Gmail', 'filter.apple': 'Apple ID', 'filter.svc': 'Services',
    'cat.gv': 'GV Numbers', 'cat.gmail': 'Gmail', 'cat.apple': 'Apple ID', 'cat.svc': 'Services',
    'feat.deli.title': 'Instant Delivery', 'feat.deli.desc': 'Automated delivery system ensures you receive your accounts immediately after purchase',
    'feat.qual.title': 'Premium Quality', 'feat.qual.desc': 'Every account is verified and guaranteed. Free replacement during warranty period',
    'feat.price.title': 'Best Prices', 'feat.price.desc': 'Direct sourcing means no middlemen. We offer the most competitive prices available',
    'feat.custom.title': 'Custom Selection', 'feat.custom.desc': 'Choose specific numbers and account details to match your exact requirements',
    'cta.title': 'Ready to Get Started?', 'cta.desc': 'Premium digital accounts delivered instantly. Trusted by thousands of customers worldwide.',
    'cta.btn': 'Shop Now',
    'footer.brand': 'Your trusted source for premium digital accounts and professional web services.',
    'footer.links': 'Quick Links', 'footer.store': 'Visit Store', 'footer.browse': 'Browse Products', 'footer.why': 'Why Choose Us',
    'footer.support': 'Support', 'footer.contact': 'Contact Us', 'footer.faq': 'FAQ', 'footer.rights': 'All rights reserved.',
    'announce': '★ Instant Delivery on All Orders ★ Premium Quality Guaranteed ★ 24/7 Customer Support ★ Best Prices Online',
  },
  zh: {
    'nav.shop': '商品', 'nav.why': '优势', 'nav.store': '进入商城',
    'hero.eyebrow': '优质数字账号', 'hero.title1': '精选', 'hero.title2': '数字资源',
    'hero.sub': '严选优质数字账号与专业网站服务，一站式解决，即买即用。',
    'hero.btn': '浏览全部',
    'stats.cats': '分类', 'stats.prods': '商品', 'stats.opts': '规格', 'stats.del': '发货',
    'collection.title': '全部商品', 'collection.desc': '浏览我们严选的优质数字账号与服务',
    'filter.all': '全部', 'filter.gv': 'GV靓号', 'filter.gmail': '谷歌邮箱', 'filter.apple': '苹果ID', 'filter.svc': '服务类',
    'cat.gv': 'GV靓号', 'cat.gmail': '谷歌邮箱', 'cat.apple': '苹果ID', 'cat.svc': '服务类',
    'feat.deli.title': '即时发货', 'feat.deli.desc': '付款后自动发货，无需等待人工处理',
    'feat.qual.title': '品质保障', 'feat.qual.desc': '每个账号均经过验证，质保期内免费更换',
    'feat.price.title': '源头价格', 'feat.price.desc': '一手资源直供，无中间商差价，价格更优',
    'feat.custom.title': '可选靓号', 'feat.custom.desc': '支持自选号码和账号详情，精准匹配需求',
    'cta.title': '找到你需要的账号了吗？', 'cta.desc': '优质数字账号即买即用，数千用户信赖之选。',
    'cta.btn': '立即购买',
    'footer.brand': '您值得信赖的优质数字账号与专业网站服务平台。',
    'footer.links': '快速链接', 'footer.store': '进入商城', 'footer.browse': '浏览商品', 'footer.why': '为什么选择我们',
    'footer.support': '客户支持', 'footer.contact': '联系我们', 'footer.faq': '常见问题', 'footer.rights': '保留所有权利。',
    'announce': '★ 全场即时发货 ★ 品质保障 ★ 24小时在线客服 ★ 超值优惠价格',
  }
};
let currentLang = 'en';
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('sektv_lang', lang);
  const t = i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });
  const marqueeSpans = document.querySelectorAll('.announce-bar .marquee span');
  const announceText = t['announce'];
  marqueeSpans.forEach(s => s.textContent = announceText);
  const label = document.getElementById('lang-label');
  if (label) label.textContent = lang === 'en' ? '中文' : 'EN';
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
}
function toggleLang() {
  setLang(currentLang === 'en' ? 'zh' : 'en');
}
`;

function main() {
    const config = loadJSON('config.json') || {};
    const categories = loadJSON('categories.json') || [];
    const products = loadJSON('products.json') || [];
    const meta = loadJSON('meta.json') || {};

    if (!products.length) { console.error('❌ No product data'); process.exit(1); }

    const siteUrl = meta.siteUrl || process.env.SITE_URL;
    const siteName = SITE_TITLE;
    const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL || SEO_CANONICAL;

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    function shortCatName(name) {
        return name
            .replace(/谷歌美国电话\/?/i, '')
            .replace(/GoogleVoice\s*\/?\s*GV靓号/i, 'GV Numbers')
            .replace(/谷歌邮箱\s*\/?\s*油管\s*\/?\s*Google\s*\/?\s*Gmail/i, 'Gmail')
            .replace(/苹果id\s*\/?\s*Apple\s*id\s*\/?\s*AppStore/i, 'Apple ID')
            .replace(/服务类/i, 'Services')
            .trim() || name;
    }

    const activeCats = categories.filter(c => products.some(p => p.category_id === c.id));
    const catBtns = activeCats
        .sort((a, b) => (b.sort || 0) - (a.sort || 0))
        .map(c => `<button class="filter-btn" onclick="filterCategory(${c.id}, this)">${esc(shortCatName(c.name))}</button>`)
        .join('\n          ');

    const cards = products.filter(p => p.active !== 0).sort((a, b) => (b.sort||0) - (a.sort||0)).map((p, i) => {
        const cat = categories.find(c => c.id === p.category_id);
        const catName = cat ? shortCatName(cat.name) : '';
        const img = p.image_url ? fixImg(p.image_url, siteUrl) : '';
        const variants = p.variants || [];
        const minPrice = variants.length ? Math.min(...variants.map(v => v.price)) : 0;
        const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
        const cleanTag = t => t.replace(/b[12]#[0-9a-fA-F]{3,6}/g, '').replace(/#[0-9a-fA-F]{3,6}$/g, '').replace(/\s+/g, ' ').trim();
        const tagLabel = cleanTag(tags[0] || '');

        return `
          <a class="product-card reveal" href="${siteUrl}/product?id=${p.id}" target="_blank" rel="noopener" data-cat="${p.category_id}">
            <div class="card-img-wrap">
              ${img ? `<img src="${esc(img)}" alt="${esc(p.name)}" loading="lazy">` : ''}
              ${tagLabel ? `<div class="card-badge">${esc(tagLabel)}</div>` : ''}
            </div>
            <div class="card-body">
              <div class="card-cat">${esc(catName)}</div>
              <div class="card-title">${esc(p.name)}</div>
              <div class="card-footer">
                <div class="card-price"><span class="from">from </span>¥${minPrice.toFixed(2)}</div>
                <div class="card-cta">→</div>
              </div>
            </div>
          </a>`;
    }).join('\n');

    const heroImg = products[0]?.image_url ? fixImg(products[0].image_url, siteUrl) : '';

    const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", "name": siteName, "description": SEO_DESC, "url": GITHUB_PAGES_URL, "potentialAction": { "@type": "SearchAction", "target": `${siteUrl}/product?id={search_term_string}`, "query-input": "required name=search_term_string" } };
    const itemListLd = { "@context": "https://schema.org", "@type": "ItemList", "itemListElement": products.filter(p => p.active !== 0).map((p, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": p.name, "url": `${siteUrl}/product?id=${p.id}`, "image": p.image_url ? fixImg(p.image_url, siteUrl) : '', "offers": { "@type": "Offer", "price": p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : 0, "priceCurrency": "CNY" } } })) };

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(siteName)}${SEO_TITLE_SUFFIX ? ' — ' + esc(SEO_TITLE_SUFFIX) : ''}</title>
  <meta name="description" content="${esc(SEO_DESC)}">
  <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
  <meta name="author" content="${esc(SEO_AUTHOR)}">
  <meta name="robots" content="${esc(SEO_ROBOTS)}">
  <meta name="googlebot" content="${esc(SEO_ROBOTS)}">
  ${SEO_CANONICAL ? `<link rel="canonical" href="${esc(SEO_CANONICAL)}">` : ''}
  <meta property="og:type" content="${esc(SEO_OG.type || 'website')}">
  <meta property="og:url" content="${esc(SEO_OG.url || GITHUB_PAGES_URL)}">
  <meta property="og:title" content="${esc(siteName)}">
  <meta property="og:description" content="${esc(SEO_DESC)}">
  ${heroImg ? `<meta property="og:image" content="${esc(heroImg)}">` : ''}
  <meta property="og:locale" content="${esc(SEO_OG.locale || 'en_US')}">
  <meta property="og:site_name" content="${esc(SEO_OG.siteName || siteName)}">
  <meta name="twitter:card" content="${esc(SEO_TWITTER.card || 'summary_large_image')}">
  <meta name="twitter:title" content="${esc(siteName)}">
  <meta name="twitter:description" content="${esc(SEO_DESC)}">
  ${heroImg ? `<meta name="twitter:image" content="${esc(heroImg)}">` : ''}
  <script type="application/ld+json">${JSON.stringify({...SEO_JSON_LD, ...jsonLd})}</script>
  <script type="application/ld+json">${JSON.stringify(itemListLd)}</script>
  ${SEO_FAVICON ? `<link rel="icon" href="${esc(SEO_FAVICON)}">` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>${CSS}</style>
</head>
<body>

<!-- Announcement Bar -->
<div class="announce-bar">
  <div class="marquee">
    <span>★ Instant Delivery on All Orders</span>
    <span>★ Premium Quality Guaranteed</span>
    <span>★ 24/7 Customer Support</span>
    <span>★ Best Prices Online</span>
    <span>★ Instant Delivery on All Orders</span>
    <span>★ Premium Quality Guaranteed</span>
    <span>★ 24/7 Customer Support</span>
    <span>★ Best Prices Online</span>
  </div>
</div>

<!-- Navigation -->
<nav class="nav" id="nav">
  <div class="nav-inner">
    <div class="logo">
      <a href="${GITHUB_PAGES_URL || '#'}">
        ${meta.siteLogo ? `<img src="${esc(fixImg(meta.siteLogo, siteUrl))}" alt="${esc(siteName)}">` : ''}
        <span>${esc(siteName)}</span>
      </a>
    </div>
    <div class="nav-links">
      <a href="#products">Shop</a>
      <a href="#features">Why Us</a>
      <a href="${siteUrl}" target="_blank" rel="noopener" class="nav-cta">Visit Store</a>
    </div>
  </div>
</nav>

<!-- Hero -->
<section class="hero">
  ${heroImg ? `<div class="hero-bg" style="background-image:url('${esc(heroImg)}')"></div>` : ''}
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">Premium Digital Accounts</div>
    <h1>Digital<br><em>Essentials</em></h1>
    <p class="hero-sub">Curated selection of premium digital accounts and professional web services. Delivered instantly.</p>
    <a href="#products" class="hero-btn">Explore Collection</a>
  </div>
</section>

<!-- Stats -->
<div class="stats-strip">
  <div class="stat-item"><div class="stat-num">${categories.length}</div><div class="stat-label">Categories</div></div>
  <div class="stat-item"><div class="stat-num">${products.filter(p=>p.active!==0).length}</div><div class="stat-label">Products</div></div>
  <div class="stat-item"><div class="stat-num">${products.reduce((s,p) => s + (p.variants?.length||0), 0)}</div><div class="stat-label">Options</div></div>
  <div class="stat-item"><div class="stat-num">24h</div><div class="stat-label">Delivery</div></div>
</div>

<!-- Products Section -->
<div id="products">
  <div class="section-header">
    <h2>The Collection</h2>
    <p>Browse our curated selection of premium digital accounts and services</p>
    <div class="section-line"></div>
  </div>

  <div class="filter-bar">
    <button class="filter-btn active" onclick="filterCategory('all', this)" data-i18n="filter.all">All</button>
    ${catBtns}
  </div>

  <section class="products-section">
    <div class="container">
      <div class="products-grid">
        ${cards}
      </div>
    </div>
  </section>
</div>

<!-- Features -->
<section class="features-section" id="features">
  <div class="container">
    <div class="features-grid">
      <div class="feature-item reveal">
        <div class="feature-icon">⚡</div>
        <h3>Instant Delivery</h3>
        <p>Automated delivery system ensures you receive your accounts immediately after purchase</p>
      </div>
      <div class="feature-item reveal">
        <div class="feature-icon">◆</div>
        <h3>Premium Quality</h3>
        <p>Every account is verified and guaranteed. Free replacement during warranty period</p>
      </div>
      <div class="feature-item reveal">
        <div class="feature-icon">$</div>
        <h3>Best Prices</h3>
        <p>Direct sourcing means no middlemen. We offer the most competitive prices available</p>
      </div>
      <div class="feature-item reveal">
        <div class="feature-icon">◎</div>
        <h3>Custom Selection</h3>
        <p>Choose specific numbers and account details to match your exact requirements</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta-section">
  <h2>Ready to Get Started?</h2>
  <p>Premium digital accounts delivered instantly. Trusted by thousands of customers worldwide.</p>
  <a href="${siteUrl}" target="_blank" rel="noopener" class="cta-btn">Shop Now</a>
</section>

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="logo">${esc(siteName)}</div>
        <p>Your trusted source for premium digital accounts and professional web services.</p>
      </div>
      <div class="footer-links-group">
        <h4>Quick Links</h4>
        <a href="${siteUrl}" target="_blank" rel="noopener">Visit Store</a>
        <a href="#products">Browse Products</a>
        <a href="#features">Why Choose Us</a>
      </div>
      <div class="footer-links-group">
        <h4>Support</h4>
        <a href="${siteUrl}" target="_blank" rel="noopener">Contact Us</a>
        <a href="${siteUrl}" target="_blank" rel="noopener">FAQ</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} ${esc(siteName)}. All rights reserved.</p>
      <p><a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></p>
    </div>
  </div>
</footer>

<script>${JS}</script>
</body>
</html>`;

    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log(`✅ dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
    console.log(`   Products: ${products.filter(p=>p.active!==0).length}`);
    console.log(`   Categories: ${activeCats.length}`);
    console.log(`   Style: Kith-inspired minimal`);
}

main();
