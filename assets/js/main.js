document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化控制按钮（即使语言没加载完也能点）
  initThemeToggle();
  initLangToggle();
  initSmoothScroll();
});

// 2. 监听语言加载完成事件 (核心：重绘所有动态模块)
window.addEventListener('i18nLoaded', () => {
  console.log('[main] i18n loaded, rendering content...');
  initAbout();
  initProjects();
  initTimeline();
  initEducation();
  initContactLinks();

});

// ================= 主题切换 (修复版) =================
function initThemeToggle() {
  const toggleBtn = document.querySelector('.theme-toggle');
  const htmlEl = document.documentElement;

  if (!toggleBtn) return;

  // 初始化状态
  const savedTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // 设置 DOM 和存储
    htmlEl.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    console.log(`[Theme] Switched to ${newTheme}`);
  });
}

// ================= 语言切换 =================
function initLangToggle() {
  const toggleBtn = document.querySelector('.lang-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const current = window.i18n.currentLang();
    const next = current === 'en' ? 'zh' : 'en';
    console.log(`[Lang] Switching to ${next}...`);
    window.i18n.changeLang(next);
  });
}

// ... (Previous code remains the same)

// ================= 0. About This ePortfolio 渲染 =================
function initAbout() {
  const container = document.querySelector('.about-content');
  if (!container) return;
  container.innerHTML = ''; // 【关键】清空旧内容

  const intro = window.i18n.get('about.intro');
  const points = window.i18n.get('about.points');

  const pointsHtml = Array.isArray(points)
    ? points.map(p => `
        <li class="about-point">
          <i class="fa-solid fa-circle-check about-point-icon"></i>
          <span>${p}</span>
        </li>
      `).join('')
    : '';

  container.innerHTML = `
    <p class="about-intro">${intro}</p>
    <ul class="about-list">${pointsHtml}</ul>
  `;
}

// ================= 1. 精选项目渲染 =================
function initProjects() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  grid.innerHTML = ''; // 【关键】清空旧内容

  const projects = [
    {
      img: "assets/images/projects/fakenews-wordcloud.jpg",
      titleKey: "projects.item3.title",
      dateKey: "projects.item3.date",
      link: "pages/projects/project3.html"
    },
    {
      img: "assets/images/projects/agentrouter-fleet.jpg",
      titleKey: "projects.item2.title",
      dateKey: "projects.item2.date",
      link: "pages/projects/project2.html"
    },
    {
      img: "assets/images/projects/sentiment-gauge.jpg",
      titleKey: "projects.item4.title",
      dateKey: "projects.item4.date",
      link: "pages/projects/project4.html"
    },
    {
      img: "assets/images/projects/movie-kg-schema.png",
      titleKey: "projects.item5.title",
      dateKey: "projects.item5.date",
      link: "pages/projects/project5.html"
    },
    {
      img: "assets/images/projects/Microbiom_data.png",
      titleKey: "projects.item1.title",
      dateKey: "projects.item1.date",
      link: "pages/projects/project1.html"
    }
  ];

  projects.forEach(p => {
    // 缩略图：图片优先，若无图片则使用图标占位
    const thumbHtml = p.img
      ? `<img src="${p.img}" alt="${window.i18n.get('projects.imgAlt')}" class="project-thumbnail">`
      : `<div class="project-thumbnail project-thumbnail-icon"><i class="${p.icon}"></i></div>`;

    const linkAttrs = p.external ? `target="_blank" rel="noopener"` : '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="overflow:hidden;">
        ${thumbHtml}
      </div>
      <div class="project-info">
        <h3>${window.i18n.get(p.titleKey)}</h3>
        <div class="project-date"><i class="fa-regular fa-calendar"></i> ${window.i18n.get(p.dateKey)}</div>
        <a href="${p.link}" class="project-link" ${linkAttrs}>${window.i18n.get('projects.viewDetail')}</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ... (Rest of the code remains the same)


// ================= 3. 时间轴渲染 =================
function initTimeline() {
  const container = document.querySelector('.timeline-container');
  if (!container) return;
  container.innerHTML = ''; // 【关键】清空

  const events = [
    "timeline.event4", "timeline.event3", "timeline.event2", "timeline.event1"
  ];

  events.forEach(key => {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <span class="timeline-date">${window.i18n.get(`${key}.date`)}</span>
      <div class="timeline-content">
        <h3>${window.i18n.get(`${key}.title`)}</h3>
        <h5>${window.i18n.get(`${key}.loc`)}</h5>
        <p>${window.i18n.get(`${key}.desc`)}</p>
      </div>
    `;
    container.appendChild(item);
  });
}


// ================3.教育===============
function initEducation() {
  const container = document.querySelector('.education-container');
  if (!container) return;
  container.innerHTML = ''; // 【关键】清空

  const events = [
    "education.event2", "education.event1"
  ];

  events.forEach(key => {
    const item = document.createElement('div');
    item.className = 'education-item';
    item.innerHTML = `
      <div class="education-dot"></div>
      <span class="education-date">${window.i18n.get(`${key}.date`)}</span>
      <div class="education-content">
        <h3>${window.i18n.get(`${key}.title`)}</h3>
        <h5>${window.i18n.get(`${key}.loc`)}</h5>
        <p>${window.i18n.get(`${key}.desc`)}</p>
      </div>
    `;
    container.appendChild(item);
  });
}

// ================= 联系方式 =================
function initContactLinks() {
  const container = document.querySelector('.contact-links');
  if (!container) return;
  container.innerHTML = '';
  
  const contacts = [
    { icon: "fa-brands fa-linkedin", key: "contact.linkdin", link: "https://www.linkedin.com/in/ming97c"},
    { icon: "fab fa-github", key: "contact.github", link: "https://github.com/mic000" }
  ];
  
  contacts.forEach(c => {
    const item = document.createElement('div');
    item.className = 'contact-item';
    item.innerHTML = `<a href="${c.link}" target="_blank"><i class="${c.icon}"></i><p>${window.i18n.get(c.key)}</p></a>`;
    container.appendChild(item);
  });
}


// ================= 平滑滚动 =================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}