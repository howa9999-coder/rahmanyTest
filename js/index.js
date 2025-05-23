const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

menuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    
    // Toggle between bars and times icon
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});
let sideBar = true
document.querySelector('#tools').addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar')
    if(sideBar){
        sidebar.style.display = "block";
        sideBar = false
    }else{
        sidebar.style.display = "none";
        sideBar = true
    }
})
function toggleContent(button) {
    const cont = button.closest('.cont');
    const content = cont.querySelector('.content'); // Assuming your content is inside a div with class 'content'

    if (content.style.display === 'none' || content.style.display === '') {
        // Show the content
        content.style.display = 'block';
        button.innerText = '-';
        cont.classList.add('expanded');
    } else {
        // Hide the content
        content.style.display = 'none';
        button.innerText = '+';
        cont.classList.remove('expanded');
    }
}
function btnFunction(param, btnClose){
    const contact = document.querySelector(param);
    const btn = document.querySelector(btnClose);
    contact.style.display = 'block'
    btn.innerHTML = "-"
}

