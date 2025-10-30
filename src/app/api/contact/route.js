import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

// Initialize MongoDB client with validation
const uri = process.env.MONGODB_URI;

// Validate required environment variables
const validateEnvVariables = () => {
  const missingVars = [];
  
  if (!uri) missingVars.push('MONGODB_URI');
  if (!process.env.EMAIL_USER) missingVars.push('EMAIL_USER');
  if (!process.env.EMAIL_PASS) missingVars.push('EMAIL_PASS');
  
  return missingVars;
};

// Create transporter only if environment variables are present
let transporter;
const emailConfigVars = [process.env.EMAIL_USER, process.env.EMAIL_PASS];
if (emailConfigVars.every(Boolean)) {
  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
}

export async function POST(request) {
  try {
    // Check for missing environment variables
    const missingVars = validateEnvVariables();
    if (missingVars.length > 0) {
      console.error('Missing required environment variables:', missingVars);
      return new Response(
        JSON.stringify({ 
          error: 'Server configuration error',
          message: `Missing environment variables: ${missingVars.join(', ')}`
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Contact form submission received');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      console.log('Validation failed:', { name, email, message });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    const database = client.db('portfolio');
    const collection = database.collection('contacts');

    // Insert contact message into database
    const contactEntry = {
      name,
      email,
      message,
      timestamp: new Date()
    };

    console.log('Inserting contact entry:', contactEntry);
    const result = await collection.insertOne(contactEntry);
    console.log('Message saved to database with ID:', result.insertedId);

    // Send email notification to admin (you) only if transporter is configured
    if (transporter) {
      const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Send to admin (you)
        replyTo: email, // Allow easy reply to the sender
        subject: `New Contact Form Submission from ${name}`,
        text: `
          You have received a new message from your portfolio website:
          
          Name: ${name}
          Email: ${email}
          Message: ${message}
          
          Timestamp: ${new Date().toISOString()}
        `,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
          <p><small>Timestamp: ${new Date().toISOString()}</small></p>
        `
      };

      console.log('Attempting to send email to admin:', {
        from: mailOptions.from,
        to: mailOptions.to,
        subject: mailOptions.subject
      });

      // Try to send email, but don't fail the entire request if email fails
      try {
        const emailResult = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to admin:', emailResult.messageId);
      } catch (emailError) {
        console.error('Email sending failed (but form submission will still succeed):', emailError.message);
        // We'll still return success to the user since the message was saved to DB
      }
    } else {
      console.log('Email transporter not configured - skipping email notification');
    }

    // Close MongoDB connection
    await client.close();
    console.log('MongoDB connection closed');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully',
        id: result.insertedId,
        emailSent: !!transporter
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    console.error('Error stack:', error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process contact form',
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}