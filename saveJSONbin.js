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


function updateContentforBin(tableId){
    //console.log("save clicked");
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log(req.responseText);
        }
    };
        var binID=binMap.get(tableId);
        console.log("updting bin ID",binID);
        req.open("PUT",`https://api.jsonbin.io/b/${binID}`,true);
        req.setRequestHeader("Content-Type","application/json");
        req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
        req.send(getValues(tableId));
   
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
    //strike-through can be added to texts only. txt.value me style property add honi chahiye
//console.log("getting txts frm server!",des);

    var chbox=document.createElement("INPUT");
    chbox.setAttribute("type","checkbox");
    chbox.value=checkbox;
    console.log("getting checks frm server!",chbox.value);
    
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
   
    // else {
    //     //console.log("2 checked");

    //     txt.style.textDecoration="none";
    // }
    var delStr = "<input type=\"button\" class = \"buttons\" value=\"Delete\" onclick=\"deleteRow(this)\"/>";
    cell3.innerHTML= delStr;

cell1.appendChild(chbox);
cell2.appendChild(txt);
cell3.innerHTML=delStr;
table.appendChild(rows);

}

//master bin created to store separate bin IDs.
function displayMasterbinData(response){
    var parsed=JSON.parse(response);
    for(let i=0;i<parsed.todobinList.length;i++){
        binArray.push(parsed.todobinList[i].bin);
        
    }
    
    displayResponseData(binArray);
}
//run this code
//create baby bins in finalList format
//read data from individual bin
function displayResponseData(binArray){
    var binId;

    for(let j=0;j<binArray.length;j++){
        binId = binArray[j];
        // create 3 table in 3 column with table id as todoTable1, todoTable2,todoTable3 
        var tableId = `todoTable${j+1}`;
        tableIDarray.push(tableId);
        binMap.set(tableId,binId);
        console.log(`generating table id ${tableId} for binId ${binId}`);
        readBinContentAndLoadTable(binId,tableId);  
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

function readBinContentAndLoadTable(binId,tableId) {
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
            console.log("valueofdes,checkbox is ",txtbox,checkbox,i);
            insertRowInTable(txtbox,checkbox, tableId);
        }
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

//https://www.w3schools.com/js/js_json_html.asp    --for displaying JSON

// obj = { table: "customers", limit: 20 };
// dbParam = JSON.stringify(obj);
// xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     myObj = JSON.parse(this.responseText);
//     txt += "<table border='1'>"
//     for (x in myObj) {
//       txt += "<tr><td>" + myObj[x].name + "</td></tr>";
//     }
//     txt += "</table>"
//     document.getElementById("demo").innerHTML = txt;
//   }
// }
// xmlhttp.open("POST", "json_demo_db_post.php", true);
// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// xmlhttp.send("x=" + dbParam);


