import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addCartItemAsync } from "../cart/cartSlice";

interface PropsType {
  product: Product;
}

export default function ProductCard({ product }: PropsType) {
  const { status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardHeader
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "light", color: "secondary.dark" },
        }}
      />

      <CardMedia
        sx={{
          height: 140,
          backgroundSize: "contain",
          bgcolor: "secondary.white",
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5" component="div">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand} / {product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          sx={{ color: "secondary.dark" }}
          loading={status.includes("pending" + product.id)}
          onClick={async () => {
            try {
              await dispatch(addCartItemAsync({ productId: product.id }));
              toast.success("Item added to cart!");
            } catch (error) {
              toast.error("Failed to add item to cart.");
            }
          }}
          size="small"
        >
          Add to Cart
        </LoadingButton>
        <Button
          component={Link}
          to={`/catalog/${product.id}`}
          size="small"
          sx={{ color: "secondary.dark" }}
        >
          {" "}
          View{" "}
        </Button>
      </CardActions>
    </Card>
  );
}
