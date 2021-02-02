# Notas sobre el proyecto Todo en Javascript


# Importaciones
Para evitar llenar el archivo "index.js" de la carpeta raiz de lineas con importaciones, vamos a crear un archivo central para importar desde otros archivos, y que este sea el unico que se importe en el "index.js" de la carpeta raiz.

El archivo estara almacenado en la carpeta class que esta situada en el "src"  y tambien llevara de nombre, index.js.
En el de la carpeta raiz lo importamos con el siguiente codigo.

````
import {X } from './class';
````
X se refiere a los elementos que deseamos importar de todos los archivos. siempre separados por una coma.

En el archivo index.js donde centralizaermos todas las importaciones, ademas exportamos todas con el siguiente codigo.
````
export {
    x, 
    y
}
````
donde X e Y son referencias a los elementos que deseamos exportar de las importaciones.



# 01 Clase para las tareas

En nuestra aplicacion, buscamos que cuando escribamos algo en el cuadro de texto del HTML, este deje reflejada una tarea pendiente por hacer.
para eso vamos a crear una clase, que contenga toda la informacion que debe contener cada una de estas tareas. 
En un nuevo archivo, creamos una clase, con la palabra reservada "export", ya que este codigo, lo exportaremos a un archivo central de Javascript en la carpeta base de nuestro proyecto, llamado Index.js.

Alli, llamaremos a este archivo con la palabra reservada import, poniendo entre llaves, "Todo" ya que es la clase que deseamos importar seguido de from y la ruta en donde se encuentra el archivo.


```
import { Todo } from './class/todo.class.js';

```


En nuestro archivo todo.class.js, crearemos la clase con el siguiente codigo.

```
 export class Todo {
    constructor(tareaArg) {
        this.tarea = tareaArg; 
        this.id = new Date().getTime();
        this.completado = false; 
        this.creado = new Date();
    }
 }
```

Dentro del constructor, definimos la tarea, que es donde se guardara el nombre de la tarea que escribiremos.
el Id de la tarea que se lo daremos con el metodo "new Date()" para que asi se le asocie en funcion de cuando se crea.
Completado, sera el campo que guardara si nuestra tarea esta completada o no, de base figura como que NO esta completada.
y creado, le damos un "new Date()" con la fecha en el que se fue creado.

Luego cuando importemos esta clase en el archivo, "index.js" crearemos una  nueva tarea de manera manual, para comprobar que funcione con el siguiente codigo.

```
const tarea = new Todo('aprender JavasCript');

```

# 02 Clase para manejar los Todos, creados.

Necesitamos centralizar una clase, donde incluiremos el codigo necesario para manejar cada una de las clases que iremos creando.
creamos la clase llamda "TodoList()" que contendra un arreglo vacio con los "todos" en el consturctor
a continuacion crearemos los metodos necesarios para manejar las opciones de los Todos:
    nuevoTodo(): con la que añadiremos los nuevos "todos" al arreglo vacio.
    EliminarTodo(): con el que le espicificaremos el metodo para que se puedan eliminar Todos por separado.
    marcarCompletado(): con el que le diremos que hacer con los todos Completados.
    eliminarTodo(): un metodo creado para eliminar toda la lista de los "todos" completados.



# 03 Crear los elementos HTML.

Necesitamos que nuestra lista de tareas sea visible en nuestro Html, para eso necesitamos crear una forma en la que por cada
tarea creada, nos genere un nuevo elemento en la lista.


Es importente que al inicio de nuestro archivo "componentes.js", definamos el QuereySelector, del div donde insertaremos el codigo.

Nos vamos a nuestro archivo "componentes.js" situado dentro de la carpeta "Js" y en el vamos a crear una funcion que 
se encargue de lo que deseamos hacer.

Esta funcion se llama "crearHtml()" y recibira los valores de la clase creada "todo" del archivo "todo.class.js" 
Creamos una constante con el codigo de una lista ordenada (un "li"), que contiene como saldra nuestro codigo.

En este codigo, debemos hacer que compruebe si la tarea esta marcada o no como completada, por eso en la clase, y con backtics, le colocaremos un operador ternario, donde comprobara si la propiedad "completado" del "Todo" devuelve un true o un false, en casoi de ser true, le diremos que escriba que la clase se llama "completed" y en caso de no estarlo
le diremos que deje un string vacio.

