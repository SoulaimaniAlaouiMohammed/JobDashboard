const JobOpportunity = require("../models/JobOpportunity");
const { Sequelize } = require("sequelize");


exports.createJob = async (req, res) => {
  try {
    const job = await JobOpportunity.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllJobs = async (req, res) => {
    const { location, domain, type } = req.query;
    const whereConditions = {};
  
    if (location) whereConditions.location = location;
    if (domain) whereConditions.domain = domain;
    if (type) whereConditions.type = type;
  
    try {
      const jobs = await JobOpportunity.findAll({
        where: whereConditions,
      });
      res.status(200).json(jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ message: 'Error fetching jobs' });
    }
};


exports.getJobsByCity = async (req, res) => {
  const { location } = req.query;
  try {
    const jobs = await JobOpportunity.findAll({
      where: { location },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobAnalytics = async (req, res) => {
  try {

    const jobsByCity = await JobOpportunity.findAll({
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.col("location"), "Unknown"), "location"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["location"],
    });


    const jobsByCompany = await JobOpportunity.findAll({
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.col("company"), "Unknown"), "company"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["company"],
    });


    const jobsByDomain = await JobOpportunity.findAll({
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.col("domain"), "Unknown"), "domain"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["domain"],
    });


    const jobsByType = await JobOpportunity.findAll({
      attributes: [
        [Sequelize.fn("COALESCE", Sequelize.col("type"), "Unknown"), "type"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
      ],
      group: ["type"],
    });

    res.json({ jobsByCity, jobsByCompany, jobsByDomain, jobsByType });
  } catch (error) {
    console.error("Error in getJobAnalytics:", error);
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};


exports.createJob = async (req, res) => {
  try {
    const { title, company, location, description, jobLink, type, domain, companySize } = req.body;

    const newJob = await JobOpportunity.create({
      title,
      company,
      location,
      description,
      jobLink,
      type,
      domain,
      companySize
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Error creating job opportunity' });
  }
};
