function saveContent(){
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

//count rows of todo table
//textarea and checkbox values

