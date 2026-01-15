import CompanyProfileService from "../services/companyProfile.service.js";

/*
  ENDPOINTS (/api/v1/company/) 
    POST /profile 
    GET /profile
    PATCH /profile
    DELETE /profile
    PUT /profile/logo 
*/

// POST /profile
const createProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const payload = req.body;

    const profile = await CompanyProfileService.createProfile(userId, payload);

    const responseObj = {
      success: true,
      data: profile,
    };

    res.status(201).json(responseObj);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

// GET /profile
const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const profile = await CompanyProfileService.getProfile(userId);

    const responseObj = {
      success: true,
      data: profile,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

// PATCH /profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const payload = req.body;

    const profile = await CompanyProfileService.updateProfile(userId, payload);

    const responseObj = {
      success: true,
      data: profile,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

// DELETE /profile
const deleteProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const profile = await CompanyProfileService.deleteProfile(userId);

    const responseObj = {
      success: true,
      data: profile,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

// PUT /profile/logo
const uploadCompanyLogo = async (req, res) => {
  try {
    const userId = req.user._id;
    const file = req.file;

    const profile = await CompanyProfileService.uploadLogo(userId, file);

    const responseObj = {
      success: true,
      data: profile,
    };

    res.status(200).json(responseObj);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

export {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  uploadCompanyLogo
};