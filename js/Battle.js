class Battle {
    constructor() {
      this.combatants = {
        players: [
          new Combatant({
            level: 30,
            name: "Tony",
            vitality: 100,
            strength: 50,
            agility: 0,
            intelligence: 0,
            isCPUControlled: false,
            actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
            characterSprite: new Sprite({clothes: 36, base: 5, glasses: 6})
          }, this),
          // new Combatant({
          //   level: 1,
          //   name: "Cindy",
          //   vitality: 0,
          //   strength: 0,
          //   agility: 0,
          //   // hp: 10,
          //   // mp: 3,
          //   intelligence: 0,
          //   isCPUControlled: true,
          //   actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
          //   characterSprite: new Sprite({hat: 4, clothes: 11, base: 2, glasses: 3, mouth: 8})
          // }, this),
          // new Combatant({
          //   level: 1,
          //   name: "Timmy",
          //   vitality: 0,
          //   strength: 0,
          //   agility: 0,
          //   // hp: 10,
          //   intelligence: 0,
          //   isCPUControlled: true,
          //   actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
          //   characterSprite: new Sprite({clothes: 33, base: 2, glasses: 7})
          // }, this),
        ],
        enemies: [
          new Combatant({
            level: 15,
            // mp: 1,
            name: "Sanchez",
            // hp: 1,
            vitality: 0,
            strength: 0,
            agility: 0,
            intelligence: 0,
            isCPUControlled: true,
            actions: [{...Actions.punchAction}],
            characterSprite: new Sprite({hat: 9, base: 2, eyes: 10, clothes: 25})
          }, this),
          new Combatant({
            level: 8,
            name: "Justin",
            // hp: 1,
            vitality: 0,
            strength: 0,
            agility: 0,
            intelligence: 0,
            actions: [{...Actions.punchAction}],
            isCPUControlled: true,
            characterSprite: new Sprite({hat: 26, base: 2, eyes: 14, clothes: 23, mouth: 10})
          }, this),
          // new Combatant({
          //   level: 12,
          //   name: "Alex",
          //   hp: 1,
          //   vitality: 0,
          //   strength: 0,
          //   agility: 0,
          //   intelligence: 0,
          //   isCPUControlled: true,
          //   actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
          //   characterSprite: new Sprite({hat: 25, base: 2, eyes: 4, clothes: 24, mouth: 6})
          // }, this),
        ]
      }
      // [{...Actions.punch}, {...Actions.roar}, {...Actions.slash}, {...Actions.arrowStorm}
      // this.activeCombatants = {
      //   player: this.combatants.player,
      //   enemy: this.combatants.enemy
      // }
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
  
      this.combatants.players.forEach((combatant, i) => {
        combatant.id = i + 1;
        combatant.actions = combatant.actions.map(action=>{
          return ActionClasses[action.skillName]({...action, caster: combatant}, this)
        })
        combatant.init(this.element.querySelector('.Battle_player'))
      })

      this.combatants.enemies.forEach((combatant, i) => {
        combatant.id = i + 4;
        combatant.actions = combatant.actions.map(action=>{
          return ActionClasses[action.skillName]({...action, caster: combatant}, this)
        })
        const stats = combatant.statPoints / 3
        for(let i = 0; i < stats; i++){
          const stats = ['vitality', 'strength', 'agility', 'intelligence']
          const random = Math.floor(Math.random() * stats.length)
          combatant[stats[1]] += 1
          combatant.statPoints--
        }
        console.log(combatant.strength)
        combatant.init(this.element.querySelector('.Battle_enemy'))
      })

      const eneArrX = [...new Set(this.combatants.enemies.map(x=>x.DOMProperties.x))]
      console.log(eneArrX.reduce((a,b)=>a+b)/2)
      
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