import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { getEvents } from '../../actions/event';

const Events = ({ getEvents, event: { events, loading }, auth }) => {
  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <Fragment>
      <h1 className="large text-primary">Events</h1>
      <p className="lead">
        <i className="fas fa-calendar-alt" /> Upcoming Alumni Events
      </p>
      {auth.isAuthenticated && auth.user && (
        <Link to="/add-event" className="btn btn-light">
          <i className="fas fa-plus" /> Add Event
        </Link>
      )}
      <div className="events">
        {events.map(event => (
          <div key={event._id} className="event bg-white p-1 my-1">
            <div>
              <h2>{event.title}</h2>
              <p>
                <Moment format="YYYY/MM/DD">{event.date}</Moment> at{' '}
                {event.location}
              </p>
              <p>{event.description}</p>
              <Link to={`/events/${event._id}`} className="btn btn-primary">
                View Details
              </Link>
              {auth.isAuthenticated && (
                <button
                  onClick={() => registerEvent(event._id)}
                  className="btn btn-success"
                >
                  Register
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

Events.propTypes = {
  getEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event,
  auth: state.auth
});

export default connect(mapStateToProps, { getEvents })(Events);