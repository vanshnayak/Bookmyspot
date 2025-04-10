import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaUsers, FaTrophy, FaCheckCircle, FaLinkedin, FaTwitter } from 'react-icons/fa';

const AboutUs = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: 'Raj Patel',
      position: 'Founder & CEO',
      bio: 'With over 15 years of experience in the event industry, Raj founded BookMySpot with a vision to revolutionize how people book venues.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 2,
      name: 'Priya Singh',
      position: 'Chief Operations Officer',
      bio: 'Priya brings 10+ years of operational excellence, ensuring BookMySpot delivers exceptional experiences to both venues and customers.',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 3,
      name: 'Arjun Mehta',
      position: 'Chief Technology Officer',
      bio: 'A tech enthusiast with expertise in building scalable platforms, Arjun leads our development team to create seamless booking experiences.',
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      id: 4,
      name: 'Ananya Desai',
      position: 'Head of Customer Experience',
      bio: 'Passionate about customer satisfaction, Ananya ensures that every user interaction with BookMySpot exceeds expectations.',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  // Milestones in company history
  const milestones = [
    {
      year: 2018,
      title: 'BookMySpot Founded',
      description: 'Started with a simple idea to connect event organizers with venue owners in Mumbai.'
    },
    {
      year: 2019,
      title: 'Expanded to 5 Major Cities',
      description: 'Successfully expanded operations to Delhi, Bangalore, Chennai, and Hyderabad.'
    },
    {
      year: 2020,
      title: 'Virtual Event Solutions',
      description: 'Adapted to the pandemic by introducing virtual event hosting and hybrid event solutions.'
    },
    {
      year: 2021,
      title: 'Secured Series A Funding',
      description: 'Raised ₹50 crore in Series A funding to accelerate growth and enhance the platform.'
    },
    {
      year: 2022,
      title: 'Launched Mobile App',
      description: 'Released our first mobile application for both Android and iOS platforms.'
    },
    {
      year: 2023,
      title: 'Reached 1 Million Bookings',
      description: 'Celebrated the milestone of facilitating over 1 million successful venue bookings.'
    }
  ];

  // Core values
  const coreValues = [
    {
      title: 'Customer First',
      description: 'We prioritize our customers\' needs and continuously improve our services based on their feedback.'
    },
    {
      title: 'Transparency',
      description: 'We believe in being transparent in our operations, pricing, and communications with all stakeholders.'
    },
    {
      title: 'Innovation',
      description: 'We constantly innovate to provide better solutions for venue discovery and booking experiences.'
    },
    {
      title: 'Reliability',
      description: 'We ensure reliability in every booking, delivering on our promises to both venue owners and customers.'
    }
  ];

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="row mb-5">
        <div className="col-lg-12 text-center">
          <h1 className="display-5 fw-bold mb-4">About BookMySpot</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">About Us</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="row mb-5 align-items-center">
        <div className="col-lg-6">
          <div className="p-4 bg-light rounded shadow-sm">
            <h2 className="mb-4" style={{ color: "#f05537" }}>Our Mission</h2>
            <p className="lead">To simplify venue booking and event organization through technology, making exceptional spaces accessible to everyone.</p>
            <p>At BookMySpot, we're dedicated to transforming how people discover, book, and experience venues. We connect event organizers with unique spaces, streamlining the entire process from search to confirmation.</p>
            <h4 className="mt-4 mb-3" style={{ color: "#f05537" }}>Our Vision</h4>
            <p>To become the world's most trusted platform for venue discovery and booking, empowering people to create memorable events in extraordinary spaces.</p>
          </div>
        </div>
        <div className="col-lg-6">
          <img 
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Team collaboration" 
            className="img-fluid rounded shadow"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="row mb-5 text-center">
        <div className="col-12 mb-4">
          <h2 style={{ color: "#f05537" }}>Our Impact</h2>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="display-4 mb-2" style={{ color: "#f05537" }}>1M+</div>
              <h5>Successful Bookings</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="display-4 mb-2" style={{ color: "#f05537" }}>5K+</div>
              <h5>Partner Venues</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="display-4 mb-2" style={{ color: "#f05537" }}>20+</div>
              <h5>Cities Covered</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="display-4 mb-2" style={{ color: "#f05537" }}>4.8</div>
              <h5>Average Rating</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="row mb-5">
        <div className="col-12 mb-4 text-center">
          <h2 style={{ color: "#f05537" }}>Our Values</h2>
          <p className="text-muted">The principles that guide everything we do</p>
        </div>
        {coreValues.map((value, index) => (
          <div className="col-md-6 col-lg-3 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <div className="rounded-circle bg-light d-inline-flex p-3 mb-3">
                  <FaCheckCircle size={30} style={{ color: "#f05537" }} />
                </div>
                <h4 className="card-title">{value.title}</h4>
                <p className="card-text text-muted">{value.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Section */}
      <div className="row mb-5">
        <div className="col-12 mb-4 text-center">
          <h2 style={{ color: "#f05537" }}>Our Team</h2>
          <p className="text-muted">Meet the people who make BookMySpot possible</p>
        </div>
        {teamMembers.map(member => (
          <div className="col-md-6 col-lg-3 mb-4" key={member.id}>
            <div className="card h-100 shadow-sm">
              <img src={member.image} className="card-img-top" alt={member.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-subtitle mb-2 text-muted">{member.position}</p>
                <p className="card-text small">{member.bio}</p>
                <div className="mt-3">
                  <a href={member.social.linkedin} className="btn btn-sm btn-outline-primary me-2" style={{ borderColor: "#f05537", color: "#f05537" }}>
                    <FaLinkedin />
                  </a>
                  <a href={member.social.twitter} className="btn btn-sm btn-outline-primary" style={{ borderColor: "#f05537", color: "#f05537" }}>
                    <FaTwitter />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Company History Timeline */}
      <div className="row mb-5">
        <div className="col-12 mb-4 text-center">
          <h2 style={{ color: "#f05537" }}>Our Journey</h2>
          <p className="text-muted">The key milestones in our growth story</p>
        </div>
        <div className="col-lg-12">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="timeline">
                {milestones.map((milestone, index) => (
                  <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`} key={index}>
                    <div className="mb-4 pb-4 border-bottom">
                      <div className="d-flex align-items-center mb-2">
                        <span className="badge bg-primary me-2" style={{ backgroundColor: "#f05537" }}>{milestone.year}</span>
                        <h5 className="mb-0">{milestone.title}</h5>
                      </div>
                      <p className="text-muted mb-0">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="row mb-5">
        <div className="col-12 mb-4 text-center">
          <h2 style={{ color: "#f05537" }}>Why Choose BookMySpot</h2>
          <p className="text-muted">What sets us apart from the competition</p>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-light d-inline-flex p-3 mb-3">
                <FaBuilding size={30} style={{ color: "#f05537" }} />
              </div>
              <h4 className="mb-3">Unparalleled Venue Selection</h4>
              <p className="text-muted">Access to 5,000+ carefully curated venues across multiple cities, from intimate spaces to grand halls.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-light d-inline-flex p-3 mb-3">
                <FaUsers size={30} style={{ color: "#f05537" }} />
              </div>
              <h4 className="mb-3">Dedicated Support</h4>
              <p className="text-muted">Our customer experience team is available 7 days a week to assist with any booking queries or special requirements.</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body text-center p-4">
              <div className="rounded-circle bg-light d-inline-flex p-3 mb-3">
                <FaTrophy size={30} style={{ color: "#f05537" }} />
              </div>
              <h4 className="mb-3">Transparent Pricing</h4>
              <p className="text-muted">No hidden fees or surprise charges. We display all costs upfront so you can budget with confidence.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm bg-primary text-white" style={{ backgroundColor: "#f05537" }}>
            <div className="card-body p-5 text-center">
              <h3 className="mb-3">Ready to find your perfect venue?</h3>
              <p className="mb-4">Join thousands of satisfied customers who found their ideal event spaces through BookMySpot.</p>
              <Link to="/events" className="btn btn-light btn-lg">
                Browse Venues Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs; 