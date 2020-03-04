const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');

const play = {
    record : 0 ,
    shot : 0 ,
    hit : 0 ,
    dead : 0,
    set updateDate(data){
        this[data]+=1;
        this.render();
    },
    render(){
          record.textContent = this. record;
          shot.textContent = this.shot;
          hit.textContent = this.hit;
          dead.textContent = this.dead;
    }
};

const show = {
    hit() {
        
    },
    miss(elem) {
        this.changesClass(elem,'miss');
    },
    dead() {
        
    },
    changesClass(elem,value){
        elem.className = value;

    }
}
const fire = (event) =>{
    const target = event.target;
    show.miss(target);
    play.updateDate='shot';

}

const init = () => {

    enemy.addEventListener('click',fire);
};


init();
