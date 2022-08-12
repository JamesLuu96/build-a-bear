let base = 0
let eyes = 0
let mouth = 0
let glasses = 0
let clothes = 0
let hat = 0
let overcoat = 0

const imgEl = document.querySelector('.img')

const baseArr = []
for(let i = 0; i <= 5; i++){
    baseArr.push(`./assets/img/base/base${i}.png`)
}

const eyesArr = []
for(let i = 0; i <= 16; i++){
    eyesArr.push(`./assets/img/eyes/eyes${i}.png`)
}

const mouthArr = []
for(let i = 0; i <= 21; i++){
    mouthArr.push(`./assets/img/mouth/mouth${i}.png`)
}

const glassesArr = []
for(let i = 0; i <= 12; i++){
    glassesArr.push(`./assets/img/glasses/glasses${i}.png`)
}

const hatArr = []
for(let i = 0; i <= 30; i++){
    hatArr.push(`./assets/img/hat/hat${i}.png`)
}


const clothesArr = []
for(let i = 0; i <= 36; i++){
    clothesArr.push(`./assets/img/clothes/clothes${i}.png`)
}

const overcoatArr = []
for(let i = 0; i <= 2; i++){
    overcoatArr.push(`./assets/img/overcoat/overcoat${i}.png`)
}

document.querySelector('.base-button').addEventListener("click", ()=>{
    if(base === baseArr.length - 1){
        base = 0
    }else{
        base++
    }
    document.querySelector('.display-base').src = baseArr[base]
    console.log(base)
})

document.querySelector('.eyes-button').addEventListener("click", ()=>{
    if(eyes === eyesArr.length - 1){
        eyes = 0
    }else{
        eyes++
    }
    document.querySelector('.display-eyes').src = eyesArr[eyes]
    console.log(eyes)
})

document.querySelector('.mouth-button').addEventListener("click", ()=>{
    if(mouth === mouthArr.length - 1){
        mouth = 0
    }else{
        mouth++
    }
    document.querySelector('.display-mouth').src = mouthArr[mouth]
    console.log(mouth)
})

document.querySelector('.hat-button').addEventListener("click", ()=>{
    if(hat === hatArr.length - 1){
        hat = 0
    }else{
        hat++
    }
    document.querySelector('.display-hat').src = hatArr[hat]
    console.log(hat)
})

document.querySelector('.eye-accessory-button').addEventListener("click", ()=>{
    if(glasses === glassesArr.length - 1){
        glasses = 0
    }else{
        glasses++
    }
    document.querySelector('.display-glasses').src = glassesArr[glasses]
    console.log(glasses)
})

document.querySelector('.clothes-button').addEventListener("click", ()=>{
    if(clothes === clothesArr.length - 1){
        clothes = 0
    }else{
        clothes++
    }
    document.querySelector('.display-clothes').src = clothesArr[clothes]
    console.log(clothes)
})

document.querySelector('.overcoat-button').addEventListener("click", ()=>{
    if(overcoat === overcoatArr.length - 1){
        overcoat = 0
        document.querySelector('.display-hat').style.display = "block"
        document.querySelector('.display-clothes').style.display = "block"
    }else{
        overcoat++
        document.querySelector('.display-hat').style.display = "none"
        document.querySelector('.display-clothes').style.display = "none"
    }
    document.querySelector('.display-overcoat').src = overcoatArr[overcoat]
    console.log(overcoat)
})

const maleEyes = [0,2,4,6,8,12,14,15]
const femaleEyes = [1,3,5,7,9,13,16]
const maleMouths = [0,1,2,3,4,5,6,9,10,11,12,15]
const femaleMouths = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
const maleHats = [0,1,2,3,4,5,13,14,15,26,27,28,29,30]
const femaleHats = [0,1,2,3,4,5,6,10,11,13,14,15,16,19,20,22,23]
const maleClothes = [0,1,2,3,4,5,6,7,12,13,14,15,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
const femaleClothes = [1,2,8,9,10,11,16,17,18,19,21,22,23,24,25,26,27,28,29,30,31,32]

const maleCombinations = [
    {
        name: "male light brown",
        mouth: [18],
        hat: [7,8]
    },
    {
        name: "male dark brown",
        mouth: [16],
        hat: [24,25]
    },
    {
        name: "male grey",
        mouth: [17],
        hat: [21]
    },
    {
        name: "male blonde",
        mouth: [19],
        hat: [17]
    },
    {
        name: "male red",
        mouth: [20],
        hat: [18]
    },
    {
        name: "male green",
        mouth: [21],
        hat: [9]
    }
]

function buildABear(){
    const male = Math.floor(Math.random() * 2) === 0
    const results = {
        base: Math.floor(Math.random() * 6)
    }
    if(male){
        results.clothes = maleClothes[Math.floor(Math.random() * maleClothes.length)]
        results.eyes = maleEyes[Math.floor(Math.random() * maleEyes.length)]
        const hairColor = maleCombinations[Math.floor(Math.random() * maleCombinations.length)]
        const hatChance = Math.floor(Math.random() * 3) === 0
        const mouthChance = Math.floor(Math.random() * 3) === 0
        if(hatChance){
            results.hat = hairColor.hat[Math.floor(Math.random() * hairColor.hat.length)]
        }else{
            results.hat = maleHats[Math.floor(Math.random() * maleHats.length)]
        }
        if(mouthChance){
            results.mouth = hairColor.mouth[Math.floor(Math.random() * hairColor.mouth.length)]
        }else{
            results.mouth = maleMouths[Math.floor(Math.random() * maleMouths.length)]
        }
    }else{
        results.clothes = femaleClothes[Math.floor(Math.random() * femaleClothes.length)]
        results.eyes = femaleEyes[Math.floor(Math.random() * femaleEyes.length)]
        results.hat = femaleHats[Math.floor(Math.random() * femaleHats.length)]
        results.mouth = femaleMouths[Math.floor(Math.random() * femaleMouths.length)]
    }
    return results
}

document.querySelector(".random-button").addEventListener("click", ()=>{
    displayBear(imgEl, {...buildABear(), glasses: Math.floor(Math.random() * 13), overcoat: Math.floor(Math.random() * 10) === 0 ? Math.floor(Math.random() * 2) + 1 : 0})
})

const obj = {
    glasses: 0,
    base: 0,
    eyes: 0,
    mouth: 0,
    hat: 0,
    clothes: 0,
    overcoat: 0
}

function displayBear(container, results){
    container.querySelector('.display-glasses').src = results.glasses ? `./assets/img/glasses/glasses${results.glasses}.png` : `./assets/img/glasses/glasses0.png`
    container.querySelector('.display-base').src = results.base ? `./assets/img/base/base${results.base}.png` : `./assets/img/base/base0.png`
    container.querySelector('.display-eyes').src = results.eyes ? `./assets/img/eyes/eyes${results.eyes}.png` : `./assets/img/eyes/eyes0.png`
    container.querySelector('.display-mouth').src = results.mouth ? `./assets/img/mouth/mouth${results.mouth}.png` : `./assets/img/mouth/mouth0.png`
    container.querySelector('.display-hat').src = (!results.hat || results.overcoat) ? `./assets/img/hat/hat0.png` : `./assets/img/hat/hat${results.hat}.png`
    container.querySelector('.display-clothes').src = (!results.hat || results.overcoat) ? `./assets/img/clothes/clothes0.png` : `./assets/img/clothes/clothes${results.clothes}.png`
    container.querySelector('.display-overcoat').src = results.overcoat ? `./assets/img/overcoat/overcoat${results.overcoat}.png` : `./assets/img/overcoat/overcoat0.png`

}


