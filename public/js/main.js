let audio = document.getElementById("myAudio");
function toggleAudio() {
    if (audio.paused) {
        audio.play()
    } else {
        audio.pause()
    }
}


let pseudoInput = document.getElementById("pseudoInput")
let pseudoGame = document.getElementsByClassName("pseudoGame")[0]
let btnStart = document.getElementsByClassName("start")[0]
let homeSection = document.getElementsByClassName("home")[0]
let gameSection = document.getElementsByClassName("game")[0]
let timerChrono = document.getElementsByClassName("timer")[0]
let btnExit = document.getElementsByClassName("btnExit")[0]
let pseudoJoueur = document.getElementById("pseudoJoueur")
let btnReset = document.getElementsByClassName("btnReset")[0]
let pointsScore = document.getElementById("pointsScore")
// let allCards = document.getElementsByClassName("mesCartes")[0]
let score = document.getElementsByClassName("score")[0]
let btnChoix = Array.from(document.getElementById("choixNbrCards").children)
console.log("btn choix"+btnChoix)

let nbrCards = 0
let flipCards = []
let scoreGame = 0


//Générer les nombres de cartes de 1 à aux nombre de cartes
function randomCards() {
    let valeurCards = []
    for(let i = 1; i <= nbrCards; i++) {
        valeurCards.push(i)
}
return valeurCards
}

//mélanger de manière aléatoire
function melange(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}


//Crée mes cartes en fonction de la valeur qui a été généré
//Ajoute les cartes généré, puis essayer d'organiser
function afficheNbrCards(cards) {
    let mesCartesDiv = document.querySelector(".mesCartes")
    for (let i = 0; i< cards.length; i++) {
    let valeur = cards[i]
    let card = document.createElement("div")
    card.classList.add("premierLigne")
    card.classList.add("maCarte")
    card.value = valeur
    card.index = i
    card.textContent = "?"
    card.addEventListener("click", eventClickCards)
    mesCartesDiv.appendChild(card)
    }
}




function retournCards(card) {
    card.textContent = card.value;
    card.style.backgroundColor = "white";
    card.removeEventListener("click", eventClickCards);
}


//à chaque fois qu'une carte est cliqué on vérifie si elles correspond et on gere aussi le retournement
function eventClickCards () {
    if (flipCards.length > 2) {
        retournCards(this)
        flipCards.push(this)

        if (flipCards.length === 2) {
            setTimeout(pairesCards, 1000)
        
    }
}}

//On vérif si les deux cartes corresponde, si c'est les meme on garde sinon on retourne
function pairesCards() {
    if (flipCards[0].value === flipCards[1].value) {
        flipCards = []
        scoreGame++
        pointsScore.textContent = "score :" + scoreGame +"/" + nbrCards
    } else {
        flipCards.forEach((card) =>{
            card.textContent = "?"
            card.style.backgroundColor = "gray"
            card.addEventListener("click", eventClickCards)
        })
        flipCards = []
    }
    if (scoreGame === nbrCards) {
        alert("Bien joué mon pti gars tu as trouvé toutes les pairs")
        
    }
}   



btnChoix.forEach((btn) => {
    btn.addEventListener("click", () => {
        // reset()
        //Le nombre de carte à jouer
        nbrCards = parseInt(btn.id.charAt(btn.id.length - 1));
        //On va générer les paires
        let nbrValue = randomCards(nbrCards)
        let cardsPaire = nbrValue.concat(nbrValue)
        melange(cardsPaire)
        afficheNbrCards(cardsPaire)
    })
    
})


// LE JEUX NE FONCTIONNE PAS LORS DU START JE N'AI PAS MES DIV QUI SE CREE
btnStart.addEventListener('click',() => {
    if(pseudoInput.value ==""){
        document.body.transition = "background-color 0.5s"
        document.body.style.backgroundColor = "#FF3B3F"
        setTimeout(()=>{
            document.body.style.transition = "background-color 0.5s"
            document.body.style.backgroundColor = ""
        },500)
        alert("Veuillez saisir un pseudo avant de commencer")
        
    } else {
        homeSection.style.display = "none"
        gameSection.style.display = "block"
        btnExit.style.display = "block"
        pseudoGame.innerHTML = pseudoInput.value
        melange(cardsPaire)

        afficheNbrCards(cardsPaire)
        timer()
    }
})



// let allCards = document.querySelectorAll(".maCarte")
// let cardsTab = Array.from(allCards)
// console.log("Toutes les cartes", cardsTab);
// let cardsRandom = cardsTab.sort(()=> (Math.random() - 0.5))
// for (let i=0; i<cardsRandom.length; i++){
// }


function timer() {
    let minutes = 0
    let secondes = 0

    timer=setInterval(()=>{
        secondes++
        if(secondes == 60){
            secondes = 0
            minutes++
        }
        let affichageTimer = minutes+"m" + ":"+ secondes+"s"
        timerChrono.textContent = affichageTimer

        // let stockValeur = affichageTimer //je stock a valeur pour l'utiliser plus tard dans mon tableau de score

        btnStart.addEventListener("click",() =>{
            minutes = 0
            secondes = 0
            affichageTimer = minutes+"m" + ":"+ secondes+"s"
            timerChrono.textContent = affichageTimer
        }) 
    }, 1000)    
}





btnExit.addEventListener("click",()=>{
    // let player = pseudoGame.innerHTML
    homeSection.style.display = "block"
    btnExit.style.display = "none"
    gameSection.style.display = "none"
    // clearInterval(timer)
    pseudoInput.value = ""
    affichageTimer = 0+"m"+":"+0+"s"
    // pseudoJoueur.textContent = player
    

})

