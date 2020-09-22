document.getElementsByClassName("required")[0].focus();
let index = 1;
function onKeyEnter(event){
    if(index == 1){
        event.target.value = toTitleCase(event.target.value);
    }
    if(event.keyCode == 13){
        console.log(event.keyCode);
        document.getElementsByClassName('input-wrapper')[index].focus();
        index++;
    }
}
let reject = document.getElementById('reject');
reject.addEventListener('click',function(){
    alert('Bạn đã bỏ qua');
})
let form = document.getElementById('form');
form.onsubmit = function(event){
    event.preventDefault();
    let name = form.name.value;
    let address = form.address.value;
    let gender = form.gender.value;
    let birthday = form.birthday.value;
    let email = form.email.value;
    let phoneNumber = form.phone.value;
    let course = form.course.value;
    let userName = form.username.value;
    let password = form.password.value;
    let cf = form.confirm.value;
    let note = form.note.value;
    let image = form.image.value;
    let isPassed = true;
    if(name == ''){
        document.getElementsByClassName('error')[0].innerHTML = "Vui lòng nhập tên"
        isPassed = false;
    }
    else{
        document.getElementsByClassName('error')[0].innerHTML = ""
    }
    if(birthday == ''){
        document.getElementsByClassName('error')[3].innerHTML = "Vui lòng nhập ngày sinh"
        isPassed = false;

    }
    else{
        document.getElementsByClassName('error')[3].innerHTML = ""
    }
    if(email == ''){
        document.getElementsByClassName('error')[4].innerHTML = "Vui lòng nhập email"
        isPassed = false;

    }
    else{
        document.getElementsByClassName('error')[4].innerHTML = ""
    }
    if(userName == ''){
        document.getElementsByClassName('error')[7].innerHTML = "Vui lòng nhập tên sử dụng"
        isPassed = false;
    }
    else{
        document.getElementsByClassName('error')[7].innerHTML = ""
    }
    if(password == ''){
        document.getElementsByClassName('error')[8].innerHTML = "Vui lòng nhập mật khẩu"
        isPassed = false;
    }
    else{
        document.getElementsByClassName('error')[8].innerHTML = ""
    }
    if(password != cf){
        document.getElementsByClassName('error')[9].innerHTML = "Xác nhận mật khẩu không đúng"
        isPassed = false;
    }
    else{
        document.getElementsByClassName('error')[9].innerHTML = ""
    }
    if(isPassed){
        alert('Bạn đã nhập thành công')
    }
}
// chuuaanx hóa chuỗi tên
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
};