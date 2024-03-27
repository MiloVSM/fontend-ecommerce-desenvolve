document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.sub-menu').style.display = 'none';

    document.querySelector('.menu-btn').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.add('active');
        document.querySelector('.menu-btn').style.visibility = 'hidden';
    });

    document.querySelector('.close-btn').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.remove('active');
        document.querySelector('.menu-btn').style.visibility = 'visible';
    })

    document.querySelectorAll('.sub-btn').forEach(item => {
        item.addEventListener('click', () => {
          const subMenu = item.nextElementSibling;
          subMenu.style.display = (subMenu.style.display === 'block') ? 'none' : 'block';
      
          const dropdown = item.querySelector('.dropdown');
          dropdown.classList.toggle('rotate');
        });
      });      
});