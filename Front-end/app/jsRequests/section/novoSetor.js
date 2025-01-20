document.getElementById("enviar-setor").addEventListener("click", async () => {
  const nome = document.getElementById("setor-nome");
  const password = document.getElementById("setor-pass");
  const usuario = JSON.parse(localStorage.getItem("usuario"));
 
  const data = {
    companyId: usuario.company.id,
    name: nome.value,
    passwordAuthorization: password.value
  }

  const limpaCampos = () => {
    nome.value = "";
    password.value = "";
  }

  try {
    const response = await fetch(`${url}/section/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });
    document.getElementById("aviso-novo-setor").style.display = "none"
    document.getElementById("aviso-novo-setor-nome").style.display = "none"
    if (!response.ok) {
      throw new Error(response);
    }

    location.reload();

  } catch (error) {

    if (data.passwordAuthorization == "" || data.name == "") {
      document.getElementById("aviso-novo-setor-nome").style.display = "flex"
    } else {
      document.getElementById("aviso-novo-setor").style.display = "flex"
    }
  }
})

