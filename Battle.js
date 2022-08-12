class Battle {
    constructor({onComplete}){
        this.onComplete = onComplete
    }

    createElement(){
        this.element = document.createElement('div')
        this.element.classList.add("Battle")
        this.element.innerHTML = (`
        <p class="Battle-text">Choose your action:</p>
        <div class="Battle_player">
            <div class="bear-container">
                <div class="bear-hp-bar">
                    <div class="bear-hp-left" width="100%">
                        <div class="bear-hp-percent" data-bear-hp="100/100" width="50%"></div>
                        <div class="bear-shield-percent" width="50%"></div>
                    </div>
                </div>
                <div class="bear-mp-bar">
                    <div class="bear-mp-percent" data-bear-mp="10/10"></div>
                </div>
                <div class="bear">
                    <img src="./assets/img/base/base0.png" alt="" class="display-base">
                    <img src="./assets/img/eyes/eyes0.png" alt="" class="display-eyes">
                    <img src="./assets/img/mouth/mouth0.png" alt="" class="display-mouth">
                    <img src="./assets/img/glasses/glasses0.png" alt="" class="display-glasses">
                    <img src="./assets/img/hat/hat0.png" alt="" class="display-hat">
                    <img src="./assets/img/clothes/clothes36.png" alt="" class="display-clothes">
                    <img src="./assets/img/overcoat/overcoat0.png" alt="" class="display-overcoat">
                </div>
                <div class="bear-stats">
                    <p>Jimmy</p>
                    
                </div>
            </div>
            <div class="bear-container">
                <div class="bear-hp-bar">
                    <div class="bear-hp-left" width="80%">
                        <div class="bear-hp-percent" data-bear-hp="100/100" width="50%"></div>
                        <div class="bear-shield-percent" width="50%"></div>
                    </div>
                </div>
                <div class="bear-mp-bar">
                    <div class="bear-mp-percent" data-bear-mp="10/10"></div>
                </div>
                <div class="bear">
                    <img src="./assets/img/base/base3.png" alt="" class="display-base">
                    <img src="./assets/img/eyes/eyes15.png" alt="" class="display-eyes">
                    <img src="./assets/img/mouth/mouth15.png" alt="" class="display-mouth">
                    <img src="./assets/img/glasses/glasses0.png" alt="" class="display-glasses">
                    <img src="./assets/img/hat/hat0.png" alt="" class="display-hat">
                    <img src="./assets/img/clothes/clothes20.png" alt="" class="display-clothes">
                    <img src="./assets/img/overcoat/overcoat0.png" alt="" class="display-overcoat">
                </div>
                <div class="bear-stats">
                    <p>Jordan</p>
                    
                </div>
            </div>
            <div class="bear-container">
                <div class="bear-hp-bar">
                    <div class="bear-hp-left" width="100%">
                        <div class="bear-hp-percent" data-bear-hp="100/100" width="50%"></div>
                        <div class="bear-shield-percent" width="50%"></div>
                    </div>
                </div>
                <div class="bear-mp-bar">
                    <div class="bear-mp-percent" data-bear-mp="10/10"></div>
                </div>
                <div class="bear">
                    <img src="./assets/img/base/base5.png" alt="" class="display-base">
                    <img src="./assets/img/eyes/eyes12.png" alt="" class="display-eyes">
                    <img src="./assets/img/mouth/mouth0.png" alt="" class="display-mouth">
                    <img src="./assets/img/glasses/glasses9.png" alt="" class="display-glasses">
                    <img src="./assets/img/hat/hat0.png" alt="" class="display-hat">
                    <img src="./assets/img/clothes/clothes6.png" alt="" class="display-clothes">
                    <img src="./assets/img/overcoat/overcoat0.png" alt="" class="display-overcoat">
                </div>
                <div class="bear-stats">
                    <p>Timmy</p>
                    
                </div>
            </div>

            <div class="action-menu">
                <div class="skills-container">
                    <div data-inactive="false" class="skill">
                        <div><img src="./assets/img/skills/punch.png" alt=""></div>
                        <p class="skill-name">Punch</p>
                    </div>
                    <div data-inactive="true" class="skill">
                        <div data-cooldown="2" data-onCooldownFor="10" data-mp-cost="2"><img src="./assets/img/skills/unholy-slash.png" alt=""></div>
                        <p class="skill-name">Unholy Strike</p>                     
                    </div>
                    <div data-inactive="true" class="skill">
                        <div data-cooldown="2" data-onCooldownFor="4" data-mp-cost="2"><img src="./assets/img/skills/lightning-slash.png" alt=""></div>
                        <p class="skill-name">Lightning Strike</p>
                    </div>
                    <div data-inactive="false" class="skill">
                        <div data-mp-cost="2"><img src="./assets/img/skills/roar.png" alt=""></div>
                        <p class="skill-name">Roar</p>
                    </div>
                    <div data-inactive="false" class="skill">
                        <div data-cooldown="2" data-mp-cost="2"><img src="./assets/img/skills/block.png" alt=""></div>
                        <p class="skill-name">Block</p>
                    </div>
                    <!-- <div data-inactive="false" class="skill">
                        <div data-mp-cost="2"><img src="./assets/img/skills/roar.png" alt=""></div>
                        <p class="skill-name">Roar</p>
                    </div>
                    <div data-inactive="false" class="skill">
                        <div data-cooldown="2" data-mp-cost="2"><img src="./assets/img/skills/block.png" alt=""></div>
                        <p class="skill-name">Block</p>
                    </div> -->
                </div>
            </div>

        </div>

        <div class="Battle_enemy">
            <div class="bear-container">
                <div class="bear-hp-bar">
                    <div class="bear-hp-left" width="100%">
                        <div class="bear-hp-percent" data-bear-hp="100/100" width="50%" data-bear-hp="100/100"></div>
                        <div class="bear-shield-percent" width="50%"></div>
                    </div>
                </div>
                <div class="bear-mp-bar">
                    <div class="bear-mp-percent" data-bear-mp="10/10"></div>
                </div>
                <div class="bear">
                    <img src="./assets/img/base/base2.png" alt="" class="display-base">
                    <img src="./assets/img/eyes/eyes10.png" alt="" class="display-eyes">
                    <img src="./assets/img/mouth/mouth0.png" alt="" class="display-mouth">
                    <img src="./assets/img/glasses/glasses0.png" alt="" class="display-glasses">
                    <img src="./assets/img/hat/hat29.png" alt="" class="display-hat">
                    <img src="./assets/img/clothes/clothes25.png" alt="" class="display-clothes">
                    <img src="./assets/img/overcoat/overcoat0.png" alt="" class="display-overcoat">
                </div>
                <div class="bear-stats">
                    <p>Naruto</p>
                    
                </div>
            </div>
            <div class="bear-container">
                <div class="bear-hp-bar">
                    <div class="bear-hp-left" width="100%">
                        <div class="bear-hp-percent" data-bear-hp="100/100" width="50%"></div>
                        <div class="bear-shield-percent" width="50%"></div>
                    </div>
                </div>
                <div class="bear-mp-bar">
                    <div class="bear-mp-percent" data-bear-mp="10/10"></div>
                </div>
                <div class="bear">
                    <img src="./assets/img/base/base2.png" alt="" class="display-base">
                    <img src="./assets/img/eyes/eyes10.png" alt="" class="display-eyes">
                    <img src="./assets/img/mouth/mouth0.png" alt="" class="display-mouth">
                    <img src="./assets/img/glasses/glasses0.png" alt="" class="display-glasses">
                    <img src="./assets/img/hat/hat29.png" alt="" class="display-hat">
                    <img src="./assets/img/clothes/clothes25.png" alt="" class="display-clothes">
                    <img src="./assets/img/overcoat/overcoat0.png" alt="" class="display-overcoat">
                </div>
                <div class="bear-stats">
                    <p>Naruto</p>
                    
                </div>
            </div>
            <div class="bear-container">
                <div class="bear-hp-bar">
                    <div class="bear-hp-left" width="100%">
                        <div class="bear-hp-percent" data-bear-hp="100/100" width="50%"></div>
                        <div class="bear-shield-percent" width="50%"></div>
                    </div>
                </div>
                <div class="bear-mp-bar">
                    <div class="bear-mp-percent" data-bear-mp="10/10"></div>
                </div>
                <div class="bear">
                    <img src="./assets/img/base/base2.png" alt="" class="display-base">
                    <img src="./assets/img/eyes/eyes10.png" alt="" class="display-eyes">
                    <img src="./assets/img/mouth/mouth0.png" alt="" class="display-mouth">
                    <img src="./assets/img/glasses/glasses0.png" alt="" class="display-glasses">
                    <img src="./assets/img/hat/hat29.png" alt="" class="display-hat">
                    <img src="./assets/img/clothes/clothes25.png" alt="" class="display-clothes">
                    <img src="./assets/img/overcoat/overcoat0.png" alt="" class="display-overcoat">
                </div>
                <div class="bear-stats">
                    <p>Naruto</p>
                    
                </div>
            </div>
        </div>
        <button class="attack-button">Triple Strike</button>
        `)
        
    }

    async init(container){
        this.createElement()
        container.appendChild(this.element)
        await new Promise((resolve, reject)=>{
            this.element.querySelector('.attack-button').addEventListener('click', ()=>{
                resolve()
            })
        })
        this.element.querySelector('.attack-button').remove()
        console.log('attacking!')
        let targets = []
        const enemiesAlive = document.querySelectorAll('.Battle_enemy .img').length
        let targetAmount = 3
        if(enemiesAlive < targetAmount){
            targetAmount = enemiesAlive
        }
        await new Promise((resolve, reject)=>{
            if(targetAmount === 1 && enemiesAlive === 1){
                targets.push(0)
                return resolve()
                
            }
            const selectTextEl = document.createElement('p')
            selectTextEl.className = "select-target select-false"
            selectTextEl.textContent = `Select ${targetAmount} target(s)`
            this.element.append(selectTextEl)
            let select = false
            this.element.querySelector('.select-target').addEventListener('click', ()=>{
                if(!select){
                    return
                }
                this.element.querySelectorAll('.targeting').forEach(x=>{
                    x.classList.remove("selected")
                })
                this.element.querySelector('.select-target').remove()
                resolve()
            })
            this.element.querySelectorAll('.Battle_enemy .img').forEach((target, i) => {
                target.classList.add("targeting")
                target.addEventListener('click', ()=>{
                    if(targets.includes(i)){
                        targets = [...targets.slice(0, targets.indexOf(i)), ...targets.slice(targets.indexOf(i) + 1)]
                        target.classList.remove('selected')
                        if(targets.length !== targetAmount){
                            select = false
                            this.element.querySelector('.select-target').textContent = `Select ${targetAmount - targets.length} target(s)`
                            this.element.querySelector('.select-target').classList.remove("select-true")
                            this.element.querySelector('.select-target').classList.add("select-false")
                        }
                    }else{
                        if(targets.length < targetAmount){
                            targets.push(i)
                            target.classList.add('selected')
                            this.element.querySelector('.select-target').textContent = `Select ${targetAmount - targets.length} target(s)`
                            if(targets.length === targetAmount){
                                select = true
                            this.element.querySelector('.select-target').textContent = "Confirm"
                            this.element.querySelector('.select-target').classList.add("select-true")
                            this.element.querySelector('.select-target').classList.remove("select-false")
                            }
                        }
                    }
                })
            })
        })
        for(let i = 0; i < targets.length; i++){
            console.log(targets[i])
            this.element.querySelector('.Battle_hero .img:nth-child(2) .bear').classList.add(`battle-attack-right-1-${targets[i] + 3}`)
            await wait(300)
            const damageEl = document.createElement('p')
            damageEl.textContent = "10 damage"
            damageEl.classList.add("damage")
            this.element.querySelector(`.Battle_enemy .img:nth-child(${targets[i] + 1})`).append(damageEl)
            this.element.querySelector(`.Battle_enemy .img:nth-child(${targets[i] + 1}) .bear`).classList.add(`hit`)
            await wait(300)
            this.element.querySelector('.Battle_hero .img:nth-child(2) .bear').classList.remove(`battle-attack-right-1-${targets[i] + 3}`)
            this.element.querySelector(`.Battle_enemy .img:nth-child(${targets[i] + 1}) .bear`).classList.remove(`hit`)
            await wait(1000)
            this.element.querySelector(`.Battle_enemy .img:nth-child(${targets[i] + 1}) .damage`).remove()
        }
    }
}


async function wait(ms){
    await new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve()
        }, ms)
    })
}