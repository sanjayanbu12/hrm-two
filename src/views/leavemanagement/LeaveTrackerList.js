import React from 'react';

import { Button, Breadcrumb, Statistic, Table, Col, Row } from 'antd';


const columns = [
  {
    title: 'Leave Type',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag;
          if (tag === 'Medical') {
            color = 'volcano';
          } else if (tag === 'Casual') {
            color = '#84fbc4';
          } else if (tag === 'Annual') {
            color = '#d578e4';
          } else if (tag === 'Sick') {
            color = '#4fc3f7';
          } else if (tag === 'Maternity') {
            color = '#ff8a65';
          } else if (tag === 'Paternity') {
            color = '#b16c52';
          } else {
            color = 'grey'; // Assign gray color for all other tags
          }

          return (
            <span
              key={tag}
              style={{
                marginRight: '5px',
                display: 'inline-block',
                padding: '3px 8px',
                borderRadius: '4px',
                color: '#fff',
                backgroundColor: color,
              }}
            >
              {tag.toUpperCase()}
            </span>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Start Date',
    dataIndex: 'sdate',
  },
  {
    title: 'End Date',
    dataIndex: 'edate',
  },
  {
    title: 'Number of Days',
    dataIndex: 'number',
  },
  {
    title: 'Reason',
    dataIndex: 'reason',
  },
  {
    title: 'Uploaded File/Folder',
    dataIndex: 'file',
    render: file => <span>{file ? <a href={file.url}>{file.name}</a> : 'No File/Folder'}</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: status => (
      <span>
        {status === '1' && <Button type="primary" size="small">Approve</Button>}
        {status === '2' && <Button danger size="small">Reject</Button>}
        {status === '3' && <Button disabled size="small">Pending</Button>}
      </span>
    ),
  },
];

class LeaveTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // Fetch the filled data from the server and update the 'data' state
    const filledData = [
      {
        key: 1,
        tags: ['Casual'],
        sdate: '2023/06/01',
        edate: '2023/06/03',
        number: 3,
        reason: 'Personal reasons',
        file: null,
        status: '3',
      },
      {
        key: 2,
        tags: ['Medical'],
        sdate: '2023/06/10',
        edate: '2023/06/15',
        number: 6,
        reason: 'Medical treatment',
        file: { url: 'https://example.com/file.pdf', name: 'medical_report.pdf' },
        status: '1',
      },
    ];

    this.setState({ data: filledData });
  }

  render() {
    return (
      <React.Fragment>
        <Row>
          <Col id="responsive-div1" span={16}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Leave Management</Breadcrumb.Item>
              <Breadcrumb.Item>Apply Leave</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360, marginRight: '20px' }}>
              <Table columns={columns} dataSource={this.state.data} style={{ marginTop: '30px' }} />
            </div>
          </Col>
          <Col id="responsive-div2" span={8}>
            {/* Remaining Leave Statistic */}
            <Statistic title="Remaining Leave" value={10} suffix="/ 20" />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default LeaveTracker;
