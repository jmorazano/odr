const React = require('react');
const PropTypes = require('prop-types');
const SimpleLayout = require('./components/SimpleLayout');

class BlogForm extends React.Component {
  render() {
    const { templateData } = this.props;

    return (
      <SimpleLayout breadCrumbs="" query="">
        <div class="row">
          <div class="span12">
            <h1>{templateData.title}</h1>
          </div>
        </div>
        <div class="row">
          <div class="span8">
            <form method="POST" action="/write">
              <div class="field required">
                <label for="id_title">Title</label>
                <input
                  type="text"
                  required
                  name="title"
                  id="id_title"
                  value={templateData.blogpost && templateData.blogpost.title}
                />
              </div>

              <div class="field required">
                <label for="post_body">Post</label>
                <textarea name="body" id="post_body" rows="4" cols="150">
                  {templateData.blogpost && templateData.blogpost.body}
                </textarea>
              </div>

              {templateData.blogpost && (
                <input type="hidden" name="blog_id" id="blog_id" value={templateData.blogpost.id} />
              )}

              <input type="submit" class="btn" value="Save" />
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
