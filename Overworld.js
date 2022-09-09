class Overworld {
    constructor(config){
        this.element = config.element
        this.socket = config.socket
        this.canvas = this.element.querySelector('.game-canvas')
        this.ctx = this.canvas.getContext("2d")
    }

    init(){
        const battle = new Battle()
        battle.init(this.element)
        // const skillSelect = new SkillSelect()
        // skillSelect.init(this.element)
    }
}