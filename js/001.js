const btpn = document.getElementById("button-planer"); //сама функция кнопки
const sidebar = document.getElementById("sidebar");

btpn.addEventListener('click',() => {
    sidebar.classList.toggle('click-planer');
});


// мой параллакс
function scroll_pr() {
const scrollTop = window.scrollY; 
const docHeight = document.body.scrollHeight - window.innerHeight;
  return (scrollTop / docHeight) * 100;
}

window.addEventListener('scroll', () => {
    const p = scroll_pr();
    const w_conteiner = document.querySelector('.window-wrapper');
    const sky = document.querySelector('.sky-l');
    const moon = document.querySelector('.moon-l');
    const tree = document.querySelector('.tree');
    const room = document.querySelector('.room'); 
    
    if (p >= 0 && p < 35) {
        w_conteiner.className = 'window-wrapper'; 
        tree.className = 'tree';
        tree.src = '../images/tree2.png'
    }
    else if (p >= 35 && p < 70) {
        w_conteiner.className = 'window-wrapper medium'; 
        tree.className = 'tree medium';
        tree.src = '../images/tree.png'
    }
    else {
        w_conteiner.className = 'window-wrapper small'; 
        tree.className = 'tree small';
        tree.src = '../images/tree3.png'
    }
});