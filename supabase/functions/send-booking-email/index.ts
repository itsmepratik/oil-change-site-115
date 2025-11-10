import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  type: 'booking' | 'quote';
  name: string;
  phone: string;
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
    const emailSubject = data.type === 'booking' 
      ? `New Service Booking - ${data.serviceType.toUpperCase()}`
      : `New Quote Request - ${data.serviceType.toUpperCase()}`;

    // Build email content with website-matching styles
    let emailContent = `
      <div style="font-family: 'ClashDisplay', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #0A0A0A;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; border-radius: 0;">
          <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
            ${data.type === 'booking' ? '🚗 New Service Booking' : '💼 New Quote Request'}
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 14px;">
            Received on ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
        
        <div style="background: linear-gradient(to bottom, #0A0A0A, #1a1a1a); padding: 40px 30px; border-radius: 0;">
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 25px; margin-bottom: 20px;">
            <h2 style="color: #667eea; font-size: 20px; margin: 0 0 15px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">👤 Customer Information</h2>
            <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; margin: 0;">
              <strong style="color: #ffffff;">Name:</strong> <span style="color: #b0b0b0;">${data.name}</span><br>
              <strong style="color: #ffffff;">Phone:</strong> <span style="color: #b0b0b0;">${data.phone}</span>
            </p>
          </div>
          
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 25px; margin-bottom: 20px;">
            <h2 style="color: #667eea; font-size: 20px; margin: 0 0 15px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">⚙️ Service Details</h2>
            <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; margin: 0;">
              <strong style="color: #ffffff;">Service Type:</strong> <span style="color: #b0b0b0;">${data.serviceType.toUpperCase()}${isFleetService ? ' - Fleet Service' : ''}</span>
            </p>
          </div>
    `;

    // Add vehicle details only for non-fleet services
    if (!isFleetService && data.vehicleModel) {
      emailContent += `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 25px; margin-bottom: 20px;">
            <h2 style="color: #667eea; font-size: 20px; margin: 0 0 15px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">🚙 Vehicle Information</h2>
            <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; margin: 0;">
              <strong style="color: #ffffff;">Vehicle Model:</strong> <span style="color: #b0b0b0;">${data.vehicleModel}</span>${data.preferredOil ? `<br><strong style="color: #ffffff;">Preferred Oil:</strong> <span style="color: #b0b0b0;">${data.preferredOil}</span>` : ''}${data.filterQuality ? `<br><strong style="color: #ffffff;">Filter Quality:</strong> <span style="color: #b0b0b0;">${data.filterQuality}</span>` : ''}
            </p>
          </div>
      `;
    }

    // Add notes if provided
    if (data.notes) {
      emailContent += `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 25px; margin-bottom: 20px;">
            <h2 style="color: #667eea; font-size: 20px; margin: 0 0 15px 0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">📝 Additional Notes</h2>
            <p style="font-size: 16px; line-height: 1.8; color: #e0e0e0; margin: 0; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 8px; border-left: 4px solid #667eea;">
              ${data.notes}
            </p>
          </div>
      `;
    }

    emailContent += `
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px; border-radius: 12px; margin-top: 30px; text-align: center; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
            <p style="color: white; margin: 0; font-size: 16px; font-weight: 600; letter-spacing: 0.5px;">
              ⚡ Priority Response Required
            </p>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">
              Please contact ${data.name} as soon as possible to confirm their ${data.type === 'booking' ? 'booking' : 'quote'}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center;">
            <p style="color: #808080; font-size: 12px; margin: 0;">
              This is an automated notification from your website's booking system
            </p>
          </div>
        </div>
      </div>
    `;

const emailResponse = await resend.batch.send([
  {
    from: "Oil Change Bookings <onboarding@resend.dev>",
    to: ["pratikckb@gmail.com"],
    subject: emailSubject,
    html: emailContent,
  },
  {
    from: "Oil Change Bookings <onboarding@resend.dev>",
    to: ["mohammedrifat8459@gmail.com"],
    subject: emailSubject,
    html: emailContent,
  },
]);

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
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
