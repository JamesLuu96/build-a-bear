class Sprite{
    constructor(config){
        this.sprite = {}
        Object.keys(config).forEach(key=>{
            this.sprite[key] = config[key]
        })
    }

    drawBear(container){
        // console.log(this.sprite)
        container.innerHTML = `
        <img src="./assets/img/base/base${this.sprite.base ? this.sprite.base : '0'}.png" alt="" class="display-base">
        <img src="./assets/img/eyes/eyes${this.sprite.eyes ? this.sprite.eyes : '0'}.png" alt="" class="display-eyes">
        <img src="./assets/img/mouth/mouth${this.sprite.mouth ? this.sprite.mouth : '0'}.png" alt="" class="display-mouth">
        <img src="./assets/img/glasses/glasses${this.sprite.glasses ? this.sprite.glasses : '0'}.png" alt="" class="display-glasses">
        <img src="./assets/img/hat/hat${(this.sprite.hat && !this.sprite.overcoat) ? this.sprite.hat : '0'}.png" alt="" class="display-hat">
        <img src="./assets/img/clothes/clothes${(this.sprite.clothes && !this.sprite.overcoat) ? this.sprite.clothes : '0'}.png" alt="" class="display-clothes">
        <img src="./assets/img/overcoat/overcoat${this.sprite.overcoat ? this.sprite.overcoat : '0'}.png" alt="" class="display-overcoat">
        `
        
    }
}