
var firebaseConfig = {
  apiKey: "AIzaSyBRUKmLcK0d0D8GXJeXqIKUfYXqXkgrKuo",
  authDomain: "kwitter-a1f38.firebaseapp.com",
  databaseURL: "https://kwitter-a1f38-default-rtdb.firebaseio.com",
  projectId: "kwitter-a1f38",
  storageBucket: "kwitter-a1f38.appspot.com",
  messagingSenderId: "719336135605",
  appId: "1:719336135605:web:5537501be3b1a9e8ee17fc"
};

firebase.initializeApp(firebaseConfig);
userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a)" + userName + "!";

function addRoom(){

  room_name =document.getElementById("roomName").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionando o nome da sala"
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

//pegando o nome das pastas do firebase
function getData() {
 
  firebase.database().ref("/").on('value', function(snapshoot)
    {document.getElementById("output").innerHTML = ""; snapshoot.forEach(function(childSnapshoot)
        { childKey = childSnapshoot.key;
      roomNames = childKey;
        
      console.log("Room Name - " + roomNames);
      row = "<div class='room_name' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      document.getElementById("output").innerHTML += row; //+= é quando pega o que tem e adiciona
    
    })
  });
}
getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("room_name", name);
    window.location ="kwitter_page.html";
}