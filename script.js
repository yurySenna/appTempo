const key = "a578fa374c35314a5e3ef055159a72f4"

function colocarDadosNaTela(dados) {
    document.querySelector(".cidade").innerHTML = "Tempo em " + dados.name
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + "°C"
    document.querySelector(".texto-previsao").innerHTML = dados.weather[0].description
    document.querySelector(".umidade").innerHTML = "Umidade: " + dados.main.humidity + "%"
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    console.log(dados)

}

async function buscarCidade(cidade) {

    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then( resposta => resposta.json())

    colocarDadosNaTela(dados)

}

function cliqueiNoBotao() {
    const cidade = document.querySelector(".input-cidade").value
    buscarCidade(cidade)      // clima atual
    buscarPrevisao(cidade)    // previsão dos próximos dias
}



async function buscarPrevisao(cidade) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cidade}&appid=${key}&lang=pt_br&units=metric`
    const resposta = await fetch(url)
    const dados = await resposta.json()

    mostrarPrevisao(dados)
}

function mostrarPrevisao(dados) {
    const previsoes = dados.list.filter(item => item.dt_txt.includes("12:00:00")) // previsão do meio-dia

    const container = document.querySelector(".previsao-dias")
    container.innerHTML = "" // limpa antes

    previsoes.forEach(item => {
        const data = new Date(item.dt_txt)
        const dia = data.toLocaleDateString("pt-BR", { weekday: 'short', day: 'numeric', month: 'short' })

        container.innerHTML += `
            <div class="dia">
                <p><strong>${dia}</strong></p>
                <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
                <p>${Math.round(item.main.temp)}°C</p>
                <p>${item.weather[0].description}</p>
            </div>
        `
    })
}
