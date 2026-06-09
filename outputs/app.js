const STORAGE_KEY = "central-canal-dark-v1";

const sections = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "◆",
    type: "dashboard",
  },
  {
    id: "ais",
    label: "IAs e ferramentas",
    icon: "IA",
    type: "cards",
    fields: [
      ["name", "Nome da IA", "text"],
      ["category", "Funcao principal", "select", ["Roteiro", "Voz", "Imagem", "Video", "Edicao", "Pesquisa", "SEO", "Automacao", "Outros"]],
      ["use", "Como usar no canal", "textarea"],
      ["price", "Preco/Plano", "text"],
      ["link", "Link", "url"],
      ["status", "Status", "select", ["Testar", "Usando", "Aprovada", "Descartada"]],
      ["notes", "Observacoes", "textarea"],
    ],
  },
  {
    id: "prompts",
    label: "Prompts",
    icon: "P",
    type: "cards",
    fields: [
      ["name", "Nome do prompt", "text"],
      ["stage", "Etapa", "select", ["Pesquisa", "Ideia", "Roteiro", "Thumbnail", "Titulo", "Descricao", "Shorts", "Narracao", "Revisao"]],
      ["prompt", "Prompt completo", "textarea"],
      ["variables", "Variaveis para trocar", "text"],
      ["result", "Resultado esperado", "textarea"],
      ["rating", "Nota", "select", ["1", "2", "3", "4", "5"]],
    ],
  },
  {
    id: "niches",
    label: "Nichos monetizaveis",
    icon: "$",
    type: "cards",
    fields: [
      ["name", "Nicho", "text"],
      ["platform", "Plataforma alvo", "select", ["YouTube", "TikTok", "YouTube e TikTok", "Multiplataforma"]],
      ["monetization", "Formas de monetizacao", "textarea"],
      ["difficulty", "Dificuldade", "select", ["Baixa", "Media", "Alta"]],
      ["demand", "Demanda", "select", ["Baixa", "Media", "Alta"]],
      ["risk", "Riscos", "textarea"],
      ["ideas", "Ideias de videos", "textarea"],
    ],
  },
  {
    id: "links",
    label: "Links uteis",
    icon: "↗",
    type: "cards",
    fields: [
      ["name", "Titulo do video/artigo", "text"],
      ["source", "Fonte", "text"],
      ["link", "URL", "url"],
      ["topic", "Assunto", "select", ["Canal dark", "Monetizacao", "IA", "Roteiro", "Edicao", "SEO", "Casos reais", "Outros"]],
      ["summary", "Resumo util", "textarea"],
      ["nextStep", "O que fazer com isso", "textarea"],
    ],
  },
  {
    id: "research",
    label: "Pesquisa pendente",
    icon: "?",
    type: "kanban",
    fields: [
      ["name", "Pergunta ou assunto", "text"],
      ["status", "Status", "select", ["Investigar", "Validar", "Concluido"]],
      ["priority", "Prioridade", "select", ["Alta", "Media", "Baixa"]],
      ["notes", "Notas", "textarea"],
      ["source", "Fonte inicial", "url"],
    ],
  },
  {
    id: "ideas",
    label: "Ideias proprias",
    icon: "✦",
    type: "cards",
    fields: [
      ["name", "Ideia", "text"],
      ["niche", "Nicho relacionado", "text"],
      ["format", "Formato", "select", ["Short", "Video longo", "Serie", "Live gravada", "Carrossel", "Outro"]],
      ["hook", "Gancho inicial", "textarea"],
      ["potential", "Potencial", "select", ["Baixo", "Medio", "Alto"]],
      ["nextStep", "Proximo passo", "textarea"],
    ],
  },
  {
    id: "channels",
    label: "Canais",
    icon: "▶",
    type: "cards",
    fields: [
      ["name", "Nome do canal", "text"],
      ["platform", "Plataforma", "select", ["YouTube", "TikTok", "Instagram", "Kwai", "Multiplataforma"]],
      ["niche", "Nicho", "text"],
      ["positioning", "Proposta do canal", "textarea"],
      ["frequency", "Frequencia de postagem", "text"],
      ["status", "Status", "select", ["Planejando", "Criando identidade", "Produzindo", "Publicado", "Escalando"]],
      ["metrics", "Metricas importantes", "textarea"],
    ],
  },
];

