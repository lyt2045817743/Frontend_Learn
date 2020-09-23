
var oUl=document.getElementById('list');
var inner=''
for(var i=0;i<10000;i++){
    //var newLi=document.createElement('li');
    inner+=`<li>${content}</li>`;
    //oUl.appendChild(newLi);
}
oUl.innerHTML+=inner;