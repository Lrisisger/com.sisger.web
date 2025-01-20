function delSet(id) {
    inputTokenSet = document.getElementById('tokenSet');
    if (window.getComputedStyle(dark_screen).display == 'flex') {


        const timer = setTimeout(() => {
            dark_screen.style.opacity = 0;

            const timer_two = setTimeout(() => {
                dark_screen.style.display = 'none';
                modalDelSet.style.display = 'none';

            }, 800)

        }, 100)



    } else {
        localStorage.setItem("idToDelete", id);
        dark_screen.style.display = 'flex';
        dark_screen.style.opacity = 0;
        modalDelSet.style.display = 'flex';

        current_scroll = window.scrollY;
        const timer = setTimeout(() => {
            dark_screen.style.opacity = 1;
        }, 50)


    }
}

document.getElementById("del-confirma").addEventListener("click", async () => {

    const data = {
        id: localStorage.getItem("idToDelete"),
        passwordAuthorization: document.getElementById("passDelSec").value
    }

    try {
        const response = await fetch(`${url}/section/delete`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });


        document.getElementById("aviso-deleta-setor").style.display = "none";

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        location.reload();

    } catch (error) {
        console.log(error)
        document.getElementById("passDelSec").value = "";
        document.getElementById("aviso-deleta-setor").style.display = "flex"

    }
})