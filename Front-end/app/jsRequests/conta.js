
const handleFillInput = (result) =>{

    
    document.getElementById("email-input").value = result.email;
    if(result.role == "MAIN"){
        document.getElementById("cpf-input").value = result.company.cnpj;
        document.getElementById("name-input").value = result.company.name;
    }else{
        document.getElementById("cpf-input").value = result.cpf;
        document.getElementById("name-input").value = result.name;
    }
    

}


const fetchUser = async () =>{
    try {
        const response = await fetch(`${url}/user/find-user-logged`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
       
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
    
        

        const result = await response.json();
        handleFillInput(result);
    } catch (error) {
        console.log(error)
    }
}

fetchUser();