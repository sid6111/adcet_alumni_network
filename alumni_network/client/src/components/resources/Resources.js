import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getResources } from '../../actions/resource';

const Resources = ({
  getResources,
  resource: { resources, loading },
  auth
}) => {
  useEffect(() => {
    getResources();
  }, [getResources]);

  const resourceCategories = [
    { id: 'association', name: 'Alumni Association', icon: 'users' },
    { id: 'career', name: 'Career Services', icon: 'briefcase' },
    { id: 'mentorship', name: 'Mentorship Program', icon: 'hands-helping' },
    { id: 'jobs', name: 'Job Board', icon: 'search' },
    { id: 'volunteer', name: 'Volunteer Opportunities', icon: 'hand-holding-heart' },
    { id: 'directory', name: 'Alumni Directory', icon: 'book' },
    { id: 'giving', name: 'Giving Opportunities', icon: 'gift' }
  ];

  return (
    <Fragment>
      <h1 className="large text-primary">Resources</h1>
      <p className="lead">
        <i className="fas fa-link" /> Alumni Resources
      </p>
      {auth.isAuthenticated && auth.user && (
        <Link to="/add-resource" className="btn btn-light">
          <i className="fas fa-plus" /> Add Resource
        </Link>
      )}
      <div className="resources">
        {resourceCategories.map(category => {
          const categoryResources = resources.filter(
            resource => resource.category === category.id
          );
          
          return (
            <div key={category.id} className="resource-category">
              <h2>
                <i className={`fas fa-${category.icon}`} /> {category.name}
              </h2>
              {categoryResources.length > 0 ? (
                <div className="resource-list">
                  {categoryResources.map(resource => (
                    <div key={resource._id} className="resource bg-white p-1 my-1">
                      <div>
                        <h3>{resource.title}</h3>
                        <p>{resource.description}</p>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          View Resource
                        </a>
                        <Link
                          to={`/resources/${resource._id}`}
                          className="btn btn-light"
                        >
                          More Info
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No resources available in this category</p>
              )}
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

Resources.propTypes = {
  getResources: PropTypes.func.isRequired,
  resource: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  resource: state.resource,
  auth: state.auth
});

export default connect(mapStateToProps, { getResources })(Resources);