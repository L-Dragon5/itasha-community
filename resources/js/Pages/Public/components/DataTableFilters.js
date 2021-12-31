import { Input, Select } from '@chakra-ui/react';
import React, { useMemo } from 'react';

/*
  Text input filter.
*/
export const TextColumnFilter = ({ column: { filterValue, setFilter } }) => (
  <Input
    size="sm"
    variant="filled"
    value={filterValue || ''}
    onChange={(e) => setFilter(e.target.value || undefined)}
  />
);

/*
  Select input filter.
*/
export const SelectColumnFilter = ({
  column: { filterValue, setFilter, preFilteredRows, id },
}) => {
  const options = useMemo(() => {
    const opts = new Set();
    preFilteredRows.forEach((row) => {
      opts.add(row.values[id]);
    });

    return [...opts.values()];
  }, [id, preFilteredRows]);

  return (
    <Select
      size="sm"
      variant="filled"
      value={filterValue}
      onChange={(e) => setFilter(e.target.value || undefined)}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
