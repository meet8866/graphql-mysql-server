import HttpError from "../exceptions/http-error";
import template from "../models/template";

export default {
  async organizations(parent, args, { models, logger }, info) {},
  async organizationByUuid(parent, args, { models, logger, req }, info) {
    try {
      const organization = await models.Organization.findOne({
        where: { uuid: args.uuid },
      });
      if (!organization) {
        const err = new HttpError("No organization found of that uuid");
        err.statusCode = 401;
        err.level = "info";
        throw err;
      }
      return organization;
    } catch (err) {
      if (!(err instanceof HttpError)) {
        err.statusCode = 500;
      }
      logger[err.level || "error"](err, req);
      throw err;
    }
  },
  async organization(parent, args, { models, logger, req }, info) {
    try {
      const organization = await models.Organization.findOne({
        where: { username: args.username },
      });
      if (!organization) {
        const err = new HttpError("No organization found of that username");
        err.statusCode = 401;
        err.level = "info";
        throw err;
      }
      return organization;
    } catch (err) {
      if (!(err instanceof HttpError)) {
        err.statusCode = 500;
      }
      logger[err.level || "error"](err, req);
      throw err;
    }
  },
  async employee(parent, args, { models, logger, req }, info) {
    try {
      const employee = await models.Employee.findOne({
        where: {
          organizationId: args.organizationId,
          companyEmail: args.companyEmail,
        },
      });
      if (!employee) {
        const err = new HttpError("No employee found of that company email");
        err.statusCode = 401;
        err.level = "info";
        throw err;
      }
      return employee;
    } catch (err) {
      if (!(err instanceof HttpError)) {
        err.statusCode = 500;
      }
      logger[err.level || "error"](err, req);
      throw err;
    }
  },
  async employeeByUuid(parent, args, { models, logger, req }, info) {
    try {
      const employee = await models.Employee.findOne({
        where: { organizationId: args.organizationId, uuid: args.uuid },
      });
      if (!employee) {
        const err = new HttpError("No employee found of that id");
        err.statusCode = 401;
        err.level = "info";
        throw err;
      }
      return employee;
    } catch (err) {
      if (!(err instanceof HttpError)) {
        err.statusCode = 500;
      }
      logger[err.level || "error"](err, req);
      throw err;
    }
  },
  async employees(parent, args, { models, logger, req }, info) {
    try {
      return await models.Employee.findAll({
        where: {
          organizationId: args.organizationId,
        },
        include: [
          {
            model: models.Organization,
          },
        ],
      });
    } catch (err) {
      if (!(err instanceof HttpError)) {
        err.statusCode = 500;
      }
      logger[err.level || "error"](err, req);
      throw err;
    }
  },
  async templates(parent, args, { models, logger, req }, info) {
    try {
      return await models.Template.findAll({
        where: {
          organizationId: args.organizationId,
        },
      });
    } catch (err) {
      if (!(err instanceof HttpError)) {
        err.statusCode = 500;
      }
      logger[err.level || "error"](err, req);
      throw err;
    }
  },
};