Ademas le diremos que añada la id del elemento que hemos creado, para eso le diremos que compruebe la propiedad "id" de la clase "todo"

y repetimos la misma operacion en el apartado correspoendiente del Checkbox.


Ahora necesitamos que Javascript, nos cree ese codigo HTMl, esto lo haremos inicializando una variable llamada "div"
que contenga el metodo "createElement()" y que nos cree un Div nuevo.
le decimos uqe lo inserte en el HTML con un "innerHTML, al que le decimos que tiene el valor del codigo que escribimos entre backtics.
Y finalmente le decimos que lo cree en un div, al final del que contega la classe "todo-list" en el HTML
OJO le decimos que lo cree en el primer elemento hijo con un ".firstElementChild" ya que no queremos que genere nuevos divs por cada vez que añadamos una nueva tarea.

El codigo de esto quedaria asi 


```
const divTodoList = document.querySelector('.todo-list');


export const crearTodoHtml = (todo) => {
 const htmlTodo = `	
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
    return div.firstElementChild;


}


```


# 04 crear un nuevo Todo desde el HTML

En nuestro siguiente paso, vamos a hacer que al escribir en el HTML una nueva tarea, esta sea integrada en la lista 
de tareas pendientes.

Lo primero que necesitamos hacer es inicializar una variable con un " querySelector" que nos lleve al cuadro donde 
escribiremos nuestro texto.


```
const txtInput = document.querySelector('.new-todo');
```

Nuestro siguiente paso consiste en crear un nuevo evento de escucha (eventListener) que reciba la pulsacion de nuestro teclado.
dentro de la funcion del EventListener, decimos que reciba el argumento "Event" que sera el objeto con el que trabajaremos.

Ahora para comprobar cuando se pulsa la tecla que deseamos que añada la tarea, creamos un "if"
debemos saber cual es el "keyCode" de la tecla "enter" para ello podemos usar un "console.log" que reciba el "event"
asi sabremos que se trata del 13.

En el "if" le decimos tambien, que comprueba que no se envia ningun string vacio, para eso usamos el ".length" dentro del "txtInput.value"

si todo esta correcto, inicializamos una nueva variable, que cree un "new Todo" con el valor del texto que escribimos
con "txtInput.value"
le decimos que ejecute la fucnion "nuevoTodo" que definimos anteriormente en el archivo de "todo.class.js", para almacenar el todo nuevo.
Le decimos que ejecute la funcion "crearTodoHtml(nuevoTodo)" para que lo escriba en pantalla el valor descrito en la variable nuevoTodo inicializada en este "eventListener"

Para cerrar, debemos borrar el texto escrito cuando se añade a la lista, simplemente, tomamos la variable de "txtInput.value" y la igualamos a un string vacio.


# 05 Arcar como completadas las tareas
Queremos que al marcar en la casilla del checkbox de nuestra tarea, esta se tache y pase a estar completada.
Bien para eso volvemos a trabajar en el archivo "todo-list.class.js" donde tenemos nuestros metodos y trabajamos con el llamado "marcarCompletado()"

En su interior le colocamos un ciclo for, ya que nos interesa que revise las tareas que hay en nuestro html, 
dentro del ciclo for, lanzamos un "if" donde le decimos, que si el "todo.id" es igual a la id del seleccionado, 
entonces su valor sea el contrario
y cerramos el if con un "Break".

Ahora en el archivo "componenetes.js" debemos crear un nuevo "addeventListener" que reaccione al click del raton
inicializamos una variable para que al hacer click, nos diga que tipo de etiqueta de html estamos presionando con el raton
iniciamos otra variable que nos diga a que elemento del HTML corresponde 
y por ultimo una ultima variable, que coja el id creado en la tarea con un "getAttribute()" que nos conduca al "data.id"

A continuacion le decimos como proceder una vez tengamos los datos necesarios, y lo hacemos on un "if" 
le preguntamos si la variable "nombreElemento" tiene un "input" (lo hacemos con el metodo "includes"), entonces
active la funcion "marcarCompletado()" con el valor del Id de "todoId", y cambie la classe con el metodo ".toggle" a completado.

Esto nos hace que cuando reconozca que le damos al checkbox, tache y marque como completada o al reves una de las tareas 
que tenemos en nuestr aaplicacion.



# 06 eliminar tareas


En esta ocasion lo que necesitamos es que cuando presionemos sobre la X de la tarea, esta sea eliminada completamente de nuestra aplicacion.
Para esto lo primero que debemos hacer es ir al archivo donde definimos las funciones para las clases, "todo-list.class.js"
Y en la funcion o metodo de "eliminarTodo" vamos a usar el metodo de "filter()" 
le decimos que nos cree un nuevo arreglo excluyendo los elementos que coincidan con ese Id.


```
       this.todos = this.todos.filter(todo => todo.id != id )
