gProjs = [
    {
        id: "minesweeper",
        name: "Minesweeper",
        title: "Open all cells and escape mines!",
        desc: " on rectangular board whose object is to locate a predetermined number of randomly-placed mines in the shortest possible time by clicking on safe squares while avoiding the squares with mines. If the player clicks on a mine, the game ends",
        url: "projs/sokoban",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "guessme",
        name: "GuessMe",
        title: "Jini will guess your charecter!",
        desc: "During gameplay, it attempts to determine what fictional, or real-life character the player is thinking of by asking a series of questions (like the game Twenty Questions)",
        url: "projs/sokoban",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "book-shop",
        name: "BookShop",
        title: "Private bookshop library",
        desc: "you can add your own books and rate/edit them as you like!",
        url: "projs/sokoban",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "todo-list",
        name: "Todo List",
        title: "Todo app to keep track of daily tasks",
        desc: "This app helps keeping track of tasks by allowing you to delete, add crossline, change and sort your tasks easily",
        url: "projs/sokoban",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
    {
        id: "touch-the-nums",
        name: "Touch the Nums",
        title: "Touch all numbers as fast as possible",
        desc: "FUn and simple game where you are supposed to touch all numbers shown in the currect order, and do it as fast as you can",
        url: "projs/sokoban",
        publishedAt: Date.now(),
        labels: ["Matrixes", "keyboard events"],
    },
]

function getPortfolioItems(){
    return gProjs
}

function getItemById(itemId){
    return gProjs.find((obj)=>obj.id === itemId)
}