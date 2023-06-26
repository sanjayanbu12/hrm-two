import React from 'react';
import { Space } from 'antd';
import { Form, Upload, Breadcrumb, Statistic, Table, Input, Col, Select, Row, Button, DatePicker } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './LeaveTracker.css';

const dateFormat = 'YYYY/MM/DD';
const { TextArea } = Input;
const { Option } = Select;
const { Dragger } = Upload;

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
          }  else {
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
    render: file => (
      <span>{file ? <a href={file.url}>{file.name}</a> : 'No File/Folder'}</span>
    ),
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
      leaveType: ['Casual', 'Annual', 'Sick', 'Maternity', 'Paternity', 'Other'],
      data: [],
    };
    this.refreshgetAllLeaveType = this.refreshgetAllLeaveType.bind(this);
  }

  refreshgetAllLeaveType() {
    // Fetch and update leave types from the server
  }

  componentDidMount() {
    this.refreshgetAllLeaveType();
  }

  handleSubmit = (values) => {
    const newData = {
      key: this.state.data.length + 1,
      tags: [values.leaveType],
      sdate: values.startDate.format(dateFormat),
      edate: values.endDate.format(dateFormat),
      number: values.numberOfDays,
      reason: values.reason,
      file: values.fileList.length > 0 ? values.fileList[0] : null,
      status: values.status,
    };

    this.setState(prevState => ({
      data: [...prevState.data, newData],
    }));

    console.log('Submit button clicked!');
  };

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
              <Form
                onFinish={this.handleSubmit}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 12 }}
                layout="horizontal"
              >
                {/* Form fields for Leave Type, Start Date, End Date, Number of Days, Reason, Status */}
                <Form.Item
                  label="Leave Type"
                  name="leaveType"
                  rules={[{ required: true, message: 'Please select leave type!' }]}
                >
                  <Select placeholder="Select leave type">
                    {this.state.leaveType.map(leave => (
                      <Option key={leave}>{leave}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true, message: 'Please select start date!' }]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="End Date"
                  name="endDate"
                  rules={[{ required: true, message: 'Please select end date!' }]}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <Form.Item
                  label="No. of Days"
                  name="numberOfDays"
                  rules={[{ required: true, message: 'Please enter number of days!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Reason"
                  name="reason"
                  rules={[{ required: true, message: 'Please enter reason!' }]}
                >
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: 'Please select status!' }]}
                >
                  <Select placeholder="Select status">
                    <Option key="1">Approve</Option>
                    <Option key="2">Reject</Option>
                    <Option key="3">Pending</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Uploaded File/Folder"
                  name="fileList"
                  valuePropName="fileList"
                  getValueFromEvent={event => event.fileList}
                >
                  <Dragger>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  </Dragger>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                    <Button>Cancel</Button>
                  </Space>
                </Form.Item>
              </Form>

              {/* Table to display Leave Type, Start Date, End Date, Number of Days, Reason, Uploaded File/Folder, Status */}
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
