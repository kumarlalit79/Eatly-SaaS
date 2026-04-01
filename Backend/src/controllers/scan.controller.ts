import * as service from "../services/scan.service";

export const createScan = async (c: any) => {
  const userId = c.get("userId");
  const body = await c.req.parseBody();
  const file = body.file as File;

  const data = await service.createScan(userId, file);
  return c.json(data);
};

export const getScan = async (c: any) => {
  const userId = c.get("userId");
  const id = c.req.param("id");

  return c.json(await service.getScanById(userId, id));
};

export const history = async (c: any) => {
  const userId = c.get("userId");
  const { page = 1, limit = 10, search } = c.req.query();

  return c.json(
    await service.getScanHistory(
      userId,
      Number(page),
      Number(limit),
      search
    )
  );
};

export const recent = async (c: any) => {
  const userId = c.get("userId");
  return c.json(await service.getRecentScans(userId));
};

export const dishes = async (c: any) => {
  const id = c.req.param("id");
  return c.json(await service.getDishes(id, c.req.query()));
};

export const dishDetail = async (c: any) => {
  const dishId = c.req.param("dishId");
  return c.json(await service.getDishDetail(dishId));
};

export const recommendations = async (c: any) => {
  const id = c.req.param("id");
  return c.json(await service.getRecommendations(id));
};

export const rename = async (c: any) => {
  const id = c.req.param("id");
  const { restaurant_name } = c.req.valid("json");

  return c.json(await service.renameScan(id, restaurant_name));
};

export const remove = async (c: any) => {
  const id = c.req.param("id");
  return c.json(await service.softDeleteScan(id));
};