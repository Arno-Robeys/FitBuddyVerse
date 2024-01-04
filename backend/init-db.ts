// Execute: npx ts-node init-db.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
  console.log("Connected");
  // Use the prisma API to fill the database with some initial data
  await prisma.profile.createMany({
    data: [{
      email: "nino@example.com",
      username: "Nino",
      password: "t",
    },
    {
      email: "siebe@example.com",
      username: "Siebe",
      password: "t",
    },
    {
      email: "michiel@example.com",
      username: "Michiel",
      password: "t",
    },
    {
      email: "arno@example.com",
      username: "Arno",
      password: "t",
    }
    ]
  });

  await prisma.exercise.createMany({
    data: [{
      name: "Bench Press",
      type: "Chest",
      equipment: "Dumbbell",
      description: "Bench press is an exercise for the chest muscles. Lie on a bench and grip the bar. Lower the bar to your chest and push it back up.",
    },
    {
      name: "Preacher Curl",
      type: "Biceps",
      equipment: "Dumbbell",
      description: "Preacher curl is an exercise for the biceps muscles. Sit on a preacher bench and grip the bar. Curl the bar up and down.",
    },
    {
      name: "Rope Pushdown",
      type: "Triceps",
      equipment: "Cable",
      description: "Rope pushdown is an exercise for the triceps muscles. Stand in front of a cable machine and grip the rope. Push the rope down and up.",
    },
    {
      name: "Seated Row",
      type: "Back",
      equipment: "Machine",
      description: "Seated row is an exercise for the back muscles. Sit on the machine and grip the handles. Pull the handles towards you and push them back out.",
    }
    ]
  });

  await prisma.workout.createMany({
    data: [{
      name: "Nino's Beste Workout 1",
      durationSec: 2530,
      volumeKG: 10300,
      profileId: 1,
    },
    {
      name: "Nino's Beste Workout 2",
      durationSec: 2000,
      volumeKG: 8500,
      profileId: 1,
    },
    {
      name: "Nino's Beste Workout 3",
      durationSec: 1800,
      volumeKG: 7500,
      profileId: 1,
    },
    {
      name: "Epische Workout 1",
      durationSec: 2398,
      volumeKG: 9230,
      profileId: 2,
    },
    {
      name: "Epische Workout 2",
      durationSec: 2100,
      volumeKG: 8000,
      profileId: 2,
    },
    {
      name: "Epische Workout 3",
      durationSec: 1800,
      volumeKG: 7000,
      profileId: 2,
    },
    {
      name: "Zware Workout 1",
      durationSec: 1290,
      volumeKG: 5302,
      profileId: 3,
    },
    {
      name: "Zware Workout 2",
      durationSec: 1100,
      volumeKG: 4800,
      profileId: 3,
    },
    {
      name: "Zware Workout 3",
      durationSec: 900,
      volumeKG: 4000,
      profileId: 3,
    },
    {
      name: "Beste Workout 1",
      durationSec: 1943,
      volumeKG: 12309,
      profileId: 4,
    },
    {
      name: "Beste Workout 2",
      durationSec: 1800,
      volumeKG: 11000,
      profileId: 4,
    },
    {
      name: "Beste Workout 3",
      durationSec: 1600,
      volumeKG: 10000,
      profileId: 4,
    },
    ]
  });


  await prisma.exerciseWorkout.createMany({
    data: [{
      id: 1,
      workoutId: 1,
      exerciseId: 1,
      note: "Dit was een zware workout",
    },
    {
      id: 2,
      workoutId: 1,
      exerciseId: 2,
    }]});

  await prisma.exerciseSet.createMany({
    data: [{
      id: 1,
      workoutId: 1,
      exerciseWorkoutId: 1,
      setNr: 1,
      repetitions: 10,
      weightKG: 10,
    },
    {
      id: 2,
      workoutId: 1,
      exerciseWorkoutId: 1,
      setNr: 2,
      repetitions: 10,
      weightKG: 10,
    },
    {
      id: 3,
      workoutId: 1,
      exerciseWorkoutId: 2,
      setNr: 1,
      repetitions: 10,
      weightKG: 10,
    },
  ]});

  await prisma.workoutComment.createMany({
    data: [{
      message: "Leuke workout!",
      profileId: 1,
      workoutId: 1,
    },
    {
      message: "Leuke workout!",
      profileId: 2,
      workoutId: 2,
    },
    {
      message: "Leuke workout!",
      profileId: 3,
      workoutId: 3,
    },
    {
      message: "Leuke workout!",
      profileId: 4,
      workoutId: 4,
    }
    ]
  });
};

main()
  .then(async () => {
    await prisma.$disconnect().then(() => console.log("Disconnected"));
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect().then(() => console.log("Error occured: Disconnected"));
    process.exit(1);
  });