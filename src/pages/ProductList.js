import { Helmet } from 'react-helmet';
import { Box, Container, Grid, Pagination } from '@material-ui/core';
import ProductListToolbar from '../components/product/ProductListToolbar';
import TappedEmployees from '../components/dashboard/TappedEmployees';
import ProductCard from '../components/product/ProductCard';
import products from '../__mocks__/products';

const ProductList = () => (
  <>
    <Helmet>
      <title>Employees | Tapped</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          <TappedEmployees />
        </Grid>
      </Container>
    </Box>
  </>
);

export default ProductList;
