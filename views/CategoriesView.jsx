const React = require('react');
const PropTypes = require('prop-types');
const SideNavLayout = require('./components/SideNavLayout.jsx');

class UserPosts extends React.Component {
  render() {
    const { categories, currentUser } = this.props;
    return (
      <SideNavLayout currentUser={currentUser}>
        <div className="">
          <div className="">
            <h1>Categorias</h1>
            <br />
            {categories &&
              categories.map(category => (
                <div>
                  <h2>
                    {category.name}
                    {category.author.toString() === currentUser.id && (
                      <a href={`/categories/edit/${category.id}`} className="btn btn-primary btn-small">
                        edit
                      </a>
                    )}
                  </h2>
                </div>
              ))}
          </div>
        </div>
      </SideNavLayout>
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
