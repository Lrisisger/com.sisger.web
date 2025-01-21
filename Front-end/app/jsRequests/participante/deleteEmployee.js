const deleteUser = (id) =>{

    localStorage.setItem("userDelete", id);

    let modal = document.getElementById("del-set");
    if (window.getComputedStyle(dark_screen).display == 'flex') {



        const timer = setTimeout(() => {
            dark_screen.style.opacity = 0;

            const timer_two = setTimeout(() => {
                dark_screen.style.display = 'none';
                modal.style.display = 'none';

            }, 800)

        }, 100)



    } else {
        
        dark_screen.style.display = 'flex';
        dark_screen.style.opacity = 0;
        modal.style.display = 'flex';
        current_scroll = window.scrollY;
        const timer = setTimeout(() => {
            dark_screen.style.opacity = 1;
        }, 50)

        document.getElementById("dark-load").style.display = "none";

    }
}

document.getElementById("del-confirma").addEventListener("click", async () =>{

    document.getElementById("dark-load").style.display = "flex";
    const password = document.getElementById("passDelUser").value;
    const userId = localStorage.getItem("userDelete");

    const data = {
        id: userId,
        passwordAuthorization: password
    }
    try {
        const response = await fetch(`${url}/user/delete`, {
            method: 'DELETE',
            headers: {                
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        
        document.getElementById("aviso-deleta-setor").style.display = "none";

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        location.reload()

    } catch (error) {
        console.log(error)
        document.getElementById("aviso-deleta-setor").style.display = "block";
        document.getElementById("dark-load").style.display = "none";
    }

})