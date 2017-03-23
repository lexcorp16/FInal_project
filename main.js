function googleLogin(){
	
	var provider = new firebase.auth.GoogleAuthProvider();


	firebase.auth().signInWithPopup(provider).then(function(result) {
  	// This gives you a Google Access Token. You can use it to access the Google API.
  	var token = result.credential.accessToken;
  	// The signed-in user info.
  	var user = result.user;
  
	}).then(user =>  {
      console.log('loggedinuser', user)
      window.location = 'questions.html';
      $("#emailNav").html(user.email);
    })
  .catch(function(error) {
  	// Handle Errors here.
  	var errorCode = error.code;
  	var errorMessage = error.message;
  	// The email of the user's account used.
  	var email = error.email;
  	// The firebase.auth.AuthCredential type that was used.
  	var credential = error.credential;
  	
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


function fetchDbData(){
  const dbRef = firebase.database().ref()

  dbRef.on('value' ,function(snapshot) {
    data = snapshot.val().questions;
    console.log(data);
    return data;
  }, function (error) {
    console.log("Error: " + error.code);
  });

}


function signUp(){
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user =>  {
    console.log('loggedinuser', user)
    window.location = 'questions.html';
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
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
      window.location = 'questions.html';
    })
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    alert(errorMessage);
    return;
    });
  }
  
}


function signOut(){
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log("signing out");
  }).then(user =>  {
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
    if (user){
      // User is signed in.
      console.log(user.email);
    }       
      else {
      // No user is signed in.
    }
  });
}


function display(){
  const dbRef = firebase.database().ref();

  var questionsRef = dbRef.child('questions');
  
  questionsRef.on("child_added", function(snap) {
    $('#questions').removeClass('hide');
    $('#questions').prepend(createHtmlFromObject(snap.val(), snap.key));
    
  });
}

function createHtmlFromObject(question, key){
  
  var html = '';
  html += '<p>'+question.question+'</p>';
    html += '<div class="radio">';
      html += '<label id="optionA"><input type="radio" name='+key+' value="optionA">'+question.optionA+'</label>';
    html += '</div>';
    html += '<div class="radio">';
      html += '<label id="optionA"><input type="radio" name='+key+'  value="optionB">'+question.optionB+'</label>';
    html += '</div>';
    html += '<div class="radio">';
      html += '<label id="optionA"><input type="radio" name='+key+' value="optionC">'+question.optionC+'</label>';
    html += '</div>';

  return html;

}

function calcScore(){
   
  const dbRef = firebase.database().ref();
  var questionsRef = dbRef.child('questions');
  var score = 0;

  questionsRef.on("child_added", function(snap) {
    var key = snap.key;
    var radioValue = $("input[name="+key+"]:checked").val();
    if(radioValue === snap.val().correctAns){
      score += 5;
    }
   
  });

  alert("Your final score is: " +score);
}
