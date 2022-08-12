document.querySelector('button').addEventListener("click", async ()=>{
    const pEl = document.createElement('p')
    pEl.textContent = `${Math.floor(Math.random() * 11) + 5} melee damage!`
    document.querySelector('.ul').append(pEl)
    await wait(2000)
    pEl.remove()
})

async function wait(ms){
    await new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        }, ms)
    })
}