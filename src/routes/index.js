import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import { NotFoundView, PostListView, PostDetailView } from '../components';
import { browserHistory } from 'react-router';

export default () => {
  return (
    <Router history={browserHistory}>
      {/* 'App' acts as a wrapper for the child components */}
      <Route path="/" component={App}>
        {/* IndexRoute is the initial component that is loaded,
            other routes are loaded according to the component
            property specified here */}
        <IndexRoute component={PostListView}/>
        <Route path="list" component={PostListView}/>
        <Route path="post/:postId" component={PostDetailView}/>
        <Route path="*" component={NotFoundView} />
      </Route>
    </Router>
  );
};
