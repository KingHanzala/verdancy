const PrivacyPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-white text-black dark:bg-gray-900 dark:text-white" style={{ paddingTop: '6rem' }}>
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p>This Privacy Policy outlines how Verdancy ("we," "us," or "our") collects, uses, and safeguards your information when you use our decentralized voting platform. We are committed to maintaining your privacy and ensuring transparency about how your data is handled.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <p>Our platform is designed to prioritize user privacy by minimizing data collection. However, in order to provide our services, we may collect and process the following types of information:</p>
      <ul className="list-disc list-inside">
        <li>Blockchain Addresses: We collect public wallet addresses to verify token ownership and assign voting power based on token holdings. No personal identifying information (PII) is associated with these addresses.</li>
        <li>On-Chain Data: All transactions, votes, and poll participations are recorded on the blockchain. This data is publicly accessible and cannot be altered or deleted.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <p>We use the information collected for the following purposes:</p>
      <ul className="list-disc list-inside">
        <li>Governance Participation: To calculate voting power and allow token holders to participate in polls and decisions.</li>
        <li>Platform Maintenance and Improvements: To ensure the smooth functioning of our decentralized governance processes and improve platform features.</li>
      </ul>
      <p>We do not use your information for any purposes other than those explicitly stated.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Decentralization and Transparency</h2>
      <p>All voting and decision-making on our platform occurs directly on-chain, ensuring transparency and immutability. No centralized entity, including us, has access to personal data or control over your voting actions. Your participation is fully decentralized, and we cannot alter or manipulate votes or poll outcomes.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies and Tracking Technologies</h2>
      <p>Our platform does not use cookies or other tracking technologies to collect personal data. We do not engage in any user tracking for analytics or advertising purposes.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Third-Party Services</h2>
      <p>We do not share your data with third-party service providers. However, interactions with external blockchain services, wallets, or token contracts may be subject to their own privacy policies. We encourage you to review those policies before interacting with third-party services.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Security</h2>
      <p>We take the security of our platform seriously and implement reasonable technical and organizational measures to protect your data. However, since the platform operates on the blockchain, the transparency and immutability of on-chain data may limit certain privacy protections.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">8. Children’s Privacy</h2>
      <p>Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a user under 18 has provided us with personal information, we will take steps to delete such information.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">9. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy periodically to reflect changes in our practices or relevant legal requirements. Any updates will be posted on this page with an updated "Effective Date."</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
      <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at cryptoutils@gmail.com.</p>
    </div>
  );
};

export default PrivacyPolicy;
