import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    ButtonGroup,
    Button
} from '@chakra-ui/react'
import React from 'react';

const DeleteProduct = (props) => {
    const initRef = React.useRef()
    const handleDelete = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${props.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                props.fetchProduct();
            }
        } catch (error) {
            console.error('Failed to delete product:', error);
        }
    }

    return (
        <>
            <Popover closeOnBlur={false} placement='left' initialFocusRef={initRef}>
                {({ onClose }) => (
                    <>
                        <PopoverTrigger>
                            <Button colorScheme='red'>Delete</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverBody>
                                Are you sure you want to delete?
                            </PopoverBody>
                            <PopoverFooter display='flex' justifyContent='flex-end'>
                                <ButtonGroup size='sm'>
                                    <Button variant='outline' onClick={onClose}
                                        ref={initRef}>Cancel</Button>
                                    <Button colorScheme='red' onClick={handleDelete}>Yes</Button>
                                </ButtonGroup>
                            </PopoverFooter>
                        </PopoverContent>
                    </>
                )}
            </Popover>
        </>
    )
}

export default DeleteProduct;