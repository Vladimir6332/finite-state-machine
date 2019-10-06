class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error('Error');
        this._initial = config.initial;
        this._initial_state = true;
        this.state = config.initial;
        this._prevStates = [];
        this._nextStates = [];
        this._states = config.states;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (this._states[state]) {
            this._prevStates.push(this.state);
            this._nextStates = [];
            this.state = state;
            if (this._initial_state) this._initial_state = false;
            return
        }
        throw new Error('Error');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {        
        if (this._states[this.state].transitions[event]) {
            this._prevStates.push(this.state);
            this._nextStates = [];
            this.state = this._states[this.state].transitions[event];
            if (this._initial_state) this._initial_state = false;
            return;
        }
        throw new Error('Error');

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this._initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arrStates = [];
        if (event)
        for (let state in this._states) {
            if (this._states[state].transitions[event]) arrStates.push(state);
        }
        else
        for ( let state in this._states) {
            arrStates.push(state);
        };
        return arrStates;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this._initial_state || this._prevStates.length === 0) return false;        
        this._nextStates.push(this.state);
        this.state = this._prevStates.pop();
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this._initial_state || this._nextStates.length === 0) return false;
        
            this._prevStates.push(this.state);
            this.state = this._nextStates.pop();            
            return true;
        
        
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._nextStates = [];
        this._prevStates = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
