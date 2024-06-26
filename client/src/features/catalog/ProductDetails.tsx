import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore"; // Add missing import statements

import { addCartItemAsync, removeCartItemAsync } from "../cart/cartSlice";
import { fetchSingleProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { cart, status } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, parseInt(id!))
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = cart?.items.find((item) => item.productId === product?.id);
  +useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) {
      dispatch(fetchSingleProductAsync(parseInt(id)));
    }
  }, [id, item, dispatch, product]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(e?.target.value) >= 0) {
      setQuantity(parseInt(e.target.value));
    }
  }

  function handleUpdateCart() {
    if (!product) return;
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addCartItemAsync({ productId: product.id, quantity: updatedQuantity })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeCartItemAsync({
          productId: product.id,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes("pending")) {
    return <LoadingComponent message="Loading product..." />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>

      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Quantity in Cart"
              type="number"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
