import Job from "../models/job.model.js";
export const postJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      title,
      description,
      requirements,
      location,
      salary,
      jobType,
      company,
      position,
      experience,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !location ||
      !salary ||
      !jobType ||
      !company ||
      !position ||
      !experience
    ) {
      return res.status(404).json({
        message: "All input fields are required",
      });
    }
    const newJob = new Job({
      title,
      description,
      requirements: requirements.split(","),
      location,
      salary: Number(salary),
      jobType,
      company: company,
      position,
      experience,
      created_by: userId,
    });
    await newJob.save();
    return res.status(200).json({
      message: `${title} Job created successfully`,
      success: true,
    });
  } catch (error) {
    res.status(400).json("Error :" + error.message);
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { requirements: { $regex: keyword, $options: "i" } },
        { location: { $regex: keyword, $options: "i" } },
        { jobType: { $regex: keyword, $options: "i" } },
        { position: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(400).json({
        message: "job not found",
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {}
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(400).json({
        message: "No job found",
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    return res.status(404).json("Error" + error.message);
  }
};
export const getAdminJob = async (req, res) => {
  const reqId = req.user.id;
  // console.log(reqId);

  const job = await Job.find({ created_by: reqId });
  // console.log(job);

  if (!job) {
    return res.status(404).json({
      message: "job not found ",
    });
  }
  return res.status(200).json({
    job,
    status: true,
  });
};
