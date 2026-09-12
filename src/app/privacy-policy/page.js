import "@/sections/PrivacyPolicy/PrivacyPolicy.css";

export const metadata = {
  title: "Privacy Policy | Jains Computer",

  description:
    "Read the privacy policy of Jains Computer Jaipur regarding personal data, cookies, information usage, and user rights.",

  alternates: {
    canonical: "https://jainscomputer.com/privacy-policy",
  },
};

const PrivacyPolicy = () => {
  return (
    <section className="policy">

      <div className="policy-container">

        <h1>Privacy Policy – Jains Computer</h1>

        <p className="date">
          <strong>Effective Date:</strong> 25 June 2025
        </p>

        <p className="intro">
          Jains Computer values your privacy. This policy outlines how we collect,
          use, and protect your personal information.
        </p>

        <h2>1. Information We Collect</h2>

        <ul>
          <li>Name, email, phone number, address</li>
          <li>Educational background and ID proofs</li>
          <li>Payment information (if applicable)</li>
          <li>Website usage data via cookies</li>
        </ul>

        <h2>2. How We Use Your Information</h2>

        <ul>
          <li>To process admissions and payments</li>
          <li>To communicate course-related updates</li>
          <li>For internal record-keeping and improvement</li>
          <li>To send promotional offers (you can opt out anytime)</li>
        </ul>

        <h2>3. Data Protection</h2>

        <ul>
          <li>All personal information is stored securely</li>

          <li>
            We do not share your data with third parties, except with service
            partners like payment gateways, only as needed
          </li>

        </ul>

        <h2>4. Cookies</h2>

        <ul>
          <li>
            Our website may use cookies to improve user experience and collect analytics
          </li>

          <li>
            You can modify your browser settings to disable cookies
          </li>

        </ul>

        <h2>5. Third-Party Links</h2>

        <p>
          Our website may contain links to other websites. We are not responsible
          for the content or privacy practices of such sites.
        </p>

        <h2>6. Your Rights</h2>

        <ul>
          <li>Request access to your data</li>
          <li>Ask for correction or deletion</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2>7. Contact Us</h2>

        <p>
          For any privacy-related concerns, please contact us at:
        </p>

        <ul className="contact">

          <li>
            📧 Email: jainscomputer@rediffmail.com
          </li>

          <li>
            📞 Phone: 9829498998, 6377075972
          </li>

          <li>
            📍 Address: 13, Shivpuri Colony, Main Kalwar Road, Jhotwara,
            Jaipur – 302012
          </li>

        </ul>

      </div>

    </section>
  );
};

export default PrivacyPolicy;