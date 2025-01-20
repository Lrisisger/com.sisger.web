const dark_screen = document.querySelector('.dark');
const modalDel = document.getElementById('del-task');
const modalTask = document.querySelector('.modal-task')
let current_scroll = window.scrollY;



const delTask = () => {
    if (window.getComputedStyle(modalDel).display == 'flex') {

        modalTask.style.display = 'flex';
        modalDel.style.display = 'none';

    } else {
        modalDel.style.display = 'flex';
        modalTask.style.display = 'none';
        document.getElementById('passDelTask').value = "";
    }
}

addEventListener('scroll', () => {
    if (window.getComputedStyle(dark_screen).display == 'flex') {
        window.scrollTo({
            top: current_scroll,
            left: 0
        });
    }


})

const handleFieldTaskColor = (role) => {
    //LATE, IN_PROGRESS, PAUSED, NOT_INITIALIZED, FINISHED
    if (role == "FINISHED") {
        return 'task-finalizada';
    } else if (role == "NOT_INITIALIZED") {
        return 'task-naoIniciada';
    } else if (role == "IN_PROGRESS") {
        return 'task-emAndamento';
    } else if (role == "PAUSED") {
        return 'task-pausada';
    } else if (role == "LATE") {
        return 'task-atrasada';
    }

}

const handleImgFieldTaskColor = (role) => {
    if (role == "FINISHED") {
        return 'cor-finalizada';
    } else if (role == "NOT_INITIALIZED") {
        return 'cor-naoIniciada';
    } else if (role == "IN_PROGRESS") {
        return 'cor-emAndamento';
    } else if (role == "PAUSED") {
        return 'cor-pausada';
    } else if (role == "LATE") {
        return 'cor-atrasada';
    }
}

const handleImgStatus = (role) => {
    if (role == "FINISHED") {
        return '../../../public/img/icons/verified.svg';
    } else if (role == "NOT_INITIALIZED") {
        return '../../../public/img/icons/work.svg';
    } else if (role == "IN_PROGRESS") {
        return '../../../public/img/icons/update.svg';
    } else if (role == "PAUSED") {
        return '../../../public/img/icons/pause.svg';
    } else if (role == "LATE") {
        return '../../../public/img/icons/warning.svg';
    }
}

const handleMsgRole = (role) => {
    if (role == "FINISHED") {
        return 'Tarefa finalizada';
    } else if (role == "NOT_INITIALIZED") {
        return 'Tarefa não iniciada';
    } else if (role == "IN_PROGRESS") {
        return 'Tarefa em andamento';
    } else if (role == "PAUSED") {
        return 'Tarefa pausada';
    } else if (role == "LATE") {
        return 'Tarefa atrasada';
    }
}

function handleColor(role) {
    switch (role) {
        case "FINISHED":
            return 'cor-finalizada';
            break;

        case "NOT_INITIALIZED":
            return 'cor-naoIniciada';
            break;
        case "IN_PROGRESS":
            return 'cor-emAndamento';
            break;
        case "PAUSED":
            return 'cor-pausada';
            break;
        case "LATE":
            return 'cor-atrasada';
            break;

    }
}


const handleModalTask = async (id) => {


    if (window.getComputedStyle(dark_screen).display == 'flex') {

        const timer = setTimeout(() => {
            dark_screen.style.opacity = 0;
            fillTaskModal(false);
            const timer_two = setTimeout(() => {
                dark_screen.style.display = 'none';
                modalTask.style.display = 'none';

            }, 800)

        }, 100)


    } else {
        const taskInfo = await fetchTaskById(id)
        fillTaskModal(taskInfo);


        dark_screen.style.display = 'flex';
        dark_screen.style.opacity = 0;
        modalTask.style.display = 'flex';

        current_scroll = window.scrollY;
        const timer = setTimeout(() => {
            dark_screen.style.opacity = 1;
        }, 50)
    }
}

const fillTaskModal = (taskInfo) => {

    const titulo = document.getElementById('task-title-modal');
    const nome = document.getElementById('task-name');
    const dataInicial = document.getElementById('task-dataInicial');
    const dataFinal = document.getElementById('task-dataFinal');
    const status = document.getElementById('task-status');
    const descricao = document.getElementById('task-descricao');
    const mensagemHt = document.getElementById('task-mensagem');
    const containerCor = document.getElementById('container-title');
    const statusColor = document.getElementById('task-status');
    const formDelTask = document.getElementById('idTask');

    

    if (taskInfo != false) {
        titulo.innerHTML = taskInfo.title;
        nome.innerHTML = taskInfo.employee.name;
        dataInicial.innerHTML = formatDateToDDMMYYYY(taskInfo.initialDate);
        dataFinal.innerHTML = formatDateToDDMMYYYY(taskInfo.finalDate);
        status.innerHTML = handleMsgRole(taskInfo.status);
        descricao.innerHTML = taskInfo.description;
        mensagemHt.innerHTML = taskInfo.employeeMessage != null ? taskInfo.employeeMessage : "";
        formDelTask.value = taskInfo.id;


        containerCor.classList.add(handleColor(taskInfo.status));
        statusColor.classList.add(handleColor(taskInfo.status));
    } else {

        
        const timer_color = setTimeout(() => {
            containerCor.classList.remove('cor-finalizada');
            containerCor.classList.remove('cor-naoIniciada');
            containerCor.classList.remove('cor-emAndamento');
            containerCor.classList.remove('cor-pausada');
            containerCor.classList.remove('cor-atrasada');

            statusColor.classList.remove('cor-finalizada');
            statusColor.classList.remove('cor-naoIniciada');
            statusColor.classList.remove('cor-emAndamento');
            statusColor.classList.remove('cor-pausada');
            statusColor.classList.remove('cor-atrasada');


            titulo.innerHTML = '';
            nome.innerHTML = '';
            dataInicial.innerHTML = '';
            dataFinal.innerHTML = '';
            status.innerHTML = '';
            descricao.innerHTML = '';
            mensagemHt.innerHTML = '';

        }, 800)

    }
}

function formatDateToDDMMYYYY(dateString) {
    // Divida a string no formato "YYYY-MM-DD" em partes
    const [year, month, day] = dateString.split('-');
    
    // Retorne no formato DD/MM/YYYY
    return `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
}

