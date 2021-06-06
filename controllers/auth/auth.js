login(req, res);
{
  if (!req.body.memail || !req.body.mpassword) {
    return res.status(404).send({
      message: "Email and password can not be empty!",
    });
  } else {
    const email = req.body.memail;
    const password = crypto
      .createHash("md5")
      .update(req.body.mpassword)
      .digest("hex");
    const potentialUser = {
      where: {
        memail: email,
        mpassword: password,
      },
      attributes: ["memail", "muuid", "cid"],
    };
    Member.findOne(potentialUser)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "fail",
            error: "User not found. Authentication failed.",
          });
        }
        const token = jwt.sign(
          {
            muuid: user.muuid,
            memail: user.memail,
            cid: user.cid,
          },
          "secret_key",
          {
            expiresIn: "2h",
          }
        );
        return res.status(200).send({ message: "success", token: token });
      })
      .catch((error) => res.status(400).send(error));
  }
}
