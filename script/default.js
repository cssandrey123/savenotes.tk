window.onload = () => {
    // When page is loaded, create component for each existent note in localstorage
    // and display no-notes if there aren't any notes
    let keys = Object.keys(localStorage);
    if(keys.length == 0) {
        document.getElementById("no-notes-p").style.display = "block";
    }
    for(let key of keys){
        let note = JSON.parse(localStorage.getItem(key));
        createNote(note.title,note.message,key);
    }
    
}

function saveNote() {
    //get data from modal an create a date
    let ttle=document.getElementById("modal-note-title").value;
    let msg=document.getElementById("modal-note-message").value;
    // verify if both fields are written
    if(ttle=="" || msg==""){
        alert("Both fields needs to be completed");
    }
    else{
        let d = new Date();
        let cd = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

        //Save data to local storage
        let note = JSON.stringify({title:ttle,message:msg});
        localStorage.setItem(cd,note);
        console.log(JSON.parse(localStorage.getItem(cd)));

        // creating note component
        createNote(ttle,msg,cd);

        //set dysplay:none of no-notes paragraph in case this is the first note created
        document.getElementById("no-notes-p").style.display = "none";

        // Empty modal input/textarea values
        document.getElementById("modal-note-title").value = "";
        document.getElementById("modal-note-message").value = "";
    }
}

function createNote(title,message,date) {
    //DOM Nodes constraction
    let row = document.getElementById("notes-row");
    let colDiv = document.createElement("div");
    colDiv.className = "col-12 col-lg-6 p-3 bounce-in-animated bounceInUp position-relative";
    let note = document.createElement("div");
    note.className = "note";
    let noteHeader = document.createElement("div");
    noteHeader.className = "note-header";
    let noteTitle = document.createElement("div");
    noteTitle.className = "note-title d-inline-block";
    noteTitle.innerText = title;
    let deleteDiv = document.createElement("div");
    deleteDiv.className = "delete d-inline-block float-right";
    let deleteIcon  = document.createElement("i");
    deleteIcon.className = "fas fa-times";
    let noteDate = document.createElement("div");
    noteDate.className = "note-date";
    noteDate.innerHTML = date;
    let noteBody = document.createElement("div");
    noteBody.id = "noteBody";
    noteBody.className = "note-body";
    noteBody.innerText = message;
    
    //making Nodes connections
    row.append(colDiv);
    colDiv.append(note);
    note.append(noteHeader);
    note.append(noteBody);
    note.append(noteDate);
    noteHeader.append(noteTitle);
    noteHeader.append(deleteDiv);
    deleteDiv.append(deleteIcon);

    // Set butons events
    deleteIcon.addEventListener("click",() => {
        colDiv.classList.remove("bounce-in-animated", "bounceInUp");
        colDiv.classList.add("animated","bounceOutRight");
        setTimeout(() => {
            colDiv.remove();
            localStorage.removeItem(date);

            if(localStorage.length == 0)
                document.getElementById("no-notes-p").style.display = "block";
            },1500);
        });
   
}
