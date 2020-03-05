const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const heder = document.querySelector('.header');

const game={
ships: [
    {
location:['26','36','46','56'],
     hit:['','','',''],
    },
    {
location:['11','12','13'],
     hit:['','',''],
    },
    {
location:['31','32'],
     hit:['',''],
    },
    {
location:['38'],
    hit:[''], 
    }
     ],
     shipCount : 4,
};


const play = {
    record : localStorage.getItem('eaBatlRecord') || 0,
    shot : 0 ,
    hit : 0 ,
    dead : 0,
    set updateDate(data){
        this[data]+=1;
        this.render();
    },
    render(){
          record.textContent = this.record;
          shot.textContent   = this.shot;
          hit.textContent    = this.hit;
          dead.textContent   = this.dead;
    }
};

const show = {
    hit(elem) {
        this.changesClass(elem,'hit');
    },
    miss(elem) {
        this.changesClass(elem,'miss');
    },
    dead(elem) {
        this.changesClass(elem,'dead');
    },
    changesClass(elem,value){
        elem.className = value;

    }
}
let gamover = false;
const fire = (event) =>{
    const target = event.target;
    
    if(target.classList.length < 0 || target.tagName !=='TD' || gamover === true )return;
    show.miss(target);
    play.updateDate='shot';
    
    for(let i = 0; i < game.ships.length; i++){
        const ship = game.ships[i];
        const index=ship.location.indexOf(target.id);
        if(index >= 0){
            show.hit(target);
            play.updateDate = 'hit';
            ship.hit[index]='x';
            const live = ship.hit.indexOf('');
            if(live < 0){
                play.updateDate = 'dead';
                for(const id of ship.location){
                    show.dead(document.getElementById(id));
                }
                game.shipCount-- ;
                if(game.shipCount < 1){
                    heder.textContent='Игра окончена !!';
                    heder.style.color = 'red';
                    gamover = true;
                    if(play.record > play.shot || play.record === 0 ){
                        localStorage.setItem('seaBatlRecord', play.shot);
                        play.record = play.shot;
                        play.render();
                    }
                   
                }
            }
        }
    }
}

const init = () => {

    enemy.addEventListener('click',fire);
    play.render();
    again.addEventListener('click', ()=>{
        location.reload();
    })
};


init();

//tukty;