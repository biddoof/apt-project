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

  // Delete existing workouts to prevent duplicates
  await prisma.dailyWorkout.deleteMany({});

  // Generate 14 days for Look Great
  const aestheticWorkouts = [
    { t: "Upper Body Hypertrophy (Scrap Metal)", d: "5 sets of 12-15 overhead presses using a heavy piece of scrap metal or filled water jug. 4 sets of max pushups to failure." },
    { t: "Cardio Sprints (Debris Field)", d: "Find a 100-meter stretch of uneven terrain. Sprint 10 times, walking back for recovery. Focus on foot placement." },
    { t: "Lower Body (Cinder Block Squats)", d: "Hold a cinder block or heavy pack in a front rack position. 5 sets of 20 deep squats. 3 sets of 30 calf raises." },
    { t: "Core Stabilization", d: "Plank holds: 4 sets of 1 minute. Hollow body rocks using a heavy branch for balance. 100 crunches." },
    { t: "Back & Biceps (Rubble Rows)", d: "Find a sturdy horizontal branch or beam. 50 pull-ups (assisted if necessary). Bent-over rows using a heavy duffel bag." },
    { t: "LISS Cardio (Foraging Walk)", d: "Load a backpack with 30 lbs of rocks or supplies. Walk at a brisk pace for 45 minutes without stopping." },
    { t: "Active Recovery & Posing", d: "Light stretching. It's the apocalypse, but take 10 minutes to appreciate your gains in the reflection of a shattered window." },
    { t: "Chest & Shoulders Volume", d: "Decline pushups with feet elevated on debris (4 sets of 20). Lateral raises using full 1-gallon water jugs (5 sets of 15)." },
    { t: "High-Intensity Interval Training (HIIT)", d: "30 seconds of high knees, 30 seconds rest. Repeat 15 times. Finish with 50 jumping jacks." },
    { t: "Leg Hypertrophy (Lunge Matrix)", d: "Walking lunges across a safe clearing (100 total steps). 50 glute bridges. 4 sets of 15 jump squats." },
    { t: "Core & Obliques", d: "Russian twists holding a heavy stone (4 sets of 30). Side planks (1 minute per side)." },
    { t: "Arms Focus", d: "Bicep curls with loaded bags (4 sets of 15). Tricep dips on a sturdy ledge or overturned car bumper (4 sets of 20)." },
    { t: "Full Body Circuit", d: "10 pushups, 15 squats, 20 sit-ups. Complete 10 rounds as fast as possible." },
    { t: "Endurance Test", d: "Run 3 miles (or walk briskly if injured) focusing on maintaining a steady, elevated heart rate. You survived another two weeks." }
  ];

  // Generate 14 days for Wellness
  const healthWorkouts = [
    { t: "Box Breathing & Grounding", d: "Sit quietly in a secure location. Inhale for 4 seconds, hold for 4, exhale for 4, hold for 4. Repeat for 10 minutes." },
    { t: "Neck & Shoulder Mobility", d: "Slow neck rolls. Use a broomstick or pipe for shoulder dislocates (pass overs) to relieve tension from carrying heavy packs." },
    { t: "Hip Openers (Deep Squat)", d: "Hold a deep, resting 'ass-to-grass' squat for cumulative 5 minutes throughout the day to improve digestion and joint health." },
    { t: "Spinal Decompression", d: "Cat-cow stretches on hands and knees (20 reps). Gentle seated twists to relieve lower back pressure from sleeping on hard ground." },
    { t: "Ration Fasting Protocol", d: "A day of minimal exertion. Focus on hydration. Practice mindful eating with your smallest ration today." },
    { t: "Ankle & Foot Care", d: "Remove boots. Massage arches. Perform 50 ankle circles per foot. Write down three things you are grateful for today." },
    { t: "Dynamic Stretching Routine", d: "Arm circles, leg swings, torso twists. Get the blood flowing without spiking cortisol levels." },
    { t: "Progressive Muscle Relaxation", d: "Lie flat. Tense every muscle group in your body starting from your toes up to your face for 5 seconds, then release. Repeat 3 times." },
    { t: "Wrist & Grip Recovery", d: "Wrist flexor and extensor stretches against a wall. Finger spreads to counteract the claw-grip from holding weapons or tools." },
    { t: "Silent Meditation", d: "15 minutes of absolute silence. Focus purely on auditory awareness of your surroundings without reacting to them." },
    { t: "Posterior Chain Release", d: "Hamstring stretches (toe touches). Foam roll your calves and glutes using a smooth pipe or sturdy water bottle." },
    { t: "Hydration Focus", d: "No intense physical movement today. Clean your water filter. Boil extra water. Sip continuously." },
    { t: "Light Yoga Flow", d: "Sun salutations (10 rounds). Downward dog to upward dog transitions. Focus on deep, nasal breathing." },
    { t: "Mental Fortitude Check", d: "Write or mentally review your survival plan. Reaffirm your commitment to surviving another two weeks." }
  ];

  // Generate 14 days for Combat
  const combatWorkouts = [
    { t: "Military Burpees & Shadow Boxing", d: "100 chest-to-ground burpees for time. Followed by 3 rounds of 3-minute shadow boxing focusing on head movement." },
    { t: "Sandbag Carries (Heavy)", d: "Fill a bag with 50-70 lbs of dirt/sand. Bear hug carry it for 50 meters. Repeat 10 times." },
    { t: "Explosive Escapes (Plyometrics)", d: "Broad jumps (10 sets of 3). Box jumps onto a stable surface (5 sets of 5). Train to clear gaps instantly." },
    { t: "Krav Maga Combatives Drills", d: "Elbow strikes (50 each side). Knee strikes (50 each side). Palm heel strikes to a makeshift heavy bag (100 reps)." },
    { t: "Tactical Ruck March", d: "Load a pack with 45+ lbs. March 4 miles at a fast, sustained pace. Do not jog. Keep your head on a swivel." },
    { t: "Grip Strength & Pull-Ups", d: "Dead hangs from a thick branch (max time x 3). 50 strict tactical pull-ups. Your life depends on your grip." },
    { t: "Ground Defense (Sprawls)", d: "Sprawl drills (dropping hips to the floor and popping back up). 5 sets of 20. Train to defend against takedowns." },
    { t: "Heavy Object Drag", d: "Tie a rope or strap to a heavy tire or log. Drag it backward for 50 meters. Repeat 5 times." },
    { t: "Combat Chokes & Holds (Solo)", d: "Isometrics. Grapple a heavy sandbag. Practice rear naked choke holds and full guard retention sweeps on the bag." },
    { t: "Sprint to Cover Drills", d: "Start prone on your stomach. On command, jump up and sprint 20 meters to cover. Dive back to prone. Repeat 20 times." },
    { t: "Stamina: The Murph Challenge (Modified)", d: "1-mile run, 100 pull-ups, 200 push-ups, 300 squats, 1-mile run. Break up the reps as needed." },
    { t: "Core Armor", d: "Weighted sit-ups (holding a rock). Flutter kicks (4 sets of 50). Train your core to absorb impact." },
    { t: "Melee Weapon Conditioning", d: "Take a heavy stick or pipe. Practice 100 vertical strikes, 100 horizontal strikes, 100 thrusts. Maintain a strong stance." },
    { t: "Evac Simulation", d: "Pack your entire go-bag. Put it on. Run 1 mile at max effort. You survived this training cycle. Stay frosty." }
  ];

  const allWorkouts = [
    ...aestheticWorkouts.map((w, i) => ({ programId: programs[0].id, dayNumber: i + 1, title: w.t, instructions: w.d })),
    ...healthWorkouts.map((w, i) => ({ programId: programs[1].id, dayNumber: i + 1, title: w.t, instructions: w.d })),
    ...combatWorkouts.map((w, i) => ({ programId: programs[2].id, dayNumber: i + 1, title: w.t, instructions: w.d }))
  ];

  await prisma.dailyWorkout.createMany({ data: allWorkouts });
  console.log("Database seeded successfully!");
}

main().finally(() => prisma.$disconnect());
