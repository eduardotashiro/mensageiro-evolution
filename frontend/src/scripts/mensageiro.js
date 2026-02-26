
function getToken() {
    return localStorage.getItem("token");
}
//se false, volta pro login!
if (!getToken()) {
    window.location.href = "login.html";
}


let selectedTemplate = null; 
let recipients = [];        
let allUsers = [];          
let allTemplates = [];       


async function init() {
    showUserName();
    await loadUsers();
    await loadTemplates();
}


function showUserName() {
    const payload = JSON.parse(atob(getToken().split('.')[1]));
    document.getElementById('user-name').textContent = `Olá, ${payload.name}`;
}

async function loadUsers() {
    const response = await fetch(`http://localhost:3000/api/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    const data = await response.json();
    allUsers = data.users;
    renderUserSelect();
}

function renderUserSelect() {
    const select = document.getElementById('user-select');
    select.innerHTML = '<option value="">Selecione um usuário...</option>';

    allUsers.forEach(user => {
        select.innerHTML += `<option value="${user.id}|${user.name}">${user.name} (${user.email})</option>`;
    });
}

async function loadTemplates() {
    const response = await fetch(`http://localhost:3000/api/templates`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        }
    });

    const data = await response.json();
    allTemplates = data.templates;
    renderTemplateList();
}

function renderTemplateList() {
    const list = document.getElementById('template-list');

    if (allTemplates.length === 0) {
        list.innerHTML = '<p style="color:#666; font-size:13px;">Nenhum template criado ainda.</p>';
        return;
    }

    list.innerHTML = allTemplates.map(t => `
        <div class="template-item" onclick="selectTemplate(this, '${t.id}', '${t.title}', \`${t.body}\`)">
            <h3>${t.title}</h3>
            <p>${t.subject}</p>
            <div class="template-actions">
                <button class="btn-edit" onclick="event.stopPropagation(); openEditModal('${t.id}', '${t.title}', '${t.subject}', \`${t.body}\`)">Editar</button>
                <button class="btn-delete" onclick="event.stopPropagation(); deleteTemplate('${t.id}')">Deletar</button>
            </div>
        </div>
    `).join('');
}

function selectTemplate(el, id, title, body) {
    document.querySelectorAll('.template-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');

    selectedTemplate = { id, title, body };
    document.getElementById('selected-template').value = title;
    document.getElementById('preview-box').textContent = body;
}

async function createTemplate() {
    const title = document.getElementById('modal-title').value;
    const subject = document.getElementById('modal-subject').value;
    const body = document.getElementById('modal-body').value;

    if (!title || !subject || !body) return alert('Preencha todos os campos!');

    const response = await fetch(`http://localhost:3000/api/templates`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({ title, subject, body })
    });

    const data = await response.json();
    if (data.error) return alert(data.error);

    closeModal();
    await loadTemplates(); 
}

function openEditModal(id, title, subject, body) {
    document.getElementById('modal-title').value = title;
    document.getElementById('modal-subject').value = subject;
    document.getElementById('modal-body').value = body;
    document.getElementById('modal-confirm-btn').textContent = 'Salvar';
    document.getElementById('modal-confirm-btn').onclick = () => updateTemplate(id);
    document.getElementById('modal-overlay').classList.add('active');
}

async function updateTemplate(id) {
    const title = document.getElementById('modal-title').value;
    const subject = document.getElementById('modal-subject').value;
    const body = document.getElementById('modal-body').value;

    const response = await fetch(`http://localhost:3000/api/templates/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({ title, subject, body })
    });

    const data = await response.json();
    if (data.error) return alert(data.error);

    closeModal();
    await loadTemplates(); 
}


async function deleteTemplate(id) {
    if (!confirm('Deseja deletar este template?')) return;

    await fetch(`http://localhost:3000/api/templates/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    });

    selectedTemplate = null;
    document.getElementById('selected-template').value = '';
    document.getElementById('preview-box').textContent = '';
    await loadTemplates();
}

function addRecipient() {
    const select = document.getElementById('user-select');
    const val = select.value;
    if (!val) return;

    const [id, name] = val.split('|');

    if (recipients.find(r => r.id === id)) {
        select.value = '';
        return;
    }

    recipients.push({ id, name });
    renderRecipients();
    select.value = '';
}

function removeRecipient(id) {
    recipients = recipients.filter(r => r.id !== id);
    renderRecipients();
}

// Mostra as tags dos destinatários selecionados abaixo do select
function renderRecipients() {
    const list = document.getElementById('recipients-list');
    list.innerHTML = recipients.map(r => `
        <div class="recipient-tag">
            ${r.name}
            <button onclick="removeRecipient('${r.id}')">×</button>
        </div>
    `).join('');
}


async function sendEmail() {
    if (!selectedTemplate) return alert('Selecione um template!');
    if (recipients.length === 0) return alert('Selecione ao menos um destinatário!');

    const response = await fetch(`http://localhost:3000/api/email/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`
        },
        body: JSON.stringify({
            templateId: selectedTemplate.id,
            recipientIds: recipients.map(r => r.id)
        })
    });

    const data = await response.json();
    if (data.error) return alert(data.error);

    const successMsg = document.getElementById('success-msg');
    successMsg.style.display = 'block';
    setTimeout(() => successMsg.style.display = 'none', 3000);

    recipients = [];
    renderRecipients();
}



function openModal() {
    document.getElementById('modal-title').value = '';
    document.getElementById('modal-subject').value = '';
    document.getElementById('modal-body').value = '';
    document.getElementById('modal-confirm-btn').textContent = 'Criar';
    document.getElementById('modal-confirm-btn').onclick = createTemplate;
    document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}


function logout() {
    localStorage.removeItem('token'); // remove o token do navegador
    window.location.href = 'login.html';
}

init();