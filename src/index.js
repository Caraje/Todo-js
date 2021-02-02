// Para importar funciones de otros archivos Js usamos Import
// entre llaves llamamos a la funcion que deseamos importar y tras from, la ruta donde se encuentra el archivo JS que contiene esa funcion.
// para que esto funcione, es necesario instalar Webpack


import './styles.css';
import { crearTodoHtml, saludar } from './js/componentes.js';
import {Todo, TodoList } from './class';

export const todoList = new TodoList();

todoList.todos.forEach( todo => crearTodoHtml(todo) );




// const tarea = new Todo('Aprender JavasCript');
// todoList.nuevoTodo(tarea);

// console.log(todoList);
// crearTodoHtml(tarea)

// localStorage.setItem('mi-key', 'ABC123');


// setTimeout( () => {
//     localStorage.removeItem('mi-key');
// }, 1500)


// const newTodo = new Todo('ejemplo');
// todoList.nuevoTodo(newTodo);
// todoList.todos[2].imprimirClase()


// console.log('todos', todoList.todos);