// populateSeats.js
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); // Make sure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const showId = "telugu-27jul-6pm";

const seatLayout = {
  A: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  B: [1,2,3,4,5,8,9,10,11,12,13,14,15,16,17,20,21,22],
  C: [1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
  D: [1,2,3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
  E: [3,4,5,6,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
  F: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
  G: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
  H: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
  I: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
  J: [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,23,24,25,26,27],
};

async function populate() {
  for (const row in seatLayout) {
    for (const number of seatLayout[row]) {
      const seatId = `${row}${number}`;
      await db
        .collection("shows")
        .doc(showId)
        .collection("seats")
        .doc(seatId)
        .set({
          status: null,
        });
      console.log(`✅ Inserted seat ${seatId}`);
    }
  }

  console.log("🎉 All seats inserted successfully!");
}

populate().catch(console.error);
