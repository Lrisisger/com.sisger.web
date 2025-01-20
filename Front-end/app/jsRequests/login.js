const loginActionButton = document.getElementById("login-action");


loginActionButton.addEventListener("click", async () =>{
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("senha")
    const data = {
        email: emailField.value,
        password: passwordField.value
    }
   
    console.log(data)
    try {
        const response = await fetch(`${url}/auth/login`, {
          method: 'POST', // Método HTTP
          headers: {
            'Content-Type': 'application/json', // Tipo de conteúdo
          },
          body: JSON.stringify(data), // Converter os dados para JSON
        });
    
        // Verificar se a requisição foi bem-sucedida
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
    
        // Obter a resposta como JSON
        const result = await response.json();
        console.log(result)
        localStorage.setItem("token", JSON.stringify(result.token));

        const reponseUser = await fetch(`${url}/user/find-user-logged`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${result.token}`
          }
        }); 

        if (!reponseUser.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
    
        // Obter a resposta como JSON
        const resultUser = await reponseUser.json();
        localStorage.setItem("usuario", JSON.stringify(resultUser));
   

        window.location.assign("../adm/control.html");
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        document.getElementById("aviso-login").innerHTML = "<span id='aviso'>Email ou senha incorreto, tente novamente</span>"
      }
})