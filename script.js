const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#guardar');
const subrayado='subrayado'
let id
let LIST


const FECHA = new Date ()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday: 'long', month: 'long', day:'numeric',year:'numeric'})


//Funcion agregar tarea
function agregarTarea(tarea,id,realizado,eliminado){
    if(eliminado){
        return
    }
const LINE= realizado?subrayado:''
      const elemento =`   
                             <li id="elemento">
                            <img src="cheque.png" width="25" height="25" data="realizado" id="${id}">
                              <p class="texto ${LINE} ">${tarea} </p>
                             <img src="borrar.png" width="25" height="25" data="eliminado" id="${id}">
                              </li>
                       `
 lista.insertAdjacentHTML('beforeend', elemento)
}


botonEnter.addEventListener('click',()=>{
    const tarea=input.value 
    if(tarea){
        agregarTarea(tarea,id,false,false)

    } 
    LIST.push({
        nombre : tarea,
        id : id,
        realizado : false,
        eliminado : false
    })
    localStorage.setItem('TODO',JSON.stringify(LIST))
    input.value=''
    id++
                                                                                   
})

document.addEventListener('keyup', function(event){
   
    if (event.key=='Enter') {
        const tarea=input.value 

        if(tarea){
            agregarTarea(tarea,id,false,false)
    
        } 
        LIST.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
        input.value=''
        id++
    }
   
})


lista.addEventListener('click',function(event){
               const element =event.target
               const elementData= element.attributes.data.value
               if(elementData == 'realizado') {
                tareaRealizada(element)
            }
            else if(elementData == 'eliminado') {
                tareaEliminada(element)
            }
            
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

function tareaRealizada(element) {

    element.parentNode.querySelector('.texto').classList.toggle(subrayado)
    LIST[element.id].realizado =true 
    
}
function tareaEliminada(element){

     element.parentNode.parentNode.removeChild(element.parentNode)
     LIST[element.id].eliminado = true
   
 }

 let data = localStorage.getItem('TODO')
if(data){
    //Conversion de json a un arreglo
    LIST = JSON.parse(data)
    console.log(LIST)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}