import { ListItem, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
import { Product } from "../../../product";

interface PropsType {
  product: Product;
}

export default function ProductCard({ product }: PropsType) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={product.pictureUrl} />
      </ListItemAvatar>
      <ListItemText>
        {" "}
        {product.name} - {product.price}
      </ListItemText>
    </ListItem>
  );
}
