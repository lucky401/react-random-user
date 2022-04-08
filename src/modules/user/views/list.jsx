import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Stack,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Select,
  Button,
} from '@chakra-ui/react';

import { SearchIcon } from '@chakra-ui/icons';

import debounce from 'lodash.debounce';

import commonServices from '../../../common/services';

import DataTable from '../components/data-table';

function ListView() {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');

  const [sortBy, setSortBy] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);

  const LIMIT = 10;

  const handleFilterGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleResetFilter = () => {
    setSearch('');
    setGender('');
  };

  const fetchUserCollections = async ({
    query = search,
    page,
    gender,
    sort = sortBy,
  }) => {
    setSortBy(sort);
    setLoading(true);
    try {
      const filters = {
        page: page || 1,
        pageSize: LIMIT,
        results: LIMIT,
        keyword: query || undefined,
        gender: gender || undefined,
      };

      if (sort?.id) {
        filters.sortBy = sort.id;
        filters.sortOrder = sort.desc ? 'desc' : 'asc';
      }

      const payload = filters;

      const response = await commonServices.userCollection.list(payload);

      const { results: items } = response.data;

      setUsers(items);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debounceSearch = useCallback(
    debounce((search) => {
      fetchUserCollections(search);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);
    debounceSearch({ query: value, gender });
  };

  useEffect(() => {
    fetchUserCollections({ gender, query: search });
  }, [gender]);

  return (
    <Box>
      <Text as="h1" fontWeight="bold" fontSize="xl">
        Example With Search and Filter
      </Text>
      <Stack my={4} direction={{ base: 'column', md: 'row' }} gap={2}>
        <InputGroup maxW={{ base: '100%', md: '190px' }}>
          <Input
            onChange={handleSearchChange}
            value={search}
            type="search"
            placeholder="Find users..."
          />
          <InputRightElement>
            <SearchIcon color="gray.500" />
          </InputRightElement>
        </InputGroup>
        <Select
          onChange={handleFilterGenderChange}
          value={gender}
          placeholder="Gender"
          maxW={{ base: '100%', md: '190px' }}
        >
          <option value="female">Female</option>
          <option value="male">Male</option>
        </Select>
        <Button onClick={handleResetFilter} type="reset" variant="outline">
          Reset Filter
        </Button>
      </Stack>
      <Box my={8}>
        <DataTable
          pageCount={500}
          data={users}
          loading={loading}
          fetchData={fetchUserCollections}
        />
      </Box>
    </Box>
  );
}
export default ListView;
