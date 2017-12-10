const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class UserPosts extends React.Component {
  render() {
    const { title, posts, currentUser, bloguser, isOwner } = this.props;

    return (
      <SimpleLayout breadCrumbs="" query="">
        <div class="row">
            <div class="span9">
              <h1>{title}</h1>
              <br />
              {posts.map(post => (
                <div>
                  <h2>
                    {post.title}
                    {isOwner && <a href={`/edit/${post.id}`} class="btn btn-primary btn-small">edit</a>}
                  </h2>
                  <p>{post.body}</p>
                </div>
              ))}
            </div>
        </div>
      </SimpleLayout>
    );
  }
}

UserPosts.defaultProps = {
  title: 'Default title',
};

UserPosts.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = UserPosts;
