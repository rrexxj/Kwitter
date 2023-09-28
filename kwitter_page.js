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

var nome = localStorage.getItem("userName");
var sala = localStorage.getItem("room_name");

function logout()
{
    localStorage.removeItem("userName");
    localStorage.removeItem("room_name");
    window.location = "index.html"
}

function voltar()
{
    window.location = "kwitterRoom.html"
}

function sendMensage()
{
    msg = document.getElementById("msg").value;
    firebase.database().ref(sala).push
    ({
        name:nome,
        message:msg,
        like:0
    });
    document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+sala).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebaseMessageId = childKey;
    messageData = childData;
//Início do código
    console.log(firebaseMessageId);
    console.log(messageData);
    name = messageData['name'];
    message = messageData['message'];
    like = messageData['like'];
    nameWithTag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
    messageWithTag = "<h4 class = 'message_h4'>" + message + "</h4>";
    likeButton = "<button class = 'btn btn-warning' id = " + firebaseMessageId + " value = " + like + " onclick = 'updateLike(this.id)'>";
    spanWithTag = "<span class = 'glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";

    row = nameWithTag + messageWithTag + likeButton + spanWithTag;
    document.getElementById("output").innerHTML += row;
//Fim do código
 } });  }); }
getData();

function updateLike(messageId)
{
    console.log("botão like pressionado - " + messageId);
    button_id = messageId
    likes = document.getElementById(button_id).value;
    updatedLikes = Number(likes) + 1;
    console.log(updatedLikes);

    firebase.database().ref(sala).child(messageId).update({
        like : updatedLikes
    });

}