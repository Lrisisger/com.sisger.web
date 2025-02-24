const fetchTaskBySection = async (id) => {

    try {
        const response = await fetch(`${url}/task/find-by-section/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const result = await response.json();

        result.map(task => {
            document.getElementById(id).innerHTML += ` <div id="${task.id}" class="task ${handleFieldTaskColor(task.status)}" onclick="handleModalTask(this.id)">
            <span>
                ${task.title}
            </span>
    
            <div class="container-img ${handleImgFieldTaskColor(task.status)}">
                <img src="${handleImgStatus(task.status)}" alt="">
            </div>
            </div>
            `
        })




    } catch (error) {
        console.log(error)
    }
}

const fetchTaskById = async (id) => {

    try {
        const response = await fetch(`${url}/task/find-by-id/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const result = await response.json();

        return result;

    } catch (error) {
        console.log(error)
    }
}


const fetchSection = async () => {

    try {
        const responseSec = await fetch(`${url}/section/find-all`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!responseSec.ok) {
            throw new Error(`Erro: ${responseSec.status}`);
        }

        const result = await responseSec.json();

        if (result.length == 0) {
            document.getElementById("container-inst").style.display = "block";
        } else {
            result.map(sec => {
                document.getElementById("sector").innerHTML += `<div class="sec">
                        <div class="sec-head">
                            <h2>${sec.name}</h2>
                        </div>
    
                        <div class="content" id="${sec.id}">
    
                               
                            
                        </div>
    
                        <div class="add-act" onclick="handleModalNewTask(this.id)" id="${sec.id}">
                            <img src="../../../public/img//icons/plus.svg" alt="">
                        </div>
    
                    </div>`
            });
        }



        for (const sec of result) {
            fetchTaskBySection(sec.id);
        }



    } catch (error) {
        console.log(error)
    }
}

const containerSetor = document.getElementById("set-container");
fetchSection()
