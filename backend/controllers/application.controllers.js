import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);

    const jobId = req.params.id;
    console.log(jobId);

    if (!jobId) {
      return res.status(404).json({
        message: "invalid job id",
        success: false,
      });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(404).json({
        message: "Yo have already applied for this job",
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });
    console.log(application);

    job.applications.push(application._id);
    await job.save();
    return res.status(200).json({
      message: "Application submitted ",
      success: true,
    });
  } catch (error) {
    return res.status(404).json("Error" + error.message);
  }
};
export const getAppliedJobs = async (req, res) => {
  const userId = req.user._id;
  const allJobs = await Application.find({ applicant: userId })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: { path: "company", options: { sort: { createdAt: -1 } } },
    });
  if (!allJobs) {
    return res.status(400).json({
      message: "You have not applied for any job",
    });
  }
  return res.status(200).json({
    allJobs,
    success: true,
  });
};
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId)
      .sort({ createdAt: -1 })
      .populate("applicant");
  } catch (error) {}
};
export const updatedStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Invalid status",
        success: false,
      });
    }
    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res.status(400).json({
        message: "Application not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Application updated successfully",
      success: true,
    });
  } catch (error) {
    return res.status(404).json("Error" + error.message);
  }
};
