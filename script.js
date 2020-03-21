const MENU = document.getElementById("menu");
const MENUELEMENTS = MENU.querySelectorAll('li');
let activeSlide = 1;
const SLIDES = document.getElementsByClassName('slider');
const LINE = document.getElementById('line');
const MOBILES = document.getElementsByClassName('phone');
const PORTFOLIOTABS = document.getElementById('portfolio-tabs');
const IMAGES = document.getElementById('images');
const DIVS = getDivs();
const HEADERSIZE = 90;

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
    if (clickedOnElement(MENUELEMENTS, event.target)){
        MENUELEMENTS.forEach(el => {
            el.classList.remove('active');
        });
        event.target.classList.add('active');
        let offset = document.getElementById(event.target.innerText.toLocaleLowerCase()).offsetTop;
        ScrollingTo(offset);
    }
})

function ScrollingTo(pixel) {
    let start = window.scrollY;
    let scrollDistance = pixel - start - HEADERSIZE;
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
            window.scrollTo(0, pixel - HEADERSIZE + 1); 
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
    if (clickedOnElement(tabs, event.target)) {
        tabs.forEach(el => {
            el.classList.remove('active');
        });
        event.target.classList.add('active');
        MoveImages();
    }
})

function clickedOnElement(arrayOfElements, clickedElement){
    for (let i = 0; i < arrayOfElements.length; i +=1) {
        if (arrayOfElements[i] == clickedElement) return true;
    }
    return false;
}

let a = clickedOnElement
//portfolio images border

IMAGES.addEventListener('click', (event) => {
    let activeImage = IMAGES.getElementsByClassName('bordered')[0];
    let clickedImage = event.target;
    let imgs = IMAGES.querySelectorAll('img');
    
    if (clickedOnElement(imgs, event.target)) {
        imgs.forEach(el => {
            if (el.classList.contains('bordered') || el.classList.contains('showingBorder')) {
                removeBorder(el);
            }
            
        });
        if (activeImage !== clickedImage) {
            event.target.classList.remove('noborder');
            event.target.classList.add('showingBorder');
            setTimeout(() => {
                event.target.classList.remove('showingBorder');
                if (!event.target.classList.contains('hiddingBorder')) {
                    event.target.classList.add('bordered');
                }
            }, 1000);
        }
    }
})

IMAGES.addEventListener('mouseover', (event) => {
    let images = IMAGES.querySelectorAll('img');
    if (clickedOnElement(images, event.target)) {
        event.target.classList.add('shake');
        setTimeout(() => {
            event.target.classList.remove('shake');
        }, 1000);
    }
})

function removeBorder(el) {
    el.classList.add('hiddingBorder');
    setTimeout(() => {
        el.classList.remove('hiddingBorder');
        if (!el.classList.contains('showingBorder')) {
            el.classList.add('noborder');
        }
    }, 1000);
    el.classList.remove('bordered');
}

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

//slider

