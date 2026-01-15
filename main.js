document.addEventListener('DOMContentLoaded', () => {
  // 1. 初始化控制按钮（即使语言没加载完也能点）
  initThemeToggle();
  initLangToggle();
  initSmoothScroll();
});

// 2. 监听语言加载完成事件 (核心：重绘所有动态模块)
window.addEventListener('i18nLoaded', () => {
  console.log('[main] i18n loaded, rendering content...');
  initProjects();
  initTimeline();
  initEducation();
  initTechStack();
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

// ================= 1. 精选项目渲染 =================
function initProjects() {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;
  grid.innerHTML = ''; // 【关键】清空旧内容

  const projects = [
    { 
      img: "assets/images/Portfolio-01.png", 
      titleKey: "projects.item1.title", 
      descKey: "projects.item1.desc",
      tagsKey: "projects.item1.tags", // Added tags key
      link: "pages/projects/project1.html"
    }
  ];

  projects.forEach(p => {
    // 处理 Tags
    const tags = window.i18n.get(p.tagsKey);
    const tagsHtml = Array.isArray(tags) 
      ? `<div class="project-tags">${tags.map(t => `<span class="project-tag">${t}</span>`).join('')}</div>`
      : '';

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div style="overflow:hidden;">
        <img src="${p.img}" alt="${window.i18n.get('projects.imgAlt')}" class="project-thumbnail">
      </div>
      <div class="project-info">
        <h3>${window.i18n.get(p.titleKey)}</h3>
        <p>${window.i18n.get(p.descKey)}</p>
        ${tagsHtml}
        <a href="${p.link}" class="project-link">${window.i18n.get('projects.viewDetail')}</a>
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

// ================= 4. 技术栈渲染 =================
function initTechStack() {
  const container = document.querySelector('.skills-wrapper');
  if (!container) return;
  container.innerHTML = ''; // 【关键】清空

  const stack = [
    {
      category: "skills.MLOps",
      items: [
        { name: "AWS", icon: "fa-brands fa-aws" },
        { name: "BigQuery", icon: "fa-solid fa-database" },
        { name: "Vertex AI", icon: "fa-solid fa-brain" },
        { name: "Azure", icon: "fa-brands fa-microsoft" },
        { name: "Airflow", icon: "fa-solid fa-wind" },
        { name: "MLflow", icon: "fa-solid fa-route" },
        { name: "Kubernetes", icon: "fa-solid fa-network-wired" }
      ]
    },
    {
      category: "skills.ML",
      items: [
        { name: "NLP", icon: "fa-solid fa-comment-dots" },
        { name: "LLMs", icon: "fa-solid fa-brain" },
        { name: "PCA", icon: "fa-solid fa-compress" },
        { name: "A/B Testing", icon: "fa-solid fa-flask" },
        { name: "SHAP", icon: "fa-solid fa-magnifying-glass-chart" },
        { name: "Regression", icon: "fa-solid fa-square-poll-vertical" },
        { name: "Causal Inference", icon: "fa-solid fa-link" },
        { name: "Decision Tree", icon: "fa-solid fa-diagram-project" },
        { name: "Random Forest", icon: "fa-solid fa-tree" }
      ]
    },
    {
      category: "skills.software",
      items: [
        { name: "Python", icon: "fa-brands fa-python" },
        { name: "R", icon: "fa-brands fa-r-project" },
        { name: "SQL", icon: "fa-solid fa-database" },
        { name: "NumPy", icon: "fa-solid fa-square-root-variable" },
        { name: "scikit-learn", icon: "fa-solid fa-robot" },
        { name: "Git", icon: "fa-brands fa-git-alt" },
        { name: "Docker", icon: "fa-brands fa-docker" },
        { name: "PyTorch", icon: "fa-solid fa-fire" },
        { name: "TensorFlow", icon: "fa-solid fa-brain" },
        { name: "Matplotlib", icon: "fa-solid fa-chart-simple" },
        { name: "dplyr", icon: "fa-solid fa-filter" },
        { name: "tidyverse", icon: "fa-solid fa-layer-group" },
        { name: "ggplot2", icon: "fa-solid fa-chart-area" }
      ]
    },
    {
      category: "skills.tools",
      items: [
        { name: "Tableau", icon: "fa-solid fa-table" },
        { name: "Power BI", icon: "fa-solid fa-chart-column" },
        { name: "Excel (VBA)", icon: "fa-solid fa-file-excel" },
        { name: "SAS", icon: "fa-solid fa-chart-bar" },
        { name: "Salesforce", icon: "fa-brands fa-salesforce" }
      ]
    }
  ];

  stack.forEach(group => {
    const itemsHtml = group.items.map(s => `
      <div class="skill-badge"><i class="${s.icon}"></i> ${s.name}</div>
    `).join('');
    
    const col = document.createElement('div');
    col.className = 'skill-category';
    col.innerHTML = `<h3>${window.i18n.get(group.category)}</h3><div class="skill-list">${itemsHtml}</div>`;
    container.appendChild(col);
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