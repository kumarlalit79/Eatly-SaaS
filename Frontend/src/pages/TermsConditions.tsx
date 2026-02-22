import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 container-max py-12 md:py-24 space-y-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-gray-500">Last updated: October 24, 2023</p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              1. Agreement to Terms
            </h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms and Conditions constitute a legally binding agreement
              made between you, whether personally or on behalf of an entity
              ("you") and Eatly ("we," "us," or "our"). By accessing the Site
              and using our services, you agree that you have read, understood,
              and agreed to be bound by all of these Terms and Conditions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              2. Intellectual Property Rights
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Unless otherwise indicated, the Site is our proprietary property
              and all source code, databases, functionality, software, website
              designs, audio, video, text, photographs, and graphics on the Site
              (collectively, the "Content") are owned or controlled by us or
              licensed to us, and are protected by copyright and trademark laws.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              3. User Representations
            </h2>
            <p className="text-gray-600 leading-relaxed">
              By using the Site, you represent and warrant that:
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>
                All registration information you submit will be true, accurate,
                current, and complete.
              </li>
              <li>
                You have the legal capacity and you agree to comply with these
                Terms and Conditions.
              </li>
              <li>
                You will not access the Site through automated or non-human
                means, whether through a bot, script, or otherwise.
              </li>
              <li>
                You will not use the Site for any illegal or unauthorized
                purpose.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              4. Prohibited Activities
            </h2>
            <p className="text-gray-600 leading-relaxed">
              You may not access or use the Site for any purpose other than that
              for which we make the Site available. The Site may not be used in
              connection with any commercial endeavors except those that are
              specifically endorsed or approved by us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              5. Limitation of Liability
            </h2>
            <p className="text-gray-600 leading-relaxed">
              In no event will we or our directors, employees, or agents be
              liable to you or any third party for any direct, indirect,
              consequential, exemplary, incidental, special, or punitive
              damages, including lost profit, lost revenue, loss of data, or
              other damages arising from your use of the site.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
