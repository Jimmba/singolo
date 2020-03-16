const MENU = document.getElementById("menu");
let activeSlide = 1;
const SLIDES = document.getElementsByClassName('slider');
const LINE = document.getElementById('line');
const MOBILES = document.getElementsByClassName('phone');
const PORTFOLIOTABS = document.getElementById('portfolio-tabs');
const IMAGES = document.getElementById('images');

// menu buttons
MENU.addEventListener('click', (event) =>
{
    let menues = MENU.querySelectorAll('a');
    if (clickedOnButton(menues, event.target)){
        MENU.querySelectorAll('a').forEach(el => {
            el.classList.remove('active');
        });
        event.target.classList.add('active');
    }
})

// slider
document.getElementById('slide-left').addEventListener('click', ()=> {
    showSlide(false);
});

document.getElementById('slide-right').addEventListener('click', ()=> {
    showSlide(true);
});

function showSlide(toShowTheNextSlide) {
    let oldColor = getColor(activeSlide);
    
    activeSlide = toShowTheNextSlide ? (activeSlide + 1 > SLIDES.length ? 1 : activeSlide + 1) : (activeSlide - 1 < 1 ? SLIDES.length : activeSlide - 1);
    for (let i = 0; i < SLIDES.length; i += 1) {
        SLIDES[i].classList.add('hidden');
    }
    SLIDES[activeSlide - 1].classList.remove('hidden');
    LINE.classList.remove(`${oldColor}-line`);
    let newColor = getColor(activeSlide);
    LINE.classList.add(`${newColor}-line`)

}

function getColor(slide) {
    return SLIDES[activeSlide - 1].getAttribute("class").split(" ")[1];
}

// on-off phones

for (let i = 0; i < MOBILES.length; i += 1) {
    MOBILES[i].addEventListener('click', (event) => {
        ChangePhoneState(event.currentTarget.getElementsByClassName('mobiles')[0].classList);
    });
}

function ChangePhoneState(mobile) {
    mobile.contains('hidden') ? mobile.remove('hidden') : mobile.add('hidden');
}

//portfolio tabs

PORTFOLIOTABS.addEventListener('click', (event) => {
    let tabs = PORTFOLIOTABS.querySelectorAll('li');
    if (clickedOnButton(tabs, event.target)) {
        tabs.forEach(el => {
            el.classList.remove('active');
        });
        event.target.classList.add('active');
        MoveImages();
    }
})

function clickedOnButton(buttons, target){
    for (let i = 0; i < buttons.length; i +=1) {
        if (buttons[i] == target) return true;
    }
    return false;
}

//portfolio images
IMAGES.addEventListener('click', (event) => {
    let imgs = IMAGES.querySelectorAll('img');
    if (clickedOnButton(imgs, event.target)) {
        imgs.forEach(el => {
            el.classList.remove('bordered');
        });
        event.target.classList.add('bordered');
    }
})

function MoveImages() {
    let move = IMAGES.querySelectorAll('img')[0];
    IMAGES.appendChild(move);
}

//sumbit form

document.getElementById('submit').addEventListener('click', (event) => {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    if (name.checkValidity() && email.checkValidity()) {
        event.preventDefault();
        let subject = document.getElementById('subject').value.toString() !== '' ? `Тема: ${document.getElementById('subject').value.toString()}` : 'Без темы';
        let describe = document.getElementById('describe').value.toString() !== '' ? `Описание: ${document.getElementById('describe').value.toString()}` : 'Без описания';
        
        document.getElementById('modal').getElementsByClassName('subject')[0].querySelector('span').innerHTML = subject;
        document.getElementById('modal').getElementsByClassName('describe')[0].querySelector('span').innerHTML = describe;
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('modal').getElementsByClassName('submit')[0].addEventListener('click', (event => {
            document.getElementById('modal').classList.add('hidden');
        }))   
    }
})