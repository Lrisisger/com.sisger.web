//<option value='<?= $usuario->getId() ?>'><?=$usuario->getName()?></option>

const fetchAllUsers = async () => {
    try {
        const response = await fetch(`${url}/user/find-all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });




        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json()

        const select = document.getElementById("select-employees");


        select.innerHTML = "";


        data.forEach(u => {
            select.innerHTML += `<option value='${u.id}'>${u.name}</option>`;
        });


    } catch (error) {
        console.log(error)
    }
}

const handleModalNewTask = (token) => {
    const modalNTask = document.querySelector('.modal-new-task')



    if (window.getComputedStyle(dark_screen).display == 'flex') {

        const timer = setTimeout(() => {
            dark_screen.style.opacity = 0;

            const timer_two = setTimeout(() => {
                dark_screen.style.display = 'none';
                modalNTask.style.display = 'none';

            }, 800)

        }, 100)


    } else {
        fetchAllUsers();
        document.getElementById("tokenSetor").value = token
        dark_screen.style.display = 'flex';
        dark_screen.style.opacity = 0;
        modalNTask.style.display = 'flex';

        current_scroll = window.scrollY;
        const timer = setTimeout(() => {
            dark_screen.style.opacity = 1;
        }, 50)
    }
}

document.getElementById("adicionar").addEventListener("click", async () => {

    document.getElementById("dark-load").style.display = "flex";
    const select = document.getElementById("select-employees");
    const titulo = document.getElementById("task-title");
    const initialDate = document.getElementById("initial-date");
    const finalDate = document.getElementById("final-date");
    const descricao = document.getElementById("description");
    const sectionId = document.getElementById("tokenSetor");

    const data = {
        title: titulo.value,
        description: descricao.value,
        initialDate: initialDate.value,
        finalDate: finalDate.value,
        userId: select.value,
        sectionId: sectionId.value
    }
    
    setTimeout(async () => {
        try {
            const response = await fetch(`${url}/task/create`, {
                method: 'POST', // Método HTTP
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                // Obter o corpo da resposta JSON contendo os detalhes do erro
                const errorData = await response.json();
                alert(errorData.details); // Exibe os detalhes no alert
                throw new Error(`Erro: ${errorData.details}`);
            }

            // Obter a resposta como JSON
            const result = await response.json();
            location.reload();
        } catch (error) {
            console.error('Erro ao fazer a requisição:', error);
            document.getElementById('dark-load').style.display= 'none';
        }
    }, 1000);

})
