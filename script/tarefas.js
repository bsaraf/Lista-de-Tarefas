document.getElementById('add-task').addEventListener('click', function() {
    let task = document.getElementById('new-task').value.trim();
    let type = document.getElementById('task-type').value;

    if (task !== "") {
        adicionarTarefa(type, task);
        document.getElementById('new-task').value = ""; // Clear input after adding
    } else {
        alert('Por favor, adicione uma tarefa!');
    }
});

let tarefas = {
    pessoal: [],
    trabalho: [],
    urgente: []
};

function adicionarTarefa(categoria, descricao) {
    if (descricao) {
        const tarefa = {
            descricao,
            categoria
        };

        tarefas[categoria].push(tarefa);
        renderizarTarefas(categoria);
    }
}

function renderizarTarefas(categoria) {
    console.log(`caiu ${categoria}`);
    const listaTarefas = document.getElementById(`tarefas-${categoria}`);
    listaTarefas.innerHTML = '';
    tarefas[categoria].forEach((tarefa, index) => {
        const li = document.createElement('li');
        li.textContent = tarefa.descricao;

        const taskActions = document.createElement("div");
        taskActions.classList.add("task-actions");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.innerHTML = "✔"; // ícone de concluir
        botaoConcluir.addEventListener("click", () => {
            tarefa.concluida = !tarefa.concluida;
            li.classList.toggle("completed", tarefa.concluida);
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = "🗑️"; // ícone de excluir
        botaoExcluir.classList.add("delete");
        botaoExcluir.addEventListener("click", () => {
            tarefas[categoria].splice(index, 1);
            renderizarTarefas(categoria);
        });

        taskActions.appendChild(botaoConcluir);
        taskActions.appendChild(botaoExcluir);

        li.appendChild(taskActions);
        listaTarefas.appendChild(li);
    });
}

// Capturando os elementos de entrada e de seleção
const inputNovaTarefa = document.querySelector("#new-task");
const selectTipoTarefa = document.querySelector("#task-type");

// Capturando as listas de tarefas
const listaPessoal = document.getElementById("tarefas-pessoal");
const listaTrabalho = document.getElementById("tarefas-trabalho");
const listaUrgente = document.getElementById("tarefas-urgente");

// Adicionando a tarefa usando o botão ou pressionando "Enter"
inputNovaTarefa.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        adicionarTarefa(selectTipoTarefa.value, inputNovaTarefa.value.trim());
        inputNovaTarefa.value = "";
    }
});

document.getElementById('add-task').addEventListener("click", () => {
    adicionarTarefa(selectTipoTarefa.value, inputNovaTarefa.value.trim());
    inputNovaTarefa.value = "";
});
