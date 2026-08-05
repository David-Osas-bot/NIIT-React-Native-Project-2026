const Address = require("../models/Address");
const { geocodeAddress } = require("../utils/geocode");

async function createAddress(req, res, next) {
  try {
    const { label, street, apartment, postcode, lat, lng, isDefault } = req.body;

    if (!street) {
      return res.status(400).json({ message: "Street is required" });
    }

    if (isDefault) {
      await Address.updateMany({ owner: req.userId }, { isDefault: false });
    }

    let coords = { lat, lng };
    if (lat === undefined || lng === undefined) {
      const geocoded = await geocodeAddress([street, postcode].filter(Boolean).join(", "));
      if (geocoded) coords = geocoded;
    }

    const address = await Address.create({
      owner: req.userId,
      label,
      street,
      apartment,
      postcode,
      lat: coords.lat,
      lng: coords.lng,
      isDefault: !!isDefault,
    });

    res.status(201).json({ address });
  } catch (err) {
    next(err);
  }
}

async function getAddresses(req, res, next) {
  try {
    const addresses = await Address.find({ owner: req.userId }).sort({ createdAt: -1 });
    res.json({ addresses });
  } catch (err) {
    next(err);
  }
}

async function getAddress(req, res, next) {
  try {
    const address = await Address.findOne({ _id: req.params.id, owner: req.userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ address });
  } catch (err) {
    next(err);
  }
}

async function updateAddress(req, res, next) {
  try {
    const { label, street, apartment, postcode, lat, lng, isDefault } = req.body;

    const address = await Address.findOne({ _id: req.params.id, owner: req.userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (isDefault) {
      await Address.updateMany({ owner: req.userId }, { isDefault: false });
    }

    if (label !== undefined) address.label = label;
    if (street !== undefined) address.street = street;
    if (apartment !== undefined) address.apartment = apartment;
    if (postcode !== undefined) address.postcode = postcode;
    if (lat !== undefined) address.lat = lat;
    if (lng !== undefined) address.lng = lng;
    if (isDefault !== undefined) address.isDefault = !!isDefault;

    await address.save();
    res.json({ address });
  } catch (err) {
    next(err);
  }
}

async function deleteAddress(req, res, next) {
  try {
    const address = await Address.findOneAndDelete({ _id: req.params.id, owner: req.userId });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.json({ message: "Address deleted" });
  } catch (err) {
    next(err);
  }
}

async function lookupGeocode(req, res, next) {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "query param is required" });
    }

    const coords = await geocodeAddress(query);
    if (!coords) {
      return res.status(404).json({ message: "No location found for that query" });
    }

    res.json(coords);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  deleteAddress,
  lookupGeocode,
};
