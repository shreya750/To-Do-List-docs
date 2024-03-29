
  function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }

//creates table for new list,takes input from user,for "addItem button"
function createTableforNewList(tableId){
    var table =document.getElementById(tableId);
    console.log("before adding item to table");
    for(let i = 1 ; i < document.getElementById(tableId).rows.length ;i++ ){
      console.log("value at index ", i, " is ", document.getElementById(tableId).rows[i].cells[1].children[0].value)
    }
    
    var rows=table.insertRow(0);
    var cell1=rows.insertCell(0);
    var cell2=rows.insertCell(1);
    var cell3=rows.insertCell(2);

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

    
    //var delStr = "<input type=\"button\" class = \"buttons\" value=\"Delete\" onclick=\"deleteRow(this)\"/>";
    var delStr = "<button type=\"button\" class=\"buttons\" onclick=\"deleteRow(this)\"> <span class=\"glyphicon glyphicon-trash\" ></span></button>"
    
    cell1.appendChild(chbox);
    cell2.appendChild(txt);
    cell3.innerHTML= delStr;
    table.appendChild(rows);

    chbox.style.marginLeft="40px";
    txt.style.marginRight="20px";
    //delStr.style.marginRight="5px";
    
    //console.log("after adding item to table");
    // for(let i = 1; i < document.getElementById(tableId).rows.length ;i++ ){
    //   console.log("value at index ", i, " is ", document.getElementById(tableId).rows[i].cells[1].children[0].value)
    // }
}


function todoItem(checkbox, description) {
    this.checkbox = checkbox;
    this.description = description;
  }

  function countRows(tableId){
    var countrow= document.getElementById(tableId).rows.length;
    return countrow;
}

  function getValues(tableId,calenderId,titleId){
    var todoList=[];
    
    for(let i=1;i<countRows(tableId);i++){
        var check=document.getElementById(tableId).rows[i].cells[0].children[0].checked;
        var textArea=document.getElementById(tableId).rows[i].cells[1].children[0].value;
      
         todoList.push( new todoItem(check,textArea))
    }
    var dateTime=document.getElementById(calenderId).value;
    console.log("time value",dateTime);
    var listTitle=document.getElementById(titleId).value;
    
    var finalValues={
        finalList:todoList, 
        time:dateTime,
        title:listTitle
    }
    var strigified=JSON.stringify(finalValues);
    console.log(strigified);
    return strigified
}


//COLLAPSIBLE 
function collapsible_cal(){
  var coll = document.getElementsByClassName("collapsible");
var i;
console.log("coll length",coll.length);
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
  
}
