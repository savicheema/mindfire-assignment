import { addData, getData, updateData } from "../../../utils/firebase";

export default (req, res) => {
  console.log("REQUEST", req.query);
  getData(req.query).then((data) => {
    res.status(200).json(data);
  });
};