const multiItemSlider = (function () {
    function _isElementVisible(element) {
      const rect = element.getBoundingClientRect(),
        vWidth = window.innerWidth || doc.documentElement.clientWidth,
        vHeight = window.innerHeight || doc.documentElement.clientHeight,
        elemFromPoint = function (x, y) { 
        return document.elementFromPoint(x, y) };

      if (rect.right < 0 || rect.bottom < 0
        || rect.left > vWidth || rect.top > vHeight)
        return false;
      return (
        element.contains(elemFromPoint(rect.left, rect.top - HEADERSIZE))
        || element.contains(elemFromPoint(rect.right, rect.top - HEADERSIZE))
        || element.contains(elemFromPoint(rect.right, rect.bottom - HEADERSIZE))
        || element.contains(elemFromPoint(rect.left, rect.bottom - HEADERSIZE))
      );
    }

    return function (selector, config) {
      let
        _mainElement = document.querySelector(selector), // основный элемент блока
        _sliderWrapper = _mainElement.querySelector('.slider-wrapper'), // обертка для .slider-item
        _sliderItems = _mainElement.querySelectorAll('.slider-item'), // элементы (.slider-item)
        _sliderControls = _mainElement.querySelectorAll('.arrow'), // элементы управления
        _sliderControlLeft = _mainElement.querySelector('.arrow-left'), // кнопка "LEFT"
        _sliderControlRight = _mainElement.querySelector('.arrow-right'), // кнопка "RIGHT"
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
        _positionLeftItem = 0, // позиция левого активного элемента
        _transform = 0, // значение транфсофрмации .slider_wrapper
        _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
        _items = [], // массив элементов
        _interval = 0,
        _html = _mainElement.innerHTML,
        _states = [
          { active: false, minWidth: 0, count: 1 },
          { active: false, minWidth: 1020, count: 2 }
        ],
        _config = {
          isCycling: false, // автоматическая смена слайдов
          direction: 'right', // направление смены слайдов
          interval: 1000, // интервал между автоматической сменой слайдов
          pause: true, // устанавливать ли паузу при поднесении курсора к слайдеру
          autoChangeImage: false // менять ли картинку автоматически
        };

      for (const key in config) {
        if (key in _config) {
          _config[key] = config[key];
        }
      }

      // наполнение массива _items
      _sliderItems.forEach(function (item, index) {
        _items.push({ item: item, position: index, transform: 0 });
      });

      const _setActive = function () {
        let _index = 0;
        const width = parseFloat(document.body.clientWidth);
        _states.forEach(function (item, index, arr) {
          _states[index].active = false;
          if (width >= _states[index].minWidth)
            _index = index;
        });
        _states[_index].active = true;
      }

      const _getActive = function () {
        let _index;
        _states.forEach(function (item, index, arr) {
          if (_states[index].active) {
            _index = index;
          }
        });
        return _index;
      }

      const position = {
        getItemMin: function () {
          let indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position < _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getItemMax: function () {
          let indexItem = 0;
          _items.forEach(function (item, index) {
            if (item.position > _items[indexItem].position) {
              indexItem = index;
            }
          });
          return indexItem;
        },
        getMin: function () {
          return _items[position.getItemMin()].position;
        },
        getMax: function () {
          return _items[position.getItemMax()].position;
        }
      }

      const _transformItem = function (direction) {
        let nextItem;
        if (!_isElementVisible(_mainElement)) {
          return;
        }
        if (direction === 'right') {
          _positionLeftItem++;
          if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
            nextItem = position.getItemMin();
            _items[nextItem].position = position.getMax() + 1;
            _items[nextItem].transform += _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform -= _step;
        }
        if (direction === 'left') {
          _positionLeftItem--;
          if (_positionLeftItem < position.getMin()) {
            nextItem = position.getItemMax();
            _items[nextItem].position = position.getMin() - 1;
            _items[nextItem].transform -= _items.length * 100;
            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
          }
          _transform += _step;
        }
        _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
      }

      const _cycle = function (direction) {
        if (!_config.isCycling) {
          return;
        }
        if (_config.autoChangeImage) {
          _interval = setInterval(function () {
            _transformItem(direction);
          }, _config.interval);
        }
      }

      // обработчик события click для кнопок "назад" и "вперед"
      const _controlClick = function (e) {
        console.log('click');
        if (e.target.classList.contains('arrow')) {
          e.preventDefault();
          const direction = e.target.classList.contains('arrow-right') ? 'right' : 'left';
          _transformItem(direction);
          clearInterval(_interval);
          _cycle(_config.direction);
        }
      };

      // обработка события изменения видимости страницы
      const _handleVisibilityChange = function () {
        if (document.visibilityState === "hidden") {
          clearInterval(_interval);
        } else {
          clearInterval(_interval);
          _cycle(_config.direction);
        }
      }

      const _refresh = function () {
        clearInterval(_interval);
        _mainElement.innerHTML = _html;
        _sliderWrapper = _mainElement.querySelector('.slider-wrapper');
        _sliderItems = _mainElement.querySelectorAll('.slider-item');
        _sliderControls = _mainElement.querySelectorAll('.arrow');
        _sliderControlLeft = _mainElement.querySelector('.arrow-left');
        _sliderControlRight = _mainElement.querySelector('.arrow-right');
        _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width);
        _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width);
        _positionLeftItem = 0;
        _transform = 0;
        _step = _itemWidth / _wrapperWidth * 100;
        _items = [];
        _sliderItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });
      }

      const _setUpListeners = function () {
        _mainElement.addEventListener('click', _controlClick);
        if (_config.pause && _config.isCycling) {
          _mainElement.addEventListener('mouseenter', function () {
            clearInterval(_interval);
          });
          _mainElement.addEventListener('mouseleave', function () {
            clearInterval(_interval);
            _cycle(_config.direction);
          });
        }
        document.addEventListener('visibilitychange', _handleVisibilityChange, false);
        window.addEventListener('resize', function () {
          let
            _index = 0,
            width = parseFloat(document.body.clientWidth);
          _states.forEach(function (item, index, arr) {
            if (width >= _states[index].minWidth)
              _index = index;
          });
          if (_index !== _getActive()) {
            _setActive();
            _refresh();
          }
        });
      }

      // инициализация
      _setUpListeners();
      if (document.visibilityState === "visible") {
        _cycle(_config.direction);
      }
      _setActive();

      return {
        right: function () { // метод right
          _transformItem('right');
        },
        left: function () { // метод left
          _transformItem('left');
        },
        stop: function () { // метод stop
          _config.isCycling = false;
          clearInterval(_interval);
        },
        cycle: function () { // метод cycle 
          _config.isCycling = true;
          clearInterval(_interval);
          _cycle();
        }
      }

    }
  }());

  const slider = multiItemSlider('.slider', {
    isCycling: true,
    autoChangeImage: false
  })
