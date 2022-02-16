console.log('hello world')
const isDelta6 = window.application && window.application.ev

const Hooks = new class{
    constructor(){
        if(!isDelta6) return console.error('Is not Delta 6')
        this.old_DrawCell = window.drawRender.drawCell
        this.initDrawCellHook()
    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    beforeDrawCell(ctx, cell, delta, activeTab, multiboxEnabled){
        
    }
    /**
     * @param {CanvasRenderingContext2D} ctx
     */
    afterDrawCell(ctx, cell, delta, activeTab, multiboxEnabled){

    }
    initDrawCellHook(){
        if(window.drawRender.drawCell)  return console.error('Draw render is not initialised or is not canvas renderer')
        const self = this
        window.drawRender.drawCell = function(cell, delta, activeTab, multiboxEnabled){
            const ctx = window.drawRender.ctx
            self.beforeDrawCell(ctx, cell, delta, activeTab, multiboxEnabled)
            self.old_DrawCell.apply(window.drawRender, arguments)
            self.afterDrawCell(ctx, cell, delta, activeTab, multiboxEnabled)
        }
    } 
}