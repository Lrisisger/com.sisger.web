const editUser = async (id) => {
    localStorage.setItem("userEdit", id)

    let modal = modalEditPart;
    const nameEdit = document.getElementById('nomeEdit');
    const emailEdit = document.getElementById('emailEdit');
    const cpfEdit = document.getElementById('cpfEdit');
    const isAdmEdit = document.getElementById('isAdmEdit');
    if (window.getComputedStyle(dark_screen).display == 'flex') {



        const timer = setTimeout(() => {
            dark_screen.style.opacity = 0;

            const timer_two = setTimeout(() => {
                dark_screen.style.display = 'none';
                modal.style.display = 'none';

            }, 800)

        }, 100)



    } else {
        document.getElementById("dark-load").style.display = "flex";
        try {
            const response = await fetch(`${url}/user/find-user-id/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                alert("Problemas no servidor, consulte o suporte")
            }

            const data = await response.json();
            nameEdit.value = data.name;
            emailEdit.value = data.email;
            cpfEdit.value = formatarCPF(data.cpf)
            if (data.role == "MANAGER") {
                isAdmEdit.innerHTML = "";
                isAdmEdit.innerHTML = `
                <option value="0" selected>Administrador</option>
                <option value="2">Colaborador</option>`
            } else if (data.role == "EMPLOYEE") {
                isAdmEdit.innerHTML = "";
                isAdmEdit.innerHTML = `
                <option value="1" >Administrador</option>
                <option value="2" selected>Colaborador</option>`
            }

        } catch (e) {
            location.reload()
        }

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

document.getElementById("enviar-edit").addEventListener("click", async () => {
    document.getElementById("dark-load").style.display = "flex";
    const id = localStorage.getItem("userEdit");

    const nameEdit = document.getElementById('nomeEdit');
    const emailEdit = document.getElementById('emailEdit');
    const cpfEdit = document.getElementById('cpfEdit');
    const isAdmEdit = document.getElementById('isAdmEdit');
    const senhaAdm = document.getElementById("senhaAdm");

    const handleRole = (role) => {
        if(role == 1){
            return "MANAGER"
        }else if (role == 2){
            return "EMPLOYEE"
        }
    }

    const data = {
        id: id,
        name: nameEdit.value,
        email: emailEdit.value,
        passwordAuthorization:senhaAdm.value,
        cpf:  removeSpecialCharacters(cpfEdit.value),
        role: handleRole(isAdmEdit.value)
      }

      
    try {
        const response = await fetch(`${url}/user/update-user`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            if(errorData.fieldsMessage != null){
                alert(errorData.fieldsMessage); 
            }else{
                alert(errorData.details); 
            }
            throw new Error(`Erro: ${errorData.details}`);
        }

        alert(`Os dados foram alterados com sucesso!`);
        location.reload();
        

    } catch (e) {
        console.log(e)
        location.reload();
    }
})

function removeSpecialCharacters(cpf) {
    return cpf.replace(/\D/g, '');
}