```

Ahora en el archivo de "componentes.js", vamos a decir que debe hacer para eliminar la tarea.
en el mismo "eventlistener" creado para marcar como seleccionado una tarea, le vamos a añadir un 
"else if", que si al hacer click en el boton (el de la X)  va a activar la funcion "eliminarTodo()" con el ID seleccionado en "todoId"
A continuacion le decimos que borre todo el elemento con "divTodoList.removeChild" haciendo que sea eliminado de nuestra lista.


# 07 eliminar los completados.

ahora queremos que al presionar sobre el boton de borrar completados, todas las tareas que estas completadas, simplemente 
se borren.

lo primero es trabajar en nuestro archivo "todo-list-class.js" en el metodo "eliminarCompletados()"
haremos algo similar a lo que hicimos en el paso anterior, usaremos el metodo "filter()" para que nos devuelva un nuevo arreglo, con los objetos que no sean igual a "todo.completados"

y nos vamos a trabajar en el archivo "componentes.js.

inicializamos el boton con una variable y un "querySelector" haciendo referencia a la clase "button"
y creamos un nuevo AddEventListener, que responda al Click del raton. 
Al activar el evento le decimos que haga un ciclo "for" que revise todos los objetos del arreglo que recibimos de "eliminarCompletados()" que definimos en el archivo "todo-list.class.js"
 repetira el ciclo, hasta que tenga menos o igual de elementos, que el largo del arreglo.
 y crearemos un if, donde le decimos que en el caso de haber elementos en el arreglo que cumplan con las condiciones, en este caso que contengan la clase "completed", para esto usaremos el metodo, "contains" y entre parentesis, la clase que bucamos.
 y todos los que tengan la clase "completed", sean eliminados del htmo con el metodo "removeChild"

 
# 08 Local Storage y Session Storage

Son dos sistemas para guardar informacion en nuestro navegador, la diferencia es que en "session Storage" esta informacion 
desaparece una vez recargamos la pagina o cerramos el navegador.
mientras que "local Storage" guarda esa informacion durante mas tiempo, aun cuando cerremos el navegador o incluso reiniciemos el ordenador.

** la informacion almacenada la podemos ver en las herramientas de desarrollo del navegador, en la pestalla application, seccion Storage.  en google chrome.

** OJO!!! esta informacion es visible para el usuario y no se recomienda que se use para guardar claves e informacion sensible.

Para imprimir valores en el Local storage, usaremos: 
    "localStorage.setItem('nombre del valor', 'valor')
Hay que tener en cuenta que esto solo acepta Strings, ni numbres, ni booleanos, nada mas que strings.


Para borrar elementos del local storage usaremos: 

    "localStorage.removeItem('nombre del valor'); 


# 09 Guardando y cargando la informacion de las tareas.

Guardando informacion: 
Vamos a usar el "LocaStorage" para almacenar la informacion, para ello, vamos a crear una nueva funcion en la clase del archivo 
"todo-list.class.js" llamada "guardarLocalStorage()", 
Como necesitamos que cree un nuevo elemento usaremos el metodo setItem y dentro de su parentesis le diremos que 
el nombre de este arreglo se llamara "todo" y los valores sera una cadena de Strings, convertidas con "JSON"
Pasaremos el "this.todos" por un "JSON.stringify" y eso hara que todos los datos se conviertan en un string.
el codigo resultaria asi: 

```
        localStorage.setItem('todo', JSON.stringify(this.todos))
