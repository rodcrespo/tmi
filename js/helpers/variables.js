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
const OK_MESSAGES = ["¡Has salido del paso por esta vez!", "¡Qué suerte!", "¡Has dado en el clavo!"];
const KO_MESSAGES = ["¡Oh, Oh!", "Vaya, parece que la has liado...", "¡Piénsalo mejor!"];
const NUM_HEARTS = 5;

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
const AUDIO_EAT = "eat";
const AUDIO_PUNCH = "punch";

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
const SALMOREJO = "salmorejo";
const MAQUINA = "salmorejo";
const CHUCK = "chuck";

//entity constants
const BALL_WIDTH = 20;
const BALL_HEIGHT = 20;
const FLOWER_WIDTH = 40;
const FLOWER_HEIGHT = 80;
const PARTICLE_WIDTH = 5; //height is the same
const SALMOREJO_HEIGHT = 20;
const SALMOREJO_WIDTH = 40;
const CHUCK_HEIGHT = 40;
const CHUCK_WIDTH = 40;


//Player
const PLAYER_WIDTH = 75;
const PLAYER_TEXTURE_ASPECT_RATIO = 1.375;
const PLAYER_HEIGHT = 75 * PLAYER_TEXTURE_ASPECT_RATIO;

const PLAYER_INIT_X = 0;
const PLAYER_INIT_Y = PLAYER_HEIGHT / 2 - 5;
const PLAYER_INIT_Z = 100;

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



//word cloud stuff
const CLOUD_SCALE = "log"; //log, sqrt, linear
const CLOUD_SPIRAL = "archimedean"; //archimedean, rectangular
const CLOUD_FONT = "Impact";
const CLOUD_ANGLE_COUNT = 5;
const CLOUD_ANGLE_FROM = -60;
const CLOUD_ANGLE_TO = 60;
const CLOUD_MAX_WORDS = 250;
const CLOUD_WIDTH = 900;
const CLOUD_HEIGHT = 600;
const CLOUD_HOLDER_ID = "cloudholder";

const CLOUD_TEXT = "How the Word Cloud Generator Works The layout algorithm for positioning words without overlap is available on GitHub under an open source license as d3-cloud. Note that this is the only the layout algorithm and any code for converting text into words and rendering the final output requires additional development. As word placement can be quite slow for more than a few hundred words, the layout algorithm can be run asynchronously, with a configurable time step size. This makes it possible to animate words as they are placed without stuttering. It is recommended to always use a time step even without animations as it prevents the browser’s event loop from blocking while placing the words. The layout algorithm itself is incredibly simple. For each word, starting with the most important: Attempt to place the word at some starting point: usually near the middle, or somewhere on a central horizontal line. If the word intersects with any previously placed words, move it one step along an increasing spiral. Repeat until no intersections are found. The hard part is making it perform efficiently! According to Jonathan Feinberg, Wordle uses a combination of hierarchical bounding boxes and quadtrees to achieve reasonable speeds. Glyphs in JavaScript There isn’t a way to retrieve precise glyph shapes via the DOM, except perhaps for SVG fonts. Instead, we draw each word to a hidden canvas element, and retrieve the pixel data. Retrieving the pixel data separately for each word is expensive, so we draw as many words as possible and then retrieve their pixels in a batch operation. Sprites and Masks My initial implementation performed collision detection using sprite masks. Once a word is placed, it doesn't move, so we can copy it to the appropriate position in a larger sprite representing the whole placement area. The advantage of this is that collision detection only involves comparing a candidate sprite with the relevant area of this larger sprite, rather than comparing with each previous word separately. Somewhat surprisingly, a simple low-level hack made a tremendous difference: when constructing the sprite I compressed blocks of 32 1-bit pixels into 32-bit integers, thus reducing the number of checks (and memory) by 32 times. In fact, this turned out to beat my hierarchical bounding box with quadtree implementation on everything I tried it on (even very large areas and font sizes). I think this is primarily because the sprite version only needs to perform a single collision test per candidate area, whereas the bounding box version has to compare with every other previously placed word that overlaps slightly with the candidate area. Another possibility would be to merge a word’s tree with a single large tree once it is placed. I think this operation would be fairly expensive though compared with the analagous sprite mask operation, which is essentially ORing a whole block."







