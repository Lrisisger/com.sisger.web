
const inputCnpj = document.getElementById('cnpj');

inputCnpj.addEventListener("input", function () {
 
  const value = this.value.replace(/\D/g, "");


  if (value.length === 14) {
    this.value = value.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  }
  else {
    this.value = value;
  }
});

inputCnpj.addEventListener("blur", function () {
  this.dispatchEvent(new Event("input"));
});

function removeSpecialCharacters(cpf) {
  return cpf.replace(/\D/g, '');
}

document.getElementById("enviar-novo-user").addEventListener("click", async()=>{

  const nomeEmpresaInput = document.getElementById('nome-empresa').value;
  const nomeGestorInput = document.getElementById('nome-gestor').value;
  const emailInput = document.getElementById('email').value;
  const inputCnpj = document.getElementById('cnpj').value;
  const senhaInput = document.getElementById('pass').value;
  const confirmarSenhaInput = document.getElementById('confirmPass').value;

  if(senhaInput != confirmarSenhaInput){
    alert("Senhas não conferem")
    location.reload()
  }

  const data = {
    name: nomeGestorInput,
    email: emailInput,
    password: senhaInput,
    company: {
      name: nomeEmpresaInput,
      cnpj: removeSpecialCharacters(inputCnpj)
    }
  }
  console.log(data)
  try {
    const response = await fetch(`${url}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
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

    document.getElementById("popup").style.display = "flex";

  } catch (error) {

   console.log(error)
  }
})