```

Ahora es solo cuestion de llamar esta funcion en las funciones de : 
    nuevoTodo();
    eliminarTodo();
    marcarcarCompletado();
    eliminarCompletados();
o dicho de otro modo, alla donde necesitamos que al hacer una variacion de nuestras tareas, guarde la informacion.



Cargar informacion: 

Ahora necesitamos que esa informacion guardada sea visible para nuestro navegador, para ello crearemos una nueva funcion en nuestra clase del archivo "todo-list.class.js" llamada "cargarLocalStorage().
En ella crearemos un "if" donde le preguntaremos si existe algun item con el nombre "todo" con el metodo ".getItem()"
En el caso de que si exsita, le diremos que lo cargue usando de nuevo "JSON", con el metodo ".parse" y entre parentesis
el mismo codigo que se combrueba en el "if"
y en caso de no existir, le decimos que inicialice un objeto vacio con "[]"

Esta funcion, debemos hacer que reemplace en el constructor al "this.todos = []", ya que esta funcion ya se encarga de crear el objeto vacio.
```
            if(localStorage.getItem('todo')){
            this.todos = JSON.parse( localStorage.getItem('todo')) ;
            console.log('cargar Local: ', this.todos);
            console.log(typeof this.todos);
        } else {
            this.todos = [];
        }

```
O en operador ternario 
```        
this.todos = (localStorage.getItem('todo'))
           ? JSON.parse( localStorage.getItem('todo')) 
           :[];

```


Ya para acabar, solo necesitamos que en nuestro archivo "index.js" inicialice esta accion, para ello creamos un "forEach" del crearTodoHtml.


```
    todoList.todos.forEach( todo => crearTodoHtml(todo) );

```



# 10 reconstruir instancias

Al pasar neustras tareas por el Json, para que estos se conviertan en strings y luego recuperarlos, 
sucede que nuesros objetos, pierden todas sus instancias, por lo que en caso de necesitarlas haremos este procedimiento.

En el archivo donde definimos nuestras clases, en "todo.class.js", creamos un metodo estatico llamado "fromJson()"
en sus argumentos le pedimos una destructuracion de objetos (el argumento seria "obj") y le pedimos el "id, tarea, completado y creado", 
dentro de este metodo inicializamos una constante llamada "tempTodo" y le decimos que es un "new Todo(tarea").
definimos las propiedades y retornamos el valor de "tempTodo"

```
        static fromJson({id, tarea, completado, creado}){
        const tempTodo = new Todo(tarea);
        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;

```


A continuacion os vamos al archivo "todo-list.class.js" y en el metodo "ccargarLocalStorage()" le añadimos una nueva linea de codigo.
y le decimos que "this.todos" es igual al this.todos.map. del objeto creado con "fromJason()"

** el metodo ".map" se usa para hacer un mapeado de todas las propiedades de un objeto.


# 11 filtros

Lo que vamos a hacer en este momento, es aplicar unos filtros a nuestras tareas, para que solo se muestren si son completados, pendientes o todos.

Lo primero es sacar una referencia de "QuereySlecctor" a la clase donde estarian estos botones que queremos asociar a los filtros y otra para que podemos aplicar un efecto al boton que esta seleccionado.

y en el archivo "componentes.js" crearemos un nuevo "eventListener" que reaccione al click del raton

inicializamos una variable para que al pinchar sobre los botones nos de el valor del nombre del boton, 
y le hacemos un "if" donde le decimos que si no tiene filtro, nos lo regrese.

tras el "if, hacemos un "forEach" que nos recorra todos los resultados, diciendole que elimine la clase "selected" en caso de tenerla.
S
Luego abrimos un ciclo "for of" donde le diremos que remueva siempre la etiqueta de clase "hidden", 

e inicializamos una variable "completado" que sea igual a los resultados que contengan la clase "completed"

Ahora abrimos un "Switch" dentro del "for of" dandole las diferentes opciones
le decimos que si al presionar el boton "pendientes" las tareas que tengan la clase competada, se les añada una la clase "hidden"
y en segundo caso le decimos que si al presionar el boton completado, las tareas que no tienen la clase completada, entonces seran estas a las que le añadiremos la clase "hidden"

de esta manera ya tendremos la manera de que al presionar los pertienentes botones, se nos muestren unas u otras tareas.

# 12 subir a github


