import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 container-max py-12 md:py-24 space-y-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-gray-500">Last updated: October 24, 2023</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Eatly ("we," "our," or "us"). We are committed to
              protecting your personal information and your right to privacy.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website and use our
              application.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We collect information that you provide directly to us when you
              register for an account, upload menu images, or contact us for
              support. This includes:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Personal identifiers (Name, Email address).</li>
              <li>User content (Menu photos uploaded for analysis).</li>
              <li>Usage data (Interaction with our features).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Provide, operate, and maintain our services.</li>
              <li>Improve, personalize, and expand our platform.</li>
              <li>
                Analyze menu images to provide nutritional insights (OCR and AI
                processing).
              </li>
              <li>
                Communicate with you regarding updates, security alerts, and
                support.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              4. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational security
              measures designed to protect the security of any personal
              information we process. However, please also remember that we
              cannot guarantee that the internet itself is 100% secure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              5. Contact Us
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions or comments about this policy, you may email
              us at support@eatly.app.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
