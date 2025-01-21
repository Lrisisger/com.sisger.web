const modalNewPart = document.querySelector('.modal-new-user');
const dark_screen = document.querySelector('.dark');
const cpfNew = document.getElementById('cpfNew');

const modalEditPart = document.querySelector('.modal-edit-user');

const newUser = () =>{

    let modal = modalNewPart;
   
    if(window.getComputedStyle (dark_screen).display == 'flex'){        

        
        const timer = setTimeout(()=>{                            
            dark_screen.style.opacity = 0;

            const timer_two = setTimeout(()=>{                         
                dark_screen.style.display = 'none';
                modal.style.display = 'none';

            }, 800)

        }, 100)       

        
    
    }else{
        dark_screen.style.display = 'flex';        
        dark_screen.style.opacity = 0;        
        modal.style.display = 'flex';    

        current_scroll = window.scrollY;
        const timer = setTimeout(()=>{         
            dark_screen.style.opacity = 1;          
        }, 50)

        
    }
}


