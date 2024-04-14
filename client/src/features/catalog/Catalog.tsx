import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogSlice";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "price", label: "Price - Low to High" },
  { value: "priceDesc", label: "Price - High to Low" },
];

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useAppDispatch();
  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
  } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) {
      dispatch(fetchFiltersAsync());
    }
  }, [filtersLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading products..." />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={<Checkbox />}
                label={brand}
              />
            ))}
          </FormGroup>
        </Paper>

        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
            {types.map((brand) => (
              <FormControlLabel
                key={brand}
                control={<Checkbox />}
                label={brand}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>

      <Grid item xs={3} />
      <Grid item xs={9}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: -5 }}
        >
          <Typography>Displaying 1-6 of 20 items</Typography>
          <Pagination color="secondary" size="large" count={10} page={2} />
        </Box>
      </Grid>
    </Grid>
  );
}
