const MENU = document.getElementById("menu");
const MENUELEMENTS = MENU.querySelectorAll('li');
let activeSlide = 1;
const SLIDES = document.getElementsByClassName('slider');
const LINE = document.getElementById('line');
const MOBILES = document.getElementsByClassName('phone');
const PORTFOLIOTABS = document.getElementById('portfolio-tabs');
const IMAGES = document.getElementById('images');
const DIVS = getDivs();

// array of elements with anchors
function getDivs () {
    const array = [];
    MENUELEMENTS.forEach(el => {
        let name = el.innerText.toLowerCase();
        let div = document.getElementById(name);
        array.push(div);
    });
    return array;
};

// menu buttons
MENU.addEventListener('click', (event) =>
{
    if (clickedOnButton(MENUELEMENTS, event.target)){
        MENUELEMENTS.forEach(el => {
            el.classList.remove('active');
        });
        event.target.classList.add('active');
        let offset = document.getElementById(event.target.innerText.toLocaleLowerCase()).offsetTop;
        ScrollingTo(offset);
    }
})

function ScrollingTo(pixel) {
    let header = 90;
    let start = window.scrollY;
    let scrollDistance = pixel - start - header;
    let scrolled = 0;
    let size = 0;
    let step = 1;
    let up = false;
    if (scrollDistance < 0) {
        scrollDistance = 0 - scrollDistance;
        up = true;
    }
    let timer = setInterval(() => {
        (!up && size >= 50) || (up && size <= 51) ? 2 : 1;
        size = scrolled < scrollDistance / 2 ? size + step : (size - step > 0 ? size - step : step);
        if (scrolled + size > scrollDistance / 2 && scrolled < scrollDistance / 2) {
            scrolled = scrollDistance - scrolled;
        } else {
            scrolled = scrolled + size;
        }

        if (scrolled >= scrollDistance) {
            window.scrollTo(0, pixel - header); //!
            clearInterval(timer);
            return;
        }
        if (up) {
            window.scrollTo(0, start - scrolled);
        } else {
            window.scrollTo(0, start + scrolled);
        }
    }, 20);
}

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

//portfolio images border

IMAGES.addEventListener('click', (event) => {
    let activeImage = IMAGES.getElementsByClassName('bordered')[0];
    let clickedImage = event.target;
    let imgs = IMAGES.querySelectorAll('img');
    
    if (clickedOnButton(imgs, event.target)) {
        imgs.forEach(el => {
            el.classList.remove('bordered');
        });
        if (activeImage !== clickedImage) {
            event.target.classList.add('bordered');
        }
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
        
        document.getElementById('modal').getElementsByClassName('subject')[0].querySelector('p').innerHTML = subject;
        document.getElementById('modal').getElementsByClassName('describe')[0].querySelector('p').innerHTML = describe;
        document.getElementById('modal').classList.remove('hidden');
        document.getElementById('modal').getElementsByClassName('submit')[0].addEventListener('click', (event => {
            document.getElementById('modal').classList.add('hide');
            document.getElementById('form').reset();
            setTimeout(()=>{
                document.getElementById('modal').classList.add('hidden');
                document.getElementById('modal').classList.remove('hide');
            }, 2000);
        }))   
    }
})

//scroll

document.addEventListener('scroll', onScroll);

function onScroll() {
    const currentPosition = Math.round(window.scrollY) + 92;
    DIVS.forEach(el => {
        if (el.offsetTop < currentPosition && (el.offsetTop + el.offsetHeight) > currentPosition){
            MENUELEMENTS.forEach((item) => {
                item.classList.remove('active');
                if (el.getAttribute('id') === item.innerHTML.toLowerCase()) {
                    item.classList.add('active');
                }
            })
        }
    });
}