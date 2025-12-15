"use client"
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Lightbulb, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function Research() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className="p-10 bg-black text-white min-h-screen"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 
        className="font-serif text-5xl font-extrabold mb-12 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent text-center"
        variants={itemVariants}
      >
        Research & Problem Solving
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Problem Card */}
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl shadow-2xl border border-purple-500/30 bg-gradient-to-br from-zinc-900 to-black hover:from-purple-900 hover:to-black transition-all duration-500 hover:scale-[1.02] hover:shadow-purple-500/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Lightbulb className="w-7 h-7 text-yellow-400" />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Identified Problem
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed font-bold">
1. Current Situation
<br></br>

Citizens raise complaints (potholes, electricity cuts, water issues, harassment cases, etc.) through apps, call centers, or municipal offices.

These complaints often contain sensitive personal data (name, phone, location, sometimes even proof images/videos).
<br></br>
<br></br>

2. The Problems
<br></br>

Data Breaches & Privacy Leaks 
<br></br><br></br>
 🛑

Complaints stored in centralized databases → hackers & insiders can leak personal details.

Sensitive complaints (corruption, harassment, abuse) put complainants at risk of retaliation.

Tampering & Corruption 
<br></br><br></br>🛑

Officials can delete, alter, or ignore complaints without accountability.

Citizens lose trust in the system.

Lack of Transparency 
<br></br><br></br>🛑

Citizens never know the real status of their complaint.

Many complaints go unresolved or are closed without action.

Low Citizen Engagement 
<br></br><br></br>🛑

People stop reporting issues because they feel their voices don't matter.

No incentives for active participation in civic improvements.
<br></br>
<br></br>

3. Why It Matters
<br></br>

A city is only as strong as its ability to listen to its people.

Without trust, privacy, and transparency, citizens disengage → urban governance suffers.

In times of rising data breaches, we urgently need a secure, transparent, tamper-proof grievance redressal system.

      </p>
      <img 
        src="https://st4.depositphotos.com/1000975/20511/i/600/depositphotos_205110534-stock-photo-female-lawyer-meeting-with-his.jpg" 
        alt="Problem illustration" 
        width="400" 
        height="250" 
        className="rounded-xl shadow-lg mt-18"
      />
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Card className="rounded-2xl shadow-2xl border border-amber-500/30 bg-gradient-to-br from-zinc-900 to-black hover:from-amber-900 hover:to-black transition-all duration-500 hover:scale-[1.02] hover:shadow-amber-500/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CheckCircle className="w-7 h-7 text-amber-400" />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                  Proposed Solution
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed font-bold">
1. Immutable Complaint Ledger
<br></br>

Every complaint is recorded on the blockchain.
<br></br>

No official can delete, alter, or ignore it.
<br></br>

Creates an audit trail of accountability.
<br></br>
<br></br>

2. Privacy-First Submissions
<br></br>

Complaints stored encrypted on IPFS/Arweave.
<br></br>

Only authorized officers can decrypt.
<br></br>

Anonymous mode using Zero-Knowledge Proofs → citizens can raise sensitive issues without revealing identity.
<br></br>
<br></br>

3. Community-Driven Prioritization
<br></br>

Citizens upvote/downvote complaints, making the most urgent issues visible.
<br></br>

Builds a people's priority list for authorities.
<br></br>
<br></br>

4. Gamification with Reputation Tokens
<br></br>

Citizens earn tokens for valid complaints, feedback, and voting.
<br></br>

Officials earn reputation points for resolving issues.
<br></br>

Tokens can be redeemed for recognition, badges, or municipal rewards.
<br></br>
<br></br>

5. Transparency Dashboard
<br></br>

Public dashboard shows:
<br></br>

Total complaints logged.
<br></br>


Resolved vs pending ratio.
<br></br>
<br></br>


6. Geo-Tagged Issue Tracking
<br></br>

Complaints tagged with location data.
<br></br>

Helps city authorities identify problem hotspots and allocate resources efficiently.
              </p>
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Solution illustration"
                width={400}
                height={250}
                className="rounded-xl shadow-lg"
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}