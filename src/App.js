import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      a: '',
      b: '',
    }

    //setTimeout(() => {ReactDOM.unmountComponentAtNode(document.getElementById('root'))}, 5000);
  }

  componentWillMount() {
    //console.log('willmount');
  }

  componentDidMount() {
    //console.log('did mount');
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('did update');
  }

  componentWillUnmount() {
    //console.log('willUnmount');
  }

  componentWillUpdate(nextProps, nextState) {
    //console.log('willUpdate')
  }

  componentWillReceiveProps(nextProps) {
    //console.log(nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.a.length > 5;
  }
  update(e) {
    console.log(this.props);
    //console.log(this.state);
    this.setState({
      a: this.a.refs.a1.value,
      b: this.refs.b.value,
    });

    //ReactDOM.render(<App {...this.props} a={Math.random()} />, document.getElementById('root'));
    //React.createElement(<App {...this.props} a={Math.random()} />, document.getElementById('root'));
  }

  render() {
    return (
      <div>
        <Widget ref={component => this.a = component } update={this.update.bind(this)} />{this.state.a}
        <hr />
        <input type="text" ref="b" onChange={this.update.bind(this)} /> {this.state.b}
      </div>
    );
  }
}

class Widget extends React.Component {
  render() {
    return <div><input ref="a1" type="text" onChange={this.props.update} /></div>;
  }
}

/*const Widget = (props) => 
  <textarea onChange={props.update} 
            onBlur={props.update}
            onFocus={props.update}
            onTouchStart={props.update}
            onTouchMove={props.update}
            onTouchEnd={props.update}
            type="text" />;*/

/*App.propTypes = {
  someProp(props, propName, component) {
    if (!(propName in props)) return new Error(`missing ${propName}`);
    if (props[propName].length < 5) return new Error(`prop ${propName} is too short!`);
  }
};*/

/*App.defaultProps = {
  txt: "default props!",
}*/
//const App = () => <div>Ahaha!</div>;

export default App;