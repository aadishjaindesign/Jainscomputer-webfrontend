import "@/sections/Terms/Terms.css";

export const metadata = {
  title: "Terms & Conditions | Jains Computer",

  description:
    "Read the terms and conditions of Jains Computer regarding admissions, payments, certifications, website usage, and student conduct.",

  alternates: {
    canonical: "https://jainscomputer.com/terms-conditions",
  },
};

const Terms = () => {
  return (

    <section className="policy">

      <div className="policy-container">

        <h1>
          Terms & Conditions – Jains Computer
        </h1>

        <p className="date">
          <strong>Effective Date:</strong> 25 June 2025
        </p>

        <p className="intro">
          Welcome to Jains Computer. By accessing our website and enrolling in our services,
          you agree to be bound by the following terms and conditions. Please read them carefully.
        </p>

        <h2>
          1. Services Offered
        </h2>

        <p>
          Jains Computer provides computer education and professional training programs including but not limited to
          Digital Marketing, Video Editing, Graphic Designing, Interior Designing, Tally Prime, Data Analytics,
          Government Courses, and Website Designing (UI/UX).
        </p>

        <h2>
          2. Registration and Admission
        </h2>

        <ul>

          <li>
            All students must register through the official website or in person
          </li>

          <li>
            Admission is subject to eligibility and availability of seats in each course
          </li>

          <li>
            Jains Computer reserves the right to reject or cancel admissions at its discretion
          </li>

        </ul>

        <h2>
          3. Fees and Payments
        </h2>

        <ul>

          <li>
            All course fees must be paid as per the agreed schedule
          </li>

          <li>
            Fees once paid are non-refundable (unless specified otherwise)
          </li>

          <li>
            Late payments may result in suspension of access to classes
          </li>

        </ul>

        <h2>
          4. Use of Website
        </h2>

        <ul>

          <li>
            You agree not to misuse the website or attempt unauthorized access
          </li>

          <li>
            Content, materials, and graphics are for informational purposes only
          </li>

        </ul>

        <h2>
          5. Certification
        </h2>

        <p>
          Certificates are issued only upon successful completion of courses and fulfillment
          of all academic and fee-related requirements.
        </p>

        <h2>
          6. Conduct
        </h2>

        <ul>

          <li>
            Students must maintain respectful behavior toward instructors and staff
          </li>

          <li>
            Jains Computer reserves the right to expel or block access for misconduct
          </li>

        </ul>

        <h2>
          7. Limitation of Liability
        </h2>

        <ul>

          <li>
            We are not liable for any damages resulting from the use or inability to use our website or services
          </li>

          <li>
            While we aim to ensure accuracy, we do not guarantee completeness or timelines
          </li>

        </ul>

        <h2>
          8. Modifications
        </h2>

        <p>
          Jains Computer may update or modify these terms at any time without prior notice.
          It is your responsibility to check them regularly.
        </p>

      </div>

    </section>

  );
};

export default Terms;