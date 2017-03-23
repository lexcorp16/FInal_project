/*;
var btnLogin = document.getElementById("btnLogin");
var btnSignup = document.getElementById("btnSignup");
var btnLogout = document.getElementById("btnLogout");*/

//var googlogin = document.getElementById('googlogin');

//var express = require('express');
//var app = express();
//var server = require('./server.js');

function googlogin(){
	//console.log('jfksjf');
  monitorAuthState();
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
  	// This gives you a Google Access Token. You can use it to access the Google API.
  	var token = result.credential.accessToken;
  	// The signed-in user info.
  	var user = result.user;
  	// ...
  	//console.log(user);
	}).then(user =>  {
      console.log('loggedinuser', user)
      window.location = 'page2.html';
    })
  .catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	// The email of the user's account used.
  	var email = error.email;
  	// The firebase.auth.AuthCredential type that was used.
  	var credential = error.credential;
  	// ...
}); 


}


function fetchDbData(){

  const dbRef = firebase.database().ref()
  dbRef.on('value' ,function(snapshot) {
    data = snapshot.val().questions;
    console.log(data);
    //$("#quiz").text(snapshot.val().questions[1]);
    return data;
  }, function (error) {
    console.log("Error: " + error.code);
  });

}

function signUp(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  console.log("signing up....");

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(user =>  {

      console.log('loggedinuser', user)
    window.location = 'page2.html';
    })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    console.log(user)
    } else {
      // No user is signed in.
    }
  });
}

function signIn(){
  //console.log("hhhh");
  var email = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;
  if (email === "" || password === ""){
    alert("Username or password Incorrect!!");
    return;
  }
  else{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user =>  {

      console.log('loggedinuser', user)
    window.location = 'page2.html';
    })


    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert(errorMessage);
    return;
    });
  }

  //
  

  
}

function signOut(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log("signing out");
  }).then(user =>  {
      //console.log('loggedinuser', user)
      window.location = 'home.html';
    })
  .catch(function(error) {
  // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    alert(errorMessage);
    return;
  });
}
  

function monitorAuthState(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    // User is signed in.
    console.log(user.email);
    //alert("user signed in");
    return;
    } else {
      // No user is signed in.
    }
  });
}


function displayData(){
  const dbRef = firebase.database().ref()
  dbRef.on("value", function(snap) {
    console.log(snap.val())
    snap.forEach(function(childSnapshot) {
        var key = childSnapshot.key();
        var childData = childSnapshot.val();
    }).then(function(){
      console.log(childData);
    });
});
  

  //for (var i =0; i < data.length; i++) {
    
  //};

}


function display(){
  const dbRef = firebase.database().ref();
  var questionsRef = dbRef.child('questions');

  //load older conatcts as well as any newly added one...
  questionsRef.on("child_added", function(snap) {
    //console.log("added", snap.key, snap.val());
    //console.log(snap.val());
    $('#questions').removeClass('hide');
    $('#questions').prepend(createHtmlFromObject(snap.val()));
    //var questionss = snap.val();
    //return questionss;
  });

  //console.log(questionss);

}


function createHtmlFromObject(question){

  var html = '';
  html += '<p>'+question.question+'</p>';
    html += '<div class="radio">';
      html += '<label id="optionA"><input type="radio" name="optradio">'+question.optionA+'</label>';
    html += '</div>';
    html += '<div class="radio">';
      html += '<label id="optionA"><input type="radio" name="optradio">'+question.optionB+'</label>';
    html += '</div>';
    html += '<div class="radio">';
      html += '<label id="optionA"><input type="radio" name="optradio">'+question.optionC+'</label>';
    html += '</div>';


  return html;

}

function calcScore(){
  alert(snap.val().question);

}
