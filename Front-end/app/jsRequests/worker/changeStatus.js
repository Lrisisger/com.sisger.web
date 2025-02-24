const finalizarTask = async (id) => {
    
    document.getElementById("dark-load").style.display = "flex";
    const data = {
        taskId: id,
        status: "FINISHED"
      }

    try {
        const response = await fetch(`${url}/task/change-status`, {
            method: 'PATCH', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

       

        if (!response.ok) {
            // Obter o corpo da resposta JSON contendo os detalhes do erro
            const errorData = await response.json();
            alert(errorData.details); // Exibe os detalhes no alert
            throw new Error(`Erro: ${errorData.details}`);            
        }

        location.reload()
    }catch(e){
        console.log(e)
        document.getElementById("dark-load").style.display = "none";
    }

}

const pausarTarefa = async (id) => {
    
    document.getElementById("dark-load").style.display = "flex";
    const data = {
        taskId: id,
        status: "PAUSED"
      }

    try {
        const response = await fetch(`${url}/task/change-status`, {
            method: 'PATCH', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

       

        if (!response.ok) {
            // Obter o corpo da resposta JSON contendo os detalhes do erro
            const errorData = await response.json();
            alert(errorData.details); // Exibe os detalhes no alert
            throw new Error(`Erro: ${errorData.details}`);            
        }

        location.reload()
    }catch(e){
        console.log(e)
        document.getElementById("dark-load").style.display = "none";
    }

}

const iniciarTarefa = async (id) => {
    
    document.getElementById("dark-load").style.display = "flex";
    const data = {
        taskId: id,
        status: "IN_PROGRESS"
      }

    try {
        const response = await fetch(`${url}/task/change-status`, {
            method: 'PATCH', // Método HTTP
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data),
        });

       

        if (!response.ok) {
            // Obter o corpo da resposta JSON contendo os detalhes do erro
            const errorData = await response.json();
            alert(errorData.details); // Exibe os detalhes no alert
            throw new Error(`Erro: ${errorData.details}`);            
        }

        location.reload()
    }catch(e){
        console.log(e)
        document.getElementById("dark-load").style.display = "none";
    }

}