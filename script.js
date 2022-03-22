
    // home section
let carouselSlide = document.querySelector('.carousel-slide');
let carouselImg = document.querySelectorAll('.carousel-slide img');

let prevBtn = document.querySelector('.arrow-left');
let nextBtn = document.querySelector('.arrow-right');

let counter = 1;
const size = carouselImg[0].clientWidth;

carouselSlide.style.transform = 'translateX('+(-size * counter)+'px)'

nextBtn.addEventListener('click', ()=>{
    if(counter>= carouselImg.length-1) return
    carouselSlide.style.transition='all .5s ease-in-out'
    counter++;
    carouselSlide.style.transform = 'translateX('+(-size * counter)+'px)'
})
prevBtn.addEventListener('click', ()=>{
    if(counter<=0) return
    if(counter)
    carouselSlide.style.transition='all .5s ease-in-out'
    counter--;
    carouselSlide.style.transform = 'translateX('+(-size * counter)+'px)'
})

carouselSlide.addEventListener('transitionend',()=>{
    if(carouselImg[counter].id === 'lastClone'){
        carouselSlide.style.transition="none"
        counter=carouselImg.length -2;
        carouselSlide.style.transform = 'translateX('+(-size * counter)+'px)'

    }
    if(carouselImg[counter].id === 'firstClone'){
        carouselSlide.style.transition="none"
        counter=carouselImg.length - counter;
        carouselSlide.style.transform = 'translateX('+(-size * counter)+'px)'

    }
})

setInterval(() => {
    if(counter>= carouselImg.length-1) return
    carouselSlide.style.transition='all 2s ease-in-out'
    counter++;
    carouselSlide.style.transform = 'translateX('+(-size * counter)+'px)'
}, 3000);


// supporters section
let persons = document.querySelector('.persons');
let prev = document.querySelector('.prev-btn');
let next = document.querySelector('.next-btn');
let pages = document.querySelector('.page span');

let current=1
function start(current){
    fetch('https://reqres.in/api/users?page='+current,{
    method: 'GET'
    })
    .then(function(response){
        if(response.status!==200){
            throw "error"
        }
        return response.json()
    })
    .then(function(response){
        page(response.data)
    })
    .catch(function(error){
        console.log('error')
    })
}

start(current)



function page(response){
    response.forEach(item => {
        let div = document.createElement('div');
        div.classList.add('person')
        let ul = document.createElement('ul');

        let img = document.createElement('img')
        img.src=item.avatar
        ul.append(img)

        let li1 = document.createElement('li');
        li1.textContent ="Name: " +item.first_name;
        ul.appendChild(li1);

        let li2 = document.createElement('li');
        li2.textContent ="Last-Name: " +item.last_name;
        ul.appendChild(li2)

        let li3 = document.createElement('li');
        li3.textContent = "Email: " + item.email;
        ul.appendChild(li3)

        div.appendChild(ul)

        persons.appendChild(div)
    });
}

prev.addEventListener('click',()=>{
    if(current>1){
        current--;
        persons.innerHTML='';
        pages.textContent=current
        start(current)
    }
})

next.addEventListener('click',()=>{
    if(current<2){
        current++;
        persons.innerHTML='';
        pages.textContent=current
        start(current)
    }
})