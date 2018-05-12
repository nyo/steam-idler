## Another Node.js Steam Idler

### Features
The client handles following events, and will log them in both `account.log` file & stdout

Events|Description|
:-:|:--
[friendRelationship](https://www.npmjs.com/package/steam-user#friendrelationship)|Emitted when our relationship with a particular user changes (supported changes [here](https://github.com/DoctorMcKay/node-steam-user/blob/master/enums/EFriendRelationship.js))
[friendMessage](https://www.npmjs.com/package/steam-user#friendmessage)|Emitted when we receive a direct friend message, as long as we're online
[friendTyping](https://www.npmjs.com/package/steam-user#friendtyping)|Emitted when one of our friends is typing a message to us, as long as we're online

### Installation
In order to work, you'll need to get **Node.js** & **npm**
> [node download page](https://nodejs.org/en/download/) -- if you prefer using a package manager, [come here](https://nodejs.org/en/download/package-manager/)<br>
> [npm download page](https://www.npmjs.com/get-npm) -- might be installed with node by default

If you want to run it on a server in background, you probably want to install [**forever tool**](https://www.npmjs.com/package/forever) too
```
sudo npm install forever -g
```

Then clone this repository & install the needed packages
```
git clone https://github.com/nyo/steam-idler.git && cd steam-idler/
npm install .
```

When you're done, open `idler.js` and set your account up.<br>
You can add any game, just follow [this syntax](https://www.npmjs.com/package/steam-user#gamesplayedapps-force). You can also find all the available Steam statuses [here](https://github.com/DoctorMcKay/node-steam-user/blob/master/enums/EPersonaState.js).

### Usage
To start the idler, run `node idler.js`.<br>
By default, it has **colored output turned on**, you can disable it by running `node idler.js --no-color` instead.<br>
You can stop it at any time by sending a simple SIGINT signal (press <kbd>Ctrl</kbd>+<kbd>C</kbd>).<br>

Now, if you want it to run in background (even if you close your ssh session) use **forever**.<br>
_I recommend using `--no-color` when running in background, so the logs are not messed up_
```
forever start -c node idler.js --no-color
```

You can manage the running process, and stop it with the following commands
```
forever list
forever stop <id>
```

For more information about forever usage, please read the man page, type `forever -help`
