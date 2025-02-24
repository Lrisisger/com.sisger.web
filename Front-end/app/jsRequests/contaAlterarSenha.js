document.getElementById("change-password-confirm").addEventListener("click", async () => {
    const senhaAtual = document.getElementById("actPass");
    const novaSenha = document.getElementById("newPass");
    const novaSenhaconfirm = document.getElementById("confirNewPass");


    const displayError = () => {
        document.getElementById("aviso").innerHTML = "<span  class='aviso'>Preencha todos os campos</span>";
        document.getElementById("dark").style.display = "none";
    }

    const limparCampos = () => {
        senhaAtual.value = "";
        novaSenha.value = "";
        novaSenhaconfirm.value = "";
    }

    if (senhaAtual.value != "" && senhaAtual.value != null
        && novaSenha.value != "" && novaSenha.value != null
        && novaSenhaconfirm.value != "" && novaSenhaconfirm.value != null) {

        if (novaSenha.value == novaSenhaconfirm.value) {
            const data = {
                oldPassword: senhaAtual.value,
                newPassword: novaSenha.value
            }

            
            try {
                const response = await fetch(`${url}/user/change-password`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });


                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                document.getElementById("aviso").innerHTML = "<span style='margin:auto; margin-bottom: 0px; margin-top: 0px; color: #080;' class='aviso'> Senha alterada com sucesso </span>"
                document.getElementById("dark").style.display = "none";
                limparCampos()
            } catch (error) {
                console.log(error)
                document.getElementById("aviso").innerHTML = "<span  class='aviso'>Senha incorreta.</span>";
                document.getElementById("dark").style.display = "none";
                limparCampos()
            }

             
        } else {
            document.getElementById("aviso").innerHTML = "<span  class='aviso'>Nova senha nao confere</span>";
            document.getElementById("dark").style.display = "none";
            limparCampos()
        }

    } else {
        displayError()
        limparCampos()
    }





})