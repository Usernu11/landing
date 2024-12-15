const burger = document.querySelector('.burger')
const menu = document.querySelector('.burger-menu')
const nav = document.querySelector('.burger-menu-list')

burger.addEventListener('click', () => {
    if (menu.classList.contains('disable')) {
        // вызываем менюшку и добавлям класс эктивю.
        menu.classList.add('active')
        menu.classList.remove('disable')
        menu.style.width = '60px'
        menu.style.height = '2px'
        menu.style.marginRight = '-150px'

        nav.style.left = '0'
        nav.style.width = '60%'

    } else {
        // убираем менюшку и удаляем класс
        menu.classList.remove('active')
        menu.classList.add('disable')

        nav.style.left = '-500px'

    }
})

// console.log(menu.classList.contains('disable'))