import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Tourify',
  description:
    'Read the Privacy Policy of Tourify to understand how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Privacy Policy
        </h1>
        <p className="text-text-secondary leading-relaxed mb-4">
          Last updated: July 13, 2026
        </p>

        {/* Introduction */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            1. Introduction
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Welcome to Tourify (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your
            privacy and personal data. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our travel
            booking platform, website, and related services (collectively, the
            &quot;Service&quot;).
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            This policy applies to all users of the Service, including travelers,
            tour operators, and visitors. By accessing or using the Service, you
            agree to the practices described in this Privacy Policy. If you do not
            agree with this policy, please do not use the Service.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            This policy is effective as of July 13, 2026, and applies to all
            information collected on or after that date.
          </p>
        </section>

        {/* Information We Collect */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            2. Information We Collect
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We collect information to provide and improve our Service. The types of
            information we collect include:
          </p>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            Personal Information
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            When you create an account, book a tour, or contact us, we may collect:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Payment information (credit/debit card numbers, bKash, Nagad details)</li>
            <li>Billing and home address</li>
            <li>Date of birth and gender (when required for tour bookings)</li>
            <li>Passport or national ID details (for international tours)</li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            Booking Details
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            When you make a booking, we collect information related to your travel
            plans, including:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Tour selections and preferences</li>
            <li>Travel dates and group size</li>
            <li>Special requirements (dietary, accessibility, medical needs)</li>
            <li>Emergency contact information</li>
            <li>Booking history and transaction records</li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            Usage Data
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            We automatically collect certain information when you use the Service,
            including:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>IP address and approximate geographic location</li>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages visited, time spent, and navigation patterns</li>
            <li>Referring website or source</li>
            <li>Date and time of access</li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            Cookies and Tracking
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            We use cookies and similar tracking technologies to collect usage data
            and enhance your experience. For full details, see Section 4 below.
          </p>
        </section>

        {/* How We Use Your Information */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We use the information we collect for the following purposes:
          </p>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            To Process Bookings
          </h3>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Complete and manage your travel bookings</li>
            <li>Process payments and issue invoices</li>
            <li>Communicate with tour operators on your behalf to fulfill bookings</li>
            <li>Send booking confirmations, itineraries, and travel updates via email and SMS</li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            To Improve Our Services
          </h3>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Analyze usage patterns to enhance website functionality</li>
            <li>Personalize your experience and provide relevant tour recommendations</li>
            <li>Conduct research and analytics to improve our offerings</li>
            <li>Debug errors and resolve technical issues</li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            For Marketing
          </h3>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Send promotional emails about new tours, offers, and travel tips</li>
            <li>Deliver targeted advertisements on our platform and third-party sites</li>
            <li>Notify you of seasonal deals and personalized recommendations</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            You may opt out of marketing communications at any time by clicking the
            &quot;unsubscribe&quot; link in any email, updating your account preferences, or
            contacting us directly at privacy@tourify.com. Opting out of marketing
            will not affect transactional communications related to your existing
            bookings.
          </p>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            For Legal Compliance
          </h3>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Comply with applicable laws and regulations</li>
            <li>Respond to legal requests and prevent fraud</li>
            <li>Enforce our Terms of Service</li>
            <li>Protect the rights, property, and safety of Tourify and our users</li>
          </ul>
        </section>

        {/* Cookies and Tracking */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            4. Cookies and Tracking
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We use cookies and similar technologies to enhance your experience on
            our platform. Cookies are small data files stored on your device.
          </p>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            Types of Cookies We Use
          </h3>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>
              <strong>Session Cookies:</strong> Essential cookies that keep you logged
              in and maintain your session state while you browse our platform.
            </li>
            <li>
              <strong>Analytics Cookies:</strong> We use Google Analytics to understand
              how visitors interact with our website. This helps us improve site
              performance and user experience. Google Analytics collects information
              such as how often users visit, what pages they visit, and what other
              sites they used prior to coming to our site.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> These cookies are used to deliver
              advertisements relevant to your interests. They also limit the number of
              times you see an ad and help measure the effectiveness of advertising
              campaigns.
            </li>
            <li>
              <strong>Preference Cookies:</strong> These cookies remember your settings
              and preferences, such as language and currency, to provide a more
              personalized experience.
            </li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            Managing Cookie Preferences
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            You can control and manage cookies through your browser settings. Most
            browsers allow you to block or delete cookies. Please note that disabling
            certain cookies may impact the functionality of the Service. You can
            typically find cookie settings in your browser&apos;s &quot;Preferences&quot; or
            &quot;Settings&quot; menu.
          </p>
        </section>

        {/* Payment Information */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            5. Payment Information
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            When you make a purchase through Tourify, your payment information is
            processed securely through our trusted third-party payment processors.
          </p>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            Payment Methods
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            We support multiple payment methods including:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>bKash mobile financial services</li>
            <li>Nagad digital payment platform</li>
            <li>Credit and debit cards (Visa, Mastercard, etc.)</li>
            <li>Other local and international payment gateways</li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            Data Security
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            We do <strong>not</strong> store your full credit or debit card numbers,
            CVV codes, or PINs on our servers. All payment transactions are encrypted
            and processed through PCI DSS-compliant payment gateways. Our payment
            processors use industry-standard encryption to protect your financial
            information during transmission and storage.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            For mobile financial services like bKash and Nagad, transactions are
            handled directly through their secure APIs. We only retain transaction
            identifiers and confirmation details necessary for booking management
            and refund processing.
          </p>
        </section>

        {/* Information Sharing */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            6. Information Sharing
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We value your privacy and do <strong>not sell</strong> your personal
            information to third parties. We may share your information only in the
            following circumstances:
          </p>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            With Tour Operators
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            To fulfill your bookings, we share relevant information with the tour
            operators and service providers responsible for your travel arrangements.
            This may include your name, contact details, and booking-specific
            information such as dietary requirements, group size, and travel dates.
            These operators are required to handle your information in accordance
            with their own privacy policies and applicable data protection laws.
          </p>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            With Payment Processors
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            We share payment information with our payment processing partners solely
            for the purpose of completing transactions. These processors are
            contractually obligated to protect your data and comply with PCI DSS
            standards.
          </p>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            For Legal Requirements
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            We may disclose your information if required to do so by law or in
            response to valid requests by public authorities, including to meet
            national security or law enforcement requirements. We may also disclose
            your information to:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Enforce our Terms of Service and other agreements</li>
            <li>Protect and defend our rights, property, or safety</li>
            <li>Prevent fraud or address security vulnerabilities</li>
          </ul>

          <h3 className="text-lg font-medium text-text-primary mt-6 mb-3">
            With Service Providers
          </h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            We may engage trusted third-party companies to perform functions on our
            behalf, such as hosting, analytics, customer support, and email delivery.
            These providers have access only to the information necessary to perform
            their functions and are obligated to protect it.
          </p>
        </section>

        {/* Data Security */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            7. Data Security
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We take the security of your personal information seriously and implement
            multiple layers of protection:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>
              <strong>Encryption:</strong> All data transmitted between your browser
              and our servers is encrypted using SSL/TLS (Secure Sockets Layer /
              Transport Layer Security) encryption with industry-standard 256-bit
              encryption.
            </li>
            <li>
              <strong>Access Controls:</strong> Access to personal data is restricted
              to authorized employees and contractors who need it to perform their
              job functions. All access is logged and audited.
            </li>
            <li>
              <strong>Secure Storage:</strong> Personal data is stored on secure
              servers with firewall protection, intrusion detection systems, and
              regular security monitoring.
            </li>
            <li>
              <strong>Regular Audits:</strong> We conduct regular security
              assessments, penetration testing, and vulnerability scanning to identify
              and address potential security risks.
            </li>
            <li>
              <strong>Data Minimization:</strong> We only collect and retain
              personal data that is necessary for the purposes described in this
              policy.
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            While we strive to protect your personal information, no method of
            transmission over the Internet or electronic storage is 100% secure. We
            cannot guarantee absolute security, but we continuously work to implement
            and maintain industry best practices.
          </p>
        </section>

        {/* Your Rights */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            8. Your Rights
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            You have the following rights regarding your personal data:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>
              <strong>Access:</strong> You can request a copy of the personal data
              we hold about you at any time.
            </li>
            <li>
              <strong>Correction:</strong> You can request that we correct any
              inaccurate or incomplete personal data.
            </li>
            <li>
              <strong>Deletion:</strong> You can request that we delete your
              personal data, subject to certain legal exceptions (such as data
              required for tax or legal compliance).
            </li>
            <li>
              <strong>Opt-Out of Marketing:</strong> You can unsubscribe from
              marketing emails by clicking the &quot;unsubscribe&quot; link in any email or
              by updating your account preferences.
            </li>
            <li>
              <strong>Data Portability:</strong> You can request a structured,
              commonly used, and machine-readable copy of your personal data for
              transfer to another service.
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            To exercise any of these rights, please contact us at
            privacy@tourify.com. We will respond to your request within 30 days.
            We may ask you to verify your identity before processing your request.
          </p>
        </section>

        {/* Data Retention */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            9. Data Retention
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We retain your personal data only for as long as necessary to fulfill
            the purposes described in this policy or as required by law:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>
              <strong>Booking Records:</strong> We retain booking and transaction
              data for 7 years from the date of the transaction to comply with
              Bangladesh tax regulations, financial record-keeping requirements, and
              legal obligations.
            </li>
            <li>
              <strong>Account Information:</strong> We retain your account data for
              as long as your account remains active. If you request account
              deletion, we will remove your personal data within 30 days, except
              where retention is required by law.
            </li>
            <li>
              <strong>Marketing Data:</strong> We retain marketing preferences and
              related data until you unsubscribe or request deletion. After
              unsubscribing, we retain only a minimal record to honor your opt-out
              preference.
            </li>
            <li>
              <strong>Usage Data:</strong> Anonymized usage data may be retained
              indefinitely for analytical purposes.
            </li>
          </ul>
        </section>

        {/* Children's Privacy */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            10. Children&apos;s Privacy
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            The Service is not intended for use by individuals under the age of 18.
            We do not knowingly collect personal information from children under 18
            without the consent of a parent or legal guardian.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            If we become aware that we have collected personal information from a
            child under 18 without parental consent, we will take steps to delete
            that information promptly. If you believe that a child has provided us
            with personal information without proper consent, please contact us at
            privacy@tourify.com.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            For tours that include minors, the booking must be made by a parent or
            legal guardian who accepts full responsibility for the minor&apos;s
            participation and data processing as described in this policy.
          </p>
        </section>

        {/* International Data Transfers */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            11. International Data Transfers
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Tourify is based in Bangladesh, and our primary operations and servers
            are located within Bangladesh. Your personal data may be processed in
            Bangladesh or in any country where our service providers or partners
            operate.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            When you use the Service from outside Bangladesh, your information may
            be transferred to and processed in Bangladesh. By using the Service, you
            consent to such transfers. We ensure that appropriate safeguards are in
            place to protect your personal data in accordance with this Privacy
            Policy and applicable data protection laws.
          </p>
        </section>

        {/* Changes to This Policy */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            12. Changes to This Policy
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We may update this Privacy Policy from time to time to reflect changes
            in our practices, technology, legal requirements, or other factors. When
            we make material changes, we will:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 space-y-1">
            <li>Post the updated policy on this page with a new &quot;Last updated&quot; date</li>
            <li>
              Notify you via email or a prominent notice on our website before the
              changes take effect
            </li>
            <li>
              Where required by law, obtain your consent before applying the updated
              policy
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            We encourage you to review this Privacy Policy periodically to stay
            informed about how we protect your data. Your continued use of the
            Service after any changes constitutes your acceptance of the updated
            policy.
          </p>
        </section>

        {/* Contact Us */}
        <section>
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            13. Contact Us
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            If you have any questions, concerns, or requests regarding this Privacy
            Policy or our data practices, please contact us at:
          </p>
          <div className="bg-white rounded-xl p-6 shadow-sm mt-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-text-secondary font-medium">Email:</span>
                <a
                  href="mailto:privacy@tourify.com"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  privacy@tourify.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-text-secondary font-medium">Phone:</span>
                <a
                  href="tel:+880123456789"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  +880 123 456 789
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-text-secondary font-medium">Address:</span>
                <span className="text-text-primary">
                  Tourify Headquarters<br />
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
