const axios = require('axios');

module.exports = {
  getMatchingResults: async(req, res) => {
    const {
      employeeID,
      skills,
      experience,
      department,
      learningGoal,
      availability,
      interest,
      phoneNumber,
      email
    } = req.body;
    try {
      // Call Matching Service API with provided parameters
      console.log('API matching service URL:', process.env.TINTOR_MATCHING_URL);
      const response = await axios.post(`${process.env.TINTOR_MATCHING_URL}/predict`, {
        employeeID,
        skills,
        experience,
        department,
        learningGoal,
        availability,
        interest,
        phoneNumber,
        email
      });
      console.log('Response from matching service 121212:', response.data);
      if(response.data) {
        return res.status(200).json({
          message: "Matching results fetched successfully",
          data: response.data
        });
      }
    } catch (error) {
      console.error('Error fetching matching results:', error.message);
      return res.status(500).json({
        message: "An error occurred while fetching matching results",
        error: error.message
      });
    }
  }
}