class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      car1 = createSprite(500,550,50,100);
      car2 = createSprite(700,550,50,100);
      car3 = createSprite(900,550,50,100);
      car4 = createSprite(1100,550,50,100);
      cars = [car1,car2,car3,car4];
      
      form = new Form()
      form.display();
    }
  }

  play(){
  drawSprites();
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
     var index = 0;//var display_position = 130;
      for(var plr in allPlayers){
        //if (plr === "player" + player.index)
          //fill("red")
        //else
          //fill("black");
        cars[index].y = displayHeight-allPlayers[plr].distance; 
        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position);
        if(index+1===player.index){
          cars[index].shapeColor = 'red';
          camera.position.y = cars[index].y;
        }
        index = index +1;
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50;
      player.update();
    }
  }
}
