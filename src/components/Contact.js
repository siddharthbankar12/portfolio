import React from "react";
import "../styles/Contact.css";
import { motion } from "framer-motion";

const Contact = () => {
  const fade = {
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  };

  const verticalLeft = {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
    },
  };

  return (
    <>
      <div className="contact" id="contact">
        <div className="container">
          <motion.div
            className="heading"
            initial={{ opacity: 0 }}
            whileInView={fade}
            viewport={{ once: true }}
          >
            <p className="heading-sub-text">Hire Me</p>
            <p className="heading-text">
              <strong>Get in Touch</strong>
            </p>
          </motion.div>

          <div className="contact-box">
            <motion.div
              className="left-box"
              initial={{ opacity: 0, y: "-50px" }}
              whileInView={verticalLeft}
            >
              <div className="contact-heading ">
                <p>
                  I’m open to opportunities in software development, including
                  web applications, mobile app development, backend engineering,
                  and cloud-based solutions. Whether you need a developer to
                  build scalable systems, create intuitive user interfaces, or
                  collaborate on impactful projects — I’d be happy to connect.
                  Feel free to reach out through the contact form for inquiries,
                  collaborations, or project discussions!
                </p>
              </div>

              <div className="contact-hello">
                <p>Say Hello</p>
                <a
                  className="hello-links"
                  href="https://www.linkedin.com/in/siddharth-bankar-561a50236/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn / Siddharth Bankar
                </a>
                <a
                  className="hello-links"
                  href="mailto:siddharthbankar1204@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  E-Mail / siddharthbankar1204@gmail.com
                </a>
              </div>
            </motion.div>

            <motion.div
              className="right-box"
              initial={{ opacity: 0, y: "50px" }}
              whileInView={verticalLeft}
            >
              <form
                name="contact-form"
                method="POST"
                action="https://formsubmit.co/siddharthbankar1204@gmail.com"
              >
                <input type="hidden" name="form-name" value="contact-form" />
                <div className="form-top">
                  <div className="name">
                    <label htmlFor="name">
                      <b>Your Name</b>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="email">
                    <label htmlFor="email">
                      <b>Your Email</b>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                <div className="form-mid">
                  <div className="message">
                    <label htmlFor="message">
                      <b>Your message</b>
                    </label>
                    <textarea
                      type="text"
                      name="message"
                      id="message"
                      placeholder="Hi, I would like to discuss a project or opportunity with you."
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="form-btn">
                  <button type="submit" className="hero-contact">
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
