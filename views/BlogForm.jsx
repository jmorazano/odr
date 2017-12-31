const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class BlogForm extends React.Component {
  render() {
    const { currentUser, title, blogpost } = this.props;

    return (
      <SimpleLayout currentUser={currentUser} breadCrumbs="" query="">
        <div className="row">
          <div className="span12">
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="span8">
            <form method="POST" action="/write">
              <div className="field required">
                <label htmlFor="id_title">Title</label>
                <input
                  type="text"
                  required
                  name="title"
                  id="id_title"
                  value={blogpost && blogpost.title}
                />
              </div>

              <div className="field required">
                <label htmlFor="post_body">Post</label>
                <textarea name="body" id="post_body" rows="4" cols="150">
                  {blogpost && blogpost.body}
                </textarea>
              </div>

              {blogpost && (
                <input type="hidden" name="blog_id" id="blog_id" value={blogpost.id} />
              )}

              <input type="submit" className="btn" value="Save" />
            </form>
          </div>
        </div>
      </SimpleLayout>
    );
  }
}

BlogForm.defaultProps = {
  title: 'Default title',
};

BlogForm.propType = {
  title: PropTypes.string,
  searchResults: PropTypes.object,
};

module.exports = BlogForm;
