import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  GridItem,
  Spacer,
  StackDivider,
  Text,
  VStack,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SpheronClient, ProtocolEnum } from '@spheron/storage';
import { upload } from '@spheron/browser-upload';
import { convertObjectToFile, getUploadToken } from '../utils';
import CreateOrganisationModal from './createOrganisationModal';

const Dashboard = () => {
  const organisations = [
    {
      name: 'BlitzCraftHQ',
      id: '1',
      address: '0x1234567890123456789012345678901234567890',
      devices: [
        {
          name: 'Fan',
          id: '1',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          name: 'Hall Lights',
          id: '2',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          name: 'Bedroom Lights',
          id: '3',
          address: '0x1234567890123456789012345678901234567890',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor mattis tortor, at venenatis sapien blandit ut. Aenean eget risus et justo tempor viverra. Nullam id dictum augue. Proin tristique nisi nec nunc facilisis, ac convallis odio dapibus. Vestibulum consectetur aliquam lacus ac consequat.',
    },
    {
      name: 'Niggga Assocation',
      id: '2',
      devices: [
        {
          name: 'Fan',
          id: '1',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          name: 'Hall Lights',
          id: '2',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          name: 'Bedroom Lights',
          id: '3',
          address: '0x1234567890123456789012345678901234567890',
        },
      ],
      address: '0x1234567890123456789012345678901234567890',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor mattis tortor, at venenatis sapien blandit ut. Aenean eget risus et justo tempor viverra. Nullam id dictum augue. Proin tristique nisi nec nunc facilisis, ac convallis odio dapibus. Vestibulum consectetur aliquam lacus ac consequat.',
    },
    {
      name: 'Lana Fan Club',
      id: '3',
      devices: [
        {
          name: 'Fan',
          id: '1',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          name: 'Hall Lights',
          id: '2',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          name: 'Bedroom Lights',
          id: '3',
          address: '0x1234567890123456789012345678901234567890',
        },
      ],
      address: '0x1234567890123456789012345678901234567890',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor mattis tortor, at venenatis sapien blandit ut. Aenean eget risus et justo tempor viverra. Nullam id dictum augue. Proin tristique nisi nec nunc facilisis, ac convallis odio dapibus. Vestibulum consectetur aliquam lacus ac consequat.',
    },
    {
      name: 'What!s up  1',
      id: '4',
      devices: [
        {
          name: 'Fan',
          id: '1',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          name: 'Hall Lights',
          id: '2',
          address: '0x1234567890123456789012345678901234567890',
        },
        {
          name: 'Bedroom Lights',
          id: '3',
          address: '0x1234567890123456789012345678901234567890',
        },
      ],
      address: '0x1234567890123456789012345678901234567890',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor mattis tortor, at venenatis sapien blandit ut. Aenean eget risus et justo tempor viverra. Nullam id dictum augue. Proin tristique nisi nec nunc facilisis, ac convallis odio dapibus. Vestibulum consectetur aliquam lacus ac consequat.',
    },
  ];
  const [selected, setSelected] = useState('1');
  const [uploadToken, setUploadToken] = useState(null);
  const [showCreateOrganisation, setShowCreateOrganisation] = useState(false);
  useEffect(() => {
    (async () => {
      const token = await getUploadToken('blitzcrafthq');
      setUploadToken(token);
    })();
  }, []);

  return (
    <>
      <Box fontSize="3xl" fontWeight={'bold'} marginBottom={'20px'}>
        Dashboard
      </Box>
      <Divider marginBottom={'20px'} />
      <Grid h="900px" templateRows="repeat(5, 1fr)" templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem rowSpan={5} colSpan={1} bg="#141214">
          <VStack
            divider={<StackDivider borderColor="gray.900" />}
            spacing={4}
            align="stretch"
            padding="10px"
            borderRadius={'md'}
          >
            {organisations.map((org) => (
              <Box
                as="button"
                h="40px"
                p="2"
                textAlign={'center'}
                bg={selected == org.id ? 'gray.200' : 'gray.800'}
                borderRadius={'md'}
                fontWeight={'medium'}
                textColor={selected == org.id ? 'black' : 'white'}
                alignItems="center"
                justifyContent={'center'}
                onClick={() => setSelected(org.id)}
              >
                {org.name}
              </Box>
            ))}
            <Box
              as="button"
              h="40px"
              p="2"
              textAlign={'center'}
              _hover={{ bg: 'gray.200', textColor: 'black' }}
              bg={'gray.600'}
              borderRadius={'md'}
              fontWeight={'medium'}
              textColor={'white'}
              alignItems="center"
              justifyContent={'center'}
              onClick={() => {
                // Create Organisation
                setShowCreateOrganisation(true);
              }}
            >
              {'➕ Create'}
            </Box>
          </VStack>
        </GridItem>
        <GridItem h="200px" colSpan={4} rowSpan={1} bg="#141214" borderRadius={'md'} marginBottom={'20px'}>
          <Flex>
            <Text fontSize="3xl" fontWeight={'bold'} margin={'20px'}>
              {organisations[parseInt(selected) - 1].name}
            </Text>
            <Spacer />
            <Button margin={'20px'}>➕ Create Device</Button>
          </Flex>
          <Divider marginBottom={'20px'} borderColor="gray.900" />
          <Text margin={'20px'}>{organisations[parseInt(selected) - 1].description}</Text>
        </GridItem>

        <GridItem colSpan={2} rowSpan={4} bg="#141214" borderRadius={'md'} marginBottom={'20px'}>
          <Text fontSize="3xl" fontWeight={'bold'} margin={'20px'}>
            {'Devices'}
          </Text>
          <Divider marginBottom={'20px'} borderColor="gray.900" />
          <VStack spacing={2} align="stretch" padding="10px" borderRadius={'md'}>
            {organisations[parseInt(selected) - 1].devices.map((device) => (
              <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(4, 1fr)"
                as="button"
                h="120px"
                p="2"
                bg={'gray.800'}
                borderRadius={'md'}
                fontWeight={'medium'}
                textColor={'white'}
                _hover={{ bg: 'gray.200', textColor: 'black' }}

                // onClick={() => setSelected(org.id)}
              >
                <GridItem colSpan={1} rowSpan={2}>
                  <Image src="https://picsum.photos/100" alt={device.name} />
                </GridItem>
                <GridItem colSpan={3} rowSpan={1} paddingTop="15px">
                  <Text textAlign="start" fontWeight={'bold'}>
                    {device.name}
                  </Text>
                </GridItem>
                <GridItem colSpan={3} rowSpan={1} paddingBottom="15px">
                  <Text textAlign={'center'} fontWeight="normal">
                    {device.address}
                  </Text>
                </GridItem>
              </Grid>
            ))}
          </VStack>
        </GridItem>
        <GridItem colSpan={2} rowSpan={4} bg="#141214" borderRadius={'md'} marginBottom={'20px'}>
          <Text fontSize="3xl" fontWeight={'bold'} margin={'20px'}>
            {'View Data'}
          </Text>
        </GridItem>
      </Grid>
      <CreateOrganisationModal
        isOpen={showCreateOrganisation}
        onClose={() => {
          setShowCreateOrganisation(false);
        }}
      />
    </>
  );
};

export default Dashboard;