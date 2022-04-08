/* eslint-disable no-nested-ternary */
import { useMemo, useEffect } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Button,
  Skeleton,
} from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

function DataTable({
  data,
  pageCount: controlledPageCount,
  fetchData,
  loading,
}) {
  const columns = useMemo(
    () => [
      {
        Header: 'Username',
        accessor: 'login.username',
      },
      {
        Header: 'Name',
        accessor: 'name.first',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Gender',
        accessor: 'gender',
      },
      {
        Header: 'Registered Date',
        accessor: 'registered.date',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, sortBy },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualSortBy: true,
      disableMultiSort: true,
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    const sort = sortBy.length > 0 ? sortBy[0] : undefined;
    fetchData({ page: pageIndex + 1, sort });
  }, [pageIndex]);

  useEffect(() => {
    setPageSize(10);
  }, []);

  useEffect(() => {
    if (pageIndex !== 0) {
      gotoPage(0);
    } else {
      const sort = sortBy.length > 0 ? sortBy[0] : undefined;
      fetchData({ page: 1, sort });
    }
  }, [sortBy]);

  return (
    <Skeleton isLoaded={!loading}>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <ArrowDownIcon mx={2} />
                    ) : (
                      <ArrowUpIcon mx={2} />
                    )
                  ) : (
                    ''
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Box my={5}>
        <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </Button>{' '}
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </Button>{' '}
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </Button>{' '}
        <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </Button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
      </Box>
    </Skeleton>
  );
}

export default DataTable;
