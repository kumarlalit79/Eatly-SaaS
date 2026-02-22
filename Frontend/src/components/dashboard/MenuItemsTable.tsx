import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  {
    name: "Margherita Pizza",
    type: "Vegetarian",
    score: "Avoid",
    scoreColor: "destructive",
    notes: "",
  },
  {
    name: "Grilled Salmon",
    type: "Non-Veg",
    score: "Healthy",
    scoreColor: "success",
    notes: "",
  },
  {
    name: "Quinoa Salad",
    type: "Vegetarian",
    score: "Healthy",
    scoreColor: "success",
    notes: "",
  },
  {
    name: "Cheeseburger",
    type: "Non-Veg",
    score: "Moderate",
    scoreColor: "warning",
    notes: "High in fat",
  },
  {
    name: "Chocolate Cake",
    type: "Vegetarian",
    score: "Avoid",
    scoreColor: "destructive",
    notes: "High in sugar",
  },
];

const MenuItemsTable = () => {
  return (
    <div className="rounded-md border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead className="w-[300px]">Dish Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Health Score</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menuItems.map((item) => (
            <TableRow key={item.name}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className="font-normal text-muted-foreground bg-gray-100 hover:bg-gray-100"
                >
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={item.scoreColor as any} className="font-medium">
                  {item.score}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground font-light">
                {item.notes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MenuItemsTable;
