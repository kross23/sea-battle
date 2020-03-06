const record = document.getElementById('record');
const shot = document.getElementById('shot');
const hit = document.getElementById('hit');
const dead = document.getElementById('dead');
const enemy = document.getElementById('enemy');
const again = document.getElementById('again');
const heder = document.querySelector('.header');

const game={
ships: [],
shipCount : 0,
optionShip : {
count : [1, 2, 3, 4],
size : [4, 2, 3, 1],
},
collizion : new Set(),
 generateShip(){
   for(let i=0; i < this.optionShip.count.length ; i++){

        for(let j=0;j<this.optionShip.count[i];j++){
         const size = this.optionShip.size[i];
         const ship = this.generateOptionShip(size);
            this.ships.push(ship);
            this.shipCount++;
        }
   }
 } ,
 generateOptionShip(shipSize){
      const ship = {
        hit:[],
        location:[],
      };
      const direction = Math.random() < 0.5;
      let x, y;
      if(direction){
        x=Math.floor(Math.random()*10);
        y=Math.floor(Math.random()*(10 - shipSize));
      }
      else{
        x=Math.floor(Math.random()*(10 - shipSize));
        y=Math.floor(Math.random()*10);
      }

      for(let i=0;i< shipSize ;i++){
          if(direction){
            ship.location.push(x+''+(y+i));
          }else{
            ship.location.push((x+i)+''+y);
          }
          ship.hit.push('');
      }

      if(this.checKollizium(ship.location)){
          return this.generateOptionShip(shipSize);
      }
      this.addCollizions(ship.location);
      return ship;
    },
    checKollizium(location){
        for(const coord of location){
            if(this.collizion.has(coord)){
                return true;
            }
        }
    },
    addCollizions(location){
        for(let i = 0; i<location.length;i++){
            const startCordX = location[i][0]-1;
            for(let j= startCordX;j< startCordX+3  ;j++){
                const startCordY = location[i][1]-1;
                for(let z=startCordY;z<startCordY+3;z++){
                    if(j>=0 && j<10 && z >= 0 && z < 10){
                    const coord = j+''+z;
                   
                        this.collizion.add(coord);
                        
                    }
                }
            }
        }
    }
};


const play = {
    record : localStorage.getItem('seaBatlRecord') || 0,
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

const fire = (event) =>{
    const target = event.target;
    
    if(target.classList.length < 0 || target.tagName !=='TD' || !game.shipCount )return;
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
                if(!game.shipCount){
                    heder.textContent='Игра окончена !!';
                    heder.style.color = 'red';
                 
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
    game.generateShip();
    console.log(game);
    play.render();
    again.addEventListener('click', ()=>{
        location.reload();
    })
    record.addEventListener('dblclick',()=>{
        localStorage.clear();
        play.record = 0;
        play.render();
    });
};


init();

//tukty;