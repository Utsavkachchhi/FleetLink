const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");
const bookingService = require("../services/bookingService");

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

test("createBooking succeeds if no conflict", async () => {
  const v = await Vehicle.create({ name: "V1", capacityKg: 1000, tyres: 6 });
  const booking = await bookingService.createBooking({
    vehicleId: v._id.toString(),
    fromPincode: "560001",
    toPincode: "560002",
    startTimeISO: "2023-10-01T10:00:00Z",
    customerId: "cust1",
  });
  expect(booking).toBeDefined();
  expect(booking.vehicle.toString()).toBe(v._id.toString());
});

test("createBooking throws 409 on conflict", async () => {
  const v = await Vehicle.create({ name: "V1", capacityKg: 1000, tyres: 6 });
  const start = new Date("2023-10-01T10:00:00Z");
  const hours = Math.abs(parseInt("560001", 10) - parseInt("560002", 10)) % 24;
  const end = new Date(start.getTime() + hours * 60 * 60 * 1000);

  await Booking.create({
    vehicle: v._id,
    fromPincode: "560001",
    toPincode: "560002",
    startTime: start,
    endTime: end,
    estimatedRideDurationHours: hours,
    customerId: "cust1",
  });

  await expect(
    bookingService.createBooking({
      vehicleId: v._id.toString(),
      fromPincode: "560001",
      toPincode: "560002",
      startTimeISO: "2023-10-01T10:00:00Z",
      customerId: "cust2",
    })
  ).rejects.toThrow(/already booked/);
});
