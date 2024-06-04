import User from "../model/userModel.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const uploadMiddleware = upload.single("image");

export const create = async (req, res) => {
  try {
    const { name, summary } = req.body;
    const image = req.file ? req.file.buffer : null;
    console.log("Uploaded file:", req.file);

    // Create new user document
    const user = new User({
      name,
      image,
      summary,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const fetch = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length == 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`hello ${id}`);
    const userExist = await User.findOne({ _id: id });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Internal sever error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`hello ${id}`);
    const userExist = await User.findOne({ _id: id });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const deleteUser = await User.findByIdAndDelete(id);

    res.status(201).json({ message: "User deleted Succesfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal sever error" });
  }
};
