export default class View {

    $ = {}
    $$ = {}

    constructor() {
        this.$.action = this.#qs('[data-id="actions"]')
        this.$.actionBtn = this.#qs('[data-id="action-button"]')
        this.$.actionItems = this.#qs('[data-id="action-pop"]')
        this.$.resetBtn = this.#qs('[data-id="reset-btn"]')
        this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]')
        this.$.modal = this.#qs('[data-id="modal"]')
        this.$.modalTxt = this.#qs('[data-id="modal-txt"]')
        this.$.modalBtn = this.#qs('[data-id="modal-btn"]')
        this.$.turn = this.#qs('[data-id="turn"]')

        this.$$.boxes = this.#qsAll('[data-id="box"]')

        // UI event listeners
        this.$.actionBtn.addEventListener('click', e => {
            this.#toggleItems()
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
        this.$$.boxes.forEach(box => {
            box.addEventListener('click', handler)
        })
    }

    /**
     * DOM helper methods
     */
    #toggleItems() {
        this.$.actionItems.classList.toggle('hidden')
        this.$.actionBtn.classList.toggle('border')

        const icon = this.$.actionBtn.querySelector('i')

        icon.classList.add('fa-chevron-down')
        icon.classList.add('fa-chevron-up')
    }

    handlePlayerTurn(boxEl, player) {
        const icon = document.createElement('i')
        icon.classList.add('fa-solid',
         player === 'X' ? 'fa-x' : 'fa-o',
         player === 'X' ? 'violet' : 'lavender'
         )
        boxEl.replaceChildren(icon)
    }

    setTurnIndicator(player) {
        const icon = document.createElement('i')
        const label = document.createElement('p')

        this.$.turn.classList.add(player === 'X' ? 'violet' : 'lavender')
        this.$.turn.classList.remove(player === 'X' ? 'lavender' : 'violet')

        icon.classList.add('fa-solid', player === 'X' ? 'fa-x' : 'fa-o')
        
        label.innerText = player === 'X' ? `Player X it's your turn` : `Player O it's your turn`

        this.$.turn.replaceChildren(icon, label)
    }

    // # - make it private || not public
    #qs(selector, parent) {
        const el = parent ? parent.querySelector(selector) : document.querySelector(selector)
        
        // abort the app continuation if there's no element selected
        if (!el) throw new Error('Could not find the elements')

        return el
    }

    #qsAll(selector) {
        const elList = document.querySelectorAll(selector)

        // abort the app continuation if there's no element selected
        if(!elList) throw new Error('Could not find elements')

        return elList
    }
}
