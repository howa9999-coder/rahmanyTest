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
const sidebarBtn = document.querySelector('.sidebar-btn')
sidebarBtn.addEventListener('click', function(){
    const sidebar = document.querySelector('.sidebar')
    if(sideBar){
        sidebar.style.display = "block";
        sidebarBtn.classList.add('active')
        sidebarBtn.classList.remove('remove')


        sideBar = false
    }else{
        sidebar.style.display = "none";
        sidebarBtn.classList.add('remove')
        sidebarBtn.classList.remove('active')

        sideBar = true
    }
})
const tabs = document.querySelectorAll('.tab-btn')
const all_content = document.querySelectorAll('.content')

tabs.forEach((tab, index)=>{
    tab.addEventListener('click', (e)=>{
        tabs.forEach(tab => {
            tab.classList.remove('active')
        })
        tab.classList.add('active')
        all_content.forEach(content => {
            content.classList.remove('active')
        })
        all_content[index].classList.add('active')
    })

})
const intro = document.querySelector('.intro')
const introBtn = document.querySelector('.intro-btn')
intro.classList.add('active')
introBtn.classList.add('active')
//full screen
var btn = document.getElementById("full-screen");
var body= document.querySelector('body');
function fullScreenview(){
  body.requestFullscreen();

};