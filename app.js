const Header = (props) => {
    return (
        <header>
            <h1>{ props.title }</h1>
            <span className="stats">Players: { props.totalPlayers }</span>
        </header>
    );
}

const Player = (props) => {
    return (
        <div className="player">
            <span className="player-name">
            <button className="remove-player" onClick={ () => props.removePlayer(props.id) }>✖</button>
                { props.name }
            </span>
            <Counter />
        </div>
    );
}

//  NOTE to self -- this is a class component -- it allows for the use of state, making it dynamic
//       NOTICE:    added the constructor (format as shown) score has a default of 0
//                  changed -- getting the value from state (rather than props)
class Counter extends React.Component {

    //  longhand version
    /*constructor() {
        super()
        this.state = {
            score: 0
        }
    }*/

    //  shorthand version -- not supported by all browsers but Babel takes up the slack & creates the constructor
    state = {
        score: 0
    };
    //  NOTE to self: using prevState because this functions asynchronously
    decrementScore = () => {
        this.setState( prevState => ({  //  wrapping => with () eliminates need for explicit 'return()'
            score: prevState.score - 1
        }));
    }

    incrementScore = () => {
        this.setState( prevState => ({
            score: prevState.score + 1
        }));
    } 

    render() {
        return (
            <div className="counter">
                <button className="counter-action decrement" onClick={ this.decrementScore }> - </button>
                <span className="counter-score">{ this.state.score }</span>
                <button className="counter-action increment" onClick={ this.incrementScore }> + </button>
            </div>
        );
    }
}

class App extends React.Component {

    state = {
        players: [
            {
                name: "Philemon",
                id: 1
            },
            {
                name: "Rufus",
                id: 2
            },
            {
                name: "Apollo",
                id: 3
            },
            {
                name: "Aquila",
                id: 4
            },
            {
                name: "Priscilla",
                id: 5
            }
        ]
    }

    handleRemovePlayer = (id) => {
        this.setState( prevState => {
            return {
                players: prevState.players.filter( p => p.id !== id)
            }
        });
    }

    render() {
        return (
            <div className="scoreboard">
                <Header 
                    title="Scoreboard" 
                    totalPlayers={ this.state.players.length } 
                />
                {/* Players List -- note, removed the property "score" from Player */}
                { this.state.players.map( player => 
                    <Player 
                        name={ player.name }
                        id={ player.id }  
                        key={ player.id.toString() }
                        removePlayer={ this.handleRemovePlayer }
                    />
                ) }
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
);