class TurnCycle {
    constructor({ battle, onNewEvent }) {
      this.battle = battle;
      this.onNewEvent = onNewEvent;
      this.round = 1
      // this.startCooldowns()
      // this.allyTeam = "players"
      // this.enemyTeam = "enemies"
    }
  
    async turn() {
      const combatants = this.battle.combatants
      const alivePlayers = combatants.players.filter(x=>x.hp)
      const aliveEnemies = combatants.enemies.filter(x=>x.hp)
      let movesArr = []
      
      for(let i = 0; i < alivePlayers.length; i++){
        const currentPlayer = alivePlayers[i]
        const players = combatants.players
        const enemies = combatants.enemies
        const submission = await this.onNewEvent({
          type: "movesMenu",
          currentPlayer,
          players,
          enemies
        })
        if(submission){
          movesArr.push(submission)
        }
      }

      for(let i = 0; i < aliveEnemies.length; i++){
        const currentPlayer = aliveEnemies[i]
        const players = combatants.enemies
        const enemies = combatants.players
        const submission = await this.onNewEvent({
          type: "movesMenu",
          currentPlayer,
          players,
          enemies
        })
        if(submission){
          movesArr.push(submission)
        }
      }

      // movesArr.forEach(move=>{
      //   console.log(move.action.speed)
      // })
      console.log(movesArr.map(move=>move.action.speed).sort((a,b)=>a-b))
      movesArr = movesArr.sort((a,b)=>{
        return a.action.speed - b.action.speed
      })
      

      for (let i = 0; i < movesArr.length; i++) {
        const event = {
          type: "startMove",
          ...movesArr[i]
        } 
        await this.onNewEvent(event);
        if(this.getWinningTeam()){
          return this.getWinningTeam()
        }

        const {caster} = movesArr[i]
        Object.values(caster.status).forEach(async s=>{
          if(s.name === 'burn'){
            await caster.startDamage({damage: Math.floor(Math.random() * 5), color: "red"})
          }
          if(caster.status[s.name].persistent){
            return
          }
          caster.decrementStatus(s)
        })
      }

      this.regenMana()
      this.reduceCooldowns()
  
      if(!this.getWinningTeam()){
        this.round++
        return this.turn()
      }else{
        return this.getWinningTeam()
      }
      // this.turn();
    }

    regenMana(){
      for(let i = 0; i < this.battle.combatants.players.length; i++){
        const player = this.battle.combatants.players[i]
        if(player.isAlive()){
          player.gainMana(player.mpRegen + 1)
        }
      }

      for(let i = 0; i < this.battle.combatants.enemies.length; i++){
        const enemy = this.battle.combatants.enemies[i]
        if(enemy.isAlive()){
          enemy.gainMana(enemy.mpRegen + 1)
        }
      }
    }

    startCooldowns(){
      for(let i = 0; i < this.battle.combatants.players.length; i++){
        const player = this.battle.combatants.players[i]
        for(let j = 0; j < player.actions.length; j++){
          player.actions[j].startCooldown(true)
        }
        
      }

      for(let i = 0; i < this.battle.combatants.enemies.length; i++){
        const enemy = this.battle.combatants.enemies[i]
        for(let j = 0; j < enemy.actions.length; j++){
          enemy.actions[j].startCooldown(true)
        }
      }
    }

    reduceCooldowns(){
      for(let i = 0; i < this.battle.combatants.players.length; i++){
        const player = this.battle.combatants.players[i]
        for(let j = 0; j < player.actions.length; j++){
          player.actions[j].tickCooldown()
        }
        
      }

      for(let i = 0; i < this.battle.combatants.enemies.length; i++){
        const enemy = this.battle.combatants.enemies[i]
        for(let j = 0; j < enemy.actions.length; j++){
          enemy.actions[j].tickCooldown()
        }
      }
    }
  
    nextTurn() {
      // this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";

      this.turn();
    }
  
    getWinningTeam() {
      let aliveTeams = {};
      Object.keys(this.battle.combatants).forEach(team => {
        aliveTeams[team] = this.battle.combatants[team].filter(player => player.hp > 0)
      })
      // console.log(aliveTeams)
      if (!aliveTeams["players"].length) { return "enemies"}
      if (!aliveTeams["enemies"].length) { return "players"}
      return null;
    }
  
    async init() {
      
      const winner = await this.turn()

      await wait(800)
      if(winner === "players"){
        const players = this.battle.combatants.players
        const enemies = this.battle.combatants.enemies
        
        
        Promise.all(players.map(player=>new Promise(async (resolve)=>{
          const amountXp = enemies.reduce((a,b)=>{
            let diff = 1
            if(player.level < b.level){
              diff = ((b.level - player.level) * .1) + 1
            }
            return a + (b.xpGainedFromWinning * diff) 
          },0)
          // console.log(`${player.name} + ${amountXp}`)
          let xp = amountXp / players.length
          if(players.length < enemies.length){
            const diff = enemies.length - players.length
            xp = xp * (1.25 + (diff * .25))
          }
          await player.giveXp(xp)
          resolve()
        })))
      }
    }
  
  }