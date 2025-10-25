// prisma/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  await prisma.user.create({
    data: {
      clerkUserId: 'test-user-123',
      email: 'testuser@example.com',
      name: 'Test User',
      role: 'UNASSIGNED', // or PATIENT, DOCTOR, ADMIN
      credits: 2,
    },
  });

  console.log('✅ Seed finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


  

async function addDoctor() {
  const clerkUserId = 'clerk-user-id-here'; // Replace with actual Clerk ID

    // Check if user already exists
  let doctor = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!doctor) {
    doctor = await prisma.user.create({
      data: {
        clerkUserId,
        email: 'doctor@example.com', 
        name: 'Dr. John Doe',
        role: 'DOCTOR',
        credits: 2,
        specialty: 'Cardiology',
        experience: 10,
        credentialUrl: 'https://example.com/certificate.pdf',
        description: 'Experienced cardiologist.',
        verificationStatus: 'PENDING',
      },
    });
    console.log('✅ Doctor added:', doctor);
  } else {
    console.log('⚠ Doctor already exists:', doctor);
  }
}

addDoctor()
  .catch(console.error)
  .finally(() => prisma.$disconnect());