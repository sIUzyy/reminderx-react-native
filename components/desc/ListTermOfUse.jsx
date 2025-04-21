import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Color } from "../../constants/Color";
import { Fonts } from "../../constants/Font";

export default function ListTermOfUse() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Text style={styles.title}>1. Conditions of Use</Text>
        <Text style={styles.description}>
          By using this app, you certify that you have read and reviewed this
          Agreement and agree to comply with its terms. If you do not accept
          these terms, you are advised to stop using the app. RemindeRx: A Smart
          Medicine Storage with Notification Through a Wearable Device and
          Mobile App for Enhanced Health Management grants access and use of the
          app, its products, and services only to those who have accepted its
          terms.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>2. Privacy Policy</Text>
        <Text style={styles.description}>
          Before using the app, we recommend reviewing our Privacy Policy to
          understand our data collection, storage, and usage practices. Your
          continued use of the service constitutes acceptance of these
          practices.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>3. Age Restriction</Text>
        <Text style={styles.description}>
          You must be at least 18 years old to use this app. By using this app,
          you confirm that you meet this requirement. RemindeRx is not liable
          for age misrepresentation or any consequences arising from it.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>4. Intellectual Property</Text>
        <Text style={styles.description}>
          All materials, products, and services available in this app are the
          property of RemindeRx, including copyrights, trade secrets,
          trademarks, and patents. You agree not to reproduce, redistribute, or
          use any of RemindeRx’s intellectual property without explicit written
          consent. By using the app, you grant RemindeRx a royalty-free and
          non-exclusive license to display, use, copy, and broadcast any content
          you upload or publish through the platform.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>5. User Accounts</Text>
        <Text style={styles.description}>
          To access certain features, you may be required to create an account
          and provide personal information. You are responsible for maintaining
          the confidentiality of your credentials and ensuring the accuracy of
          your information. If you suspect unauthorized access to your account,
          notify us immediately. We reserve the right to terminate accounts,
          edit or remove content, and restrict services at our discretion.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>6. Permitted Use and User Obligations</Text>
        <Text style={styles.description}>
          By using RemindeRx, you agree to:
        </Text>

        <Text style={styles.description}>
          • Use the service solely for its intended purpose of medication
          management and health monitoring.
        </Text>

        <Text style={styles.description}>
          • Ensure the accuracy and timeliness of any personal or health-related
          data you provide.
        </Text>

        <Text style={styles.description}>
          • Avoid reverse-engineering, tampering, or exploiting the system.
        </Text>

        <Text style={styles.description}>
          • Comply with applicable data privacy and health regulations.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          7. Disclaimers and Limitations of Liability
        </Text>

        <Text style={styles.description}>
          • RemindeRx is designed to assist with medication adherence but is not
          a substitute for professional medical advice. Always consult a
          healthcare provider for medical concerns.
        </Text>

        <Text style={styles.description}>
          • While we strive for accuracy and reliability, we do not guarantee
          error-free operation or uninterrupted service.
        </Text>

        <Text style={styles.description}>
          • To the maximum extent permitted by law, RemindeRx disclaims
          liability for any indirect, incidental, or consequential damages
          arising from your use of the service.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          8. Modifications to the Service and Terms
        </Text>
        <Text style={styles.description}>
          We reserve the right to modify, update, or discontinue any part of the
          service at any time without prior notice. These Terms and Conditions
          may also be updated periodically to reflect legal or operational
          changes. Continued use after updates signifies your acceptance of the
          revised terms.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>
          9. Governing Law and Dispute Resolution
        </Text>
        <Text style={styles.description}>
          These Terms and Conditions are governed by the laws of the Republic of
          the Philippines. Any disputes arising from or related to these terms
          shall be resolved in accordance with the applicable laws and
          regulations of the Philippines. Any legal actions or proceedings shall
          be brought exclusively in the appropriate courts of the Philippines.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>10. Indemnification</Text>
        <Text style={styles.description}>
          You agree to indemnify and hold RemindeRx and its affiliates harmless
          against legal claims, demands, or liabilities resulting from misuse of
          our services. We reserve the right to select our legal representation
          in any dispute.
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>11. Contact Information</Text>
        <Text style={styles.description}>
          For any questions regarding these Terms and Conditions, please contact
          us at: 2024thecaptone2025@gmail.com
        </Text>
      </View>

      <Text style={styles.footer_container}>
        By using RemindeRx, you confirm that you have read, understood, and
        agreed to these Terms and Conditions
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
