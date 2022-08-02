class Combatant {
    constructor(config){
        Object.keys(config).forEach(key => {
            this[key] = config[key]
        })

    }
    
}