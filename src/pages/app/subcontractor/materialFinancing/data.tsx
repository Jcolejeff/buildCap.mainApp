import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';
import { Button } from 'components/shadcn/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/shadcn/dropdown-menu';
import { Progress } from 'components/shadcn/ui/progress';
import Icon from 'utils/Icon';
import { checkStatus } from 'lib/utils';
import DeleteModal from 'components/modal/DeleteModal';

export type Page = {
  id: string;
  value: string;
  title: string;
  invoiceDate: string;
  status: string;
  description: string;
  progress: number;
};

export const financialRequests = {
  items: [
    {
      id: 1,
      value: 'N1,000,000',
      title: 'Hospitals',
      invoiceDate: 'Jan 5, 2024',
      status: 'scheduled',
      description: 'Plumber',
      progress: 5,
    },
    {
      id: 7,
      value: 'N2,000,000',
      title: 'Flyover',
      invoiceDate: 'Jan 5, 2024',
      description: 'Carpenter',
      status: 'completed',
      progress: 7,
    },
    {
      id: 3,
      value: 'N3,000,000',
      title: 'Schools',
      invoiceDate: 'Jan 5, 2024',
      status: 'scheduled',
      description: 'Plumber',
      progress: 2,
    },
  ],
};
export const financialRequestsColumns: ColumnDef<Page>[] = [
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          className='px-0'
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Project
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
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 '
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Description
          <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-2' }} />
        </Button>
      );
    },
    cell: ({ row }) => (
      // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
      <div className='flex w-fit items-center   gap-2 rounded-lg'>
        <p className='text-center text-sm '>{row.getValue('description')}</p>
      </div>
      // </Link>
    ),
  },
  {
    id: 'invoiceDate',
    accessorKey: 'invoiceDate',
    header: 'Invoice Date',
    cell: ({ row }) => (
      // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
      <div className='text-sm capitalize'>
        {/* {Number(row.original.id) * 1245632} */}
        {row.getValue('invoiceDate')}
      </div>
      // </Link>
    ),
  },
  {
    accessorKey: 'progress',
    header: ({ column }) => {
      return (
        <Button className='px-0' variant='ghost'>
          Payments Progress
        </Button>
      );
    },
    cell: ({ row }) => (
      // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
      <div className='flex flex-col gap-1'>
        <Progress value={Number((row.getValue('progress') as number) * 10)} className='w-[80%]' />

        <p>{row.getValue('progress')}/10 Payments</p>
      </div>
      // </Link>
    ),
    enableSorting: false,
  },

  {
    accessorKey: 'value',
    header: ({ column }) => {
      return (
        <Button
          className='px-0 '
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Amount
          <Icon name='sort' svgProp={{ className: 'ml-2 h-3 w-2' }} />
        </Button>
      );
    },
    cell: ({ row }) => (
      // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
      <div className='flex w-fit items-center   gap-2 rounded-lg  '>
        <p className='text-center text-sm '>{row.getValue('value')}</p>
      </div>
      // </Link>
    ),
  },

  {
    accessorKey: 'status',
    header: ({ column }) => {
      return (
        <Button className='px-0' variant='ghost'>
          Payment Status
        </Button>
      );
    },
    cell: ({ row }) => (
      // <Link to={`/mc/${CONSTANTS.ROUTES['overview']}}`}>
      <div
        className={`flex w-fit items-center gap-2 rounded-2xl px-4  py-1 capitalize ${checkStatus(
          row.getValue('status'),
        )}`}
      >
        <Icon name='StatusIcon' svgProp={{ className: ' ' }} />
        {row.getValue('status')}
      </div>
      // </Link>
    ),
    enableSorting: false,
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
                <p>Edit </p>
              </Button>
              {/* }
                ></MergePatientModal> */}
              <DropdownMenuSeparator />
              <DeleteModal btnText='Delete Subcontractor' />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
