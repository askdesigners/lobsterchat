import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { If, Then, Else } from 'react-if';
import { Link } from 'react-router';
import * as PostActions from '../actions/PostActions';
import Footer from '../components/Footer';

const logoPath = require('../asset/logo_large.svg');

/**
 * It is common practice to have a 'Root' container/component require our main App (this one).
 * Again, this is because it serves to wrap the rest of our application with the Provider
 * component to make the Redux store available to the rest of the app.
 */
export default class App extends Component {
    constructor() {
        super();
    }
    render() {
        // we can use ES6's object destructuring to effectively 'unpack' our props
        const { draftText, draftCommentText, posts, postsById, actions, children } = this.props;

        return (
            <div className="mainAppContainer">
                <div id="mainHeader">
                    <div className="logo">
                        <If condition={ this.props.location.pathname !== '/' }>
                            <Then>
                                <div className="backButton">
                                    <Link to='/'></Link>
                                </div>
                            </Then>
                        </If>
                        <img src={logoPath} alt=""/>
                    </div>
                </div>
                <div id="pageTarget">
                    {/* Here's a trick: we pass those props into the children by mapping
                    and cloning the element, followed by passing props in. Notice that
                    those props have been unpacked above! */}
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, { draftText, draftCommentText, posts, postsById, actions });
                    }) }
                </div>
                <Footer />
            </div>
        );
    }

    componentWillMount() {
    }
}

App.propTypes = {
    draftText: PropTypes.string,
    draftCommentText: PropTypes.string,
    posts: PropTypes.array,
    postsById: PropTypes.object,
    actions: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired
};

/**
 * Keep in mind that 'state' isn't the state of local object, but your single
 * state in this Redux application. 'counter' is a property within our store/state
 * object. By mapping it to props, we can pass it to the child component Counter.
 */
const mapStateToProps = (state) => ({
    posts: state.posts.posts,
    postsById: state.posts.postsById,
    draftText: state.posts.draftText,
    draftCommentText: state.posts.draftCommentText
})

/**
 * Turns an object whose values are 'action creators' into an object with the same
 * keys but with every action creator wrapped into a 'dispatch' call that we can invoke
 * directly later on. Here we imported the actions specified in 'CounterActions.js' and
 * used the bindActionCreators function Redux provides us.
 *
 * More info: http://redux.js.org/docs/api/bindActionCreators.html
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(PostActions, dispatch)
    };
}

/**
 * 'connect' is provided to us by the bindings offered by 'react-redux'. It simply
 * connects a React component to a Redux store. It never modifies the component class
 * that is passed into it, it actually returns a new connected componet class for use.
 *
 * More info: https://github.com/rackt/react-redux
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
