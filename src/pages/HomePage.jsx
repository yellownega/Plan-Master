// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./HomePage.css";

export default function HomePage() {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Dhia",
      position: "Gym Coach",
      image: "/images/team/dhia.jpg",
      description:
        "Expert in strength training with 5+ years of experience helping clients achieve their fitness goals.",
    },
    {
      id: 2,
      name: "Amen",
      position: "CEO",
      image: "/images/team/amen.jpg",
      description:
        "Founder with a passion for making fitness accessible to everyone through technology.",
    },
    {
      id: 3,
      name: "Hamma",
      position: "Nutrition Specialist",
      image: "/images/team/hamma.jpg",
      description:
        "Certified nutritionist specializing in customized meal plans to complement your workout routine.",
    },
    {
      id: 4,
      name: "Louay",
      position: "Data Administrator",
      image: "/images/team/louay.jpg",
      description:
        "Tech expert ensuring our platform delivers accurate, personalized workout recommendations.",
    },
  ];

  return (
    <div className="home-page">
      <Header isScrolled={!isTop} />

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Transform Your Body <span>Today</span>
              </h1>
              <p className="subtitle">
                Your personalized fitness journey starts here
              </p>
              <div className="cta-buttons">
                <Link to="/muscle-selection" className="primary-btn">
                  Start Training <i className="fas fa-arrow-right"></i>
                </Link>
                <a href="#about" className="secondary-btn">
                  Learn More
                </a>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="/images/back_grounds/orange_gym.jpg"
                alt="Fitness Motivation"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-container">
            <div className="stat-card">
              <i className="fas fa-users"></i>
              <h3>10,000+</h3>
              <p>Active Members</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-dumbbell"></i>
              <h3>500+</h3>
              <p>Exercises</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-utensils"></i>
              <h3>200+</h3>
              <p>Nutrition Plans</p>
            </div>
            <div className="stat-card">
              <i className="fas fa-star"></i>
              <h3>4.9/5</h3>
              <p>User Rating</p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <div className="about-container">
            <div className="about-image">
              <img
                src="/images/back_grounds/about-us-icon-29-removebg-preview.png"
                alt="About GYM HUB"
                loading="lazy"
              />
            </div>
            <div className="about-content">
              <h2>
                About <span>GYM HUB</span>
              </h2>
              <p>
                Welcome to GYM HUB, your ultimate fitness companion! Our
                platform is designed to help you achieve your fitness goals
                through personalized workout recommendations, nutrition
                guidance, and comprehensive training plans.
              </p>
              <ul className="features-list">
                <li>
                  <i className="fas fa-check-circle"></i> Personalized workout
                  plans
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Muscle-specific
                  exercises
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Nutrition tracking
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Progress monitoring
                </li>
              </ul>
              <a href="#team" className="secondary-btn">
                Meet Our Team
              </a>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="team-section">
          <div className="section-header">
            <h2>
              Meet Our <span>Expert Team</span>
            </h2>
            <p>
              Our dedicated professionals are here to guide you on your fitness
              journey
            </p>
          </div>
          <div className="team-container">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-card">
                <div className="card-image">
                  <img src={member.image} alt={member.name} loading="lazy" />
                  <div className="social-links">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                  <div className="stars">★★★★★</div>
                  <p className="team-text">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <h2>Ready to Transform Your Fitness Journey?</h2>
            <p>
              Join thousands of members achieving their fitness goals with GYM
              HUB
            </p>
            <div className="cta-buttons">
              <Link to="/muscle-selection" className="primary-btn">
                Start Training Now
              </Link>
              <Link to="/get-started" className="secondary-btn">
                Get Personalized Plan
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
