class Action{
    constructor(config, battle){
        Object.keys(config).forEach(key => {
            this[key] = config[key];
        })
        this.battle = battle
        this.cooldownTimer = 0
        if(!this.level){
            this.level = 1
        }
    }

    get damage(){
        
    }

    get speed(){
        if(!this.speedList){
            return 3
        }else{
            return this.speedList[this.level]
        }
    }

    get mpCost(){
        if(!this.mpList){
            return
        }else{
            return this.mpList[this.level]
        }
    }

    get cooldown(){
        if(!this.cooldownList){
            return false
        }else{
            return this.cooldownList[this.level]
        }
    }

    onCooldown(){
        return this.cooldownTimer > 0
    }

    startCooldown(notNew){
        if(!this.cooldown) return
        this.cooldownTimer = this.cooldown
        this.newCooldown = notNew ? false : true
    }

    enoughMana(){
        if(this.mpCost === undefined){
            return true
        }
        return this.mpCost <= this.caster.mp
    }

    tickCooldown(reduce){
        if(this.newCooldown){
            delete this.newCooldown
            return
        }
        reduce ? this.cooldownTimer = Math.max(this.cooldownTimer - reduce, 0) : this.cooldownTimer = Math.max(this.cooldownTimer - 1, 0)
    }

    chooseTarget(target){
        this.target = target
    }

    async startAction(resolve){
        if(this.caster.hp <= 0){
            resolve()
            return
        }
        const text = `${this.caster.name} uses ${this.name}!`
        const pEl = document.createElement("p")
        pEl.classList.add("Battle-text")
        pEl.textContent = text
        this.battle.element.append(pEl)
        this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add('animation-bounce')
        this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove('animation-bounce')
        })
        // message.init( this.battle.element )
        await wait(1000)
        pEl.remove()
        if(!this.enoughMana()){
            const pEl = document.createElement('p')
            pEl.classList.add('damage')
            pEl.textContent = `Not enough mana!`
            pEl.style.color = 'blue'
            pEl.addEventListener('animationend', ()=>{
                pEl.remove()
            }, {once: true})
            this.caster.combatantElement.appendChild(pEl)
            resolve()
        }else{
            this.startCooldown()
            if(this.mpCost){
                this.caster.useMana(this.mpCost)
            }
            await this.resolveAction()
            resolve()
        }
    }

}

class PunchAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    get damage(){
        const level = this.level
        return Math.floor(this.caster.strength / this.skillObj.STRENGTH[this.level]) + this.skillObj.BASE[this.level]
    }

    async resolveAction(){
        for(let i = 0; i < this.target.length; i++){
            const target = this.target[i]
            if(target.hp <= 0 || this.caster.hp <= 0){
                continue
            }
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            await document.querySelector(':root').style.setProperty('--positionX', `${x}px`)
            await document.querySelector(':root').style.setProperty('--positionY', `${y}px`)

            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add(`animation-attack`)
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
                this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove(`animation-attack`)
            }, {once: true})
            await wait(300)
            const miss = Math.floor(Math.random() * 50)
            let damage = Math.floor(Math.random() * ((this.damage + 2) - (this.damage - 2)) + (this.damage - 2))
            if(miss === 0){
                damage = "Missed!"
            }
            await target.startDamage({caster: this.caster, damage, hitTime: '.5s'})            
            await wait(600)
        }
    }
}

class SlashAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    async resolveAction(){
        for(let i = 0; i < this.target.length; i++){
            const target = this.target[i]
            if(target.hp <= 0 || this.caster.hp <= 0){
                continue
            }
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            // console.log(target.id)
            await document.querySelector(':root').style.setProperty('--positionX', `${x}px`)
            await document.querySelector(':root').style.setProperty('--positionY', `${y}px`)

            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add(`animation-attack`)
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
                this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove(`animation-attack`)
            }, {once: true})
            await wait(300)
            const miss = Math.floor(Math.random() * 50)
            let damage = Math.floor(Math.random() * ((this.damage + 2) - (this.damage - 2)) + (this.damage - 2))
            if(miss === 0){
                damage = "Missed!"
            }
            await target.startDamage({caster: this.caster, damage, classNames: ['hit', 'animation-slash'], hitTime: '.5s'})
            await wait(500)
        }
    }
}

class ArrowStormAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    async resolveAction(){
        let j = 0
        const amount = Math.floor(Math.random() * 5)
        for(let i = 0; i < (amount === 0 ? 4 : 3); i++){
            const filteredEnemies = this.target.filter(e=>e.hp > 0)
            const target = filteredEnemies[Math.floor(Math.random() * filteredEnemies.length)]
            if(!target){
                return
            }
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            const angle = Math.atan(y/x) * (180/Math.PI)
            const arrowEl = document.createElement('div')
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"]`).appendChild(arrowEl)
            await document.querySelector(':root').style.setProperty(`--positionX${j}`, `${x}px`)
            await document.querySelector(':root').style.setProperty(`--positionY${j}`, `${y}px`)
            await document.querySelector(':root').style.setProperty(`--positionRotate${j}`, `${angle}deg`)
            arrowEl.classList.add(this.caster.id < 4 ? `arrow-attack${j}` : `arrow-attack-reverse${j}`, 'arrow')
            arrowEl.innerHTML = `<img src="./assets/img/skills/content/arrow${Math.floor(Math.random() * 2) + 1}.png" alt="">`
            arrowEl.addEventListener('animationend', ()=>{
                arrowEl.remove()
            }, {once: true})
            await wait(300)
            let damage = Math.floor(Math.random() * (this.damage - (this.damage - 3)) + (this.damage - 3))
            if(Math.floor(Math.random() * 50) === 0){
                damage = "Missed!"
            }
            await target.startDamage({caster: this.caster, damage, hitTime: ".25s"})
            j++ > 1 ? j = 0 : ''
        }
        await wait(1000)
    }
}

class RoarAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    async resolveAction(){
        const filteredTargets = this.target.filter(p=>p.hp > 0)
        for(let i = 0; i < filteredTargets.length; i++){
            this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`).classList.add('animation-bounce')
            this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`).addEventListener('animationstart', async ()=>{
                // console.log(filteredTargets[i].id)
                const el = this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`)
                setTimeout(function(){
                    el.classList.remove('animation-bounce')
                    el.classList.add('enraged-buff')
                    el.addEventListener('animationstart', ()=>{
                        setTimeout(function(){
                            el.classList.remove('enraged-buff')
                        }, 1000)
                        // console.log(filteredTargets[i])
                    },{once: true})
                }, 800)
            },{once: true})
            wait(300)
            filteredTargets[i].startDamage({caster: this.caster, damage: "Enraged!", color: "orange"})
            const statusObj = {
                name: "rage", 
                hasElement: true,
                className: "buff-enraged", 
                duration: 2, 
                img: "enrage"
            }
            if(filteredTargets[i].id === this.caster.id){
                statusObj.newlyApplied = true
            }
            filteredTargets[i].addStatus(statusObj)
            // filteredTargets[i].addStatus({name: "burn", className: "buff-one-attack", persistent: true, img: "enrage", duration: 0})
        }
        await wait(1000)
    }
}

class AbsorptionAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    async resolveAction(){
        
    }
}

class BlueboneCrusherAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    get damage(){
        const level = this.level
        const base = this.skillObj.BASE[level]
        const int = (this.skillObj.INTELLIGENCE[level] * .01) * this.caster.intelligence
        return Math.floor(base + int)
    }

    async resolveAction(){
        await Promise.all(this.target.filter(x=>x.hp).map((target, i)=>new Promise(async resolve=>{
            if(this.caster.hp <= 0) resolve()
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            const angle = Math.atan(y/x) * (180/Math.PI)
            const arrowEl = document.createElement('div')
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"]`).appendChild(arrowEl)
            await document.querySelector(':root').style.setProperty(`--positionX${i}`, `${x}px`)
            await document.querySelector(':root').style.setProperty(`--positionY${i}`, `${y}px`)
            await document.querySelector(':root').style.setProperty(`--positionRotate${i}`, `${angle}deg`)
            arrowEl.classList.add(this.caster.id < 4 ? `arrow-attack${i}` : `arrow-attack-reverse${i}`, 'cross')
            arrowEl.innerHTML = `<img src="https://www.pngkey.com/png/full/61-612472_minimalist-x-mark-clip-art-medium-size-yellow.png" alt="">`
            arrowEl.addEventListener('animationend', ()=>{
                arrowEl.remove()
            }, {once: true})
            await wait(300)
            let damage = Math.floor(Math.random() * (this.damage - (this.damage - 3)) + (this.damage - 3))
            const statusObj = {
                name: "magicalweak", 
                className: "buff-magicalweak", 
                hasElement: true,
                persistent: true,
                img: "magicalweak", 
                debuff: this.skillObj.DEBUFF[this.level]
            }
            target.addStatus(statusObj)
            
            target.startDamage({caster: this.caster, damage, hitTime: '.25s'})            
            await wait(600)
            resolve()
        })))
        await wait(200)

        // for(let i = 0; i < this.target.length; i++){
        //     const target = this.target[i]
        //     if(target.hp <= 0 || this.caster.hp <= 0){
        //         continue
        //     }
        //     const x = target.DOMProperties.x - this.caster.DOMProperties.x
        //     const y = target.DOMProperties.y - this.caster.DOMProperties.y
        //     const angle = Math.atan(y/x) * (180/Math.PI)
        //     const arrowEl = document.createElement('div')
        //     this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"]`).appendChild(arrowEl)
        //     await document.querySelector(':root').style.setProperty(`--positionX${i}`, `${x}px`)
        //     await document.querySelector(':root').style.setProperty(`--positionY${i}`, `${y}px`)
        //     await document.querySelector(':root').style.setProperty(`--positionRotate${i}`, `${angle}deg`)
        //     arrowEl.classList.add(this.caster.id < 4 ? `arrow-attack${i}` : `arrow-attack-reverse${i}`, 'cross')
        //     arrowEl.innerHTML = `<img src="https://www.pngkey.com/png/full/61-612472_minimalist-x-mark-clip-art-medium-size-yellow.png" alt="">`
        //     arrowEl.addEventListener('animationend', ()=>{
        //         arrowEl.remove()
        //     }, {once: true})
        //     await wait(300)
        //     let damage = Math.floor(Math.random() * (this.damage - (this.damage - 3)) + (this.damage - 3))
        //     const statusObj = {
        //         name: "magicalweak", 
        //         className: "buff-magicalweak", 
        //         hasElement: true,
        //         persistent: true,
        //         img: "magicalweak", 
        //         debuff: this.skillObj.DEBUFF[this.level]
        //     }
        //     target.addStatus(statusObj)
            
        //     target.startDamage({caster: this.caster, damage, hitTime: '.25s'})            
        //     await wait(600)
        // }
    }
}

class ChargeAttackAction extends Action{
    constructor(config, battle){
        super(config, battle)
        this.level = 3
    }

    get damage(){
        const level = this.level
        const base = this.skillObj.BASE[level]
        const strength = (this.skillObj.STRENGTH[level] * .01) * this.caster.strength
        return Math.floor(base + strength)
    }

