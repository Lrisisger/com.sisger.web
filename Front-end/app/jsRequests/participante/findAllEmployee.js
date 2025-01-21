
function formatarCPF(cpf) {
    // Remove todos os caracteres que não são números
    cpf = cpf.replace(/\D/g, '');

    // Formata o CPF para o padrão XXX.XXX.XXX-XX
    if (cpf.length === 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    // Retorna o CPF original se não tiver 11 dígitos
    return cpf;
}

const fetchAllUsers = async () => {
    
    try {
        const response = await fetch(`${url}/user/find-all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        const data = await response.json()

        if (!response.ok) {
            if(response.status == 403){
                alert("Faça o login novamente")
            }
            throw new Error(`Erro: ${response.status}`);
        }

        

        const select = document.getElementById("container-part");


        select.innerHTML = "";


        data.forEach(u => {
            select.innerHTML += ` <div class="part">
                <div class="infos">
                <div class="name">${u.name}</div>
                <div class="cpf">${formatarCPF(u.cpf)} </div>
                </div>

                <div class="botoes">
                <a class="botao-edit" id="${u.id}" onclick="editUser(this.id)">Editar</a>
                <a class="botao-del"
                    id="${u.id}"
                    onclick="deleteUser(this.id)">Deletar</a>
                </div>

            </div>`;
        });


        document.getElementById("dark-load").style.display = "none";
    } catch (error) {
        console.log(error)
    }
}


fetchAllUsers();