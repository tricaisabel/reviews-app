import Company from "../models/company.model";
import { NewCompany } from "../types/new-company.type";
import mongoose from "mongoose";

export const getAllCompanies = async () => {
  const companies = await Company.find().select("-reviews -__v").exec();
  return companies;
};

export const getCompany = async (companyId: string) => {
  const company = await Company.findById(companyId)
    .select("-reviews -__v")
    .exec();
  if (!company) {
    throw new Error("Company not found");
  }
};

export const getCompanyById = async (
  companyId: string,
  withReviews: boolean = true
) => {
  let company;

  if (withReviews) {
    company = await Company.findById(companyId).exec();
  } else {
    company = await Company.findById(companyId).select("-reviews -__v").exec();
  }

  if (!company) {
    throw new Error("Company not found");
  }
  return company;
};

export const createCompany = async (newCompany: NewCompany) => {
  const company = await Company.create({
    _id: new mongoose.Types.ObjectId(),
    name: newCompany.name,
    url: newCompany.url,
    reviews: [],
  });

  return company;
};

export const validateNewCompany = async (name: string): Promise<void> => {
  const user = new Company({
    _id: new mongoose.Types.ObjectId(),
    name,
    url: "url",
  });

  await user.validate();
};