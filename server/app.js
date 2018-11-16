// app.js
let koa = require("koa");

let app = new koa();

let routes = require("koa-route");
let parse = require("co-body");
let serve = require("koa-static");

app.use(serve("dist"));

let createTodoList = function () {
    return [
        {id: 1, description: "Buy more beer"},
        {id: 2, description: "Order pizza"},
        {id: 3, description: "Eat pie"},
        {id: 4, description: "Watch TV"},
        {id: 5, description: "Sleep"}
    ];
};
let todoList = [];

function getTodoList() {
    if (todoList.length === 0) {
        todoList = createTodoList();
    }
    return todoList;
}


function onTodoList() {
    this.body = getTodoList();
}


app.use(routes.get("/todoList", onTodoList));

function deleteTodo({todoId}) {
    console.log('del todo ', todoId);
    for (let i = 0, t = todoList.length; i < t; i++) {
        if (todoList[i].id === parseInt(todoId)) {
            todoList.splice(i, 1);
            break;
        }
    }
}

async function onDeleteTodo() {
    deleteTodo(await parse(this));
    this.body = {
        ret: 0
    };
}

app.use(routes.del("/deleteTodo/", onDeleteTodo));

function saveTodo(data) {
    let {description} = data;
    let id = Math.round(Math.random() * 999) + 1;
    todoList.push({
        id,
        description
    });
}

async function onSaveTodo() {
    saveTodo(await parse(this));
    this.body = {
        ret: 0
    };
}

app.use(routes.post("/saveTodo", onSaveTodo));

module.exports = app;
