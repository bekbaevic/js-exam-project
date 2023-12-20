//form elements
const inputTaskEl = document.querySelector("#input-task")
const inputDateEl = document.querySelector("#input-date")
const inputBtnEl = document.querySelector("#input-btn")

//items & container elements
const itemsEl = document.querySelector("#items")
const containerEl = document.querySelector("#container")

//date
let d = null
setInterval(() => {
    d = new Date()
}, 1000);

//modules date
let modules = [
    {
        id: 1,
        title: "Tasks",
        bgColor: "lightskyblue"
    },
    {
        id: 2,
        title: "Doing",
        bgColor: "rgb(248, 248, 198)"
    },
    {
        id: 3,
        title: "Completed",
        bgColor: "rgb(93, 224, 93)",
    }
]

//items date
let items = [
    {
        id: 1,
        name: 'First task',
        date: '2023-12-07',
        moduleId: 1,
    },
    {
        id: 3,
        name: 'Second task',
        date: '2023-12-07',
        moduleId: 2,
    },

]

//render modules
function renderModules(funcArray=[]) {
    containerEl.innerHTML = '';
    funcArray.map(item => {
        containerEl.innerHTML += `
            <div 
            ondragover = "event.preventDefault()"
            ondragenter = " (${item.id})"
            ondrop = "dragDrop(${item.id})"

            class="box"
            style="background-color: ${item.bgColor}" >
                <h1 class="title">${item.title}</h1>
                <div class="items" id="items-${item.id}">
                </div>
                
            </div>
            `
    })
    renderItems(items)

}

//render items
function renderItems(funcArray = []) {


    funcArray.map(item => {    
        document.querySelector(`#items-${item.moduleId}`).innerHTML += `
                <div 
                draggable="true"
                ondragstart="dragDropStart(${item.id})"
                ondragend="dragDropEnd()"
                class="item" 
                id="item-${item.id}">
                    <i class='bx bx-x delete-item' onclick="deleteItem(${item.id})"></i>
                    <h2 item-title>${item.name}</h2>
                    <p class="data-start">Start: ${item.date}</p>
                    <p class="data-end" id="itemEndTime-${item.id}">End: </p>
                    <div class="icons">
                        <div class="icon"><i class='bx bx-minus-circle'></i></div>
                        <div class="icon"><i class='bx bx-info-circle'></i></div>
                        <div id="completed" class="icon"><i class='bx bx-check-circle'></i></div>
                    </div>
                </div>                               
        `
    })
    setEndDate()
}

//set end date
function setEndDate() {
    items.map(item => {
        if(item.moduleId === 3) {
            document.querySelector(`#itemEndTime-${item.id}`).innerHTML += `${item.endDate}`
        }
    })
}

//delete item
function deleteItem(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            items = items.filter(item => item.id !== id)
            renderModules(modules)
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
      });
}

//add item
function addItem() {
    if(!inputTaskEl.value || !inputDateEl.value) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Enter the details completely!",
          });
    }else{
        let newItem = {
            id: Date.now(),
            name: inputTaskEl.value,
            date: inputDateEl.value,
            moduleId: 1,
        }
    
        items = [...items, newItem];
        renderModules(modules)
        Swal.fire({
            title: 'Task added succussfully ',
            icon: 'success',
        })
    }
    inputTaskEl.value = ''
    inputDateEl.value = ''

}
inputBtnEl.addEventListener("click", (event) => {
    event.preventDefault()
    addItem()
})


// Drag Drop functions 

let dragStartItemId = null
let dragEnteredModuleId = null


function dragDropStart(id) {
    dragStartItemId = id;
    setTimeout(() => {
        document.querySelector(`#item-${id}`).classList.add('hidden')
    }, 0);
}

function dragDropEnd() {
    document.querySelector(`#item-${dragStartItemId}`).classList.remove('hidden')

}

function dragEnter(moduleId){
    dragEnteredModuleId = moduleId;
}

function dragDrop(moduleId) {
    items = items.map(item => {
        if(item.id === dragStartItemId) {
            if(moduleId === 3) {
                return {
                    ...item,
                    moduleId: moduleId,
                    endDate: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}  ${d.getHours()}:${d.getMinu()}:${d.getSeconds()}`
                }
            }else {
                return {
                    ...item,
                    moduleId: moduleId,
                }
            }
        }else{
            return item
        }
    })
    console.log(items)
    renderModules(modules)
}

renderModules(modules)




