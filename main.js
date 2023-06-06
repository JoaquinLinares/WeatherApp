
const form = document.querySelector('.form-container')
const CityName = document.querySelector('.city-name')
const Country = document.querySelector('.country-code')
const API = 'dc6a5893661e967b654529d5be6070a0'
const defect = 'caseros'
const defectCO = 'AR'

const section= document.querySelector('.section-clima-general')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(CityName.value === '' || Country.value === ''){
        showError('Ambos campos son obligatorios')
        return
    }
    
    GetWeatherApi(CityName.value,Country.value,API)    
    
})

function showError(message){
    const alert = document.createElement('p');
    alert.classList.add('alert-message')
    alert.innerHTML= message;

    form.appendChild(alert)
    setTimeout(() =>{
        alert.remove()
    },2000)
}

async function GetWeatherApi(city,country,API){
    
    section.innerHTML= ''
    const res = await fetch( `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&lang=es&units=metric&appid=${API}`)
    const data = await res.json()
    
    if(data.cod === '404'){
        showError('Ciudad no encontrada')
        return
    }else{
    const NameCity = data.name
    const weather = data.weather[0].icon;
    const temperatura = data.main.temp 
    const sensacion = data.main.feels_like
    const humedad = data.main.humidity

    const countryCreate= document.createElement('p')
    countryCreate.classList.add('clima-country')
    countryCreate.innerHTML= NameCity

    const DivContainer = document.createElement('div')
    DivContainer.classList.add('clima-country-container')

    const DivMinMax = document.createElement('div')
    

    const min = document.createElement('p')
    min.classList.add('min')
    min.innerHTML= "min: "+ Math.round(data.main.temp_min ) + "⁰"
    const max = document.createElement('p')
    max.classList.add('max')
    max.innerHTML= "max: "+ Math.round(data.main.temp_max) + "⁰"

    DivMinMax.appendChild(min)
    DivMinMax.appendChild(max)

    DivContainer.appendChild(countryCreate)
    DivContainer.appendChild(DivMinMax)

    const temp= document.createElement('p')
    temp.classList.add('clima-temp')
    temp.innerHTML= Math.round(temperatura)  + "⁰"
    
    const sensa= document.createElement('p')
    sensa.classList.add('clima-sensacion')
    sensa.innerHTML= 'Sensacion termica: '+ Math.round(sensacion) + "⁰"
    
    const lluvia= document.createElement('img')
    lluvia.classList.add('clima-lluvia')
    lluvia.setAttribute('src', `https://openweathermap.org/img/wn/${weather}@2x.png`)
    
    const hume= document.createElement('p')
    hume.classList.add('clima-humedad')
    hume.innerHTML= 'humedad del ' + humedad + '%'
    
    section.appendChild(DivContainer)
    section.appendChild(temp)
    section.appendChild(sensa)
    section.appendChild(lluvia)
    section.appendChild(hume)
    
    getVientoApi(data.wind.speed,data.wind.deg,data.wind.gust)
    getExtraApi(data.clouds.all,data.visibility,data.main.pressure,data.weather[0].description)
}
}

async function getVientoApi(velocidad,direccion,gusta){
    const sectionViento = document.querySelector('.section-viento')
    sectionViento.innerHTML= ''

    const velo = document.createElement('p')
    velo.innerHTML= 'Velocidad del viento: '+ velocidad + 'km'
    velo.classList.add('velocidad-viento')

    const direc = document.createElement('p')
    direc.innerHTML= 'Direccion del viento: '+ direccion + ' lg'
    direc.classList.add('direccion-viento')

    const gust= document.createElement('p')
    gust.innerHTML= 'Rafaga de viento: '+ gusta + 's'
    gust.classList.add('gusta-viento')

    sectionViento.appendChild(velo)
    sectionViento.appendChild(direc)
    sectionViento.appendChild(gust)
}

async function getExtraApi(nubosidad,visibilidad,presion,descripcion){
    const sectionExtras = document.querySelector('.section-extras')
    sectionExtras.innerHTML= ''

    const nubo = document.createElement('p')
    nubo.innerHTML= 'Nubosidad: '+ nubosidad + '%'
    nubo.classList.add('Extra-nubosidad')

    const visi = document.createElement('p')
    visi.innerHTML= 'Visibilidad: '+ (visibilidad / 100) + '%'
    visi.classList.add('Extra-visibilidad')

    const pres= document.createElement('p')
    pres.innerHTML= 'Presion atmosferica: '+ presion
    pres.classList.add('Extra-presion')

    const descri= document.createElement('p')
    descri.innerHTML= 'Estado actual: '+ descripcion
    descri.classList.add('Extra-descripcion')


    

    sectionExtras.appendChild(nubo)
    sectionExtras.appendChild(visi)
    sectionExtras.appendChild(pres)
    sectionExtras.appendChild(descri)
    
    
}

GetWeatherApi(defect,defectCO,API)

