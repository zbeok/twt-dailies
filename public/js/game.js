class Game {
  
  constructor () {
    this.name = "";
    this.pts = 0;
    this.items = {};
    this.role = ""
  }

  init(name,role) {
    this.name = name;
    this.role = role;
    store("someapicalltbh",{""})
  }
  
  store(url,data) {
    $.ajax({
      url:  url,
      type: "PUT",
      data: data,
      error: function(jqXHR, textStatus, errorThrown) {
        print(textStatus)
      }
    });
  }
  
  get(url,params) {
    $.ajax({
      url:  url,
      type: "GET",
      error: function(jqXHR, textStatus, errorThrown) {
        print(textStatus)
      }
    });
  }
  
  print(txt) {
    let text = document.getElementById("debug");
    console.log(txt);
    if (text!=null) {
      text.innerHTML += txt + "<br>";
    }
  }
  
}