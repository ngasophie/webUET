let btn = document.getElementById('btn-add-task');
console.log(btn)
let form = document.getElementById('form-add-task');
btn.onclick = function(){
    btn.style.display = 'none';
    form.style.display = 'block';
}
form.onsubmit = function(event){
    event.preventDefault();
    btn.style.display = 'block';
    form.style.display = 'none';
    document.getElementsByClassName('txt')[0].innerHTML = form.text.value;
}
