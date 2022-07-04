const btn_menu = document.querySelector('.btn-menu')
const menu = document.querySelector('.menu-left')
const panel = document.querySelector('.panel-dash')
const content_menu_lateral = document.querySelector('.content-menu-lateral')

document.addEventListener('DOMContentLoaded', () => {
  console.log('Ready.document.DOM')
})

btn_menu.addEventListener('click', (e) => {
  if (menu.classList.contains('menu-phone')) {
    menu.classList.remove('menu-phone');
  } else if (menu.classList.contains('move-left')){
    menu.classList.add('menu-phone');
    menu.classList.remove('move-left');
    panel.classList.replace('col-lg-12','col-lg-10');
    panel.classList.replace('col-md-12','col-md-9');
    panel.classList.replace('col-sm-12','col-sm-11');
    btn_menu.classList.replace('bi-chevron-double-right','bi-chevron-double-left')
  } else{
    menu.classList.add('move-left');
    panel.classList.replace('col-lg-10','col-lg-12');
    panel.classList.replace('col-md-9','col-md-12');
    panel.classList.replace('col-sm-11','col-sm-12');
    btn_menu.classList.replace('bi-chevron-double-left','bi-chevron-double-right')
  }
  e.stopImmediatePropagation();
});

const btnX = document.querySelector('.btnX');

btnX.addEventListener('click', e => {
  e.preventDefault();
  menu.classList.add('menu-phone');
})

content_menu_lateral.addEventListener('click', e => {  
  if(e.target.parentElement.querySelector('.bi-plus-circle')){
    e.target.parentElement.querySelector('.bi-plus-circle')
    .classList.replace('bi-plus-circle','bi-dash-circle');    
  }
  else{
    e.target.parentElement.querySelector('.bi-dash-circle')
    .classList.replace('bi-dash-circle','bi-plus-circle');
  }
  e.stopPropagation();
})