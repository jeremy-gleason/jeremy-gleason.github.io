// moles wait between 2-20 seconds before re-emerging

const moles = [
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-0")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-1")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-2")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-3")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-4")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-5")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-6")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-7")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-8")
    },
    {
        status: "sad",
        changeTime: Date.now() + 1000,
        king: false,
        node: document.querySelector("#hole-9")
    }
]

const bg = document.querySelector('.bg');
let score = 0;

function change() {
    for (let i = 0; i < moles.length; i++) {
        if (Date.now() > moles[i].changeTime) {
            if (moles[i].status === "hiding") {
                appear(moles[i]);
                moles[i].changeTime = Date.now() + (Math.random() * 2000) + 2000;
            } else if (moles[i].status === "hungry") {
                becomeSad(moles[i]);
                moles[i].changeTime = Date.now() + 500;
            } else if (moles[i].status === "leaving") {
                disappear(moles[i]);
                moles[i].changeTime = Date.now() + (Math.random() * 18000) + 2000;
            } else {
                leave(moles[i]);
                moles[i].changeTime = Date.now() + 500;
            }
        }
    }
    requestAnimationFrame(change);
}

function appear(mole) {
    if (Math.random() > 0.9) {
        mole.king = true;
        mole.node.children[0].src = "./img/king-mole-hungry.png";
    } else {
        mole.king = false;
        mole.node.children[0].src = "./img/mole-hungry.png";
    }
    mole.node.children[0].classList.remove('hide');
    mole.node.children[0].classList.add('hungry');
    mole.status = "hungry";
}

function becomeSad(mole) {
    if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-sad.png";
    } else {
        mole.node.children[0].src = "./img/mole-sad.png";
    }
    mole.node.children[0].classList.remove('hungry');
    mole.status = 'sad';

}

function leave(mole) {
    if (mole.king) {
        mole.node.children[0].src = "./img/king-mole-leaving.png";
    } else {
        mole.node.children[0].src = './img/mole-leaving.png';
    }
    mole.status = "leaving";
}

function disappear(mole) {
    mole.status = "hiding";
    mole.node.children[0].classList.add('hide');
}

function feed(target) {
    const mole = moles[target.dataset.index];

    if (target.classList.contains('hungry')) {
        target.classList.remove('hungry');
        target.classList.add('fed');
        
        const mole = moles[parseInt(target.dataset.index)];
        if (mole.king) {
            target.src = "./img/king-mole-fed.png";
            score += 2;
        } else {
            target.src = "./img/mole-fed.png";
            score++;
        }
        mole.status = "fed";
        mole.changeTime = Date.now() + 500;
    }
    document.querySelector('.worm-container').style.width = `${(9.5 * score) + 5}%`;
    if (score >= 10) {
        win();
    }
}

function win() {
    bg.classList.add("hide");
    document.querySelector('.win').classList.remove("hide");
}

requestAnimationFrame(change);

bg.addEventListener("click", function(event) {
    feed(event.target);
});