const editSetor = async (id) => {
    let modal = document.querySelector('.edit-set');


    if (window.getComputedStyle(dark_screen).display == 'flex') {


        const timer = setTimeout(() => {
            dark_screen.style.opacity = 0;

            const timer_two = setTimeout(() => {
                dark_screen.style.display = 'none';
                modal.style.display = 'none';
                document.getElementById("aviso-edita-setor-nome").style.display = "none";
                document.getElementById("aviso-edita-setor").style.display = "none";
                document.getElementById("senhaEdit").value = "";
            }, 800)

        }, 100)
    } else {

        try {
            const response = await fetch(`${url}/section/find-by-id/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }


            const result = await response.json();
            document.getElementById("nomeEdit").value = result.name;
            localStorage.setItem("sectionId", id);
        } catch (error) {
            console.log(error)
        }
        dark_screen.style.display = 'flex';
        dark_screen.style.opacity = 0;
        modal.style.display = 'flex';

        current_scroll = window.scrollY;
        const timer = setTimeout(() => {
            dark_screen.style.opacity = 1;
        }, 50)


    }
}

document.getElementById("editar-setor").addEventListener("click", async () => {

    const data = {
        id: localStorage.getItem("sectionId"),
        name: document.getElementById("nomeEdit").value,
        passwordAuthorization: document.getElementById("senhaEdit").value
    }

    console.log(data)
    try {
        const response = await fetch(`${url}/section/update`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        document.getElementById("aviso-edita-setor-nome").style.display = "none";
        document.getElementById("aviso-edita-setor").style.display = "none";
       
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        location.reload();

    } catch (error) {
        console.log(error)
        document.getElementById("senhaEdit").value = "";

        if (data.passwordAuthorization == "" || data.name == "") {
            document.getElementById("aviso-edita-setor-nome").style.display = "flex"
        } else {
            document.getElementById("aviso-edita-setor").style.display = "flex"
        }
    }

})


