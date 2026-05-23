import type { PrivacyPolicyContent } from './types';

export const privacyPolicyEn: PrivacyPolicyContent = {
  documentTitle: 'Privacy Policy',
  lastUpdated: 'Last updated: May 23, 2026',
  sections: [
    {
      title: '1. Introduction',
      paragraphs: [
        'MUULOX SRL ("we," "our," or "us") operates the MUULOX mobile application (the "App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.',
      ],
      subsections: [
        {
          title: 'Company Information',
          bullets: [
            'Company Name: MUULOX SRL',
            'Address: Bulevardul 1 Decembrie 1918 239, Târgu Mureș 540470, Romania',
            'Email: office@muulox.com',
            'Phone: +40 770 498 602',
          ],
        },
      ],
    },
    {
      title: '2. Information We Collect',
      subsections: [
        {
          title: '2.1 Information You Provide',
          bullets: [
            'Account Information: Name, email address, phone number, company details',
            'Profile Information: Business type, preferences, communication preferences',
            'Order Information: Shipping address, billing information, purchase history',
            'Communication Data: Messages, inquiries, support requests',
          ],
        },
        {
          title: '2.2 Automatically Collected Information',
          bullets: [
            'Device Information: Device type, operating system, unique device identifiers',
            'Usage Data: Pages viewed, features used, time spent on app',
            'Location Data: General location (city/region) for service delivery (only with permission)',
            'Log Data: IP address, browser type, access times',
          ],
        },
        {
          title: '2.3 Cookies and Tracking Technologies',
          paragraphs: [
            'The app uses cookies and similar technologies through the webview to:',
          ],
          bullets: [
            'Maintain your session',
            'Remember your preferences',
            'Analyze usage patterns',
            'Improve user experience',
          ],
        },
      ],
    },
    {
      title: '3. How We Use Your Information',
      paragraphs: ['We use collected information to:'],
      bullets: [
        'Process and fulfill orders',
        'Provide customer support',
        'Send order confirmations and updates',
        'Improve our products and services',
        'Communicate promotional offers (with consent)',
        'Analyze usage and improve app functionality',
        'Comply with legal obligations',
        'Prevent fraud and ensure security',
      ],
    },
    {
      title: '4. Data Sharing and Disclosure',
      paragraphs: ['We may share your information with:'],
      subsections: [
        {
          title: '4.1 Service Providers',
          bullets: [
            'Payment processors (Netopia Payments)',
            'Shipping and logistics partners',
            'Email service providers',
            'Analytics services',
            'Customer support tools',
          ],
        },
        {
          title: '4.2 Legal Requirements',
          paragraphs: ['We may disclose information when required by law or to:'],
          bullets: [
            'Comply with legal processes',
            'Protect our rights and property',
            'Prevent fraud or illegal activities',
            'Protect user safety',
          ],
        },
        {
          title: '4.3 Business Transfers',
          paragraphs: [
            'In case of merger, acquisition, or sale of assets, your information may be transferred to the new entity.',
          ],
        },
      ],
    },
    {
      title: '5. Data Security',
      paragraphs: ['We implement appropriate technical and organizational measures to protect your data:'],
      bullets: [
        'Encryption of data in transit (HTTPS/SSL)',
        'Secure servers and databases',
        'Access controls and authentication',
        'Regular security assessments',
        'Employee training on data protection',
      ],
    },
    {
      title: '6. Your Rights (GDPR)',
      paragraphs: ['Under EU/Romanian law, you have the right to:'],
      bullets: [
        'Access: Request copies of your personal data',
        'Rectification: Correct inaccurate or incomplete data',
        'Erasure: Request deletion of your data ("right to be forgotten")',
        'Restriction: Limit how we process your data',
        'Portability: Receive your data in a structured format',
        'Object: Object to processing of your data',
        'Withdraw Consent: Withdraw consent at any time',
      ],
      subsections: [
        {
          title: '',
          paragraphs: ['To exercise these rights, contact us at: office@muulox.com'],
        },
      ],
    },
    {
      title: '7. Data Retention',
      paragraphs: ['We retain your personal data only as long as necessary for:'],
      bullets: [
        'Providing our services',
        'Complying with legal obligations',
        'Resolving disputes',
        'Enforcing agreements',
      ],
      subsections: [
        {
          title: '',
          paragraphs: [
            'Account data is typically retained for 7 years as required by Romanian commercial law.',
          ],
        },
      ],
    },
    {
      title: "8. Children's Privacy",
      paragraphs: [
        'Our app is not intended for users under 16 years of age. We do not knowingly collect information from children.',
      ],
    },
    {
      title: '9. Third-Party Links',
      paragraphs: [
        'The app may contain links to third-party websites. We are not responsible for their privacy practices.',
      ],
    },
    {
      title: '10. International Data Transfers',
      paragraphs: [
        'Your data is primarily stored in Romania/EU. If transferred outside the EU, we ensure appropriate safeguards are in place.',
      ],
    },
    {
      title: '11. Changes to This Policy',
      paragraphs: [
        'We may update this policy periodically. We will notify you of significant changes through the app or email.',
      ],
    },
    {
      title: '12. Contact Us',
      paragraphs: ['For privacy-related questions or to exercise your rights:'],
      bullets: [
        'Email: office@muulox.com',
        'Phone: +40 770 498 602',
        'Address: Bulevardul 1 Decembrie 1918 239, Târgu Mureș 540470, Romania',
      ],
      subsections: [
        {
          title: '',
          paragraphs: [
            'For complaints, you may also contact the Romanian Data Protection Authority (ANSPDCP).',
          ],
        },
      ],
    },
  ],
  complaintAuthority: {
    label: 'ANSPDCP website',
    website: 'https://www.dataprotection.ro',
  },
};
