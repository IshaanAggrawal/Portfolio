import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

// Initialize MongoDB client
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

console.log('Environment variables check:');
console.log('MONGODB_URI:', uri ? 'Set' : 'Not set');
console.log('EMAIL_USER:', process.env.EMAIL_USER ? 'Set' : 'Not set');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set (Should be app password)');

// Create a reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify transporter configuration (but don't block execution)
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter configuration warning:', error.message);
    console.error('This might be due to Gmail security settings. Make sure you are using an App Password, not your regular password.');
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

export async function POST(request) {
  try {
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

    // Send email notification to admin (you)
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

    // Close MongoDB connection
    await client.close();
    console.log('MongoDB connection closed');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully',
        id: result.insertedId
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    console.error('Error stack:', error.stack);
    
    // Close MongoDB connection in case of error
    try {
      await client.close();
      console.log('MongoDB connection closed after error');
    } catch (closeError) {
      console.error('Error closing MongoDB connection:', closeError);
    }
    
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