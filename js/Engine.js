let endGame = document.getElementById('gameover');
let imageOver = document.createElement('div');




class Engine {

    constructor(theRoot) {
        this.root = theRoot;
        this.player = new Player(this.root);
        this.enemies = [];
        addBackground(this.root);
        this.score = new Score(this.root, 10, 515);
    }



    gameLoop = () => {

        this.score.update();

        if (this.lastFrame === undefined) this.lastFrame = (new Date).getTime();
        let timeDiff = (new Date).getTime() - this.lastFrame;
        // console.log(timeDiff);
        this.lastFrame = (new Date).getTime();
        this.enemies.forEach(enemy => {
            enemy.update(timeDiff);
        });

        this.enemies = this.enemies.filter(enemy => {
            return !enemy.destroyed;
        });
        while (this.enemies.length < MAX_ENEMIES) {

            const spot = nextEnemySpot(this.enemies);
            this.enemies.push(new Enemy(this.root, spot));
        }

        if (this.isPlayerDead()) {

            endGame.appendChild(imageOver);
            imageOver.id = 'gameover';
            imageOver.classList.add('gameover');
            let resetBtn = document.createElement('button');
            resetBtn.classList.add('resetBtn');
            endGame.appendChild(resetBtn);
            resetBtn.innerText = "Play again"
            resetBtn.addEventListener('click', this.resetGame);
            return;
        }
        setTimeout(this.gameLoop, 20);
    }

    isPlayerDead = () => {
        let isDead = false;
        this.enemies.forEach(enemy => {
            if (enemy.x === this.player.x && enemy.y + ENEMY_HEIGHT > this.player.y) {
                isDead = true;
            }
        });
        return isDead;
    }
    
    resetGame = () => {
    this.gameLoop();
        endGame.removeChild(imageOver);

    }
};