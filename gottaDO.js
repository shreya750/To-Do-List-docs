function getToDoListData() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
          console.log(req.responseText);
        }
      };
      
      req.open("GET", "https://api.jsonbin.io/b/<BIN_ID>", true);
      req.setRequestHeader("secret-key", "<SECRET_KEY>");
      req.send();
      console.log(req.responseText);
      var responseText = JSON.parse(req.responseText);
  }

  function setDataInBox(responseText){
    document.getElementById("statusMessage").innerHTML = response1.statusMessage;

  }



