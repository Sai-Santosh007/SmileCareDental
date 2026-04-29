/**
 * Smile Care Dental - Appointment Management System
 * Google Apps Script for handling appointment bookings
 */

const SHEET_NAME = "Smile Care Appointments";
const CLINIC_ADDRESS = "Door No: 23-4-355, Basavanagudi, Bengaluru 560004";
const CLINIC_PHONE = "+91 9014745988";
const CLINIC_NAME = "Smile Care Dental";

/**
 * Handle HTTP requests (GET and POST)
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const { name, email, phone, date, timeSlot, type } = data;

    // Validate required fields
    if (!name || !email || !phone || !date || !timeSlot) {
      return createResponse(false, "Missing required fields");
    }

    // Validate date is not in the past
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return createResponse(false, "Cannot book appointments for past dates");
    }

    // Get or create sheet
    const sheet = getOrCreateSheet();

    // Check for duplicate phone on same day (rate limiting)
    if (hasDuplicateBooking(sheet, phone, date)) {
      return createResponse(false, "You already have an appointment booked for this date");
    }

    // Generate token number for the day
    const tokenNumber = generateTokenNumber(sheet, date);

    // Write appointment data to sheet
    const rowData = [
      new Date(),           // Timestamp
      tokenNumber,          // Token
      name,                 // Name
      email,                // Email
      phone,                // Phone
      date,                 // Date
      timeSlot,             // Time Slot
      type || "General",    // Appointment Type
      "Booked"              // Status
    ];

    sheet.appendRow(rowData);

    // Send confirmation email
    sendConfirmationEmail(name, email, tokenNumber, date, timeSlot);

    return createResponse(true, "Appointment booked successfully", {
      tokenNumber: tokenNumber,
      date: date,
      timeSlot: timeSlot
    });

  } catch (error) {
    console.error("Error in doPost:", error);
    return createResponse(false, "Server error: " + error.message);
  }
}

/**
 * Handle GET requests - Fetch appointments for admin
 */
function doGet(e) {
  try {
    const date = e.parameter.date;
    
    if (!date) {
      return createResponse(false, "Date parameter is required");
    }

    const sheet = getOrCreateSheet();
    const appointments = getAppointmentsByDate(sheet, date);

    return createResponse(true, "Appointments fetched successfully", {
      date: date,
      appointments: appointments
    });

  } catch (error) {
    console.error("Error in doGet:", error);
    return createResponse(false, "Server error: " + error.message);
  }
}

/**
 * Get or create the appointments sheet
 */
function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    // Add headers
    sheet.appendRow([
      "Timestamp",
      "Token",
      "Name",
      "Email",
      "Phone",
      "Date",
      "Time Slot",
      "Type",
      "Status"
    ]);
    
    // Format header row
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
    sheet.getRange(1, 1, 1, 9).setBackground("#2A9D8F");
    sheet.getRange(1, 1, 1, 9).setFontColor("white");
  }
  
  return sheet;
}

/**
 * Check if phone already has booking for the same date
 */
function hasDuplicateBooking(sheet, phone, date) {
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) { // Skip header
    const rowPhone = data[i][4]; // Phone column
    const rowDate = data[i][5];  // Date column
    const rowStatus = data[i][8]; // Status column
    
    if (rowPhone == phone && rowDate == date && rowStatus !== "Cancelled") {
      return true;
    }
  }
  
  return false;
}

/**
 * Generate sequential token number for the day (001, 002, etc.)
 */
function generateTokenNumber(sheet, date) {
  const data = sheet.getDataRange().getValues();
  let count = 0;
  
  for (let i = 1; i < data.length; i++) { // Skip header
    const rowDate = data[i][5]; // Date column
    if (rowDate == date) {
      count++;
    }
  }
  
  // Generate token: increment count and format as 001, 002, etc.
  const tokenNumber = (count + 1).toString().padStart(3, '0');
  return tokenNumber;
}

/**
 * Get appointments grouped by time slot for a specific date
 */
