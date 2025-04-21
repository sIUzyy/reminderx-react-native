// rendered in PrivacyPolicyScreen.jsx
import React from "react";
import { View, StyleSheet, Text } from "react-native";

// components - header
import TextPolicy from "../header/TextPolicy";
import DescPolicy from "../header/DescPolicy";

// constants
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function ListPrivacyPolicy() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>1. General Overview</Text>
        <Text style={styles.description}>
          RemindeRx is a capstone project titled “RemindeRx: A Smart Medicine
          Storage with Notification Through a Wearable Device and Mobile App for
          Enhanced Health Management.” The system addresses common medication
          adherence challenges for individuals managing multiple prescriptions
          or complex conditions by combining secure medicine storage, real-time
          mobile notifications, wearable alerts, and health monitoring through
          sensors (e.g., for heart rate and oxygen saturation).
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>2. Personal Data We Collect</Text>

        <Text style={styles.sub_title}>2.1 Data You Provide Directly</Text>

        <Text style={styles.description}>
          You may voluntarily provide us with information when you:
        </Text>

        <Text style={styles.description}>
          • Create and manage your account (e.g., name, email address, phone
          number).
        </Text>

        <Text style={styles.description}>
          • Enter medication schedules, dosage details, and health information.
        </Text>

        <Text style={styles.description}>
          • Upload multimedia content (such as images or videos) during device
          setup or for support.
        </Text>

        <Text style={styles.description}>• Communicate with us via email.</Text>

        <Text style={styles.sub_title}>
          2.2 Automatic Information Collection
        </Text>

        <Text style={styles.description}>
          When you use our Services, we automatically collect certain technical
          and usage data, including:
        </Text>

        <Text style={styles.description}>
          •Device identifiers, IP address, operating system details, and
          technical logs.
        </Text>

        <Text style={styles.description}>
          • Interaction data such as usage patterns, error logs, and sensor
          readings (e.g., heart rate and oxygen saturation).
        </Text>

        <Text style={styles.sub_title}>2.3 Data from Other Sources</Text>

        <Text style={styles.description}>
          We may also receive data from third-party services you integrate with
          our system to enhance your experience.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          3. How We Share and Use Your Personal Data
        </Text>

        <Text style={styles.description}>
          Your personal data is used to operate, enhance, and personalize our
          Services. We may share your data in the following circumstances:
        </Text>

        <Text style={styles.description}>
          • Service Provision & Improvement: To facilitate the operation of our
          secure medicine storage, real-time notifications, and health
          monitoring functionalities.
        </Text>

        <Text style={styles.description}>
          • Trusted Partners: With third-party service providers and partners
          who assist in system maintenance, analytics, or technical
          support—always under appropriate data protection agreements.
        </Text>

        <Text style={styles.description}>
          • Caregiver Integration: If you choose to share your medication
          schedule or health data with caregivers or loved ones, your
          information will be transmitted to the designated third parties with
          your explicit consent.
        </Text>

        <Text style={styles.description}>
          • Legal and Regulatory Compliance: When required to comply with legal
          obligations, regulatory requirements, or to protect the rights and
          safety of our users.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          4. How We Store and Process Your Personal Data
        </Text>

        <Text style={styles.description}>
          Your data is stored on secure, cloud-based servers that employ robust
          security protocols to ensure its integrity. We process your data using
          industry-standard practices designed to maintain confidentiality and
          reliability throughout its lifecycle.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>5. Security of Personal Data</Text>

        <Text style={styles.description}>
          We take the security of your personal data very seriously. Sensitive
          information is stored in an encrypted form and managed using
          tokenization methods. The underlying storage infrastructure is
          abstracted from developers, meaning that encrypted tokens are used to
          access and manage your data rather than direct database interactions.
          This approach minimizes exposure and helps safeguard your information.
          We continually review and update our security measures to ensure that
          your data remains protected.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>6. Third-Party Services</Text>
        <Text style={styles.description}>
          Our Services may integrate with third-party platforms (such as
          wearable device ecosystems or analytics providers). These external
          services have their own privacy policies, and we are not responsible
          for their data practices. We encourage you to review the privacy
          policies of any third-party services you use in conjunction with
          RemindeRx.
        </Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>7. Your Choices and Rights</Text>
        <Text style={styles.description}>
          We believe in giving you control over your personal data. If you wish
          to request the deletion of your personal data or your entire account,
          please contact us using the information provided in the Contact Us
          section below. We will process your deletion request in accordance
          with applicable legal requirements and our data retention policies.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>8. Children’s Privacy</Text>
        <Text style={styles.description}>
          Our Services are not intended for individuals under the age of 13 (or
          the applicable age of consent in your jurisdiction). We do not
          knowingly collect personal data from children. If you believe that we
          have inadvertently collected such data, please contact us immediately
          so we can promptly address the issue.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          9. Compliance with the Data Privacy Act of 2012
        </Text>
        <Text style={styles.description}>
          RemindeRx is committed to protecting your privacy and ensuring that
          your personal data is handled in accordance with all applicable laws,
          including the Data Privacy Act of 2012 (Republic Act No. 10173) of the
          Philippines. We have implemented policies and procedures to ensure
          that our data processing practices meet or exceed the standards
          required by this law, thereby ensuring the confidentiality, integrity,
          and security of your personal information.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>10. Updates to This Privacy Policy</Text>
        <Text style={styles.description}>
          We may update this Privacy Policy from time to time. Any material
          changes will be indicated by an updated “Last Updated” date at the top
          of this document. We encourage you to review this Policy periodically.
          Your continued use of our Services after any changes signifies your
          acceptance of the updated Policy.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>11. Contact Us</Text>
        <Text style={styles.description}>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or our data practices—including requests for data or
          account deletion—please contact us at:
        </Text>

        <Text style={styles.description}>
          Email: 2024thecapstone2025@gmail.com
        </Text>
      </View>

      <Text style={styles.footer_container}>
        By using RemindeRx, you acknowledge that you have read and understood
        this Privacy Policy and consent to the collection, use, and sharing of
        your information as described herein.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    textAlign: "justify",
  },

  container: {
    marginVertical: 15,
  },

  title: {
    fontSize: 16,
    color: Color.purpleColor,
    fontFamily: Fonts.mainLight,
  },

  sub_title: {
    fontSize: 14,
    color: Color.tagLine,
    fontFamily: Fonts.mainLight,
    marginTop: 20,
  },

  description: {
    fontFamily: Fonts.mainLight,
    color: "#fff",
    marginTop: 10,
  },

  footer_container: {
    fontFamily: Fonts.mainLight,
    color: "#fff",
    paddingBottom: 50,
  },
});