    async startAction(resolve){
        if(this.caster.hp <= 0){
            resolve()
            return
        }
        let text;
        if(this.caster.chargingSkill) this.caster.chargingSkill.cd--
        if(!this.caster.chargingSkill || this.caster.chargingSkill?.cd){
            text = `${this.caster.name} is charging a powerful move!`
        }else{
            text = `${this.caster.name} uses ${this.name}!`
        }
        const pEl = document.createElement("p")
        pEl.classList.add("Battle-text")
        pEl.textContent = text
        this.battle.element.append(pEl)
        this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add('animation-bounce')
        this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove('animation-bounce')
        })
        // message.init( this.battle.element )
        await wait(1300)
        pEl.remove()
        if(!this.enoughMana() && !this.caster.chargingSkill){
            const pEl = document.createElement('p')
            pEl.classList.add('damage')
            pEl.textContent = `Not enough mana!`
            pEl.style.color = 'blue'
            pEl.addEventListener('animationend', ()=>{
                pEl.remove()
            }, {once: true})
            this.caster.combatantElement.appendChild(pEl)
            resolve()
        }else{
            if(!this.caster.chargingSkill){
                this.caster.chargingSkill = {target: this.target, action: this, cd: 1}
                resolve()
                return
            }
            if(this.caster.chargingSkill.cd === 0){
                this.startCooldown()
                if(this.mpCost){
                    this.caster.useMana(this.mpCost)
                }
                await this.resolveAction()
            }
            resolve()
        }
    }

    async resolveAction(){
        // console.log('attack!')
        for(let i = 0; i < this.target.length; i++){
            const target = this.target[i]
            if(target.hp <= 0 || this.caster.hp <= 0){
                continue
            }
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            await document.querySelector(':root').style.setProperty('--positionX', `${x}px`)
            await document.querySelector(':root').style.setProperty('--positionY', `${y}px`)

            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add(`animation-attack`)
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
                this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove(`animation-attack`)
            }, {once: true})
            await wait(300)
            const miss = Math.floor(Math.random() * 50)
            let damage = Math.floor(Math.random() * ((this.damage + 2) - (this.damage - 2)) + (this.damage - 2))
            if(miss === 0){
                damage = "Missed!"
            }
            await target.startDamage({caster: this.caster, damage, hitTime: '.5s'})            
            await wait(600)
        }
        delete this.caster.chargingSkill
        // await wait(300)
    }
}

class ChargeBlastAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    get damage(){
        const level = this.level
        const base = this.skillObj.BASE[level]
        const int = (this.skillObj.INTELLIGENCE[level] * .01) * this.caster.intelligence
        return Math.floor(base + int)
    }

    async startAction(resolve){
        if(this.caster.hp <= 0){
            resolve()
            return
        }
        let text;
        if(this.caster.chargingSkill) this.caster.chargingSkill.cd--
        if(!this.caster.chargingSkill || this.caster.chargingSkill?.cd){
            text = `${this.caster.name} is charging a powerful move!`
        }else{
            text = `${this.caster.name} uses ${this.name}!`
        }
        const pEl = document.createElement("p")
        pEl.classList.add("Battle-text")
        pEl.textContent = text
        this.battle.element.append(pEl)
        this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add('animation-bounce')
        this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove('animation-bounce')
        })
        // message.init( this.battle.element )
        await wait(1300)
        pEl.remove()
        if(!this.enoughMana() && !this.caster.chargingSkill){
            const pEl = document.createElement('p')
            pEl.classList.add('damage')
            pEl.textContent = `Not enough mana!`
            pEl.style.color = 'blue'
            pEl.addEventListener('animationend', ()=>{
                pEl.remove()
            }, {once: true})
            this.caster.combatantElement.appendChild(pEl)
            resolve()
        }else{
            if(!this.caster.chargingSkill){
                this.caster.chargingSkill = {target: this.target, action: this, cd: 1}
                resolve()
                return
            }
            if(this.caster.chargingSkill.cd === 0){
                this.startCooldown()
                if(this.mpCost){
                    this.caster.useMana(this.mpCost)
                }
                await this.resolveAction()
            }
            resolve()
        }
    }

    async resolveAction(){
        // console.log('attack!')
        for(let i = 0; i < this.target.length; i++){
            const target = this.target[i]
            if(target.hp <= 0 || this.caster.hp <= 0){
                continue
            }
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            await document.querySelector(':root').style.setProperty('--positionX', `${x}px`)
            await document.querySelector(':root').style.setProperty('--positionY', `${y}px`)

            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add(`animation-attack`)
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
                this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove(`animation-attack`)
            }, {once: true})
            await wait(300)
            const miss = Math.floor(Math.random() * 50)
            let damage = Math.floor(Math.random() * ((this.damage + 2) - (this.damage - 2)) + (this.damage - 2))
            if(miss === 0){
                damage = "Missed!"
            }
            await target.startDamage({caster: this.caster, damage, hitTime: '.5s'})            
            await wait(600)
        }
        delete this.caster.chargingSkill
        // await wait(300)
    }
}

class DefupAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    async resolveAction(){
        const filteredTargets = this.target.filter(p=>p.hp > 0)
        for(let i = 0; i < filteredTargets.length; i++){
            this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`).classList.add('animation-bounce')
            this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`).addEventListener('animationstart', async ()=>{
                // console.log(filteredTargets[i].id)
                const el = this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`)
                setTimeout(function(){
                    el.classList.remove('animation-bounce')
                    el.classList.add('defup-buff')
                    el.addEventListener('animationstart', ()=>{
                        setTimeout(function(){
                            el.classList.remove('defup-buff')
                        }, 1000)
                    },{once: true})
                }, 800)
            },{once: true})
            wait(300)
            const textConfig = {
                text: "Defense Up",
                color: "lightblue"
            }
            filteredTargets[i].displayText(textConfig)
            const statusObj = {
                name: "defup", 
                className: "buff-defup", 
                hasElement: true,
                duration: this.skillObj.DURATION[this.level], 
                img: "defup", 
                def: this.skillObj.DEFENSE[this.level], 
                mdef: this.skillObj.MDEFENSE[this.level]
            }
            if(filteredTargets[i].id === this.caster.id){
                statusObj.newlyApplied = true
            }
            filteredTargets[i].addStatus(statusObj)
        }
        await wait(1000)
    }
}

class PowersurgeAction extends Action{
    constructor(config, battle){
        super(config, battle)
        this.level = 3
    }

    get damage(){
        const level = this.level
        const hp_percent = (this.skillObj.HP_PERCENT[level] * .01) * this.caster.hp
        return Math.floor(hp_percent)
    }

    async resolveAction(){
        for(let i = 0; i < this.target.length; i++){
            const target = this.target[i]
            if(target.hp <= 0 || this.caster.hp <= 0){
                continue
            }
            const damage = this.damage
            await this.caster.startDamage({caster: this.caster, damage, hitTime: '.5s', color: "red"})
            await wait(600)
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            await document.querySelector(':root').style.setProperty('--positionX', `${x}px`)
            await document.querySelector(':root').style.setProperty('--positionY', `${y}px`)

            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add(`animation-attack`)
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
                this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove(`animation-attack`)
            }, {once: true})
            await wait(300)
            await target.startDamage({caster: this.caster, damage, hitTime: '.5s'})            
            await wait(600)
        }
    }
}

class ProtectionAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    async resolveAction(){
        for(let i = 0; i < this.target.length; i++){
            const target = this.target[i]
            if(target.hp <= 0 || this.caster.hp <= 0){
                continue
            }
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            await document.querySelector(':root').style.setProperty('--positionX', `${x}px`)
            await document.querySelector(':root').style.setProperty('--positionY', `${y}px`)

            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add(`animation-attack`)
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
                this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove(`animation-attack`)
            }, {once: true})
            await wait(300)
            this.battle.element.querySelector(`.bear-container[data-combatant="${target.id}"] .bear`).classList.add('protection-buff')
            this.battle.element.querySelector(`.bear-container[data-combatant="${target.id}"] .bear`).addEventListener('animationend', ()=>{
                this.battle.element.querySelector(`.bear-container[data-combatant="${target.id}"] .bear`).classList.remove('protection-buff')
               
            },{once: true})
                     
            if(i !== this.target.length - 1)await wait(800)
        }
        await wait(1200)
    }
}

class RedboneCrusherAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    get damage(){
        const level = this.level
        return Math.floor(this.skillObj.BASE[level] + ((this.skillObj.STRENGTH[level] * .01) * this.caster.strength))
    }

    async resolveAction(){
        for(let i = 0; i < this.target.length; i++){
            const target = this.target[i]
            if(target.hp <= 0 || this.caster.hp <= 0){
                continue
            }
            const x = target.DOMProperties.x - this.caster.DOMProperties.x
            const y = target.DOMProperties.y - this.caster.DOMProperties.y
            await document.querySelector(':root').style.setProperty('--positionX', `${x}px`)
            await document.querySelector(':root').style.setProperty('--positionY', `${y}px`)

            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add(`animation-attack`)
            this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationend', ()=>{
                this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.remove(`animation-attack`)
            }, {once: true})
            await wait(300)
            const miss = Math.floor(Math.random() * 50)
            let damage = Math.floor(Math.random() * ((this.damage + 2) - (this.damage - 2)) + (this.damage - 2))
            if(miss === 0){
                damage = "Missed!"
            }else{
                const statusObj = {
                    name: "physicalweak", 
                    className: "buff-physicalweak", 
                    hasElement: true,
                    persistent: true,
                    img: "physicalweak", 
                    debuff: this.skillObj.DEBUFF[this.level]
                }
                target.addStatus(statusObj)
            }
            await target.startDamage({caster: this.caster, damage, hitTime: '.5s'})            
            await wait(600)
        }
    }
}

class ReflectAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    async resolveAction(){
        const filteredTargets = this.target.filter(p=>p.hp > 0)
        for(let i = 0; i < filteredTargets.length; i++){
            this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`).classList.add('animation-bounce')
            this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`).addEventListener('animationstart', async ()=>{
                // console.log(filteredTargets[i].id)
                const el = this.battle.element.querySelector(`.bear-container[data-combatant="${filteredTargets[i].id}"] .bear`)
                setTimeout(function(){
                    el.classList.remove('animation-bounce')
                    el.classList.add('enraged-buff')
                    el.addEventListener('animationstart', ()=>{
                        setTimeout(function(){
                            el.classList.remove('enraged-buff')
                        }, 1000)
                        // console.log(filteredTargets[i])
                    },{once: true})
                }, 800)
            },{once: true})
            wait(300)
            filteredTargets[i].startDamage({caster: this.caster, damage: "Enraged!", color: "orange"})
            const statusObj = {name: "rage", className: "buff-enraged", duration: 2, img: "enrage"}
            if(filteredTargets[i].id === this.caster.id){
                statusObj.newlyApplied = true
            }
            filteredTargets[i].addStatus(statusObj)
            filteredTargets[i].addStatus({name: "burn", className: "buff-one-attack", persistent: true, img: "enrage", duration: 0})
        }
        await wait(1000)
    }
}

class WithdrawAction extends Action{
    constructor(config, battle){
        super(config, battle)
    }

    async resolveAction(){
        this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).classList.add('animation-bounce')
        this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`).addEventListener('animationstart', async ()=>{
            // console.log(this.caster.id)
            const el = this.battle.element.querySelector(`.bear-container[data-combatant="${this.caster.id}"] .bear`)
            setTimeout(function(){
                el.classList.remove('animation-bounce')
                el.classList.add('defup-buff')
                el.addEventListener('animationstart', ()=>{
                    setTimeout(function(){
                        el.classList.remove('defup-buff')
                    }, 1000)
                },{once: true})
            }, 800)
        },{once: true})
        wait(300)
        // const textConfig = {
        //     text: "Defense Up",
        //     color: "lightblue"
        // }
        // this.caster.displayText(textConfig)
        const statusObj = {
            name: "withdraw", 
            className: "buff-withdraw", 
            hasElement: true,
            duration: 1, 
            img: "withdraw", 
            damage_reduction: this.skillObj.DAMAGE_REDUCTION[this.level],
        }
        statusObj.newlyApplied = true
        this.caster.addStatus(statusObj)
        
        await wait(1000)
    }
}