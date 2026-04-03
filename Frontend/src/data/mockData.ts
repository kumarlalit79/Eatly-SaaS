export type HealthStatus = "Healthy" | "Moderate" | "Avoid";
export type DietType = "Veg" | "Non-Veg";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  diet: DietType;
  status: HealthStatus;
  healthScore: number; // 1-100
  reason?: string;
  
  explanation: string;
  ingredients: string[];
  cookingStyle: string[];
  bestFor: string[];
  avoidIf: string[];
}

export const allItems: MenuItem[] = [
  {
    id: "1",
    name: "Grilled Chicken Salad",
    description: "Fresh greens with grilled chicken breast and vinaigrette.",
    diet: "Non-Veg",
    status: "Healthy",
    healthScore: 95,
    reason: "High protein, low oil.",
    explanation:
      "A nutritious salad featuring tender grilled chicken breast served over a bed of mixed greens, cherry tomatoes, and cucumber, dressed with a light vinaigrette. It's a balanced meal providing essential proteins and vitamins without excessive calories.",
    ingredients: [
      "Chicken Breast",
      "Mixed Greens",
      "Cherry Tomatoes",
      "Cucumber",
      "Olive Oil",
      "Lemon Juice",
      "Black Pepper",
    ],
    cookingStyle: ["Grilled", "Raw Preparation"],
    bestFor: ["Weight Loss", "Muscle Gain", "High Protein Diet", "Keto"],
    avoidIf: ["Vegan Diet"],
  },
  {
    id: "2",
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato.",
    diet: "Veg",
    status: "Moderate",
    healthScore: 65,
    reason: "Carb heavy, moderate oil.",
    explanation:
      "A popular South Indian dish consisting of a fermented crepe made from rice batter and black lentils, stuffed with a lightly cooked filling of potatoes, fried onions and spices.",
    ingredients: [
      "Rice Batter",
      "Black Lentils",
      "Potatoes",
      "Onions",
      "Mustard Seeds",
      "Curry Leaves",
    ],
    cookingStyle: ["Fermented", "Griddle Fried"],
    bestFor: ["Energy Boost", "Gluten Free Diet"],
    avoidIf: ["Keto Diet", "Low Carb Diet", "Diabetic Diet (in excess)"],
  },
  {
    id: "3",
    name: "Double Cheeseburger",
    description: "Two beef patties with cheese and bacon.",
    diet: "Non-Veg",
    status: "Avoid",
    healthScore: 30,
    reason: "High saturated fat & sodium.",
    explanation:
      "A heavy, calorie-dense burger with two beef patties, melted processed cheese, and bacon strips in a brioche bun. It significantly exceeds daily recommended limits for saturated fat and sodium.",
    ingredients: [
      "Beef Patties",
      "Processed Cheese",
      "Bacon",
      "Brioche Bun",
      "Mayonnaise",
    ],
    cookingStyle: ["Pan Fried", "Processed"],
    bestFor: ["Cheat Meal", "High Calorie Bulking (Dirty Bulk)"],
    avoidIf: [
      "Heart Conditions",
      "High Blood Pressure",
      "Weight Loss",
      "General Health",
    ],
  },
  {
    id: "4",
    name: "Quinoa Bowl",
    description: "Quinoa with roasted vegetables and hummus.",
    diet: "Veg",
    status: "Healthy",
    healthScore: 92,
    reason: "Fiber rich, nutrient dense.",
    explanation:
      "A complete protein powerhouse bowl featuring fluffy quinoa, colorful roasted seasonal vegetables, and a dollop of creamy, fat-healthy hummus. Rich in fiber and micronutrients.",
    ingredients: [
      "Quinoa",
      "Bell Peppers",
      "Zucchini",
      "Chickpeas",
      "Tahini",
      "Lemon",
      "Olive Oil",
    ],
    cookingStyle: ["Boiled", "Roasted"],
    bestFor: ["Vegans", "Weight Loss", "Heart Health", "Diabetic Diet"],
    avoidIf: ["Low Fiber Diet"],
  },
  {
    id: "5",
    name: "French Fries",
    description: "Deep fried potato strips heavily salted.",
    diet: "Veg",
    status: "Avoid",
    healthScore: 25,
    reason: "Deep fried, high calories.",
    explanation:
      "Strips of potato that have been deep-fried in hot oil and salted. They are very high in simple carbohydrates and unhealthy trans fats from the frying process.",
    ingredients: ["Potatoes", "Vegetable Oil", "Salt"],
    cookingStyle: ["Deep Fried"],
    bestFor: ["Occasional Treat"],
    avoidIf: [
      "Weight Loss",
      "Heart Health",
      "High Blood Pressure",
      "High Cholesterol",
    ],
  },
  {
    id: "6",
    name: "Paneer Tikka",
    description: "Marinated cottage cheese grilled in tandoor.",
    diet: "Veg",
    status: "Healthy",
    healthScore: 85,
    reason: "Good protein source, grilled.",
    explanation:
      "Chunks of Indian cottage cheese (paneer) marinated in yogurt and spices, then grilled in a tandoor. It's a great vegetarian protein source that's cooked without excessive oil.",
    ingredients: [
      "Paneer",
      "Yogurt",
      "Besan (Gram Flour)",
      "Spices",
      "Bell Peppers",
      "Onions",
    ],
    cookingStyle: ["Tandoor / Grilled"],
    bestFor: ["Vegetarian Protein", "Muscle Building", "Keto (in moderation)"],
    avoidIf: ["Lactose Intolerance"],
  },
  {
    id: "7",
    name: "Butter Chicken",
    description: "Chicken in rich tomato and butter gravy.",
    diet: "Non-Veg",
    status: "Moderate",
    healthScore: 55,
    reason: "High calorie creamy sauce.",
    explanation:
      "Chicken cooked in a mildly spiced curry sauce that includes butter and heavy cream. While delicious and protein-rich, the high fat content from the dairy reduces its health score.",
    ingredients: [
      "Chicken",
      "Butter",
      "Heavy Cream",
      "Tomato Puree",
      "Cashews",
      "Spices",
    ],
    cookingStyle: ["Stewed", "Sautéed"],
    bestFor: ["Comfort Food", "High Calorie Diet"],
    avoidIf: ["Weight Loss", "Lactose Intolerance", "High Cholesterol"],
  },
  {
    id: "8",
    name: "Veggie Wrap",
    description: "Whole wheat wrap with fresh veggies.",
    diet: "Veg",
    status: "Healthy",
    healthScore: 88,
    reason: "Whole grains, fresh veggies.",
    explanation:
      "A high-fiber whole wheat tortilla stuffed with a variety of fresh, crunchy vegetables. It provides a good serving of daily vitamins and complex carbohydrates.",
    ingredients: [
      "Whole Wheat Tortilla",
      "Lettuce",
      "Tomatoes",
      "Cucumbers",
      "Carrots",
      "Hummus/Light Dressing",
    ],
    cookingStyle: ["Raw Assembly"],
    bestFor: ["Quick Lunch", "Weight Loss", "Heart Health"],
    avoidIf: ["Gluten Intolerance"],
  },
  {
    id: "9",
    name: "Chocolate Brownie",
    description: "Dense chocolate cake with walnuts.",
    diet: "Veg",
    status: "Avoid",
    healthScore: 20,
    reason: "High sugar, high fat.",
    explanation:
      "A rich, chocolate baked confection with high sugar and butter content. It offers very little nutritional value beyond calories.",
    ingredients: ["Sugar", "Butter", "Chocolate", "Flour", "Eggs", "Walnuts"],
    cookingStyle: ["Baked"],
    bestFor: ["Dessert Craving"],
    avoidIf: ["Diabetes", "Weight Loss", "General Health"],
  },
  {
    id: "10",
    name: "Fish Tacos",
    description: "Grilled fish in soft corn tortillas.",
    diet: "Non-Veg",
    status: "Healthy",
    healthScore: 82,
    reason: "Lean protein, lighter option.",
    explanation:
      "Soft corn tortillas filled with seasoned grilled white fish and topped with cabbage slaw. A much lighter alternative to meat tacos or fried fish.",
    ingredients: [
      "White Fish (Tilapia/Cod)",
      "Corn Tortillas",
      "Cabbage Slaw",
      "Lime",
      "Cilantro",
    ],
    cookingStyle: ["Grilled"],
    bestFor: [
      "Weight Management",
      "Lean Protein",
      "Gluten Free (if corn tortillas)",
    ],
    avoidIf: ["Fish Allergy"],
  },
];

export interface ScanHistoryItem {
  id: string;
  restaurantName: string;
  date: string; // e.g., "2 days ago", "Oct 15, 2023"
  totalItems: number;
  healthyCount: number;
  avoidCount: number;
}

export const mockScanHistory: ScanHistoryItem[] = [
  {
    id: "h1",
    restaurantName: "The Burger Joint",
    date: "2 days ago",
    totalItems: 24,
    healthyCount: 8,
    avoidCount: 6,
  },
  {
    id: "h2",
    restaurantName: "Pasta Paradise",
    date: "5 days ago",
    totalItems: 35,
    healthyCount: 12,
    avoidCount: 10,
  },
  {
    id: "h3",
    restaurantName: "Sushi Zen",
    date: "1 week ago",
    totalItems: 42,
    healthyCount: 25,
    avoidCount: 2,
  },
  {
    id: "h4",
    restaurantName: "Taco Fiesta",
    date: "2 weeks ago",
    totalItems: 18,
    healthyCount: 5,
    avoidCount: 8,
  },
  {
    id: "h5",
    restaurantName: "Vegan Vibes",
    date: "3 weeks ago",
    totalItems: 30,
    healthyCount: 28,
    avoidCount: 0,
  },
];
