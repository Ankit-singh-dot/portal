import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    // const userId = req.user.id;
    // console.log(userId);

    const { companyName, description, website, location } = req.body;
    if (!companyName || !description || !website || !location) {
      return res.status(400).json({
        message: "Missing required fields ",
        success: false,
      });
    }
    const user = await Company.findOne({ companyName });
    if (user) {
      return res.status(404).json({
        message: "Company already exits",
      });
    }
    const newCompany = new Company({
      userId: req.user.id,
      companyName,
      description,
      website,
      location,
    });
    await newCompany.save();
    res.status(200).json({
      message: `${companyName} created successfully`,
      success: true,
    });
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
};
export const getAllCompanies = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);

  const allCompanies = await Company.find({ userId });
  console.log(allCompanies);
  res.status(200).json(allCompanies);
};
export const getCompanyById = async (req, res) => {
  const companyId = req.params.id;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "company not found",
      });
    }
    return res.status(200).json({ company, success: true });
  } catch (error) {
    res.status(400).send("Error" + error.message);
  }
};
export const updateCompany = async (req, res) => {
  try {
    const { description, location, website } = req.body;
    const updateData = { description, location, website };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json({ message: "company updated" });
  } catch (error) {
    return res.status(404).json("Error:" + error.message);
  }
};
