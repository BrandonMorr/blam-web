<img width="1080" alt="screenshot" src="https://user-images.githubusercontent.com/5700335/82046493-57f3bf00-96f4-11ea-9b20-b7e5902b5d53.png">

## Demo

Check out the [live demo](https://crazy8smackdown.herokuapp.com/).

## Rules

Players start with a countdown score of 8 and are dealt that number of cards at the beginning of the game.

Similar to Crazy 8s, cards are played according to suit matching or number matching in clockwise fashion. When a player gets rid of all the cards in their hand, their countdown score decreases and are dealt that number of cards.

Two is pick up 2, queen of spades is pick up 5, jack is skip the next player's turn and king is reverse direction of play. 

Wildcards correspond to a player's countdown score, this would mean fives are your wildcard when your countdown score is 5.

The game ends once a player's countdown score reaches zero.

## Setup

Requirements: [Node.js](https://nodejs.org/)

Run the following commands from the project's root directory:

```bash
# Install project dependencies
npm install

# Compile server and client
npm run build

# Run the server
npm run start

# If nothing exploded, you should see something like this in your console:

🕺 server init complete, listening for connections on port 3000 🕺
```

Then load the client by hitting whatever port the server is listening for connections on using your browser of choice.

## Credits

Card assets are a part of the [Boardgame Pack](https://www.kenney.nl/assets/boardgame-pack) provided by [Kenney Assets](https://www.kenney.nl/).
