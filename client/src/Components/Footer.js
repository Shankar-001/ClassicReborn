import './FooterStyles.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div id="contactUs">
      <div className="footer">
        <div className="top">
          <div>
            <h1 className="text-2xl">Sell Or Swirl</h1>
            <p>Give New Life to Old Goods.</p>
          </div>
          <div>
            <a href="https://www.instagram.com/_.witch3r/" target="_blank">
              <i className="ri-instagram-line"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/praveen-shankar-ba289a212/"
              target="_blank"
            >
              <i className="ri-linkedin-fill"></i>
            </a>
            <a href="https://github.com/Shankar-001" target="_blank">
              <i className="ri-github-fill"></i>
            </a>
          </div>
        </div>

        <div className="bottom">
          <div>
            <h4>Project</h4>
            <a href="/">Changelog</a>
            <a href="/">Status</a>
            <a href="/">License</a>
            <a href="/">All Versions</a>
          </div>
          <div>
            <h4>Community</h4>
            <a href="https://github.com/Shankar-001" target="_blank">
              GitHub
            </a>

            <a href="/">Issues</a>
            <a href="/">Project</a>
            <a href="/"> Twitter</a>
          </div>
          <div>
            <h4>Contact Us</h4>
            <i className="ri-map-pin-line">
              <span>
                {' '}
                IIIT Ranchi, <br />
                Science & Technology Campus <br /> Ranchi, Jharkhand 834004
              </span>
            </i>
            <a href="mailto:praveen01.ugec20@iiitranchi.ac.in">
              <i className="ri-mail-line text-xl mr-1">
                {' '}
                praveen01.ugec20@iiitranchi.ac.in
              </i>
            </a>
            <i className="ri-phone-line text-xl mr-1"> +91-7250489572</i>
          </div>
        </div>
      </div>
      <div className="subFooter">
        <div className="copyright">
          <p>
            Copyright © <span>{new Date().getFullYear()}</span> Praveen Shankar. All
            rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
