var Tile = function (textureManager, type, x, y) {

    //TODO refactor: add entities
    this.entities = []

  // console.log("Type " + type);
  switch(type) {
    case Tile.TYPES.TYPE0:
    case Tile.TYPES.TYPE1:
      // this.floor = new Floor(textureManager, this, "default", x, y);
      // this.wall = new Wall(textureManager, this.randomBuilding(), x, y);
      // this.entities = [new Chuck(game, new THREE.Vector3(x, y + PLAYER_HEIGHT, PLAYER_INIT_Z))];
      // break;
    case Tile.TYPES.TYPE2:
    case Tile.TYPES.TYPE3:
    case Tile.TYPES.TYPE4:
    case Tile.TYPES.TYPE5:
    case Tile.TYPES.TYPE6:
        this.floor = new Floor(textureManager, this, "default", x, y);
        this.wall = new Wall(textureManager, this.randomBuilding(), x, y);
        break;
    case Tile.TYPES.SALMOREJO:
        this.floor = new Floor(textureManager, this, "default", x, y);
        this.wall = new Wall(textureManager, this.randomBuilding(), x, y);
        this.entities = [new Salmorejo(game, new THREE.Vector3(x, y, PLAYER_INIT_Z))];
        break;
    case Tile.TYPES.DOG:
        this.question = "El perro de los García está fuera delante de la puerta y tiene muy mala leche...¡Decide!";
        this.options = ['Di "Hueso" para lanzar un hueso.', 'Di "Esquivar" para intentar esquivar.', 'Intenta hablar en su idioma para entenderte con él.'];
        this.goodAnswers = ["hueso", "esquivar"];
        this.badAnswers = ["guauguau", "guau guau", "guau"];
        this.floor = new Floor(textureManager, this, "event", x, y);
        this.wall = new Wall(textureManager, this.randomBuilding(), x, y);
        this.entities = [new Dog(game, new THREE.Vector3(x, y + PLAYER_HEIGHT, PLAYER_INIT_Z))];
        break;
    case Tile.TYPES.FLOWERPOT:
        this.question = "La maruja del cuarto derecha está regando las plantas...¡Decide!";
        this.options = ['Di "Chisme" para contarle el último chisme del barrio.', 'Di "Ignorar" para pasar de ella.', 'Di "Loca" para sacarle de quicio.'];
        this.goodAnswers = ["chisme"];
        this.badAnswers = ["ignorar", "loca"];
        this.floor = new Floor(textureManager, this, "event", x, y);
        this.wall = new Wall(textureManager, this.randomBuilding(), x, y);
        this.entities = [new FlowerPot(game, new THREE.Vector3(x, y + PLAYER_HEIGHT, PLAYER_INIT_Z))];
        break;
    case Tile.TYPES.FOOTBALL:
        this.question = "Un hincha del Betis se te acerca y te empieza a hablar de fútbol...¡Decide!";
        this.options = ['Di "Sevilla" para decirle que el Sevilla es el mejor equipo.', 'Di "No" para expresar que no eres futbolero.', 'Di "Verde" para caerle en gracia.'];
        this.goodAnswers = ["verde"];
        this.badAnswers = ["sevilla", "no"];
        this.floor = new Floor(textureManager, this, "event", x, y);
        this.wall = new Wall(textureManager, this.randomBuilding(), x, y);
        this.entities = [new Ball(game, new THREE.Vector3(x, y + PLAYER_HEIGHT, PLAYER_INIT_Z))];
        break;
    case Tile.TYPES.ROBOT:
        this.question = "Un transeunte típico sevillano te bloquea el paso...¡Decide!";
        this.options = ['Di "Máquina" para decirle : Tío, ¡ereh un máquina!.', 'Di "Quita" para que se aparte del camino.', 'Di "Primo" para saludar a tu pariente.'];
        this.goodAnswers = ["máquina"];
        this.badAnswers = ["quita"];
        this.floor = new Floor(textureManager, this, "event", x, y);
        this.wall = new Wall(textureManager, this.randomBuilding(), x, y);
        this.entities = [new Maquina(game, new THREE.Vector3(x, y + PLAYER_HEIGHT, PLAYER_INIT_Z))];
        break;
    case Tile.TYPES.CUTE_GIRL:
        this.question = "Una chiquilla se cruza en tu camino...¡Decide!";
        this.options = ['Di "Guapa" para echarle un piropo.', 'Di "Calabazas" para rechazarla.', 'Di "Novia" para decirle que estás en búsqueda de tu querida Mª Isabel.'];
        this.goodAnswers = ["guapa"];
        this.badAnswers = ["calabazas", "calabaza", "novia"];
        this.floor = new Floor(textureManager, this, "event", x, y);
        this.wall = new Wall(textureManager, this.randomBuilding(), x, y);
        this.entities = [new CuteGirl(game, new THREE.Vector3(x, y + PLAYER_HEIGHT, PLAYER_INIT_Z))];
        break;
    default:

  }

}

Tile.prototype.randomBuilding = function () {
    return "building" + Math.floor(Math.random() * (8 + 1));
}


Tile.prototype.addToScene = function (scene) {
	scene.add(this.floor.plane);
	scene.add(this.wall.plane);
}

Tile.prototype.removeFromScene = function (scene) {
	scene.remove(this.floor.plane);
	scene.remove(this.wall.plane);
}

Tile.prototype.getCollidable = function () {
  return this.floor.plane;
}

Tile.prototype.getTrigger = function () {
  return this.floor;
}

Tile.TYPES = {
    TYPE0: 0,
    TYPE1: 1,
    TYPE2: 2,
    TYPE3: 3,
    TYPE4: 4,
    TYPE5: 5,
    TYPE6: 6,
    SALMOREJO: 7,
    DOG: 8,
    FLOWERPOT: 9,
    CUTE_GIRL: 10,
    FOOTBALL: 11,
    ROBOT: 12,
}

Tile.FREQUENCIES = {
    TYPE0: 10,
    TYPE1: 10,
    TYPE2: 10,
    TYPE3: 10,
    TYPE4: 10,
    TYPE5: 10,
    TYPE6: 10,
    SALMOREJO: 15,
    DOG: 3,
    FLOWERPOT: 3,
    CUTE_GIRL: 3,
    FOOTBALL: 3,
    ROBOT: 3,
}




var getRandomTileID = function(nameFrequencyMap) {
	var electionArray = [];
	var cnt = 0;
	for (var tileType in nameFrequencyMap) {
		cnt += nameFrequencyMap[tileType];
		electionArray.push(cnt);
	}
	var choice = Math.floor(Math.random() * cnt);
	if (choice < 0) {
		console.log("fix me");
		choice = 0;
	}
	if (choice > nameFrequencyMap.length - 1) {
		console.log("fix me");
		choice = nameFrequencyMap.length - 1;
	}
	return binarySearch(electionArray, choice);
}

var getRandomTile = function(textureManager, x, y) {
	var id = getRandomTileID(Tile.FREQUENCIES);
	return new Tile(textureManager, id, x, y);
}
