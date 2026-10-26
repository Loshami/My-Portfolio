/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*=============== THEME TOGGLE ===============*/
const themeButton = document.getElementById('theme-button')
const themeIcon = themeButton?.querySelector('i')

const readSavedTheme = () => {
    try {
        const savedTheme = localStorage.getItem('portfolio-theme')
        return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark'
    } catch (error) {
        console.warn('Unable to read the saved theme preference.', error)
        return 'dark'
    }
}

const updateTheme = (theme) => {
    const isLightTheme = theme === 'light'
    document.body.classList.toggle('light-theme', isLightTheme)

    if (themeButton && themeIcon) {
        themeIcon.classList.toggle('ri-sun-line', isLightTheme)
        themeIcon.classList.toggle('ri-moon-line', !isLightTheme)
        themeButton.setAttribute('aria-pressed', String(isLightTheme))
        themeButton.setAttribute('aria-label', `Switch to ${isLightTheme ? 'dark' : 'light'} theme`)
    }
}

updateTheme(readSavedTheme())

if (themeButton) {
    themeButton.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light'
        updateTheme(nextTheme)

        try {
            localStorage.setItem('portfolio-theme', nextTheme)
        } catch (error) {
            console.warn('Unable to save the theme preference.', error)
        }
    })
}

/* Menu show */
if(navToggle && navMenu){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== CHAT BUBBLE RESPONSIVE TEXT ===============*/
const chatBubbleText = document.querySelector('.home__chat-text p')
const chatBubble = document.querySelector('.home__chat-wrapper')

const resizeChatBubbleText = () => {
    if (!chatBubbleText || !chatBubble) return

    const bubbleWidth = chatBubble.getBoundingClientRect().width
    const bubbleHeight = chatBubble.getBoundingClientRect().height

    if (bubbleWidth <= 280) {
        chatBubbleText.style.fontSize = '0.7rem'
    } else if (bubbleWidth <= 360) {
        chatBubbleText.style.fontSize = '0.8rem'
    } else {
        chatBubbleText.style.fontSize = '0.95rem'
    }

    if (bubbleHeight < 120) {
        chatBubbleText.style.lineHeight = '1.1'
    } else {
        chatBubbleText.style.lineHeight = '1.2'
    }
}

window.addEventListener('load', resizeChatBubbleText)
window.addEventListener('resize', resizeChatBubbleText)

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the blur-header class to the header tag
    window.scrollY >= 50 ? header.classList.add('blur-header')
                       : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
      contactMessage = document.getElementById('contact-message')

const emailjsConfig = {
    serviceId: 'service_qf5e10r',
    templateId: 'template_&twa4r8',
    publicKey: 'HuX06I8uE0chTgelT'
}

const sendEmail = async (e) =>{
    e.preventDefault()

    const sendButton = contactForm.querySelector('button[type="submit"]')
    sendButton.disabled = true
    sendButton.textContent = 'Sending...'
    contactMessage.textContent = ''

    try {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS failed to load.')
        }

        await emailjs.sendForm(
            emailjsConfig.serviceId,
            emailjsConfig.templateId,
            contactForm,
            emailjsConfig.publicKey
        )
        contactMessage.textContent = 'Message sent successfully.'
        contactForm.reset()
    } catch (error) {
        console.error('Unable to send the contact message.', error)
        contactMessage.textContent = 'Message could not be sent. Please email marloneloshami476@gmail.com directly.'
    } finally {
        sendButton.disabled = false
        sendButton.textContent = 'Send Message'
    }
}

if (contactForm && contactMessage) {
    contactForm.addEventListener('submit', sendEmail)
}

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () =>{
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
  	const scrollY = window.pageYOffset

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href="#' + sectionId + '"]')

        if (!sectionsClass) return

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}
	})
}
window.addEventListener('scroll', scrollActive)


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
})

sr.reveal(`.home__chat-wrapper`, {origin: 'left', distance: '40px', duration: 1200, delay: 300})
sr.reveal(`.home__chat-text`, {origin: 'bottom', distance: '20px', duration: 1000, delay: 450})
sr.reveal(`.home__perfil, .contact__mail`, {origin: 'right'})
sr.reveal(`.home__name, .home__info, .contact__social`, {origin: 'left'})
sr.reveal(`.info__container`, {origin: 'left', delay: 600})
sr.reveal(`.home__info, .work__card, .services__card`, {interval: 100})
sr.reveal(`.home__perfil`, {delay: 500})
sr.reveal(`.home__name`, {delay: 600})
sr.reveal(`.home__info`, {delay: 700})
sr.reveal(`.home__perfil, .contact__form`, {origin: 'right'})
sr.reveal(`.home__name, .home__info, .contact__social`, {origin: 'left'})
sr.reveal(`.home__info, .work__card, .services__card`, {interval: 100})