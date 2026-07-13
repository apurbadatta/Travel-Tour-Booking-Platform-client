import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Tourify",
  description:
    "Read the Terms & Conditions governing the use of Tourify's travel booking platform and services in Bangladesh.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Terms &amp; Conditions
        </h1>
        <p className="text-text-secondary leading-relaxed mb-4">
          <strong>Last updated: July 13, 2026</strong>
        </p>

        {/* Introduction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            1. Introduction
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Welcome to Tourify (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). These Terms &amp;
            Conditions (&quot;Terms&quot;) govern your access to and use of our website, mobile
            applications, and any related services (collectively, the &quot;Platform&quot;) operated
            by Tourify, a travel booking platform registered in Bangladesh.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            By accessing or using the Platform, creating an account, or making a booking,
            you (&quot;you,&quot; &quot;your,&quot; or &quot;User&quot;) agree to be bound by these Terms in their
            entirety. If you do not agree to these Terms, you must immediately cease use
            of the Platform.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            These Terms apply to all visitors, users, and customers of Tourify. We
            reserve the right to update or modify these Terms at any time without prior
            notice. Your continued use of the Platform after any changes constitutes
            acceptance of the revised Terms. It is your responsibility to review these
            Terms periodically.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            These Terms are effective as of July 13, 2026, and supersede all prior
            versions of our Terms &amp; Conditions.
          </p>
        </section>

        {/* Booking Terms */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            2. Booking Terms
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            2.1. All bookings made through Tourify are subject to availability and
            confirmation by the respective tour operator or service provider. Placing a
            booking does not guarantee confirmation until we have verified availability
            and received the required payment.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            2.2. A non-refundable deposit of 30% of the total tour price is required
            at the time of booking to secure your reservation. The remaining balance
            must be paid in full no later than 14 days before the scheduled tour
            departure date. Failure to pay the balance by the deadline may result in
            automatic cancellation of your booking without further notice.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            2.3. Upon successful completion of your booking and receipt of payment, you
            will receive a booking confirmation via email. This confirmation will
            include your booking reference number, tour details, and payment receipt.
            You must review this confirmation carefully and notify us immediately of any
            discrepancies.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            2.4. Tourify reserves the right to limit the number of bookings per person,
            per household, or per payment method for any tour or promotional offer.
            Bookings found to exceed these limits may be cancelled at our sole
            discretion.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            2.5. The primary traveler making the booking must be at least 18 years of
            age and possess legal capacity to enter into a binding contract. By making a
            booking, you represent and warrant that you meet these requirements.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            2.6. You are responsible for ensuring that all information provided at the
            time of booking — including full legal name, contact details, travel dates,
            and any special requirements — is accurate and complete. Tourify shall not
            be liable for any costs or losses arising from inaccurate or incomplete
            information provided by you.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            2.7. Group bookings of 10 or more travelers may be subject to additional
            terms, conditions, and pricing, which will be communicated separately at the
            time of inquiry.
          </p>
        </section>

        {/* Pricing & Payment */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            3. Pricing &amp; Payment
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            3.1. All prices displayed on the Platform are in Bangladeshi Taka (BDT)
            unless otherwise explicitly stated. Prices are subject to change without
            notice until a booking is confirmed and full payment is received.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            3.2. Unless explicitly stated in the tour description, the following are
            <strong> included</strong> in the published tour price:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 ml-4">
            <li>Accommodation as specified in the tour itinerary</li>
            <li>Meals as indicated in the tour program (breakfast, lunch, and/or dinner)</li>
            <li>Ground transportation within Bangladesh as outlined in the itinerary</li>
            <li>Services of a licensed tour guide where applicable</li>
            <li>Entrance fees to sites and attractions listed in the itinerary</li>
            <li>Applicable taxes and government levies</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            3.3. The following are <strong>not included</strong> in the published tour price
            unless explicitly stated:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 ml-4">
            <li>International or domestic airfare</li>
            <li>Visa fees and passport charges</li>
            <li>Travel insurance (strongly recommended — see Section 7)</li>
            <li>Personal expenses including laundry, telephone calls, and minibar charges</li>
            <li>Gratuities and tips for guides, drivers, and hotel staff</li>
            <li>Meals and beverages not specified in the tour program</li>
            <li>Optional activities, excursions, or tours not included in the itinerary</li>
            <li>Any costs arising from changes to the itinerary requested by the traveler</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            3.4. Tourify accepts the following payment methods:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 ml-4">
            <li>bKash</li>
            <li>Nagad</li>
            <li>Bank Transfer (direct deposit to our designated bank account)</li>
            <li>Credit Card (Visa, Mastercard, American Express)</li>
            <li>Debit Card (Visa Debit, Mastercard Debit)</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            3.5. Full payment must be completed no later than 14 days before the
            scheduled departure date. Bookings not fully paid by this deadline may be
            automatically cancelled, and any deposit already paid will be subject to the
            cancellation policy outlined in Section 4.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            3.6. All applicable taxes, service charges, and government levies are
            included in the displayed price unless clearly indicated otherwise. In the
            event of a change in applicable taxes or levies after your booking is
            confirmed, any additional charges will be communicated to you prior to
            departure, and you will be required to settle them before the tour commences.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            3.7. Prices may be subject to change due to currency fluctuations, fuel
            surcharges, or government-imposed levies. While we endeavor to honor
            published prices, any material change will be communicated to you before
            confirmation of your booking.
          </p>
        </section>

        {/* Cancellation & Refund Policy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            4. Cancellation &amp; Refund Policy
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            4.1. If you wish to cancel a confirmed booking, you must notify Tourify in
            writing via email at <strong>support@tourify.com</strong>. The cancellation
            will take effect on the date we receive and acknowledge your written
            request.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            4.2. Refund amounts are calculated based on the number of days between the
            date of your cancellation request and the scheduled tour departure date, as
            follows:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 ml-4">
            <li>
              <strong>30 or more days before departure:</strong> Full refund minus a 5%
              administrative fee of the total tour cost.
            </li>
            <li>
              <strong>15 to 29 days before departure:</strong> 50% refund of the total
              tour cost.
            </li>
            <li>
              <strong>7 to 14 days before departure:</strong> 25% refund of the total
              tour cost.
            </li>
            <li>
              <strong>Less than 7 days before departure:</strong> No refund will be
              issued.
            </li>
            <li>
              <strong>No-show (failure to appear at the departure point without prior
              notice):</strong> No refund will be issued.
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            4.3. Refunds will be processed within 14 business days from the date of
            approved cancellation. Refunds will be made to the original payment method.
            Bank transfer and bKash/Nagad refunds may take an additional 3-5 business
            days to reflect in your account.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            4.4. <strong>Tour Operator Cancellation:</strong> In the unlikely event
            that we or our tour operator partners must cancel a tour due to operational
            reasons, insufficient enrollment, or any cause within our control, you will
            be offered one of the following options at your choice:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 ml-4">
            <li>A full refund of all amounts paid, or</li>
            <li>Rescheduling to an alternative date or equivalent tour at no additional cost.</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            4.5. <strong>Force Majeure:</strong> Tourify shall not be liable for any
            failure or delay in performing its obligations where such failure or delay
            results from circumstances beyond our reasonable control, including but not
            limited to: natural disasters, floods, cyclones, earthquakes, epidemics or
            pandemics, government-imposed restrictions, travel bans, war, civil unrest,
            strikes, or disruptions to transportation infrastructure. In the event of
            force majeure, we will offer you:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 ml-4">
            <li>Rescheduling of your tour to a mutually agreed date, or</li>
            <li>A credit voucher for the full value of your booking, valid for 12 months from the original departure date, to be used toward any future Tourify booking.</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            4.6. No-shows, late arrivals, or voluntary departure from a tour before its
            scheduled conclusion will not qualify for any refund. Tourify strongly
            recommends purchasing comprehensive travel insurance to protect against
            unforeseen circumstances.
          </p>
        </section>

        {/* Tour Changes & Modifications */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            5. Tour Changes &amp; Modifications
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            5.1. Tourify and its partner tour operators reserve the right to modify
            itineraries, schedules, accommodation, transportation arrangements, and
            other aspects of any tour at any time and without prior notice. Such
            modifications may be necessary due to weather conditions, safety concerns,
            local regulations, natural disasters, public health directives, or other
            circumstances beyond our reasonable control.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            5.2. In the event of significant weather-related changes that materially
            alter the nature of the tour (e.g., route changes, attraction closures,
            activity cancellations), we will make reasonable efforts to provide
            equivalent alternatives. If no satisfactory alternative can be arranged, a
            partial refund may be applicable at our sole discretion, calculated based
            on the unused portion of the tour.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            5.3. Tours are subject to minimum group size requirements as specified in
            each tour listing. If the minimum group size is not met, we reserve the
            right to:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 ml-4">
            <li>
              Cancel the tour and provide you with a full refund or the option to
              reschedule,
            </li>
            <li>
              Offer you a substitute tour of equivalent or superior quality at no
              additional cost, or
            </li>
            <li>
              Proceed with the tour as a smaller group, which may result in adjusted
              pricing.
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            5.4. Where a tour must be substituted, we will endeavor to replace it with
            a tour of equivalent standard and value. You will be notified of any
            substitution as soon as reasonably practicable, and you may accept the
            substitute or cancel your booking for a full refund if the substitution is
            materially different from the original tour.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            5.5. Any changes requested by the traveler after booking confirmation —
            including date changes, room upgrades, or additional services — may be
            subject to availability and additional charges, which will be communicated
            before processing.
          </p>
        </section>

        {/* Traveler Responsibilities */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            6. Traveler Responsibilities
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            6.1. <strong>Identification &amp; Documentation:</strong> You are solely
            responsible for carrying valid government-issued identification at all times
            during travel. Depending on the tour and destination, this may include a
            valid Bangladeshi passport, national ID card, or other travel documents. For
            international tours, you must ensure your passport is valid for at least six
            months beyond the date of travel and that all required visas have been
            obtained prior to departure.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            6.2. <strong>Health &amp; Fitness:</strong> Some tours may involve strenuous
            physical activity, trekking, or travel to remote areas. You must ensure that
            you are in adequate physical health to participate in the activities included
            in your chosen tour. It is your responsibility to disclose any relevant
            medical conditions or dietary requirements at the time of booking. Tourify
            reserves the right to refuse participation to any traveler whose condition
            poses a risk to themselves or others.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            6.3. <strong>Travel Insurance:</strong> Tourify strongly recommends that all
            travelers purchase comprehensive travel insurance covering trip
            cancellation, medical emergencies, personal liability, and loss of
            belongings. Tourify is not an insurance provider and does not assume any
            liability for losses that could have been covered by travel insurance. It is
            your responsibility to arrange suitable coverage before departure.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            6.4. <strong>Compliance with Tour Guides &amp; Itinerary:</strong> You agree
            to follow the reasonable instructions of your tour guide and adhere to the
            published itinerary. Failure to comply with guide instructions may result in
            your removal from the tour without refund, particularly where such failure
            compromises safety or violates local laws.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            6.5. <strong>Local Laws &amp; Customs:</strong> You are responsible for
            respecting and complying with all applicable local laws, regulations, and
            cultural customs at your destination. Tourify shall not be held liable for
            any legal consequences arising from your failure to comply with local laws
            or customs.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            6.6. <strong>Personal Belongings:</strong> You are responsible for the
            security of your personal belongings at all times. Tourify shall not be
            liable for any loss, theft, or damage to personal items during the tour.
          </p>
        </section>

        {/* Liability & Disclaimer */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            7. Liability &amp; Disclaimer
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            7.1. <strong>Role as Booking Agent:</strong> Tourify acts as an intermediary
            booking agent between you and the tour operators, hotels, transportation
            providers, and other third-party service providers. We do not directly
            operate, control, or manage the tours, accommodations, or services listed on
            our Platform. Our role is limited to facilitating bookings and processing
            payments on your behalf.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            7.2. <strong>Tour Operator Liability:</strong> The tour operator or service
            provider identified in your booking confirmation is responsible for the
            actual delivery of the tour and associated services. Any claims, disputes,
            or issues arising from the quality, safety, or performance of the tour
            should be directed to the tour operator in the first instance. Tourify will
            use reasonable efforts to assist in resolving disputes but assumes no direct
            liability for the acts or omissions of tour operators.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            7.3. <strong>Third-Party Services:</strong> The Platform may include links to
            or bookings for services provided by third parties (e.g., airlines, hotels,
            car rental companies). We are not responsible for the content, accuracy,
            privacy practices, or availability of third-party websites or services. Your
            use of third-party services is subject to the terms and conditions of those
            providers.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            7.4. <strong>Limitation of Liability:</strong> To the maximum extent
            permitted by applicable law, Tourify&apos;s total aggregate liability to you in
            connection with any booking, tour, or use of the Platform shall not exceed
            the total amount paid by you for the specific booking giving rise to the
            claim. In no event shall Tourify be liable for any indirect, incidental,
            special, consequential, or punitive damages, including but not limited to
            loss of profits, data, or travel expenses.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            7.5. <strong>Travel Insurance Recommendation:</strong> Given the inherent
            risks associated with travel, including but not limited to illness, injury,
            theft, flight cancellations, and natural disasters, Tourify strongly
            encourages all travelers to purchase comprehensive travel insurance. This is
            especially important for tours involving adventure activities, remote
            destinations, or international travel.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            8. Intellectual Property
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            8.1. All content displayed on the Platform — including but not limited to
            text, graphics, logos, icons, images, photographs, videos, software, tour
            descriptions, and digital downloads — is the exclusive property of Tourify
            or its licensors and is protected by the copyright, trademark, and
            intellectual property laws of Bangladesh and applicable international
            treaties.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            8.2. You are granted a limited, non-exclusive, non-transferable license to
            access and use the Platform for personal, non-commercial purposes only. You
            may not reproduce, distribute, modify, display, perform, publish, license,
            create derivative works from, or sell any content obtained from the Platform
            without our prior written consent.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            8.3. Photographs, descriptions, and multimedia content on the Platform are
            the property of Tourify and its content partners. Unauthorized use of these
            materials — including reproduction on other websites, social media, or
            commercial materials — is strictly prohibited.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            8.4. <strong>User-Generated Content:</strong> By submitting reviews,
            photographs, comments, or other content to the Platform, you grant Tourify
            a non-exclusive, worldwide, royalty-free, perpetual, and irrevocable license
            to use, reproduce, modify, adapt, publish, translate, and distribute such
            content in any media. You represent and warrant that you own or have the
            necessary rights to any content you submit and that such content does not
            infringe upon the rights of any third party.
          </p>
        </section>

        {/* User Accounts */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            9. User Accounts
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            9.1. To access certain features of the Platform, you may be required to
            create a user account. You agree to provide accurate, current, and complete
            information during the registration process and to keep your account
            information up to date at all times.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            9.2. You are solely responsible for maintaining the confidentiality and
            security of your account credentials, including your password. You must not
            share your account details with any third party. You agree to notify
            Tourify immediately at <strong>support@tourify.com</strong> if you become
            aware of any unauthorized use of your account or any other breach of
            security.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            9.3. You may maintain only one active account per person. Duplicate or
            fraudulent accounts may be terminated without notice, and any bookings
            associated with such accounts may be cancelled at our sole discretion.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            9.4. Tourify reserves the right to suspend or permanently terminate your
            account at any time, without prior notice, if we reasonably believe that
            you have violated these Terms, engaged in fraudulent activity, or acted in a
            manner that is harmful to other users or the Platform.
          </p>
        </section>

        {/* Prohibited Conduct */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            10. Prohibited Conduct
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            You agree not to engage in any of the following prohibited activities when
            using the Platform:
          </p>
          <ul className="list-disc list-inside text-text-secondary leading-relaxed mb-4 ml-4">
            <li>
              <strong>Fraud:</strong> Using false, stolen, or stolen identity
              information to make bookings; misrepresenting your identity or affiliation
              with any person or entity; using stolen payment instruments.
            </li>
            <li>
              <strong>Harassment:</strong> Engaging in threatening, abusive, harassing,
              defamatory, or otherwise objectionable behavior toward Tourify staff,
              tour operators, guides, or fellow travelers.
            </li>
            <li>
              <strong>Unauthorized Commercial Use:</strong> Using the Platform for any
              unauthorized commercial purpose, including reselling bookings, offering
              unauthorized tour packages, or engaging in any form of unauthorized
              solicitation or advertising.
            </li>
            <li>
              <strong>Hacking &amp; Disruption:</strong> Attempting to gain unauthorized
              access to any portion of the Platform, its servers, or any connected
              databases; introducing viruses, trojans, worms, or other malicious code;
              disrupting or interfering with the Platform&apos;s infrastructure or other
              users&apos; experience.
            </li>
            <li>
              <strong>Data Scraping:</strong> Using automated systems, bots, crawlers,
              or scripts to extract data from the Platform without our express written
              consent.
            </li>
            <li>
              <strong>Impersonation:</strong> Impersonating or attempting to impersonate
              Tourify, a Tourify employee, another user, or any other person or entity.
            </li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-4">
            Violations of this section may result in immediate account termination,
            booking cancellation without refund, and may be reported to the appropriate
            law enforcement authorities.
          </p>
        </section>

        {/* Dispute Resolution */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            11. Dispute Resolution
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            11.1. <strong>Governing Law:</strong> These Terms shall be governed by and
            construed in accordance with the laws of the People&apos;s Republic of
            Bangladesh, without regard to its conflict of law provisions.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            11.2. <strong>Amicable Resolution:</strong> In the event of any dispute,
            controversy, or claim arising out of or relating to these Terms or the use
            of the Platform, the parties shall first endeavor to resolve the matter
            amicably through good-faith negotiation. You agree to contact Tourify at
            <strong> legal@tourify.com</strong> to initiate the dispute resolution
            process.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            11.3. <strong>Arbitration:</strong> If the dispute cannot be resolved
            amicably within 30 days, either party may refer the matter to binding
            arbitration administered by the Bangladesh Arbitration Act, 2001, or any
            successor legislation. The arbitration shall be conducted in Dhaka, and the
            language of arbitration shall be English. The arbitral award shall be final
            and binding on both parties.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            11.4. <strong>Jurisdiction:</strong> Notwithstanding the foregoing, either
            party retains the right to seek injunctive or other equitable relief from
            the competent courts of Dhaka, Bangladesh, where necessary to prevent
            irreparable harm. The parties irrevocably submit to the exclusive
            jurisdiction of the courts of Dhaka for any proceedings not subject to
            arbitration.
          </p>
        </section>

        {/* Severability */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            12. Severability
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            If any provision of these Terms is found by a court of competent
            jurisdiction or an arbitrator to be invalid, illegal, or unenforceable,
            such provision shall be modified to the minimum extent necessary to make it
            valid, legal, and enforceable, or if such modification is not possible, it
            shall be severed from these Terms. The validity, legality, and
            enforceability of the remaining provisions shall not be affected or impaired
            thereby, and those provisions shall continue in full force and effect.
          </p>
          <p className="text-text-secondary leading-relaxed mb-4">
            The failure of Tourify to enforce any right or provision of these Terms
            shall not constitute a waiver of such right or provision unless acknowledged
            and agreed to by Tourify in writing.
          </p>
        </section>

        {/* Contact Us */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-text-primary mt-8 mb-4">
            13. Contact Us
          </h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            If you have any questions, concerns, or complaints regarding these Terms
            &amp; Conditions, or if you wish to exercise any of your rights described
            herein, please contact us:
          </p>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-text-secondary leading-relaxed mb-2">
              <strong>Tourify — Legal Department</strong>
            </p>
            <p className="text-text-secondary leading-relaxed mb-2">
              Email: <strong>legal@tourify.com</strong>
            </p>
            <p className="text-text-secondary leading-relaxed mb-2">
              Phone: <strong>+880 123 456 789</strong>
            </p>
            <p className="text-text-secondary leading-relaxed">
              Website: <strong>www.tourify.com</strong>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
