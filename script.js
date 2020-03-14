const MENU = document.getElementById("menu");
let activeSlide = 1;
const SLIDES = document.getElementsByClassName('slider');
const LINE = document.getElementById('line');
const MOBILES = document.getElementsByClassName('phone');

// menu buttons
MENU.addEventListener('click', (event) =>
{
    MENU.querySelectorAll('a').forEach(el => {
        el.classList.remove('active');
    });
    event.target.classList.add('active');
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