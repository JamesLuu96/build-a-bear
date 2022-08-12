class Battle {
    constructor() {
      this.combatants = [
        new Combatant({
          level: 1,
          maxHp: 100,
          hp: 100,
          maxMp: 100,
          mp: 100,
          name: "Jimmy",
          characterSprite: new Sprite({clothes: 36})
        }, this),
        new Combatant({
          level: 1,
          maxHp: 100,
          hp: 100,
          maxMp: 100,
          mp: 100,
          name: "Naruto",
          characterSprite: new Sprite({hat: 29})
        }, this),
        new Combatant({
          level: 1,
          maxHp: 100,
          hp: 100,
          maxMp: 100,
          mp: 100,
          name: "Naruto",
          characterSprite: new Sprite({hat: 29})
        }, this)
      }
      this.activeCombatants = {
        player: "player1",
        enemy: "enemy1",
      }
    
  
    createElement() {
      this.element = document.createElement("div");
      this.element.classList.add("Battle");
      this.element.innerHTML = (`
        <div class="Battle_player"></div>
        <div class="Battle_enemy"></div>
      `)
    }
  
    init(container) {
      this.createElement();
      container.appendChild(this.element);
  
      Object.keys(this.combatants).forEach(key => {
        let combatant = this.combatants[key];
        combatant.id = key;
        combatant.init(this.element)
      })
  
      this.turnCycle = new TurnCycle({
        battle: this,
        onNewEvent: event => {
          return new Promise(resolve => {
            const battleEvent = new BattleEvent(event, this)
            battleEvent.init(resolve);
          })
        }
      })
      this.turnCycle.init();
  
  
    }
  
  }