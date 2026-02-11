import { Table } from '@chakra-ui/react';

const mockData = {
  jobs: {
    headings: [
      { field: 'company', label: 'Company', format: 'string' },
      { field: 'position', label: 'Position', format: 'string' },
      { field: 'location', label: 'Location', format: 'string' },
      { field: 'link', label: 'Link', format: 'string' },
      { field: 'dateApplied', label: 'Date Applied', format: 'date' },
      { field: 'status', label: 'Status', format: 'string' }
    ],
    rows: [
      {
        id: '2228b6cf-3929-43e8-b50e-6f049fcead3d',
        link: 'https://www.linkedin.com/jobs/view/#',
        company: 'Foo Company',
        position: 'Software Engineer',
        location: 'Remote',
        dateApplied: '2026-02-01',
        status: 'APPLIED'
      },
      {
        id: '2228b6cf-3929-43e8-b50e-6f049fcead3e',
        link: 'https://www.linkedin.com/jobs/view/#',
        company: 'Bar Company',
        position: 'Frontend Engineer',
        location: 'Remote',
        dateApplied: null,
        status: 'SAVED'
      },
      {
        id: '2228b6cf-3929-43e8-b50e-6f049fcead3f',
        link: 'https://www.linkedin.com/jobs/view/#',
        company: 'Baz Company',
        position: 'Principal UI Architect',
        location: 'Remote',
        dateApplied: '2026-02-02',
        status: 'APPLIED'
      },
      {
        id: '2228b6cf-3929-43e8-b50e-6f049fcead3g',
        link: 'https://www.linkedin.com/jobs/view/#',
        company: 'Fizz Company',
        position: 'Staff Software Engineer',
        location: 'Remote',
        dateApplied: '2026-02-03',
        status: 'SAVED'
      },
      {
        id: '2228b6cf-3929-43e8-b50e-6f049fcead3h',
        link: 'https://www.linkedin.com/jobs/view/#',
        company: 'Buzz Company',
        position: 'Frontend Software Engineer',
        location: 'Remote',
        dateApplied: '2026-02-04',
        status: 'APPLIED'
      }
    ]
  }
};

export const JobsTable: React.FC = () => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row bg="bg.info">
          {mockData.jobs.headings.map((heading) => (
            <Table.ColumnHeader key={heading.field}>{heading.label}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {mockData.jobs.rows.map((job) => (
          <Table.Row key={job.id}>
            <Table.Cell>{job.company}</Table.Cell>
            <Table.Cell>{job.position}</Table.Cell>
            <Table.Cell>{job.location}</Table.Cell>
            <Table.Cell><a href={job.link} target="_blank" rel="noopener noreferrer">View</a></Table.Cell>
            <Table.Cell>{job.dateApplied}</Table.Cell>
            <Table.Cell>{job.status}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
