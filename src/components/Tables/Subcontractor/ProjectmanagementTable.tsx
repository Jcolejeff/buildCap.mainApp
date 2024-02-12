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
import DeleteModal from 'components/modal/DeleteModal';

export type Page = {
  id: string;
  value: string;
  title: string;
  duration: string;
  purchases: number;
};

const projects = {
  items: [
    {
      id: 1,
      value: 'N1,000,000',
      title: 'Hospitals',
      duration: '6 months',
      purchases: 3,
    },
    {
      id: 2,
      value: 'N2,000,000',
      title: 'Flyover',
      duration: '3 months',
      purchases: 1,
    },
    {
      id: 3,
      value: 'N3,000,000',
      title: 'Schools',
      duration: '1 months',
      purchases: 2,
    },
  ],
};

function ProjectManagementTable() {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  // refactor this
  const data = React.useMemo(() => {
    if (!projects?.items) return [];

    return projects.items.map((i: any) => ({
      id: i?.id,
      value: i?.value?.slice(0, 10),
      title: i?.title,
      duration: i?.duration,
      purchases: i?.purchases,
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
            className='whitespace-nowrap px-0'
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
        <div className='text-sm capitalize'>{row.getValue('title')}</div>
        // </Link>
      ),
      enableHiding: false,
    },
    {
      id: 'duration',
      accessorKey: 'duration',
      header: 'Duration',
      cell: ({ row }) => (
        // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
        <div className='whitespace-nowrap text-sm capitalize'>
          {/* {Number(row.original.id) * 1245632} */}
          {row.getValue('duration')}
        </div>
        // </Link>
      ),
    },

    {
      accessorKey: 'value',
      header: ({ column }) => {
        return (
          <Button
            className='whitespace-nowrap px-0'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Contract value
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-2' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
        <div className='flex w-fit items-center   gap-2 rounded-lg '>
          <p className='text-center text-sm '>{row.getValue('value')}</p>
        </div>
        // </Link>
      ),
    },

    {
      accessorKey: 'purchases',
      header: ({ column }) => {
        return (
          <Button
            className='whitespace-nowrap px-0'
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Number of Purchases
            <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-2' }} />
          </Button>
        );
      },
      cell: ({ row }) => (
        // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
        <div className='lowercase'>{row.getValue('purchases')}</div>
        // </Link>
      ),
    },

    {
      id: 'actions',
      enableHiding: false,
      header: 'Add materials',
      cell: ({ row }) => {
        const page = row.original;

        return (
          <div className='flex items-center gap-4'>
            {/* <RequestFinancingModal
              trigger={
                <Button
                  variant='outline'
                  className='flex w-full items-center justify-start  gap-2 border-0 bg-primary-19 p-0 px-4 capitalize  text-primary-1  disabled:cursor-not-allowed disabled:opacity-50'
                  onClick={() => {
                    setTimeout(() => {
                      console.log('delete');
                    }, 500);
                  }}
                >
                  <p>Request Financing</p>
                  <Icon name='addThreadIcon' svgProp={{ className: 'w-4' }}></Icon>
                </Button>
              }
            ></RequestFinancingModal> */}
            <Button
              variant='outline'
              className='flex  items-center justify-start  gap-2 border-0 bg-primary-19 p-0 px-4 capitalize  text-primary-1  disabled:cursor-not-allowed disabled:opacity-50'
              onClick={() => {
                navigate(`/sc/${CONSTANTS.ROUTES['request-financing']}?project=${page.id}`);
              }}
            >
              <p>Request Financing</p>
              <Icon name='addThreadIcon' svgProp={{ className: 'w-4' }}></Icon>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='h-8 w-8 p-0'>
                  <span className='sr-only'>Open menu</span>
                  <MoreVertical className='h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='px-4 py-2'>
                {/* <MergePatientModal
                  trigger={ */}
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
                  <p>Edit Project</p>
                </Button>
                {/* }
                ></MergePatientModal> */}
                <DropdownMenuSeparator />
                <DeleteModal btnText='Delete Project' />
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
    <div className='flex w-full flex-col gap-2 rounded-xl bg-slate-50 px-6  py-6'>
      <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center '>
        <h3 className='font-semibold'>Project Status</h3>
        <div className='flex  items-center justify-between gap-3'>
          <div className='flex items-center  rounded-lg border px-4'>
            {/* <input
              value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
              onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
              className='form-input max-w-xs flex-grow border-0 bg-inherit  py-2 placeholder:text-xs  placeholder:font-semibold placeholder:text-textColor-disabled focus:!ring-0 md:max-w-xl'
              placeholder='Search Projects'
            /> */}
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

      <Table className=''>
        <TableHeader className='border-0  [&_tr]:border-b-0'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='border-0 '>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className='mx-4 border-b border-b-black/30 px-0'>
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

export default ProjectManagementTable;
