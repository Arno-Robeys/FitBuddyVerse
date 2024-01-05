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
    data: [
      // Workout 1
      {
        id: 1,
        name: "Nino's Beste Workout 1",
        durationSec: 2530,
        volumeKG: 10300,
        profileId: 1,
      },
      // Workout 2
      {
        id: 2,
        name: "Nino's Beste Workout 2",
        durationSec: 2000,
        volumeKG: 8500,
        profileId: 1,
      },
      // Workout 3
      {
        id: 3,
        name: "Nino's Beste Workout 3",
        durationSec: 1800,
        volumeKG: 7500,
        profileId: 1,
      },
      // Workout 4
      {
        id: 4,
        name: "Epische Workout 1",
        durationSec: 2398,
        volumeKG: 9230,
        profileId: 2,
      },
      // Workout 5
      {
        id: 5,
        name: "Epische Workout 2",
        durationSec: 2100,
        volumeKG: 8000,
        profileId: 2,
      },
      // Workout 6
      {
        id: 6,
        name: "Epische Workout 3",
        durationSec: 1800,
        volumeKG: 7000,
        profileId: 2,
      },
      // Workout 7
      {
        id: 7,
        name: "Zware Workout 1",
        durationSec: 1290,
        volumeKG: 5302,
        profileId: 3,
      },
      // Workout 8
      {
        id: 8,
        name: "Zware Workout 2",
        durationSec: 1100,
        volumeKG: 4800,
        profileId: 3,
      },
      // Workout 9
      {
        id: 9,
        name: "Zware Workout 3",
        durationSec: 900,
        volumeKG: 4000,
        profileId: 3,
      },
      // Workout 10
      {
        id: 10,
        name: "Beste Workout 1",
        durationSec: 1943,
        volumeKG: 12309,
        profileId: 4,
      },
      // Workout 11
      {
        id: 11,
        name: "Beste Workout 2",
        durationSec: 1800,
        volumeKG: 11000,
        profileId: 4,
      },
      // Workout 12
      {
        id: 12,
        name: "Beste Workout 3",
        durationSec: 1600,
        volumeKG: 10000,
        profileId: 4,
      },
    ]
  });


  await prisma.workoutDetails.createMany({
    data: [
      // Exercices for Workout 1
      {
        id: 1,
        workoutId: 1,
        exerciseId: 1,
        note: "Dit was een zware workout",
      },
      {
        id: 2,
        workoutId: 1,
        exerciseId: 2,
      },
      {
        id: 3,
        workoutId: 1,
        exerciseId: 3,
        note: "Deze oefening vergde veel inspanning",
      },
      // Exercices for Workout 2
      {
        id: 4,
        workoutId: 2,
        exerciseId: 2,
        note: "Dit was een uitdagende oefening",
      },
      {
        id: 5,
        workoutId: 2,
        exerciseId: 4,
        note: "Goed gewerkt tijdens deze workout",
      },
      // Exercices for Workout 3
      {
        id: 6,
        workoutId: 3,
        exerciseId: 1,
        note: "Dit was een zware workout",
      },
      {
        id: 7,
        workoutId: 3,
        exerciseId: 3,
      },
      {
        id: 8,
        workoutId: 3,
        exerciseId: 4,
        note: "Deze oefening vergde veel inspanning",
      },
      // Exercices for Workout 4
      {
        id: 9,
        workoutId: 4,
        exerciseId: 1,
      },
      {
        id: 10,
        workoutId: 4,
        exerciseId: 3,
        note: "Great effort in this workout",
      },
      {
        id: 11,
        workoutId: 4,
        exerciseId: 4,
      },
      // Exercices for Workout 5
      {
        id: 12,
        workoutId: 5,
        exerciseId: 2,
        note: "Well done on this exercise",
      },
      {
        id: 13,
        workoutId: 5,
        exerciseId: 3,
      },
      {
        id: 14,
        workoutId: 5,
        exerciseId: 4,
        note: "You nailed this one!",
      },
      // Exercices for Workout 6
      {
        id: 15,
        workoutId: 6,
        exerciseId: 1,
      },
      {
        id: 16,
        workoutId: 6,
        exerciseId: 2,
      },
      {
        id: 17,
        workoutId: 6,
        exerciseId: 4,
        note: "Impressive performance!",
      },
      // Exercices for Workout 7
      {
        id: 18,
        workoutId: 7,
        exerciseId: 2,
        note: "Keep up the good work!",
      },
      {
        id: 19,
        workoutId: 7,
        exerciseId: 3,
      },
      {
        id: 20,
        workoutId: 7,
        exerciseId: 4,
        note: "Hard work pays off!",
      },
      // Exercices for Workout 8
      {
        id: 21,
        workoutId: 8,
        exerciseId: 1,
      },
      {
        id: 22,
        workoutId: 8,
        exerciseId: 3,
        note: "Push yourself a bit more next time",
      },
      {
        id: 23,
        workoutId: 8,
        exerciseId: 4,
      },
      // Exercices for Workout 9
      {
        id: 24,
        workoutId: 9,
        exerciseId: 1,
        note: "You're doing great!",
      },
      {
        id: 25,
        workoutId: 9,
        exerciseId: 2,
      },
      {
        id: 26,
        workoutId: 9,
        exerciseId: 3,
      },
      // Exercices for Workout 10
      {
        id: 27,
        workoutId: 10,
        exerciseId: 1,
      },
      {
        id: 28,
        workoutId: 10,
        exerciseId: 2,
        note: "Fantastic job!",
      },
      {
        id: 29,
        workoutId: 10,
        exerciseId: 3,
      },
      // Exercices for Workout 11
      {
        id: 30,
        workoutId: 11,
        exerciseId: 1,
        note: "You're making progress!",
      },
      {
        id: 31,
        workoutId: 11,
        exerciseId: 2,
      },
      // Exercices for Workout 12
      {
        id: 32,
        workoutId: 12,
        exerciseId: 1,
      },
      {
        id: 33,
        workoutId: 12,
        exerciseId: 2,
        note: "Stay consistent!",
      },
      {
        id: 34,
        workoutId: 12,
        exerciseId: 3,
      },
    ]
  });

  await prisma.exerciseSet.createMany({
    data: [
      {
        // Set 1 of Exercise 1 from Workout 1
        id: 1,
        workoutDetailsId: 1,
        setNr: 1,
        repetitions: 10,
        weightKG: 27,
      },
      {
        // Set 2 of Exercise 1 from Workout 1
        id: 2,
        workoutDetailsId: 1,
        setNr: 2,
        repetitions: 9,
        weightKG: 21,
      },
      {
        // Set 3 of Exercise 1 from Workout 1
        id: 3,
        workoutDetailsId: 1,
        setNr: 3,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 1 of Exercise 2 from Workout 1
        id: 4,
        workoutDetailsId: 2,
        setNr: 1,
        repetitions: 10,
        weightKG: 10,
      },
      {
        // Set 2 of Exercise 2 from Workout 1
        id: 5,
        workoutDetailsId: 2,
        setNr: 2,
        repetitions: 5,
        weightKG: 15,
      },
      {
        // Set 1 of Exercise 3 from Workout 1
        id: 6,
        workoutDetailsId: 3,
        setNr: 1,
        repetitions: 5,
        weightKG: 15,
      },
      {
        // Set 2 of Exercise 3 from Workout 1
        id: 7,
        workoutDetailsId: 3,
        setNr: 2,
        repetitions: 8,
        weightKG: 14,
      },
      {
        // Set 3 of Exercise 3 from Workout 1
        id: 8,
        workoutDetailsId: 3,
        setNr: 3,
        repetitions: 5,
        weightKG: 15,
      },
      {
        // Set 1 of Exercise 1 from Workout 2
        id: 9,
        workoutDetailsId: 4,
        setNr: 1,
        repetitions: 15,
        weightKG: 13,
      },
      {
        // Set 1 of Exercise 2 from Workout 2
        id: 10,
        workoutDetailsId: 5,
        setNr: 1,
        repetitions: 5,
        weightKG: 15,
      },
      {
        // Set 2 of Exercise 2 from Workout 2
        id: 11,
        workoutDetailsId: 5,
        setNr: 2,
        repetitions: 9,
        weightKG: 25,
      },
      {
        // Set 1 of Exercise 1 from Workout 3
        id: 12,
        workoutDetailsId: 6,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 1 from Workout 3
        id: 13,
        workoutDetailsId: 6,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 1 of Exercise 2 from Workout 3
        id: 14,
        workoutDetailsId: 7,
        setNr: 1,
        repetitions: 12,
        weightKG: 12,
      },
      {
        // Set 2 of Exercise 2 from Workout 3
        id: 15,
        workoutDetailsId: 7,
        setNr: 2,
        repetitions: 8,
        weightKG: 15,
      },
      {
        // Set 1 of Exercise 3 from Workout 3
        id: 16,
        workoutDetailsId: 8,
        setNr: 1,
        repetitions: 6,
        weightKG: 16,
      },
      {
        // Set 2 of Exercise 3 from Workout 3
        id: 17,
        workoutDetailsId: 8,
        setNr: 2,
        repetitions: 10,
        weightKG: 18,
      },
      {
        // Set 3 of Exercise 3 from Workout 3
        id: 18,
        workoutDetailsId: 8,
        setNr: 3,
        repetitions: 6,
        weightKG: 17,
      },
      {
        // Set 1 of Exercise 1 from Workout 4
        id: 19,
        workoutDetailsId: 9,
        setNr: 1,
        repetitions: 10,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 4
        id: 20,
        workoutDetailsId: 9,
        setNr: 2,
        repetitions: 8,
        weightKG: 30,
      },
      {
        // Set 1 of Exercise 2 from Workout 4
        id: 21,
        workoutDetailsId: 10,
        setNr: 1,
        repetitions: 12,
        weightKG: 15,
      },
      {
        // Set 2 of Exercise 2 from Workout 4
        id: 22,
        workoutDetailsId: 10,
        setNr: 2,
        repetitions: 10,
        weightKG: 18,
      },
      {
        // Set 1 of Exercise 3 from Workout 4
        id: 23,
        workoutDetailsId: 11,
        setNr: 1,
        repetitions: 8,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 3 from Workout 4
        id: 24,
        workoutDetailsId: 11,
        setNr: 2,
        repetitions: 10,
        weightKG: 22,
      },
      {
        // Set 3 of Exercise 3 from Workout 4
        id: 25,
        workoutDetailsId: 11,
        setNr: 3,
        repetitions: 6,
        weightKG: 25,
      },
      {
        // Set 1 of Exercise 1 from Workout 5
        id: 26,
        workoutDetailsId: 12,
        setNr: 1,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 2 of Exercise 1 from Workout 5
        id: 27,
        workoutDetailsId: 12,
        setNr: 2,
        repetitions: 10,
        weightKG: 25,
      },
      {
        // Set 1 of Exercise 2 from Workout 5
        id: 28,
        workoutDetailsId: 13,
        setNr: 1,
        repetitions: 15,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 2 from Workout 5
        id: 29,
        workoutDetailsId: 13,
        setNr: 2,
        repetitions: 12,
        weightKG: 20,
      },
      {
        // Set 1 of Exercise 3 from Workout 5
        id: 30,
        workoutDetailsId: 14,
        setNr: 1,
        repetitions: 8,
        weightKG: 15,
      },
      {
        // Set 2 of Exercise 3 from Workout 5
        id: 31,
        workoutDetailsId: 14,
        setNr: 2,
        repetitions: 10,
        weightKG: 17,
      },
      {
        // Set 3 of Exercise 3 from Workout 5
        id: 32,
        workoutDetailsId: 14,
        setNr: 3,
        repetitions: 6,
        weightKG: 20,
      },
      {
        // Set 1 of Exercise 1 from Workout 6
        id: 33,
        workoutDetailsId: 15,
        setNr: 1,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 2 of Exercise 1 from Workout 6
        id: 34,
        workoutDetailsId: 15,
        setNr: 2,
        repetitions: 8,
        weightKG: 30,
      },
      {
        // Set 1 of Exercise 2 from Workout 6
        id: 35,
        workoutDetailsId: 16,
        setNr: 1,
        repetitions: 12,
        weightKG: 16,
      },
      {
        // Set 2 of Exercise 2 from Workout 6
        id: 36,
        workoutDetailsId: 16,
        setNr: 2,
        repetitions: 10,
        weightKG: 18,
      },
      {
        // Set 1 of Exercise 3 from Workout 6
        id: 37,
        workoutDetailsId: 17,
        setNr: 1,
        repetitions: 8,
        weightKG: 22,
      },
      {
        // Set 2 of Exercise 3 from Workout 6
        id: 38,
        workoutDetailsId: 17,
        setNr: 2,
        repetitions: 10,
        weightKG: 24,
      },
      {
        // Set 3 of Exercise 3 from Workout 6
        id: 39,
        workoutDetailsId: 17,
        setNr: 3,
        repetitions: 6,
        weightKG: 26,
      },
      {
        // Set 1 of Exercise 1 from Workout 7
        id: 40,
        workoutDetailsId: 18,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 7
        id: 41,
        workoutDetailsId: 18,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 7
        id: 42,
        workoutDetailsId: 19,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 7
        id: 43,
        workoutDetailsId: 19,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 3 from Workout 7
        id: 44,
        workoutDetailsId: 20,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 3 from Workout 7
        id: 45,
        workoutDetailsId: 20,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 3 of Exercise 3 from Workout 7
        id: 46,
        workoutDetailsId: 20,
        setNr: 3,
        repetitions: 6,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 1 from Workout 8
        id: 47,
        workoutDetailsId: 21,
        setNr: 1,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 2 of Exercise 1 from Workout 8
        id: 48,
        workoutDetailsId: 21,
        setNr: 2,
        repetitions: 8,
        weightKG: 30,
      },
      {
        // Set 1 of Exercise 2 from Workout 8
        id: 49,
        workoutDetailsId: 22,
        setNr: 1,
        repetitions: 12,
        weightKG: 16,
      },
      {
        // Set 2 of Exercise 2 from Workout 8
        id: 50,
        workoutDetailsId: 22,
        setNr: 2,
        repetitions: 10,
        weightKG: 18,
      },
      {
        // Set 1 of Exercise 3 from Workout 8
        id: 51,
        workoutDetailsId: 23,
        setNr: 1,
        repetitions: 8,
        weightKG: 22,
      },
      {
        // Set 2 of Exercise 3 from Workout 8
        id: 52,
        workoutDetailsId: 23,
        setNr: 2,
        repetitions: 10,
        weightKG: 24,
      },
      {
        // Set 3 of Exercise 3 from Workout 8
        id: 53,
        workoutDetailsId: 23,
        setNr: 3,
        repetitions: 6,
        weightKG: 26,
      },
      {
        // Set 1 of Exercise 1 from Workout 9
        id: 54,
        workoutDetailsId: 24,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 9
        id: 55,
        workoutDetailsId: 24,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 9
        id: 56,
        workoutDetailsId: 25,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 9
        id: 57,
        workoutDetailsId: 25,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 3 from Workout 9
        id: 58,
        workoutDetailsId: 26,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 3 from Workout 9
        id: 59,
        workoutDetailsId: 26,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 3 of Exercise 3 from Workout 9
        id: 60,
        workoutDetailsId: 26,
        setNr: 3,
        repetitions: 6,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 1 from Workout 10
        id: 61,
        workoutDetailsId: 27,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 10
        id: 62,
        workoutDetailsId: 27,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 10
        id: 63,
        workoutDetailsId: 28,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 10
        id: 64,
        workoutDetailsId: 28,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 3 from Workout 10
        id: 65,
        workoutDetailsId: 29,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 3 from Workout 10
        id: 66,
        workoutDetailsId: 29,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 3 of Exercise 3 from Workout 10
        id: 67,
        workoutDetailsId: 29,
        setNr: 3,
        repetitions: 6,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 1 from Workout 11
        id: 68,
        workoutDetailsId: 30,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 11
        id: 69,
        workoutDetailsId: 30,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 11
        id: 70,
        workoutDetailsId: 31,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 11
        id: 71,
        workoutDetailsId: 31,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 3 of Exercise 2 from Workout 11
        id: 72,
        workoutDetailsId: 31,
        setNr: 3,
        repetitions: 10,
        weightKG: 27,
      },
      {
        // Set 1 of Exercise 1 from Workout 12
        id: 73,
        workoutDetailsId: 32,
        setNr: 1,
        repetitions: 12,
        weightKG: 25,
      },
      {
        // Set 2 of Exercise 1 from Workout 12
        id: 74,
        workoutDetailsId: 32,
        setNr: 2,
        repetitions: 10,
        weightKG: 28,
      },
      {
        // Set 1 of Exercise 2 from Workout 12
        id: 75,
        workoutDetailsId: 33,
        setNr: 1,
        repetitions: 15,
        weightKG: 20,
      },
      {
        // Set 2 of Exercise 2 from Workout 12
        id: 76,
        workoutDetailsId: 33,
        setNr: 2,
        repetitions: 12,
        weightKG: 22,
      },
      {
        // Set 1 of Exercise 3 from Workout 12
        id: 77,
        workoutDetailsId: 34,
        setNr: 1,
        repetitions: 8,
        weightKG: 18,
      },
      {
        // Set 2 of Exercise 3 from Workout 12
        id: 78,
        workoutDetailsId: 34,
        setNr: 2,
        repetitions: 10,
        weightKG: 20,
      },
      {
        // Set 3 of Exercise 3 from Workout 12
        id: 79,
        workoutDetailsId: 34,
        setNr: 3,
        repetitions: 6,
        weightKG: 22,
      },
    ]
  });

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