class Game {
    constructor(n, { init, first, user, win, com_win } = {}) {
        if (init) this.on("init", init);
        if (first) this.on("first", first);
        if (user) this.on("user", user);
        if (win) this.on("win", win);
        if (com_win) this.on("com_win", com_win);

        this.stones = +n || 10;
        this.state = Array(this.stones).fill(0);
        this.listener["init"](this);
        this.first_take();
        this.turn = true;
        this.listener["user"](this);
    }

    first_take() {
        let n = 1 + Math.floor(Math.random() * (this.stones / 3 - 1));
        this.taken = n;
        for (let i = 0; i < n; i++) this.state[i] = 1;
        this.last = n;
        this.listener["first"](n);
    }

    take(n) {
        if (!this.turn) return;
        if (n > this.last * 2) return;

        for (let i = this.taken; i < this.taken + n; i++) this.state[i] = 2;
        this.taken += n;
        this.last = n;
        this.turn = false;

        if (this.taken >= this.stones) {
            this.listener["win"](this);
        } else {
            this.com_take();
        }
    }

    com_take() {
        if (this.last * 2 + this.taken >= this.stones) {
            for (let i = this.taken; i < this.taken + this.last * 2; i++) this.state[i] = 1;
            this.taken += this.last * 2;
            this.last = this.last * 2;
        } else {
            let a = true;
            for (let i = 1; i < (this.stones - this.taken) / 3; i++) {
                if (!this.fibonacci.includes(this.taken + i)) {
                    for (let j = this.taken; j < this.taken + i; j++) this.state[j] = 1;
                    this.taken += i;
                    this.last = i;
                    a = false;
                    break;
                }
            }
            if (a) {
                for (let i = this.taken; i < this.taken + 1; i++) this.state[i] = 1;
                this.taken += 1;
                this.last = 1;
            }
        }

        if (this.taken >= this.stones) {
            this.listener["com_win"](this);
        } else {
            this.turn = true;
            this.listener["user"](this);
        }
    }

    on(type, func) {
        if (typeof type === "string" && typeof func === "function") {
            this.listener[type] = func;
        }
    }

    listener = {
        init: () => {},
        first: () => {},
        user: () => {},
        com: () => {},
        win: () => {},
        com_win: () => {},
    };

    fibonacci = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765];
}
