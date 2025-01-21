
const fetchWorkerAuth = async () => {
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
        if (result.role == "MAIN") {
            alert("Este usuario não pode ter atividades atribuidas")
            window.location.assign("./../adm/control.html");
        }
    } catch (error) {
        console.log(error)
        localStorage.clear();
        window.location.assign("./../geral/login.html");
    }
}

fetchWorkerAuth();