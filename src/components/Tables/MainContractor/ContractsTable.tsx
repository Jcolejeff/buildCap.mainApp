import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  MoreVertical,
  MoreVerticalIcon,
} from 'lucide-react';

import { Button } from 'components/shadcn/ui/button';
import { Checkbox } from 'components/shadcn/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { Input } from 'components/shadcn/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/shadcn/ui/table';
import { Link } from 'react-router-dom';
import CONSTANTS from 'constant';
import Icon from 'utils/Icon';
import API from 'services';
import toast from 'helper';
import { processError } from 'helper/error';
import Spinner from 'components/shadcn/ui/spinner';
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from 'store';
import { cn } from 'lib/utils';
import sections from 'pages/app/maincontractor/overview/tempData';
import DeletePatient from 'components/modal/Patients/DeletePatient';
import NormalTableInfoCard from 'components/general/tableInfoCard/NormalTableInfoCard';
import DoubleTableInfoCard from 'components/general/tableInfoCard/DoubleTableInfoCard';
import MergePatientModal from 'components/modal/Patients/MergePatient';
import SampleAccordion from 'components/sampleAccordion';
export type Page = {
  id: string;
  project: string;
  title: string;
  description: string;
  amount: string;
};

const projects = {
  items: [
    {
      id: 1,
      project: 'Hospital Project',
      title: 'John Doe',
      description: 'Carpenter',
      amount: 'N1,000,000,000',
    },
    {
      id: 2,
      project: 'Road Project',
      title: 'Jane Doe',
      description: 'Plumber',
      amount: 'N500,000,000',
    },
    {
      id: 3,
      project: 'Bridge Project',
      title: 'Paul Doe',
      description: 'Electrician',
      amount: 'N200,000,000',
    },
  ],
};

function ContractAgreementTable() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // refactor this
  const data = React.useMemo(() => {
    if (!projects?.items) return [];

    return projects.items.map((i: any) => ({
      id: i?.id,
      project: i?.project,
      title: i?.title,
      description: i?.description,
      amount: i?.amount,
    }));
  }, [projects]);
  const deletePage = async (id: string) => {
    setIsLoading(true);
    //     try {
    //       const res = await API.delete(`/projects/${id}`);
    //       toast.success('Page deleted successfully');
    //       setTimeout(() => {
    //         refetch();
    //       }, 10);
    //     } catch (error) {
    //       processError(error);
    //     }
    setIsLoading(false);
  };
  const columns: ColumnDef<Page>[] = [
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            className='px-0'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name of Subcontractor
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-2' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
        <div className='text-sm capitalize'>{row.getValue('title')}</div>
        // </Link>
      ),
      enableHiding: false,
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
        <div className='text-sm capitalize'>
          {/* {Number(row.original.id) * 1245632} */}
          {row.getValue('description')}
        </div>
        // </Link>
      ),
    },

    {
      accessorKey: 'project',
      header: ({ column }) => {
        return (
          <Button
            className='px-0 '
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name of Project
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-2' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
        <div className='flex w-fit items-center   gap-2 rounded-lg  p-3'>
          <p className='text-center text-sm '>{row.getValue('project')}</p>
        </div>
        // </Link>
      ),
    },

    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return (
          <Button
            className='px-0'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Total Contract Value (N)
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-2' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
        <div className=''>{row.getValue('amount')}</div>
        // </Link>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const page = row.original;

        return (
          <div className='flex items-center gap-4'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreVertical className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='px-4 py-2'>
                <MergePatientModal
                  trigger={
                    <Button
                      variant='outline'
                      className='flex w-full  items-center justify-start gap-2 border-0 p-0 px-2  capitalize  disabled:cursor-not-allowed disabled:opacity-50'
                      onClick={() => {
                        setTimeout(() => {
                          console.log('delete');
                        }, 500);
                      }}
                    >
                      <Icon name='editPen' svgProp={{ className: 'text-black' }}></Icon>
                      <p>Edit</p>
                    </Button>
                  }
                ></MergePatientModal>
                <DropdownMenuSeparator />
                <DeletePatient btnText='Delete' />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='flex w-full flex-col gap-12 rounded-xl bg-slate-50 px-6  py-6'>
      <div className='flex items-center justify-between '>
        <h3 className='font-semibold'>Contractual Agreements</h3>
        <div className='flex items-center gap-3'>
          <div className='flex  items-center rounded-lg border px-4'>
            <input
              value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
              className='form-input max-w-xl flex-grow border-0  bg-inherit py-2  placeholder:text-xs placeholder:font-semibold placeholder:text-textColor-disabled focus:!ring-0'
              placeholder='Search Projects'
            />
            <Icon name='searchIcon' svgProp={{ className: 'text-primary-9 w-3' }} />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-12 w-12 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='px-4 py-4  pb-4'>
              {/* <DropdownMenuLabel className='px-0 text-center text-sm font-normal'>
                Actions
              </DropdownMenuLabel> */}
              <DropdownMenuItem
                onClick={() => {
                  table.resetSorting();
                }}
                className='flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-center text-xs'
              >
                Reset Sorting
              </DropdownMenuItem>
              <DropdownMenuSeparator className='my-2' />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className=''>
                    <Button variant='outline' className='py-1 text-xs'>
                      Columns <ChevronDown className='ml-2 h-3 w-3' />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className='text-xs capitalize'
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className='  '>
        <Table className=''>
          <TableHeader className='border-0  [&_tr]:border-b-0'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='border-0 '>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='border-b border-b-black/30 px-0'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='border-0'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='px-0 py-3 font-medium'>
                      {/* <Link to={`/${CONSTANTS.ROUTES['view-projects']}/${cell.id}`}> */}
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      {/* </Link> */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-[400px] text-center'>
                  <div>
                    <p className='text-base font-semibold text-gray-500'>No Project Records</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Showing {table.getRowModel().rows?.length ?? 0} of {data.length} results
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContractAgreementTable;
