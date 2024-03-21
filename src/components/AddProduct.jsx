import {
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    InputGroup,
    Input,
    Textarea
} from '@chakra-ui/react'
import { useState } from 'react'

const AddProduct = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [form, setForm] = useState({
        name: '',
        quantity: 0,
        description: ''
    });

    const handleFieldChange = (fieldName, value) => {
        setForm({ ...form, [fieldName]: value })
    }

    const handleSubmit = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setForm({
                    name: '',
                    quantity: 0,
                    description: ''
                })
            }
            props.fetchProduct();
        } catch (error) {
            console.error('Failed to save product:', error);
        }
        onClose();
    }

    return (
        <>
            <Button onClick={onOpen} colorScheme='green' ml={2}>Add</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={5}>
                            <FormControl id="name">
                                <FormLabel>Product Name</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.name} type="text" size="md" onChange={(e) => handleFieldChange('name', e.target.value)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="quantity">
                                <FormLabel>Product Quantity</FormLabel>
                                <InputGroup borderColor="#E0E1E7">
                                    <Input value={form.quantity} type="number" size="md" onChange={(e) => handleFieldChange('quantity', e.target.value)} />
                                </InputGroup>
                            </FormControl>
                            <FormControl id="description">
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    value={form.description}
                                    borderColor="gray.300"
                                    _hover={{
                                        borderRadius: 'gray.300',
                                    }}
                                    placeholder="Description"
                                    onChange={(e) => handleFieldChange('description', e.target.value)}
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost' onClick={handleSubmit}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddProduct;