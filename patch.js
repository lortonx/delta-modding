console.log('hello world')
const isDelta6 = window.application && window.application.ev
if(!isDelta6) throw Error('Is not Delta 6')

const Resources = new class{
    constructor(){
        this.hats = {
            'hat1': {
                url: 'https://static.nike.com/a/images/t_default/341c429d-c0cf-451f-b12a-9a8adfc3c6e1/dri-fit-legacy91-adjustable-training-hat-023gX9.png',
                scale: 0.6, x:0, y:1 // x,y from -1 to 1
            }
        }
        for(const [name, info] of Object.entries(this.hats)){
            Texture.texturesMap.set(name, info.url)
        }
    }
}

const Hooks = new class{
    constructor(){
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
        
        if(cell.type === 'cell' && cell.isPlayerCell){
            const hatName = 'hat1'
            const texture = Texture.getTexture(hatName)
            if(texture && texture.image){
                const scale = Resources.hats[hatName].scale
                const cx0 = cell.x - scale*cell.size
                const cy0 = cell.y - scale*cell.size
                const width = scale*cell.size*2
                const height = scale*cell.size*2

                const sx0 = cx0 + (cell.size * Resources.hats[hatName].x)
                const sy0 = cy0 - (cell.size * Resources.hats[hatName].y)
                ctx.drawImage(texture.image, 
                    sx0,
                    sy0,
                    width,
                    height
                )

            }
        }

    }
    initDrawCellHook(){
        if(!window.drawRender.drawCell)  return console.error('Draw render is not initialised or is not canvas renderer')
        const self = this
        // const beforeDrawCell = this.beforeDrawCell.bind(this)
        // const afterDrawCell = this.beforeDrawCell.bind(this)
        window.drawRender.drawCell = function(cell, delta, activeTab, multiboxEnabled){
            const ctx = window.drawRender.ctx
            self.beforeDrawCell(ctx, cell, delta, activeTab, multiboxEnabled)
            self.old_DrawCell.apply(window.drawRender, arguments)
            self.afterDrawCell(ctx, cell, delta, activeTab, multiboxEnabled)
        }
    } 
}