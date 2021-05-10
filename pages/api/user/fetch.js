import { addData, getData, updateData } from "../../../utils/firebase";

export default (req, res) => {
  console.log("REQUEST", req.query);
  res.status(200).json({ user: "fetched" });
};
