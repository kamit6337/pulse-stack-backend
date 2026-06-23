import { Types } from "mongoose";
import { createUserDB, getUserByIdDB, getUsersDB } from "./user.db.js";
import { FastifyRequest } from "fastify";
import {
  CreateUserRequest,
  GetUserByIdRequest,
  UserType,
} from "./user.types.js";

export const createUserController = async (
  request: FastifyRequest<CreateUserRequest>,
): Promise<UserType> => {
  const userAuth = request.auth;

  const { name, email } = request.body;

  const user = await createUserDB(name, email);
  return user;
};

export const getUsersController = async (request: FastifyRequest) => {
  const userAuth = request.auth;

  console.log("userAuth", userAuth);

  const users = await getUsersDB();
  return users;
};

export const getUserByIdController = async (
  request: FastifyRequest<GetUserByIdRequest>,
) => {
  const { id } = request.params;

  const user = await getUserByIdDB(id);
  return user;
};
