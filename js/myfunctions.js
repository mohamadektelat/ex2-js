//----------------------------------------------------------------------------------------------------------------------
//To Do Class
class Todo {

    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.heightPriority = false;
    }

    isHeightPriority() { return this.heightPriority; }
    setHeightPriority() { this.heightPriority = true; }
    getTitle(){ return this.title; }
    getDescription() { return this.description;}
}

//----------------------------------------------------------------------------------------------------------------------
//Data structures that we used.
let todo_list = [];
let flag = false;

//----------------------------------------------------------------------------------------------------------------------
//To do List
let todoList = (function () {

    let List = {};

    //------------------------------------------------------------------------------------------------------------------
    //That function adds a new task to the list
    List.addTask = function () {
        alertBox.hide();
        let title = List.removeExtraWhiteSpaces(document.getElementById('TitleInput').value);
        let description = List.removeExtraWhiteSpaces(document.getElementById('description').value);
        if(validator.isEmpty(title)) {
            alertBox.show("please add a title.");
            return;
        }
        if(validator.alreadyExists(title)) {
            alertBox.show("title is already exists.");
            return;
        }
        if(validator.isEmpty(description)){
            alertBox.show("please add a description.");
            return;
        }
        let list = document.getElementById('taskList');
        let todo = new Todo(title, description);
        if(document.getElementById("flexCheckIndeterminate").checked)
            todo.setHeightPriority();
        let length = todo_list.push(todo);

        if(todo.isHeightPriority()) {
            list.innerHTML += "<li class='d-block list-group-item list-group-item-danger'>" + "<b>" + todo.getTitle() +
                "</b>" + "<br><p>" + todo.getDescription() + "</p></li>";
            List.addButton(length);
        }
        else {
            list.innerHTML += "<li class=\"list-group-item\">" + "<b>" + todo.getTitle() + "</b>" + "<br><p>" +
                todo.getDescription() + "</p></li>";
            List.addButton(length);
        }

    }

    //------------------------------------------------------------------------------------------------------------------
    //That function adds a button
    List.addButton = function(length){
        let list = document.getElementsByTagName("LI");
        let btn = document.createElement("button");
        btn.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
        btn.className = "btn btn-primary delete";
        btn.innerHTML = "delete";
        list[length-1].appendChild(btn);
    }

    //------------------------------------------------------------------------------------------------------------------
    //That function checks if the delete button clicked
    List.checkButton = function() {
        let list = document.getElementsByClassName("delete");
        let i;
        for (i = 0; i < list.length; i++) {

            list[i].onclick = function () {
                let div = this.parentElement;
                todo_list = todo_list.filter(obj =>{let b = !(obj.title === div.innerText.split("\n")[0]);
                                                    return b;});
                div.style.display = "none";
            }
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    //That function removes the extra white spaces
    List.removeExtraWhiteSpaces = function(str){
        return str.replace(/\s+/g,' ').trim();
    }

    //------------------------------------------------------------------------------------------------------------------
    //That function updates the web page according to the tasks that the user want to see.
    List.switchList = function(){
        alertBox.hide();
        document.getElementById('taskList').innerHTML = '';

        if(flag === false)
        {
            flag = true;
            document.getElementById('HeightPriority').innerText = "back";
            document.getElementById('high').innerText = "";
            document.getElementById('desc').innerText = "";
            document.getElementById('title').innerText = "";
            List.display("none");
            let c = 1;
            let i;
            for (i = 0 ; i<todo_list.length; i++) {
                if(todo_list[i].isHeightPriority())
                {
                    document.getElementById('taskList').innerHTML +=
                        "<li class='list-group-item list-group-item-danger'>" + "<b>"+todo_list[i].getTitle() + "</b>" +
                        "<br><p>" + todo_list[i].getDescription() + "</p></li>";
                    List.addButton(c);
                    c+=1;
                }
            }
            return;
        }

        else
        {
            flag = false;
            document.getElementById('HeightPriority').innerText = "Show High Priority";
            document.getElementById('high').innerText = "High Priority";
            document.getElementById('desc').innerText = "Description";
            document.getElementById('title').innerText = "Title";
            List.display("block")
            List.print();
            return;
        }
    }

    //------------------------------------------------------------------------------------------------------------------
    //That function sorts the list.
    List.Sort = function(){
        todo_list.sort(List.compare);
        document.getElementById('taskList').innerHTML = '';
        List.print();
    }

    //------------------------------------------------------------------------------------------------------------------
    //That function is a compare function , to sort the list.
    List.compare = function(a,b){
        if(a.title.toLowerCase() < b.title.toLowerCase())
            return -1;
        return 1;
    }

    //------------------------------------------------------------------------------------------------------------------
    //That function prints the tasks.
    List.print = function(){
        let c = 1;
        let i;
        for (i = 0; i < todo_list.length; i++) {
            if(todo_list[i].isHeightPriority())
            {
                document.getElementById('taskList').innerHTML +=
                    "<li class='list-group-item list-group-item-danger'>"+"<b>"+todo_list[i].getTitle() + "</b>" +
                    "<br><p>" + todo_list[i].getDescription() + "</p></li>"
                List.addButton(c);
                c+=1;
                continue;
            }
            document.getElementById('taskList').innerHTML += "<li class=\"list-group-item\">"+
                "<b>"+todo_list[i].getTitle() + "</b>" +"<br><p>" + todo_list[i].getDescription() + "</p></li>"
            List.addButton(c);
            c+=1;
        }

    }

    //------------------------------------------------------------------------------------------------------------------
    //That function updates the web page according to the str.
    List.display = function(str){
        document.getElementById('sortInput').style.display = str;
        document.getElementById('TitleInput').style.display = str;
        document.getElementById('description').style.display = str;
        document.getElementById('flexCheckIndeterminate').style.display = str;
        document.getElementById('add').style.display = str;
    }

    return List;

})();

//----------------------------------------------------------------------------------------------------------------------