const starterData = {
  ais: [
    {
      name: "ChatGPT",
      category: "Roteiro",
      use: "Criar ideias, roteiros, prompts, pesquisas guiadas e variacoes de titulos.",
      price: "Gratuito/pago",
      link: "https://chat.openai.com",
      status: "Testar",
      notes: "Comece com prompts por etapa: nicho, roteiro, gancho, CTA e revisao.",
    },
    {
      name: "ElevenLabs",
      category: "Voz",
      use: "Gerar narracoes naturais para videos dark.",
      price: "Gratuito/pago",
      link: "https://elevenlabs.io",
      status: "Testar",
      notes: "Comparar vozes em portugues e checar direitos de uso.",
    },
  ],
  prompts: [
    {
      name: "Validar nicho",
      stage: "Pesquisa",
      prompt: "Analise o nicho [NICHO] para um canal dark em [PLATAFORMA]. Liste demanda, concorrencia, formatos virais, riscos de monetizacao, ideias de 10 videos e uma nota de 0 a 10.",
      variables: "[NICHO], [PLATAFORMA]",
      result: "Decidir se vale testar o nicho.",
      rating: "5",
    },
  ],
  niches: [
    {
      name: "Historias reais e curiosidades",
      platform: "YouTube e TikTok",
      monetization: "AdSense, afiliados de livros/documentarios, produtos digitais e patrocinio.",
      difficulty: "Media",
      demand: "Alta",
      risk: "Cuidar de direitos autorais, sensacionalismo e fontes confiaveis.",
      ideas: "Casos pouco conhecidos, listas tematicas, historias com reviravolta.",
    },
  ],
  links: [],
  research: [
    {
      name: "Quais nichos dark monetizam melhor em portugues?",
      status: "Investigar",
      priority: "Alta",
      notes: "Separar por YouTube longo, Shorts e TikTok.",
      source: "",
    },
  ],
  ideas: [],
  channels: [],
};

let state = loadState();
let activeSection = "dashboard";
let editing = null;

const navList = document.querySelector("#navList");
const sectionTitle = document.querySelector("#sectionTitle");
const content = document.querySelector("#content");
const scoreGrid = document.querySelector("#scoreGrid");
const quickAddBtn = document.querySelector("#quickAddBtn");
const menuBtn = document.querySelector("#menuBtn");
const sidebar = document.querySelector(".sidebar");
const itemDialog = document.querySelector("#itemDialog");
const itemForm = document.querySelector("#itemForm");
const formFields = document.querySelector("#formFields");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogMode = document.querySelector("#dialogMode");
const toast = document.querySelector("#toast");

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(starterData);
  try {
    return { ...structuredClone(starterData), ...JSON.parse(saved) };
  } catch {
    return structuredClone(starterData);
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
}

function getSection(id = activeSection) {
  return sections.find((section) => section.id === id);
}

function render() {
  renderNav();
  renderScores();
  const section = getSection();
  sectionTitle.textContent = section.label;
  quickAddBtn.style.visibility = section.type === "dashboard" ? "hidden" : "visible";

  if (section.type === "dashboard") renderDashboard();
  if (section.type === "cards") renderCards(section);
  if (section.type === "kanban") renderKanban(section);
}

function renderNav() {
  navList.innerHTML = sections
    .map((section) => {
      const count = state[section.id]?.length ?? "";
      return `
        <button class="nav-item ${section.id === activeSection ? "active" : ""}" type="button" data-section="${section.id}">
          <span class="nav-icon">${section.icon}</span>
          <span>${section.label}</span>
          <span class="nav-count">${count}</span>
        </button>`;
    })
    .join("");
}

