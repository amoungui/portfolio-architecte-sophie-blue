let modal1 = null

const openModal1 = async function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))    
    target.style.display = null
    target.removeAttribute('aria-hidden')
    target.setAttribute('aria-modal', 'true')
    modal1 = target
    modal1.addEventListener('click', closeModal1)
    modal1.querySelector('.js-modal-close').addEventListener('click', closeModal1)
    modal1.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal1 = function (e) {
    if (modal1 === null) return
    e.preventDefault()
    modal1.style.display = "none"
    modal1.setAttribute('aria-hidden', 'true')
    modal1.removeAttribute('aria-modal')
    modal1.removeEventListener('click', closeModal1)
    modal1.querySelector('.js-modal-close').removeEventListener('click', closeModal1)
    modal1.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal1 = null
}

document.querySelectorAll('.js-modal1').forEach(a => {
    a.addEventListener('click', openModal1)

})

const stopPropagation = function (e) {
    e.stopPropagation()
}




