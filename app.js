let count = 0;
let count2 = 0;

const cells = document.querySelectorAll(`.cell`);
let div = document.querySelector(`.xo`);
div.addEventListener(`pointerdown`, goPlay);

resetButton.addEventListener(`pointerdown`, resetGame);
const winnerList = document.createElement(`p`);

reloadBtn.addEventListener(`pointerdown`, function() {
    location.reload()
})

let winnerXCount = 0;
let winnerOcount = 0;


function resetGame() {
    cells.forEach(cell => {
        cell.innerHTML = ``;
        cell.classList.remove(`stopX`);
        cell.classList.remove(`stopO`);
        
    });
    winnerList.innerHTML = ``;
    count = 0;
    count2 = 0;

    div.addEventListener(`pointerdown`, goPlay)
}


function goPlay(event) {

    let target = event.target

    if(target.className !== `cell`) return;

    count++;
    count2++

    if(count % 2 === 1) {
        target.innerHTML = `&#10005;`
        target.classList.add(`stopX`);
        count = 1;
        getWinner()
    }

    if(count % 2 === 0) {
        target.innerHTML = `&#9711;`;
        target.classList.add(`stopO`)
        getWinner()
        count = 2
    }

    if(target.classList.contains(`stopX`)) {
        target.innerHTML = `&#10005;`
    }

    if(target.classList.contains(`stopO`)) {
        target.innerHTML = `&#9711;`
    }
}

function getWinner() {
    //=========X=====================

    let [id1, id2, id3, id4, id5, id6, id7, id8, id9] = document.querySelectorAll(`.cell`);
    
    let isWinnerXHorizontal = (id1.classList.contains(`stopX`) && id2.classList.contains(`stopX`) && id3.classList.contains(`stopX`)) ||
                                (id4.classList.contains(`stopX`) && id5.classList.contains(`stopX`) && id6.classList.contains(`stopX`)) ||
                                (id7.classList.contains(`stopX`) && id8.classList.contains(`stopX`) && id9.classList.contains(`stopX`));

    
    let isWinnerXVertical = (id1.classList.contains(`stopX`) && id4.classList.contains(`stopX`) && id7.classList.contains(`stopX`)) ||
                            (id2.classList.contains(`stopX`) && id5.classList.contains(`stopX`) && id8.classList.contains(`stopX`)) ||
                            (id3.classList.contains(`stopX`) && id6.classList.contains(`stopX`) && id9.classList.contains(`stopX`));

    let isWinnerXDiagonal = (id1.classList.contains(`stopX`) && id5.classList.contains(`stopX`) && id9.classList.contains(`stopX`)) ||
                            (id3.classList.contains(`stopX`) && id5.classList.contains(`stopX`) && id7.classList.contains(`stopX`));


// =============o==================

    let isWinnerOHorizontal = (id1.classList.contains(`stopO`) && id2.classList.contains(`stopO`) && id3.classList.contains(`stopO`)) ||
                                (id4.classList.contains(`stopO`) && id5.classList.contains(`stopO`) && id6.classList.contains(`stopO`)) ||
                                (id7.classList.contains(`stopO`) && id8.classList.contains(`stopO`) && id9.classList.contains(`stopO`));

    
    let isWinnerOVertical = (id1.classList.contains(`stopO`) && id4.classList.contains(`stopO`) && id7.classList.contains(`stopO`)) ||
                            (id2.classList.contains(`stopO`) && id5.classList.contains(`stopO`) && id8.classList.contains(`stopO`)) ||
                            (id3.classList.contains(`stopO`) && id6.classList.contains(`stopO`) && id9.classList.contains(`stopO`));

    let isWinnerODiagonal = (id1.classList.contains(`stopO`) && id5.classList.contains(`stopO`) && id9.classList.contains(`stopO`)) ||
                            (id3.classList.contains(`stopO`) && id5.classList.contains(`stopO`) && id7.classList.contains(`stopO`));
                            

    if(isWinnerXHorizontal || isWinnerXVertical || isWinnerXDiagonal) {
        winnerXCount++;

        let Xspan = document.querySelector(`.X`);
        Xspan.innerHTML = `${winnerXCount}`
    
        winnerList.innerHTML = `'X' win! Press 'Restart'`;
        winnerList.className = `winnr`
        winnerList.id = `winnerList`

        document.body.append(winnerList);

        div.removeEventListener(`pointerdown`, goPlay)
    }

    if(isWinnerOHorizontal || isWinnerOVertical || isWinnerODiagonal) {

        winnerOcount++;

        let Ospan = document.querySelector(`.O`);
        Ospan.innerHTML = `${winnerOcount}`

        winnerList.innerHTML = `'O' win! Press 'Restart'`;
        winnerList.className = `winnr`;
        winnerList.id = `winnerList`;

        document.body.append(winnerList);

        div.removeEventListener(`pointerdown`, goPlay)
    }

    if((count2 === 9 && (!isWinnerXHorizontal || !isWinnerXVertical || !isWinnerXDiagonal)) || (count2 === 9 && (!isWinnerOHorizontal || !isWinnerOVertical || !isWinnerODiagonal))) {
        winnerList.innerHTML = `Draw! press 'Restart'`;
        winnerList.className = `winnr`;
        winnerList.id = `winnerList`;

        document.body.append(winnerList);

        div.removeEventListener(`pointerdown`, goPlay)
    }
}
