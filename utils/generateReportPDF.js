export const generateReportPDF = (data) => `

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RemindeRx: Health and Medication Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        color: #333;
      }
      .header {
        text-align: center;
        font-size: 24px;
        font-weight: bold;
      }
      .date-range {
        text-align: center;
        font-size: 14px;
        margin-bottom: 50px;
        margin-top: -10px;
      }
      .disclaimer,
      .patient-info,
      .vital-stats,
      .medication-tracking,
      .missed-medication,
      .recommendations {
        margin-top: 20px;
      }
      .section-title {
        color: #f84d4d;
      }
      .section-content {
        margin-left: 0px;
      }
      .details {
        margin-left: 20px;
      }
      .color_red {
        color: #f84d4d;
      }

      .rx {
        color: #6755d2;
      }

      .reminder {
        margin-top: 50px;
        font-weight: bold;
      }

     .email {
      text-decoration: underline;
      color: #6755D2;
      margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <h1 class="header">RemindeRx: Health and Medication Report</h1>
    <div class="date-range">${data.date}</div>

    <div class="disclaimer">
      <p>
        <strong class="color_red">DISCLAIMER</strong><br />
        This service is meant to provide helpful information, but it is not a
        replacement for professional medical advice from a doctor. Always
        consult a healthcare professional for medical concerns.
      </p>
    </div>

    <div class="patient-info">
      <p>
        <strong class="section-title">PATIENT INFORMATION</strong><br />
        <strong>Name:</strong> ${data.name}<br />
        <strong>Age:</strong> ${data.age}<br />

        <strong>Email:</strong>
        <a href="mailto:${data.email}">${data.email}</a>
      </p>
    </div>

    <hr />

    <div class="vital-stats">
      <p><strong class="section-title">VITAL STATISTICS</strong></p>
      <p class="section-content">
        <strong>Average Heart Rate: </strong> ${data.avgPulseRate} bpm<br />
        (Normal: 60 - 100 bpm)
      </p>
      <p class="section-content">
        <strong>Average Oxygen Levels:</strong> ${data.avgOxygen} %<br />
        (Normal: 95 - 100 %)
      </p>
    </div>

  
    <hr />

    <p class="reminder">
      Thank you for using Reminde<span class="rx">Rx!</span> <br />
      Email: <span class="email">2024thecapstone2025@gmail.com</span> <br />
    </p>
  </body>
</html>

`;
