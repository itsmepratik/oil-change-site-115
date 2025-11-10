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

    // Build email content
    let emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">
            ${data.type === 'booking' ? '🚗 New Service Booking' : '💼 New Quote Request'}
          </h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Customer Information</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>Name:</strong> ${data.name}<br>
            <strong>Phone:</strong> ${data.phone}
          </p>
          
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 20px;">Service Details</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>Service Type:</strong> ${data.serviceType.toUpperCase()}${isFleetService ? ' - Fleet Service' : ''}
          </p>
    `;

    // Add vehicle details only for non-fleet services
    if (!isFleetService && data.vehicleModel) {
      emailContent += `
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 20px;">Vehicle Information</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            <strong>Vehicle Model:</strong> ${data.vehicleModel}${data.preferredOil ? `<br><strong>Preferred Oil:</strong> ${data.preferredOil}` : ''}${data.filterQuality ? `<br><strong>Filter Quality:</strong> ${data.filterQuality}` : ''}
          </p>
      `;
    }

    // Add notes if provided
    if (data.notes) {
      emailContent += `
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; margin-top: 20px;">Additional Notes</h2>
          <p style="font-size: 16px; line-height: 1.6; background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${data.notes}
          </p>
      `;
    }

    emailContent += `
          <div style="margin-top: 30px; padding: 15px; background-color: #667eea; border-radius: 5px;">
            <p style="color: white; margin: 0; text-align: center;">
              Please contact the customer as soon as possible to confirm their ${data.type === 'booking' ? 'booking' : 'quote'}
            </p>
          </div>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "Oil Change Bookings <onboarding@resend.dev>",
      to: ["pratikckb@gmail.com"],
      subject: emailSubject,
      html: emailContent,
    });

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
