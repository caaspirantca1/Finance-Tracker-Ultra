/* ============================================================
   FINANCE TRACKER PRO — APPLICATION ENGINE
   ============================================================ */

// ─── CONFIG ────────────────────────────────────────────────
const INCOME_CATS = [
  { id:'parents',name:'From Parents',icon:'👨‍👩‍👦',color:'#6366f1' },
  { id:'ipo',name:'IPO',icon:'📈',color:'#22c55e' },
  { id:'secondary',name:'Secondary Market',icon:'📊',color:'#f59e0b' },
  { id:'audit',name:'Audit Fee',icon:'📋',color:'#3b82f6' },
  { id:'consultancy',name:'Consultancy Fee',icon:'💼',color:'#8b5cf6' },
  { id:'other',name:'Other',icon:'💰',color:'#ec4899' }
];
const EXPENSE_CATS = [
  { id:'grocery',name:'Grocery',icon:'🛒',color:'#22c55e' },
  { id:'rent',name:'Rent',icon:'🏠',color:'#3b82f6' },
  { id:'clothes',name:'Clothes',icon:'👕',color:'#ec4899' },
  { id:'electronics',name:'Electronics',icon:'📱',color:'#6366f1' },
  { id:'vehicle',name:'Vehicle Fare',icon:'🚗',color:'#f59e0b' },
  { id:'utilities',name:'Utilities',icon:'💡',color:'#14b8a6' },
  { id:'entertainment',name:'Entertainment',icon:'🎬',color:'#f43f5e' },
  { id:'health',name:'Health',icon:'🏥',color:'#10b981' },
  { id:'education',name:'Education',icon:'📚',color:'#8b5cf6' },
  { id:'travel',name:'Travel',icon:'✈️',color:'#06b6d4' },
  { id:'dining',name:'Dining',icon:'🍽️',color:'#f97316' },
  { id:'investments',name:'Investments',icon:'💎',color:'#c9a84c' },
  { id:'misc',name:'Miscellaneous',icon:'📦',color:'#64748b' }
];
const QUOTES = [
  "The best investment you can make is in yourself.","Do not save what is left after spending; spend what is left after saving.",
  "Wealth consists not in having great possessions, but in having few wants.","Financial freedom is available to those who learn about it and work for it.",
  "The stock market is a device to transfer money from the impatient to the patient.","It's not your salary that makes you rich; it's your spending habits.",
  "A budget is telling your money where to go instead of wondering where it went.","Compound interest is the eighth wonder of the world.",
  "Never spend your money before you have earned it.","The goal isn't more money. The goal is living life on your terms."
];
const NAV_ITEMS = [
  { id:'dashboard',label:'Dashboard',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>'},
  { id:'income',label:'Income',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>'},
  { id:'expense',label:'Expenses',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>'},
  { id:'savings',label:'Savings',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"/><polyline points="16 8 12 12 8 8"/></svg>'},
  { id:'goals',label:'Goals',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'},
  { id:'calendar',label:'Calendar',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'},
  { id:'reports',label:'Reports',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'},
  { id:'reminders',label:'Reminders',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>'},
  { id:'notes',label:'Journal',icon:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'}
];

// ─── DATABASE ──────────────────────────────────────────────
const DB = {
  _key: 'ftp_data',
  defaults: {
    transactions: [], goals: [], reminders: [], notes: [],
    customIncomeCats: [], customExpenseCats: [],
    settings: { theme:'dark', color:'black-gold', font:'syne', fontSize:14, pin:null, currency:'₹', userName:'User' }
  },
  load() {
    try { const d = JSON.parse(localStorage.getItem(this._key)); return { ...this.defaults, ...d, settings:{...this.defaults.settings,...(d?.settings||{})} }; }
    catch { return { ...this.defaults }; }
  },
  save(data) { localStorage.setItem(this._key, JSON.stringify(data)); },
  export() { return JSON.stringify(this.load(), null, 2); },
  import(json) {
    try { const d = JSON.parse(json); if(d.transactions) { this.save(d); return true; } } catch {}
    return false;
  }
};

// ─── APP STATE ─────────────────────────────────────────────
let DATA = DB.load();
let currentView = 'dashboard';
let dashPeriod = 6;

// ─── UTILITIES ─────────────────────────────────────────────
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const uid = () => Date.now().toString(36) + Math.random().toString(36).substr(2,5);
const fmt = n => (DATA.settings.currency) + Math.abs(n).toLocaleString('en-IN', {minimumFractionDigits:0, maximumFractionDigits:0});
const fmtP = n => n.toFixed(1) + '%';
const isToday = d => { const t=new Date(), dd=new Date(d); return t.toDateString()===dd.toDateString(); };
const monthKey = d => { const dd=new Date(d); return dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0'); };
const getCat = (type, id) => {
  const cats = type==='income' ? [...INCOME_CATS,...DATA.customIncomeCats] : [...EXPENSE_CATS,...DATA.customExpenseCats];
  return cats.find(c=>c.id===id) || { name:id, icon:'📌', color:'#64748b' };
};
const txsFor = (type, month) => DATA.transactions.filter(t => t.type===type && (!month || monthKey(t.date)===month));
const sum = arr => arr.reduce((a,t)=>a+t.amount,0);
const today = () => new Date().toISOString().split('T')[0];

// ─── THEME MANAGER ─────────────────────────────────────────
const Theme = {
  apply() {
    const s = DATA.settings;
    document.documentElement.setAttribute('data-theme', s.theme);
    document.documentElement.setAttribute('data-color', s.color);
    document.documentElement.setAttribute('data-font', s.font);
    document.documentElement.style.setProperty('--fs', s.fontSize + 'px');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', s.theme==='dark'?'#08080c':'#f5f3ef');
  }
};

// ─── PIN LOCK ──────────────────────────────────────────────
const Pin = {
  entered: '',
  press(n) {
    if(this.entered.length >= 4) return;
    this.entered += n;
    const dots = $$('.pin-dots span');
    dots[this.entered.length-1].classList.add('filled');
    if(this.entered.length === 4) {
      setTimeout(() => {
        if(this.entered === DATA.settings.pin) {
          $('#pinLock').classList.add('hidden');
          $('#app').classList.remove('hidden');
          $('#fab').classList.remove('hidden');
          this.entered = '';
          App.refresh();
        } else {
          Toast.show('Incorrect PIN','error');
          this.entered = '';
          dots.forEach(d=>d.classList.remove('filled'));
        }
      }, 200);
    }
  },
  del() {
    if(!this.entered.length) return;
    this.entered = this.entered.slice(0,-1);
    $$('.pin-dots span')[this.entered.length]?.classList.remove('filled');
  }
};

// ─── TOAST ─────────────────────────────────────────────────
const Toast = {
  show(msg, type='info') {
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.textContent = msg;
    ('#toasts').appendChild(el);
    setTimeout(() => { el.style.opacity='0'; el.style.transform='translateX(30px)'; setTimeout(()=>el.remove(),300); }, 3000);
  }
};

// ─── MODAL ─────────────────────────────────────────────────
const Modal = {
  open(title, bodyHtml) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = bodyHtml;
    $('#modalOverlay').classList.remove('hidden');
  },
  close() { $('#modalOverlay').classList.add('hidden'); },
  openAddTx(type) {
    const cats = type==='income' ? [...INCOME_CATS,...DATA.customIncomeCats] : [...EXPENSE_CATS,...DATA.customExpenseCats];
    const catOpts = cats.map(c=>`<option value="${c.id}">${c.icon} ${c.name}</option>`).join('');
    this.open(type==='income'?'Add Income':'Add Expense', `
      <label>Amount</label>
      <input type="number" id="txAmt" placeholder="0" min="0" required>
      <label>Category</label>
      <select id="txCat">${catOpts}</select>
      <label>Date</label>
      <input type="date" id="txDate" value="${today()}">
      <label>Note (optional)</label>
      <input type="text" id="txNote" placeholder="Add a note…">
      <div class="form-actions">
        <button class="btn-cancel" onclick="Modal.close()">Cancel</button>
        <button class="btn-save" onclick="Tx.save('${type}')">Save</button>
      </div>
    `);
  },
  openEditTx(id) {
    const t = DATA.transactions.find(x=>x.id===id);
    if(!t) return;
    const cats = t.type==='income' ? [...INCOME_CATS,...DATA.customIncomeCats] : [...EXPENSE_CATS,...DATA.customExpenseCats];
    const catOpts = cats.map(c=>`<option value="${c.id}" ${c.id===t.category?'selected':''}>${c.icon} ${c.name}</option>`).join('');
    this.open('Edit Transaction', `
      <label>Amount</label>
      <input type="number" id="txAmt" value="${t.amount}" min="0">
      <label>Category</label>
      <select id="txCat">${catOpts}</select>
      <label>Date</label>
      <input type="date" id="txDate" value="${t.date}">
      <label>Note</label>
      <input type="text" id="txNote" value="${t.note||''}">
      <div class="form-actions">
        <button class="btn-cancel" onclick="Tx.delete('${id}')">Delete</button>
        <button class="btn-save" onclick="Tx.update('${id}')">Update</button>
      </div>
    `);
  },
  openAddGoal() {
    this.open('New Financial Goal', `
      <label>Goal Name</label>
      <input type="text" id="goalName" placeholder="e.g. Emergency Fund">
      <label>Target Amount</label>
      <input type="number" id="goalTarget" placeholder="0" min="0">
      <label>Current Amount</label>
      <input type="number" id="goalCurrent" placeholder="0" min="0" value="0">
      <label>Deadline</label>
      <input type="date" id="goalDeadline">
      <label>Type</label>
      <select id="goalType">
        <option value="savings">Savings</option><option value="investment">Investment</option>
        <option value="wealth">Wealth</option><option value="income">Income</option>
      </select>
      <div class="form-actions">
        <button class="btn-cancel" onclick="Modal.close()">Cancel</button>
        <button class="btn-save" onclick="Goals.save()">Create Goal</button>
      </div>
    `);
  },
  openEditGoal(id) {
    const g = DATA.goals.find(x=>x.id===id);
    if(!g) return;
    this.open('Edit Goal', `
      <label>Goal Name</label>
      <input type="text" id="goalName" value="${g.name}">
      <label>Target Amount</label>
      <input type="number" id="goalTarget" value="${g.target}">
      <label>Current Amount</label>
      <input type="number" id="goalCurrent" value="${g.current}">
      <label>Deadline</label>
      <input type="date" id="goalDeadline" value="${g.deadline}">
      <select id="goalType"><option value="savings" ${g.type==='savings'?'selected':''}>Savings</option><option value="investment" ${g.type==='investment'?'selected':''}>Investment</option><option value="wealth" ${g.type==='wealth'?'selected':''}>Wealth</option><option value="income" ${g.type==='income'?'selected':''}>Income</option></select>
      <div class="form-actions">
        <button class="btn-cancel" onclick="Goals.delete('${id}')">Delete</button>
        <button class="btn-save" onclick="Goals.update('${id}')">Update</button>
      </div>
    `);
  },
  openAddReminder() {
    this.open('New Reminder', `
      <label>Title</label><input type="text" id="remTitle" placeholder="e.g. Pay rent">
      <label>Date</label><input type="date" id="remDate" value="${today()}">
      <label>Type</label>
      <select id="remType"><option value="bill">Bill</option><option value="rent">Rent</option><option value="investment">Investment</option><option value="savings">Savings Target</option><option value="review">Financial Review</option><option value="other">Other</option></select>
      <div class="form-actions">
        <button class="btn-cancel" onclick="Modal.close()">Cancel</button>
        <button class="btn-save" onclick="Reminders.save()">Add Reminder</button>
      </div>
    `);
  },
  openAddNote() {
    this.open('New Journal Entry', `
      <label>Your thoughts</label>
      <textarea id="noteText" placeholder="Write about your financial journey…"></textarea>
      <div class="form-actions">
        <button class="btn-cancel" onclick="Modal.close()">Cancel</button>
        <button class="btn-save" onclick="Notes.save()">Save Entry</button>
      </div>
    `);
  }
};

// ─── TRANSACTIONS ──────────────────────────────────────────
const Tx = {
  save(type) {
    const amt = parseFloat($('#txAmt').value);
    if(!amt || amt<=0) return Toast.show('Enter a valid amount','error');
    DATA.transactions.push({ id:uid(), type, amount:amt, category:$('#txCat').value, date:$('#txDate').value, note:$('#txNote').value, createdAt:Date.now() });
    DB.save(DATA); Modal.close(); Toast.show(type==='income'?'Income added!':'Expense recorded!','success'); App.refresh();
  },
  update(id) {
    const t = DATA.transactions.find(x=>x.id===id);
    if(!t) return;
    t.amount = parseFloat($('#txAmt').value)||t.amount;
    t.category = $('#txCat').value;
    t.date = $('#txDate').value;
    t.note = $('#txNote').value;
    DB.save(DATA); Modal.close(); Toast.show('Updated!','success'); App.refresh();
  },
  delete(id) {
    DATA.transactions = DATA.transactions.filter(t=>t.id!==id);
    DB.save(DATA); Modal.close(); Toast.show('Deleted','info'); App.refresh();
  }
};

// ─── GOALS ─────────────────────────────────────────────────
const Goals = {
  save() {
    const name=$('#goalName').value.trim();
    const target=parseFloat($('#goalTarget').value);
    if(!name||!target) return Toast.show('Fill required fields','error');
    DATA.goals.push({ id:uid(), name, target, current:parseFloat($('#goalCurrent').value)||0, deadline:$('#goalDeadline').value, type:$('#goalType').value, createdAt:today() });
    DB.save(DATA); Modal.close(); Toast.show('Goal created!','success'); App.refresh();
  },
  update(id) {
    const g=DATA.goals.find(x=>x.id===id); if(!g) return;
    g.name=$('#goalName').value; g.target=parseFloat($('#goalTarget').value); g.current=parseFloat($('#goalCurrent').value); g.deadline=$('#goalDeadline').value; g.type=$('#goalType').value;
    DB.save(DATA); Modal.close(); Toast.show('Goal updated!','success'); App.refresh();
  },
  delete(id) {
    DATA.goals=DATA.goals.filter(g=>g.id!==id);
    DB.save(DATA); Modal.close(); Toast.show('Goal deleted','info'); App.refresh();
  },
  addFunds(id) {
    const g=DATA.goals.find(x=>x.id===id); if(!g) return;
    const amt = prompt('Add amount:', '1000');
    if(amt && !isNaN(amt)) { g.current += parseFloat(amt); DB.save(DATA); Toast.show('Funds added!','success'); App.refresh(); }
  }
};

// ─── REMINDERS ─────────────────────────────────────────────
const Reminders = {
  save() {
    const title=$('#remTitle').value.trim();
    if(!title) return Toast.show('Enter a title','error');
    DATA.reminders.push({ id:uid(), title, date:$('#remDate').value, type:$('#remType').value, done:false, createdAt:Date.now() });
    DB.save(DATA); Modal.close(); Toast.show('Reminder set!','success'); App.refresh();
  },
  toggle(id) {
    const r=DATA.reminders.find(x=>x.id===id); if(r) { r.done=!r.done; DB.save(DATA); App.refresh(); }
  },
  delete(id) {
    DATA.reminders=DATA.reminders.filter(r=>r.id!==id); DB.save(DATA); App.refresh();
  }
};

// ─── NOTES ─────────────────────────────────────────────────
const Notes = {
  save() {
    const text=$('#noteText').value.trim();
    if(!text) return Toast.show('Write something first','error');
    DATA.notes.push({ id:uid(), text, date:today(), createdAt:Date.now() });
    DB.save(DATA); Modal.close(); Toast.show('Entry saved!','success'); App.refresh();
  },
  delete(id) {
    DATA.notes=DATA.notes.filter(n=>n.id!==id); DB.save(DATA); App.refresh();
  }
};

// ─── CHART ENGINE ──────────────────────────────────────────
const Charts = {
  setup(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = (canvas.getAttribute('height')||200) * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { ctx, w: rect.width, h: parseInt(canvas.getAttribute('height')||200) };
  },
  getColors() {
    const cs = getComputedStyle(document.documentElement);
    return {
      accent: cs.getPropertyValue('--accent').trim(),
      accentLight: cs.getPropertyValue('--accent-light').trim(),
      success: cs.getPropertyValue('--success').trim(),
      danger: cs.getPropertyValue('--danger').trim(),
      text: cs.getPropertyValue('--text-muted').trim(),
      grid: cs.getPropertyValue('--card-border').trim(),
      card: cs.getPropertyValue('--card').trim()
    };
  },
  line(canvasId, datasets, labels) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const {ctx,w,h} = this.setup(canvas);
    const c = this.getColors();
    const pad = {t:20,r:16,b:30,l:50};
    const gw=w-pad.l-pad.r, gh=h-pad.t-pad.b;
    const allVals = datasets.flatMap(d=>d.data);
    const max = Math.max(...allVals,1)*1.15;
    const min = 0;

    // grid
    ctx.strokeStyle=c.grid; ctx.lineWidth=.5;
    for(let i=0;i<=4;i++){
      const y=pad.t+gh-(gh*i/4);
      ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();
      ctx.fillStyle=c.text;ctx.font='10px DM Mono';ctx.textAlign='right';
      ctx.fillText(fmt(Math.round(max*i/4)),pad.l-6,y+3);
    }
    // x labels
    ctx.textAlign='center';
    labels.forEach((l,i)=>{
      const x=pad.l+(gw/(labels.length-1||1))*i;
      ctx.fillText(l,x,h-8);
    });

    // lines
    datasets.forEach((ds,di)=>{
      ctx.beginPath();
      ctx.strokeStyle=di===0?c.accent:c.success;
      ctx.lineWidth=2.5;
      ctx.lineJoin='round';
      ds.data.forEach((v,i)=>{
        const x=pad.l+(gw/(ds.data.length-1||1))*i;
        const y=pad.t+gh-((v-min)/(max-min))*gh;
        i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
      });
      ctx.stroke();

      // area fill
      const last=ds.data.length-1;
      const lx=pad.l+(gw/(ds.data.length-1||1))*last;
      ctx.lineTo(lx,pad.t+gh);ctx.lineTo(pad.l,pad.t+gh);ctx.closePath();
      const grad=ctx.createLinearGradient(0,pad.t,0,pad.t+gh);
      const baseColor=di===0?c.accent:c.success;
      grad.addColorStop(0,baseColor+'30');grad.addColorStop(1,baseColor+'05');
      ctx.fillStyle=grad;ctx.fill();

      // dots
      ds.data.forEach((v,i)=>{
        const x=pad.l+(gw/(ds.data.length-1||1))*i;
        const y=pad.t+gh-((v-min)/(max-min))*gh;
        ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fillStyle=di===0?c.accent:c.success;ctx.fill();
      });
    });
  },
  doughnut(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const {ctx,w,h} = this.setup(canvas);
    const cx=w/2, cy=h/2, r=Math.min(w,h)/2-20, lw=28;
    const total=data.reduce((a,d)=>a+d.value,0)||1;
    let start=-Math.PI/2;

    data.forEach(d=>{
      const angle=(d.value/total)*Math.PI*2;
      ctx.beginPath();ctx.arc(cx,cy,r,start,start+angle);ctx.lineWidth=lw;ctx.strokeStyle=d.color;ctx.stroke();
      start+=angle;
    });

    // center text
    ctx.fillStyle=this.getColors().text;ctx.font='10px DM Mono';ctx.textAlign='center';
    ctx.fillText('Total',cx,cy-6);
    ctx.fillStyle=this.getColors().accent;ctx.font='bold 14px Syne';
    ctx.fillText(fmt(total),cx,cy+12);
  },
  bar(canvasId, data, labels) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const {ctx,w,h} = this.setup(canvas);
    const c = this.getColors();
    const pad={t:16,r:16,b:30,l:50};
    const gw=w-pad.l-pad.r, gh=h-pad.t-pad.b;
    const max=Math.max(...data,1)*1.15;
    const bw=gw/data.length*.6;
    const gap=gw/data.length;

    // grid
    ctx.strokeStyle=c.grid;ctx.lineWidth=.5;
    for(let i=0;i<=4;i++){
      const y=pad.t+gh-(gh*i/4);
      ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(w-pad.r,y);ctx.stroke();
      ctx.fillStyle=c.text;ctx.font='10px DM Mono';ctx.textAlign='right';
      ctx.fillText(fmt(Math.round(max*i/4)),pad.l-6,y+3);
    }

    data.forEach((v,i)=>{
      const x=pad.l+gap*i+(gap-bw)/2;
      const bh=(v/max)*gh;
      const y=pad.t+gh-bh;
      const grad=ctx.createLinearGradient(x,y,x,pad.t+gh);
      grad.addColorStop(0,c.accent);grad.addColorStop(1,c.accent+'40');
      ctx.fillStyle=grad;
      ctx.beginPath();
      ctx.roundRect(x,y,bw,bh,[4,4,0,0]);
      ctx.fill();
      ctx.fillStyle=c.text;ctx.font='9px DM Mono';ctx.textAlign='center';
      ctx.fillText(labels[i]||'',x+bw/2,h-8);
    });
  },
  gauge(canvasId, value, max=100) {
    const canvas = document.getElementById(canvasId);
    if(!canvas) return;
    const {ctx,w,h} = this.setup(canvas);
    const c = this.getColors();
    const cx=w/2, cy=h/2, r=Math.min(w,h)/2-14;
    const pct = Math.min(value/max,1);
    const startAngle = Math.PI*.75;
    const endAngle = Math.PI*2.25;
    const range = endAngle-startAngle;

    // bg arc
    ctx.beginPath();ctx.arc(cx,cy,r,startAngle,endAngle);ctx.lineWidth=10;ctx.lineCap='round';ctx.strokeStyle=c.grid;ctx.stroke();
    // value arc
    ctx.beginPath();ctx.arc(cx,cy,r,startAngle,startAngle+range*pct);ctx.lineWidth=10;ctx.lineCap='round';ctx.strokeStyle=c.accent;ctx.stroke();
    // glow
    ctx.beginPath();ctx.arc(cx,cy,r,startAngle,startAngle+range*pct);ctx.lineWidth=14;ctx.lineCap='round';ctx.strokeStyle=c.accent+'30';ctx.stroke();
  },
  sparkline(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if(!canvas||!data.length) return;
    const {ctx,w,h} = this.setup(canvas);
    const c = this.getColors();
    const max=Math.max(...data,1); const min=Math.min(...data,0);
    const range=max-min||1;
    ctx.beginPath();
    data.forEach((v,i)=>{
      const x=(w/(data.length-1||1))*i;
      const y=h-((v-min)/range)*h;
      i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);
    });
    ctx.strokeStyle=c.accent;ctx.lineWidth=1.5;ctx.stroke();
    // fill
    ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();
    const grad=ctx.createLinearGradient(0,0,0,h);
    grad.addColorStop(0,c.accent+'25');grad.addColorStop(1,c.accent+'02');
    ctx.fillStyle=grad;ctx.fill();
  }
};

// ─── ANALYTICS ─────────────────────────────────────────────
const Analytics = {
  monthly(type, month) { return sum(txsFor(type, month)); },
  total(type) { return sum(DATA.transactions.filter(t=>t.type===type)); },
  savings(month) {
    const m = month || monthKey(today());
    return this.monthly('income',m) - this.monthly('expense',m);
  },
  savingsRate(month) {
    const inc = this.monthly('income', month);
    return inc > 0 ? ((inc - this.monthly('expense',month))/inc*100) : 0;
  },
  netWorth() { return this.total('income') - this.total('expense'); },
  healthScore() {
    const rate = this.savingsRate(monthKey(today()));
    const goalsOnTrack = DATA.goals.filter(g => g.current >= g.target * 0.5).length;
    const goalBonus = DATA.goals.length ? (goalsOnTrack/DATA.goals.length)*20 : 10;
    const inc = this.monthly('income', monthKey(today()));
    const diversity = new Set(txsFor('income', monthKey(today())).map(t=>t.category)).size;
    const divScore = Math.min(diversity*5, 15);
    return Math.min(Math.round(Math.max(rate,0)*.65 + goalBonus + divScore + (inc>0?5:0)), 100);
  },
  healthLabel(score) {
    if(score>=80) return 'Excellent — Keep building wealth!';
    if(score>=60) return 'Good — Room to optimize';
    if(score>=40) return 'Fair — Focus on savings';
    if(score>=20) return 'Needs Attention — Review expenses';
    return 'Critical — Take action now';
  },
  trend(months) {
    const now = new Date();
    const inc=[], exp=[], labels=[];
    for(let i=months-1;i>=0;i--){
      const d=new Date(now.getFullYear(),now.getMonth()-i,1);
      const mk=monthKey(d);
      inc.push(this.monthly('income',mk));
      exp.push(this.monthly('expense',mk));
      labels.push(d.toLocaleString('default',{month:'short'}));
    }
    return {inc,exp,labels};
  },
  categoryBreakdown(type, month) {
    const txs = txsFor(type, month);
    const map = {};
    txs.forEach(t => { map[t.category] = (map[t.category]||0) + t.amount; });
    return Object.entries(map).map(([id,value])=>({...getCat(type,id),value})).sort((a,b)=>b.value-a.value);
  },
  avgMonthly(type) {
    const months = new Set(DATA.transactions.filter(t=>t.type===type).map(t=>monthKey(t.date)));
    return months.size ? this.total(type)/months.size : 0;
  },
  bestWorstMonth(type) {
    const map = {};
    DATA.transactions.filter(t=>t.type===type).forEach(t => {
      const mk = monthKey(t.date);
      map[mk] = (map[mk]||0) + t.amount;
    });
    const entries = Object.entries(map);
    if(!entries.length) return {best:null,worst:null};
    entries.sort((a,b)=>b[1]-a[1]);
    return {best:entries[0],worst:entries[entries.length-1]};
  },
  aiInsights() {
    const insights = [];
    const mk = monthKey(today());
    const rate = this.savingsRate(mk);
    const inc = this.monthly('income',mk);
    const exp = this.monthly('expense',mk);
    const health = this.healthScore();

    if(rate > 30) insights.push({icon:'🌟',text:`Excellent savings rate of ${fmtP(rate)}. You're building wealth efficiently.`});
    else if(rate > 0) insights.push({icon:'💡',text:`Savings rate is ${fmtP(rate)}. Aim for 30%+ to accelerate wealth building.`});
    else if(inc>0) insights.push({icon:'⚠️',text:'You\'re spending more than you earn this month. Review discretionary expenses.'});

    const topExp = this.categoryBreakdown('expense',mk);
    if(topExp.length) insights.push({icon:'📊',text:`Top spending: ${topExp[0].name} at ${fmt(topExp[0].value)} (${fmtP(topExp[0].value/exp*100)} of total).`});

    if(health>=70) insights.push({icon:'🏆',text:`Financial health score: ${health}/100. You're on a strong financial path!`});
    else insights.push({icon:'🎯',text:`Health score: ${health}/100. Increase savings and diversify income to improve.`});

    const upcoming = DATA.reminders.filter(r=>!r.done && new Date(r.date)>=new Date());
    if(upcoming.length) insights.push({icon:'🔔',text:`${upcoming.length} upcoming reminder${upcoming.length>1?'s':''}. Stay on top of your finances.`});

    const goalsBehind = DATA.goals.filter(g => {
      if(!g.deadline) return false;
      const daysLeft = (new Date(g.deadline)-new Date())/(86400000);
      const pctDone = g.current/g.target*100;
      return daysLeft>0 && pctDone < (1-daysLeft/365)*100;
    });
    if(goalsBehind.length) insights.push({icon:'⏰',text:`${goalsBehind.length} goal${goalsBehind.length>1?'s':''} may need extra contributions to meet the deadline.`});

    if(!inc && !exp) insights.push({icon:'🚀',text:'Welcome! Start by adding your income and expenses to unlock powerful insights.'});

    return insights.slice(0,5);
  }
};

// ─── CALENDAR ──────────────────────────────────────────────
const Calendar = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  prev() { this.month--; if(this.month<0){this.month=11;this.year--;} this.render(); },
  next() { this.month++; if(this.month>11){this.month=0;this.year++;} this.render(); },
  render() {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    $('#calTitle').textContent = months[this.month]+' '+this.year;
    const firstDay = new Date(this.year,this.month,1).getDay();
    const daysInMonth = new Date(this.year,this.month+1,0).getDate();
    const todayDate = new Date();
    const txDates = {};
    DATA.transactions.forEach(t => {
      const d = new Date(t.date);
      if(d.getMonth()===this.month && d.getFullYear()===this.year) {
        const day = d.getDate();
        if(!txDates[day]) txDates[day]={inc:0,exp:0};
        t.type==='income' ? txDates[day].inc+=t.amount : txDates[day].exp+=t.amount;
      }
    });

    let html = '';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(d => html+=`<div class="cal-head">${d}</div>`);
    for(let i=0;i<firstDay;i++) html+=`<div class="cal-day other"></div>`;
    for(let d=1;d<=daysInMonth;d++){
      const isT = d===todayDate.getDate() && this.month===todayDate.getMonth() && this.year===todayDate.getFullYear();
      const hasTx = txDates[d] ? 'has-tx' : '';
      html+=`<div class="cal-day ${isT?'today':''} ${hasTx}">${d}</div>`;
    }
    $('#calGrid').innerHTML = html;

    // stats
    const mk = this.year+'-'+String(this.month+1).padStart(2,'0');
    const wDays = this.countWorkingDays();
    const inc = Analytics.monthly('income',mk);
    const exp = Analytics.monthly('expense',mk);
    $('#calStats').innerHTML = `
      <div class="cal-stat"><div class="cal-stat-val">${wDays}</div><div class="cal-stat-label">Working Days</div></div>
      <div class="cal-stat"><div class="cal-stat-val">${fmt(inc)}</div><div class="cal-stat-label">Income</div></div>
      <div class="cal-stat"><div class="cal-stat-val">${fmt(exp)}</div><div class="cal-stat-label">Expenses</div></div>
      <div class="cal-stat"><div class="cal-stat-val">${wDays?fmt(Math.round(inc/wDays)):fmt(0)}</div><div class="cal-stat-label">Income/Day</div></div>
    `;
  },
  countWorkingDays() {
    const days = new Date(this.year,this.month+1,0).getDate();
    let count=0;
    for(let d=1;d<=days;d++){
      const day=new Date(this.year,this.month,d).getDay();
      if(day!==0&&day!==6) count++;
    }
    return count;
  }
};

// ─── REPORTS ───────────────────────────────────────────────
const Reports = {
  generate() {
    const period = $('#reportPeriod').value;
    const now = new Date();
    let mk = monthKey(now);
    let label = 'This Month';
    if(period==='quarter') {
      const qm = Math.floor(now.getMonth()/3)*3;
      mk = null; label = 'This Quarter';
    }
    if(period==='year') { mk=null; label='This Year'; }

    let incTxs, expTxs;
    if(period==='month') {
      incTxs = txsFor('income',mk); expTxs = txsFor('expense',mk);
    } else if(period==='quarter') {
      const qm=Math.floor(now.getMonth()/3)*3;
      incTxs=DATA.transactions.filter(t=>t.type==='income'&&new Date(t.date).getMonth()>=qm&&new Date(t.date).getMonth()<qm+3&&new Date(t.date).getFullYear()===now.getFullYear());
      expTxs=DATA.transactions.filter(t=>t.type==='expense'&&new Date(t.date).getMonth()>=qm&&new Date(t.date).getMonth()<qm+3&&new Date(t.date).getFullYear()===now.getFullYear());
    } else {
      incTxs=DATA.transactions.filter(t=>t.type==='income'&&new Date(t.date).getFullYear()===now.getFullYear());
      expTxs=DATA.transactions.filter(t=>t.type==='expense'&&new Date(t.date).getFullYear()===now.getFullYear());
    }

    const inc=sum(incTxs), exp=sum(expTxs), sav=inc-exp;
    const rate=inc?((sav/inc)*100):0;
    const topIncCats=Analytics.categoryBreakdown('income',mk).slice(0,5);
    const topExpCats=Analytics.categoryBreakdown('expense',mk).slice(0,5);

    let html = `
      <div class="report-block glass fade-in"><h3>${label} Summary</h3>
        <div class="report-row"><span class="rr-label">Total Income</span><span class="rr-val" style="color:var(--success)">${fmt(inc)}</span></div>
        <div class="report-row"><span class="rr-label">Total Expenses</span><span class="rr-val" style="color:var(--danger)">${fmt(exp)}</span></div>
        <div class="report-row"><span class="rr-label">Net Savings</span><span class="rr-val" style="color:${sav>=0?'var(--success)':'var(--danger)'}">${fmt(sav)}</span></div>
        <div class="report-row"><span class="rr-label">Savings Rate</span><span class="rr-val">${fmtP(rate)}</span></div>
        <div class="report-row"><span class="rr-label">Transactions</span><span class="rr-val">${incTxs.length+expTxs.length}</span></div>
      </div>
      <div class="report-block glass fade-in"><h3>Top Income Sources</h3>
        ${topIncCats.length ? topIncCats.map(c=>`<div class="report-row"><span class="rr-label">${c.icon} ${c.name}</span><span class="rr-val">${fmt(c.value)}</span></div>`).join('') : '<p style="color:var(--text-muted);font-size:.82rem">No income recorded</p>'}
      </div>
      <div class="report-block glass fade-in"><h3>Top Expense Categories</h3>
        ${topExpCats.length ? topExpCats.map(c=>`<div class="report-row"><span class="rr-label">${c.icon} ${c.name}</span><span class="rr-val">${fmt(c.value)}</span></div>`).join('') : '<p style="color:var(--text-muted);font-size:.82rem">No expenses recorded</p>'}
      </div>
      <div class="export-btns">
        <button onclick="Reports.downloadJSON()">📄 Export JSON</button>
        <button onclick="Reports.downloadCSV()">📊 Export CSV</button>
      </div>
    `;
    $('#reportContent').innerHTML = html;
  },
  downloadJSON() {
    const blob = new Blob([DB.export()], {type:'application/json'});
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='finance-tracker-backup.json'; a.click();
    Toast.show('JSON exported!','success');
  },
  downloadCSV() {
    let csv = 'Type,Category,Amount,Date,Note\n';
    DATA.transactions.forEach(t => {
      csv += `${t.type},${getCat(t.type,t.category).name},${t.amount},${t.date},"${t.note||''}"\n`;
    });
    const blob = new Blob([csv], {type:'text/csv'});
    const a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='transactions.csv'; a.click();
    Toast.show('CSV exported!','success');
  },
  export() { this.downloadJSON(); }
};

// ─── SETTINGS RENDERER ─────────────────────────────────────
const Settings = {
  render() {
    const s = DATA.settings;
    const themes = [
      {id:'dark',name:'Deep Dark',bg:'#08080c'},
      {id:'light',name:'Light',bg:'#f5f3ef'}
    ];
    const colors = [
      {id:'black-gold',name:'Black Gold',c:'#c9a84c'},
      {id:'royal-blue',name:'Royal Blue',c:'#2563eb'},
      {id:'emerald',name:'Emerald',c:'#059669'},
      {id:'crimson',name:'Crimson',c:'#dc2626'},
      {id:'midnight-purple',name:'Purple',c:'#7c3aed'}
    ];
    const fonts = [
      {id:'syne',name:'Syne'},{id:'playfair',name:'Playfair Display'},{id:'outfit',name:'Outfit'},
      {id:'sora',name:'Sora'},{id:'manrope',name:'Manrope'},{id:'jakarta',name:'Jakarta Sans'},
      {id:'lexend',name:'Lexend'},{id:'cormorant',name:'Cormorant'},{id:'lora',name:'Lora'},{id:'dm',name:'DM Mono'}
    ];

    $('#settingsContent').innerHTML = `
      <div class="set-group glass fade-in">
        <h3>Appearance</h3>
        <div class="set-row">
          <div class="set-label">Theme<small>Choose light or dark</small></div>
          <div class="theme-swatches">
            ${themes.map(t=>`<div class="swatch ${s.theme===t.id?'active':''}" style="background:${t.bg};border-color:rgba(255,255,255,.2)" onclick="Settings.setTheme('${t.id}')"></div>`).join('')}
          </div>
        </div>
        <div class="set-row">
          <div class="set-label">Color Scheme<small>Accent color</small></div>
          <div class="theme-swatches">
            ${colors.map(c=>`<div class="swatch ${s.color===c.id?'active':''}" style="background:${c.c}" onclick="Settings.setColor('${c.id}')"></div>`).join('')}
          </div>
        </div>
        <div class="set-row">
          <div class="set-label">Font Style<small>Choose typography</small></div>
          <div class="font-select">
            ${fonts.map(f=>`<div class="font-opt ${s.font===f.id?'active':''}" style="font-family:'${f.name}'" onclick="Settings.setFont('${f.id}')">${f.name}</div>`).join('')}
          </div>
        </div>
        <div class="set-row">
          <div class="set-label">Font Size<small>${s.fontSize}px</small></div>
          <div class="range-wrap"><input type="range" min="12" max="18" value="${s.fontSize}" oninput="Settings.setFontSize(this.value)"><span>${s.fontSize}</span></div>
        </div>
      </div>
      <div class="set-group glass fade-in">
        <h3>Security</h3>
        <div class="set-row">
          <div class="set-label">PIN Lock<small>${s.pin?'Enabled (4-digit)':'Disabled'}</small></div>
          <div class="set-actions">
            ${s.pin?`<button class="set-btn danger" onclick="Settings.removePin()">Remove PIN</button>`:`<button class="set-btn" onclick="Settings.setPin()">Set PIN</button>`}
          </div>
        </div>
      </div>
      <div class="set-group glass fade-in">
        <h3>Data Management</h3>
        <div class="set-row">
          <div class="set-label">Currency Symbol<small>Currently: ${s.currency}</small></div>
          <div class="set-actions">
            <button class="set-btn" onclick="Settings.setCurrency('₹')">₹</button>
            <button class="set-btn" onclick="Settings.setCurrency('$')">$</button>
            <button class="set-btn" onclick="Settings.setCurrency('€')">€</button>
            <button class="set-btn" onclick="Settings.setCurrency('£')">£</button>
          </div>
        </div>
        <div class="set-row">
          <div class="set-label">Backup & Restore<small>Export or import your data</small></div>
          <div class="set-actions">
            <button class="set-btn" onclick="Settings.backup()">Backup</button>
            <button class="set-btn" onclick="Settings.restore()">Restore</button>
          </div>
        </div>
        <div class="set-row">
          <div class="set-label">Reset Data<small>Permanently delete all data</small></div>
          <div class="set-actions">
            <button class="set-btn danger" onclick="Settings.resetAll()">Reset Everything</button>
          </div>
        </div>
      </div>
      <div class="set-group glass fade-in" style="text-align:center">
        <h3>Finance Tracker Pro</h3>
        <p style="color:var(--text-muted);font-size:.78rem">Version 1.0.0 · Built with ❤️</p>
        <p style="color:var(--text-muted);font-size:.72rem;margin-top:8px">Premium Personal Finance Management</p>
      </div>
    `;
  },
  setTheme(t) { DATA.settings.theme=t; DB.save(DATA); Theme.apply(); this.render(); Toast.show('Theme changed','success'); },
  setColor(c) { DATA.settings.color=c; DB.save(DATA); Theme.apply(); this.render(); },
  setFont(f) { DATA.settings.font=f; DB.save(DATA); Theme.apply(); this.render(); },
  setFontSize(s) { DATA.settings.fontSize=parseInt(s); DB.save(DATA); Theme.apply(); this.render(); },
  setCurrency(c) { DATA.settings.currency=c; DB.save(DATA); App.refresh(); this.render(); Toast.show('Currency updated','success'); },
  setPin() {
    const pin = prompt('Enter a 4-digit PIN:');
    if(pin && /^\d{4}$/.test(pin)) { DATA.settings.pin=pin; DB.save(DATA); this.render(); Toast.show('PIN set!','success'); }
    else if(pin) Toast.show('PIN must be 4 digits','error');
  },
  removePin() { DATA.settings.pin=null; DB.save(DATA); this.render(); Toast.show('PIN removed','info'); },
  backup() {
    const blob = new Blob([DB.export()],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='ftp-backup-'+today()+'.json';a.click();
    Toast.show('Backup downloaded!','success');
  },
  restore() {
    const input=document.createElement('input');input.type='file';input.accept='.json';
    input.onchange=e=>{
      const file=e.target.files[0];if(!file)return;
      const reader=new FileReader();
      reader.onload=ev=>{
        if(DB.import(ev.target.result)){DATA=DB.load();Theme.apply();App.refresh();Toast.show('Data restored!','success');}
        else Toast.show('Invalid backup file','error');
      };
      reader.readAsText(file);
    };
    input.click();
  },
  resetAll() {
    if(confirm('Are you sure? This will delete ALL data permanently.')) {
      localStorage.removeItem(DB._key); DATA=DB.load(); Theme.apply(); App.refresh(); Toast.show('All data reset','info');
    }
  }
};

// ─── FAB ───────────────────────────────────────────────────
const Fab = {
  action() {
    if(currentView==='income') Modal.openAddTx('income');
    else if(currentView==='expense') Modal.openAddTx('expense');
    else if(currentView==='goals') Modal.openAddGoal();
    else if(currentView==='reminders') Modal.openAddReminder();
    else if(currentView==='notes') Modal.openAddNote();
    else Modal.openAddTx('expense');
  }
};

// ─── UI ────────────────────────────────────────────────────
const UI = {
  navigate(view) {
    currentView = view;
    $$$$('.view').forEach(v=>v.classList.remove('active'));
    const el = $(`#view-${view}`);
    if(el) el.classList.add('active');
    // topbar
    const titles = {dashboard:'Dashboard',income:'Income',expense:'Expenses',savings:'Savings & Wealth',goals:'Financial Goals',calendar:'Calendar',reports:'Reports',reminders:'Reminders',notes:'Financial Journal',settings:'Settings'};
    $('#topbarTitle').textContent = titles[view]||view;
    // bottom nav
    $$('.bnav').forEach(b=>{
      b.classList.toggle('active', b.dataset.v===view || (view==='savings'&&b.dataset.v==='dashboard'));
    });
    // sidebar
    $$('.sidebar-btn').forEach(b=>b.classList.toggle('active',b.dataset.v===view));
    // render view
    this.renderView(view);
    // scroll top
    $('#views').scrollTop=0;
  },
  renderView(view) {
    switch(view) {
      case 'dashboard': Dashboard.render(); break;
      case 'income': Income.render(); break;
      case 'expense': Expense.render(); break;
      case 'savings': Savings.render(); break;
      case 'goals': GoalsView.render(); break;
      case 'calendar': Calendar.render(); break;
      case 'reports': Reports.generate(); break;
      case 'reminders': RemindersView.render(); break;
      case 'notes': NotesView.render(); break;
      case 'settings': Settings.render(); break;
    }
  },
  toggleSidebar() {
    $('#sidebar').classList.toggle('open');
  },
  toggleMore() {
    $('#moreDrawer').classList.toggle('hidden');
  },
  openSearch() {
    $('#searchOverlay').classList.remove('hidden');
    $('#searchInput').focus();
  },
  closeSearch() {
    $('#searchOverlay').classList.add('hidden');
    $('#searchInput').value='';
    $('#searchResults').innerHTML='';
  },
  doSearch(q) {
    if(!q.trim()) { $('#searchResults').innerHTML=''; return; }
    const results = DATA.transactions.filter(t =>
      getCat(t.type,t.category).name.toLowerCase().includes(q.toLowerCase()) ||
      (t.note||'').toLowerCase().includes(q.toLowerCase())
    ).slice(0,20);
    $('#searchResults').innerHTML = results.length ? results.map(t=>`
      <div class="tx-item" onclick="UI.closeSearch();Modal.openEditTx('${t.id}')">
        <div class="tx-cat" style="background:${getCat(t.type,t.category).color}22">${getCat(t.type,t.category).icon}</div>
        <div class="tx-info"><div class="tx-name">${getCat(t.type,t.category).name}</div><div class="tx-date">${t.date}${t.note?' · '+t.note:''}</div></div>
        <div class="tx-amt ${t.type==='income'?'inc':'exp'}">${t.type==='income'?'+':'−'}${fmt(t.amount)}</div>
      </div>
    `).join('') : '<p class="tx-empty">No results found</p>';
  },
  buildSidebar() {
    $('#sidebarNav').innerHTML = NAV_ITEMS.map(n=>
      `<button class="sidebar-btn ${n.id==='dashboard'?'active':''}" data-v="${n.id}" onclick="App.navigate('${n.id}')">${n.icon}<span>${n.label}</span></button>`
    ).join('');
  }
};

// ─── DASHBOARD ─────────────────────────────────────────────
const Dashboard = {
  render() {
    const mk = monthKey(today());
    const inc = Analytics.monthly('income',mk);
    const exp = Analytics.monthly('expense',mk);
    const sav = inc-exp;
    const rate = Analytics.savingsRate(mk);
    const nw = Analytics.netWorth();
    const health = Analytics.healthScore();

    // greeting
    const h = new Date().getHours();
    const greet = h<12?'Good Morning':h<17?'Good Afternoon':'Good Evening';
    $('#greetText').textContent = greet + ', ' + DATA.settings.userName;
    $('#greetDate').textContent = new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
    $('#dailyQuote').title = QUOTES[Math.floor(Math.random()*QUOTES.length)];

    // net worth
    $('#nwValue').textContent = fmt(nw);
    const prevNw = nw - sav;
    const nwPct = prevNw ? ((nw-prevNw)/Math.abs(prevNw)*100) : 0;
    $('#nwChange').innerHTML = nwPct>=0 ? `<span class="up">↑ ${Math.abs(nwPct).toFixed(1)}%</span> this month` : `<span class="down">↓ ${Math.abs(nwPct).toFixed(1)}%</span> this month`;

    // sparkline
    const trend = Analytics.trend(12);
    Charts.sparkline('nwSpark', trend.inc.map((v,i)=>v-trend.exp[i]));

    // KPI cards
    $('#kpiGrid').innerHTML = [
      {icon:'📈',label:'Monthly Income',val:fmt(inc),sub:trend.inc.length>1?(inc>=trend.inc[trend.inc.length-2]?'↑ Growing':'↓ Declining'):'—'},
      {icon:'📉',label:'Monthly Expense',val:fmt(exp),sub:trend.exp.length>1?(exp<=trend.exp[trend.exp.length-2]?'✓ Controlled':'↑ Rising'):'—'},
      {icon:'💰',label:'Total Savings',val:fmt(Analytics.total('income')-Analytics.total('expense')),sub:'Lifetime'},
      {icon:'📊',label:'Savings Rate',val:fmtP(rate),sub:rate>=30?'Excellent':rate>=10?'Good':'Needs work'}
    ].map((k,i)=>`
      <div class="kpi glass fade-in stagger-${i+1}">
        <div class="kpi-icon">${k.icon}</div>
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-val">${k.val}</div>
        <div class="kpi-sub">${k.sub}</div>
      </div>
    `).join('');

    // health
    Charts.gauge('healthCanvas', health);
    $('#healthScore').textContent = health;
    $('#healthLabel').textContent = Analytics.healthLabel(health);

    // chart
    const ct = Analytics.trend(dashPeriod);
    Charts.line('dashChart', [{data:ct.inc},{data:ct.exp}], ct.labels);

    // period tabs
    $$('#dashPeriodTabs .ptab').forEach(btn=>{
      btn.onclick=()=>{$$('#dashPeriodTabs .ptab').forEach(b=>b.classList.remove('active'));btn.classList.add('active');dashPeriod=parseInt(btn.dataset.p);this.render();};
    });

    // insights
    $('#insightsList').innerHTML = Analytics.aiInsights().map(i=>
      `<div class="insight-item"><span class="insight-icon">${i.icon}</span><span>${i.text}</span></div>`
    ).join('');

    // recent
    const recent = [...DATA.transactions].sort((a,b)=>b.createdAt-a.createdAt).slice(0,6);
    $('#recentList').innerHTML = recent.length ? recent.map(t=>{
      const cat=getCat(t.type,t.category);
      return `<div class="tx-item" onclick="Modal.openEditTx('${t.id}')">
        <div class="tx-cat" style="background:${cat.color}22">${cat.icon}</div>
        <div class="tx-info"><div class="tx-name">${cat.name}</div><div class="tx-date">${new Date(t.date).toLocaleDateString('en-US',{month:'short',day:'numeric'})}${t.note?' · '+t.note:''}</div></div>
        <div class="tx-amt ${t.type==='income'?'inc':'exp'}">${t.type==='income'?'+':'−'}${fmt(t.amount)}</div>
      </div>`;
    }).join('') : '<p class="tx-empty">No transactions yet. Tap + to add your first one!</p>';
  }
};

// ─── INCOME VIEW ───────────────────────────────────────────
const Income = {
  render() {
    const mk = monthKey(today());
    const allInc = txsFor('income');
    const monthInc = txsFor('income',mk);
    const avg = Analytics.avgMonthly('income');
    const {best} = Analytics.bestWorstMonth('income');

    // summary
    $('#incomeSummary').innerHTML = [
      {label:'Total',val:fmt(sum(allInc))},
      {label:'This Month',val:fmt(sum(monthInc))},
      {label:'Monthly Avg',val:fmt(avg)},
      {label:'Best Month',val:best?fmt(best[1]):'N/A'}
    ].map((s,i)=>`<div class="sum-card glass fade-in stagger-${i+1}"><div class="sum-label">${s.label}</div><div class="sum-val">${s.val}</div></div>`).join('');

    // chart
    const trend = Analytics.trend(6);
    Charts.line('incomeChart',[{data:trend.inc}],trend.labels);

    // filter
    const filter = $('#incomeFilter').value;
    const monthFilter = $('#incomeMonth').value;
    let filtered = allInc;
    if(filter!=='all') filtered=filtered.filter(t=>t.category===filter);
    if(monthFilter) filtered=filtered.filter(t=>monthKey(t.date)===monthFilter);

    // populate filter
    const cats = [...INCOME_CATS,...DATA.customIncomeCats];
    if($('#incomeFilter').options.length<=1) {
      cats.forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=c.icon+' '+c.name;$('#incomeFilter').appendChild(o);});
    }

    // list
    filtered.sort((a,b)=>new Date(b.date)-new Date(a.date));
    $('#incomeList').innerHTML = filtered.length ? filtered.map(t=>{
      const cat=getCat('income',t.category);
      return `<div class="tx-item fade-in" onclick="Modal.openEditTx('${t.id}')">
        <div class="tx-cat" style="background:${cat.color}22">${cat.icon}</div>
        <div class="tx-info"><div class="tx-name">${cat.name}</div><div class="tx-date">${new Date(t.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}${t.note?' · '+t.note:''}</div></div>
        <div class="tx-amt inc">+${fmt(t.amount)}</div>
      </div>`;
    }).join('') : '<p class="tx-empty">No income recorded for this period</p>';
  }
};

// ─── EXPENSE VIEW ──────────────────────────────────────────
const Expense = {
  render() {
    const mk = monthKey(today());
    const allExp = txsFor('expense');
    const monthExp = txsFor('expense',mk);
    const avg = Analytics.avgMonthly('expense');
    const {best} = Analytics.bestWorstMonth('expense');

    $('#expenseSummary').innerHTML = [
      {label:'Total',val:fmt(sum(allExp))},
      {label:'This Month',val:fmt(sum(monthExp))},
      {label:'Monthly Avg',val:fmt(avg)},
      {label:'Highest Month',val:best?fmt(best[1]):'N/A'}
    ].map((s,i)=>`<div class="sum-card glass fade-in stagger-${i+1}"><div class="sum-label">${s.label}</div><div class="sum-val">${s.val}</div></div>`).join('');

    // chart
    const breakdown = Analytics.categoryBreakdown('expense',mk);
    if(breakdown.length) Charts.doughnut('expenseChart',breakdown.slice(0,8));

    // filter
    const filter = $('#expenseFilter').value;
    const monthFilter = $('#expenseMonth').value;
    let filtered = allExp;
    if(filter!=='all') filtered=filtered.filter(t=>t.category===filter);
    if(monthFilter) filtered=filtered.filter(t=>monthKey(t.date)===monthFilter);

    if($('#expenseFilter').options.length<=1) {
      [...EXPENSE_CATS,...DATA.customExpenseCats].forEach(c=>{const o=document.createElement('option');o.value=c.id;o.textContent=c.icon+' '+c.name;$('#expenseFilter').appendChild(o);});
    }

    filtered.sort((a,b)=>new Date(b.date)-new Date(a.date));
    $('#expenseList').innerHTML = filtered.length ? filtered.map(t=>{
      const cat=getCat('expense',t.category);
      return `<div class="tx-item fade-in" onclick="Modal.openEditTx('${t.id}')">
        <div class="tx-cat" style="background:${cat.color}22">${cat.icon}</div>
        <div class="tx-info"><div class="tx-name">${cat.name}</div><div class="tx-date">${new Date(t.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}${t.note?' · '+t.note:''}</div></div>
        <div class="tx-amt exp">−${fmt(t.amount)}</div>
      </div>`;
    }).join('') : '<p class="tx-empty">No expenses recorded for this period</p>';
  }
};

// ─── SAVINGS VIEW ──────────────────────────────────────────
const Savings = {
  render() {
    const mk = monthKey(today());
    const totalInc = Analytics.total('income');
    const totalExp = Analytics.total('expense');
    const totalSav = totalInc - totalExp;
    const monthSav = Analytics.savings(mk);
    const rate = Analytics.savingsRate(mk);
    const burnRate = Analytics.avgMonthly('expense');
    const runway = burnRate>0 ? totalSav/burnRate : 0;

    $('#savingsSummary').innerHTML = [
      {label:'Total Savings',val:fmt(totalSav),color:totalSav>=0?'var(--success)':'var(--danger)'},
      {label:'This Month',val:fmt(monthSav),color:monthSav>=0?'var(--success)':'var(--danger)'},
      {label:'Savings Rate',val:fmtP(rate)},
      {label:'Cash Runway',val:runway>0?runway.toFixed(1)+' mo':'N/A'}
    ].map((s,i)=>`<div class="sum-card glass fade-in stagger-${i+1}"><div class="sum-label">${s.label}</div><div class="sum-val" ${s.color?'style="color:'+s.color+'"':''}>${s.val}</div></div>`).join('');

    // chart
    const trend = Analytics.trend(12);
    const cumSav=[]; let cum=0;
    trend.inc.forEach((v,i)=>{cum+=v-trend.exp[i];cumSav.push(cum);});
    Charts.line('savingsChart',[{data:cumSav}],trend.labels);

    // metrics
    const months = new Set(DATA.transactions.map(t=>monthKey(t.date))).size||1;
    $('#savingsMetrics').innerHTML = `
      <div class="report-block"><h3>Wealth Metrics</h3>
        <div class="report-row"><span class="rr-label">Total Income (All Time)</span><span class="rr-val" style="color:var(--success)">${fmt(totalInc)}</span></div>
        <div class="report-row"><span class="rr-label">Total Expenses (All Time)</span><span class="rr-val" style="color:var(--danger)">${fmt(totalExp)}</span></div>
        <div class="report-row"><span class="rr-label">Average Monthly Savings</span><span class="rr-val">${fmt(totalSav/Math.max(months,1))}</span></div>
        <div class="report-row"><span class="rr-label">Monthly Burn Rate</span><span class="rr-val">${fmt(burnRate)}</span></div>
        <div class="report-row"><span class="rr-label">Financial Independence Score</span><span class="rr-val">${Math.min(Math.round(runway*2),100)}/100</span></div>
      </div>
    `;
  }
};

// ─── GOALS VIEW ────────────────────────────────────────────
const GoalsView = {
  render() {
    $('#goalsList').innerHTML = DATA.goals.length ? DATA.goals.map(g=>{
      const pct = Math.min(Math.round(g.current/g.target*100),100);
      const remaining = Math.max(g.target-g.current,0);
      const daysLeft = g.deadline ? Math.max(Math.ceil((new Date(g.deadline)-new Date())/86400000),0) : null;
      const monthlyNeeded = daysLeft>0 ? remaining/(daysLeft/30) : null;
      return `<div class="goal-card glass fade-in">
        <div class="goal-top">
          <div class="goal-name">${g.name}</div>
          ${g.deadline?`<div class="goal-deadline">${daysLeft>0?daysLeft+' days left':'Overdue'}</div>`:''}
        </div>
        <div class="goal-bar"><div class="goal-bar-fill" style="width:${pct}%"></div></div>
        <div class="goal-stats">
          <span>${fmt(g.current)} of ${fmt(g.target)}</span>
          <span>${pct}% complete</span>
        </div>
        <div class="goal-stats" style="margin-top:6px">
          <span>Remaining: ${fmt(remaining)}</span>
          ${monthlyNeeded?`<span>Need: ${fmt(monthlyNeeded)}/mo</span>`:''}
        </div>
        <div class="goal-actions">
          <button onclick="Goals.addFunds('${g.id}')">+ Add Funds</button>
          <button onclick="Modal.openEditGoal('${g.id}')">Edit</button>
        </div>
      </div>`;
    }).join('') : '<p class="tx-empty" style="padding:40px">No goals set yet. Create your first financial goal!</p>';
  }
};

// ─── REMINDERS VIEW ────────────────────────────────────────
const RemindersView = {
  render() {
    const sorted = [...DATA.reminders].sort((a,b)=>new Date(a.date)-new Date(b.date));
    const active = sorted.filter(r=>!r.done);
    const done = sorted.filter(r=>r.done);
    const icons = {bill:'📄',rent:'🏠',investment:'📈',savings:'💰',review:'🔍',other:'📌'};
    $('#remindersList').innerHTML = (active.length||done.length) ? [...active,...done].map(r=>{
      const isPast = new Date(r.date)<new Date() && !r.done;
      return `<div class="rem-card ${r.done?'done':''}">
        <div class="rem-icon">${icons[r.type]||'📌'}</div>
        <div class="rem-info">
          <div class="rem-title">${r.title}</div>
          <div class="rem-date">${new Date(r.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})} ${isPast?'· Overdue':''}</div>
        </div>
        <div class="rem-actions">
          <button onclick="Reminders.toggle('${r.id}')" title="${r.done?'Undo':'Complete'}">${r.done?'↩':'✓'}</button>
          <button onclick="Reminders.delete('${r.id}')" title="Delete">✕</button>
        </div>
      </div>`;
    }).join('') : '<p class="tx-empty" style="padding:40px">No reminders set. Stay on top of your finances!</p>';
  }
};

// ─── NOTES VIEW ────────────────────────────────────────────
const NotesView = {
  render() {
    const sorted = [...DATA.notes].sort((a,b)=>b.createdAt-a.createdAt);
    $('#notesList').innerHTML = sorted.length ? sorted.map(n=>`
      <div class="note-card fade-in">
        <div class="note-date">${new Date(n.date).toLocaleDateString('en-US',{weekday:'short',month:'long',day:'numeric',year:'numeric'})}</div>
        <div class="note-text">${n.text}</div>
        <div class="note-actions"><button onclick="Notes.delete('${n.id}')">Delete</button></div>
      </div>
    `).join('') : '<p class="tx-empty" style="padding:40px">Your financial journal is empty. Start writing!</p>';
  }
};

// ─── APP INIT ──────────────────────────────────────────────
const App = {
  init() {
    Theme.apply();
    UI.buildSidebar();

    // splash
    setTimeout(() => {
      $('#splash').classList.add('out');
      setTimeout(() => {
        $('#splash').remove();
        if(DATA.settings.pin) {
          $('#pinLock').classList.remove('hidden');
        } else {
          $('#app').classList.remove('hidden');
          $('#fab').classList.remove('hidden');
          this.refresh();
        }
      }, 600);
    }, 3800);

    // resize handler for charts
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => UI.renderView(currentView), 250);
    });
  },
  navigate(view) {
    UI.navigate(view);
  },
  refresh() {
    UI.renderView(currentView);
  }
};

// ─── BOOT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => App.init());

// ─── SERVICE WORKER REGISTRATION ───────────────────────────
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(()=>{});
}
