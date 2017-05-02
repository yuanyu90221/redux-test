import React from 'react';
import {render} from 'react-dom';
import {createStore, bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';
//Action 
function changeText(){
    return {
        type: 'CHANGE_TEXT'
    }
}

function buttonClick(){
    return {
        type: 'BUTTON_CLICK'
    }
}

// Reducer
const initialState = {
    text: 'Hello'
}

function myApp(state = initialState, action){
    switch(action.type){
        case 'CHANGE_TEXT':
            return {
                text: state.text=='Hello'?'Stark':'Hello'
            }
        case 'BUTTON_CLICK':
            return {
                text: 'You just click button'
            }
        default:
            return {
                text: 'Hello'
            }
    }
}

// store
let store = createStore(myApp);

//Hello 
class Hello extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.actions.changeText();
    }

    render(){
        return (<h1 onClick={this.handleClick}>{this.props.text}</h1>)
    }
}

// Change
class Change extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.props.actions.buttonClick();
    }

    render(){
        return (<button onClick={this.handleClick}>change</button>)
    }
}
//App
/*var App = React.createClass({
    
    render(){
        //actions 
        const {actions, text} = this.props;
        return (
            <div>
                <Hello actions={actions} text={text}/>
                <Change actions={actions}/>
            </div>
        );
    }
});*/
var App = (props)=>(<div><Hello actions={props.actions} text={props.text}/>
                <Change actions={props.actions}/></div>);

function mapStateToProps(state){
    return {text: state.text};
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({changeText: changeText, buttonClick:buttonClick},dispatch)
    }
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)
