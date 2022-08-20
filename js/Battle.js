class Battle {
    constructor() {
      this.combatants = {
        players: [
          new Combatant({
            level: 10,
            name: "Tony",
            vitality: 50,
            strength: 0,
            agility: 0,
            intelligence: 0,
            isCPUControlled: false,
            actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
            characterSprite: new Sprite({clothes: 36, base: 5, glasses: 6})
          }, this),
          // new Combatant({
          //   level: 0,
          //   name: "Jimmy",
          //   vitality: 0,
          //   strength: 0,
          //   agility: 0,
          //   hp: 1,
          //   mp: 2,
          //   intelligence: 0,
          //   isCPUControlled: true,
          //   actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
          //   characterSprite: new Sprite({clothes: 33, base: 2, glasses: 7})
          // }, this),
          // new Combatant({
          //   level: 0,
          //   name: "Jimmy",
          //   vitality: 0,
          //   strength: 0,
          //   agility: 0,
          //   hp: 1,
          //   intelligence: 0,
          //   isCPUControlled: true,
          //   actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
          //   characterSprite: new Sprite({clothes: 33, base: 2, glasses: 7})
          // }, this),
        ],
        enemies: [
          new Combatant({
            level: 15,
            mp: 1,
            name: "Sanchez",
            hp: 1,
            vitality: 0,
            strength: 0,
            agility: 0,
            intelligence: 0,
            isCPUControlled: true,
            actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
            characterSprite: new Sprite({hat: 9, base: 2, eyes: 10, clothes: 25})
          }, this),
          new Combatant({
            level: 12,
            name: "Naruto",
            hp: 1,
            vitality: 0,
            strength: 0,
            agility: 0,
            intelligence: 0,
            isCPUControlled: true,
            actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
            characterSprite: new Sprite({hat: 29, base: 2, eyes: 14, clothes: 35})
          }, this),
          new Combatant({
            level: 12,
            name: "Naruto",
            hp: 1,
            vitality: 0,
            strength: 0,
            agility: 0,
            intelligence: 0,
            isCPUControlled: true,
            actions: [{...Actions.punchAction}, {...Actions.roarAction}, {...Actions.slashAction}, {...Actions.arrowStormAction}],
            characterSprite: new Sprite({hat: 29, base: 2, eyes: 14, clothes: 35})
          }, this),
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
          return new Action({...action, caster: combatant}, this)
        })
        combatant.init(this.element.querySelector('.Battle_player'))
      })

      this.combatants.enemies.forEach((combatant, i) => {
        combatant.id = i + 4;
        combatant.actions = combatant.actions.map(action=>{
          return new Action({...action, caster: combatant}, this)
        })
        const stats = combatant.statPoints / 3
        for(let i = 0; i < stats; i++){
          const stats = ['vitality', 'strength', 'agility', 'intelligence']
          const random = Math.floor(Math.random() * stats.length)
          combatant[stats[random]] += 1
          combatant.statPoints--
        }
        console.log(combatant)
        combatant.init(this.element.querySelector('.Battle_enemy'))
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