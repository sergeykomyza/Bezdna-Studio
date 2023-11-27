// ================================================== исключение по наименованию страницы
// const contactsPage = window.location.pathname == '/contacts.html'
// if(contactsPage){
//     ...
// }


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ПРОКРУТКА, ШАПКА
// document.addEventListener('DOMContentLoaded', function () {
//     // СКРОЛЛ К НУЖНОЙ СЕКЦИИ ПО КЛИКУ НА ПУНКТАХ МЕНЮ
//     $('.menu__link').click(function () {
//         var scroll_elem = $(this).attr('href');
//         $('html, body').animate({
//             scrollTop: $(scroll_elem).offset().top
//         }, 1000);
//     });
//     // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ШАПКЕ
//     function headerActiveToggle() {
//         const scrollSize = window.pageYOffset
//         scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
//     }
//     window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
//     window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
// });

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function numberCounters(parent){
    let numbers = document.querySelector(parent).querySelectorAll('.position__coord')
    numbers.forEach(item => {
        let letters = ".234576823234688765434364578543234576823234688765434364578543234576823234688765434364578543"
        let interval = null
        let iteration = 0
        console.log(item)
        clearInterval(interval);
        interval = setInterval(() => {
            item.innerText = item.innerText
              .split("")
              .map((letter, index) => {
                if(index < iteration) {
                  return item.dataset.value[index];
                }
                return letters[Math.floor(Math.random() * 26)]
              })
              .join("");
            
            if(iteration >= item.dataset.value.length){ 
              clearInterval(interval);
            }
            
            iteration += 1 / 10;
          }, 30);
        
    })
}
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const startCodeWithInterval = (callback, timeout) => {
    let enabled = true;
    let taskId = null;
    const stop = () => {
      enabled = false;
      clearTimeout(taskId);
    };
    const wrapper = async () => {
      await callback();
      if (enabled) {
        taskId = setTimeout(wrapper, timeout);
      }
    };
    taskId = setTimeout(wrapper, timeout);
    return stop;
  };
  let i = 8837;
  const stopCode = startCodeWithInterval(async () => {
    i -= 5;
    document.querySelector('.animate').setAttribute('to', i)
    document.querySelector('.animate').setAttribute('dur', 1 + 's')
    // console.log(i);
    if (i === 7797) {
        document.querySelector('.position--0').style.opacity = '1'
        numberCounters('.position--0')
      await sleep(1000);
    }
    if (i === 4902) {
        document.querySelector('.position--1').style.opacity = '1'
        numberCounters('.position--1')
      await sleep(1000);
    }
    if (i === 1902) {
        document.querySelector('.position--2').style.opacity = '1'
        numberCounters('.position--2')
      await sleep(1000);
    }
    if (i < 0) {
      stopCode();
    }
  }, 5);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
const inputMask = () => {
    $(".js-maskPhone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        clearIncomplete: true
    //     greedy: false,
    //     onBeforePaste: function (pastedValue, opts) {
    //         pastedValue = pastedValue.toLowerCase();
    //         return pastedValue.replace("mailto:", "");
    //     },
    //     definitions: {
    //         '*': {
    //             validator: "[0-9A-Za-z-а-я-]",
    //             casing: "lower"
    //         }
    //     }
    });
    $(".js-maskDate").inputmask({
        mask: "99/99/9999",
        clearIncomplete: true,
        'placeholder': 'dd/mm/yyyy'
    });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ СЛАЙДЕР SWIPER (https://swiperjs.com/get-started) 
const sliders = () => {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'vertical',
        loop: true,
    
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },
    
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    
        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
const map = () => {

    setTimeout(function() {
        var headID = document.getElementsByTagName("body")[0];         
        var newScript = document.createElement('script');
        newScript.type = 'text/javascript';
        newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        headID.appendChild(newScript);
    }, 3000);
    setTimeout(function() {
            var myMap = new ymaps.Map("map", {
            center: [55.917879, 37.806326],
            zoom: 13,
            controls: ['smallMapDefaultSet']
        }, {
            searchControlProvider: 'yandex#search'
        });

        myGeoObject = new ymaps.GeoObject({
            geometry: {
                type: "Point"
            },
        });
        myMap.geoObjects
            .add(myGeoObject)
            .add(new ymaps.Placemark([55.917879, 37.806326], {
                balloonContent: '<strong></strong>',
                iconCaption: 'М.О., г. Королев, ул. Ленина 12'
            }, {
                preset: 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
            }));

        myMap.setType('yandex#publicMap');

        myMap.behaviors.disable('scrollZoom');
        //на мобильных устройствах... (проверяем по userAgent браузера)
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //... отключаем перетаскивание карты
            myMap.behaviors.disable('drag');
        }
    }, 4000);

}



// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/* иногда карта не загружается таким образом (например в битриксе)
 тогда надо сделать обращение к ней как это указано в документации, через ymaps.ready - https://yandex.ru/dev/maps/jsapi/doc/2.1/quick-start/index.html?from=techmapsmain

ymaps.ready(init);

function init(){

    var myMap = new ymaps.Map("map", {
        center: [56.745981, 37.179787],
        zoom: 13,
        controls: ['smallMapDefaultSet']
    }, {
        searchControlProvider: 'yandex#search'
    });

    myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point"
        },
    });
    myMap.geoObjects
        .add(myGeoObject)
        .add(new ymaps.Placemark([56.745981, 37.179787], {
            balloonContent: '<strong></strong>',
            iconCaption: 'М.О., г. Королев, ул. Ленина 12'
        }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaptionMaxWidth: '200'
        }));

    myMap.setType('yandex#publicMap');
    // отключаем масштабирование скроллом       
    myMap.behaviors.disable('scrollZoom');
    // на мобильных устройствах... (проверяем по userAgent браузера)
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //... отключаем перетаскивание карты
        myMap.behaviors.disable('drag');
    }
        
}
*/
