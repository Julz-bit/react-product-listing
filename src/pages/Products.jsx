import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Heading,
    Flex
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import EditProduct from '../components/EditProduct';
import DeleteProduct from '../components/DeleteProduct';
import AddProduct from '../components/AddProduct';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchProduct();
        };
        fetchData();
    }, []);

    const fetchProduct = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products`);
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <Box maxW="100%" overflowX="auto" textAlign="center">
                <Flex align="center" mb={4}>
                    <Heading>PRODUCTS</Heading>
                    <AddProduct fetchProduct={fetchProduct} />
                </Flex>

                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                <Th>NAME</Th>
                                <Th>QUANTITY</Th>
                                <Th>DESCRIPTION</Th>
                                <Th>ACTION</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {products.map((product, index) => (
                                <Tr key={index}>
                                    <Td>{product.name}</Td>
                                    <Td>{product.quantity}</Td>
                                    <Td>{product.description}</Td>
                                    <Td>
                                        <EditProduct product={product} fetchProduct={fetchProduct} />
                                        <DeleteProduct id={product._id} fetchProduct={fetchProduct} />
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer >
            </Box>
        </>
    );
};

export default Products;