function renderScores() {
  const cards = [
    ["IAs", state.ais.length],
    ["Prompts", state.prompts.length],
    ["Nichos", state.niches.length],
    ["Pendencias", state.research.filter((item) => item.status !== "Concluido").length],
  ];
  scoreGrid.innerHTML = cards.map(([label, value]) => `<div class="score"><b>${value}</b><span>${label}</span></div>`).join("");
}

function renderDashboard() {
  const lastItems = sections
    .filter((section) => state[section.id]?.length)
    .map((section) => {
      const item = state[section.id][state[section.id].length - 1];
      return { section, item };
    });

  content.innerHTML = `
    <div class="tool-row">
      <button class="primary-action" type="button" data-jump="research">Registrar pesquisa</button>
      <button class="icon-text" type="button" data-jump="prompts">Ver prompts</button>
      <button class="icon-text" type="button" data-jump="niches">Avaliar nichos</button>
    </div>
    <div class="board">
      ${lastItems
        .map(({ section, item }) => `
          <article class="card">
            <div class="chip-row"><span class="chip">${section.label}</span></div>
            <h3>${escapeHtml(item.name || "Sem titulo")}</h3>
            <p>${escapeHtml(firstText(item))}</p>
            <div class="card-actions">
              <button class="mini-btn" type="button" data-section="${section.id}">Abrir area</button>
            </div>
          </article>`)
        .join("") || `<div class="empty-state">Comece adicionando IAs, prompts, links ou ideias.</div>`}
    </div>`;
}

function renderCards(section) {
  const items = state[section.id] || [];
  content.innerHTML = `
    <div class="tool-row">
      <input class="search-input" id="searchInput" type="search" placeholder="Buscar em ${section.label}">
      <button class="icon-text" type="button" id="copyTemplateBtn">Copiar modelo</button>
      <button class="primary-action" type="button" data-add="${section.id}">Adicionar</button>
    </div>
    <div class="board" id="cardBoard">${cardsHtml(section, items)}</div>`;

  document.querySelector("#searchInput").addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = items.filter((item) => JSON.stringify(item).toLowerCase().includes(query));
    document.querySelector("#cardBoard").innerHTML = cardsHtml(section, filtered);
  });
}

function cardsHtml(section, items) {
  if (!items.length) return `<div class="empty-state">Nada salvo aqui ainda. Toque em Adicionar.</div>`;
  return items.map((item, index) => cardHtml(section, item, index)).join("");
}

function cardHtml(section, item, index) {
  const chips = Object.entries(item)
    .filter(([key, value]) => key !== "name" && value && String(value).length < 28)
    .slice(0, 3)
    .map(([, value]) => `<span class="chip">${escapeHtml(value)}</span>`)
    .join("");
  return `
    <article class="card">
      <div class="chip-row">${chips}</div>
      <h3>${escapeHtml(item.name || "Sem titulo")}</h3>
      <p>${escapeHtml(firstText(item))}</p>
      ${item.link || item.source ? `<a class="chip" href="${escapeAttr(item.link || item.source)}" target="_blank" rel="noreferrer">Abrir link</a>` : ""}
      <div class="card-actions">
        <button class="mini-btn" type="button" data-edit="${section.id}:${index}">Editar</button>
        <button class="mini-btn delete-btn" type="button" data-delete="${section.id}:${index}">Excluir</button>
      </div>
    </article>`;
}

function renderKanban(section) {
  const lanes = ["Investigar", "Validar", "Concluido"];
  content.innerHTML = `
    <div class="tool-row">
      <input class="search-input" id="searchInput" type="search" placeholder="Buscar pesquisas">
      <button class="icon-text" type="button" id="copyTemplateBtn">Copiar modelo</button>
      <button class="primary-action" type="button" data-add="${section.id}">Adicionar</button>
    </div>
    <div class="kanban" id="kanbanBoard">
      ${lanes.map((lane) => laneHtml(section, lane, state[section.id])).join("")}
    </div>`;
}

