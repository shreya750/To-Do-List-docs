//this file is not in use

function getToDoListData() {
  console.log("attempting to fetch data from internet");
      getDataFromInternet(); 
  }

  function getDataFromInternet(){    
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          //console.log(req.responseText);
          setDataInBox(req.responseText);
        }
      };
      
      req.open("GET", "https://api.jsonbin.io/b/5f7714807243cd7e8248c8a4/latest", true);
      req.setRequestHeader("secret-key", "$2b$10$fY9DOYHO2/nUI4.K/TtdBeNgPixFrjqwn3/0A.FVfByYnymkGa.0S");
      req.send();
  }

  function setDataInBox(responseText){
    var jsonResponse = JSON.parse(responseText);
    //var datestr = "2014-11-14T18:28:37";
    console.log("i got this data to set");
    console.log(responseText);
    for( let i = 0; i<jsonResponse.length; i++){
      document.getElementById("title1").value = jsonResponse[i].title;
      document.getElementById("textbox1").innerHTML = jsonResponse[i].description;
      document.getElementById("calender1").value = jsonResponse[i].dateTime;
      if(jsonResponse[i].completed){
        // DO something to strike through the title and description
      }

      break;
    }
    
  }



