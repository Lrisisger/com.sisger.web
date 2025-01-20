const fetchSection = async () => {

    try {
        const response = await fetch(`${url}/section/find-all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }


        const result = await response.json();
        result.map(sec => {
            containerSetor.innerHTML += `
                <div class="setor">
                    <div class="name">
                        ${sec.name}
                    </div>
        
                    <div class="botoes">
                        <a href="#" onclick="delSet(this.id)" id="${sec.id}" class="del">Deletar</a>
                        <a href="#" onclick="editSetor(this.id)" id="${sec.id}" class="edit">Editar</a>
                    </div>
                </div>`;
        }); 


    } catch (error) {
        console.log(error)
    }
}

const containerSetor = document.getElementById("set-container");
fetchSection()
