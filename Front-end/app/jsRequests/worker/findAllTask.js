/*      */


const shownTask = (t) => {

    function formatarData(dataISO) {
        // Divide a string da data em partes (ano, mês, dia)
        const [ano, mes, dia] = dataISO.split("-");

        // Retorna a data no formato dd/mm/aaaa
        return `${dia}/${mes}/${ano}`;
    }

    const main = document.getElementById("main");

    main.innerHTML += `<div class="cardTarefa">
                <div class="headTask ${handleImgFieldTaskColor(t.status)}">
                    <span class="titleTarefa">${t.title}</span>
                </div>
                <div class="body">
                    <form action="" method="post">
                        <div class="inputArea respon">
                            <label for="responsavel"></label>
                            <input type="text" name="responsavel" id="" value="${t.employee.name}" disabled>
                        </div>
                        <div class="inputArea prazo">
                            <label for="prazo">Prazo de entrega</label>
                            <div class="datas">
                                <input type="text" name="prazo" id="" value="${formatarData(t.initialDate)}" disabled>
                                <input type="text" name="prazo" id="" value="${formatarData(t.finalDate)}" disabled>
                            </div>
                        </div>
                        <div class="inputArea status">
                            <label for="status">Status</label>
                            <input class="${handleImgFieldTaskColor(t.status)}" type="text" name="status" id="" value="${handleMsgRole(t.status)}" disabled>
                        </div>
                        <div class="inputArea descricao">
                            <label for="descricao">Descrição</label>
                            <textarea name="descricao" style="resize: none" id="" disabled>${t.description}</textarea>
                        </div>
                        <div class="inputArea observ">
                            <label for="observacao">Observações</label>
                            <textarea name="observacao" style="resize: none" id="" disabled>${t.employeeMessage != null ? t.employeeMessage : ""}</textarea>
                        </div>
                        <div class="buttons" id="${t.id}">

                            
                        </div>
                    </form>
                </div>
            </div>`

    const containerB = document.getElementById(t.id);

    //VERIFICANDO QUAL O STATUS DA TAREFA, E EXIBINDO SUAS RESPECTIVAS AÇÕES 
    if (t.status == "LATE") {
        containerB.innerHTML = `<a onclick="finalizarTask('${t.id}')" class="button" type="submit">Finalizar</a>`;
    } else if (t.status == "PAUSED") {
        containerB.innerHTML = `<a onclick="iniciarTarefa('${t.id}')" class="button" type="submit">Retomar</a>
            <a onclick="finalizarTask('${t.id}')" class="button" type="submit">Finalizar</a>`;
    } else if (t.status == "IN_PROGRESS") {
        containerB.innerHTML = `<a onclick="pausarTarefa('${t.id}')" class="button" type="submit">Pausar</a>
            <a onclick="finalizarTask('${t.id}')" class="button" type="submit">Finalizar</a>`;
    } else if (t.status == "NOT_INITIALIZED") {
        containerB.innerHTML = `<a onclick="iniciarTarefa('${t.id}')" class="button" type="submit">Iniciar</a>`;
    }


}

const fetchAllTasks = async () => {
    document.getElementById("dark-load").style.display = "flex";
    const userId = localStorage.getItem("userId")

    try {
        const response = await fetch(`${url}/task/find-by-user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const result = await response.json();
        document.getElementById("main").innerHTML = ""
        result.forEach(t => {
            shownTask(t);
        });

        document.getElementById("dark-load").style.display = "none";
    } catch (error) {
        console.log(error)
    }
}

fetchAllTasks()