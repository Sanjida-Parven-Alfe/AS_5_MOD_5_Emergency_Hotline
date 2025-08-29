const CALL_COST = 20;

function getInt(id) {
  const el = document.getElementById(id);
  return parseInt(el?.innerText || '0') || 0;
}
function setInt(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value;
}
function alertMsg(msg) {
  window.alert(msg);
}


function getCardMeta(btnEl) {
  const card = btnEl.closest('.flex.flex-col.bg-white.rounded-xl.shadow-lg');
  const bnNameEl = card?.querySelector('h1.hind-madurai-bold');
  const nameBlock = bnNameEl ? bnNameEl.parentElement : null;
  const enNameEl = nameBlock ? nameBlock.querySelector('p') : null;
  const numberEl = card?.querySelector('h1.font-bold');

  return {
    name: (bnNameEl?.innerText || '').trim(),      
    english: (enNameEl?.innerText || '').trim(),  
    number: (numberEl?.innerText || '').trim(),
    card,
  };
}



//Heart Count
function initHearts() {
  const hearts = document.querySelectorAll('.fa-regular.fa-heart, .fa-heart');
  hearts.forEach((icon) => {
    icon.addEventListener('click', () => {
      const current = getInt('heartCount');
      setInt('heartCount', current + 1);

      // coverted red heart
      icon.classList.remove('fa-regular');
      icon.classList.add('fa-solid', 'text-red-500');
    });
  });
}

//History Count
function addToHistory({ name, number, time }) {
  const container = document.getElementById('historyList');
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className =
    'flex justify-between items-center w-full md:w-[289px] h-[70px] md:h-[86px] bg-[#FAFAFA] rounded-lg mb-2 ';

  const left = document.createElement('div');
  left.className = 'px-[0px] md:px-[16px] py-[10px] md:py-[16px]';
  left.innerHTML = `
    <p class="mb-1 md:mb-2 text-xs md:text-base">${name}</p>
    <p class="text-[#5C5C5C] text-xs md:text-sm">${number}</p>
  `;

  const right = document.createElement('div');
  right.className = 'px-[0px] md:px-[16px] py-[10px] md:py-[16px]';
  right.innerHTML = `<p class="text-xs md:text-sm">${time}</p>`;

  wrap.appendChild(left);
  wrap.appendChild(right);
  container.prepend(wrap); 
}

function initClearHistory() {
  const clearBtn = document.getElementById('clearHistoryBtn');
  if (!clearBtn) return;
  clearBtn.addEventListener('click', () => {
    const container = document.getElementById('historyList');
    if (container) container.innerHTML = '';
  });
}

//Copy count
function handleCopy(buttonEl) {
  const { number } = getCardMeta(buttonEl);
  if (!number) {
    alertMsg('কপি করার মতো নম্বর পাওয়া যায়নি।');
    return;
  }

  const doCopy = () =>
    navigator.clipboard.writeText(number).then(
      () => alertMsg(`নম্বর কপি হয়েছে: ${number}`),
      () => alertMsg('কপি ব্যর্থ! আবার চেষ্টা করুন।')
    );

  if (navigator.clipboard && navigator.clipboard.writeText) {
    doCopy();
  } 
  else {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = number;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      alertMsg(`নম্বর কপি হয়েছে: ${number}`);
    } 
    catch {
      alertMsg('কপি ব্যর্থ! আবার চেষ্টা করুন।');
    }
    document.body.removeChild(ta);
  }

  // Copy Count++
  const cc = getInt('copyCount');
  setInt('copyCount', cc + 1);
}

// Call 
function handleCall(buttonEl) {
  const { english, name, number } = getCardMeta(buttonEl);

  const displayForAlert = english || name;

  const coins = getInt('coinCount');
  if (coins < CALL_COST) {
    alertMsg('❌ আপনার পর্যাপ্ত কয়েন নেই। কল করতে কমপক্ষে ২০ কয়েন লাগবে।');
    return;
  }

  alertMsg(`📞 Calling ${displayForAlert} ${number}...`);


  setInt('coinCount', coins - CALL_COST);


  addToHistory({
    name,         
    number,
    time: new Date().toLocaleTimeString(),
  });
}



function initButtonDelegation() {
  
  const hotlineSection = document.querySelector('section.grid');
  if (!hotlineSection) return;

  hotlineSection.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    const btn = target.closest('button');
    if (!btn) return;

    const label = (btn.textContent || '').trim().toLowerCase();
    if (label === 'copy') {
      e.preventDefault();
      handleCopy(btn);
    } else if (label === 'call') {
      e.preventDefault();
      handleCall(btn);
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  initHearts();
  initButtonDelegation();
  initClearHistory();
});
