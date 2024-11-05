import React, { useEffect } from 'react';
import { Flex, Box, Button } from '@chakra-ui/react';

const Pagination = ({ startIndex, count, onPageNavigate, maxRecords, data }) => {
    // Menghitung total halaman
    const totalPages = Math.ceil(count / maxRecords);
    const itemsShow = startIndex + maxRecords;

    // Memastikan jika data pada halaman kedua kosong, kita langsung pindah ke halaman pertama
    useEffect(() => {
        if (startIndex >= maxRecords && data.length === 0) {
            onPageNavigate(1); // Pindah ke halaman 1 jika data kosong
        }
    }, [startIndex, maxRecords, onPageNavigate]);

    // Jika hanya ada 1 halaman, jangan tampilkan tombol halaman
    if (totalPages <= 1) {
        return null; // Tidak menampilkan pagination jika hanya ada satu halaman
    }

    return (
        <Flex justifyContent={'space-between'} alignItems={'center'} mt={'20px'}>
            <Box color={'gray'}>
                {itemsShow - 1} items of {count}
            </Box>
            <Box>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                        key={index + 1}
                        onClick={() => onPageNavigate(index + 1)}
                        variant={startIndex === index + 1 ? 'solid' : 'outline'}
                        colorScheme={'teal'}
                        ml={1}
                    >
                        {index + 1}
                    </Button>
                ))}
            </Box>
        </Flex>
    );
};

export default Pagination;


// import React from 'react'
// import { Flex, Box, Button } from '@chakra-ui/react'

// const Pagination = ({ startIndex, count, onPageNavigate, maxRecords }) => {
//     const totalPages = Math.ceil(count / maxRecords)
//     const itemsShow = startIndex + maxRecords;
//     return (
//         <>
//             <Flex justifyContent={'space-between'}
//                 alignItems={'center'}
//                 mt={'20px'} >
//                 <Box color={'gray'}>
//                     {itemsShow - 1} items of {count}
//                 </Box>
//                 <Box>
//                     {Array.from({ length: totalPages }, (_, index) => (
//                         <Button
//                             key={index + 1}
//                             onClick={() => onPageNavigate(index + 1)}
//                             variant={startIndex === index + 1 ? 'solid' : 'outline'}
//                             colorScheme={'teal'}
//                             ml={1}
//                         >
//                             {index + 1}
//                         </Button>
//                     ))}
//                 </Box>
//             </Flex >

//         </>
//     )
// }

// export default Pagination
