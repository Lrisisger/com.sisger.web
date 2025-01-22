
const fetchUserAuth = async () =>{
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
        localStorage.setItem("userId", result.id);
    } catch (error) {
        console.log(error)
        localStorage.clear();
        window.location.assign("./../geral/login.html");
    }
}
const token = JSON.parse(localStorage.getItem("token"));

if(token == null || token == ""){
    window.location.assign("./../geral/login.html");
}

fetchUserAuth();



