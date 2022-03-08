export default class Todolist 
{

    static index() {

        const localTodo = JSON.parse(localStorage.getItem('todolist'));
        const todoList = document.querySelector('.todo-list');
        const list = document.querySelector('.list');

        if( localTodo === null ) return;

        for (let i = 0; i < localTodo.length; i++) {
            
            let todo = localTodo[i];
            let template = list.cloneNode(true);
            let listText = template.querySelector('.list-text');
            let listDone = template.querySelector('.list-btn-check');
            let listDelete = template.querySelector('.list-btn-delete');

            template.classList.add('show');

            listText.innerText = todo;
            listText.id = i;
            listDone.id = i;
            listDelete.id = i;

            todoList.appendChild(template);
        }

    }

    static create() {
        const todoButton = document.querySelector('#todo-button');
        const todoInput = document.querySelector('#todo-input');
        todoInput.autocomplete = 'off';

        let localTodo = JSON.parse(localStorage.getItem('todolist'));
        let TODOLIST = [];

        const inputFilter = (item) => {
            if(item.value === '' || item.value == null || item.value.length > 45){
                return false;
            }
            return true;
        };

        const todoStore = (key, value) => {
            localStorage.setItem(key, JSON.stringify(value))
            window.location.reload();
        };

        todoButton.addEventListener('click', () => {

            if ( inputFilter(todoInput) === false) return;

            localTodo === null ? TODOLIST = [] : TODOLIST = localTodo;
            
            TODOLIST.push(todoInput.value);

            todoStore('todolist',TODOLIST);
        })
    }

    static delete() {
        const localTodo = JSON.parse(localStorage.getItem('todolist'));
        const list   = document.querySelectorAll('.list.show');
        const btnDone   = document.querySelectorAll('.list-btn-check');
        const btnDelete = document.querySelectorAll('.list-btn-delete');
        
        btnDone.forEach(done => {
            done.addEventListener('click', () => {
                for (let i = 0; i < localTodo.length; i++) {
                    list.forEach((listem, index) => {
                        if(index == i && done.id == i ){
                            listem.classList.toggle('done');
                        }
                    })
                }
            })
        })

        btnDelete.forEach(btnDel => {
            btnDel.addEventListener('click', () => {
                for (let i = 0; i < localTodo.length; i++) {
                    if(btnDel.id == i ){
                        localTodo.splice(localTodo.indexOf(localTodo[i]), 1)
                        localStorage.setItem("todolist", JSON.stringify(localTodo));
                        window.location.reload();
                    }
                }
            })
        })

    }

    static drop() {
        document.querySelector('.drop-list').addEventListener('click', () => {
            localStorage.removeItem('todolist');
            window.location.reload();
        })
    }

}