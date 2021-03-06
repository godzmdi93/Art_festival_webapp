// Initialize Firebase
var config = {
  apiKey: "AIzaSyA9VpnncQtXeiASQ_kuIHSWvv0c2dEteKk",
  authDomain: "contactform-1be84.firebaseapp.com",
  databaseURL: "https://contactform-1be84.firebaseio.com",
  projectId: "contactform-1be84",
  storageBucket: "contactform-1be84.appspot.com",
  messagingSenderId: "861580409827"
};
firebase.initializeApp(config);

// this is to get the library to login with google facebook and twitter.
var provider = new firebase.auth.GoogleAuthProvider();
var provider = new firebase.auth.FacebookAuthProvider();
var provider = new firebase.auth.TwitterAuthProvider();
// or for ES6 imports.


// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}


//********************************  Check if the User is logined and hide the button and uploading picutre *****************
//Ask Junwoo Seo

//getting id from the index.html

//login button
var signI = document.getElementById("login_button");

//sign out button
var signO = document.getElementById("signout_button");
//img_up button
var img_up = document.getElementById("upload_everything");

//check if the user is signed in
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    //hide the sign in button
    signI.style.visibility = 'hidden';
  } else {
    //hide the signout button and image upload section if user is not logined
    signO.style.visibility = 'hidden';
    img_up.style.visibility = 'hidden';
  }
});
//******************************************************************




//****************reloading page and send it to popup html page which is img upload page***************************
function img_direct(){

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      $('#wrapper').dialog({
          autoOpen: false
          // title: 'Share a photo'
      });
      dialogOpen();

  } else {
      window.location.href="/login.html";
  }
});

};


function dialogOpen() {
$('#wrapper').dialog('open');
    return false;
};

(function($){
    $('input[type="file"]').bind('change',function(){
        $("#img_text").html($('input[type="file"]').val());
    });
})(jQuery)


function story_direct(){


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      window.location.href="/message.html";
  } else {
      window.location.href="/login.html";
  }
});
};
//******************************************************************













//********************************  login out when user press the sign out button *****************
//Ask Junwoo Seo
function signout(){
  firebase.auth().signOut().then(function() {
      location.reload();

}).catch(function(error) {
  // An error happened.
});
};
//********************************  login out when user press the sign out button *****************














//********************************  contact us  *****************
//ask HJ


// Contact Us
// Reference messages collection
var messagesRef = firebase.database().ref('messages');
// Listen for form submit
var el = document.getElementById('contactForm');
if(el){
  el.addEventListener('submit', submitForm);
}

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, message);

  // alert message
  confirmation();

  // Clear form
  document.getElementById('contactForm').reset();
}

// Save message to firebase
function saveMessage(name, email, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    message:message
  });
}


//********************************  contact us  *****************


// reloading all the pages

function reload(){
  location.reload();
}

function confirmation(){
  alert("Thank you for contacting us! We will be in touch shortly.");
  location.reload();
}










//********************************  artist diplay   ***************************
// story download - display on website
/*
var fn_list = [];
var ln_list = [];
var bn_list = [];
var booth_list = [];
var type_list = [];
var website_list = [];
var i;
var artist_get = firebase.database().ref('story');
artist_get.on('value',function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
      fn_list.push(childSnapshot.child("First_Name").val());
      ln_list.push(childSnapshot.child("Last_Name").val());
      bn_list.push(childSnapshot.child("Business_Name").val());
      booth_list.push(childSnapshot.child("Booth").val());
      type_list.push(childSnapshot.child("Medium_Category").val());
      website_list.push(childSnapshot.child("Website").val());
    });
    var container3 = document.getElementById("test3");
for( i=0; i < 20; i++){
  container3.insertAdjacentHTML
    ('beforeend', '<div class="col span-1-of-3"><blockquote> Hey, my name is '+ fn_list[i] +' ' + ln_list[i] + ' and my business name is ' + bn_list[i] + '. My interest area of art is ' + type_list[i] + ' and I will have tons of beautiful art pieces for you guys to buy and enjoy. Come visit my booth ' + booth_list[i] + ' on Allen Street! <cite><img src ="resources/img/logo25.png">' + website_list[i] + '</cite> </blockquote></div>');
*/
var list_story = [];
var i;
var story_get = firebase.database().ref('story');
story_get.on('value',function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
      list_story.push(childSnapshot.child("story").val());
    });
    var container3 = document.getElementById("test3");
    console.log(container3);
for( i=0; i < 3; i++){
  container3.insertAdjacentHTML('beforeend', '<div class = "col span-1-of-3"><blockquote>' + list_story[i] + '</blockquote></div>');
};
})

//********************************  artist diplay   ***************************













































//********************************  img diplay   ***************************
// ask Junwoo or HJ


// image download - display on website
var list = [];
var i;
var img_get = firebase.database().ref('img_url');
img_get.on('value',function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
      list.push(childSnapshot.child("urls").val());
    });
    var container = document.getElementById("test1");
    var len = list.length-1;
    var lenM = len - 8;
for( i=len; i>lenM ; i--){
  container.insertAdjacentHTML('beforeend', '<li class="test2"> <figure class ="arts-photo"> <img class ="hey" src="'+list[i]+'"> </figure> </li>');

};
})
//********************************  img diplay   ***************************
































//********************************  img upload  *****************
//ask HJ or Junwoo
var selectedFile;

document.getElementById("upload").addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
	$(".upload-group").show();
	selectedFile = event.target.files[0];
};

function confirmUpload() {

//    location.reload();
    var user = firebase.auth().currentUser.email;
    var metadata = {
        contentType: 'image',
        customMetadata: {
          'uploadedBy': user,
          'title': $("#imgTitle").val(),
          'caption': $("#imgDesc").val()
        },
      };
      var uploadTask = firebase.storage().ref().child('images/' + selectedFile.name).put(selectedFile, metadata);


	uploadTask.on('state_changed', function(snapshot){
  		// Observe state change events such as progress, pause, and resume
  		// See below for more detail
	}, function(error) {
  		// Handle unsuccessful uploads
	}, function() {
  		// Handle successful uploads on complete
  		// For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  console.log('File available at', downloadURL);
                  let urlRef = firebase.database().ref('img_url').push();
                  urlRef.set({
                    urls : downloadURL,
                    name : selectedFile.name
                  });
                  location.reload();
                });
  		$(".upload-group")[0].before("Success!");
  		$(".upload-group").hide();                 
	});


      send_email_email();
}



//********************************  send email  *****************
// ask junwoo

function send_email_email(){
    var mylife = firebase.auth().currentUser.email;
var email = require(['https://cdn.emailjs.com/dist/email.min.js']);
var tem = document.getElementById("promotion");

var template_params = {
   "to_email": mylife,
 }

var service_id = "default_service";
var template_id = "hello";
emailjs.send(service_id,template_id,template_params);

}
