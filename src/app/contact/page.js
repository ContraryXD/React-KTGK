"use client";
import SimpleHero from "../components/SimpleHero";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <SimpleHero showCategories={true} />

      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: "url(/img/breadcrumb.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="breadcrumb__text">
                <h2>Liên hệ</h2>
                <div className="breadcrumb__option">
                  <Link href="/">Trang chủ</Link>
                  <span>Liên hệ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section Begin */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_phone"></span>
                <h4>Phone</h4>
                <p>+01-3-8888-6868</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_pin_alt"></span>
                <h4>Address</h4>
                <p>60-49 Road 11378 New York</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_clock_alt"></span>
                <h4>Open time</h4>
                <p>10:00 am to 23:00 pm</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-6 text-center">
              <div className="contact__widget">
                <span className="icon_mail_alt"></span>
                <h4>Email</h4>
                <p>hello@colorlib.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Begin */}
      <div className="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49116.39176087041!2d-86.41867791216099!3d39.69977417971648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886ca48c841038a1%3A0x70cfba96bf847f0!2sPlainfield%2C%20IN%2C%20USA!5e0!3m2!1sen!2sbd!4v1586106673811!5m2!1sen!2sbd" height="500" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
        <div className="map-inside">
          <i className="icon_pin"></i>
          <div className="inside-widget">
            <h4>New York</h4>
            <ul>
              <li>Phone: +12-345-6789</li>
              <li>Add: 16 Creek Ave. Farmingdale, NY</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Form Begin */}
      <div className="contact-form spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="contact__form__title">
                <h2>Leave Message</h2>
              </div>
            </div>
          </div>
          <form action="#">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <input type="text" placeholder="Your name" />
              </div>
              <div className="col-lg-6 col-md-6">
                <input type="text" placeholder="Your Email" />
              </div>
              <div className="col-lg-12 text-center">
                <textarea placeholder="Your message"></textarea>
                <button type="submit" className="site-btn">
                  SEND MESSAGE
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
