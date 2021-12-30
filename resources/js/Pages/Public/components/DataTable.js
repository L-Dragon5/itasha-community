import 'regenerator-runtime/runtime';

import { SearchIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Select,
  Spacer,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React, { useMemo, useRef, useState } from 'react';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import {
  useAsyncDebounce,
  useFlexLayout,
  useGlobalFilter,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from 'react-table';

import Button from './Button';
import Span from './Span';

/*
  Default global filter for table.

  Creates the search input box that is used to globally filter rows on table.
  Incorporated with the useGlobalFilter hook from react-table.
*/
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((val) => {
    setGlobalFilter(val || undefined);
  }, 200);

  return (
    <InputGroup w="25%">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.500" />
      </InputLeftElement>
      <Input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Search"
        borderRadius={20}
      />
    </InputGroup>
  );
};

/*
  Checkbox for table selection to show indeterminate status.
*/
const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, checked, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <Checkbox
        ref={resolvedRef}
        isIndeterminate={indeterminate}
        isChecked={checked}
        {...rest}
      />
    );
  },
);

/*
  Jump to Page dialog component

  Used in pagination to jump to a specific page in the table.
*/
const JumpToPageDialog = ({ isOpen, setIsOpen, gotoPage, pageCount }) => {
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const inputRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const pageNumber = inputRef.current.value
              ? Number(inputRef.current.value) - 1
              : 0;
            onClose();
            gotoPage(pageNumber);
          }}
        >
          <AlertDialogHeader>Jump To Page (1 - {pageCount})</AlertDialogHeader>
          <AlertDialogBody>
            <Input
              ref={inputRef}
              type="number"
              min={1}
              max={Number(pageCount)}
            />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button type="submit" mr={3}>
              Confirm
            </Button>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

