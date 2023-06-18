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
import { useSelector } from 'react-redux';
import CreateOrganisationModal from './createOrganisationModal';
import { organisationABI, protocolABI, protocolAddress } from './metamask/lib/constants';
import contractCall from './metamask/lib/contract-call';

const Dashboard = () => {
  const { currentAccount } = useSelector((state: any) => state.metamask);

  const [selected, setSelected] = useState('1');
  const [uploadToken, setUploadToken] = useState(null);
  const [showCreateOrganisation, setShowCreateOrganisation] = useState(false);
  const [organisations, setOrganisations] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {}, [selected]);
  useEffect(() => {
    (async function () {
      const _organisations = await contractCall(
        protocolAddress,
        currentAccount,
        protocolABI,
        [],
        0,
        'getOrganisations()',
        true,
      );
      console.log(_organisations);
      if (_organisations.length > 0) {
        const formattedOrganisations = _organisations.map((org, index) => ({
          name: org.name,
          id: (index + 1).toString(),
          address: org.organisationContractAddress,
          symbol: org.symbol,
          creator: org.creator,
        }));

        setOrganisations(formattedOrganisations);
        setSelected('1');
        const _devices = await contractCall(
          formattedOrganisations[0].address,
          currentAccount,
          organisationABI,
          [],
          0,
          'getDevices()',
          true,
        );
        setDevices(_devices);
      }
    })();
  });
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
