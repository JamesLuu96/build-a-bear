class Combatant {
    constructor(config, battle) {
      Object.keys(config).forEach(key => {
        this[key] = config[key];
      })
      this.battle = battle;
    }
  
    get hpPercent() {
      const percent = (this.hp - this.shield) / this.hp * 100
      return percent > 0 ? percent : 0;
    }

    get shieldPercent() {
      const percent = this.shield / this.hp * 100;
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
  
    createElement() {
      this.combatantElement = document.createElement("div");
      this.combatantElement.classList.add("bear-container");
      this.combatantElement.setAttribute("data-combatant", this.id);
      this.combatantElement.innerHTML = (`
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
      `);
      
      this.combatantSprite = document.createElement("div")
      this.combatantSprite.classList.add("bear")
      console.log(this)
      this.characterSprite.drawBear(this.combatantSprite)
      this.combatantElement.appendChild(this.combatantSprite)

      this.totalHpBar = this.combatantElement.querySelector(".bear-hp-left");
      this.hpBar = this.combatantElement.querySelector(".bear-hp-percent");
      this.shieldBar = this.combatantElement.querySelector(".bear-shield-percent");
      this.mpBar = this.combatantElement.querySelector(".bear-mp-percent");
    }
  
    update(changes={}) {
      //Update anything incoming
      Object.keys(changes).forEach(key => {
        this[key] = changes[key]
      });
  
      //Update active flag to show the correct pizza & hud
      // this.combatantElement.setAttribute("data-active", this.isActive);
  
      //Update HP & XP percent fills
      this.totalHpBar.style.width = `${this.totalHpPercent}%`
      this.hpBar.style.width = `${this.hpPercent}%`
      this.shieldBar.style.width = `${this.shieldPercent}%`
      this.mpBar.style.width = `${this.mpPercent}%`
      this.hpBar.setAttribute('data-bear-hp', `${this.hp}/${this.maxHp}${this.shield ? `(${this.shield})` : ""}`)
      this.mpBar.setAttribute('data-bear-mp', `${this.mp}/${this.maxMp}`)

  
      //Update level on screen
      // this.combatantElement.querySelector(".Combatant_level").innerText = this.level;
  
      //Update status
      // const statusElement = this.combatantElement.querySelector(".Combatant_status");
      // if (this.status) {
      //   statusElement.innerText = this.status.type;
      //   statusElement.style.display = "block";
      // } else {
      //   statusElement.innerText = "";
      //   statusElement.style.display = "none";
      // }
    }
  
    getReplacedEvents(originalEvents) {
  
      if (this.status?.type === "clumsy" && utils.randomFromArray([true, false, false])) {
        return [
          { type: "textMessage", text: `${this.name} flops over!` },
        ]
      }
  
      return originalEvents;
    }
  
    getPostEvents() {
      if (this.status?.type === "saucy") {
        return [
          { type: "textMessage", text: "Feelin' saucy!" },
          { type: "stateChange", recover: 5, onCaster: true }
        ]
      } 
      return [];
    }
  
    decrementStatus() {
      if (this.status?.expiresIn > 0) {
        this.status.expiresIn -= 1;
        if (this.status.expiresIn === 0) {
          this.update({
            status: null
          })
          return {
            type: "textMessage",
            text: "Status expired!"
          }
        }
      }
      return null;
    }
  
    init(container) {
      this.createElement();
      container.appendChild(this.combatantElement);
      this.update();
    }
  
  }