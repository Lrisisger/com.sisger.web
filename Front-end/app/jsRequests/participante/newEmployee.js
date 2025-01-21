document.getElementById("enviar-novo-employee").addEventListener("click", async () => {

    document.getElementById("dark-load").style.display = "flex";

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const cpf = document.getElementById("cpfNew");
    const role = document.getElementById("role");
    const senha = document.getElementById("pass");
    const confirmaSenha = document.getElementById("confirmPass");

    if (senha.value != confirmaSenha.value) {
        alert("Senhas devem ser iguais!");
        document.getElementById("dark-load").style.display = "none";
        return;
    }
    

    const data = {
        name: nome.value,
        email: email.value,
        password: senha.value,
        cpf: removeSpecialCharacters(cpf.value),
        role: role.value
    }
    console.log(data)
    try {

        

        const response = await fetch(`${url}/user/new-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });


        if (!response.ok) {
            // Obter o corpo da resposta JSON contendo os detalhes do erro
            const errorData = await response.json();
            alert(errorData.fieldsMessage); // Exibe os detalhes no alert
            throw new Error(`Erro: ${errorData.fieldsMessage}`);
        }

        location.reload();

    } catch (error) {
        document.getElementById("dark-load").style.display = "none";
        console.log(error)
      
    }



})