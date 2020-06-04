const uuid = require("uuid").v4;

module.exports = {
  async createOrganization(parent, { data }, { Organization }, info) {
    const organization = await Organization.create({
      uuid: uuid(),
      name: data.name,
      password: data.password,
      username: data.username,
    });
    return organization;
  },
};