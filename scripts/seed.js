const { placeholderJobs } = require("./placeholder-data");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    placeholderJobs.map(async (job) => {
      await prisma.job.upsert({ // upsert: update and insert means that if a job with this slug already exists then it will replace it with this job  
        where: {
          slug: job.slug, //unique identifier for the job
        },
        update: job, // if already exists then this will be done
        create: job, // else this will be run if job does not exists in the db
      });
    }),
  );
}

main()
  .then(async () => { // chains the .then() for the successful execution and disconnects the prisma client
    await prisma.$disconnect();
  })
  .catch(async (e) => { // catch() will be for error (if any) and then it also disconnects  the prisma client
    console.error("Error while seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });