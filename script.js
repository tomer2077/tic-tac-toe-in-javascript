const board = [
    [' ',' ',' '],
    [' ',' ',' '],
    [' ',' ',' ']
]

let player = 1; // 1 is 'X', 2 is 'O'
let game_over = false;

// is this element in the 'cell' class?
const is_cell = elem => elem.classList.contains('cell');

const end_game = () => alert("Player " + player + " (" + get_player_mark() + ") " + "won!");

const preview_play = event => {
    if (is_cell(event.target) === false) return;

    const cell = event.target;
    const i = cell.id[1];
    const j = cell.id[2];

    if (board[i][j] === ' ') {
        cell.innerHTML = get_player_mark();
    }
}

const remove_play_preview = event => {
    if (is_cell(event.target) == false) return;

    const cell = event.target;
    const i = cell.id[1];
    const j = cell.id[2];

    // only remove the mark of an empty cell
    if (board[i][j] === ' ') cell.innerHTML = '';
}

const get_player_mark = () => {
    switch(player)
    {
        case 1: return 'X';
        case 2: return 'O';
        default: alert("get_player_mark(): player isn't 1 or 2")
    }
}

const change_turn = () => {
    switch(player)
    {
        case 1: {
            player = 2;
            break;
        }
        case 2: {
            player = 1;
            break;
        }
        default: {
            alert("change_turn(): player isn't 1 or 2")
        }
    }
}

const is_game_won = () => {
    player_mark = get_player_mark();

    let sequence = 0;

    // check each row
    for (let r = 0; r < board.length; r++)
    {
        for (let c = 0; c < board.length; c++)
        {
            if (board[r][c] === player_mark)
                sequence++;
        }

        if (sequence === 3) return true;
        sequence = 0;
    }

    // check each column
    for (let r = 0; r < board.length; r++)
    {
        for (let c = 0; c < board.length; c++)
        {
            if (board[c][r] === player_mark)
                sequence++;
        }

        if (sequence === 3) return true;
        sequence = 0;
    }

    // check top left to bottom right diagonal
    for (let i = 0; i < board.length; i++) {
        if (board[i][i] === player_mark)
                sequence++;
    }
    if (sequence === 3) return true;
    sequence = 0;

    // check top right to bottom left diagonal
    let c = 0;
    let r = 2;
    while (c !== 3 && r !== -1)
    {
        if (board[c][r] === player_mark) sequence++;

        c++;
        r--;
        
        if (sequence === 3) return true;
    }

    return false;
}

addEventListener('click', (event) => {
    if (game_over || is_cell(event.target) == false) return;

    const cell = event.target;
    const i = cell.id[1];
    const j = cell.id[2];

    if (board[i][j] === ' ') {
        board[i][j] = get_player_mark();
        cell.innerHTML = board[i][j];
        cell.style.color = 'black';
    }
    
    if (!game_over && is_game_won()) {
        game_over = true;

        // 0.01 second delay to let the css change in this function take effect
        // before the alert pops up and freezes code execution (at least on my pc)
        setTimeout(() => {
            end_game();
        }, "10")
    }
    else change_turn();
})

addEventListener('mouseover', preview_play);
addEventListener('mouseout', remove_play_preview);
