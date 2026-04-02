import * as service from "../services/scan.service";
import { toCamelCase } from "../lib/camelCase";

export const createScan = async (c: any) => {
  const userId = c.get("userId");
  const body = await c.req.parseBody();
  const file = body.image as File;

  const data = await service.createScan(userId, file);
  return c.json({ scan: toCamelCase(data) });
};

export const getScan = async (c: any) => {
  const userId = c.get("userId");
  const id = c.req.param("id");
  const scan = await service.getScanById(userId, id);
  if (!scan) return c.json({ error: "Scan not found" }, 404);
  return c.json({ scan: toCamelCase(scan) });
};

export const history = async (c: any) => {
  const userId = c.get("userId");
  const { page = 1, limit = 10, search } = c.req.query();
  const scans = await service.getScanHistory(userId, Number(page), Number(limit), search);
  return c.json({ scans: toCamelCase(scans) });
};

export const recent = async (c: any) => {
  const userId = c.get("userId");
  const scans = await service.getRecentScans(userId);
  return c.json({ scans: toCamelCase(scans) });
};

export const dishes = async (c: any) => {
  const id = c.req.param("id");
  const data = await service.getDishes(id, c.req.query());
  return c.json({ dishes: toCamelCase(data) });
};

export const dishDetail = async (c: any) => {
  const dishId = c.req.param("dishId");
  const dish = await service.getDishDetail(dishId);
  if (!dish) return c.json({ error: "Dish not found" }, 404);
  return c.json({ dish: toCamelCase(dish) });
};

export const recommendations = async (c: any) => {
  const id = c.req.param("id");
  const data = await service.getRecommendations(id);
  return c.json({ recommendations: toCamelCase(data) });
};

export const rename = async (c: any) => {
  const id = c.req.param("id");
  const { restaurantName } = c.req.valid("json");
  const data = await service.renameScan(id, restaurantName);
  return c.json({ scan: toCamelCase(data) });
};

export const remove = async (c: any) => {
  const id = c.req.param("id");
  await service.softDeleteScan(id);
  return c.json({ message: "Deleted" });
};