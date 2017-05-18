// Window
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
const BACKGROUND_COLOR = 0x87CEEB;

//Camera
const VIEW_ANGLE = 45;
const NEAR = 0.1;
const FAR = 20000;
const CAMERA_INIT_X = 0;
const CAMERA_INIT_Y = 150;
const CAMERA_INIT_Z = 400;

//Lights
const LIGHT_INIT_X = 0;
const LIGHT_INIT_Y = 250;
const LIGHT_INIT_Z = 0;
const LIGHT_COLOR = 0xE0E0E0;
const LIGHT_DARK = 0x101010;

//Game
const GAME_IDLE = "game_idle";
const GAME_RUNNING = "game_running";
const GAME_FINISHED = "game_finished";

//Backgound city
const CITY_WIDTH = SCREEN_WIDTH / 1.6;
const CITY_X = 0;
const CITY_Z = -30;
const CITY_Y_OFFSET = -50;

//Skybox
const SKYBOX_SIZE = 5000;
const SKYBOX_ZNEG = "skyboxzneg";
const SKYBOX_ZPOS = "skyboxzpos";
const SKYBOX_YNEG = "skyboxyneg";
const SKYBOX_YPOS = "skyboxypos";
const SKYBOX_XNEG = "skyboxxneg";
const SKYBOX_XPOS = "skyboxxpos";




// Texture names
const RUNNER = "runner";
const SKYLINE = "skyline";

// Audio names (files)
const AUDIO_FOLDER = "sound/";
const AUDIO_BACKGROUND = "background"
// Audio names (variables)
const AUDIO_BOUNCE = "bounce";
const AUDIO_JUMP = "jump";
const AUDIO_SHOOT = "shoot";
const AUDIO_DEATH = "death";
const AUDIO_CRASH = "crash";

// Effect names
const ZOOM_AND_ROLL = "zoomroll";
const LOOK_AHEAD = "lookahead";
const LOOK_BACK = "lookback";
const LOOK_UP = "lookup";


// Entity names
const PLAYER = "player";
const BALL = "ball";
const FLOWERPOT = "flowerpot";
const PARTICLE = "particle";

//entity constants
const BALL_WIDTH = 20;
const BALL_HEIGHT = 20;
const FLOWER_WIDTH = 40;
const FLOWER_HEIGHT = 60;
const PARTICLE_WIDTH = 5; //height is the same


//Player
const PLAYER_WIDTH = 75;
const PLAYER_TEXTURE_ASPECT_RATIO = 1.375;
const PLAYER_HEIGHT = 75 * PLAYER_TEXTURE_ASPECT_RATIO;

const PLAYER_INIT_X = 0;
const PLAYER_INIT_Y = PLAYER_HEIGHT / 2;
const PLAYER_INIT_Z = 5;

const PLAYER_DEFAULT_VELOCITY = 300;
const PLAYER_JUMP_HIGH_VELOCITY = 400;
const PLAYER_JUMP_LOW_VELOCITY = 200;

const PLAYER_MAX_HEALTH = 100;
const PLAYER_MIN_HEALTH = 0;




//Tiles
const MULTIPLIER = 17;
const TILE_WIDTH = SCREEN_WIDTH / MULTIPLIER;
const TILES_START = -SCREEN_WIDTH/ MULTIPLIER * 3;
const TILES_NUMBER = MULTIPLIER;

//Floor
var FLOOR_WIDTH = SCREEN_WIDTH / MULTIPLIER;
var FLOOR_HEIGHT = SCREEN_WIDTH / MULTIPLIER * 4;
var FLOOR_Z = FLOOR_HEIGHT / 2;







