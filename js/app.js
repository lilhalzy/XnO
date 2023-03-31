const App = { //This is NameSpace
    $: { // start with a custom prefix ($) - All selected HTML elements
        action: document.querySelector('[data-id="actions"]'),
        actionItems: document.querySelector('[data-id="action-pop"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        boxes: document.querySelectorAll('[data-id="box"]'),
    },
    state: {
        turns: [],
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
                // check if it's played
                const hasTurn = boxId => {
                    const existingTurn = App.state.turns.find(turn => turn.boxId === boxId)
                    return existingTurn !== undefined
                }

                if(hasTurn(+box.id)) {
                    return
                }

                const lastTurn = App.state.turns.at(-1) // at(-1) will grab the last element of that array

                const icon = document.createElement('i')

                const getOppositePlayer = playerId => playerId === 1 ? 2 : 1
                const currentPlayer = App.state.turns.length === 0 ? 1 : getOppositePlayer(lastTurn.playerId)

                currentPlayer === 1 ? icon.classList.add('fa-solid', 'fa-x', 'violet') : icon.classList.add('fa-solid', 'fa-o', 'lavender')

                App.state.turns.push({  // Tracking state over the lifecycle app
                    boxId: +box.id,
                    playerId: currentPlayer,
                })

                box.replaceChildren(icon)
            })
        })
    },
}

window.addEventListener('load', App.init)