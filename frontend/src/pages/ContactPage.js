import React, { useState } from "react";
import "./HomePage.css";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    // Normally, you would send the form data to your backend here.
  };

  return (
    <div className="homepage-quizqueen-bg d-flex flex-column min-vh-100">
      <div className="container py-5 flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        <div className="quizqueen-step-card" style={{ maxWidth: 500, width: "100%" }}>
          <h2 className="mb-4 quizqueen-title text-center">
            <span className="brand-gradient">Contact Us</span>
          </h2>
          {sent ? (
            <div className="alert alert-success">Thank you for contacting us! We'll get back to you soon.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  name="name"
                  className="form-control"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Your Message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-quizqueen-main w-100">
                Send Message
              </button>
            </form>
          )}
          <div className="mt-4 text-muted text-center">
            Or email us at:{" "}
            <a href="mailto:support@quizplatform.com" className="text-primary">
              admin123@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;