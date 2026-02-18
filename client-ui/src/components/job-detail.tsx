import { Table } from '@chakra-ui/react';

const mockData = {
  job: {
    headings: [
      { field: 'company', label: 'Company', format: 'string' },
      { field: 'position', label: 'Position', format: 'string' },
      { field: 'location', label: 'Location', format: 'string' },
      { field: 'link', label: 'Link', format: 'string' },
      { field: 'dateApplied', label: 'Date Applied', format: 'date' },
      { field: 'status', label: 'Status', format: 'string' }
    ],
    fields: {
      id: '2228b6cf-3929-43e8-b50e-6f049fcead3d',
      link: 'https://www.linkedin.com/jobs/view/#',
      company: 'Foo Company',
      position: 'Software Engineer',
      location: 'Remote',
      dateApplied: '2026-02-01',
      status: 'APPLIED'
    }
  }
};

interface JobDetailProps {
  jobId?: string;
}

export const JobDetail: React.FC<JobDetailProps> = (props) => {
  const { jobId } = props;
  const { headings, fields } = mockData.job;

  if (!jobId) {
    return null;
  }

  return (
    <Table.Root>
      <Table.Body>
        {headings.map((heading) => (
          <Table.Row key={heading.field}>
            <Table.Cell fontWeight="bold">{heading.label}</Table.Cell>
            <Table.Cell>{heading.field in fields && fields[heading.field as keyof typeof fields]}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
