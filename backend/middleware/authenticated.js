import { jwt } from "../utils/index.js";

const asureAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ msg: "La petición no tiene autorización" });
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  try {
    const hasExpired = jwt.hasExpiredToken(token);
    if (hasExpired) return res.status(400).send({ msg: "Token ha expirado" });
    const payload = jwt.decoded(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: error.message });
  }
};

export const mdAuth = {
  asureAuth,
};
