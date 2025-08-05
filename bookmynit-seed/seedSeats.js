// seedSeats.js
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

const sections = [
  {
    priceKey: 'ROYALE CLUB',
    rows: {
      A: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      B: [1,2,3,4,5,8,9,10,11,12,13,14,15,16,17,20,21,22]
    }
  },
  {
    priceKey: 'ROYALE',
    rows: {
      C: [1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
      D: [1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
      E: [3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27]
    }
  },
  {
    priceKey: 'CLUB',
    rows: {
      F: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
      G: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
      H: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27]
    }
  },
  {
    priceKey: 'EXECUTIVE',
    rows: {
      I: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
      J: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27]
    }
  }
];

const showId = 'currentShow';

async function seedSeats() {
  const seatCollection = db.collection('shows').doc(showId).collection('seats');
  const batch = db.batch();
  const validSeatIds = [];

  for (const section of sections) {
    const { priceKey, rows } = section;
    for (const row in rows) {
      for (const num of rows[row]) {
        const seatId = `${row}${num}`;
        validSeatIds.push(seatId);
        const seatRef = seatCollection.doc(seatId);
        batch.set(seatRef, {
          status: "available",
          lockedBy: null,
          lockedAt: null,
          priceKey
        });
      }
    }
  }

  await batch.commit();
  console.log(`✅ Seeded ${validSeatIds.length} valid seats`);

  const existingSeats = await seatCollection.listDocuments();
  const invalidSeats = existingSeats
    .map(doc => doc.id)
    .filter(id => !validSeatIds.includes(id));

  for (const id of invalidSeats) {
    await seatCollection.doc(id).delete();
    console.log(`🗑️ Deleted extra seat: ${id}`);
  }

  console.log(`🎉 Cleanup complete. Total deleted: ${invalidSeats.length}`);
}

seedSeats().catch(console.error);
