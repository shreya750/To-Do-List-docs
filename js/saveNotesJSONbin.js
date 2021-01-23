const masterBinID="5fb7e8b302f80c2af523792e";
var binArray=[];
var tableIDarray=[];

//STORING SEPARATE BIN IDs FOR EACH TABLE
let binMap= new Map()
  
function updateContentforBin(noteId,calenderId,titleId){
    //console.log("save clicked");
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log(req.responseText);
        }
    };
        var binID=binMap.get(noteId);
        //console.log("updting bin ID",binID);
        req.open("PUT",`https://api.jsonbin.io/b/${binID}`,true);
        req.setRequestHeader("Content-Type","application/json");
        req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
        req.send(getValues(noteId,calenderId,titleId));
   
}

// function deleteContent(){
//     let req = new XMLHttpRequest();

//     req.onreadystatechange = () => {
//         if(req.readyState == XMLHttpRequest.DONE){
//             console.log(req.responseText);
//         }
//     };
//     req.open("DELETE",`https://api.jsonbin.io/b/${"12345678"}`,true);
//     req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
//     req.send();
// }
// function deleteRow(btn) {
//     var row = btn.parentNode.parentNode;
//     row.parentNode.removeChild(row);
//   }


//DELETE BUTTON FOR NOTES
function deleteContent(titleId,noteId,calenderId){
    document.getElementById(calenderId).value=null;
    document.getElementById(titleId).value="";
    document.getElementById(noteId).value="";

    console.log("contents deleted!");
}
  function insertTxtArea(txtbox,noteId){
    // console.log("create table called");
     var noteArea =document.getElementById(noteId);
     var txt= document.createElement("TEXTAREA");
     txt.value=txtbox;
     
//     var delStr = "<button type=\"button\" class = \"buttons\" onclick=\"deleteRow(this)\"> <span class=\"glyphicon glyphicon-trash\" ></span></button>"
 
 noteArea.appendChild(txt);
 }

 //master bin created to store separate bin IDs.
function displayMasterbinData(response){
    console.log("final response data: ",response);
    var parsed=JSON.parse(response);
    console.log("final parsed data: ",parsed);
    for(let i=0;i<parsed.notesBinList.length;i++){
        binArray.push(parsed.notesBinList[i].bin);
    }
    
    displayResponseData(binArray);
}

//run this code
//create  bins in finalList format
//read data from individual bin
function displayResponseData(binArray){
    var binId;

    for(let j=0;j<binArray.length;j++){
        binId = binArray[j];
        // create 3 table in 3 column with table id as todoTable1, todoTable2,todoTable3 
        var noteId = `note${j+1}`;
        var calenderId="calender"+ noteId.charAt(noteId.length-1);
        var titleId="title"+  noteId.charAt(noteId.length-1);
        console.log("cl id,title id",calenderId,titleId);
        //tableIDarray.push(tableId);
        binMap.set(noteId,binId);
        console.log(`generating table id ${noteId} for binId ${binId}`);
        readBinContentAndLoadTable(binId,noteId,calenderId,titleId);  
    }
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

function readBinContentAndLoadTable(binId,noteId,calenderId,titleId) {
    let req=new XMLHttpRequest();
    console.log("readcontent called");
    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log("data from server",req.responseText);
            var parsed=JSON.parse(req.responseText);
           
        ///get respnse data of this bin id
        document.getElementById(noteId).value=parsed.notesText;
        document.getElementById(titleId).value=parsed.title;
        document.getElementById(calenderId).value=parsed.time;
            return(req.responseText);
        }
    };
    
    req.open("GET",`https://api.jsonbin.io/b/${binId}/latest`,true);
    req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
    req.send();
}

function getValues(noteId,calenderId,titleId){
    //var todoList=[];
    
    var text=document.getElementById(noteId).value;
    var dateTime=document.getElementById(calenderId).value;
    //console.log("time value",dateTime);
    var listTitle=document.getElementById(titleId).value;
    
    var finalValues={
        notesText:text, 
        time:dateTime,
        title:listTitle
    }
    var strigified=JSON.stringify(finalValues);
    console.log(strigified);
    return strigified
}