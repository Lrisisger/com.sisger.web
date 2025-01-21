
const fetchManagerAuth = async () => {
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
        if (result.role == "EMPLOYEE") {
            alert("Usuario não possui autorização para acessar essa area")
            window.location.assign("./../worker/control_colabora.html");
        }
    } catch (error) {
        console.log(error)
        localStorage.clear();
        window.location.assign("./../geral/login.html");
    }
}

fetchManagerAuth();