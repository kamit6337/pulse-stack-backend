import dotenv from "dotenv";
dotenv.config();
import crypto from "node:crypto";
import mongoose from "mongoose";

const generateObjectId = () => new mongoose.Types.ObjectId().toString();

const obj = {
  projectId: generateObjectId(),
  id: generateObjectId(),
  name: "Amit Wick",
  email: "amit@gmail.com",
};

const ALGORITHM = "aes-256-gcm";

const SECRET_KEY = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_KEY)
  .digest();

export function encrypt(object = {}) {
  const now = Date.now();

  const expires_in = 1000 * 60 * 60 * 24 * 365 * 10; // 10 years

  const addTime = {
    ...object,
    iat: now,
    exp: now + expires_in,
  };

  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

  let encrypted = cipher.update(JSON.stringify(addTime), "utf8", "hex");

  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag();

  return [iv.toString("hex"), authTag.toString("hex"), encrypted].join(":");
}

console.log(encrypt(obj));

// f34604c65afc6096830e3f96:c8c12021a39508091dac81252bbb8243:eabcf267d474ba7ee619059032249b191e619899329f61b82e4eae0b6fee48797c5d4a61b85b3310525b03bb9adaaa604813b9b3f6fac669dcc2b3c512b730d765f2253a7a22dda3042d5a616a6e582159b79caffc978cca36211e6cb9c4c37ed2bf82eca3aedd8900bd1ff47dd5d0c737cd9807564f6c466871bc6b236fa3b0fe19d3364e7088c19b20e51ca1bfb2650ff4df78c1903d07e61bb969
