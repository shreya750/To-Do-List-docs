const masterBinID="5fa954d42769cc5b06ad3adb";
var binArray=[];
var tableIDarray=[];

//STORING SEPARATE BIN IDs FOR EACH TABLE
let binMap= new Map()
    

    function createBin(){
    let req= new XMLHttpRequest ();

req.onreadystatechange = () => {
    if(req.readyState == XMLHttpRequest.DONE){
        console.log(req.responseText);
    }
};

req.open("POST","https://api.jsonbin.io/b", true);
req.setRequestHeader("Content-Type","application/json");
req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
req.send(getValues());

}


function updateContentforBin(tableId,calenderId,titleId){
    //console.log("save clicked");
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log(req.responseText);
        }
    };
        var binID=binMap.get(tableId);
        //console.log("updting bin ID",binID);
        req.open("PUT",`https://api.jsonbin.io/b/${binID}`,true);
        req.setRequestHeader("Content-Type","application/json");
        req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
        req.send(getValues(tableId,calenderId,titleId));
   
}

function deleteContent(){
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log(req.responseText);
        }
    };
    req.open("DELETE",`https://api.jsonbin.io/b/${"12345678"}`,true);
    req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
    req.send();
}
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
  }



function insertRowInTable(txtbox,checkbox, tableId){
   // console.log("create table called");
    var table =document.getElementById(tableId);
    var rows=table.insertRow(0);
    var cell1=rows.insertCell(0);
    var cell2=rows.insertCell(1);
    var cell3=rows.insertCell(2);

    var txt= document.createElement("TEXTAREA");
    txt.value=txtbox;
    //var des=txt.value;
   
    var chbox=document.createElement("INPUT");
    chbox.setAttribute("type","checkbox");
    chbox.value=checkbox;
   
    //console.log("getting checks frm server!",chbox.value);
    
    chbox.addEventListener("change",function(){
        if(this.checked){ //check syntax
            console.log("checked");
            txt.style.textDecoration="line-through";
            chbox.checked=true;
        }
        else {
            txt.style.textDecoration="none";
        }
    });
    
    
    if(chbox.value =='true'){
        console.log("checked");
        txt.style.textDecoration="line-through";
        chbox.checked=true;
    }
   
  //<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path><path d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path><path d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path></svg>
    //var delStr = "<input type=\"button\" class = \"buttons\" value=\"delete\" onclick=\"deleteRow(this)\"/>";
    var delStr = "<button type=\"button\" class = \"buttons\" onclick=\"deleteRow(this)\"> <span class=\"glyphicon glyphicon-trash\" ></span></button>"

    cell3.innerHTML= delStr;

cell1.appendChild(chbox);
cell2.appendChild(txt);
cell3.innerHTML=delStr;
table.appendChild(rows);
chbox.style.marginLeft="40px";
txt.style.marginRight="20px";
//delStr.style.marginRight="5px";

}

//master bin created to store separate bin IDs.
function displayMasterbinData(response){
    console.log("final response data: ",response);
    var parsed=JSON.parse(response);
    console.log("final parsed data: ",parsed);
    for(let i=0;i<parsed.todobinList.length;i++){
        binArray.push(parsed.todobinList[i].bin);
    }
    
    displayResponseData(binArray);
}
//run this code
//create bins in finalList format
//read data from individual bin
function displayResponseData(binArray){
    var binId;

    for(let j=0;j<binArray.length;j++){
        binId = binArray[j];
        // create 3 table in 3 column with table id as todoTable1, todoTable2,todoTable3 
        var tableId = `todoTable${j+1}`;
        var calenderId="calender"+ tableId.charAt(tableId.length-1);
        var titleId="title"+ tableId.charAt(tableId.length-1);
        console.log("cl id,title id",calenderId,titleId);
        tableIDarray.push(tableId);
        binMap.set(tableId,binId);
        console.log(`generating table id ${tableId} for binId ${binId}`);
        readBinContentAndLoadTable(binId,tableId,calenderId,titleId);  
    }
     

}

function deleteList(btn){
    var delList=btn.parentNode.parentNode;
    delList.parentNode.removeChild(delList);
}

function readMasterBinContent() {
    let req=new XMLHttpRequest();
    console.log("readcontent called");
    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log(req.responseText);
            displayMasterbinData(req.responseText);
        }
    };

    req.open("GET",`https://api.jsonbin.io/b/${masterBinID}/latest`,true);
    req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
    req.send();
}

function readBinContentAndLoadTable(binId,tableId,calenderId,titleId) {
    let req=new XMLHttpRequest();
    console.log("readcontent called");
    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log("data from server",req.responseText);
            var parsed=JSON.parse(req.responseText);
           
        ///get respnse data of this bin id
        for(let i=0;i<parsed.finalList.length;i++){
            var txtbox=parsed.finalList[i].description;
            var checkbox=parsed.finalList[i].checkbox;
            //console.log("valueofdes,checkbox is ",txtbox,checkbox,i);
            insertRowInTable(txtbox,checkbox, tableId);
        }
        document.getElementById(titleId).value=parsed.title;
        document.getElementById(calenderId).value=parsed.time;
        
        //document.getElementById("mytable").deleteRow(1);   
        if(parsed.finalList.length  === 0){
            insertRowInTable("",false,tableId);// to add one empty "addItem" box
        }  
        
            return(req.responseText);
        }
    };
    
    req.open("GET",`https://api.jsonbin.io/b/${binId}/latest`,true);
    req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
    req.send();
}


