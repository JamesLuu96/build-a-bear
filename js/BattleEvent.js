class BattleEvent {
    constructor(event, battle) {
      this.event = event
      this.battle = battle
      this.skillEl = []
    }

    async movesMenu(resolve){
      const {currentPlayer, players, enemies} = this.event
      if(currentPlayer.isCPUControlled){
        console.log(currentPlayer.actions[0].caster.mp)
        const availableActions = currentPlayer.actions.filter(x=>x.enoughMana() && !x.onCooldown())
        if(!availableActions){
          resolve({caster: currentPlayer})
        }
        const chosenAction = availableActions[Math.floor(Math.random() * availableActions.length)]
        let filteredTargets;
        if(chosenAction.friendly){
          filteredTargets = players.filter(e=> e.hp > 0)
        }else{
          filteredTargets = enemies.filter(e=> e.hp > 0)
        }
        if(chosenAction.targetAmount < filteredTargets.length){
          const diff = filteredTargets.length - chosenAction.targetAmount
          for(let i = 0; i < diff; i++){
            const random = Math.floor(Math.random() * filteredTargets.length)
            filteredTargets = filteredTargets.filter((x, i)=>i!==random)
          }
        }
        chosenAction.chooseTarget(filteredTargets)
        resolve({caster: currentPlayer, target: filteredTargets, action: chosenAction})
      }else{
        const response = await this.chooseTargets()
        console.log(response)
        response.action.chooseTarget(response.target)
        resolve({caster: currentPlayer, target: response.target, action: response.action})
      }

    }

    async chooseTargets(){
      const {currentPlayer, players, enemies} = this.event
      const battleTextEl = document.createElement('div')
      battleTextEl.classList.add('Battle-text')
      battleTextEl.textContent = "Choose your action!"
      this.battle.element.appendChild(battleTextEl)
      this.element = document.createElement('div')
      this.element.classList.add('action-menu')
      this.element.innerHTML = '<div class="skills-container"></div>'
      this.skillElement = this.element.querySelector('.skills-container')

      for(let i = 0; i < currentPlayer.actions.length; i++){
        const currentAction = currentPlayer.actions[i]
        this.skillEl[i] = document.createElement('div')
        this.skillEl[i].classList.add('skill')
        if(currentAction.onCooldown() || !currentAction.enoughMana()) this.skillEl[i].setAttribute('data-inactive', true)
        if(currentAction.onCooldown()) this.skillEl[i].setAttribute('data-cooldown', true)
        if(!currentAction.enoughMana()) this.skillEl[i].setAttribute('data-mp', false)

        this.skillEl[i].innerHTML = `
        <div ${currentAction.onCooldown() ? `data-onCooldownFor="${currentAction.cooldownTimer}"` : ''}>
          <img src="./assets/img/skills/${currentAction.icon}.png" alt="">
        </div>
        <p ${(currentAction.mpCost !== 0 && currentAction.mpCost !== undefined) ? `data-mp-cost="${currentAction.mpCost}"` : ''} class="skill-name">${currentAction.name}</p>`

        this.skillElement.appendChild(this.skillEl[i])
      }
      this.battle.element.appendChild(this.element)
      const chosenAction = await new Promise(resolve=>{
        for(let i = 0; i < currentPlayer.actions.length; i++){
          this.skillEl[i].querySelector('img').addEventListener('click', ()=>{
            this.element.remove()
            battleTextEl.remove()
            resolve(currentPlayer.actions[i])
          }, {once: true})
        }
      })
      return await this.displaySkill(chosenAction, players, enemies)
      
    }

    async displaySkill(chosenAction, players, enemies){
      const selectTargetTitleEl = document.createElement('div')
      selectTargetTitleEl.classList.add('Battle-text')
      selectTargetTitleEl.textContent = chosenAction.targetAmount === 1 ? `Select 1 target:` : `Select up to ${chosenAction.targetAmount} targets:`
      if(chosenAction.auto){
        selectTargetTitleEl.textContent = `Cast ${chosenAction.name}?`
      }
      this.battle.element.appendChild(selectTargetTitleEl)
      const actionMenuEl = document.createElement('div')
      actionMenuEl.classList.add('action-menu')
      actionMenuEl.innerHTML = `
      <div class="skills-container skills-select">
        <div>
            <div class="skill">
                <div class="skill-img"><img src="./assets/img/skills/${chosenAction.icon}.png" alt=""></div>
            </div>
        </div>
        <div class="skill-select-organizer">
            <div class="skill-select-attr">
                <div>
                    <div class="skill-select-title">
                        <h1>Name:</h1>
                        <p>${chosenAction.name}</p>
                    </div>
                    ${chosenAction.damage ? `<div class="skill-select-title">
                        <h1>Damage:</h1>
                        <p>${chosenAction.damage}</p>
                    </div>`: ''}
                    ${chosenAction.healing ? `<div class="skill-select-title">
                        <h1>Heal:</h1>
                        <p>${chosenAction.healing}</p>
                    </div>` : ""}
                    <div class="skill-select-title">
                        <h1>Target:</h1>
                        <p>${chosenAction.auto ? 'Auto' : chosenAction.targetAmount}</p>
                    </div>
                </div>
                ${
                  chosenAction.cooldown || chosenAction.mpCost ?
                  `<div>
                    ${chosenAction.cooldown ? `<div class="skill-select-title">
                        <h1>Cooldown:</h1>
                        <p>${chosenAction.cooldown > 1 ? `${chosenAction.cooldown} turns` : `1 turn`}</p>
                    </div>` : ""}
                    ${chosenAction.mpCost ? `<div class="skill-select-title">
                        <h1>Mana:</h1>
                        <p>${chosenAction.mpCost}</p>
                    </div>` : ""}
                    ${chosenAction.duration ? `<div class="skill-select-title">
                        <h1>Duration:</h1>
                        <p>${chosenAction.duration} turn${chosenAction.duration > 1 ? "s":""}</p>
                    </div>` : ""}
                  </div>` : ''
                }
            </div>
            <div class="skill-select-desc">
                <h1>Description:</h1>
                <p>${chosenAction.description}</p>
            </div>
            <div class="skill-select-button-container">
                <button class="back-button">Back</button>
                <button data-inactive="false" class="confirm-button">Confirm</button>
            </div>
        </div>
      </div>
      `
      const backButtonEl = actionMenuEl.querySelector('.skill-select-button-container .back-button')
      const confirmButtonEl = actionMenuEl.querySelector('.skill-select-button-container .confirm-button')
      this.battle.element.appendChild(actionMenuEl)
      let desiredTargetLength = chosenAction.targetAmount
      let targets = []
      let chosenTargets = []
      if(!chosenAction.auto){
        confirmButtonEl.setAttribute('data-inactive', true)
        chosenAction.friendly ? targets = players.filter(x=>x.hp) : targets = enemies.filter(x=>x.hp)
        if(chosenAction.noTargetSelf){
          targets = targets.filter(x=>x.id !== this.event.currentPlayer.id)
        }
        if(chosenAction.targetDead){
          chosenAction.friendly ? targets = players.filter(x=>!x.hp) : targets = enemies.filter(x=>!x.hp)
        }
        for(let i = 0; i < targets.length; i++){
          targets[i].combatantElement.setAttribute('target-selected', false)
        }
      }else{
        chosenTargets = chosenAction.friendly ? players : enemies
      }

      if(desiredTargetLength > targets.length){
        desiredTargetLength = targets.length
      }

      
      const confirm = await new Promise(resolve=>{
        const controller = new AbortController()
        function cleanUp(){
          controller.abort()
          players.forEach(p=>{
            p.combatantElement.removeAttribute('target-selected')
          })
          enemies.forEach(e=>{
            e.combatantElement.removeAttribute('target-selected')
          })
        }
        for(let i = 0; i < targets.length; i++){
          targets[i].combatantElement.addEventListener('click', ()=>{
            if(targets[i].combatantElement.getAttribute('target-selected') === 'true' && desiredTargetLength >= chosenTargets.length){
              targets[i].combatantElement.setAttribute('target-selected', 'false')
              chosenTargets = chosenTargets.filter(x=>x.id !== targets[i].id)
              if(!chosenTargets.length){
                confirmButtonEl.setAttribute("data-inactive", "true")
              }
            }else if(targets[i].combatantElement.getAttribute('target-selected') === 'false' && desiredTargetLength > chosenTargets.length){
              targets[i].combatantElement.setAttribute('target-selected', 'true')
              chosenTargets.push(targets[i])
              confirmButtonEl.setAttribute("data-inactive", "false")
            }
          }, {signal: controller.signal})
        }
        backButtonEl.addEventListener('click', ()=>{
          cleanUp()
          resolve(false)
        }, {once: true})
        confirmButtonEl.addEventListener('click', ()=>{
          if(confirmButtonEl.getAttribute("data-inactive") === 'true') return
          cleanUp()
          resolve(true)
        })
      })
      

      actionMenuEl.remove()
      selectTargetTitleEl.remove()
      if(!confirm){
        return this.chooseTargets()
      }else{
        return {action: chosenAction, target: chosenTargets}
      }

    }

    async startMove(resolve){
      await this.event.action.startAction(resolve)

    }
  
    init(resolve) {
      this[this.event.type](resolve);
    }
  }