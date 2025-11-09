import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init("TDYWNpVlOf6T4CXvk");
const sendBookingConfirmation = async (bookingData) => {
  try {
    const templateParams = {
      customer_name: bookingData.userName,
      customer_email: bookingData.userEmail,
      venue_name: bookingData.venueName,
      venue_location: `${bookingData.city}, ${bookingData.country}`,
      booking_date: new Date(
        bookingData.bookingDetails.date
      ).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      booking_time: `${bookingData.bookingDetails.startTime} - ${bookingData.bookingDetails.endTime}`,
      guest_count: bookingData.bookingDetails.guests,
      booking_id: bookingData.id,
      total_price: new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
      }).format(bookingData.pricing.total),
    };

    const response = await emailjs.send(
      "service_69ppbkp", // Replace with your Service ID
      "template_13cr0r9", // Replace with your Template ID
      templateParams
    );

    console.log("Email sent successfully!", response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
};

export { sendBookingConfirmation };
