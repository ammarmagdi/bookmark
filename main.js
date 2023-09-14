let nameInput= document.getElementById("Name");
let urlInput =document.getElementById("URL");
let addBtn =document.getElementById("add");
let tableBody=document.getElementById("tableBody");

var bookmarks;

if(localStorage.getItem("bookmarks")==null){
  bookmarks=[]

}else{

  bookmarks= JSON.parse(localStorage.getItem("bookmarks"));
  displayB()
  
}

addBtn.addEventListener("click",function(){
  addLink()


})


function addLink () {
  if (validateName() == true && validateURL() == true) {
    let bookmark ={

      Name:nameInput.value,
      URL:urlInput.value
    }
    
    bookmarks.push(bookmark)
    
    
    
    
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    
    displayB()
  } else{
    document.getElementById("alert").classList.remove("d-none");
    document.getElementById("close").addEventListener("click",function() {
      closeAlert();
  })

}
}

nameInput.addEventListener("input", () => {
  validateName();
}) 
urlInput.addEventListener("input", () => {
  validateURL();
})





function displayB(){

let mark =``;

for(let i =0 ;i<bookmarks.length ;i++){

mark=`

<tr>

<td>
${i +1}
</td>
<td>
${bookmarks[i].Name}
</td>
<td><a href="${bookmarks[i].URL}" class="btn btn-danger"><i class="fa-solid fa-eye"></i> visite </a></td>


<td><button onclick="deleteb(${i})" class="btn btn-dark"> delete</button></td>
</tr>


`

}

tableBody.innerHTML=mark;

}



function deleteb(index){
  bookmarks.splice(index,1);
 localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
  displayB();
}

function cleardate(){

  nameInput.value="";
  urlInput.value="";
}




function validateName() {
  let regex = /^[A-Za-z]{3,}$/;
  regex.test(nameInput.value);
  if (regex.test(nameInput.value) == true) {
    nameInput.style.border= '5px solid green';
    return true;
  } else {
    nameInput.style.border= '5px solid red';
    return false
  }

}

function validateURL(){
  var regex = /^(http(s)?:\/\/)(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{2,4}$/
  regex.test(urlInput.value);
  if (regex.test(urlInput.value) == true){
    urlInput.style.border= '5px solid green';
    return true;
  }else {
    urlInput.style.border= '5px solid red';
    return false;
  }
}

function closeAlert() {
  document.getElementById("alert").classList.add("d-none");

}