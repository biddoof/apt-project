const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const programs = await prisma.program.findMany({ orderBy: { id: 'asc' } });
  if (programs.length < 3) return;

  // 1. Look Great While You Survive
  await prisma.program.update({
    where: { id: programs[0].id },
    data: { name: 'Look Great While You Survive', description: 'General fitness, muscle building, and cardio. Who says you can\'t have a six-pack during the apocalypse?' }
  });

  // 2. Healthy Body Healthy Mental
  await prisma.program.update({
    where: { id: programs[1].id },
    data: { name: 'Healthy Body Healthy Mental', description: 'Health and wellness focus. Joint mobility, breathing exercises, and rationing strategies to stay sane.' }
  });

  // 3. Combat Readiness
  await prisma.program.update({
    where: { id: programs[2].id },
    data: { name: 'Combat Readiness', description: 'Tuned for melee, self-defense, and military-style combat conditioning. High-intensity explosive training.' }
  });

  await prisma.dailyWorkout.deleteMany({});

  const p1Id = programs[0].id;
  const p2Id = programs[1].id;
  const p3Id = programs[2].id;

  const w1 = [
    { programId: p1Id, dayNumber: 1, title: "Upper Body Hypertrophy (Scrap Metal)", instructions: "5 sets of 12-15 overhead presses using a heavy piece of scrap metal or filled water jug. 4 sets of max pushups to failure." },
    { programId: p1Id, dayNumber: 2, title: "Cardio Sprints (Debris Field)", instructions: "Find a 100-meter stretch of uneven terrain. Sprint 10 times, walking back for recovery. Focus on foot placement." },
    { programId: p1Id, dayNumber: 3, title: "Lower Body (Cinder Block Squats)", instructions: "Hold a cinder block or heavy pack in a front rack position. 5 sets of 20 deep squats. 3 sets of 30 calf raises." },
    { programId: p1Id, dayNumber: 4, title: "Core Stabilization", instructions: "Plank holds: 4 sets of 1 minute. Hollow body rocks using a heavy branch for balance. 100 crunches." },
    { programId: p1Id, dayNumber: 5, title: "Back & Biceps (Rubble Rows)", instructions: "Find a sturdy horizontal branch or beam. 50 pull-ups (assisted if necessary). Bent-over rows using a heavy duffel bag." },
    { programId: p1Id, dayNumber: 6, title: "LISS Cardio (Foraging Walk)", instructions: "Load a backpack with 30 lbs of rocks or supplies. Walk at a brisk pace for 45 minutes without stopping." },
    { programId: p1Id, dayNumber: 7, title: "Active Recovery & Posing", instructions: "Light stretching. It's the apocalypse, but take 10 minutes to appreciate your gains in the reflection of a shattered window." },
    { programId: p1Id, dayNumber: 8, title: "Chest & Shoulders Volume", instructions: "Decline pushups with feet elevated on debris (4 sets of 20). Lateral raises using full 1-gallon water jugs (5 sets of 15)." },
    { programId: p1Id, dayNumber: 9, title: "High-Intensity Interval Training (HIIT)", instructions: "30 seconds of high knees, 30 seconds rest. Repeat 15 times. Finish with 50 jumping jacks." },
    { programId: p1Id, dayNumber: 10, title: "Leg Hypertrophy (Lunge Matrix)", instructions: "Walking lunges across a safe clearing (100 total steps). 50 glute bridges. 4 sets of 15 jump squats." },
    { programId: p1Id, dayNumber: 11, title: "Core & Obliques", instructions: "Russian twists holding a heavy stone (4 sets of 30). Side planks (1 minute per side)." },
    { programId: p1Id, dayNumber: 12, title: "Arms Focus", instructions: "Bicep curls with loaded bags (4 sets of 15). Tricep dips on a sturdy ledge or overturned car bumper (4 sets of 20)." },
    { programId: p1Id, dayNumber: 13, title: "Full Body Circuit", instructions: "10 pushups, 15 squats, 20 sit-ups. Complete 10 rounds as fast as possible." },
    { programId: p1Id, dayNumber: 14, title: "Endurance Test", instructions: "Run 3 miles (or walk briskly if injured) focusing on maintaining a steady, elevated heart rate. You survived another two weeks." }
  ];

  const w2 = [
    { programId: p2Id, dayNumber: 1, title: "Box Breathing & Grounding", instructions: "Sit quietly in a secure location. Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat for 10 minutes." },
    { programId: p2Id, dayNumber: 2, title: "Neck & Shoulder Mobility", instructions: "Slow neck rolls. Use a broomstick or pipe for shoulder dislocates (pass overs) to relieve tension from carrying heavy packs." },
    { programId: p2Id, dayNumber: 3, title: "Hip Openers (Deep Squat)", instructions: "Hold a deep, resting 'ass-to-grass' squat for cumulative 5 minutes throughout the day to improve digestion and joint health." },
    { programId: p2Id, dayNumber: 4, title: "Spinal Decompression", instructions: "Cat-cow stretches on hands and knees (20 reps). Gentle seated twists to relieve lower back pressure from sleeping on hard ground." },
    { programId: p2Id, dayNumber: 5, title: "Ration Fasting Protocol", instructions: "A day of minimal exertion. Focus on hydration. Practice mindful eating with your smallest ration today." },
    { programId: p2Id, dayNumber: 6, title: "Ankle & Foot Care", instructions: "Remove boots. Massage arches. Perform 50 ankle circles per foot. Write down three things you are grateful for today." },
    { programId: p2Id, dayNumber: 7, title: "Dynamic Stretching Routine", instructions: "Arm circles, leg swings, torso twists. Get the blood flowing without spiking cortisol levels." },
    { programId: p2Id, dayNumber: 8, title: "Progressive Muscle Relaxation", instructions: "Lie flat. Tense every muscle group in your body starting from your toes up to your face for 5 seconds, then release. Repeat 3 times." },
    { programId: p2Id, dayNumber: 9, title: "Wrist & Grip Recovery", instructions: "Wrist flexor and extensor stretches against a wall. Finger spreads to counteract the claw-grip from holding weapons or tools." },
    { programId: p2Id, dayNumber: 10, title: "Silent Meditation", instructions: "15 minutes of absolute silence. Focus purely on auditory awareness of your surroundings without reacting to them." },
    { programId: p2Id, dayNumber: 11, title: "Posterior Chain Release", instructions: "Hamstring stretches (toe touches). Foam roll your calves and glutes using a smooth pipe or sturdy water bottle." },
    { programId: p2Id, dayNumber: 12, title: "Hydration Focus", instructions: "No intense physical movement today. Clean your water filter. Boil extra water. Sip continuously." },
    { programId: p2Id, dayNumber: 13, title: "Light Yoga Flow", instructions: "Sun salutations (10 rounds). Downward dog to upward dog transitions. Focus on deep, nasal breathing." },
    { programId: p2Id, dayNumber: 14, title: "Mental Fortitude Check", instructions: "Write or mentally review your survival plan. Reaffirm your commitment to surviving another two weeks." }
  ];

  const w3 = [
    { programId: p3Id, dayNumber: 1, title: "Military Burpees & Shadow Boxing", instructions: "100 chest-to-ground burpees for time. Followed by 3 rounds of 3-minute shadow boxing focusing on head movement." },
    { programId: p3Id, dayNumber: 2, title: "Sandbag Carries (Heavy)", instructions: "Fill a bag with 50-70 lbs of dirt/sand. Bear hug carry it for 50 meters. Repeat 10 times." },
    { programId: p3Id, dayNumber: 3, title: "Explosive Escapes (Plyometrics)", instructions: "Broad jumps (10 sets of 3). Box jumps onto a stable surface (5 sets of 5). Train to clear gaps instantly." },
    { programId: p3Id, dayNumber: 4, title: "Krav Maga Combatives Drills", instructions: "Elbow strikes (50 each side). Knee strikes (50 each side). Palm heel strikes to a makeshift heavy bag (100 reps)." },
    { programId: p3Id, dayNumber: 5, title: "Tactical Ruck March", instructions: "Load a pack with 45+ lbs. March 4 miles at a fast, sustained pace. Do not jog. Keep your head on a swivel." },
    { programId: p3Id, dayNumber: 6, title: "Grip Strength & Pull-Ups", instructions: "Dead hangs from a thick branch (max time x 3). 50 strict tactical pull-ups. Your life depends on your grip." },
    { programId: p3Id, dayNumber: 7, title: "Ground Defense (Sprawls)", instructions: "Sprawl drills (dropping hips to the floor and popping back up). 5 sets of 20. Train to defend against takedowns." },
    { programId: p3Id, dayNumber: 8, title: "Heavy Object Drag", instructions: "Tie a rope or strap to a heavy tire or log. Drag it backward for 50 meters. Repeat 5 times." },
    { programId: p3Id, dayNumber: 9, title: "Combat Chokes & Holds (Solo)", instructions: "Isometrics. Grapple a heavy sandbag. Practice rear naked choke holds and full guard retention sweeps on the bag." },
    { programId: p3Id, dayNumber: 10, title: "Sprint to Cover Drills", instructions: "Start prone on your stomach. On command, jump up and sprint 20 meters to cover. Dive back to prone. Repeat 20 times." },
    { programId: p3Id, dayNumber: 11, title: "Stamina: The Murph Challenge (Modified)", instructions: "1-mile run, 100 pull-ups, 200 push-ups, 300 squats, 1-mile run. Break up the reps as needed." },
    { programId: p3Id, dayNumber: 12, title: "Core Armor", instructions: "Weighted sit-ups (holding a rock). Flutter kicks (4 sets of 50). Train your core to absorb impact." },
    { programId: p3Id, dayNumber: 13, title: "Melee Weapon Conditioning", instructions: "Take a heavy stick or pipe. Practice 100 vertical strikes, 100 horizontal strikes, 100 thrusts. Maintain a strong stance." },
    { programId: p3Id, dayNumber: 14, title: "Evac Simulation", instructions: "Pack your entire go-bag. Put it on. Run 1 mile at max effort. You survived this training cycle. Stay frosty." }
  ];

  await prisma.dailyWorkout.createMany({ data: [...w1, ...w2, ...w3] });
  console.log("Database seeded successfully: " + [...w1, ...w2, ...w3].length + " workouts added.");
}

main().finally(() => prisma.$disconnect());
