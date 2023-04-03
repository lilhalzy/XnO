export default class View {

    $ = {}

    constructor() {
        this.$.action = document.querySelector('[data-id="actions"]')
        this.$.actionBtn = document.querySelector('[data-id="action-button"]')
        this.$.actionItems = document.querySelector('[data-id="action-pop"]')
        this.$.resetBtn = document.querySelector('[data-id="reset-btn"]')
        this.$.newRoundBtn = document.querySelector('[data-id="new-round-btn"]')
        this.$.boxes = document.querySelectorAll('[data-id="box"]')
        this.$.modal = document.querySelector('[data-id="modal"]')
        this.$.modalTxt = document.querySelector('[data-id="modal-txt"]')
        this.$.modalBtn = document.querySelector('[data-id="modal-btn"]')
        this.$.turn = document.querySelector('[data-id="turn"]')

        // UI event listeners
        this.$.actionBtn.addEventListener('click', e => {
            this.toggleItems()
        })
        this.$.resetBtn.addEventListener('click', e => {

        })
    }

    /**
     * register all the event listeners
     */

    bindResetEvent(handler) {
        this.$.resetBtn.addEventListener('click', handler)
    }
    
    bindNewRoundEvent(handler) {
        this.$.newRoundBtn.addEventListener('click', handler)
    }
    
    bindPlayerTurnEvent(handler) {
        this.$.boxes.forEach(box => {
            box.addEventListener('click', handler)
        })
    }
}