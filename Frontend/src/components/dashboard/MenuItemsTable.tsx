import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import type { Dish } from "@/types";

interface Props {
  dishes: Dish[];
  scanId: string;
}

const MenuItemsTable = ({ dishes, scanId }: Props) => {
  const navigate = useNavigate();

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "HEALTHY": return "success";
      case "MODERATE": return "warning";
      case "AVOID": return "destructive";
      default: return "secondary";
    }
  };

  const getBadgeLabel = (badge: string) => {
    switch (badge) {
      case "HEALTHY": return "Healthy";
      case "MODERATE": return "Moderate";
      case "AVOID": return "Avoid";
      default: return badge;
    }
  };

  const getTypeLabel = (vegStatus: string) => {
    return vegStatus === "VEG" ? "Vegetarian" : "Non-Veg";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Menu Items</h3>
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
            {dishes.map((dish) => (
              <TableRow
                key={dish.id}
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(`/dish/${scanId}/${dish.id}`)}
              >
                <TableCell className="font-medium">{dish.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className="font-normal text-muted-foreground bg-gray-100 hover:bg-gray-100"
                  >
                    {getTypeLabel(dish.vegStatus)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getBadgeVariant(dish.healthBadge) as any} className="font-medium">
                    {getBadgeLabel(dish.healthBadge)}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground font-light">
                  {dish.healthReason || ""}
                </TableCell>
              </TableRow>
            ))}
            {dishes.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No dishes to display
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MenuItemsTable;
