const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");
const vehicleService = require("../services/vehicleService");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "test" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Vehicle.deleteMany({});
  await Booking.deleteMany({});
});

test("findAvailableVehicles excludes vehicles with overlapping bookings", async () => {
  const v1 = await Vehicle.create({ name: "V1", capacityKg: 1000, tyres: 6 });
  const v2 = await Vehicle.create({ name: "V2", capacityKg: 2000, tyres: 8 });

  // booking on v1 overlapping
  const start = new Date("2023-10-01T10:00:00Z");
  const hours = Math.abs(parseInt("560001", 10) - parseInt("560002", 10)) % 24;
  const end = new Date(start.getTime() + hours * 60 * 60 * 1000);
  await Booking.create({
    vehicle: v1._id,
    fromPincode: "560001",
    toPincode: "560002",
    startTime: start,
    endTime: end,
    estimatedRideDurationHours: hours,
    customerId: "cust1",
  });

  const res = await vehicleService.findAvailableVehicles({
    capacityRequired: 500,
    fromPincode: "560001",
    toPincode: "560002",
    startTimeISO: "2023-10-01T10:00:00Z",
  });

  // v1 should be excluded, v2 should be present
  const ids = res.vehicles.map((v) => v.name);
  expect(ids).toContain("V2");
  expect(ids).not.toContain("V1");
});
