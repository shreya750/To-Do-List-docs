const masterBinID="5fbe9c76045eb86f1f872efb";
var binArray=[];
var tableIDarray=[];

//STORING SEPARATE BIN IDs FOR EACH TABLE
let binMap= new Map()
  
function updateContentforBin(eventId,calenderId,titleId){
    //console.log("save clicked");
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log(req.responseText);
        }
    };
        var binID=binMap.get(eventId);
        //console.log("updting bin ID",binID);
        req.open("PUT",`https://api.jsonbin.io/b/${binID}`,true);
        req.setRequestHeader("Content-Type","application/json");
        req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
        req.send(getValues(eventId,calenderId,titleId));
   
}

function deleteContent(titleId,eventId,calenderId){
    document.getElementById(calenderId).value=null;
    document.getElementById(titleId).value="";
    document.getElementById(eventId).value="";

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
    for(let i=0;i<parsed.eventsBinList.length;i++){
        binArray.push(parsed.eventsBinList[i].bin);
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
        var eventId = `event${j+1}`;
        var calenderId="calender"+ eventId.charAt(eventId.length-1);
        var titleId="title"+  eventId.charAt(eventId.length-1);
        console.log("cl id,title id",calenderId,titleId);
        //tableIDarray.push(tableId);
        binMap.set(eventId,binId);
        console.log(`generating table id ${eventId} for binId ${binId}`);
        readBinContentAndLoadTable(binId,eventId,calenderId,titleId,j+1);  
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

function readBinContentAndLoadTable(binId,eventId,calenderId,titleId,indexId) {
    let req=new XMLHttpRequest();
    console.log("readcontent called");
    req.onreadystatechange = () => {
        if(req.readyState == XMLHttpRequest.DONE){
            console.log("data from server",req.responseText);
            var parsed=JSON.parse(req.responseText);
           
        ///get respnse data of this bin id
        document.getElementById(eventId).value=parsed.location;
        document.getElementById(titleId).value=parsed.eventTitle;
        document.getElementById(calenderId).value=parsed.time;
        
        setEventTimer(parsed.time,indexId);
            return(req.responseText);
        }
    };
    
    req.open("GET",`https://api.jsonbin.io/b/${binId}/latest`,true);
    req.setRequestHeader("secret-key","$2b$10$2YIqY.HRw6Eg3CrHnUOQQOi2kAM1VC/.BHDisAClfkSGAZGfKtZGq");
    req.send();
}

function getValues(eventId,calenderId,titleId){
    //var todoList=[];
    
    var eventLocation=document.getElementById(eventId).value;
    var dateTime=document.getElementById(calenderId).value;
    //console.log("time value",dateTime);
    var title=document.getElementById(titleId).value;
    
    var finalValues={
        location:eventLocation, 
        time:dateTime,
        eventTitle:title
    }
    var strigified=JSON.stringify(finalValues);
    console.log(strigified);
    return strigified
}