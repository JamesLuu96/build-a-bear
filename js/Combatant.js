class Combatant {
    constructor(config, battle) {
      this.mp = 5 + (config.intelligence * 2) + (config.level * 5)
      this.hp = 30 + (config.vitality * 2) + (config.level * 5) + (Math.floor(config.level / 10) * 100)
      this.shield = 0
      this.xp = 0
      this.bonusDef = 0
      this.bonusMDef = 0
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      })
      
      if(this.level === undefined){
        this.level = 1
      }
      this.maxXp = this.xpMax
      this.maxHp = 30 + (this.vitality * 2) + (this.level * 5) + (Math.floor(this.level / 10) * 100)
      this.maxMp = 5 + (config.intelligence * 2) + (config.level * 5)
      this.status = {}
      this.battle = battle;
      this.statPoints = this.level * 5
      this.xpGainedFromWinning = (this.level * 5.5) + 5
    }

    isAlive(){
      return this.hp > 0
    }

    get def(){
      return this.bonusDef + this.defLevel
    }

    get mdef(){
      return this.bonusMDef + this.mdefLevel
    }

    get xpMax() {
      const num = Math.pow((this.level + 1) / .3, 2)
      return Math.round(num * 100) / 100
    }

    get xpPercent() {
      const percent = (this.xp / this.xpMax) * 100
      return percent > 0 ? percent : 0;
    }
  
    get hpPercent() {
      const percent = this.hp / (this.hp + this.shield) * 100
      return percent > 0 ? percent : 0;
    }

    get shieldPercent() {
      // console.log(this.name, this.shield)
      const percent = this.shield / (this.hp + this.shield) * 100;
      return percent > 0 ? percent : 0;
    }

    get totalHpPercent() {
      if(this.hp + this.shield >= this.maxHp){
        return 100
      }
      const percent = (this.hp + this.shield) / this.maxHp * 100
      return percent > 0 ? percent : 0;
    }
  
    get mpPercent() {
      return this.mp / this.maxMp * 100;
    }
  
    get isActive() {
      return this.battle.activeCombatants[this.team] === this.id;
    }

    levelUp(){
      this.update({level: this.level + 1, hp: this.maxHp, mp: this.maxMp})
      this.statPoints += 5
      this.xp = 0
    }

    async giveXp(amount) {
      await new Promise(resolve=>{
        amount = Math.round(amount)
        const quickAmount = amount / 20
        const step = async () => {
          if (amount > 0) {
            if((this.maxXp - this.xp) <= quickAmount){
              amount -= (this.maxXp - this.xp)
              this.xp = this.maxXp
            }else{
              amount -= quickAmount
              this.xp += quickAmount
            }
            
            //Check if we've hit level up point
            if (this.xp >= this.maxXp) {
              this.levelUp()
              const pEl = document.createElement('p')
              pEl.classList.add('damage')
              pEl.textContent = "Level Up!"
              pEl.style.color = 'yellow'
              pEl.addEventListener('animationend', ()=>{
                pEl.remove()
              }, {once: true})
              this.combatantElement.appendChild(pEl)
            }
            
            this.update()
            await wait(40)
            requestAnimationFrame(step);
            return;
          }
          resolve();
        }
        requestAnimationFrame(step);
      })
    }

    addStatus(status){
      if(this.status[status.name]){
        this.deleteStatus(this.status[status.name])
      }
      if(status.hasElement){
        const statusDivEl = document.createElement('div')
        statusDivEl.classList.add(status.className)
        statusDivEl.innerHTML = `<img src="./assets/img/skills/content/status/${status.img}.png" alt="">`
        this.combatantElement.querySelector('.buffs').appendChild(statusDivEl)
      }
      
      // this.status[status.name] = {
      //   className: status.className,
      //   newlyApplied: status.newlyApplied ? true : false,
      //   duration: status.duration,
      //   persistent: status.persistent
      // }
      this.status[status.name] = {...status}

      if(status.duration){
        this.combatantElement.querySelector(`.buffs .${status.className}`).setAttribute("data-timer", status.duration)
      }

      if(status.name === "defup"){
        this.bonusDef += status.def
        this.bonusMDef += status.mdef
      }
    }

    decrementStatus(status){
      if(this.status[status.name].newlyApplied){
        this.status[status.name].newlyApplied = false
        return
      }
      this.status[status.name].duration--
      if(this.status[status.name].duration === 0){
        this.deleteStatus(status)
      }else{
        this.combatantElement.querySelector(`.buffs .${this.status[status.name].className}`).setAttribute("data-timer", this.status[status.name].duration)
      }
    }

    deleteStatus(status){
      if(status.hasElement)this.combatantElement.querySelector(`.buffs .${this.status[status.name].className}`).remove()
      if(status.name === "defup"){
        this.bonusDef -= status.def
        this.bonusMDef -= status.mdef
      }
      delete this.status[status.name]
    }
  
    createElement() {
      this.combatantElement = document.createElement("div");
      this.combatantElement.classList.add("bear-container");
      this.combatantElement.setAttribute("data-combatant", this.id);
      this.combatantElement.innerHTML = (`
      <div class="bear-level-container" data-level="${this.level}">
          <div class="bear-xp-bar">
              <div class="bear-xp-percent" style="width: 20%;"></div>
          </div>
      </div>
      <div class="bear-hp-bar">
      <div class="bear-hp-left" style="width: 100%;">
          <div class="bear-hp-percent" data-bear-hp="100/100" style="width: 100%;"></div>
          <div class="bear-shield-percent" style="width: 0%;"></div>
      </div>
      </div>
      <div class="bear-mp-bar">
          <div class="bear-mp-percent" data-bear-mp="10/10" style="width: 100%;"></div>
      </div>
      <div class="bear-stats">
          <p>${this.name}</p>
      </div>
      <div class="buffs"></div>
      `);
      
      this.combatantSprite = document.createElement("div")
      this.combatantSprite.classList.add("bear")
      if(this.hp <= 0){
        this.combatantSprite.classList.add("inactive")
      }
      // console.log(this)
      this.characterSprite.drawBear(this.combatantSprite)
      this.combatantElement.appendChild(this.combatantSprite)

      this.totalHpBar = this.combatantElement.querySelector(".bear-hp-left");
      this.hpBar = this.combatantElement.querySelector(".bear-hp-percent");
      this.shieldBar = this.combatantElement.querySelector(".bear-shield-percent");
      this.mpBar = this.combatantElement.querySelector(".bear-mp-percent");
      this.xpBar = this.combatantElement.querySelector(".bear-xp-percent");
      this.levelEl = this.combatantElement.querySelector('.bear-level-container')
    }

    takeDamage(damage){
      const diff = damage - this.shield
      if(diff < 0){
        this.update({shield: diff * -1})
      }else{
        this.update({shield: 0, hp: Math.max(0, this.hp - diff)})
      }
    }

    async displayText(config){
      // const config = {
      //   text: "Defense Up",
      //   color: "lightblue"
      // }
      const pEl = document.createElement('p')
      pEl.classList.add('damage')
      pEl.textContent = config.text
      pEl.classList.add(...config.classNames || "")
      pEl.style.color = config.color || ''
      pEl.addEventListener('animationend', ()=>{
        pEl.remove()
      }, {once: true})
      this.combatantElement.appendChild(pEl)
    }

    async calcDamage(config){
      let {caster, damage, type} = config
      const target = this
      if(type === "physical"){

      }else if(type === "magical"){

      }else if(type === "special"){

      }
    }

    async startDamage(config){
      console.log(this.name, this.def)
      let {caster, damage, color, hitTime} = config
      let crit = false
      console.log(damage)
      if(typeof damage === "number"){
        damage = Math.max(0, damage)

        if(caster?.status?.rage){
          damage = Math.ceil(damage * 1.50)
        }
        if(caster?.status?.oneAttack){
          damage *= 2
          caster.deleteStatus('oneAttack')
          console.log('deleted buff')
        }
        const random = Math.floor(Math.random() * 100) + 1
        console.log(`${random + (Math.floor(this.crit/5))} <= ${caster.crit * .75}`)
        if(random + (Math.floor(this.crit / 5)) <= (caster.crit * .75)){
          damage = Math.floor(1.4 * damage)
          crit = true
        }
        damage = Math.floor((100/(100+this.def)) * damage)

        if(caster.status.physicalweak){
          const percent = 1 - (caster.status.physicalweak.debuff * .01)
          damage = Math.floor(damage * percent)
          caster.deleteStatus(caster.status.physicalweak)
        }

        if(this.status.withdraw){
          const percent = 1 - (this.status.withdraw.damage_reduction * .01)
          damage = Math.floor(damage * percent)
        }
        this.takeDamage(damage)
        await document.querySelector(':root').style.setProperty('--hitPositionX', `${this.id > 3 ? 20: -20}%`)
        await document.querySelector(':root').style.setProperty('--hitRotate', `${this.id > 3 ? 10: -10}deg`)
        await document.querySelector(':root').style.setProperty('--hitTime', hitTime ? hitTime : '.5s')
        if(config.classNames){
          this.combatantElement.querySelector(`.bear`).classList.add(...config.classNames)
          this.combatantElement.querySelector(`.bear`).addEventListener('animationend', ()=>{
            this.combatantElement.querySelector(`.bear`).classList.remove(...config.classNames)
          }, {once: true})
        }else{
          this.combatantElement.querySelector(`.bear`).classList.add("hit")
          this.combatantElement.querySelector(`.bear`).addEventListener('animationend', ()=>{
            this.combatantElement.querySelector(`.bear`).classList.remove("hit")
          }, {once: true})
        }
      }
      const pEl = document.createElement('p')
      pEl.classList.add('damage')
      pEl.textContent = damage
      if(crit){
        pEl.style.color = 'yellow'
        pEl.classList.add('crit')
      } 
      if(color) pEl.style.color = color
      pEl.addEventListener('animationend', ()=>{
        pEl.remove()
      }, {once: true})
      this.combatantElement.appendChild(pEl)
    }

    healDamage(heal){
      this.update({hp: Math.min(this.maxHp, this.hp + heal)})
    }

    useMana(mana){
      this.update({mp: Math.max(0, this.mp - mana)})
    }

    gainMana(mana){
      this.update({mp: Math.min(this.maxMp, this.mp + mana)})
    }

    get mpRegen(){
      return Math.floor(this.intelligence / 10)
    }

    async startHealing(config){
      let {caster, heal, color, hitTime} = config
      if(typeof heal === "number"){
        if(caster.status.healer){
          heal += 5
        }
        this.healDamage(heal)
        await document.querySelector(':root').style.setProperty('--hitPositionX', `${this.id > 3 ? 20: -20}%`)
        await document.querySelector(':root').style.setProperty('--hitRotate', `${this.id > 3 ? 10: -10}deg`)
        await document.querySelector(':root').style.setProperty('--hitTime', hitTime ? hitTime : '.5s')
        if(config.classNames){
          this.combatantElement.querySelector(`.bear`).classList.add(...config.classNames)
          this.combatantElement.querySelector(`.bear`).addEventListener('animationend', ()=>{
            this.combatantElement.querySelector(`.bear`).classList.remove(...config.classNames)
          }, {once: true})
        }else{
          this.combatantElement.querySelector(`.bear`).classList.add("hit")
          this.combatantElement.querySelector(`.bear`).addEventListener('animationend', ()=>{
            this.combatantElement.querySelector(`.bear`).classList.remove("hit")
          }, {once: true})
        }
      }
      const pEl = document.createElement('p')
      pEl.classList.add('damage')
      pEl.textContent = heal
      if(color) pEl.style.color = 'orange'
      pEl.addEventListener('animationend', ()=>{
        pEl.remove()
      }, {once: true})
      this.combatantElement.appendChild(pEl)
    }
  
    update(changes={}) {
      //Update anything incoming
      Object.keys(changes).forEach(key => {
        this[key] = changes[key]
      });
  
      const newHp = 30 + (this.vitality * 2) + (this.level * 5) + Math.floor(this.level / 10) * 100
      if(newHp !== this.maxHp){
        if(newHp > this.maxHp){
          const diff = newHp - this.maxHp
          this.maxHp = newHp
          this.hp = this.hp + diff
        }else{
          this.maxHp = newHp
          if(this.hp > this.maxHp){
            this.hp = this.maxHp
          }
        }
      }
      const newMp = 5 + (this.intelligence * 2) + (this.level * 5)
      if(newMp !== this.maxMp){
        if(newMp > this.maxMp){
          const diff = newMp - this.maxMp
          this.maxMp = newMp
          this.mp = this.mp + diff
        }else{
          this.maxMp = newMp
          if(this.mp > this.maxMp){
            this.mp = this.maxMp
          }
        }
      }

      this.totalHpBar.style.width = `${this.totalHpPercent}%`
      this.hpBar.style.width = `${this.hpPercent}%`
      this.shieldBar.style.width = `${this.shieldPercent}%`
      this.mpBar.style.width = `${this.mpPercent}%`
      this.xpBar.style.width = `${this.xpPercent}%`
      this.hpBar.setAttribute('data-bear-hp', `${this.hp}/${this.maxHp}${this.shield ? `(${this.shield})` : ""}`)
      this.mpBar.setAttribute('data-bear-mp', `${this.mp}/${this.maxMp}`)
      this.levelEl.setAttribute('data-level', this.level)
      this.maxXp = this.xpMax
      this.defLevel = Math.floor(this.vitality)
      this.mdefLevel = Math.floor(this.vitality / 2)

      if(this.hp <= 0){
        this.knockout()
      }

    }

    knockout(){
      this.combatantElement.querySelector('.bear').classList.add('inactive')
      Object.values(this.status).forEach(status=>{
        this.deleteStatus(status)
      })
    }

    init(container) {
      this.createElement();
      container.appendChild(this.combatantElement);
      this.update();
      function getBoundingClientRect(element) {
        const rect = element.getBoundingClientRect();
        const scale = 3
        return {
          top: rect.top / scale,
          right: rect.right / scale,
          bottom: rect.bottom / scale,
          left: rect.left / scale,
          width: rect.width / scale,
          height: rect.height / scale,
          x: rect.x / scale,
          y: rect.y / scale
        };
      }
      this.DOMProperties = getBoundingClientRect(this.combatantSprite)
      
    }
  
  }