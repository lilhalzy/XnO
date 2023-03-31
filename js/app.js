const App = { //This is NameSpace
    $: { // start with a custom prefix ($) - All selected HTML elements
        action: document.querySelector('[data-id="actions"]'),
        actionItems: document.querySelector('[data-id="action-pop"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        boxes: document.querySelectorAll('[data-id="box"]'),
    },
    state: {
        currentPlayer: 1,
    },
    init() { //init() - apply the registeredEL (more organized rather than declaring the even listener inside the init method)
        App.registerEventListeners()
    },
    registerEventListeners() { // - is where we register all the user events
        App.$.action.addEventListener('click', e => {
            App.$.actionItems.classList.toggle('hidden')
        })
        App.$.resetBtn.addEventListener('click', e => {
            console.log('reset the game')
        })
        App.$.newRoundBtn.addEventListener('click', e => {
            console.log('new round')
        })
        App.$.boxes.forEach(box => {
            box.addEventListener('click', e => {
                box.hasChildNodes() ? null : void(0)

                const icon = document.createElement('i')
                const currentPlayer = App.state.currentPlayer

                currentPlayer === 1 ? icon.classList.add('fa-solid', 'fa-x', 'violet') : icon.classList.add('fa-solid', 'fa-o', 'lavender')

                App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1

                box.replaceChildren(icon)
            })
        })
    },
}

window.addEventListener('load', App.init)