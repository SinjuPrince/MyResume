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

function renderHeader(passedResponse){
    var res = passedResponse.data;
    console.log(passedResponse);
      var temp = '<p class="name f-name">' +res.Name.fName+ '</p><p class="name l-name">'+res.Name.lName+'</p><p class="name desig f-name">'+res.titleDesc+'</p>';
      var navTemp = '<div class="nav-align">',i,menuitems=res.menuItems;
       document.getElementById("name-container").innerHTML = temp;
      for(i=0; i<menuitems.length; i++ ) {
          navTemp += '<a href="'+menuitems[i].link+'">'+menuitems[i].displayName+'</a>';
      }
      navTemp += '</div>';
      document.getElementById("navigation-bar").innerHTML = navTemp;
};
function renderProfile(passedResponse) {
   console.log(passedResponse);
   var res = passedResponse.data;
  document.getElementById("img").src = res.Home.imgURL;
    var homeProf=res.Home.prof, temp = '<h1 id="hello">' +res.Home.heading +'</h1>';
      
        for(j=0; j<=homeProf.length-1; j++){
           
           temp += '<p class="' +res.Home.className[j] +'">'+homeProf[j]+'</p>';
       }
       temp +='<button id="' +res.Home.className[2] +'" onclick="' +res.Home.fnName +'">MY CV</button>'
          document.getElementById("prof-desc").innerHTML = temp;
        var  temp1 = '<span class="label"> Available for:</span>', span1= res.span.Availablefor;
          for (i=0; i<span1.length  ; i++){
              temp1 += '<p class="content">' +span1[i] +'</p>';
          }
      
             document.getElementsByClassName("avail")[0].innerHTML = temp1;
}

window.onload = function() {
   var url = 'data/header.json';
   makeRequest('GET',url)
   .then(function (res){
      renderHeader(res);
      renderProfile(res);
      
   })
   .catch(function (error){
       console.log(error);
   });
};
   
        