/*
  DataTable component used to display data in a grid-like table.
  
  Props:
    - columns         -- array of columns for table
    - data            -- the data to be used to populate table
    - tableCaption    -- component that gets displayed for table text (optional)
    - headerButtons   -- components to be displayed in the table header
                        (optional)
    - hideSearch      -- for if global filter search should be hidden or not
                        (boo, default: false)
*/
const DataTable = ({
  columns,
  data,
  tableCaption,
  headerButtons,
  hideSearch,
}) => {
  // State for checking if "jump to page" modal is open.
  const [isOpen, setIsOpen] = useState(false);
  const parentRef = React.useRef();

  // Default column properties for table.
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 200,
    }),
    [],
  );

  /*
    Various variables, functions, and hooks used by react-table.
  */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    pageOptions,
    setPageSize,
    setGlobalFilter,
    state: { globalFilter, pageIndex, pageSize },
  } = useTable(
    { columns, data, defaultColumn },
    useResizeColumns,
    useFlexLayout,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const backgroundColor = useColorModeValue('white', 'blue.800');

  return (
    <>
      {/* Display headerButtons or hide the global filter search */}
      {headerButtons || !hideSearch ? (
        <Box className="top-table-container" my={4}>
          <Flex ml={3}>
            {headerButtons || <></>}
            <Popover>
              <PopoverTrigger>
                <Button>Column Display</Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody as={VStack} spacing={2} alignItems="flex-start">
                    <IndeterminateCheckbox {...getToggleHideAllColumnsProps()}>
                      All Columns
                    </IndeterminateCheckbox>
                    {allColumns.map((column) => {
                      const { checked } = column.getToggleHiddenProps();
                      return (
                        <Checkbox
                          key={column.id}
                          {...column.getToggleHiddenProps()}
                          isChecked={checked}
                        >
                          {column.Header}
                        </Checkbox>
                      );
                    })}
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover>
            <Spacer />
            {!hideSearch ? (
              <GlobalFilter
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
            ) : null}
          </Flex>
        </Box>
      ) : null}

      <Box ref={parentRef} overflow="auto">
        {/* Main table rendering */}
        <Table
          {...getTableProps()}
          colorScheme="blue"
          size="md"
          variant="striped"
        >
          <Thead position="sticky" top={0} zIndex={1}>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th
                    key={column.id}
                    {...column.getHeaderProps(
                      column.getSortByToggleProps({
                        position: 'sticky !important',
                        top: 0,
                        zIndex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        minHeight: '30px',
                        title: column.render('Header'),
                        background: column.backgroundColor ?? backgroundColor,
                        userSelect: 'none',
                      }),
                    )}
                  >
                    {column.render('Header')}

                    <Span pl="4">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : (
                        ''
                      )}
                    </Span>

                    {column.canResize && (
                      <Box
                        {...column.getResizerProps({
                          display: 'inline-block',
                          background: 'brandPrimary.400',
                          width: '5px',
                          height: '100%',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          transform: 'translateX(50%)',
                          zIndex: 1,
                        })}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);

              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td
                      {...cell.getCellProps({
                        display: 'flex',
                        whiteSpace: 'pre-line',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      })}
                      title={cell.value}
                    >
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <Box className="bottom-table-container">
        {/* Displays tableCaption if set */}
        <Text textAlign="right" my={3} mr={16}>
          {tableCaption}
        </Text>

        {/* Displays pagination inputs */}
        <Flex
          className="pagination"
          direction="row"
          justifyContent="flex-end"
          borderTop="3px solid #E2E8F0"
          pt={3}
        >
          <HStack>
            <HStack mr={6}>
              <Text>Show</Text>
              <Select
                value={pageSize}
                w="80px"
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 25, 50, 75, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
              <Text>entries</Text>
            </HStack>
            <HStack>
              <IconButton
                variant="ghost"
                colorScheme="black"
                aria-label="Go to first page"
                isDisabled={!canPreviousPage}
                icon={<BsChevronDoubleLeft />}
                onClick={() => gotoPage(0)}
              />
              <IconButton
                variant="ghost"
                colorScheme="black"
                aria-label="Go to previous page"
                isDisabled={!canPreviousPage}
                icon={<BsChevronLeft />}
                onClick={() => previousPage()}
              />

              {pageOptions.length !== 1 && pageIndex >= pageOptions.length - 1 && (
                <Button
                  variant="ghost"
                  colorScheme="black"
                  aria-label="Jump to page"
                  onClick={() => setIsOpen(true)}
                >
                  ...
                </Button>
              )}
              <Button
                key={pageIndex}
                variant="outline"
                colorScheme="black"
                aria-label={`Go to page ${pageIndex + 1}`}
                onClick={() => gotoPage(pageIndex)}
              >
                {pageIndex + 1}
              </Button>
              {pageIndex < pageOptions.length - 1 && (
                <Button
                  variant="ghost"
                  colorScheme="black"
                  aria-label="Jump to page"
                  onClick={() => setIsOpen(true)}
                >
                  ...
                </Button>
              )}

              <IconButton
                variant="ghost"
                colorScheme="black"
                aria-label="Go to next page"
                isDisabled={!canNextPage}
                icon={<BsChevronRight />}
                onClick={() => nextPage()}
              />
              <IconButton
                variant="ghost"
                colorScheme="black"
                aria-label="Go to last page"
                isDisabled={!canNextPage}
                icon={<BsChevronDoubleRight />}
                onClick={() => gotoPage(pageCount - 1)}
              />
            </HStack>
          </HStack>
        </Flex>
      </Box>

      {/* Jump to Dialog modal used for pagination */}
      <JumpToPageDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        gotoPage={gotoPage}
        pageCount={pageCount}
      />
    </>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  tableCaption: PropTypes.element,
  headerButtons: PropTypes.element,
  hideSearch: PropTypes.bool,
};

DataTable.defaultProps = {
  tableCaption: null,
  headerButtons: null,
  hideSearch: false,
};

export default DataTable;
