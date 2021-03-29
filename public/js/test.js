document.addEventListener("keypress", onDocumentKeyPress, false);

function onDocumentKeyPress(e) {
  if (e.key == "l") {
    $.ajax({
      url: "/likes?username=snerkflerks",
      type: "GET",
      success: function(result) {
        print(result);
      }
    });
  } else if (e.key == "r") {    
    $.ajax({
      url: "/twts?user_id=3227941280",
      type: "GET",
      success: function(result) {
        print(result);
      }
    });} else if (e.key == "a") {    
    $.ajax({
      url: "/activity?username=snerkflerks",
      type: "GET",
      success: function(result) {
        print(result);
      }
    });
  } else {
    print("pressed key: " + e.key);
  }
}
function nuke_users(){
   
    $.ajax({
      url: "/clear/users",
      type: "DELETE",
      success: function(result) {
        print(result);
      }
    });
}
function nuke_storage(){
  localStorage.clear();
}

function print(txt) {
  let text = document.getElementById("text");
  console.log(txt);
  text.innerHTML = txt + "<br>" + text.innerHTML ;
}