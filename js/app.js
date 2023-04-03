import View from './view.js'

const App = { //This is NameSpace
    $: { // start with a custom prefix ($) - All selected HTML elements
        action: document.querySelector('[data-id="actions"]'),
        actionItems: document.querySelector('[data-id="action-pop"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
        boxes: document.querySelectorAll('[data-id="box"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalTxt: document.querySelector('[data-id="modal-txt"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
        turn: document.querySelector('[data-id="turn"]'),
    },
    state: {
        turns: [],
    },
    gameTracker(turns) {
        const p1Turns = turns.filter(turn => turn.playerId === 'X').map(move => +move.boxId)
        const p2Turns = turns.filter(turn => turn.playerId === 'O').map(move => +move.boxId)
        console.log();

        const victoryTracker = [
            [1,2,3], 
            [1,5,9],
            [1,4,7],
            [2,5,8],
            [3,5,7],
            [3,6,9],
            [4,5,6],
            [7,8,9],
        ]
        
        let winner = null
        
        victoryTracker.forEach(tracker => {
            const p1Wins = tracker.every(value => p1Turns.includes(value))
            const p2Wins = tracker.every(value => p2Turns.includes(value))
            
            if(p1Wins) winner = 'X'
            if(p2Wins) winner = 'O'
        })
        
        return {
            result: turns.length === 9 || winner != null ? 'complete' : 'in-progress',
            winner,
        }
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
        App.$.modalBtn.addEventListener('click', e => {
            App.state.turns = []
            App.$.boxes.forEach(box => box.replaceChildren())
            App.$.modal.classList.add('hidden')
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
                
                const getOppositePlayer = playerId => playerId === 'X' ? 'O' : 'X'
                const currentPlayer = App.state.turns.length === 0 ? 'X' : getOppositePlayer(lastTurn.playerId)
                const nextPlayer = getOppositePlayer(currentPlayer)
                
                const boxIcon = document.createElement('i')
                const indicatorIcon = document.createElement('i')
                const indicatorLabel = document.createElement('p')
                indicatorLabel.innerText = `Player ${nextPlayer} it's your turn`
                
                // placement and indicator text
                currentPlayer === 'X' ? (boxIcon.classList.add('fa-solid', 'fa-x', 'violet'), indicatorIcon.classList.add('fa-solid', 'fa-o', 'lavender'), indicatorLabel.innerText = `Player ${nextPlayer} it's your turn`, indicatorLabel.classList = 'lavender' ): (boxIcon.classList.add('fa-solid', 'fa-o', 'lavender'), indicatorIcon.classList.add('fa-solid', 'fa-x', 'violet'))

                App.$.turn.replaceChildren(indicatorIcon, indicatorLabel)
                
                App.state.turns.push({  // Tracking state over the lifecycle app
                    boxId: +box.id,
                    playerId: currentPlayer,
                })
                
                box.replaceChildren(boxIcon)

                // check if there's a winner || tie
                const game = App.gameTracker(App.state.turns)

                if (game.result === 'complete') {
                    App.$.modal.classList.remove('hidden')

                    let msg = ''
                    if (game.winner) {
                        msg = `Player ${game.winner} wins!`
                        App.$.modalBtn.textContent = "One more"
                    } else {
                        msg = 'Tie game!'
                        App.$.modalBtn.textContent = "Don't give up"
                    }
                    App.$.modalTxt.textContent = msg
                }
            })
        })
    },
}

function init() {
    const view = new View()
    view.bindResetEvent(e => {
        console.log('Reset Button') 
        console.log(e)
    })
    view.bindNewRoundEvent(e => {
        console.log('New Round Event') 
        console.log(e)
    })
    view.bindPlayerTurnEvent(e => {
        console.log('Player Turn Event') 
        console.log(e)
    })
}

window.addEventListener('load', init)
