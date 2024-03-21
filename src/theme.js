import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    // Your custom theme configurations go here
    styles: {
        global: {
            body: {
                bg: 'gray.200' // Example custom background color
            }
        }
    }
});

export default theme;