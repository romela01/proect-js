
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

let result = document.getElementById('result')
let filter = document.getElementById('filter')
let listItems = [];

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
        li1.classList.add('names')
        li1.textContent =item.first_name +' '+ item.last_name;
        ul.appendChild(li1);

        div.appendChild(ul)

        listItems.push(div)
        

        persons.appendChild(div)
    });
}
// filter
function filterData(searchItem){
    listItems.forEach((item)=>{
        console.log(item)
        if(item.innerText.toLowerCase().includes(searchItem.toLowerCase())){
            item.classList.remove('active');
        }else{
            item.classList.add('active')
        }
    })
}

filter.addEventListener('input',(event)=>{
    filterData(event.target.value)
})

// end filter
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

// color change

let out = document.querySelector('.change-out');
let inn = document.querySelector('.change-in');
let blar = document.querySelector('.blar')

out.addEventListener('click',()=>{
    blar.classList.toggle('blar-add')
    inn.classList.toggle('change-in-add')
    inn.classList.toggle('color-black')
    out.classList.toggle('color-white')

    let theme;

    

    if(blar.classList.contains('blar-add')){
        theme = 'DARK'
    }else{
        theme = 'LIGHT'
    }
    
    localStorage.setItem("PageTheme", JSON.stringify(theme))

})

let GetTheme = JSON.parse(localStorage.getItem('PageTheme'))


if(GetTheme==="DARK"){
    blar.classList='blar blar-add'
    inn.classList.add('color-black')
    inn.classList.add('change-in-add')
    out.classList.add('color-white')
}
   
// support

let form=document.getElementById('transfer');

form.addEventListener('submit',(event)=>{
    event.preventDefault();

    let errors ={}
    let form = event.target

    let amount = document.querySelector('.input-amount').value;

    if(amount<10 || amount>10000){
        errors.amount = "Wrong amount";
        
    }

    // age
    let age = false;


    let formAge = form.querySelectorAll('.age');


    formAge.forEach(item=>{
        if(item.checked){
             age = true;
        }    
    })

    if(!age){
        errors.age = "Please select your Age"
    }

    // gender
    let gender = false;

    let allGender = form.querySelectorAll('.gender');

    allGender.forEach(item=>{
        if(item.checked){
            gender = true;
        }
    })

    if(!gender){
        errors.gender = "Please select Gender"
    }
    
    form.querySelectorAll('.error-text').forEach(item=>{
        item.textContent='';
    })

    for (let item in errors){
        
        let errorPlaceholder = document.getElementById('error_'+ item)

        if(errorPlaceholder){
            errorPlaceholder.textContent = errors[item]
        }
    }

    if(Object.keys(errors).length==0){
        form.submit();
    }

})


// contact

let accordion = document.querySelector('.accordion');

accordion.addEventListener('click',()=>{
    accordion.classList.toggle('active')
})

// support burger-card
let burger = document.querySelector('.burger');
let card = document.querySelector('.card-open');
let close = document.querySelector('.content-x')
let formBox = document.querySelector('.form-box')
let burgerContent = document.querySelector('.burger-content')

card.addEventListener('click',()=>{
    burger.classList.add('burger-add')
    formBox.style.animation='';
    burgerContent.style.animation=`burgeranim 2s ease`;
    
})

close.addEventListener('click',()=>{
    burger.classList.remove('burger-add')
    formBox.style.animation = `cardanim 2s ease`;
    burgerContent.style.animation='';
})

