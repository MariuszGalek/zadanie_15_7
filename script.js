class Stopwatch extends React.Component {
    constructor() {
        super();
  		this.state = {
  			running: false,
        	times: {
            	minutes: 0,
            	seconds: 0,
            	miliseconds: 0
        	},
        	results: []
      	};
    }
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	start() {
	    if (!this.state.running) {
	        this.setState({
	        	running: true,
	        });
	        this.watch = setInterval(() => this.step(), 10);
    	}
    }
    step() {
	    if (!this.state.running) return;
	    this.calculate();
	    this.setState({
	    	times: {
	    		minutes: this.state.times.minutes,
	    		seconds: this.state.times.seconds,
	    		miliseconds: this.state.times.miliseconds
	    	}
	    });
	}
	calculate() {
	    this.state.times.miliseconds += 1;
	    if (this.state.times.miliseconds >= 100) {
	        this.state.times.seconds += 1;
	        this.state.times.miliseconds = 0;
	    }
	    if (this.state.times.seconds >= 60) {
	        this.state.times.minutes += 1;
	        this.state.times.seconds = 0;
    	}
	}
	stop() {
    	this.setState({
    		running: false
    	});
    	clearInterval(this.watch);
	}
	resetTimer() {
		this.setState({
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	} 
	render() {
		return (
			<div>
				<nav>
					<h2>STOPWATCH</h2>
					<a href="#" id="start" onClick={this.start.bind(this)}>Start</a>
	            	<a href="#" id="stop" onClick={this.stop.bind(this)}>Stop</a>
					<a href="#" id="reset" onClick={this.resetTimer.bind(this)}>Reset</a>
				</nav>
				<div className="stopwatch">
					{this.format(this.state.times)}
				</div>
			</div>
		)
	}
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
);