function laneHtml(section, lane, items) {
  const laneItems = items.map((item, index) => ({ item, index })).filter(({ item }) => item.status === lane);
  return `
    <div class="lane">
      <h3>${lane}</h3>
      ${laneItems.map(({ item, index }) => cardHtml(section, item, index)).join("") || `<p class="empty-state">Sem itens.</p>`}
    </div>`;
}

function openDialog(sectionId, index = null) {
  const section = getSection(sectionId);
  editing = index === null ? { sectionId, index: null } : { sectionId, index };
  const item = index === null ? {} : state[sectionId][index];
  dialogMode.textContent = index === null ? "Novo item" : "Editando";
  dialogTitle.textContent = section.label;
  formFields.innerHTML = section.fields.map(([key, label, type, options]) => fieldHtml(key, label, type, options, item[key])).join("");
  itemDialog.showModal();
}

function fieldHtml(key, label, type, options, value = "") {
  if (type === "textarea") {
    return `<div class="field"><label for="${key}">${label}</label><textarea id="${key}" name="${key}">${escapeHtml(value)}</textarea></div>`;
  }
  if (type === "select") {
    return `<div class="field"><label for="${key}">${label}</label><select id="${key}" name="${key}">
      ${options.map((option) => `<option ${option === value ? "selected" : ""}>${option}</option>`).join("")}
    </select></div>`;
  }
  return `<div class="field"><label for="${key}">${label}</label><input id="${key}" name="${key}" type="${type}" value="${escapeAttr(value)}"></div>`;
}

function saveDialog() {
  const formData = new FormData(itemForm);
  const item = Object.fromEntries(formData.entries());
  const { sectionId, index } = editing;
  if (index === null) state[sectionId].push(item);
  else state[sectionId][index] = item;
  persist();
  showToast("Salvo");
}

function deleteItem(sectionId, index) {
  if (!confirm("Excluir este item?")) return;
  state[sectionId].splice(index, 1);
  persist();
  showToast("Excluido");
}

function copyTemplate() {
  const section = getSection();
  const lines = section.fields.map(([key, label]) => `${label}: [${key.toUpperCase()}]`);
  navigator.clipboard.writeText(lines.join("\n")).then(() => showToast("Modelo copiado"));
}

function firstText(item) {
  const value = Object.entries(item).find(([key, val]) => key !== "name" && val && String(val).length > 28);
  return value ? value[1] : "Abra para completar as informacoes.";
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1700);
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

function escapeAttr(value = "") {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

document.addEventListener("click", (event) => {
  const navButton = event.target.closest("[data-section]");
  const jumpButton = event.target.closest("[data-jump]");
  const addButton = event.target.closest("[data-add]");
  const editButton = event.target.closest("[data-edit]");
  const deleteButton = event.target.closest("[data-delete]");

  if (navButton) {
    activeSection = navButton.dataset.section;
    sidebar.classList.remove("open");
    render();
  }
  if (jumpButton) {
    activeSection = jumpButton.dataset.jump;
    render();
  }
  if (addButton) openDialog(addButton.dataset.add);
  if (editButton) {
    const [sectionId, index] = editButton.dataset.edit.split(":");
    openDialog(sectionId, Number(index));
  }
  if (deleteButton) {
    const [sectionId, index] = deleteButton.dataset.delete.split(":");
    deleteItem(sectionId, Number(index));
  }
});

quickAddBtn.addEventListener("click", () => openDialog(activeSection));
menuBtn.addEventListener("click", () => sidebar.classList.toggle("open"));

itemForm.addEventListener("submit", (event) => {
  if (event.submitter?.value === "cancel") return;
  event.preventDefault();
  saveDialog();
  itemDialog.close();
});

document.querySelector("#exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "backup-central-canal-dark.json";
  link.click();
  URL.revokeObjectURL(url);
});

document.querySelector("#importFile").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      state = { ...structuredClone(starterData), ...JSON.parse(reader.result) };
      persist();
      showToast("Backup importado");
    } catch {
      showToast("Arquivo invalido");
    }
  };
  reader.readAsText(file);
});

document.addEventListener("click", (event) => {
  if (event.target.id === "copyTemplateBtn") copyTemplate();
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

render();
