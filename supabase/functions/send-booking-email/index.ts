import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  type: "booking" | "quote";
  name: string;
  phone: string;
  email?: string;
  vehicleModel?: string;
  preferredOil?: string;
  filterQuality?: string;
  serviceType: string;
  notes?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: BookingEmailRequest = await req.json();
    console.log("Received booking/quote request:", data);

    const isFleetService = data.serviceType === "custom";
    const emailSubject =
      data.type === "booking"
        ? `New Service Booking - ${data.serviceType.toUpperCase()}`
        : `New Quote Request - ${data.serviceType.toUpperCase()}`;

    // Build admin notification email with premium design
    let adminEmailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #0A0A0A;">
          <!-- Header with gradient -->
          <div style="background: linear-gradient(135deg, #FF8A00 0%, #FF5500 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #FFFFFF; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
              ${data.type === "booking" ? "🚗 New Service Booking" : "💼 New Quote Request"}
            </h1>
            <p style="color: rgba(255,255,255,0.95); margin: 12px 0 0 0; font-size: 14px; font-weight: 500;">
              ${new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          
          <!-- Content area -->
          <div style="background: linear-gradient(to bottom, #0A0A0A 0%, #141414 100%); padding: 40px 30px;">
            <!-- Customer Information Card -->
            <div style="background: rgba(255,138,0,0.08); border: 2px solid rgba(255,138,0,0.2); border-radius: 16px; padding: 28px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(255,138,0,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 18px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #FF8A00, #FF5500); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 20px;">👤</span>
                </div>
                <h2 style="color: #FF8A00; font-size: 18px; margin: 0; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Customer Details</h2>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                <p style="font-size: 15px; line-height: 1.8; color: #FFFFFF; margin: 0;">
                  <strong style="color: #FF8A00; font-weight: 600;">Name:</strong> 
                  <span style="color: #E0E0E0; margin-left: 8px;">${data.name}</span>
                </p>
                <p style="font-size: 15px; line-height: 1.8; color: #FFFFFF; margin: 12px 0 0 0;">
                  <strong style="color: #FF8A00; font-weight: 600;">Phone:</strong> 
                  <span style="color: #E0E0E0; margin-left: 8px;">${data.phone}</span>
                </p>
                ${data.email ? `
                <p style="font-size: 15px; line-height: 1.8; color: #FFFFFF; margin: 12px 0 0 0;">
                  <strong style="color: #FF8A00; font-weight: 600;">Email:</strong> 
                  <span style="color: #E0E0E0; margin-left: 8px;">${data.email}</span>
                </p>
                ` : ""}
              </div>
            </div>
            
            <!-- Service Details Card -->
            <div style="background: rgba(255,138,0,0.08); border: 2px solid rgba(255,138,0,0.2); border-radius: 16px; padding: 28px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(255,138,0,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 18px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #FF8A00, #FF5500); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 20px;">⚙️</span>
                </div>
                <h2 style="color: #FF8A00; font-size: 18px; margin: 0; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Service Information</h2>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                <p style="font-size: 15px; line-height: 1.8; color: #FFFFFF; margin: 0;">
                  <strong style="color: #FF8A00; font-weight: 600;">Service Type:</strong> 
                  <span style="color: #E0E0E0; margin-left: 8px; text-transform: uppercase; font-weight: 600;">${data.serviceType}${isFleetService ? " - Fleet Service" : ""}</span>
                </p>
              </div>
            </div>
    `;

    // Add vehicle details only for non-fleet services
    if (!isFleetService && data.vehicleModel) {
      adminEmailContent += `
            <!-- Vehicle Information Card -->
            <div style="background: rgba(255,138,0,0.08); border: 2px solid rgba(255,138,0,0.2); border-radius: 16px; padding: 28px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(255,138,0,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 18px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #FF8A00, #FF5500); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 20px;">🚙</span>
                </div>
                <h2 style="color: #FF8A00; font-size: 18px; margin: 0; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Vehicle Details</h2>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px;">
                <p style="font-size: 15px; line-height: 1.8; color: #FFFFFF; margin: 0;">
                  <strong style="color: #FF8A00; font-weight: 600;">Vehicle Model:</strong> 
                  <span style="color: #E0E0E0; margin-left: 8px;">${data.vehicleModel}</span>
                </p>
                ${data.preferredOil ? `
                <p style="font-size: 15px; line-height: 1.8; color: #FFFFFF; margin: 12px 0 0 0;">
                  <strong style="color: #FF8A00; font-weight: 600;">Preferred Oil:</strong> 
                  <span style="color: #E0E0E0; margin-left: 8px;">${data.preferredOil}</span>
                </p>
                ` : ""}
                ${data.filterQuality ? `
                <p style="font-size: 15px; line-height: 1.8; color: #FFFFFF; margin: 12px 0 0 0;">
                  <strong style="color: #FF8A00; font-weight: 600;">Filter Quality:</strong> 
                  <span style="color: #E0E0E0; margin-left: 8px;">${data.filterQuality}</span>
                </p>
                ` : ""}
              </div>
            </div>
      `;
    }

    // Add notes if provided
    if (data.notes) {
      adminEmailContent += `
            <!-- Additional Notes Card -->
            <div style="background: rgba(255,138,0,0.08); border: 2px solid rgba(255,138,0,0.2); border-radius: 16px; padding: 28px; margin-bottom: 24px; box-shadow: 0 4px 20px rgba(255,138,0,0.1);">
              <div style="display: flex; align-items: center; margin-bottom: 18px;">
                <div style="width: 40px; height: 40px; background: linear-gradient(135deg, #FF8A00, #FF5500); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                  <span style="font-size: 20px;">📝</span>
                </div>
                <h2 style="color: #FF8A00; font-size: 18px; margin: 0; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Additional Notes</h2>
              </div>
              <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 20px; border-left: 4px solid #FF8A00;">
                <p style="font-size: 15px; line-height: 1.8; color: #E0E0E0; margin: 0; white-space: pre-wrap;">${data.notes}</p>
              </div>
            </div>
      `;
    }

    adminEmailContent += `
            <!-- Call to Action -->
            <div style="background: linear-gradient(135deg, #FF8A00 0%, #FF5500 100%); padding: 30px; border-radius: 16px; margin-top: 32px; text-align: center; box-shadow: 0 8px 24px rgba(255, 138, 0, 0.4);">
              <p style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 700; letter-spacing: 0.3px;">
                ⚡ Priority Response Required
              </p>
              <p style="color: rgba(255,255,255,0.95); margin: 12px 0 0 0; font-size: 15px; line-height: 1.6;">
                Please contact <strong>${data.name}</strong> as soon as possible<br/>
                to confirm their ${data.type === "booking" ? "booking" : "quote request"}
              </p>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid rgba(255,138,0,0.2); text-align: center;">
              <p style="color: #808080; font-size: 13px; margin: 0; line-height: 1.6;">
                This is an automated notification from your HNS Automotive booking system
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send admin notification email
    const adminEmailResponse = await resend.emails.send({
      from: "HNS Automotive <onboarding@resend.dev>",
      to: ["hnsautomotive1990@gmail.com"],
      subject: emailSubject,
      html: adminEmailContent,
    });

    console.log("Admin email sent successfully:", adminEmailResponse);

    // Send customer confirmation email if email is provided
    if (data.email) {
      const customerEmailContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0A0A0A; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0A0A0A;">
            <!-- Header with gradient -->
            <div style="background: linear-gradient(135deg, #FF8A00 0%, #FF5500 100%); padding: 48px 30px; text-align: center;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">
                ✅ ${data.type === "booking" ? "Booking Confirmed!" : "Quote Request Received!"}
              </h1>
              <p style="color: rgba(255,255,255,0.95); margin: 16px 0 0 0; font-size: 16px; font-weight: 500;">
                Thank you for choosing HNS Automotive
              </p>
            </div>
            
            <!-- Content area -->
            <div style="background: linear-gradient(to bottom, #0A0A0A 0%, #141414 100%); padding: 40px 30px;">
              <!-- Welcome Message -->
              <div style="background: rgba(255,138,0,0.08); border: 2px solid rgba(255,138,0,0.2); border-radius: 16px; padding: 32px; margin-bottom: 28px; text-align: center;">
                <p style="color: #FFFFFF; font-size: 18px; line-height: 1.7; margin: 0;">
                  Hi <strong style="color: #FF8A00;">${data.name}</strong>,
                </p>
                <p style="color: #E0E0E0; font-size: 16px; line-height: 1.7; margin: 20px 0 0 0;">
                  ${data.type === "booking" 
                    ? "We've received your service booking and our team will contact you shortly to confirm the details." 
                    : "We've received your quote request and our team will prepare a detailed quote for you within 24 hours."}
                </p>
              </div>

              <!-- Service Summary -->
              <div style="background: rgba(255,138,0,0.08); border: 2px solid rgba(255,138,0,0.2); border-radius: 16px; padding: 28px; margin-bottom: 28px;">
                <h2 style="color: #FF8A00; font-size: 20px; margin: 0 0 20px 0; font-weight: 700; text-align: center; letter-spacing: 0.5px; text-transform: uppercase;">
                  ${data.type === "booking" ? "Your Booking Details" : "Request Summary"}
                </h2>
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px;">
                  <p style="font-size: 15px; line-height: 2; color: #FFFFFF; margin: 0;">
                    <strong style="color: #FF8A00;">Service Type:</strong> 
                    <span style="color: #E0E0E0; margin-left: 8px; text-transform: uppercase;">${data.serviceType}</span>
                  </p>
                  ${data.vehicleModel ? `
                  <p style="font-size: 15px; line-height: 2; color: #FFFFFF; margin: 12px 0 0 0;">
                    <strong style="color: #FF8A00;">Vehicle:</strong> 
                    <span style="color: #E0E0E0; margin-left: 8px;">${data.vehicleModel}</span>
                  </p>
                  ` : ""}
                  ${data.preferredOil ? `
                  <p style="font-size: 15px; line-height: 2; color: #FFFFFF; margin: 12px 0 0 0;">
                    <strong style="color: #FF8A00;">Oil:</strong> 
                    <span style="color: #E0E0E0; margin-left: 8px;">${data.preferredOil}</span>
                  </p>
                  ` : ""}
                  ${data.filterQuality ? `
                  <p style="font-size: 15px; line-height: 2; color: #FFFFFF; margin: 12px 0 0 0;">
                    <strong style="color: #FF8A00;">Filter:</strong> 
                    <span style="color: #E0E0E0; margin-left: 8px;">${data.filterQuality}</span>
                  </p>
                  ` : ""}
                </div>
              </div>

              <!-- What Happens Next -->
              <div style="background: rgba(255,138,0,0.08); border: 2px solid rgba(255,138,0,0.2); border-radius: 16px; padding: 28px; margin-bottom: 28px;">
                <h2 style="color: #FF8A00; font-size: 20px; margin: 0 0 20px 0; font-weight: 700; text-align: center; letter-spacing: 0.5px; text-transform: uppercase;">
                  What Happens Next?
                </h2>
                <div style="background: rgba(0,0,0,0.3); border-radius: 12px; padding: 24px;">
                  <div style="display: flex; margin-bottom: 16px;">
                    <div style="min-width: 32px; height: 32px; background: linear-gradient(135deg, #FF8A00, #FF5500); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                      <span style="color: white; font-weight: 700; font-size: 14px;">1</span>
                    </div>
                    <p style="color: #E0E0E0; font-size: 15px; margin: 6px 0 0 0; line-height: 1.6;">
                      Our team reviews your ${data.type === "booking" ? "booking" : "request"}
                    </p>
                  </div>
                  <div style="display: flex; margin-bottom: 16px;">
                    <div style="min-width: 32px; height: 32px; background: linear-gradient(135deg, #FF8A00, #FF5500); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                      <span style="color: white; font-weight: 700; font-size: 14px;">2</span>
                    </div>
                    <p style="color: #E0E0E0; font-size: 15px; margin: 6px 0 0 0; line-height: 1.6;">
                      We contact you at <strong style="color: #FF8A00;">${data.phone}</strong>
                    </p>
                  </div>
                  <div style="display: flex;">
                    <div style="min-width: 32px; height: 32px; background: linear-gradient(135deg, #FF8A00, #FF5500); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
                      <span style="color: white; font-weight: 700; font-size: 14px;">3</span>
                    </div>
                    <p style="color: #E0E0E0; font-size: 15px; margin: 6px 0 0 0; line-height: 1.6;">
                      ${data.type === "booking" ? "We confirm your appointment details" : "We send you a detailed quote"}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Contact CTA -->
              <div style="background: linear-gradient(135deg, #FF8A00 0%, #FF5500 100%); padding: 32px; border-radius: 16px; text-align: center; box-shadow: 0 8px 24px rgba(255, 138, 0, 0.4);">
                <p style="color: #FFFFFF; margin: 0; font-size: 18px; font-weight: 700;">
                  Need to reach us immediately?
                </p>
                <p style="color: rgba(255,255,255,0.95); margin: 16px 0 0 0; font-size: 15px; line-height: 1.6;">
                  Call us directly or reply to this email<br/>
                  We're here to help!
                </p>
              </div>
              
              <!-- Footer -->
              <div style="margin-top: 32px; padding-top: 24px; border-top: 2px solid rgba(255,138,0,0.2); text-align: center;">
                <p style="color: #FF8A00; font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">
                  HNS Automotive
                </p>
                <p style="color: #808080; font-size: 13px; margin: 0; line-height: 1.6;">
                  Premium Oil Change & Automotive Services
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;

      const customerEmailResponse = await resend.emails.send({
        from: "HNS Automotive <onboarding@resend.dev>",
        to: [data.email],
        subject: data.type === "booking" 
          ? "✅ Your Service Booking Confirmation - HNS Automotive"
          : "✅ Quote Request Received - HNS Automotive",
        html: customerEmailContent,
      });

      console.log("Customer confirmation email sent:", customerEmailResponse);
    }

    return new Response(
      JSON.stringify({ success: true, data: adminEmailResponse }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
