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
        resolve(xhr.response);
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
    console.log("myfirstfunc");
};

function renderHeader(data){
    
};

window.onload = function() {
   var url = 'data/header.json';
   makeRequest('GET',url)
   .then(function (res){
      console.log(res);
      var temp = '<p class="name f-name">' +res.Name.fName+ '</p><p class="name l-name">'+res.Name.lName+'</p><p class="name desig f-name">'+res.titleDesc+'</p>';
      document.getElementById("name-container").innerHTML = temp;
   })
   .catch(function (error){
       console.log(error)
   });
};
   
   