function getAppointmentsByDate(sheet, date) {
  const data = sheet.getDataRange().getValues();
  const appointments = {};
  
  // Initialize time slots
  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
    "5:00 PM - 6:00 PM"
  ];
  
  timeSlots.forEach(slot => {
    appointments[slot] = [];
  });
  
  // Group appointments by time slot
  for (let i = 1; i < data.length; i++) { // Skip header
    const rowDate = data[i][5];      // Date column
    
    if (rowDate == date) {
      const timeSlot = data[i][6];   // Time Slot column
      const appointment = {
        token: data[i][1],
        name: data[i][2],
        email: data[i][3],
        phone: data[i][4],
        type: data[i][7],
        status: data[i][8]
      };
      
      if (appointments[timeSlot]) {
        appointments[timeSlot].push(appointment);
      }
    }
  }
  
  return appointments;
}

/**
 * Send confirmation email to patient
 */
function sendConfirmationEmail(name, email, tokenNumber, date, timeSlot) {
  const subject = `Appointment Confirmation - ${CLINIC_NAME}`;
  
  const body = `
Dear ${name},

Your appointment has been successfully booked with ${CLINIC_NAME}!

📋 APPOINTMENT DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔢 Token Number: ${tokenNumber}
📅 Date: ${date}
⏰ Time Slot: ${timeSlot}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 CLINIC ADDRESS:
${CLINIC_ADDRESS}

📞 Contact: ${CLINIC_PHONE}

IMPORTANT NOTES:
• Please arrive 10 minutes before your appointment time
• Bring this token number: ${tokenNumber}
• If you need to reschedule, please call us at ${CLINIC_PHONE}

We look forward to seeing you!

Best regards,
${CLINIC_NAME} Team
  `;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2A9D8F; border-bottom: 2px solid #2A9D8F; padding-bottom: 10px;">
        Appointment Confirmation
      </h2>
      
      <p>Dear <strong>${name}</strong>,</p>
      
      <p>Your appointment has been successfully booked with <strong>${CLINIC_NAME}</strong>!</p>
      
      <div style="background: #f0f9f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #2A9D8F; margin-top: 0;">Appointment Details</h3>
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Token Number:</strong></td>
            <td style="padding: 8px 0; font-size: 18px; color: #2A9D8F;"><strong>${tokenNumber}</strong></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Date:</strong></td>
            <td style="padding: 8px 0;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #666;"><strong>Time Slot:</strong></td>
            <td style="padding: 8px 0;">${timeSlot}</td>
          </tr>
        </table>
      </div>
      
      <div style="background: #fff; padding: 15px; border-left: 4px solid #2A9D8F; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #333;">Clinic Address</h4>
        <p style="margin: 5px 0;">${CLINIC_ADDRESS}</p>
        <p style="margin: 5px 0;"><strong>Contact:</strong> ${CLINIC_PHONE}</p>
      </div>
      
      <div style="background: #fff8e6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #333;">Important Notes</h4>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>Please arrive 10 minutes before your appointment time</li>
          <li>Bring this token number: <strong>${tokenNumber}</strong></li>
          <li>If you need to reschedule, please call us at ${CLINIC_PHONE}</li>
        </ul>
      </div>
      
      <p>We look forward to seeing you!</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666;">
        <p>Best regards,<br>
        <strong>${CLINIC_NAME} Team</strong></p>
      </div>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      body: body,
      htmlBody: htmlBody,
      name: CLINIC_NAME
    });
    console.log("Confirmation email sent to:", email);
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}

/**
 * Create standardized JSON response
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function for development
 */
function testBooking() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: "Test Patient",
        email: "test@example.com",
        phone: "9876543210",
        date: "2024-12-25",
        timeSlot: "10:00 AM - 11:00 AM",
        type: "Consultation"
      })
    }
  };
  
  const result = doPost(mockEvent);
  console.log(result.getContent());
}

/**
 * Test function for fetching appointments
 */
function testGetAppointments() {
  const mockEvent = {
    parameter: {
      date: "2024-12-25"
    }
  };
  
  const result = doGet(mockEvent);
  console.log(result.getContent());
}
