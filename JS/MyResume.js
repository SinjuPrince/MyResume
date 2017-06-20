/*  
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
*/
function makeRequest (method, url) {
    
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
  xhr.responseType = 'json';
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve({
            data: xhr.response,
            status: this.status
        });
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}


function getcontactdetails() {
    
    var elem = document.getElementsByClassName("toggle-sec "),
            len = elem.length;
    for(var i=0; i<len; i++) {
        elem[0].classList.remove("toggle-sec");
    }
    document.getElementById("display-details").classList.add("toggle-sec");
};

function renderHeader(data){
    var res = data.data;
    console.log(data)
      var temp = '<p class="name f-name">' +res.Name.fName+ '</p><p class="name l-name">'+res.Name.lName+'</p><p class="name desig f-name">'+res.titleDesc+'</p>';
      var navTemp = '<div class="nav-align">',i,menuitems=res.menuItems;
       document.getElementById("name-container").innerHTML = temp;
      for(i=0; i<menuitems.length; i++ ) {
          navTemp += '<a href="'+menuitems[i].link+'">'+menuitems[i].displayName+'</a>';
      }
      navTemp += '</div>';
      document.getElementById("navigation-bar").innerHTML = navTemp;
};

window.onload = function() {
   var url = 'data/header.json';
   makeRequest('GET',url)
   .then(function (res){
      renderHeader(res)
   })
   .catch(function (error){
       console.log(error)
   });
};
   
        
