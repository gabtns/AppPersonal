(function(){
var b=document.querySelector('.burger'),r=document.getElementById('hdr-row');if(!b||!r)return;
function set(o){r.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Cerrar menú':'Abrir menú');}
b.addEventListener('click',function(){set(!r.classList.contains('open'));});
r.addEventListener('click',function(e){if(e.target.closest('a'))set(false);});
document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
window.addEventListener('resize',function(){if(innerWidth>760)set(false);});
})();
