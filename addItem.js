
function addItem(){
    var table =document.getElementById("mytable");
    var rows=table.insertRow(0)
    var cell1=rows.insertCell(0);
    var cell2=rows.insertCell(1);

    var txt= document.createElement("TEXTAREA");
    txt.setAttribute("placeholder","add item");
    
    
    var chbox=document.createElement("INPUT");
    chbox.setAttribute("type","checkbox");
    chbox.addEventListener("change",function(){
        if(this.checked){ //check syntax
            console.log("checked");
            txt.style.textDecoration="line-through";
        }
        else {
            txt.style.textDecoration="none";
        }
    });

    cell1.appendChild(chbox);
    cell2.appendChild(txt);
    table.appendChild(rows);
    
   
    
    
    
     //txt.addEventListener("keyup",striketxt());
    
   
}


function todoItem(checkbox, description) {
    this.checkbox = checkbox;
    this.description = description;
  }

  function countRows(){
    var countrow= document.getElementById("mytable").rows.length;
    return countrow;
}

  function getValues(){
    var todoList=[];
    for(let i=2;i<countRows()-1;i++){
        var check=document.getElementById("mytable").rows[i].cells[0].children[0].checked;
        var textArea=document.getElementById("mytable").rows[i].cells[1].children[0].value;
         todoList.push( new todoItem(check,textArea))
    }
    var dateTime=document.getElementById("calender1").value;
    
    var finalValues={
        finalList:todoList, 
        time:dateTime
    }
    var strigified=JSON.stringify(finalValues);
    console.log(strigified);
    return strigified
}

  
// function getValues(){
//     var todoList= [
//         new todoItem(true,'coding'),
//         new todoItem(false,'travelling')
//     ]
//     var dateTime="Oct30th";
//     var finalValues={
//         finalList:todoList, 
//         time:dateTime
//     }
//     var strigified=JSON.stringify(finalValues);
//     console.log(strigified);
//     return strigified
// }

