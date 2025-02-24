document.getElementById("del-confirma").addEventListener("click", async (id) => {

    const password = document.getElementById("passDelTask").value;
    const taskId = document.getElementById("idTask").value;
    try {
        const response = await fetch(`${url}/task/delete?id=${taskId}&password=${password}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        
        document.getElementById("aviso-deleta-task").style.display = "none";

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        location.reload()

    } catch (error) {
        console.log(error)
        document.getElementById("aviso-deleta-task").style.display = "block";
    }
})
